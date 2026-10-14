// Cursor spotlight + light 3D tilt for [data-spotlight] cards.
// Only feeds CSS variables; all visuals live in global.css.
// Skipped on touch devices and for reduced-motion users.
// var (not const): safe if the router ever re-executes this file
var TILT_MAX_DEG = 5;

function onMove(ev) {
  const el = ev.currentTarget;
  const r = el.getBoundingClientRect();
  // Cursor position relative to the card, 0..1 on each axis
  const px = (ev.clientX - r.left) / r.width;
  const py = (ev.clientY - r.top) / r.height;
  el.style.setProperty("--sx", (px * 100).toFixed(1) + "%");
  el.style.setProperty("--sy", (py * 100).toFixed(1) + "%");
  // Tilt toward the cursor: top edge tips back when pointer is near top
  el.style.setProperty("--rx", ((0.5 - py) * TILT_MAX_DEG).toFixed(2) + "deg");
  el.style.setProperty("--ry", ((px - 0.5) * TILT_MAX_DEG).toFixed(2) + "deg");
}

function onLeave(ev) {
  // Return to flat; the CSS transition eases it back
  ev.currentTarget.style.setProperty("--rx", "0deg");
  ev.currentTarget.style.setProperty("--ry", "0deg");
}

function initSpotlight() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll("[data-spotlight]").forEach((el) => {
    // Guard: cards can survive a page swap, never bind twice
    if (el.dataset.spotlightBound === "true") return;
    el.dataset.spotlightBound = "true";
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
  });
}
initSpotlight();
document.addEventListener("astro:page-load", initSpotlight);
