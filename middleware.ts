import { updateSession } from "@/lib/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // Call updateSession and ensure it returns a NextResponse
    const response = await updateSession(request);

    // Validate that we got a proper NextResponse
    if (!response || !(response instanceof NextResponse)) {
      console.error("updateSession did not return a valid NextResponse");
      return NextResponse.next({ request });
    }

    return response;
  } catch (error) {
    // Log the error for debugging
    console.error("Middleware error:", error);

    // Return a safe fallback response
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
