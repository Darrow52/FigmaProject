document.addEventListener("DOMContentLoaded", () => {
  /* =========================
       PURCHASE OPTIONS
       ========================= */

  const onePod = document.querySelector("one-pod-option");
  const twoPod = document.querySelector("two-pod-option");

  if (!onePod || !twoPod) {
    return;
  }



  onePod.addEventListener("click", (event) => {

    if (
      event.target.closest("product-selection") ||
      event.target.closest("color-options") ||
      event.target.closest("size-selection")
    ) {
      return;
    }

    onePod.classList.add("active");
    twoPod.classList.remove("active");
  });


  twoPod.addEventListener("click", (event) => {
    // Если внутри уже будут элементы выбора,
    // клики по ним не должны закрывать карточку
    if (event.target.closest("two-pod-selection")) {
      return;
    }

    twoPod.classList.add("active");
    onePod.classList.remove("active");
  });
});

const twoSizes = document.querySelectorAll("two-size");

twoSizes.forEach((size) => {
  size.addEventListener("click", (event) => {
    event.stopPropagation();

    const parent = size.parentElement;

    parent.querySelectorAll("two-size").forEach((item) => {
      item.classList.remove("active");
    });

    size.classList.add("active");
  });
});

const twoColors = document.querySelectorAll("two-color");

twoColors.forEach((color) => {
  color.addEventListener("click", (event) => {
    event.stopPropagation();

    color.parentElement
      .querySelectorAll("two-color")
      .forEach((item) => item.classList.remove("active"));

    color.classList.add("active");

    // Обновляем картинку товара под выбранный цвет
    const imagePath = color.dataset.image;
    const productImage = color
      .closest("two-product")
      ?.querySelector("two-product-image img");

    if (imagePath && productImage) {
      productImage.src = imagePath;
    }
  });
});

document.addEventListener("click", function (e) {
  const sizeOption = e.target.closest("one-pod-option size-option");

  if (sizeOption) {
    const sizeSelection = sizeOption.parentElement;

    sizeSelection.querySelectorAll("size-option").forEach((option) => {
      option.classList.remove("active");
    });

    sizeOption.classList.add("active");

    return;
  }

  const colorOption = e.target.closest("one-pod-option color-option");

  if (colorOption) {
    const colorOptions = colorOption.parentElement;

    colorOptions.querySelectorAll("color-option").forEach((option) => {
      option.classList.remove("active");
    });

    colorOption.classList.add("active");

    return;
  }
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("one-pod-option color-option").forEach((option) => {
    option.addEventListener("click", () => {
      const imagePath = option.dataset.image;

      const productPreview = option
        .closest("one-pod-option")
        ?.querySelector("product-preview img");

      if (imagePath && productPreview) {
        productPreview.src = imagePath;
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.querySelector("main-product-image img");
  const thumbs = document.querySelectorAll("product-thumbnails thumbnail");

  if (!mainImg || !thumbs.length) {
    return;
  }

  function selectThumb(thumb) {
    const img = thumb.querySelector("img");
    if (!img) return;

    // Показываем выбранную миниатюру как большое изображение
    mainImg.src = img.src;

    // Обводим только активную миниатюру
    thumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => selectThumb(thumb));
  });



  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Закрыть">×</button>' +
    '<img alt="">';

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox() {
    lightboxImg.src = mainImg.src;
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
  }

  mainImg.addEventListener("click", openLightbox);
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });


  selectThumb(thumbs[thumbs.length - 1]);
});
