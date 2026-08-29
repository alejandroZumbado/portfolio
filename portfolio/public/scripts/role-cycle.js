let roleCycleTimer;

function initRoleCycle() {
  if (roleCycleTimer) clearInterval(roleCycleTimer);
  const el = document.getElementById("role-cycle");
  if (!el) return;
  const roles = JSON.parse(el.dataset.roles || "[]");
  if (roles.length < 2) return;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0;
  roleCycleTimer = setInterval(() => {
    i = (i + 1) % roles.length;
    if (reduceMotion) {
      el.textContent = roles[i];
      return;
    }
    el.animate(
      [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-6px)" }],
      { duration: 220, easing: "ease-in" }
    ).onfinish = () => {
      el.textContent = roles[i];
      el.animate(
        [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 220, easing: "ease-out" }
      );
    };
  }, 2600);
}
initRoleCycle();
document.addEventListener("astro:page-load", initRoleCycle);
