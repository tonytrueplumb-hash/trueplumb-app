import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Login and invite emails land here: /auth/confirm?token_hash=...&type=magiclink|invite|email&next=/
export async function GET(request) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") || "email";
  const code = url.searchParams.get("code");
  let next = url.searchParams.get("next") || "/";
  if (!next.startsWith("/") || next.startsWith("//")) next = "/";

  const supabase = await createClient();
  let error = null;
  if (tokenHash) ({ error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash }));
  else if (code) ({ error } = await supabase.auth.exchangeCodeForSession(code));
  else error = new Error("missing token");

  if (error) return NextResponse.redirect(new URL("/login?error=link", url.origin));
  return NextResponse.redirect(new URL(next, url.origin));
}
