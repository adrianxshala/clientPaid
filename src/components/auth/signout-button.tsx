"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include", // Ensure cookies are included
      });

      // Small delay to ensure cookies are cleared before redirect
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Refresh to ensure middleware runs
      }, 100);
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 rounded-md"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
