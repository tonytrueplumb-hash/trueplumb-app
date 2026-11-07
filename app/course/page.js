import { redirect } from "next/navigation";
import Header from "@/components/Header";
import CoursePlayer from "@/components/CoursePlayer";
import { getSession } from "@/lib/supabase/server";
import { COURSES } from "@/lib/course";

export const metadata = { title: "My course · True Plumb" };

export default async function CoursePage() {
  const { supabase, user, profile } = await getSession();
  if (!user) redirect("/login");
  if (!profile) redirect("/login?error=link");
  if (!profile.track || !COURSES[profile.track]) redirect("/start");
  const { data: row } = await supabase.from("progress").select("state").eq("user_id", user.id).eq("track", profile.track).maybeSingle();
  return (
    <>
      <Header profile={profile} />
      <CoursePlayer userId={user.id} trackId={profile.track} profile={{ name: (profile.full_name || "").split(" ")[0], setting: profile.setting, roleLength: profile.role_length || "", focus: profile.focus_note || "", purpose: profile.purpose || "", emailsOptOut: !!profile.emails_opt_out }} initial={row ? row.state : null} />
    </>
  );
}
