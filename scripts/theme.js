import { DOM } from "./constants.js";

/**
 * Theme management module
 * Handles all theme-related logic (light/dark mode)
 */

const THEME_KEY = "theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const THEME_ICONS = {
  dark: `<i class="wi wi-day-sunny wi-3x"></i>`,
  light: `<i class="wi wi-moon-alt-waning-crescent-2 wi-3x"></i>`,
};

/**
 * Initialize theme on app startup
 */
export const initTheme = () => {
  let currentTheme = localStorage.getItem(THEME_KEY) || LIGHT_THEME;
  applyTheme(currentTheme);
  setupThemeToggle();
};

/**
 * Apply theme to the entire app
 * @param {string} theme - "light" or "dark"
 */
export const applyTheme = (theme) => {
  DOM.htmlElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  DOM.themeToggleBtn.setAttribute(
    "checked",
    theme === LIGHT_THEME ? "checked" : ""
  );
  DOM.themeToggleBtn.innerHTML = THEME_ICONS[theme];
};

/**
 * Toggle between light and dark theme
 */
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem(THEME_KEY) || LIGHT_THEME;
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  applyTheme(newTheme);
};

/**
 * Get current theme
 * @returns {string} Current theme ("light" or "dark")
 */
export const getCurrentTheme = () => {
  return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
};

/**
 * Set theme based on sunrise/sunset times
 * @param {number} localUTCTime - Local time in milliseconds
 * @param {number} sunrise - Sunrise time in milliseconds
 * @param {number} sunset - Sunset time in milliseconds
 */
export const setThemeByTime = (localUTCTime, sunrise, sunset) => {
  const theme =
    localUTCTime >= sunrise && localUTCTime <= sunset
      ? LIGHT_THEME
      : DARK_THEME;
  applyTheme(theme);
};

/**
 * Setup theme toggle button event listener
 */
const setupThemeToggle = () => {
  DOM.themeToggleBtn.addEventListener("click", toggleTheme);
};
