import { redirect } from "next/navigation";
import Header from "@/components/Header";
import AddForm from "./AddForm";
import { resendInvite } from "./actions";
import { getSession } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { COURSES, SETTINGS, summarise } from "@/lib/course";

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
  const { data: profs } = ids.length ? await supabase.from("profiles").select("id, full_name, track, setting").in("id", ids) : { data: [] };
  // Read progress with the server key, then reduce it to scores only (notes never leave the server).
  const { data: progs } = ids.length ? await createAdminClient().from("progress").select("user_id, track, state, updated_at").in("user_id", ids) : { data: [] };

  const rows = (members || []).map(m => {
    const p = (profs || []).find(x => x.id === m.user_id);
    const pr = p && p.track ? (progs || []).find(x => x.user_id === m.user_id && x.track === p.track) : null;
    const s = p && p.track ? summarise(p.track, pr && pr.state) : null;
    return { m, p, s, last: pr ? pr.updated_at : null };
  });
  const started = rows.filter(r => r.s && r.s.answered > 0).length;
  const finished = rows.filter(r => r.s && r.s.daysDone === 3).length;
  const scored = rows.filter(r => r.s && r.s.judgement != null);
  const avg = scored.length ? Math.round(scored.reduce((n, r) => n + r.s.judgement, 0) / scored.length) : null;
  const trapCount = {};
  rows.forEach(r => { if (r.s && r.s.topTrap) trapCount[r.s.topTrap] = (trapCount[r.s.topTrap] || 0) + 1; });
  const teamTrap = Object.entries(trapCount).sort((a, b) => b[1] - a[1])[0];
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
      {teamTrap && <section className="callout"><h3>Your team&apos;s most common trap: {teamTrap[0]}</h3><p>This is the habit most of your people fall back on under pressure. It&apos;s the best place to start in your debrief.</p></section>}
      <AddForm orgId={org.id} left={seats - rows.length} />
      <section className="card">
        <h2>Progress</h2>
        {rows.length ? (
          <div className="scroll"><table>
            <thead><tr><th>Name</th><th>Course</th><th>Days done</th><th>Judgement</th><th>Main trap</th><th>Last active</th><th></th></tr></thead>
            <tbody>{rows.map(({ m, p, s, last }) => (
              <tr key={m.id}>
                <td><b>{(p && p.full_name) || m.full_name || m.email}</b><br /><span className="muted">{m.email}</span></td>
                <td>{p && p.track ? `${COURSES[p.track].track}${p.setting && SETTINGS[p.setting] ? " · " + SETTINGS[p.setting].label : ""}` : <span className="muted">Not set up yet</span>}</td>
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
