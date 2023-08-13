"use strict";

//document.addEventListener("DOMContentLoaded", function () {
//	document.body.classList.add("ready");
//});
//Burger
var burgerBtn = document.querySelector(".burger__button");
var burgerMenu = document.querySelector(".header__menu");
var header = document.querySelector(".header");
burgerBtn.addEventListener("click", function () {
  if (burgerBtn.classList.contains("active")) {
    burgerBtn.classList.remove("active");
    burgerMenu.classList.remove("active-burger");
    header.classList.remove("active-burger");
  } else {
    burgerBtn.classList.add("active");
    burgerMenu.classList.add("active-burger");
    header.classList.add("active-burger");
  }
}); // Header Scroll

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
var aboutSlider = new Swiper(".about__slider", {
  speed: 1600,
  spaceBetween: 0,
  slidesPerView: 1,
  loopPreventsSlide: false,
  lazy: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 4500
  },
  loop: false,
  navigation: {
    nextEl: ".about__slider-next",
    prevEl: ".about__slider-prev"
  }
});
var worksSlider = new Swiper(".works__slider", {
  speed: 1600,
  spaceBetween: 40,
  slidesPerView: 1,
  loopPreventsSlide: false,
  lazy: true,
  //effect: "fade",
  //fadeEffect: {
  //	crossFade: true,
  //},
  autoHeight: true,
  autoplay: {
    delay: 8500
  },
  loop: false,
  navigation: {
    nextEl: ".works__slider-next",
    prevEl: ".works__slider-prev"
  },
  breakpoints: {
    768: {
      autoHeight: false
    },
    992: {
      autoHeight: false,
      spaceBetween: 120,
      slidesPerView: 1
    }
  }
});
var typesSlider = new Swiper(".types__slider", {
  speed: 400,
  spaceBetween: 40,
  slidesPerView: 1,
  loopPreventsSlide: false,
  lazy: true,
  autoHeight: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: false,
  thumbs: {
    swiper: {
      el: ".types__slider-nav",
      speed: 400,
      spaceBetween: 0,
      slidesPerView: 1.45,
      watchOverflow: true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      runCallbacksOnInit: true,
      centeredSlides: true,
      breakpoints: {
        992: {
          direction: "vertical",
          slidesPerView: "auto",
          spaceBetween: 0,
          centeredSlides: false
        }
      }
    }
  }
});
typesSlider.thumbs.swiper.on("slideChange", function () {
  typesSlider.slideTo(typesSlider.thumbs.swiper.realIndex);
});
typesSlider.on("slideChange", function () {
  typesSlider.thumbs.swiper.slideTo(typesSlider.realIndex);
});
var activeCategory = "windows";
var activeSlideIndexes = {};
var buttons = document.querySelectorAll(".types__button");
updateActiveButtons(activeCategory);
typesSlider.on("slideChange", function () {
  var activeSlide = typesSlider.slides[typesSlider.activeIndex];

  if (activeSlide.classList.contains("doors")) {
    activeCategory = "doors";
  } else if (activeSlide.classList.contains("window")) {
    activeCategory = "windows";
  }

  updateActiveButtons(activeCategory);
});
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var target = this.getAttribute("data-target");

    if (target === activeCategory) {
      return;
    }

    if (target === "doors") {
      var doorsSlideIndex = Array.from(typesSlider.slides).findIndex(function (slide) {
        return slide.classList.contains("doors");
      });
      typesSlider.slideTo(doorsSlideIndex);
      activeCategory = target;
    }

    if (target === "windows") {
      var windowSlideIndex = Array.from(typesSlider.slides).findIndex(function (slide) {
        return slide.classList.contains("window");
      });
      typesSlider.slideTo(windowSlideIndex);
      activeCategory = target;
    }

    updateActiveButtons(target);
  });
});

function updateActiveButtons(target) {
  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });
  buttons.forEach(function (btn) {
    if (btn.getAttribute("data-target") === target) {
      btn.classList.add("active");
    }
  });
}