function applyStoredTheme() {
  let saved;
  try { saved = localStorage.getItem("theme"); } catch {}
  const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}

function syncIcon() {
  const icon = document.getElementById("theme-icon");
  const current = document.documentElement.getAttribute("data-theme") || "light";
  if (icon) icon.textContent = current === "dark" ? "☀️" : "🌙";
}

function initThemeToggle() {
  syncIcon();
  const btn = document.getElementById("theme-toggle");
  // The header may persist across View Transitions, so guard against
  // re-binding the click handler on every astro:page-load.
  if (btn?.dataset.bound === "true") return;
  if (btn) btn.dataset.bound = "true";
  btn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    syncIcon();
  });
}

initThemeToggle();
// Astro's View Transitions morph <head> against the incoming page's static
// markup, which never declares data-theme (only the anti-FOUC inline script
// sets it, and that script doesn't re-run on client-side navigation) — so the
// attribute gets dropped on every page change. Reapply it from localStorage
// right after each swap, before the new page paints.
document.addEventListener("astro:after-swap", () => {
  applyStoredTheme();
  syncIcon();
});
document.addEventListener("astro:page-load", initThemeToggle);
