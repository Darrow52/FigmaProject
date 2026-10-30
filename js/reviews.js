/* =========================
   REVIEWS (.section--reviews): slider
   - the strip (.reviews-carousel) scrolls and clips the slides at its edges;
   - phones: the video and the text of a review are separate slides, swiped,
     with one dot per slide under the strip;
   - tablets and desktop: one slide = a review card, arrows move one card
     and are disabled at the ends.
   ========================= */

function initReviews() {
  const slider = document.querySelector(".reviews-slider");
  const carousel = slider?.querySelector(".reviews-carousel");

  if (!carousel) {
    return;
  }

  const cards = [...carousel.querySelectorAll(".review-card")];
  const slides = [...carousel.querySelectorAll(".review-video, .review-text")];
  const leftArrow = slider.querySelector(".left-arrow");
  const rightArrow = slider.querySelector(".right-arrow");

  if (!cards.length) {
    return;
  }

  // position of an element inside the scrolled strip
  const offsetInStrip = (element) =>
    element.getBoundingClientRect().left -
    carousel.getBoundingClientRect().left +
    carousel.scrollLeft -
    parseFloat(getComputedStyle(carousel).scrollPaddingLeft || 0);

  const dots = document.createElement("div");
  dots.className = "reviews-dots";

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "reviews-dot";
    dot.setAttribute("aria-label", `Show slide ${index + 1}`);

    dot.addEventListener("click", () => {
      carousel.scrollTo({ left: offsetInStrip(slide), behavior: "smooth" });
    });

    dots.appendChild(dot);
  });

  slider.after(dots);

  // one card (+ the gap) per click
  const step = () =>
    cards.length > 1
      ? cards[1].getBoundingClientRect().left -
        cards[0].getBoundingClientRect().left
      : carousel.clientWidth;

  leftArrow?.addEventListener("click", () =>
    carousel.scrollBy({ left: -step(), behavior: "smooth" }),
  );
  rightArrow?.addEventListener("click", () =>
    carousel.scrollBy({ left: step(), behavior: "smooth" }),
  );

  function update() {
    // active dot: the slide closest to the start of the strip
    let closest = 0;
    let smallest = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(offsetInStrip(slide) - carousel.scrollLeft);

      if (distance < smallest) {
        smallest = distance;
        closest = index;
      }
    });

    dots.querySelectorAll(".reviews-dot").forEach((dot, index) => {
      const isActive = index === closest;
      dot.classList.toggle("active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    // arrows are disabled at the ends only when the strip can scroll at all
    const end = carousel.scrollWidth - carousel.clientWidth - 1;
    const scrolls = end > 0;
    if (leftArrow) leftArrow.disabled = scrolls && carousel.scrollLeft <= 1;
    if (rightArrow) rightArrow.disabled = scrolls && carousel.scrollLeft >= end;
  }

  carousel.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
