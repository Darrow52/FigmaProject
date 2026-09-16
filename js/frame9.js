document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("question").forEach((question) => {
    const toggle = question.querySelector("faq-toggle");
    const ask = question.querySelector("ask");

    function toggleQuestion() {
      const isOpen = question.classList.toggle("open");

      toggle.textContent = isOpen ? "−" : "+";
    }

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleQuestion();
    });

    ask.addEventListener("click", toggleQuestion);
  });
});
