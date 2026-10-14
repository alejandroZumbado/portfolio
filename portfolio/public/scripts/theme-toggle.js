function applyStoredTheme() {
  let saved;
  try { saved = localStorage.getItem("theme"); } catch {}
  const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}

// Icon visibility is pure CSS now (keyed on html[data-theme]); this only
// keeps the button's accessible state in sync.
function syncIcon() {
  const btn = document.getElementById("theme-toggle");
  const current = document.documentElement.getAttribute("data-theme") || "light";
  btn?.setAttribute("aria-pressed", String(current === "dark"));
}

// Small spin/pop on the icon so the theme switch feels responsive
function spinIcon() {
  const icon = document.getElementById("theme-icon");
  if (!icon || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  icon.animate(
    [{ transform: "rotate(-120deg) scale(.4)", opacity: 0 }, { transform: "rotate(0) scale(1)", opacity: 1 }],
    { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" }
  );
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
    spinIcon();
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
