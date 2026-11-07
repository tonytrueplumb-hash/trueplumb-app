"use client";
import { useActionState, useState } from "react";
import { createInvite, setInviteActive } from "./actions";

const STATUS = { open: "Open", off: "Switched off", expired: "Expired", full: "Full" };

function Copy({ text }) {
  const [done, setDone] = useState(false);
  return <button type="button" className="btn ghost small" onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); } catch {} }}>{done ? "Copied" : "Copy link"}</button>;
}

export default function InviteLinks({ links, site }) {
  const [state, action, pending] = useActionState(createInvite, null);
  return (
    <section className="card">
      <h2>Tester invite links</h2>
      <p className="muted">Anyone with the link can create a free login and choose a course. Set how many people it works for and how long it lasts. Switch it off at any time.</p>
      <form action={action} className="grid2">
        <div><label className="f" htmlFor="i_label">Who it&apos;s for</label><input id="i_label" name="label" type="text" placeholder="e.g. JMAC senior managers" /></div>
        <div><label className="f" htmlFor="i_max">Places</label><input id="i_max" name="max_uses" type="text" inputMode="numeric" defaultValue="10" /></div>
        <div><label className="f" htmlFor="i_days">Lasts (days)</label><input id="i_days" name="days" type="text" inputMode="numeric" defaultValue="14" /></div>
        <div style={{ alignSelf: "end" }}><button className="btn" type="submit" disabled={pending}>{pending ? "Creating…" : "Create link"}</button></div>
      </form>
      {state && state.error && <p className="err" role="alert">{state.error}</p>}
      {state && state.ok && <p className="ok" role="status">{state.ok}</p>}
      {links.length ? <div className="scroll"><table><thead><tr><th>For</th><th>Link</th><th>Used</th><th>Expires</th><th>Status</th><th></th></tr></thead><tbody>
        {links.map(l => { const url = `${site}/try/${l.code}`; return (
          <tr key={l.code}>
            <td>{l.label}</td>
            <td><span className="muted" style={{ wordBreak: "break-all" }}>{url}</span><br /><Copy text={url} /></td>
            <td className="num">{l.used}/{l.max_uses}</td>
            <td className="num">{l.expires_at ? new Date(l.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "–"}</td>
            <td>{STATUS[l.status]}</td>
            <td><form action={setInviteActive}><input type="hidden" name="code" value={l.code} /><input type="hidden" name="active" value={l.active ? "0" : "1"} /><button className="btn ghost small" type="submit">{l.active ? "Switch off" : "Switch on"}</button></form></td>
          </tr>); })}
      </tbody></table></div> : null}
    </section>
  );
}
