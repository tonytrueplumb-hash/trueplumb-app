"use server";
import { createAdminClient, ensureUserAndInvite, siteUrl } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHECK = "Check your inbox in the next minute or two (and junk, or the Updates tab in Gmail). It comes from noreply@trueplumb.co.uk.";

export async function joinWithInvite(_prev, formData) {
  if (String(formData.get("website") || "")) return { ok: "Thanks. " + CHECK }; // bot trap
  const code = String(formData.get("code") || "").slice(0, 40);
  const name = String(formData.get("name") || "").trim().slice(0, 80);
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!name) return { error: "Add your first name." };
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address, for example sam@company.co.uk." };
  const admin = createAdminClient();

  // Already has an account: just send a login link, without using up a place.
  const { data: existing } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  if (existing) {
    const { error } = await admin.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: `${siteUrl()}/auth/confirm?next=/` } });
    if (error) return { error: /rate|seconds/i.test(error.message) ? "A link was sent very recently. Wait a minute and try again." : "We couldn't send the email just now. Try again in a minute." };
    return { ok: "You already have an account, so we've emailed you a login link. " + CHECK };
  }

  const { data: claimed, error: claimErr } = await admin.rpc("claim_invite", { p_code: code });
  const link = Array.isArray(claimed) ? claimed[0] : claimed;
  if (claimErr || !link) return { error: "Sorry, this invite link is no longer available. Ask the person who sent it for a new one." };

  try {
    const { userId } = await ensureUserAndInvite(admin, { email, fullName: name, role: "learner", next: "/start" });
    await admin.from("profiles").update({ source: `tester: ${link.label}` }).eq("id", userId);
  } catch (e) {
    console.error("invite join", e);
    await admin.rpc("release_invite", { p_code: code });
    return { error: "We couldn't set you up just now. Wait a minute and try again." };
  }
  return { ok: `You're in, ${name}. We've emailed you a login link. ` + CHECK };
}
