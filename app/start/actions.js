"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { COURSES, SETTINGS, ROLE_LENGTHS } from "@/lib/course";

export async function saveSetup(_prev, formData) {
  const track = String(formData.get("track") || "");
  const setting = String(formData.get("setting") || "");
  const fullName = String(formData.get("full_name") || "").trim().slice(0, 80);
  const roleLength = String(formData.get("role_length") || "");
  const focus = String(formData.get("focus_note") || "").trim().slice(0, 1000);
  if (!COURSES[track]) return { error: "Choose the course that fits your role." };
  if (!SETTINGS[setting]) return { error: "Choose where your team works." };
  if (!fullName) return { error: "Add your first name so your manager knows it's you." };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await supabase.from("profiles").update({
    track, setting, full_name: fullName,
    role_length: ROLE_LENGTHS.includes(roleLength) ? roleLength : null,
    focus_note: focus || null
  }).eq("id", user.id);
  if (error) return { error: "We couldn't save that. Try again in a moment." };
  redirect("/course");
}
