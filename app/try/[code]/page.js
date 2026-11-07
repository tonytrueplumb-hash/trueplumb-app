import Header from "@/components/Header";
import TryForm from "./TryForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { inviteStatus } from "@/lib/invites";
import { TRACKS } from "@/lib/course";

export const metadata = { title: "Try the Execution Sprint · True Plumb", robots: { index: false } };
export const dynamic = "force-dynamic";

const CLOSED = {
  off: "This invite link isn't active. If someone sent it to you, ask them for a new one.",
  expired: "This invite link has expired. If someone sent it to you, ask them for a new one.",
  full: "All the places on this invite link have been taken. If someone sent it to you, ask them for a new one."
};

export default async function TryPage({ params }) {
  const { code } = await params;
  const { data: link } = await createAdminClient().from("invite_links").select("*").eq("code", String(code || "").slice(0, 40)).maybeSingle();
  const status = inviteStatus(link);
  return (
    <>
      <Header />
      <section className="stack">
        <p className="eyebrow">You&apos;re invited</p>
        <h1>Try the True Plumb Execution Sprint</h1>
        <p className="muted">Three days, about 15 minutes a day, on your phone or laptop. Realistic workplace scenarios with no obvious answers, written for your role and how your team works. At the end you get your own leadership profile.</p>
      </section>
      {status === "open" ? (
        <>
          <section className="card">
            <h3>Choose your course after you log in</h3>
            <ul>{TRACKS.filter(t => t.live).map(t => <li key={t.id}><b>{t.name}:</b> {t.d}</li>)}</ul>
          </section>
          <TryForm code={code} />
        </>
      ) : (
        <p className="err" role="alert">{CLOSED[status]}</p>
      )}
    </>
  );
}
