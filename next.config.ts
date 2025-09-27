import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure environment variables are available at build time
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // External packages that should be treated as external for server-side rendering
  // This replaces the deprecated experimental.serverComponentsExternalPackages
  serverExternalPackages: ["@supabase/ssr"],

  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Enable compression for better performance
  compress: true,

  // Turbopack configuration
  turbopack: {
    // Set the root directory to avoid workspace detection warnings
    root: "./",
  },
};

export default nextConfig;
