import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Create response with user data
    const response = NextResponse.json({ user: data.user });

    // The session cookies are automatically handled by the Supabase client
    // when using the server client with proper cookie configuration

    return response;
  } catch (error) {
    console.error("Sign in route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
