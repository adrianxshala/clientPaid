import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Create response with success message
  const response = NextResponse.json({ success: true });

  // The session cookies are automatically cleared by the Supabase client
  // when using the server client with proper cookie configuration

  return response;
}
