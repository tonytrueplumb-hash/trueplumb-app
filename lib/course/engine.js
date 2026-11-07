// The course player. Renders into a root element and calls onSave(state) when progress changes.
import { COURSES, SETTINGS, STYLES, NOUN, steps as stepsFor } from "./index";

const GRADE = { 3: "Best move", 2: "Defensible", 1: "Risky", 0: "Trap" };
const CONF = [["guess", "Guessing"], ["fair", "Fairly sure"], ["sure", "Certain"]];
const METERS = ["Trust", "Delivery", "You"];

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function order(id, n) { const a = [...Array(n).keys()]; let h = hash(id); for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

export function mountCourse(root, { trackId, profile, initial, onSave, editHref }) {
  const C = COURSES[trackId];
  let P = initial && initial.days ? initial : { days: {}, view: { screen: "home" } };
  if (!P.view) P.view = { screen: "home" };
  let draftPick = null;
  let saveState = "saved";
  let timer = null;
  const setting = () => (SETTINGS[profile.setting] ? profile.setting : "office");
  const steps = n => stepsFor(C, n);
  const dayData = n => C.days[n - 1];
  const dayState = n => P.days[n] || (P.days[n] = { answers: {}, notes: {}, mission: "", done: false });
  const $ = s => root.querySelector(s);

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
  function go(view) { P.view = view; save(); render(); window.scrollTo({ top: 0 }); }

  function meters(n, uptoKey) {
    const m = [50, 50, 50]; const ds = dayState(n);
    for (const st of steps(n)) {
      const a = ds.answers[st.key];
      if (a) st.opts[a.pick].fx.forEach((v, i) => (m[i] = Math.max(0, Math.min(100, m[i] + v))));
      if (st.key === uptoKey) break;
    }
    return m;
  }
  function dayScore(n) { const ds = dayState(n); let got = 0, max = 0; for (const st of steps(n)) { max += 3; const a = ds.answers[st.key]; if (a) got += st.opts[a.pick].pts; } return { got, max }; }
  function allAnswers() { const out = []; for (const d of C.days) { const ds = P.days[d.n]; if (!ds) continue; for (const st of steps(d.n)) { const a = ds.answers[st.key]; if (a) out.push({ o: st.opts[a.pick], conf: a.conf }); } } return out; }

  function meterHtml(m, prev) {
    return `<div class="meters">${METERS.map((name, i) => { const d = prev ? m[i] - prev[i] : 0; return `<div class="meter"><div class="lab"><span>${name}</span><span>${m[i]}${d ? ` <span class="delta ${d > 0 ? "up" : "down"}">${d > 0 ? "+" : ""}${d}</span>` : ""}</span></div><div class="bar"><i class="${m[i] < 30 ? "low" : ""}" style="width:${m[i]}%"></i></div></div>`; }).join("")}</div>`;
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
    <section class="days">${C.days.map(d => { const ds = dayState(d.n); const sc = dayScore(d.n); const locked = d.n > 1 && !dayState(d.n - 1).done;
      return `<button class="day ${ds.done ? "done" : ""}" data-day="${d.n}" ${locked ? "disabled" : ""}><span class="num">${d.n}</span><span class="meta"><h3>${esc(d.title)}</h3><span class="muted">${esc(d.tool)} · ${d.minutes} min</span>${ds.done ? `<span class="chip o">Judgement ${sc.got}/${sc.max}</span>` : locked ? `<span class="chip">Finish day ${d.n - 1} first</span>` : Object.keys(ds.answers).length ? `<span class="chip o">In progress</span>` : ""}</span></button>`; }).join("")}</section>
    ${profilePanel()}
    <section class="card"><h3>Settings</h3><p class="muted">Course: ${esc(C.track)}. Work setting: ${esc(SETTINGS[setting()].label)}. Progress is kept separately for each course.</p>
      <div class="row"><a class="btn ghost small" href="${editHref}">Change course or work setting</a><button class="btn ghost small" id="resetBtn">Start this course again</button></div>
      <div id="resetConfirm" class="hide row"><span>This clears your answers and notes for this course.</span><button class="btn small" id="resetYes">Clear them</button><button class="btn ghost small" id="resetNo">Keep them</button></div>
    </section>`;
  }

  function profilePanel() {
    const all = allAnswers(); if (!all.length) return "";
    const counts = { leader: 0, rescuer: 0, pleaser: 0, enforcer: 0, avoider: 0 }; all.forEach(a => counts[a.o.s]++);
    const traps = Object.entries(counts).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1]);
    const top = traps[0][1] > 0 ? traps[0][0] : null;
    const sure = all.filter(a => a.conf === "sure"); const sureRight = sure.filter(a => a.o.pts === 3).length;
    const commits = C.days.map(d => ({ d, m: (P.days[d.n] || {}).mission })).filter(x => x.m);
    return `<section class="card"><p class="eyebrow">Your leadership profile</p>
      <h2>${top ? `Under pressure you lean ${esc(STYLES[top].name)}` : "No default trap yet"}</h2>
      <p class="muted">${top ? esc(STYLES[top].line) : "You've picked the best move every time so far."}</p>
      <div class="styles">${Object.entries(counts).map(([k, v]) => `<div class="sty"><span>${esc(STYLES[k].name)}</span><div class="bar"><i style="width:${Math.round(v / all.length * 100)}%"></i></div><span>${v}</span></div>`).join("")}</div>
      ${sure.length ? `<p><b>When you were certain, you were right ${sureRight} of ${sure.length} times.</b> <span class="muted">${sureRight / sure.length < 0.7 ? "Your confidence runs ahead of your judgement. Slow down on the ones that feel obvious." : "Your confidence is well calibrated."}</span></p>` : ""}
      ${commits.length ? `<h3>Your commitments</h3><ul>${commits.map(c => `<li><b>Day ${c.d.n}:</b> ${esc(c.m)}</li>`).join("")}</ul>` : ""}
    </section>`;
  }

  function viewLesson(n) {
    const d = dayData(n);
    return `<section class="stack"><p class="eyebrow">Day ${n} of 3 · ${esc(d.tool)}</p><h1>${esc(d.title)}</h1></section>
    <section class="lesson">${d.lesson.map((c, i) => `<div class="card"><span class="eyebrow">${i + 1}</span><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p></div>`).join("")}</section>
    <section class="callout"><h3>How the scenarios work</h3><p>Each option sounds reasonable, and only one is the best move. Choose, say how sure you are, then see what every option would have done. Three meters track your team's <b>Trust</b>, your <b>Delivery</b> and <b>You</b>, meaning your own time and energy.</p></section>
    <button class="btn" id="toSteps">Start the scenarios</button>`;
  }

  function viewStep(n, i) {
    const all = steps(n); const st = all[i]; const ds = dayState(n); const a = ds.answers[st.key]; const total = all.length;
    const before = i > 0 ? meters(n, all[i - 1].key) : [50, 50, 50];
    const ord = order(st.key, st.opts.length); const letters = "ABCD";
    const head = `<section class="stack"><p class="eyebrow">Day ${n} · Decision ${i + 1} of ${total}</p><div class="prog">${all.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div></section>`;
    let body;
    if (st.first) body = `<section class="card"><span class="chip o">${esc(SETTINGS[setting()].label)}</span><h2>${esc(st.sc.title)}</h2><p class="ctx">${esc(st.sc.ctx[setting()] || st.sc.ctx.office)}</p></section>`;
    else { const pa = ds.answers[st.prevKey]; const po = st.sc.options[pa.pick]; body = `<section class="card"><h2>${esc(st.sc.title)}, continued</h2><p class="ctx"><b>What happened:</b> ${esc(po.next)}</p></section>`; }
    if (!a) {
      if (!draftPick || draftPick.key !== st.key) draftPick = { key: st.key, pick: null, conf: null };
      const pick = draftPick;
      return head + meterHtml(before) + body + `<section class="stack"><h3>${esc(st.q)}</h3>
        <div class="stack" role="group" aria-label="Options">${ord.map((oi, k) => `<button class="choice" data-pick="${oi}" aria-pressed="${pick.pick === oi}"><span class="k">${letters[k]}</span><span>${esc(st.opts[oi].t)}</span></button>`).join("")}</div>
        <fieldset class="stack" style="border:0;padding:0;margin:0"><legend class="f" style="margin-bottom:8px">How sure are you?</legend><div class="conf">${CONF.map(([v, l]) => `<label><input type="radio" name="conf" value="${v}" ${pick.conf === v ? "checked" : ""}>${l}</label>`).join("")}</div></fieldset>
        <button class="btn" id="lockIn" ${pick.pick != null && pick.conf ? "" : "disabled"}>Lock in my answer</button></section>`;
    }
    const after = meters(n, st.key); const mine = st.opts[a.pick];
    const isLast = i === total - 1; const nextIsStep2 = !isLast && !all[i + 1].first;
    const verdict = mine.pts === 3 ? "You found the best move." : mine.pts === 2 ? "Defensible, but there was a better move." : mine.pts === 1 ? "Risky. It works today and costs you later." : "That's the trap most people fall into.";
    const confNote = a.conf === "sure" && mine.pts < 3 ? " You were certain, so this is one to think about." : a.conf === "guess" && mine.pts === 3 ? " You were guessing, but your instinct was right." : "";
    const showInsight = (st.first && !st.sc.step2) || !st.first;
    return head + meterHtml(after, before) + body + `<section class="stack">
      <div class="callout"><span class="grade g${mine.pts}">${GRADE[mine.pts]} · ${esc(STYLES[mine.s].name)}</span><h3>${verdict}</h3><p>${esc(mine.why)}${esc(confNote)}</p></div>
      <h3>Every option, ranked</h3>
      ${[...st.opts.keys()].sort((x, y) => st.opts[y].pts - st.opts[x].pts).map(oi => { const o = st.opts[oi]; return `<div class="rev ${oi === a.pick ? "mine" : ""}"><div class="row"><span class="grade g${o.pts}">${GRADE[o.pts]}</span><span class="chip">${esc(STYLES[o.s].name)}</span>${oi === a.pick ? '<span class="chip o">Your answer</span>' : ""}</div><p><b>${esc(o.t)}</b></p><p class="muted">${esc(o.why)}</p></div>`; }).join("")}
      ${showInsight ? `<div class="card"><p class="eyebrow">What strong ${NOUN[trackId]} notice</p><p>${esc(st.sc.insight)}</p><label class="f" for="note">Coach's question: ${esc(st.sc.coach)}</label><textarea id="note" placeholder="Only you can see this.">${esc(ds.notes[st.sc.id] || "")}</textarea></div>` : ""}
      <button class="btn" id="nextStep">${nextIsStep2 ? "See what happens next" : isLast ? "Finish day " + n : "Next decision"}</button></section>`;
  }

  function viewEnd(n) {
    const d = dayData(n); const ds = dayState(n); const sc = dayScore(n); const m = meters(n);
    const pct = sc.got / sc.max; const low = m.some(x => x < 30); const pass = pct >= 0.7 && !low;
    const counts = {}; for (const st of steps(n)) { const a = ds.answers[st.key]; if (a) { const s = st.opts[a.pick].s; counts[s] = (counts[s] || 0) + 1; } }
    const trap = Object.entries(counts).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1])[0];
    return `<section class="stack"><p class="eyebrow">Day ${n} complete</p><h1>${pass ? "Strong day." : "Worth another look."}</h1></section>
    <section class="card"><div class="row" style="justify-content:space-between"><div><p class="muted">Judgement</p><p class="big">${sc.got}<span class="muted" style="font-size:22px">/${sc.max}</span></p></div><div style="flex:1;min-width:220px">${meterHtml(m)}</div></div>
    <p>${pass ? "You protected your team's trust, your delivery and yourself." : low ? "One of your meters dropped below 30. In real life, that's where things break: lost trust, a missed target or you running on empty." : "You scored under 70% on judgement. Read the ranked answers again for the decisions you got wrong."}</p>
    ${trap ? `<p class="muted">Your most common trap today: <b>${esc(STYLES[trap[0]].name)}</b>. ${esc(STYLES[trap[0]].line)}</p>` : ""}</section>
    <section class="card"><p class="eyebrow">Today's real-world mission</p><p>${esc(d.mission)}</p><label class="f" for="mission">What I'll do, and when</label><textarea id="mission" placeholder="Be specific: who, what and when.">${esc(ds.mission || "")}</textarea></section>
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
      go(firstOpen <= 0 ? { screen: "lesson", day: n } : { screen: "step", day: n, i: firstOpen });
    }));
    const rb = $("#resetBtn"); if (rb) rb.onclick = () => { $("#resetConfirm").classList.remove("hide"); rb.classList.add("hide"); };
    const ry = $("#resetYes"); if (ry) ry.onclick = () => { P = { days: {}, view: { screen: "home" } }; save(); render(); };
    const rn = $("#resetNo"); if (rn) rn.onclick = () => render();
    const ts = $("#toSteps"); if (ts) ts.onclick = () => go({ screen: "step", day: P.view.day, i: 0 });
    root.querySelectorAll("[data-pick]").forEach(b => (b.onclick = () => { draftPick.pick = +b.dataset.pick; refreshPick(); }));
    root.querySelectorAll('input[name="conf"]').forEach(r => (r.onchange = () => { draftPick.conf = r.value; refreshPick(); }));
    const li = $("#lockIn"); if (li) li.onclick = () => { const { day, i } = P.view; const st = steps(day)[i]; dayState(day).answers[st.key] = { pick: draftPick.pick, conf: draftPick.conf }; draftPick = null; save(); render(); };
    const note = $("#note"); if (note) note.oninput = () => { const st = steps(P.view.day)[P.view.i]; dayState(P.view.day).notes[st.sc.id] = note.value; save(); };
    const ns = $("#nextStep"); if (ns) ns.onclick = () => { const { day, i } = P.view; if (i === steps(day).length - 1) go({ screen: "end", day }); else go({ screen: "step", day, i: i + 1 }); };
    const ms = $("#mission"); if (ms) ms.oninput = () => { dayState(P.view.day).mission = ms.value; save(); };
    const fd = $("#finishDay"); if (fd) fd.onclick = () => { dayState(P.view.day).done = true; go({ screen: "home" }); };
  }

  function render() {
    const v = P.view || { screen: "home" };
    let html;
    try {
      if (v.screen === "lesson") html = viewLesson(v.day);
      else if (v.screen === "step") html = viewStep(v.day, v.i);
      else if (v.screen === "end") html = viewEnd(v.day);
      else html = viewHome();
    } catch { P.view = { screen: "home" }; html = viewHome(); }
    root.innerHTML = html;
    bind(); paintSave();
  }

  render();
  return () => { clearTimeout(timer); root.innerHTML = ""; };
}
