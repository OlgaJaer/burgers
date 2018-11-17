const hamburger = document.querySelector(".hamburger-menu__link");
const fixedMenu = document.querySelector(".fixed-menu");
const closeMenu = document.querySelector(".fixed-menu__close");

hamburger.addEventListener('click', function (e) {
  e.preventDefault();
  fixedMenu.classList.add('fixed-menu__open');
});


fixedMenu.addEventListener('click', function () {
  fixedMenu.classList.remove('fixed-menu__open');
});

const triggerMenu = document.querySelector(".menu-acc__item-trigger");
const textMenu = document.querySelector(".menu-acc__text");

triggerMenu.addEventListener('click', function (e) {
  e.preventDefault();
  textMenu.classList.add("menu-acc__text-active");
});

