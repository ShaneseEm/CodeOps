/**
 * Exercise 1 — Language & Theme Toggle
 * Save user preferences to localStorage; restore on load.
 */

const langSelect  = document.querySelector("#lang-select");
const themeSelect = document.querySelector("#theme-select");
const langNote    = document.querySelector("#lang-note");

const LANG_LABELS = {
  en: "🇨🇦 Language set to English — preference saved!",
  am: "🇪🇹 ቋንቋ ወደ አማርኛ ተቀይሯል — ምርጫ ተቀምጧል!",
};

// ── Restore saved preferences on page load ──
const savedLang  = localStorage.getItem("lang");
const savedTheme = localStorage.getItem("theme");

if (savedLang)  { langSelect.value  = savedLang;  applyLang(savedLang); }
if (savedTheme) { themeSelect.value = savedTheme; applyTheme(savedTheme); }

// ── Apply helpers ──
function applyLang(lang) {
  langNote.textContent = LANG_LABELS[lang] ?? "";
}

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
}

// ── Save on change ──
langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  localStorage.setItem("lang", lang);
  applyLang(lang);
});

themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});
