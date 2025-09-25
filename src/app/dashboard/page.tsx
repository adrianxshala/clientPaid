import { requireAuth } from "@/lib/auth";
import SignOutButton from "@/components/auth/signout-button";
import DashboardClient from "@/components/dashboard-client";

export default async function Dashboard() {
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome, {user.email}!
            </h2>
            <p className="text-gray-600 mb-6">
              You are successfully authenticated and can access this protected
              page.
            </p>
            <SignOutButton />

            {/* SessionStorage Demo Component */}
            <DashboardClient />
          </div>
        </div>
      </div>
    </div>
  );
}
