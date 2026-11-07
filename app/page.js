import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { getSession } from "@/lib/supabase/server";

export default async function Home() {
  const { user, profile } = await getSession();
  if (user && profile) {
    if (profile.role === "admin") redirect("/admin");
    if (profile.role === "manager" && !profile.track) redirect("/team");
    if (!profile.track) redirect("/start");
    redirect("/course");
  }
  const buyOne = process.env.NEXT_PUBLIC_BUY_INDIVIDUAL_URL;
  const buyTeam = process.env.NEXT_PUBLIC_BUY_TEAM_URL;
  return (
    <>
      <Header />
      <section className="stack">
        <p className="eyebrow">True Plumb Academy · Execution Sprint</p>
        <h1>Real decisions, for every level of your business</h1>
        <p className="muted">Three days, about 15 minutes a day on your phone. Every option sounds sensible and each one has a cost. You&apos;ll see what each choice does to trust, delivery and your own capacity. Six courses, from operatives on site to the boardroom, in the office, on site or hybrid.</p>
      </section>
      <section className="tiles">
        <div className="card"><h3>From day one to the boardroom</h3><p className="muted">General Operatives, Team Leaders, Operational Managers, Directors, Office &amp; Admin and Back Office.</p></div>
        <div className="card"><h3>Joining, stepping up, staying sharp</h3><p className="muted">A baseline for new starters, preparation before a promotion rather than after, and refreshers that keep good habits going.</p></div>
        <div className="card"><h3>No obvious answers</h3><p className="muted">Four believable options per decision, each ranked and explained after you choose.</p></div>
        <div className="card"><h3>Your leadership profile</h3><p className="muted">See which trap you fall into under pressure, and commit to one real action a day.</p></div>
      </section>
      <section className="card">
        <h2>Get started</h2>
        <div className="row">
          {buyOne && <a className="btn" href={buyOne}>Book a place</a>}
          {buyTeam && <a className="btn ghost" href={buyTeam}>Team licence for your firm</a>}
          <Link className="btn ghost" href="/login">Log in</Link>
        </div>
        {!buyOne && <p className="muted">Bookings open on 7 December. Already booked? Log in with the email you paid with.</p>}
      </section>
      <p className="foot">True Plumb · Seaham, County Durham</p>
    </>
  );
}
