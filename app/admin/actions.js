"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fulfil } from "@/lib/fulfil";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// For customers who pay by bank transfer or invoice: give access by hand.
export async function addCustomer(_prev, formData) {
  const { profile } = await getSession();
  if (!profile || profile.role !== "admin") return { error: "Admins only." };
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  const kind = formData.get("kind") === "team" ? "team" : "individual";
  const seats = Math.max(1, Math.min(500, parseInt(formData.get("seats"), 10) || 1));
  const orgName = String(formData.get("org_name") || "").trim() || null;
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };
  try {
    await fulfil(createAdminClient(), { email, name, kind, seats: kind === "team" ? seats : 1, orgName });
  } catch (e) {
    console.error("manual add", e);
    return { error: "Couldn't add them. Check the email and try again." };
  }
  revalidatePath("/admin");
  return { ok: `${email} added as ${kind === "team" ? `a team manager with ${seats} places` : "an individual"}. Their login email is on its way.` };
}

// Tester invite links: anyone with the link can create a free login, up to a limit.
export async function createInvite(_prev, formData) {
  const { profile } = await getSession();
  if (!profile || profile.role !== "admin") return { error: "Admins only." };
  const { newInviteCode } = await import("@/lib/invites");
  const label = String(formData.get("label") || "").trim().slice(0, 60) || "Testers";
  const maxUses = Math.max(1, Math.min(200, parseInt(formData.get("max_uses"), 10) || 10));
  const days = Math.max(1, Math.min(90, parseInt(formData.get("days"), 10) || 14));
  const code = newInviteCode();
  const { error } = await createAdminClient().from("invite_links").insert({ code, label, max_uses: maxUses, expires_at: new Date(Date.now() + days * 864e5).toISOString() });
  if (error) { console.error("create invite", error); return { error: "Couldn't create the link. Has the invite-links database update been run?" }; }
  revalidatePath("/admin");
  return { ok: "Link created. Copy it from the list below." };
}

export async function setInviteActive(formData) {
  const { profile } = await getSession();
  if (!profile || profile.role !== "admin") return;
  const code = String(formData.get("code") || "");
  await createAdminClient().from("invite_links").update({ active: formData.get("active") === "1" }).eq("code", code);
  revalidatePath("/admin");
}
