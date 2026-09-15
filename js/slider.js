document.addEventListener("DOMContentLoaded", () => {

    const brandSlider = new Splide("brand-visual", {
        type: "loop",
        drag: "free",
        arrows: false,
        pagination: false,
        gap: "20px",

        autoScroll: {
            speed: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
        },
    });

    brandSlider.mount(window.splide.Extensions);

});
document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector("reviews-carousel");

    if (!carousel) {
        return;
    }

    const cards = carousel.querySelectorAll("review-card");
    const leftArrow = carousel.querySelector(".left-arrow");
    const rightArrow = carousel.querySelector(".right-arrow");

    if (!cards.length) {
        return;
    }


    /* =========================
       DOTS
       ========================= */

    const dots = document.createElement("div");

    dots.className = "reviews-dots";


    cards.forEach(function (card, index) {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "reviews-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function () {

            card.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });

        });

        dots.appendChild(dot);

    });


    // Точки-индикаторы ставим ПОД каруселью (не внутри),
    // чтобы они не уезжали при свайпе карточек на мобильном.
    carousel.after(dots);


    /* =========================
       ARROWS
       ========================= */

    if (leftArrow) {

        leftArrow.addEventListener("click", function () {

            carousel.scrollBy({
                left: -carousel.clientWidth * 0.86,
                behavior: "smooth"
            });

        });

    }


    if (rightArrow) {

        rightArrow.addEventListener("click", function () {

            carousel.scrollBy({
                left: carousel.clientWidth * 0.86,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       ACTIVE DOT
       ========================= */

    function updateActiveDot() {

        let closestIndex = 0;
        let smallestDistance = Infinity;

        cards.forEach(function (card, index) {

            const distance = Math.abs(
                card.getBoundingClientRect().left -
                carousel.getBoundingClientRect().left -
                10
            );

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }

        });


        dots.querySelectorAll(".reviews-dot").forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === closestIndex
                );

            }
        );

    }


    carousel.addEventListener(
        "scroll",
        updateActiveDot,
        { passive: true }
    );

});