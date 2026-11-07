import TEAM_SRC from "./team";
import OPS_SRC from "./ops";
import ADMIN_SRC from "./admin";
import BACK_SRC from "./back";
import DIRECTORS_SRC from "./directors";
import OPERATIVES_SRC from "./operatives";
import { applyTuning, forSetting, ROLE_TIPS, RATINGS, GUIDES } from "./tuning";
import { checkScore } from "./checks";
export { LAW, LAW_REVIEWED, LAW_SCOPE } from "./law";
export { CHECKS } from "./checks";

export const COURSES = {
  team: applyTuning("team", TEAM_SRC),
  ops: applyTuning("ops", OPS_SRC),
  office: applyTuning("office", ADMIN_SRC),
  back: applyTuning("back", BACK_SRC),
  directors: applyTuning("directors", DIRECTORS_SRC),
  operatives: applyTuning("operatives", OPERATIVES_SRC)
};
export const SETTINGS = TEAM_SRC.settings;
export const STYLES = TEAM_SRC.styles;
export const NOUN = { team: "team leaders", ops: "operational managers", office: "admin professionals", back: "back-office professionals", directors: "directors", operatives: "operatives" };
export { ROLE_TIPS, RATINGS, GUIDES };
export const TRACKS = [
  { id: "operatives", name: "General Operatives", d: "Doing the work on site, in the yard or on the floor. Speaking up when something isn't safe.", live: true },
  { id: "team", name: "Team Leaders", d: "Leading a team day to day, often people you used to work alongside.", live: true },
  { id: "ops", name: "Operational Managers", d: "Running operations through supervisors, across teams or sites.", live: true },
  { id: "directors", name: "Directors", d: "Running the business through your managers: clients, cash, people and the big calls.", live: true },
  { id: "office", name: "Office & Admin", d: "Coordinators, PAs and admin teams handling constant requests from every direction.", live: true },
  { id: "back", name: "Back Office", d: "Finance, payroll, HR and procurement: holding the line on controls under pressure.", live: true }
];
// Why someone is doing the course: joining, stepping up, refreshing, or just looking.
export const PURPOSES = [
  { id: "new", name: "I've just joined", d: "New to the business or the team, and getting up to speed." },
  { id: "stepup", name: "I'm stepping up", d: "Recently promoted, or about to be." },
  { id: "refresher", name: "Refresher", d: "I've been in this role a while and want to stay sharp." },
  { id: "explore", name: "Just exploring", d: "Seeing what it's like." }
];
export const PURPOSE_TIPS = {
  new: "You've just joined, so this is your starting point. Answer honestly rather than how you think you're meant to: your results are a baseline to build on, not a test.",
  stepup: "You're stepping up. The scenarios are built around the moments that catch people out in their first months in a new role, so take your time on the ones that feel unfamiliar.",
  refresher: "This is a refresher. The trap to watch for is answering on autopilot. Pay most attention to the questions you mark as 'Certain'.",
  explore: ""
};
// The natural next course for someone ready to step up.
export const PATHWAY = { operatives: "team", office: "team", back: "team", team: "ops", ops: "directors" };
export const ROLE_LENGTHS = ["Under 6 months", "6 months to 2 years", "Over 2 years"];
export const PRACTICE_WEEKS = 6;

// Flatten a day into decision steps (two-step scenarios become two steps), scored for the work setting.
export function steps(course, n, setting = "office") {
  const out = [];
  for (const sc of course.days[n - 1].scenarios) {
    out.push({ sc, key: sc.id, opts: sc.options.map(o => forSetting(o, setting)), q: sc.q, first: true });
    if (sc.step2) out.push({ sc, key: sc.id + "b", opts: sc.step2.options.map(o => forSetting(o, setting)), q: sc.step2.q, first: false, prevKey: sc.id });
  }
  return out;
}

// Decisions answered below "Best move" first time: these come back as weekly practice.
export function practiceItems(course, prog, setting) {
  const out = [];
  for (const d of course.days) {
    const ds = prog && prog.days && prog.days[d.n]; if (!ds) continue;
    for (const st of steps(course, d.n, setting)) {
      if (!st.first) continue; // follow-ups depend on the first answer, so practise the opening decision
      const a = ds.answers && ds.answers[st.key];
      if (a && st.opts[a.pick] && st.opts[a.pick].pts < 3) out.push({ day: d.n, st });
    }
  }
  return out;
}

// How many practice decisions are unlocked: two straight away, then two more each week.
export function practiceUnlocked(prog, now = Date.now()) {
  if (!prog || !prog.completedAt) return 0;
  const weeks = Math.floor((now - Date.parse(prog.completedAt)) / (7 * 864e5));
  return 2 + 2 * Math.max(0, Math.min(weeks, PRACTICE_WEEKS - 1));
}

const avg = o => { const v = Object.values(o || {}).filter(x => typeof x === "number"); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };

// Summary of one person's progress on one track, for manager and admin pages. Never includes notes.
export function summarise(trackId, prog, setting = "office") {
  const course = COURSES[trackId];
  if (!course) return null;
  const days = (prog && prog.days) || {};
  let got = 0, max = 0, done = 0, sure = 0, sureRight = 0, answered = 0;
  const counts = { leader: 0, rescuer: 0, pleaser: 0, enforcer: 0, avoider: 0 };
  for (const d of course.days) {
    const ds = days[d.n];
    if (ds && ds.done) done++;
    for (const st of steps(course, d.n, setting)) {
      const a = ds && ds.answers && ds.answers[st.key];
      if (!a) continue;
      const o = st.opts[a.pick];
      if (!o) continue;
      answered++; max += 3; got += o.pts; counts[o.s]++;
      if (a.conf === "sure") { sure++; if (o.pts === 3) sureRight++; }
    }
  }
  const traps = Object.entries(counts).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1]);
  const topTrapKey = traps[0][1] > 0 ? traps[0][0] : null;
  const missions = course.days.map(d => ({ day: d.n, text: (days[d.n] && days[d.n].mission) || "", checkin: (days[d.n] && days[d.n].checkin) || null })).filter(m => m.text);
  const r = (prog && prog.ratings) || {};
  const pr = (prog && prog.practice) || {};
  const pItems = practiceItems(course, prog, setting);
  const pDone = pItems.filter(x => pr[x.st.key]);
  const pFixed = pDone.filter(x => { const o = x.st.opts[pr[x.st.key].pick]; return o && o.pts === 3; });
  return {
    daysDone: done, answered, judgement: max ? Math.round((got / max) * 100) : null,
    knowledge: (checkScore(trackId, prog) || {}).pct ?? null,
    counts, topTrapKey, topTrap: topTrapKey ? STYLES[topTrapKey].name : null,
    sure, sureRight, missions,
    missionsDone: missions.filter(m => m.checkin === "done").length,
    missionsChecked: missions.filter(m => m.checkin).length,
    ratingBefore: avg(r.before), ratingAfter: avg(r.after), rating30: avg(r.d30),
    practiceTotal: pItems.length, practiceDone: pDone.length, practiceFixed: pFixed.length,
    completedAt: (prog && prog.completedAt) || null,
    history: (prog && prog.history) || []
  };
}
