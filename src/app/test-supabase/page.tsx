import SupabaseTest from "@/components/supabase-test";

export default function TestSupabasePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Supabase Connection Test
          </h1>
          <p className="text-gray-600">
            This page tests your Supabase configuration and environment
            variables.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <SupabaseTest />
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            <strong>Note:</strong> This test page should only be used for
            development and testing. Remove or protect this route in production.
          </p>
        </div>
      </div>
    </div>
  );
}
