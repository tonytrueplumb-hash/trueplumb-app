import "server-only";
import { ensureUserAndInvite } from "@/lib/supabase/admin";

// Give someone access after they pay (or when Tony adds them by hand).
// kind: "individual" -> learner; "team" -> manager with an org of `seats` places.
export async function fulfil(admin, { email, name, kind, seats = 1, orgName, sessionId, amountTotal, currency }) {
  email = String(email).trim().toLowerCase();
  if (sessionId) {
    const { data: seen } = await admin.from("purchases").select("id").eq("stripe_session_id", sessionId).maybeSingle();
    if (seen) return { duplicate: true };
  }
  let userId = null, orgId = null;
  if (kind === "individual") {
    ({ userId } = await ensureUserAndInvite(admin, { email, fullName: name, role: "learner", next: "/start" }));
  } else if (kind === "team") {
    ({ userId } = await ensureUserAndInvite(admin, { email, fullName: name, role: "manager", next: "/team" }));
    const { data: existing } = await admin.from("orgs").select("id, seats").eq("manager_id", userId).order("created_at").limit(1).maybeSingle();
    if (existing) {
      orgId = existing.id;
      await admin.from("orgs").update({ seats: existing.seats + seats }).eq("id", orgId);
    } else {
      const { data: org, error } = await admin.from("orgs").insert({ name: orgName || null, manager_id: userId, seats }).select("id").single();
      if (error) throw error;
      orgId = org.id;
    }
  }
  const { error } = await admin.from("purchases").insert({
    stripe_session_id: sessionId || `manual_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email, kind, seats, amount_total: amountTotal ?? null, currency: currency || null, user_id: userId, org_id: orgId
  });
  if (error && error.code !== "23505") throw error;
  return { userId, orgId };
}
