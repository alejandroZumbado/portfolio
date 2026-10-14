// Scroll-reveal: observe [data-reveal] elements once per page load
// (re-runs after each Astro View Transitions navigation).
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.dataset.revealed = "true";
          // Drop the stagger delay once revealed, otherwise hover effects
          // (tilt, border) would inherit that lag
          const el = e.target;
          setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
          io.unobserve(e.target);
        }
      }
    },
    // Small bottom margin: start the reveal just before the element is fully in view
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el) => io.observe(el));
}
initReveal();
document.addEventListener("astro:page-load", initReveal);
