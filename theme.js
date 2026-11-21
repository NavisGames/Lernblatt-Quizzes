(() => {
  "use strict";

  const root = document.documentElement;
  const toggle = document.querySelector("#themeToggle");
  const storageKey = "quiz-app-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = window.localStorage.getItem(storageKey)
    || window.localStorage.getItem("info-klausur-theme")
    || window.localStorage.getItem("dvt-quiz-theme");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (toggle) {
      toggle.textContent = theme === "dark" ? "Hell" : "Dunkel";
      toggle.setAttribute("aria-label", theme === "dark" ? "Helles Design einschalten" : "Dunkles Design einschalten");
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }

  applyTheme(savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : systemTheme.matches ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      window.localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }

  systemTheme.addEventListener("change", (event) => {
    if (!window.localStorage.getItem(storageKey)) applyTheme(event.matches ? "dark" : "light");
  });
})();
