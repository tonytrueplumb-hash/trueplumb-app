"use client";
import { useActionState, useState } from "react";
import { addCustomer } from "./actions";

export default function AddCustomer() {
  const [state, action, pending] = useActionState(addCustomer, null);
  const [kind, setKind] = useState("individual");
  return (
    <form action={action} className="card">
      <h2>Add a customer by hand</h2>
      <p className="muted">For bank transfer or invoice customers. Card payments through Stripe are added automatically.</p>
      <div className="grid2">
        <div><label className="f" htmlFor="a_email">Email</label><input id="a_email" name="email" type="email" required /></div>
        <div><label className="f" htmlFor="a_name">Name</label><input id="a_name" name="name" type="text" /></div>
        <div><label className="f" htmlFor="a_kind">Type</label>
          <select id="a_kind" name="kind" value={kind} onChange={e => setKind(e.target.value)}>
            <option value="individual">Individual</option><option value="team">Team licence (manager)</option>
          </select></div>
        {kind === "team" && <div><label className="f" htmlFor="a_seats">Places</label><input id="a_seats" name="seats" type="text" inputMode="numeric" defaultValue="5" /></div>}
        {kind === "team" && <div><label className="f" htmlFor="a_org">Company</label><input id="a_org" name="org_name" type="text" /></div>}
      </div>
      {state && state.error && <p className="err" role="alert">{state.error}</p>}
      {state && state.ok && <p className="ok" role="status">{state.ok}</p>}
      <button className="btn" type="submit" disabled={pending}>{pending ? "Adding…" : "Add and send login email"}</button>
    </form>
  );
}
