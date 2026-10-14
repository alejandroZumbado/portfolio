// "Copiar" button on /contacto: copies the email and shows a short toast.
// var (not let): safe if the router ever re-executes this file
var toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.dataset.show = "true";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.dataset.show = "false"; }, 2200);
}

function initCopyEmail() {
  const btn = document.getElementById("copy-email");
  if (!btn || btn.dataset.bound === "true") return;
  btn.dataset.bound = "true";
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email || "";
    try {
      await navigator.clipboard.writeText(email);
      showToast("Correo copiado ✓");
    } catch {
      // Clipboard can be blocked (insecure context, permissions):
      // tell the user instead of failing silently
      showToast("No se pudo copiar — " + email);
    }
  });
}
initCopyEmail();
document.addEventListener("astro:page-load", initCopyEmail);
