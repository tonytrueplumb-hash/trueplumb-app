import Link from "next/link";
import Header from "@/components/Header";

export const metadata = { title: "You're booked in · True Plumb" };

// Stripe payment links send buyers here after paying.
export default function Welcome() {
  return (
    <>
      <Header />
      <section className="stack">
        <p className="eyebrow">Payment received</p>
        <h1>You&apos;re booked in</h1>
        <p>We&apos;re emailing your login link now, to the address you paid with. It usually arrives within a minute. Can&apos;t see it? Check junk, and in Gmail the Updates or Promotions tab. It comes from noreply@trueplumb.co.uk.</p>
        <p className="muted">Bought a team licence? Your link opens your team page, where you add your people. Each of them gets their own login.</p>
      </section>
      <Link className="btn" href="/login">Didn&apos;t get it? Send a new link</Link>
    </>
  );
}
