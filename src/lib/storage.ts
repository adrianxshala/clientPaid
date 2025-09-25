// Utility functions for sessionStorage management
// Note: Authentication uses HttpOnly cookies, not sessionStorage

export const sessionStorage = {
  // Set data in sessionStorage
  setItem: (key: string, value: unknown): void => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting sessionStorage item:", error);
      }
    }
  },

  // Get data from sessionStorage
  getItem: <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      try {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error("Error getting sessionStorage item:", error);
        return null;
      }
    }
    return null;
  },

  // Remove data from sessionStorage
  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing sessionStorage item:", error);
      }
    }
  },

  // Clear all sessionStorage
  clear: (): void => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.clear();
      } catch (error) {
        console.error("Error clearing sessionStorage:", error);
      }
    }
  },
};

// Example usage for user preferences (not authentication)
export const userPreferences = {
  setTheme: (theme: "light" | "dark") => {
    sessionStorage.setItem("user-theme", theme);
  },

  getTheme: (): "light" | "dark" | null => {
    return sessionStorage.getItem("user-theme");
  },

  setLanguage: (language: string) => {
    sessionStorage.setItem("user-language", language);
  },

  getLanguage: (): string | null => {
    return sessionStorage.getItem("user-language");
  },
};
