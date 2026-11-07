import "server-only";
import { createClient } from "@supabase/supabase-js";

// Full-access client for server code only (webhook, invites, admin page). Never import into client components.
export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function adminEmails() {
  return (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
}

// Create (or find) a login for this email, make sure a profile exists, and send them an invite or login email.
export async function ensureUserAndInvite(admin, { email, fullName, role, orgId, next = "/" }) {
  email = email.trim().toLowerCase();
  const redirectTo = `${siteUrl()}/auth/confirm?next=${encodeURIComponent(next)}`;
  let userId = null;
  let emailed = false;

  const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo, data: { full_name: fullName || "" }
  });
  if (!inviteErr && invited && invited.user) {
    userId = invited.user.id;
    emailed = true;
  } else {
    // Already registered: look them up and send a normal login link instead.
    const { data: existing } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
    if (existing) userId = existing.id;
    else {
      const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const found = list && list.users.find(u => (u.email || "").toLowerCase() === email);
      if (found) userId = found.id;
    }
    if (!userId) throw new Error(inviteErr ? inviteErr.message : "Could not create the login.");
    const { error: otpErr } = await admin.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo, shouldCreateUser: false } });
    if (otpErr) throw new Error(otpErr.message);
    emailed = true;
  }

  const { data: prof } = await admin.from("profiles").select("id, role, org_id, full_name").eq("id", userId).maybeSingle();
  const rank = { learner: 0, manager: 1, admin: 2 };
  const update = {
    id: userId,
    email,
    full_name: (prof && prof.full_name) || fullName || null,
    role: prof && rank[prof.role] >= rank[role] ? prof.role : role,
    org_id: orgId || (prof && prof.org_id) || null
  };
  const { error: upErr } = await admin.from("profiles").upsert(update, { onConflict: "id" });
  if (upErr) throw new Error(upErr.message);
  return { userId, emailed };
}
