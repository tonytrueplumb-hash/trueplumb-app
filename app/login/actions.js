"use server";
import { createAdminClient, adminEmails, ensureUserAndInvite, siteUrl } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendLoginLink(_prev, formData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Enter the email address you booked with, for example sam@company.co.uk." };
  const admin = createAdminClient();
  try {
    if (adminEmails().includes(email)) {
      await ensureUserAndInvite(admin, { email, role: "admin", next: "/admin" });
    } else {
      const { data: prof } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
      if (prof) {
        const { error: otpErr } = await admin.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: `${siteUrl()}/auth/confirm?next=/` } });
        if (otpErr) throw new Error(otpErr.message);
      }
    }
  } catch (e) {
    console.error("login link", e);
    const msg = String((e && e.message) || "");
    if (/rate|seconds|too many/i.test(msg)) return { error: "A link was sent very recently. Wait a minute, check your inbox and spam, then try again if it hasn't arrived." };
    return { error: "We couldn't send the email just now. Wait a minute and try again." };
  }
  // Same message either way, so the form doesn't reveal who has an account.
  return { sent: true };
}
