import Header from "@/components/Header";
import LoginForm from "./LoginForm";

export const metadata = { title: "Log in · True Plumb" };

export default async function LoginPage({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <Header />
      <section className="stack">
        <p className="eyebrow">Log in</p>
        <h1>We&apos;ll email you a login link</h1>
        <p className="muted">No password needed. Use the email address you booked with, or the one your manager added.</p>
      </section>
      {sp && sp.error === "link" && <p className="err" role="alert">That link has expired or was already used. Enter your email to get a new one.</p>}
      <LoginForm />
    </>
  );
}
