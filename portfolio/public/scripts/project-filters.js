function initFilters() {
  const row = document.getElementById("filter-row");
  if (!row || row.dataset.bound === "true") return;
  row.dataset.bound = "true";

  row.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-filter]");
    if (!btn) return;
    row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.dataset.filter;
    document.querySelectorAll("#project-grid > div").forEach((wrap) => {
      const card = wrap.querySelector("[data-categories]");
      const cats = card?.dataset.categories?.split(",") ?? [];
      wrap.hidden = filter !== "all" && !cats.includes(filter || "");
    });
  });
}
initFilters();
document.addEventListener("astro:page-load", initFilters);
