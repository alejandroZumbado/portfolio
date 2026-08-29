function initMagnetic() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const STRENGTH = 0.25;
  const MAX = 10;

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    if (el.dataset.magneticBound === "true") return;
    el.dataset.magneticBound = "true";

    el.addEventListener("mousemove", (ev) => {
      const r = el.getBoundingClientRect();
      const relX = ev.clientX - (r.left + r.width / 2);
      const relY = ev.clientY - (r.top + r.height / 2);
      const mx = Math.max(-MAX, Math.min(MAX, relX * STRENGTH));
      const my = Math.max(-MAX, Math.min(MAX, relY * STRENGTH));
      el.style.setProperty("--mx", mx.toFixed(1) + "px");
      el.style.setProperty("--my", my.toFixed(1) + "px");
    });

    el.addEventListener("mouseleave", () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    });
  });
}
initMagnetic();
document.addEventListener("astro:page-load", initMagnetic);
