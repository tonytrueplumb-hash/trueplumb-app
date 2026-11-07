// The course player. Renders into a root element and calls onSave(state) when progress changes.
import { COURSES, SETTINGS, STYLES, NOUN, ROLE_TIPS, RATINGS, PURPOSE_TIPS, PATHWAY, steps as stepsFor, practiceItems, practiceUnlocked } from "./index";

const GRADE = { 3: "Best move", 2: "Defensible", 1: "Risky", 0: "Trap" };
const CONF = [["guess", "Guessing"], ["fair", "Fairly sure"], ["sure", "Certain"]];
const METERS = ["Trust", "Delivery", "You"];
const CHECKIN = [["done", "Did it"], ["partly", "Partly"], ["not", "Not yet"]];
const DAY = 864e5;

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function order(id, n) { const a = [...Array(n).keys()]; let h = hash(id); for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const clamp = v => Math.max(0, Math.min(100, v));

export function mountCourse(root, { trackId, profile, initial, onSave, onPref, editHref, now = () => Date.now() }) {
  const C = COURSES[trackId];
  let P = initial && initial.days ? initial : { days: {}, view: { screen: "home" } };
  if (!P.view) P.view = { screen: "home" };
  P.ratings = P.ratings || {}; P.practice = P.practice || {};
  let draftPick = null;
  let draftRate = null;
  let saveState = "saved";
  let timer = null;
  let optOut = !!profile.emailsOptOut;
  const setting = () => (SETTINGS[profile.setting] ? profile.setting : "office");
  const steps = n => stepsFor(C, n, setting());
  const dayData = n => C.days[n - 1];
  const dayState = n => P.days[n] || (P.days[n] = { answers: {}, notes: {}, mission: "", done: false });
  const $ = s => root.querySelector(s);
  const iso = () => new Date(now()).toISOString();
  const daysSince = t => (t ? (now() - Date.parse(t)) / DAY : 0);

  function save() {
    saveState = "saving"; paintSave();
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try { await onSave(JSON.parse(JSON.stringify(P))); saveState = "saved"; }
      catch { saveState = "error"; }
      paintSave();
    }, 500);
  }
  function paintSave() {
    const el = $("#saveState"); if (!el) return;
    el.textContent = saveState === "saved" ? "Progress saved" : saveState === "saving" ? "Saving…" : "Not saved: check your connection";
  }
  function go(view) { P.view = view; save(); render(); if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0 }); }

  // Meters carry over: each day starts where the previous day finished.
  function startMeters(n) { return n > 1 && dayState(n - 1).done ? meters(n - 1) : [50, 50, 50]; }
  function meters(n, uptoKey) {
    const m = startMeters(n); const ds = dayState(n);
    for (const st of steps(n)) {
      const a = ds.answers[st.key];
      if (a && st.opts[a.pick]) st.opts[a.pick].fx.forEach((v, i) => (m[i] = clamp(m[i] + v)));
      if (st.key === uptoKey) break;
    }
    return m;
  }
  function dayScore(n) { const ds = dayState(n); let got = 0, max = 0; for (const st of steps(n)) { max += 3; const a = ds.answers[st.key]; if (a) got += st.opts[a.pick].pts; } return { got, max }; }
  function allAnswers() { const out = []; for (const d of C.days) { const ds = P.days[d.n]; if (!ds) continue; for (const st of steps(d.n)) { const a = ds.answers[st.key]; if (a) out.push({ o: st.opts[a.pick], conf: a.conf }); } } return out; }
  const avg = o => { const v = Object.values(o || {}); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };

  function meterHtml(m, prev, note) {
    return `<div class="meters">${METERS.map((name, i) => { const d = prev ? m[i] - prev[i] : 0; return `<div class="meter"><div class="lab"><span>${name}</span><span>${m[i]}${d ? ` <span class="delta ${d > 0 ? "up" : "down"}">${d > 0 ? "+" : ""}${d}</span>` : ""}</span></div><div class="bar"><i class="${m[i] < 30 ? "low" : ""}" style="width:${m[i]}%"></i></div></div>`; }).join("")}</div>${note ? `<p class="muted" style="margin-top:-6px">${esc(note)}</p>` : ""}`;
  }

  function viewHome() {
    const done = C.days.filter(d => dayState(d.n).done).length;
    const next = C.days.find(d => !dayState(d.n).done);
    return `<section class="stack">
      <p class="eyebrow">${esc(C.track)} · ${esc(SETTINGS[setting()].label)}</p>
      <h1>${profile.name ? esc(profile.name) + ", " : ""}${done === 3 ? "sprint complete" : "day " + (next ? next.n : 3) + " is ready"}</h1>
      <div class="prog" aria-label="${done} of 3 days complete">${[1, 2, 3].map(i => `<i class="${i <= done ? "on" : ""}"></i>`).join("")}</div>
      <p class="muted" id="saveState">Progress saved</p>
    </section>
    ${feedbackCard()}
    ${followUpCards()}
    <section class="days">${C.days.map(d => { const ds = dayState(d.n); const sc = dayScore(d.n); const locked = d.n > 1 && !dayState(d.n - 1).done;
      return `<button class="day ${ds.done ? "done" : ""}" data-day="${d.n}" ${locked ? "disabled" : ""}><span class="num">${d.n}</span><span class="meta"><h3>${esc(d.title)}</h3><span class="muted">${esc(d.tool)} · ${d.minutes} min</span>${ds.done ? `<span class="chip o">Judgement ${sc.got}/${sc.max}</span>` : locked ? `<span class="chip">Finish day ${d.n - 1} first</span>` : Object.keys(ds.answers).length ? `<span class="chip o">In progress</span>` : ""}</span></button>`; }).join("")}</section>
    ${practiceCard()}
    ${nextStepCard()}
    ${profilePanel()}
    <section class="card"><h3>Settings</h3><p class="muted">Course: ${esc(C.track)}. Work setting: ${esc(SETTINGS[setting()].label)}. Progress is kept separately for each course.</p>
      <label class="row" style="gap:10px;align-items:center"><input type="checkbox" id="emails" ${optOut ? "" : "checked"}> <span>Send me follow-up emails: reminders, weekly practice and a 30-day check-in.</span></label>
      <div class="row"><a class="btn ghost small" href="${editHref}">Change course or work setting</a><button class="btn ghost small" id="resetBtn">Start again (refresher)</button></div>
      <div id="resetConfirm" class="hide row"><span>Your answers start fresh. A summary of this attempt is kept so you can compare.</span><button class="btn small" id="resetYes">Start again</button><button class="btn ghost small" id="resetNo">Keep them</button></div>
    </section>`;
  }

  // Feedback, asked once the sprint is finished. Saved with progress so it shows on the admin page.
  const USES = [["onboarding", "Onboarding new starters"], ["promotion", "People stepping up into a new role"], ["refresher", "Refresher training for existing staff"], ["recruitment", "A baseline when people join"]];
  function feedbackCard() {
    if (!P.completedAt) return "";
    const f = P.feedback || {};
    if (f.at) return `<section class="card"><p class="eyebrow">Your feedback</p><p>Thanks for your feedback. It goes straight to Tony.</p></section>`;
    return `<section class="card" id="fbCard"><p class="eyebrow">Two minutes of feedback</p><h3>How was it?</h3>
      <p class="f">How likely are you to recommend this to a colleague? (0 = not at all, 10 = definitely)</p>
      <div class="conf" role="radiogroup" aria-label="Recommend score">${[...Array(11).keys()].map(v => `<label><input type="radio" name="fbScore" value="${v}" ${f.score === v ? "checked" : ""}>${v}</label>`).join("")}</div>
      <label class="f" for="fbUseful">What was most useful or realistic?</label><textarea id="fbUseful">${esc(f.useful || "")}</textarea>
      <label class="f" for="fbChange">What would you change, add or remove? Anything that felt unrealistic?</label><textarea id="fbChange">${esc(f.change || "")}</textarea>
      <p class="f">Where could you see your business using this? (tick any)</p>
      <div class="stack">${USES.map(([k, l]) => `<label class="row" style="gap:10px;align-items:center"><input type="checkbox" data-fbuse="${k}" ${(f.use || []).includes(k) ? "checked" : ""}> <span>${l}</span></label>`).join("")}</div>
      <button class="btn" id="fbSend">Send feedback</button></section>`;
  }

  // After the sprint: the next course up, and a refresher reminder.
  function nextStepCard() {
    if (!P.completedAt) return "";
    const next = PATHWAY[trackId] && COURSES[PATHWAY[trackId]];
    return `<section class="card"><p class="eyebrow">What next</p>
      ${next ? `<h3>Ready to step up? Try ${esc(next.track)}</h3><p class="muted">It covers the decisions that catch people out when they move up a level. Do it before the step up, not after. Your results on this course are kept.</p><div class="row"><a class="btn ghost small" href="${editHref}">Switch to ${esc(next.track)}</a></div>` : `<h3>Keep it sharp</h3>`}
      <p class="muted">Come back in three months for a refresher. Starting again keeps a record of this attempt, so you can compare.</p></section>`;
  }

  // A short record of an attempt, kept when someone starts the course again.
  function snapshot() {
    const all = allAnswers(); if (!all.length) return null;
    const got = all.reduce((n, a) => n + a.o.pts, 0);
    const counts = {}; all.forEach(a => { if (a.o.s !== "leader") counts[a.o.s] = (counts[a.o.s] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return { at: iso(), judgement: Math.round(got / (all.length * 3) * 100), trap: top ? top[0] : null, daysDone: C.days.filter(d => dayState(d.n).done).length };
  }

  // Check-ins that appear on the home screen after the sprint.
  function followUpCards() {
    if (!P.completedAt) return "";
    const out = [];
    const d3 = dayState(3);
    if (d3.mission && !d3.checkin && daysSince(P.completedAt) >= 3) out.push(checkinCard(3, "Your Day 3 commitment"));
    if (daysSince(P.completedAt) >= 30 && !P.ratings.d30) out.push(`<section class="callout"><h3>Your 30-day check-in</h3><p>It's been a month. Rate the same five statements again, so you can see what has actually changed.</p><button class="btn small" data-rate="d30">Do the check-in (1 minute)</button></section>`);
    return out.join("");
  }

  function checkinCard(n, title) {
    const ds = dayState(n);
    return `<section class="callout"><p class="eyebrow">${esc(title)}</p><p><b>You said:</b> ${esc(ds.mission)}</p><p>How did it go?</p>
      <div class="row">${CHECKIN.map(([v, l]) => `<button class="btn ghost small" data-checkin="${n}" data-val="${v}" aria-pressed="${ds.checkin === v}">${l}</button>`).join("")}</div>
      ${ds.checkin ? `<label class="f" for="checkinNote">${ds.checkin === "done" ? "What happened? What would you do differently?" : "What got in the way? What's the smallest version you could do this week?"}</label><textarea id="checkinNote" data-n="${n}" placeholder="Only you can see this.">${esc(ds.checkinNote || "")}</textarea>` : ""}
    </section>`;
  }

  function practiceCard() {
    if (!P.completedAt) return "";
    const items = practiceItems(C, P, setting());
    if (!items.length) return `<section class="card"><p class="eyebrow">Practice</p><h3>Nothing to practise</h3><p class="muted">You found the best move on every decision. Come back for your 30-day check-in.</p></section>`;
    const unlocked = Math.min(items.length, practiceUnlocked(P, now()));
    const doneN = items.filter(x => P.practice[x.st.key]).length;
    return `<section class="card"><p class="eyebrow">Practice</p><h3>Decisions to try again</h3>
      <p class="muted">The decisions you didn't get right first time come back, two a week for six weeks. Trying again after a gap is what makes it stick. ${doneN} of ${items.length} done.</p>
      <div class="stack">${items.map((x, i) => { const pr = P.practice[x.st.key]; const open = i < unlocked;
        return `<button class="day ${pr ? "done" : ""}" data-practice="${x.st.key}" ${open ? "" : "disabled"}><span class="num">${i + 1}</span><span class="meta"><h3>${esc(x.st.sc.title)}</h3><span class="muted">Day ${x.day}</span>${pr ? `<span class="chip o">${GRADE[x.st.opts[pr.pick].pts]}</span>` : open ? `<span class="chip o">Ready</span>` : `<span class="chip">Unlocks in week ${Math.floor(i / 2) + 1}</span>`}</span></button>`; }).join("")}</div>
    </section>`;
  }

  function profilePanel() {
    const all = allAnswers();
    const hist = (P.history || []).length ? `<h3>Previous attempts</h3><ul>${P.history.map(h => `<li>${esc(new Date(h.at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }))}: judgement ${h.judgement}%${h.trap ? `, leaned ${esc(STYLES[h.trap].name)}` : ""}</li>`).join("")}</ul>` : "";
    if (!all.length) return hist ? `<section class="card"><p class="eyebrow">Your leadership profile</p>${hist}</section>` : "";
    const counts = { leader: 0, rescuer: 0, pleaser: 0, enforcer: 0, avoider: 0 }; all.forEach(a => counts[a.o.s]++);
    const traps = Object.entries(counts).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1]);
    const top = traps[0][1] > 0 ? traps[0][0] : null;
    const sure = all.filter(a => a.conf === "sure"); const sureRight = sure.filter(a => a.o.pts === 3).length;
    const commits = C.days.map(d => ({ d, ds: P.days[d.n] || {} })).filter(x => x.ds.mission);
    const b = avg(P.ratings.before), a = avg(P.ratings.after), m30 = avg(P.ratings.d30);
    const fmt = v => v == null ? "–" : v.toFixed(1);
    return `<section class="card"><p class="eyebrow">Your leadership profile</p>
      <h2>${top ? `Under pressure you lean ${esc(STYLES[top].name)}` : "No default trap yet"}</h2>
      <p class="muted">${top ? esc(STYLES[top].line) : "You've picked the best move every time so far."}</p>
      <div class="styles">${Object.entries(counts).map(([k, v]) => `<div class="sty"><span>${esc(STYLES[k].name)}</span><div class="bar"><i style="width:${Math.round(v / all.length * 100)}%"></i></div><span>${v}</span></div>`).join("")}</div>
      ${sure.length ? `<p><b>When you were certain, you were right ${sureRight} of ${sure.length} times.</b> <span class="muted">${sure.length < 3 ? "Answer a few more to get a reliable read on this." : sureRight / sure.length < 0.7 ? "Your confidence runs ahead of your judgement. Slow down on the ones that feel obvious." : "Your confidence is well calibrated."}</span></p>` : ""}
      ${b != null ? `<h3>How you rate yourself (out of 5)</h3><p>Before: <b>${fmt(b)}</b> · After the sprint: <b>${fmt(a)}</b> · After 30 days: <b>${fmt(m30)}</b></p>` : ""}
      ${hist}
      ${commits.length ? `<h3>Your commitments</h3><ul>${commits.map(c => `<li><b>Day ${c.d.n}:</b> ${esc(c.ds.mission)}${c.ds.checkin ? ` <span class="chip">${esc(CHECKIN.find(x => x[0] === c.ds.checkin)[1])}</span>` : ""}</li>`).join("")}</ul>` : ""}
    </section>`;
  }

  function viewRate(stage) {
    const list = RATINGS[trackId];
    if (!draftRate || draftRate.stage !== stage) draftRate = { stage, v: { ...(P.ratings[stage] || {}) } };
    const intro = stage === "before" ? "Before you start, rate yourself honestly. You'll do the same five at the end and again in 30 days, so you can see what changes." : stage === "after" ? "Same five statements as before you started. Rate how you'll actually handle them now." : "It's been 30 days. Rate the same five statements based on what you've actually done this month.";
    return `<section class="stack"><p class="eyebrow">${stage === "before" ? "Quick baseline" : stage === "after" ? "End of sprint" : "30-day check-in"} · 1 minute</p><h1>How do you lead right now?</h1><p class="muted">${esc(intro)} 1 means "not like me", 5 means "very like me".</p></section>
      ${list.map((q, i) => `<section class="card"><p>${esc(q)}</p><div class="conf" role="radiogroup" aria-label="${esc(q)}">${[1, 2, 3, 4, 5].map(v => `<label><input type="radio" name="r${i}" value="${v}" data-rate-q="${i}" ${draftRate.v[i] === v ? "checked" : ""}>${v}</label>`).join("")}</div></section>`).join("")}
      <div class="row"><button class="btn" id="rateSave" ${Object.keys(draftRate.v).length === list.length ? "" : "disabled"}>Save</button>${stage === "before" ? `<button class="btn ghost" id="rateSkip">Skip for now</button>` : ""}</div>`;
  }

  function viewLesson(n) {
    const d = dayData(n);
    const tip = n === 1 && [profile.purpose && PURPOSE_TIPS[profile.purpose], profile.roleLength && ROLE_TIPS[trackId][profile.roleLength]].filter(Boolean).join(" ");
    const prev = n > 1 && dayState(n - 1).mission ? checkinCard(n - 1, `Before today: your Day ${n - 1} commitment`) : "";
    const echo = n === 3 ? echoCard() : "";
    return `<section class="stack"><p class="eyebrow">Day ${n} of 3 · ${esc(d.tool)}</p><h1>${esc(d.title)}</h1></section>
    ${tip ? `<section class="callout"><p>${esc(tip)}</p></section>` : ""}
    ${prev}${echo}
    <section class="lesson">${d.lesson.map((c, i) => `<div class="card"><span class="eyebrow">${i + 1}</span><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p></div>`).join("")}</section>
    <section class="callout"><h3>How the scenarios work</h3><p>Each option sounds reasonable, and only one is the best move, though some are defensible. Choose, say how sure you are, then see what every option would have done. Three meters track your team's <b>Trust</b>, your <b>Delivery</b> and <b>You</b>, meaning your own time and energy. ${n > 1 ? "They carry on from where yesterday finished." : "They carry over from day to day."}</p></section>
    <button class="btn" id="toSteps">Start the scenarios</button>`;
  }

  // Day 3 callback to a Day 1 choice.
  function echoCard() {
    for (const sc of C.days[0].scenarios) {
      if (!sc.echo) continue;
      const a = dayState(1).answers[sc.id]; if (!a || !sc.echo[a.pick]) continue;
      return `<section class="card"><p class="eyebrow">Remember ${esc(sc.title.toLowerCase())}?</p><p>${esc(sc.echo[a.pick])}</p></section>`;
    }
    return "";
  }

  function choiceBlock(st, keyForOrder) {
    if (!draftPick || draftPick.key !== keyForOrder) draftPick = { key: keyForOrder, pick: null, conf: null };
    const pick = draftPick; const ord = order(keyForOrder, st.opts.length); const letters = "ABCD";
    return `<section class="stack"><h3>${esc(st.q)}</h3>
        <div class="stack" role="group" aria-label="Options">${ord.map((oi, k) => `<button class="choice" data-pick="${oi}" aria-pressed="${pick.pick === oi}"><span class="k">${letters[k]}</span><span>${esc(st.opts[oi].t)}</span></button>`).join("")}</div>
        <fieldset class="stack" style="border:0;padding:0;margin:0"><legend class="f" style="margin-bottom:8px">How sure are you?</legend><div class="conf">${CONF.map(([v, l]) => `<label><input type="radio" name="conf" value="${v}" ${pick.conf === v ? "checked" : ""}>${l}</label>`).join("")}</div></fieldset>
        <button class="btn" id="lockIn" ${pick.pick != null && pick.conf ? "" : "disabled"}>Lock in my answer</button></section>`;
  }

  function rankedBlock(st, mineIdx) {
    const best = st.opts.find(o => o.pts === 3);
    return `<h3>Every option, ranked</h3>
      ${[...st.opts.keys()].sort((x, y) => st.opts[y].pts - st.opts[x].pts).map(oi => { const o = st.opts[oi]; return `<div class="rev ${oi === mineIdx ? "mine" : ""}"><div class="row"><span class="grade g${o.pts}">${GRADE[o.pts]}</span><span class="chip">${esc(STYLES[o.s].name)}</span>${oi === mineIdx ? '<span class="chip o">Your answer</span>' : ""}</div><p><b>${esc(o.t)}</b></p><p class="muted">${esc(o.why)}</p></div>`; }).join("")}
      ${best && best.say ? `<div class="callout"><p class="eyebrow">Words you could use</p><p>“${esc(best.say)}”</p></div>` : ""}`;
  }

  function verdictOf(o, conf) {
    const v = o.pts === 3 ? "You found the best move." : o.pts === 2 ? "Defensible, but there was a better move." : o.pts === 1 ? "Risky. It works today and costs you later." : "That's the trap most people fall into.";
    const c = conf === "sure" && o.pts < 3 ? " You were certain, so this is one to think about." : conf === "guess" && o.pts === 3 ? " You were guessing, but your instinct was right." : "";
    return { v, c };
  }

  function viewStep(n, i) {
    const all = steps(n); const st = all[i]; const ds = dayState(n); const a = ds.answers[st.key]; const total = all.length;
    const before = i > 0 ? meters(n, all[i - 1].key) : startMeters(n);
    const carry = i === 0 && n > 1 ? `Carried over from day ${n - 1}.` : "";
    const head = `<section class="stack"><p class="eyebrow">Day ${n} · Decision ${i + 1} of ${total}</p><div class="prog">${all.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div></section>`;
    let body;
    if (st.first) body = `<section class="card"><span class="chip o">${esc(SETTINGS[setting()].label)}</span><h2>${esc(st.sc.title)}</h2><p class="ctx">${esc(st.sc.ctx[setting()] || st.sc.ctx.office)}</p></section>`;
    else { const pa = ds.answers[st.prevKey]; const po = st.sc.options[pa.pick]; body = `<section class="card"><h2>${esc(st.sc.title)}, continued</h2><p class="ctx"><b>What happened:</b> ${esc(po.next)}</p></section>`; }
    if (!a) return head + meterHtml(before, null, carry) + body + choiceBlock(st, st.key);
    const after = meters(n, st.key); const mine = st.opts[a.pick];
    const isLast = i === total - 1; const nextIsStep2 = !isLast && !all[i + 1].first;
    const { v, c } = verdictOf(mine, a.conf);
    const showInsight = (st.first && !st.sc.step2) || !st.first;
    return head + meterHtml(after, before) + body + `<section class="stack">
      <div class="callout"><span class="grade g${mine.pts}">${GRADE[mine.pts]} · ${esc(STYLES[mine.s].name)}</span><h3>${v}</h3><p>${esc(mine.why)}${esc(c)}</p></div>
      ${rankedBlock(st, a.pick)}
      ${showInsight ? `<div class="card"><p class="eyebrow">What strong ${NOUN[trackId]} notice</p><p>${esc(st.sc.insight)}</p><label class="f" for="note">Coach's question: ${esc(st.sc.coach)}</label><textarea id="note" placeholder="Only you can see this.">${esc(ds.notes[st.sc.id] || "")}</textarea></div>` : ""}
      <button class="btn" id="nextStep">${nextIsStep2 ? "See what happens next" : isLast ? "Finish day " + n : "Next decision"}</button></section>`;
  }

  function viewPractice(key) {
    const items = practiceItems(C, P, setting()); const x = items.find(it => it.st.key === key);
    if (!x) return viewHome();
    const st = x.st; const pr = P.practice[key]; const first = dayState(x.day).answers[key];
    const head = `<section class="stack"><p class="eyebrow">Practice · from day ${x.day}</p><h1>${esc(st.sc.title)}</h1><p class="muted">Same situation, a few weeks on. Decide again without looking back.</p></section>
      <section class="card"><span class="chip o">${esc(SETTINGS[setting()].label)}</span><p class="ctx">${esc(st.sc.ctx[setting()] || st.sc.ctx.office)}</p></section>`;
    if (!pr) return head + choiceBlock(st, key + "~practice");
    const mine = st.opts[pr.pick]; const was = st.opts[first.pick]; const { v, c } = verdictOf(mine, pr.conf);
    const change = mine.pts > was.pts ? `First time you chose a ${GRADE[was.pts].toLowerCase()} option. This time you improved.` : mine.pts === was.pts ? "Same result as last time. Read the best move and its words once more." : "That's a step back from last time. Worth reading the ranking again.";
    return head + `<section class="stack"><div class="callout"><span class="grade g${mine.pts}">${GRADE[mine.pts]} · ${esc(STYLES[mine.s].name)}</span><h3>${v}</h3><p>${esc(change)}${esc(c)}</p></div>${rankedBlock(st, pr.pick)}<button class="btn" id="backHome">Back to my course</button></section>`;
  }

  function viewEnd(n) {
    const d = dayData(n); const ds = dayState(n); const sc = dayScore(n); const m = meters(n);
    const pct = sc.got / sc.max; const low = m.some(x => x < 30); const pass = pct >= 0.7 && !low;
    const counts = {}; for (const st of steps(n)) { const a = ds.answers[st.key]; if (a) { const s = st.opts[a.pick].s; counts[s] = (counts[s] || 0) + 1; } }
    const trap = Object.entries(counts).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1])[0];
    const focus = n === 3 && profile.focus ? `<section class="card"><p class="eyebrow">Back to your situation</p><p>When you started, you said you most wanted to handle this better:</p><p><b>“${esc(profile.focus)}”</b></p><label class="f" for="focusPlan">Which of this week's tools fits it (${esc(C.days.map(x => x.tool).join(", "))}), and what's your first move?</label><textarea id="focusPlan" placeholder="Only you can see this.">${esc(P.focusPlan || "")}</textarea></section>` : "";
    return `<section class="stack"><p class="eyebrow">Day ${n} complete</p><h1>${pass ? "Strong day." : "Worth another look."}</h1></section>
    <section class="card"><div class="row" style="justify-content:space-between"><div><p class="muted">Judgement</p><p class="big">${sc.got}<span class="muted" style="font-size:22px">/${sc.max}</span></p></div><div style="flex:1;min-width:220px">${meterHtml(m)}</div></div>
    <p>${pass ? "You protected your team's trust, your delivery and yourself." : low ? "One of your meters is below 30. In real life, that's where things break: lost trust, a missed target or you running on empty." : "You scored under 70% on judgement. Read the ranked answers again for the decisions you got wrong."}</p>
    ${trap ? `<p class="muted">Your most common trap today: <b>${esc(STYLES[trap[0]].name)}</b>. ${esc(STYLES[trap[0]].line)}</p>` : ""}</section>
    ${focus}
    <section class="card"><p class="eyebrow">Today's real-world mission</p><p>${esc(d.mission)}</p><label class="f" for="mission">What I'll do, and when</label><textarea id="mission" placeholder="Be specific: who, what and when.">${esc(ds.mission || "")}</textarea>${n < 3 ? `<p class="muted">Tomorrow starts by asking how it went.</p>` : `<p class="muted">We'll ask how it went in a few days.</p>`}</section>
    <button class="btn" id="finishDay">${n < 3 ? "Save and go to day " + (n + 1) : "Save and see my profile"}</button>`;
  }

  function refreshPick() {
    root.querySelectorAll("[data-pick]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.pick === draftPick.pick)));
    const li = $("#lockIn"); if (li) li.disabled = !(draftPick.pick != null && draftPick.conf);
  }

  function bind() {
    root.querySelectorAll("[data-day]").forEach(b => (b.onclick = () => {
      const n = +b.dataset.day; const ds = dayState(n);
      if (ds.done) { go({ screen: "end", day: n }); return; }
      const firstOpen = steps(n).findIndex(x => !ds.answers[x.key]);
      if (n === 1 && firstOpen <= 0 && !P.ratings.before && !P.ratings.beforeSkipped) { go({ screen: "rate", stage: "before", then: { screen: "lesson", day: 1 } }); return; }
      go(firstOpen <= 0 ? { screen: "lesson", day: n } : { screen: "step", day: n, i: firstOpen });
    }));
    root.querySelectorAll("[data-practice]").forEach(b => (b.onclick = () => go({ screen: "practice", key: b.dataset.practice })));
    root.querySelectorAll("[data-rate]").forEach(b => (b.onclick = () => go({ screen: "rate", stage: b.dataset.rate, then: { screen: "home" } })));
    root.querySelectorAll("[data-checkin]").forEach(b => (b.onclick = () => { const ds = dayState(+b.dataset.checkin); ds.checkin = b.dataset.val; ds.checkinAt = iso(); save(); render(); }));
    const cn = $("#checkinNote"); if (cn) cn.oninput = () => { dayState(+cn.dataset.n).checkinNote = cn.value; save(); };
    root.querySelectorAll("[data-rate-q]").forEach(r => (r.onchange = () => { draftRate.v[+r.dataset.rateQ] = +r.value; const b = $("#rateSave"); if (b) b.disabled = Object.keys(draftRate.v).length !== RATINGS[trackId].length; }));
    const rs = $("#rateSave"); if (rs) rs.onclick = () => { P.ratings[draftRate.stage] = draftRate.v; P.ratings[draftRate.stage + "At"] = iso(); const then = P.view.then || { screen: "home" }; draftRate = null; go(then); };
    const rk = $("#rateSkip"); if (rk) rk.onclick = () => { P.ratings.beforeSkipped = true; go(P.view.then || { screen: "home" }); };
    const em = $("#emails"); if (em) em.onchange = async () => { optOut = !em.checked; try { if (onPref) await onPref({ emailsOptOut: optOut }); } catch { em.checked = !optOut; optOut = !optOut; } };
    const rb = $("#resetBtn"); if (rb) rb.onclick = () => { $("#resetConfirm").classList.remove("hide"); rb.classList.add("hide"); };
    const ry = $("#resetYes"); if (ry) ry.onclick = () => { const snap = snapshot(); const history = [...(P.history || []), ...(snap ? [snap] : [])]; P = { days: {}, view: { screen: "home" }, ratings: {}, practice: {}, history, feedback: P.feedback }; save(); render(); };
    const rn = $("#resetNo"); if (rn) rn.onclick = () => render();
    const ts = $("#toSteps"); if (ts) ts.onclick = () => go({ screen: "step", day: P.view.day, i: 0 });
    root.querySelectorAll("[data-pick]").forEach(b => (b.onclick = () => { draftPick.pick = +b.dataset.pick; refreshPick(); }));
    root.querySelectorAll('input[name="conf"]').forEach(r => (r.onchange = () => { draftPick.conf = r.value; refreshPick(); }));
    const li = $("#lockIn"); if (li) li.onclick = () => {
      const v = P.view;
      if (v.screen === "practice") P.practice[v.key] = { pick: draftPick.pick, conf: draftPick.conf, at: iso() };
      else { const st = steps(v.day)[v.i]; dayState(v.day).answers[st.key] = { pick: draftPick.pick, conf: draftPick.conf }; }
      draftPick = null; save(); render();
    };
    const note = $("#note"); if (note) note.oninput = () => { const st = steps(P.view.day)[P.view.i]; dayState(P.view.day).notes[st.sc.id] = note.value; save(); };
    const ns = $("#nextStep"); if (ns) ns.onclick = () => { const { day, i } = P.view; if (i === steps(day).length - 1) go({ screen: "end", day }); else go({ screen: "step", day, i: i + 1 }); };
    const ms = $("#mission"); if (ms) ms.oninput = () => { dayState(P.view.day).mission = ms.value; save(); };
    const fp = $("#focusPlan"); if (fp) fp.oninput = () => { P.focusPlan = fp.value; save(); };
    const fs = $("#fbSend"); if (fs) fs.onclick = () => {
      const sc = root.querySelector('input[name="fbScore"]:checked');
      P.feedback = { score: sc ? +sc.value : null, useful: $("#fbUseful").value.slice(0, 2000), change: $("#fbChange").value.slice(0, 2000), use: [...root.querySelectorAll("[data-fbuse]")].filter(x => x.checked).map(x => x.dataset.fbuse), at: iso() };
      save(); render();
    };
    const bh = $("#backHome"); if (bh) bh.onclick = () => go({ screen: "home" });
    const fd = $("#finishDay"); if (fd) fd.onclick = () => {
      const n = P.view.day; const ds = dayState(n); ds.done = true; ds.doneAt = ds.doneAt || iso();
      if (n === 3) { P.completedAt = P.completedAt || iso(); if (!P.ratings.after) { go({ screen: "rate", stage: "after", then: { screen: "home" } }); return; } }
      go({ screen: "home" });
    };
  }

  function render() {
    const v = P.view || { screen: "home" };
    let html;
    try {
      if (v.screen === "lesson") html = viewLesson(v.day);
      else if (v.screen === "step") html = viewStep(v.day, v.i);
      else if (v.screen === "end") html = viewEnd(v.day);
      else if (v.screen === "rate") html = viewRate(v.stage);
      else if (v.screen === "practice") html = viewPractice(v.key);
      else html = viewHome();
    } catch (e) { if (typeof console !== "undefined") console.error(e); P.view = { screen: "home" }; html = viewHome(); }
    root.innerHTML = html;
    bind(); paintSave();
  }

  render();
  return () => { clearTimeout(timer); root.innerHTML = ""; };
}
