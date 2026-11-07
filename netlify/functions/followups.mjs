// Daily follow-up emails: nudges to start or carry on, weekly practice for six weeks, and a 30-day check-in.
// Runs every day at 08:00 UK time. Needs RESEND_API_KEY in Netlify; without it, it does nothing.
import { createClient } from "@supabase/supabase-js";
import { COURSES, summarise } from "../../lib/course/index.js";

const DAY = 864e5;
const since = t => (t ? (Date.now() - Date.parse(t)) / DAY : -1);
const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function email(site, name, heading, paras, button) {
  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#1b1f23">
  <p style="font-weight:bold;letter-spacing:2px;color:#E8721C">TRUE PLUMB</p>
  <h2 style="margin:0 0 12px">${esc(heading)}</h2>
  <p>Hi ${esc(name || "there")},</p>
  ${paras.map(p => `<p>${p}</p>`).join("")}
  <p><a href="${site}/course" style="background:#E8721C;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">${esc(button)}</a></p>
  <p style="color:#6b7280;font-size:13px">You're getting this because you're on the True Plumb Execution Sprint. You can switch these emails off under Settings on your course page.</p></div>`;
}

// Works out which email (if any) is due for one person today.
function due(p, prog, s) {
  const days = (prog && prog.days) || {};
  if (!prog || !s || s.answered === 0) {
    if (since(p.created_at) >= 3) return { kind: "start", subject: "Your Execution Sprint is ready", heading: "Day 1 takes about 15 minutes", paras: ["Your place on the Execution Sprint is ready. Day 1 is about saying no upward and handing problems back, and it takes about 15 minutes on your phone."], button: "Start Day 1" };
    return null;
  }
  for (const n of [1, 2]) {
    if (days[n] && days[n].done && !(days[n + 1] && days[n + 1].done) && since(days[n].doneAt) >= 2) {
      const m = days[n].mission ? `You committed to: <b>${esc(days[n].mission)}</b>. Day ${n + 1} starts by asking how it went.` : `Day ${n + 1} picks up where you left off.`;
      return { kind: `resume-${n + 1}`, subject: `Day ${n + 1} is waiting for you`, heading: `Day ${n + 1} is ready`, paras: [m], button: `Start Day ${n + 1}` };
    }
  }
  if (!prog.completedAt) return null;
  const d = since(prog.completedAt);
  if (d >= 30 && !(prog.ratings && prog.ratings.d30)) return { kind: "d30", subject: "Your 30-day check-in", heading: "It's been a month", paras: ["Rate the same five statements you rated before the sprint. It takes a minute, and it shows you what has actually changed in how you lead."], button: "Do my 30-day check-in" };
  const wk = Math.floor(d / 7);
  if (wk >= 1 && wk <= 6 && s.practiceTotal > s.practiceDone) {
    const extra = wk === 1 && days[3] && days[3].mission ? [`Last week you committed to: <b>${esc(days[3].mission)}</b>. Did you do it? You can tell us on your course page.`] : [];
    return { kind: `practice-${wk}`, subject: wk === 1 ? "How did your commitment go?" : `Week ${wk}: two decisions to try again`, heading: `Week ${wk} practice is ready`, paras: [...extra, "Two decisions you didn't get right first time are ready to try again. Coming back to them after a gap is what makes it stick. It takes about three minutes."], button: "Do this week's practice" };
  }
  return null;
}

export default async () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return new Response("RESEND_API_KEY not set; skipping.");
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const { data: people, error } = await db.from("profiles").select("id, email, full_name, track, setting, created_at, emails_opt_out").eq("emails_opt_out", false).not("track", "is", null);
  if (error) return new Response("profiles: " + error.message, { status: 500 });
  const { data: progs } = await db.from("progress").select("user_id, track, state");
  let sent = 0;
  for (const p of people || []) {
    if (!COURSES[p.track]) continue;
    const row = (progs || []).find(x => x.user_id === p.id && x.track === p.track);
    const prog = row && row.state;
    const s = prog ? summarise(p.track, prog, p.setting || "office") : null;
    const e = due(p, prog, s);
    if (!e) continue;
    // Claim the email first so a retry can never send it twice.
    const { data: claimed } = await db.from("followups").upsert({ user_id: p.id, track: p.track, kind: e.kind }, { onConflict: "user_id,track,kind", ignoreDuplicates: true }).select();
    if (!claimed || !claimed.length) continue;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "True Plumb <noreply@trueplumb.co.uk>", to: p.email, subject: e.subject, html: email(site, (p.full_name || "").split(" ")[0], e.heading, e.paras, e.button) })
    });
    if (res.ok) sent++;
    else await db.from("followups").delete().match({ user_id: p.id, track: p.track, kind: e.kind });
  }
  return new Response(`sent ${sent}`);
};

export const config = { schedule: "0 8 * * *" };
