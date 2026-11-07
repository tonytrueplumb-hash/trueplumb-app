"use client";
import { useActionState } from "react";
import { joinWithInvite } from "./actions";

export default function TryForm({ code }) {
  const [state, action, pending] = useActionState(joinWithInvite, null);
  if (state && state.ok) return <p className="ok" role="status">{state.ok}</p>;
  return (
    <form action={action} className="card">
      <input type="hidden" name="code" value={code} />
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="f" htmlFor="t_name">First name</label>
      <input id="t_name" name="name" type="text" autoComplete="given-name" required maxLength={80} />
      <label className="f" htmlFor="t_email">Email address</label>
      <input id="t_email" name="email" type="email" autoComplete="email" required placeholder="you@company.co.uk" />
      {state && state.error && <p className="err" role="alert">{state.error}</p>}
      <button className="btn" type="submit" disabled={pending}>{pending ? "Setting you up…" : "Get my login link"}</button>
      <p className="muted">We&apos;ll email you a link to log in. No password, no payment.</p>
    </form>
  );
}
