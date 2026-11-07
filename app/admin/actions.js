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
