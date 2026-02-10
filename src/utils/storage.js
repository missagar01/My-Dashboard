/**
 * Safe wrapper for sessionStorage operations to handle potential errors
 * and provide a centralized point for session-based data.
 */
export const storage = {
  /**
   * Get an item from sessionStorage with an optional default value
   */
  get: (key, defaultValue = null) => {
    try {
      const value = sessionStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from sessionStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Set an item in sessionStorage
   */
  set: (key, value) => {
    try {
      sessionStorage.setItem(key, value || "");
      return true;
    } catch (error) {
      console.error(`Error writing key "${key}" to sessionStorage:`, error);
      return false;
    }
  },

  /**
   * Remove an item from sessionStorage
   */
  remove: (key) => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing key "${key}" from sessionStorage:`, error);
      return false;
    }
  },

  /**
   * Clear all items from sessionStorage
   */
  clear: () => {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
      return false;
    }
  },

  /**
   * Check if a key exists in sessionStorage
   */
  has: (key) => {
    try {
      return sessionStorage.getItem(key) !== null;
    } catch (error) {
      return false;
    }
  }
};
