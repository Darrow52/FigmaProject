/* =========================
   REVIEWS (.eighth-frame): scroll carousel with arrows and dots
   ========================= */

function initReviews() {
  const carousel = document.querySelector(".reviews-carousel");

  if (!carousel) {
    return;
  }

  const cards = carousel.querySelectorAll(".review-card");
  const leftArrow = carousel.querySelector(".left-arrow");
  const rightArrow = carousel.querySelector(".right-arrow");

  if (!cards.length) {
    return;
  }

  const dots = document.createElement("div");
  dots.className = "reviews-dots";

  cards.forEach((card, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "reviews-dot";
    dot.setAttribute("aria-label", `Show review ${index + 1}`);

    if (index === 0) {
      dot.classList.add("active");
      dot.setAttribute("aria-current", "true");
    }

    dot.addEventListener("click", () => {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    });

    dots.appendChild(dot);
  });

  carousel.after(dots);

  const scrollByPage = (direction) => {
    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.86,
      behavior: "smooth",
    });
  };

  leftArrow?.addEventListener("click", () => scrollByPage(-1));
  rightArrow?.addEventListener("click", () => scrollByPage(1));

  function updateActiveDot() {
    let closestIndex = 0;
    let smallestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left -
          carousel.getBoundingClientRect().left -
          10,
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    dots.querySelectorAll(".reviews-dot").forEach((dot, index) => {
      const isActive = index === closestIndex;
      dot.classList.toggle("active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  carousel.addEventListener("scroll", updateActiveDot, { passive: true });
}
