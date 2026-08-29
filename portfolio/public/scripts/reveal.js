// Scroll-reveal: observe [data-reveal] elements once per page load
// (re-runs after each Astro View Transitions navigation).
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.dataset.revealed = "true";
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}
initReveal();
document.addEventListener("astro:page-load", initReveal);
