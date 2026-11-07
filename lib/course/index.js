import TEAM from "./team";
import OPS from "./ops";

export const COURSES = { team: TEAM, ops: OPS };
export const SETTINGS = TEAM.settings;
export const STYLES = TEAM.styles;
export const NOUN = { team: "team leaders", ops: "operational managers" };
export const TRACKS = [
  { id: "team", name: "Team Leaders", d: "Leading a team day to day, often people you used to work alongside.", live: true },
  { id: "ops", name: "Operational Managers", d: "Running operations through supervisors, across teams or sites.", live: true },
  { id: "office", name: "Office & Admin", d: "Coordinators, PAs and admin teams under constant requests. Coming soon.", live: false },
  { id: "back", name: "Back Office", d: "Finance, payroll, HR and procurement. Coming soon.", live: false }
];
export const ROLE_LENGTHS = ["Under 6 months", "6 months to 2 years", "Over 2 years"];

// Flatten a day into decision steps (two-step scenarios become two steps).
export function steps(course, n) {
  const out = [];
  for (const sc of course.days[n - 1].scenarios) {
    out.push({ sc, key: sc.id, opts: sc.options, q: sc.q, first: true });
    if (sc.step2) out.push({ sc, key: sc.id + "b", opts: sc.step2.options, q: sc.step2.q, first: false, prevKey: sc.id });
  }
  return out;
}

// Summary of one person's progress on one track, for manager and admin pages.
export function summarise(trackId, prog) {
  const course = COURSES[trackId];
  if (!course) return null;
  const days = (prog && prog.days) || {};
  let got = 0, max = 0, done = 0, sure = 0, sureRight = 0, answered = 0;
  const counts = { leader: 0, rescuer: 0, pleaser: 0, enforcer: 0, avoider: 0 };
  for (const d of course.days) {
    const ds = days[d.n];
    if (ds && ds.done) done++;
    for (const st of steps(course, d.n)) {
      const a = ds && ds.answers && ds.answers[st.key];
      if (!a) continue;
      const o = st.opts[a.pick];
      if (!o) continue;
      answered++; max += 3; got += o.pts; counts[o.s]++;
      if (a.conf === "sure") { sure++; if (o.pts === 3) sureRight++; }
    }
  }
  const traps = Object.entries(counts).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1]);
  const topTrap = traps[0][1] > 0 ? STYLES[traps[0][0]].name : null;
  const missions = course.days.map(d => ({ day: d.n, text: (days[d.n] && days[d.n].mission) || "" })).filter(m => m.text);
  return { daysDone: done, answered, judgement: max ? Math.round((got / max) * 100) : null, topTrap, sure, sureRight, missions };
}
