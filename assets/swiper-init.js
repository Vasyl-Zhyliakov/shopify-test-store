document.addEventListener("DOMContentLoaded", function () {
  const swiperEl = document.querySelector(".mySwiper");
  if (!swiperEl) return;

  const slidesDesktop = parseInt(swiperEl.dataset.slidesDesktop) || 1;
  const slidesTablet = parseInt(swiperEl.dataset.slidesTablet) || 1;
  const slidesMobile = parseInt(swiperEl.dataset.slidesMobile) || 1;
  const spaceBetween = parseInt(swiperEl.dataset.gap) || 10;
  const showPagination = swiperEl.dataset.pagination === "true";
  const showNavigation = swiperEl.dataset.navigation === "true";

  const swiper = new Swiper(swiperEl, {
    loop: false,
    slidesPerView: slidesDesktop,
    spaceBetween: spaceBetween,
    pagination: showPagination
      ? {
          el: ".swiper-pagination",
          clickable: true,
        }
      : false,
    navigation: showNavigation
      ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      : false,
    breakpoints: {
      768: {
        slidesPerView: slidesTablet,
      },
      375: {
        slidesPerView: slidesMobile,
      },
    },
  });

  function filterByColor(color) {
    swiperEl.querySelectorAll(".swiper-slide").forEach((slide) => {
      const slideColor = slide.dataset.color;
      slide.style.display =
        !color || slideColor === color.toLowerCase() ? "" : "none";
    });

    swiper.update();
    swiper.slideTo(0, 0); // Перемикає но перший слайд, треба записати
  }

  const colorRadios = document.querySelectorAll(
    'input.swatch-input__input[type="radio"]'
  );

  if (colorRadios.length) {
    colorRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        filterByColor(e.target.value);
      });

      if (radio.checked) {
        filterByColor(radio.value);
      }
    });
  }
});
