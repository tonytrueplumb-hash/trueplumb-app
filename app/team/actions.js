"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, ensureUserAndInvite } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

// Accepts lines like "Sam Smith, sam@firm.co.uk" or just "sam@firm.co.uk".
function parse(text) {
  const out = []; const bad = [];
  for (const raw of String(text || "").split(/\r?\n/)) {
    const line = raw.trim(); if (!line) continue;
    const m = line.match(/[^\s<>,;]+@[^\s<>,;]+/);
    if (!m || !EMAIL_RE.test(m[0])) { bad.push(line); continue; }
    const email = m[0].toLowerCase();
    const name = line.replace(m[0], "").replace(/[<>,;]/g, " ").replace(/\s+/g, " ").trim();
    if (!out.some(p => p.email === email)) out.push({ email, name });
  }
  return { people: out, bad };
}

export async function addParticipants(_prev, formData) {
  const orgId = String(formData.get("org_id") || "");
  const { people, bad } = parse(formData.get("people"));
  if (!people.length) return { error: bad.length ? `These lines don't have a valid email: ${bad.slice(0, 3).join(" | ")}` : "Add at least one person: a name and an email on each line." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Your login has expired. Log in again." };
  const { data: org } = await supabase.from("orgs").select("id, seats").eq("id", orgId).eq("manager_id", user.id).maybeSingle();
  if (!org) return { error: "You can only add people to your own team." };

  const admin = createAdminClient();
  const { data: existing } = await admin.from("org_members").select("email").eq("org_id", org.id);
  const taken = new Set((existing || []).map(r => r.email));
  const fresh = people.filter(p => !taken.has(p.email));
  const left = org.seats - taken.size;
  if (fresh.length > left) return { error: `You have ${left} place${left === 1 ? "" : "s"} left and tried to add ${fresh.length}. Remove some names, or buy more places.` };

  const sent = []; const failed = [];
  for (const p of fresh) {
    try {
      const { userId } = await ensureUserAndInvite(admin, { email: p.email, fullName: p.name, role: "learner", orgId: org.id, next: "/start" });
      const { error } = await admin.from("org_members").insert({ org_id: org.id, user_id: userId, email: p.email, full_name: p.name || null });
      if (error) throw error;
      sent.push(p.email);
    } catch (e) {
      console.error("invite", p.email, e);
      failed.push(p.email);
    }
  }
  revalidatePath("/team");
  return { sent, failed, skipped: people.length - fresh.length, bad };
}

export async function resendInvite(formData) {
  const orgId = String(formData.get("org_id") || "");
  const email = String(formData.get("email") || "").toLowerCase();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: org } = await supabase.from("orgs").select("id").eq("id", orgId).eq("manager_id", user.id).maybeSingle();
  if (!org) return;
  const admin = createAdminClient();
  const { data: m } = await admin.from("org_members").select("full_name").eq("org_id", org.id).eq("email", email).maybeSingle();
  if (!m) return;
  try { await ensureUserAndInvite(admin, { email, fullName: m.full_name, role: "learner", orgId: org.id, next: "/start" }); } catch (e) { console.error("resend", e); }
  revalidatePath("/team");
}
