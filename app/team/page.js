import { redirect } from "next/navigation";
import Header from "@/components/Header";
import AddForm from "./AddForm";
import { resendInvite } from "./actions";
import { getSession } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { COURSES, SETTINGS, STYLES, GUIDES, PURPOSES, summarise } from "@/lib/course";
import PrintButton from "@/components/PrintButton";

export const metadata = { title: "My team · True Plumb" };

export default async function TeamPage() {
  const { supabase, user, profile } = await getSession();
  if (!user) redirect("/login");
  if (!profile || (profile.role !== "manager" && profile.role !== "admin")) redirect("/course");

  const { data: orgs } = await supabase.from("orgs").select("id, name, seats, created_at").eq("manager_id", user.id).order("created_at");
  if (!orgs || !orgs.length) {
    return (<><Header profile={profile} /><section className="card"><h1>No team licence yet</h1><p className="muted">When your firm buys a team licence, your team page appears here.</p></section></>);
  }
  const org = orgs[0];
  const seats = orgs.reduce((n, o) => n + o.seats, 0);
  const { data: members } = await supabase.from("org_members").select("id, email, full_name, user_id, invited_at").eq("org_id", org.id).order("invited_at");
  const ids = (members || []).map(m => m.user_id).filter(Boolean);
  const { data: profs } = ids.length ? await supabase.from("profiles").select("id, full_name, track, setting, purpose").in("id", ids) : { data: [] };
  // Read progress with the server key, then reduce it to scores only (notes never leave the server).
  const { data: progs } = ids.length ? await createAdminClient().from("progress").select("user_id, track, state, updated_at").in("user_id", ids) : { data: [] };

  const rows = (members || []).map(m => {
    const p = (profs || []).find(x => x.id === m.user_id);
    const pr = p && p.track ? (progs || []).find(x => x.user_id === m.user_id && x.track === p.track) : null;
    const s = p && p.track ? summarise(p.track, pr && pr.state, p.setting || "office") : null;
    return { m, p, s, last: pr ? pr.updated_at : null };
  });
  const started = rows.filter(r => r.s && r.s.answered > 0).length;
  const finished = rows.filter(r => r.s && r.s.daysDone === 3).length;
  const scored = rows.filter(r => r.s && r.s.judgement != null);
  const avg = scored.length ? Math.round(scored.reduce((n, r) => n + r.s.judgement, 0) / scored.length) : null;
  // Team-wide pattern: every answer from everyone, by style.
  const mix = { leader: 0, rescuer: 0, pleaser: 0, enforcer: 0, avoider: 0 };
  let sure = 0, sureRight = 0, missions = 0, missionsDone = 0, missionsChecked = 0;
  const before = [], after = [], d30 = [];
  rows.forEach(({ s }) => { if (!s) return;
    Object.entries(s.counts).forEach(([k, v]) => (mix[k] += v));
    sure += s.sure; sureRight += s.sureRight; missions += s.missions.length; missionsDone += s.missionsDone; missionsChecked += s.missionsChecked;
    if (s.ratingBefore != null) before.push(s.ratingBefore); if (s.ratingAfter != null) after.push(s.ratingAfter); if (s.rating30 != null) d30.push(s.rating30);
  });
  const totalAnswers = Object.values(mix).reduce((a, b) => a + b, 0);
  const trapRank = Object.entries(mix).filter(([k]) => k !== "leader").sort((a, b) => b[1] - a[1]);
  const teamTrapKey = trapRank[0] && trapRank[0][1] > 0 ? trapRank[0][0] : null;
  const guide = teamTrapKey ? GUIDES[teamTrapKey] : null;
  const mean = a => a.length ? (a.reduce((x, y) => x + y, 0) / a.length).toFixed(1) : "–";
  const fmt = d => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "–";

  return (
    <>
      <Header profile={profile} />
      <section className="stack">
        <p className="eyebrow">Team licence{org.name ? ` · ${org.name}` : ""}</p>
        <h1>Your team&apos;s sprint</h1>
      </section>
      <section className="grid2">
        <div className="stat"><span className="muted">Places used</span><b className="num">{rows.length}/{seats}</b></div>
        <div className="stat"><span className="muted">Started</span><b className="num">{started}</b></div>
        <div className="stat"><span className="muted">Finished all 3 days</span><b className="num">{finished}</b></div>
        <div className="stat"><span className="muted">Average judgement</span><b className="num">{avg == null ? "–" : avg + "%"}</b></div>
      </section>
      {totalAnswers > 0 && (
        <section className="card">
          <p className="eyebrow">Team report</p>
          <h2>How your team decides under pressure</h2>
          <div className="styles">{Object.entries(mix).map(([k, v]) => (
            <div className="sty" key={k}><span>{STYLES[k].name}</span><div className="bar"><i style={{ width: `${Math.round((v / totalAnswers) * 100)}%` }} /></div><span>{Math.round((v / totalAnswers) * 100)}%</span></div>
          ))}</div>
          <p className="muted">Share of all {totalAnswers} decisions your team has made, by the style each choice reflects. Leader is the best move.</p>
          <div className="grid2">
            <div className="stat"><span className="muted">Right when certain</span><b className="num">{sure ? `${Math.round((sureRight / sure) * 100)}%` : "–"}</b><span className="muted">{sure && sureRight / sure < 0.7 ? "Overconfident: slow down on the obvious-looking calls" : sure ? "Well calibrated" : ""}</span></div>
            <div className="stat"><span className="muted">Commitments done</span><b className="num">{missionsChecked ? `${missionsDone}/${missionsChecked}` : "–"}</b><span className="muted">{missions} made, {missionsChecked} checked in</span></div>
            <div className="stat"><span className="muted">Self-rating (out of 5)</span><b className="num">{mean(before)} → {mean(after)}</b><span className="muted">Before → after the sprint{d30.length ? ` · ${mean(d30)} at 30 days` : ""}</span></div>
          </div>
        </section>
      )}
      {guide && (
        <section className="card guide">
          <div className="row" style={{ justifyContent: "space-between" }}><p className="eyebrow">20-minute team discussion guide</p><PrintButton /></div>
          <h2>{guide.headline}</h2>
          <p><b>Open with (2 min):</b> {guide.opener}</p>
          <p><b>Share the pattern (3 min):</b> show the chart above. No names: it&apos;s the team&apos;s pattern, not anyone&apos;s score.</p>
          <p><b>Discuss (12 min):</b></p>
          <ol>{guide.questions.map(q => <li key={q}>{q}</li>)}</ol>
          <p><b>Agree (3 min):</b> {guide.agreement}</p>
          <p className="muted">Then book a 10-minute follow-up in two weeks to ask how the agreement is going.</p>
        </section>
      )}
      <AddForm orgId={org.id} left={seats - rows.length} />
      <section className="card">
        <h2>Progress</h2>
        {rows.length ? (
          <div className="scroll"><table>
            <thead><tr><th>Name</th><th>Course</th><th>Days done</th><th>Judgement</th><th>Main trap</th><th>Last active</th><th></th></tr></thead>
            <tbody>{rows.map(({ m, p, s, last }) => (
              <tr key={m.id}>
                <td><b>{(p && p.full_name) || m.full_name || m.email}</b><br /><span className="muted">{m.email}</span></td>
                <td>{p && p.track ? `${COURSES[p.track].track}${p.setting && SETTINGS[p.setting] ? " · " + SETTINGS[p.setting].label : ""}` : <span className="muted">Not set up yet</span>}{p && p.purpose ? <><br /><span className="chip">{(PURPOSES.find(x => x.id === p.purpose) || {}).name}</span></> : null}</td>
                <td className="num">{s ? `${s.daysDone}/3` : "0/3"}</td>
                <td className="num">{s && s.judgement != null ? s.judgement + "%" : "–"}</td>
                <td>{(s && s.topTrap) || "–"}</td>
                <td className="num">{fmt(last)}</td>
                <td>{!(s && s.answered) && (
                  <form action={resendInvite}><input type="hidden" name="org_id" value={org.id} /><input type="hidden" name="email" value={m.email} /><button className="btn ghost small" type="submit">Resend invite</button></form>
                )}</td>
              </tr>
            ))}</tbody>
          </table></div>
        ) : <p className="muted">Nobody added yet. Add your team above.</p>}
        <p className="muted">You see scores and patterns only. Each person&apos;s private notes and answers to the coach&apos;s questions stay private to them.</p>
      </section>
    </>
  );
}
