// Client-side storage utilities for non-authentication data
// Note: Authentication tokens are handled by Supabase HttpOnly cookies

export class ClientStorage {
  // Set data in sessionStorage
  static setSessionItem(key: string, value: any): void {
    if (typeof window !== "undefined") {
      try {
        const serializedValue = JSON.stringify(value);
        window.sessionStorage.setItem(key, serializedValue);
        console.log(`✅ Stored in sessionStorage: ${key}`);
      } catch (error) {
        console.error(`❌ Error storing in sessionStorage:`, error);
      }
    }
  }

  // Get data from sessionStorage
  static getSessionItem<T>(key: string): T | null {
    if (typeof window !== "undefined") {
      try {
        const item = window.sessionStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          console.log(`✅ Retrieved from sessionStorage: ${key}`);
          return parsed;
        }
      } catch (error) {
        console.error(`❌ Error retrieving from sessionStorage:`, error);
      }
    }
    return null;
  }

  // Remove data from sessionStorage
  static removeSessionItem(key: string): void {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(key);
        console.log(`✅ Removed from sessionStorage: ${key}`);
      } catch (error) {
        console.error(`❌ Error removing from sessionStorage:`, error);
      }
    }
  }

  // Clear all sessionStorage
  static clearSession(): void {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.clear();
        console.log(`✅ Cleared all sessionStorage`);
      } catch (error) {
        console.error(`❌ Error clearing sessionStorage:`, error);
      }
    }
  }

  // Check if sessionStorage is available
  static isAvailable(): boolean {
    if (typeof window === "undefined") return false;
    try {
      const test = "__test__";
      window.sessionStorage.setItem(test, test);
      window.sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

// Example usage for non-authentication data
export const AppData = {
  // User preferences (not authentication)
  setUserPreference: (key: string, value: any) => {
    ClientStorage.setSessionItem(`pref_${key}`, value);
  },

  getUserPreference: <T>(key: string): T | null => {
    return ClientStorage.getSessionItem(`pref_${key}`);
  },

  // Temporary form data
  saveFormData: (formId: string, data: any) => {
    ClientStorage.setSessionItem(`form_${formId}`, data);
  },

  getFormData: (formId: string) => {
    return ClientStorage.getSessionItem(`form_${formId}`);
  },

  // Shopping cart (example)
  saveCart: (cartData: any) => {
    ClientStorage.setSessionItem("cart", cartData);
  },

  getCart: () => {
    return ClientStorage.getSessionItem("cart");
  },
};


