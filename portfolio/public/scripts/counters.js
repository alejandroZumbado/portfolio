function animateCounter(el) {
  const target = parseInt(el.dataset.count || "0", 10);
  const suffix = el.dataset.suffix || "";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || target <= 0) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.target.dataset.counted !== "true") {
          e.target.dataset.counted = "true";
          animateCounter(e.target);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
}
initCounters();
document.addEventListener("astro:page-load", initCounters);
