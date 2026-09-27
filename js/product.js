/* =========================
   PRODUCT (.seventh-frame): gallery, lightbox, purchase options
   ========================= */

function copyImage(from, to) {
  if (from.srcset) {
    to.srcset = from.srcset;
  } else {
    to.removeAttribute("srcset");
  }
  to.src = from.src;
}

function initProductGallery(section) {
  const trigger = section.querySelector(".main-product-image");
  const mainImg = trigger?.querySelector("img");
  const thumbs = [...section.querySelectorAll(".product-thumbnails .thumbnail")];
  const [prevArrow, nextArrow] = section.querySelectorAll(".gallery-arrow");

  if (!trigger || !mainImg || !thumbs.length) {
    return;
  }

  function selectThumb(thumb) {
    const img = thumb.querySelector("img");
    if (!img) return;

    copyImage(img, mainImg);

    thumbs.forEach((t) => {
      const isActive = t === thumb;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-pressed", String(isActive));
    });
  }

  function step(offset) {
    const current = thumbs.findIndex((t) => t.classList.contains("active"));
    const next = (current + offset + thumbs.length) % thumbs.length;
    selectThumb(thumbs[next]);
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => selectThumb(thumb));
  });
  prevArrow?.addEventListener("click", () => step(-1));
  nextArrow?.addEventListener("click", () => step(1));


  const lightbox = document.getElementById("product-lightbox");

  if (!lightbox) {
    selectThumb(thumbs[thumbs.length - 1]);
    return;
  }

  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  trigger.addEventListener("click", () => {
    copyImage(mainImg, lightboxImg);
    lightboxImg.alt = mainImg.alt;
    lightbox.showModal();
    lightboxClose.focus();
  });

  lightboxClose.addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("close", () => trigger.focus());

  selectThumb(thumbs[thumbs.length - 1]);
}

function initPurchaseOptions(section) {
  const onePod = section.querySelector(".one-pod-option");
  const twoPod = section.querySelector(".two-pod-option");

  if (!onePod || !twoPod) {
    return;
  }

  const plans = [
    { card: onePod, radio: onePod.querySelector('input[name="pod-plan"]') },
    { card: twoPod, radio: twoPod.querySelector('input[name="pod-plan"]') },
  ];

  function selectPlan(card) {
    plans.forEach((plan) => {
      const isActive = plan.card === card;
      plan.card.classList.toggle("active", isActive);
      if (plan.radio) plan.radio.checked = isActive;
    });
  }

  plans.forEach(({ card, radio }) => {
    radio?.addEventListener("change", () => selectPlan(card));


    card.addEventListener("click", (event) => {
      if (event.target.closest(".product-selection, .two-pod-selection")) {
        return;
      }
      selectPlan(card);
    });
  });

  function initPicker(group, itemSelector, onSelect) {
    const items = group.querySelectorAll(itemSelector);

    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((other) => {
          const isActive = other === item;
          other.classList.toggle("active", isActive);
          other.setAttribute("aria-pressed", String(isActive));
        });
        onSelect(item);
      });
    });
  }

  function updateLabel(label, part, value) {
    if (!label) return;
    const [color, size] = label.textContent.split("/").map((s) => s.trim());
    const next = part === "color" ? [value, size] : [color, value];
    label.textContent = next.join(" / ");
  }

  const oneLabel = onePod.querySelector(".selected-color");
  const onePreview = onePod.querySelector(".product-preview img");

  initPicker(onePod.querySelector(".size-selection"), ".size-option", (size) => {
    updateLabel(oneLabel, "size", size.textContent.trim());
  });

  initPicker(onePod.querySelector(".color-options"), ".color-option", (color) => {
    if (onePreview && color.dataset.image) onePreview.src = color.dataset.image;
    updateLabel(oneLabel, "color", color.dataset.color);
  });

  twoPod.querySelectorAll(".two-product").forEach((pod) => {
    const label = pod.querySelector(".selected-color");
    const preview = pod.querySelector(".two-product-image img");

    initPicker(pod.querySelector(".two-size-selection"), ".two-size", (size) => {
      updateLabel(label, "size", size.textContent.trim());
    });

    initPicker(pod.querySelector(".two-color-options"), ".two-color", (color) => {
      if (preview && color.dataset.image) preview.src = color.dataset.image;
      updateLabel(label, "color", color.dataset.color);
    });
  });
}

function initProduct() {
  const section = document.querySelector(".seventh-frame");

  if (!section) {
    return;
  }

  initProductGallery(section);
  initPurchaseOptions(section);
}
