"use client";
import { useActionState } from "react";
import { sendLoginLink } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(sendLoginLink, null);
  if (state && state.sent) {
    return <p className="ok" role="status">If that email is booked on the sprint, a login link is on its way. Check your inbox and junk folder. The link works once and expires after an hour.</p>;
  }
  return (
    <form action={action} className="card">
      <label className="f" htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.co.uk" />
      {state && state.error && <p className="err" role="alert">{state.error}</p>}
      <button className="btn" type="submit" disabled={pending}>{pending ? "Sending…" : "Email me a login link"}</button>
    </form>
  );
}
