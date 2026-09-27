/* =========================
   FAQ (.faq-frame): accordion
   ========================= */

function initFaq() {
  document.querySelectorAll(".faq-frame .question").forEach((question) => {
    const ask = question.querySelector(".ask");
    const toggle = question.querySelector(".faq-toggle");

    if (!ask) {
      return;
    }
    ask.addEventListener("click", () => {
      const isOpen = question.classList.toggle("open");

      ask.setAttribute("aria-expanded", String(isOpen));

      if (toggle) {
        toggle.textContent = isOpen ? "−" : "+";
      }
    });
  });
}
