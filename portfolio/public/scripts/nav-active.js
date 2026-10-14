// Mobile nav scrolls horizontally; on pages like CVs/Contacto the active
// link starts off-screen. Center it on each page load.
// Uses scrollLeft (not scrollIntoView) so the page itself never jumps.
function centerActiveNavLink() {
  const nav = document.querySelector(".nav-scroll");
  const active = nav?.querySelector("a[aria-current='page']");
  if (!nav || !active) return;
  nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
}
centerActiveNavLink();
document.addEventListener("astro:page-load", centerActiveNavLink);
