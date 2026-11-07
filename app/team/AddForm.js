"use client";
import { useActionState } from "react";
import { addParticipants } from "./actions";

export default function AddForm({ orgId, left }) {
  const [state, action, pending] = useActionState(addParticipants, null);
  return (
    <form action={action} className="card">
      <input type="hidden" name="org_id" value={orgId} />
      <h2>Add your team</h2>
      <p className="muted">One person per line: name, then email. Each person gets an email with their own login link. You have <b>{left}</b> place{left === 1 ? "" : "s"} left.</p>
      <label className="f" htmlFor="people">Names and emails</label>
      <textarea id="people" name="people" rows={6} placeholder={"Sam Smith, sam@yourfirm.co.uk\nPriya Patel, priya@yourfirm.co.uk"} disabled={left <= 0} />
      {state && state.error && <p className="err" role="alert">{state.error}</p>}
      {state && state.sent && (
        <p className="ok" role="status">
          Invited {state.sent.length} {state.sent.length === 1 ? "person" : "people"}.
          {state.skipped ? ` ${state.skipped} already on your team.` : ""}
          {state.failed && state.failed.length ? ` Couldn't invite: ${state.failed.join(", ")}. Try again in a minute.` : ""}
          {state.bad && state.bad.length ? ` Skipped lines without a valid email: ${state.bad.length}.` : ""}
        </p>
      )}
      <button className="btn" type="submit" disabled={pending || left <= 0}>{pending ? "Sending invites…" : "Send invites"}</button>
    </form>
  );
}
