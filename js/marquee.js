/* =========================
   MARQUEES (.brand-visual, .benefits-carousel):
   - swipe / mouse drag left or right: moves the strip, after that it
     keeps running in its usual direction from the new place;
   - tap (phones, tablets): pause / resume.
   With a mouse the marquee also pauses on hover (CSS).
   ========================= */

// how far the finger has to move before it counts as a swipe, not a tap
const SWIPE_THRESHOLD = 8;

// Moves the CSS animation of the track by `dx` pixels.
// One animation loop moves the track by the width of one group of logos,
// so the pixel offset is turned into animation time.
function moveMarquee(track, dx) {
  const animation = track.getAnimations()[0];

  // no animation with prefers-reduced-motion: nothing to move
  if (!animation) {
    return;
  }

  const duration = animation.effect.getComputedTiming().duration;
  const loopWidth = track.getBoundingClientRect().width / track.children.length;
  const time = animation.currentTime - (dx / loopWidth) * duration;

  animation.currentTime = ((time % duration) + duration) % duration;
}

function initMarquee(marquee) {
  const track = marquee.querySelector(".brand-track, .benefits-track");
  let startX = null;
  let lastX = 0;
  let isSwiping = false;
  let isMouse = false;

  if (!track) {
    return;
  }

  function reset() {
    startX = null;
    isSwiping = false;
    marquee.classList.remove("is-dragging");
  }

  marquee.addEventListener("pointerdown", (event) => {
    isMouse = event.pointerType === "mouse";

    // mouse: only the main (left) button drags
    if (isMouse && event.button !== 0) {
      return;
    }
    startX = event.clientX;
    lastX = event.clientX;
  });

  // no browser drag-and-drop of the logo images, the mouse drags the strip
  marquee.addEventListener("dragstart", (event) => event.preventDefault());

  marquee.addEventListener("pointermove", (event) => {
    if (startX === null) {
      return;
    }
    if (!isSwiping) {
      if (Math.abs(event.clientX - startX) < SWIPE_THRESHOLD) {
        return;
      }
      isSwiping = true;
      // .is-dragging stops the animation while the finger moves it
      marquee.classList.add("is-dragging");
      marquee.setPointerCapture(event.pointerId);
    }

    moveMarquee(track, event.clientX - lastX);
    lastX = event.clientX;
  });

  marquee.addEventListener("pointerup", () => {
    if (startX === null) {
      return;
    }
    // a tap pauses on touch screens; with a mouse hover already pauses it
    if (!isSwiping && !isMouse) {
      marquee.classList.toggle("is-paused");
    }
    reset();
  });

  // the touch turned into a page scroll (vertical swipe)
  marquee.addEventListener("pointercancel", reset);
}

function initMarquees() {
  document
    .querySelectorAll(".brand-visual, .benefits-carousel")
    .forEach(initMarquee);
}
