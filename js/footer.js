/* =========================
   FOOTER: newsletter form
   ========================= */

function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  const status = document.querySelector(".newsletter-status");

  if (!form || !status) {
    return;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.textContent = "Thank you! You are subscribed.";
    form.reset();
  });

  form.addEventListener("input", () => {
    status.textContent = "";
  });
}
