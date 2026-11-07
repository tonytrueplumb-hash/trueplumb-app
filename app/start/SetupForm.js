"use client";
import { useActionState, useState } from "react";
import { saveSetup } from "./actions";

export default function SetupForm({ tracks, settings, roleLengths, purposes, profile }) {
  const [state, action, pending] = useActionState(saveSetup, null);
  const [track, setTrack] = useState(profile.track);
  const [setting, setSetting] = useState(profile.setting);
  const [purpose, setPurpose] = useState(profile.purpose);
  return (
    <form action={action} className="stack" style={{ gap: 20 }}>
      <input type="hidden" name="track" value={track} />
      <input type="hidden" name="setting" value={setting} />
      <input type="hidden" name="purpose" value={purpose} />
      <section className="card">
        <h2>1. Your name</h2>
        <label className="f" htmlFor="full_name">First name</label>
        <input type="text" id="full_name" name="full_name" defaultValue={profile.full_name} autoComplete="given-name" required placeholder="e.g. Sam" />
      </section>
      <section className="card">
        <h2>2. Which course fits your role?</h2>
        <div className="tiles" role="group" aria-label="Course">
          {tracks.map(t => (
            <button type="button" key={t.id} className="tile" aria-pressed={track === t.id} disabled={!t.live} onClick={() => setTrack(t.id)}>
              <h3>{t.name}</h3><small>{t.d}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>3. Where does your team work?</h2>
        <div className="tiles" role="group" aria-label="Work setting">
          {Object.entries(settings).map(([k, s]) => (
            <button type="button" key={k} className="tile" aria-pressed={setting === k} onClick={() => setSetting(k)}>
              <h3>{s.label}</h3><small>{s.hint}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>4. Why are you doing this course?</h2>
        <div className="tiles" role="group" aria-label="Reason">
          {purposes.map(p => (
            <button type="button" key={p.id} className="tile" aria-pressed={purpose === p.id} onClick={() => setPurpose(purpose === p.id ? "" : p.id)}>
              <h3>{p.name}</h3><small>{p.d}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>5. A bit about you</h2>
        <label className="f" htmlFor="role_length">How long have you been in this role?</label>
        <select id="role_length" name="role_length" defaultValue={profile.role_length}>
          <option value="">Prefer not to say</option>
          {roleLengths.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <label className="f" htmlFor="focus_note">What&apos;s the one situation at work you most want to handle better? (optional)</label>
        <textarea id="focus_note" name="focus_note" defaultValue={profile.focus_note} placeholder="e.g. saying no to my boss, a supervisor who escalates everything, a mate I now manage" />
      </section>
      {state && state.error && <p className="err" role="alert">{state.error}</p>}
      <button className="btn" type="submit" disabled={pending || !track || !setting}>{pending ? "Saving…" : "Save and start"}</button>
    </form>
  );
}
