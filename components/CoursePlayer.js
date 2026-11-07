"use client";
import { useEffect, useRef } from "react";
import { mountCourse } from "@/lib/course/engine";
import { createClient } from "@/lib/supabase/client";

export default function CoursePlayer({ userId, trackId, profile, initial }) {
  const ref = useRef(null);
  useEffect(() => {
    const supabase = createClient();
    const onSave = async state => {
      const { error } = await supabase.from("progress").upsert({ user_id: userId, track: trackId, state, updated_at: new Date().toISOString() }, { onConflict: "user_id,track" });
      if (error) throw error;
    };
    return mountCourse(ref.current, { trackId, profile, initial, onSave, editHref: "/start?edit=1" });
  }, [userId, trackId, profile, initial]);
  return <div ref={ref} className="stack" style={{ gap: 20 }} aria-live="polite" />;
}
