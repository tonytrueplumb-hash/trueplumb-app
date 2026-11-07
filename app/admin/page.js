import { redirect } from "next/navigation";
import Header from "@/components/Header";
import AddCustomer from "./AddCustomer";
import { getSession } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { COURSES, SETTINGS, summarise } from "@/lib/course";

export const metadata = { title: "Admin · True Plumb" };
export const dynamic = "force-dynamic";

const money = (p, c) => p == null ? "–" : new Intl.NumberFormat("en-GB", { style: "currency", currency: (c || "gbp").toUpperCase() }).format(p / 100);
const fmt = d => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" }) : "–";

export default async function AdminPage() {
  const { user, profile } = await getSession();
  if (!user) redirect("/login");
  if (!profile || profile.role !== "admin") redirect("/");
  const admin = createAdminClient();
  const [{ data: purchases }, { data: orgs }, { data: people }, { data: progs }, { data: members }] = await Promise.all([
    admin.from("purchases").select("*").order("created_at", { ascending: false }).limit(200),
    admin.from("orgs").select("id, name, seats, manager_id, created_at").order("created_at", { ascending: false }),
    admin.from("profiles").select("*").order("created_at", { ascending: false }).limit(1000),
    admin.from("progress").select("user_id, track, state, updated_at"),
    admin.from("org_members").select("org_id")
  ]);
  const P = people || [];
  const revenue = (purchases || []).reduce((n, p) => n + (p.amount_total || 0), 0);
  const learners = P.filter(p => p.role !== "admin");
  const rows = learners.map(p => {
    const pr = (progs || []).find(x => x.user_id === p.id && x.track === p.track);
    return { p, s: p.track ? summarise(p.track, pr && pr.state) : null, last: pr && pr.updated_at };
  });
  const finished = rows.filter(r => r.s && r.s.daysDone === 3).length;

  return (
    <>
      <Header profile={profile} />
      <section className="stack"><p className="eyebrow">Admin</p><h1>True Plumb Execution Sprint</h1></section>
      <section className="grid2">
        <div className="stat"><span className="muted">Revenue (card)</span><b className="num">{money(revenue, "gbp")}</b></div>
        <div className="stat"><span className="muted">People</span><b className="num">{learners.length}</b></div>
        <div className="stat"><span className="muted">Team licences</span><b className="num">{(orgs || []).length}</b></div>
        <div className="stat"><span className="muted">Finished all 3 days</span><b className="num">{finished}</b></div>
      </section>
      <AddCustomer />
      <section className="card"><h2>Team licences</h2>
        {(orgs || []).length ? <div className="scroll"><table><thead><tr><th>Company</th><th>Manager</th><th>Places used</th><th>Since</th></tr></thead><tbody>
          {orgs.map(o => { const m = P.find(p => p.id === o.manager_id); const used = (members || []).filter(x => x.org_id === o.id).length;
            return <tr key={o.id}><td>{o.name || "–"}</td><td>{m ? `${m.full_name || ""} ${m.email}` : "–"}</td><td className="num">{used}/{o.seats}</td><td className="num">{fmt(o.created_at)}</td></tr>; })}
        </tbody></table></div> : <p className="muted">None yet.</p>}
      </section>
      <section className="card"><h2>People and progress</h2>
        {rows.length ? <div className="scroll"><table><thead><tr><th>Person</th><th>Course</th><th>Days</th><th>Judgement</th><th>Main trap</th><th>Wants help with</th><th>Last active</th></tr></thead><tbody>
          {rows.map(({ p, s, last }) => (
            <tr key={p.id}>
              <td><b>{p.full_name || "–"}</b><br /><span className="muted">{p.email}</span><br /><span className="chip">{p.role}{p.org_id ? " · team" : ""}</span></td>
              <td>{p.track ? `${COURSES[p.track] ? COURSES[p.track].track : p.track}${p.setting && SETTINGS[p.setting] ? " · " + SETTINGS[p.setting].label : ""}` : <span className="muted">Not set up</span>}{p.role_length ? <><br /><span className="muted">{p.role_length} in role</span></> : null}</td>
              <td className="num">{s ? `${s.daysDone}/3` : "–"}</td>
              <td className="num">{s && s.judgement != null ? s.judgement + "%" : "–"}</td>
              <td>{(s && s.topTrap) || "–"}</td>
              <td style={{ maxWidth: 260 }}>{p.focus_note || <span className="muted">–</span>}</td>
              <td className="num">{fmt(last)}</td>
            </tr>
          ))}
        </tbody></table></div> : <p className="muted">Nobody yet.</p>}
      </section>
      <section className="card"><h2>Payments</h2>
        {(purchases || []).length ? <div className="scroll"><table><thead><tr><th>Date</th><th>Email</th><th>Type</th><th>Places</th><th>Amount</th></tr></thead><tbody>
          {purchases.map(p => <tr key={p.id}><td className="num">{fmt(p.created_at)}</td><td>{p.email}</td><td>{p.kind}{p.stripe_session_id.startsWith("manual_") ? " (manual)" : ""}</td><td className="num">{p.seats}</td><td className="num">{money(p.amount_total, p.currency)}</td></tr>)}
        </tbody></table></div> : <p className="muted">No payments yet.</p>}
      </section>
    </>
  );
}
