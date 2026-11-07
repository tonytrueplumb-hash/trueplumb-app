import { redirect } from "next/navigation";
import Header from "@/components/Header";
import SetupForm from "./SetupForm";
import { getSession } from "@/lib/supabase/server";
import { TRACKS, SETTINGS, ROLE_LENGTHS } from "@/lib/course";

export const metadata = { title: "Set up your course · True Plumb" };

export default async function StartPage() {
  const { user, profile } = await getSession();
  if (!user) redirect("/login");
  if (!profile) redirect("/login?error=link");
  return (
    <>
      <Header profile={profile} />
      <section className="stack">
        <p className="eyebrow">Execution Sprint</p>
        <h1>{profile.track ? "Change your course" : "Let's set you up"}</h1>
        <p className="muted">Each day is about 15 minutes: a short lesson, then scenarios with no obvious answers. The scenarios change to match your role and how your team works.</p>
      </section>
      <SetupForm tracks={TRACKS} settings={SETTINGS} roleLengths={ROLE_LENGTHS} profile={{
        track: profile.track || "", setting: profile.setting || "", full_name: profile.full_name || "",
        role_length: profile.role_length || "", focus_note: profile.focus_note || ""
      }} />
    </>
  );
}
