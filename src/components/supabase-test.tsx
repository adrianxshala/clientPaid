"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface TestResult {
  status: "loading" | "success" | "error";
  message: string;
  details?: any;
}

export default function SupabaseTest() {
  const [result, setResult] = useState<TestResult>({
    status: "loading",
    message: "Testing Supabase connection...",
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          setResult({
            status: "error",
            message: "Missing environment variables",
            details: {
              hasUrl: !!supabaseUrl,
              hasAnonKey: !!supabaseAnonKey,
            },
          });
          return;
        }

        // Test Supabase client creation
        const supabase = createClient();

        // Test a simple query (this will work even without authentication)
        const { data, error } = await supabase
          .from("_supabase_migrations")
          .select("version")
          .limit(1);

        if (error) {
          setResult({
            status: "error",
            message: "Supabase connection failed",
            details: error,
          });
        } else {
          setResult({
            status: "success",
            message: "Supabase connection successful!",
            details: {
              url: supabaseUrl,
              hasMigrations: !!data,
            },
          });
        }
      } catch (err) {
        setResult({
          status: "error",
          message: "Connection test failed",
          details: err instanceof Error ? err.message : "Unknown error",
        });
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Supabase Connection Test</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              result.status === "loading"
                ? "bg-yellow-400 animate-pulse"
                : result.status === "success"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          />
          <span className="text-sm font-medium">{result.message}</span>
        </div>
        {result.details && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <pre>{JSON.stringify(result.details, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
