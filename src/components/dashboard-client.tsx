"use client";

import { useEffect, useState } from "react";
import { ClientStorage, AppData } from "@/lib/client-storage";

export default function DashboardClient() {
  const [userPreferences, setUserPreferences] = useState({
    theme: "light",
    language: "en",
    notifications: true,
  });
  const [lastVisit, setLastVisit] = useState<string | null>(null);

  // Load data from sessionStorage on component mount
  useEffect(() => {
    // Load user preferences
    const savedPrefs = AppData.getUserPreference("user-settings");
    if (savedPrefs) {
      setUserPreferences(savedPrefs);
    }

    // Load last visit time
    const savedLastVisit = ClientStorage.getSessionItem<string>("last-visit");
    setLastVisit(savedLastVisit);

    // Save current visit time
    const now = new Date().toISOString();
    ClientStorage.setSessionItem("last-visit", now);
  }, []);

  // Save preferences when they change
  const updatePreference = (key: string, value: any) => {
    const newPrefs = { ...userPreferences, [key]: value };
    setUserPreferences(newPrefs);
    AppData.setUserPreference("user-settings", newPrefs);
  };

  // Clear session data
  const clearSessionData = () => {
    ClientStorage.clearSession();
    setLastVisit(null);
    setUserPreferences({ theme: "light", language: "en", notifications: true });
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">
          Session Storage Demo
        </h3>
        <p className="text-blue-700 text-sm">
          This data is stored in sessionStorage and will be cleared when you
          close the tab.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme Preference
          </label>
          <select
            value={userPreferences.theme}
            onChange={(e) => updatePreference("theme", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={userPreferences.language}
            onChange={(e) => updatePreference("language", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={userPreferences.notifications}
            onChange={(e) =>
              updatePreference("notifications", e.target.checked)
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="notifications"
            className="ml-2 block text-sm text-gray-700"
          >
            Enable notifications
          </label>
        </div>
      </div>

      {lastVisit && (
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">
            <strong>Last visit:</strong> {new Date(lastVisit).toLocaleString()}
          </p>
        </div>
      )}

      <button
        onClick={clearSessionData}
        className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Clear Session Data
      </button>

      <div className="text-xs text-gray-500">
        <p>
          <strong>Note:</strong> Authentication tokens are stored in secure
          HttpOnly cookies, not sessionStorage.
        </p>
        <p>
          Only user preferences and temporary data are stored in sessionStorage.
        </p>
      </div>
    </div>
  );
}


