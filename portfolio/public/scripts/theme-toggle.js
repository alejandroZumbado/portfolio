function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const sync = () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    if (icon) icon.textContent = current === "dark" ? "☀️" : "🌙";
  };
  sync();
  // The header may persist across View Transitions, so guard against
  // re-binding the click handler on every astro:page-load.
  if (btn?.dataset.bound === "true") return;
  if (btn) btn.dataset.bound = "true";
  btn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    sync();
  });
}
initThemeToggle();
document.addEventListener("astro:page-load", initThemeToggle);
