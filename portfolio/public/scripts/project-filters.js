// Project filter buttons: hide non-matching cards, animate the ones that remain.
function animateIn(wrap, index) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Stagger by visible position so the grid "deals" cards in order
  wrap.animate(
    [{ opacity: 0, transform: "translateY(12px) scale(.96)" }, { opacity: 1, transform: "none" }],
    { duration: 420, delay: Math.min(index, 8) * 45, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }
  );
}

function applyFilter(filter) {
  let shown = 0;
  document.querySelectorAll("#project-grid > div").forEach((wrap) => {
    const card = wrap.querySelector("[data-categories]");
    const cats = card?.dataset.categories?.split(",") ?? [];
    const visible = filter === "all" || cats.includes(filter || "");
    wrap.hidden = !visible;
    if (visible) {
      // Cards revealed by filtering may not have scrolled into view yet
      wrap.dataset.revealed = "true";
      animateIn(wrap, shown++);
    }
  });
}

function initFilters() {
  const row = document.getElementById("filter-row");
  if (!row || row.dataset.bound === "true") return;
  row.dataset.bound = "true";

  row.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-filter]");
    if (!btn || btn.getAttribute("aria-pressed") === "true") return;
    row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    applyFilter(btn.dataset.filter);
  });
}
initFilters();
document.addEventListener("astro:page-load", initFilters);
