/* =========================
   MARQUEES (.brand-visual, .benefits-carousel): pause / play button
   ========================= */

function initMarquees() {
  document.querySelectorAll(".marquee-toggle").forEach((button) => {
    const marquee = button.parentElement;

    button.addEventListener("click", () => {
      const isPaused = marquee.classList.toggle("is-paused");

      button.setAttribute("aria-pressed", String(isPaused));
    });
  });
}
