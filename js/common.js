const hamburger = document.querySelector(".hamburger-menu__link");
const fixedMenu = document.querySelector(".fixed-menu");
const closeMenu = document.querySelector(".fixed-menu__close");

hamburger.addEventListener('click', function (e) {
e.preventDefault();
fixedMenu.classList.add('fixed-menu__open');
});

closeMenu.addEventListener('mouseover', function() {
  fixedMenu.classList.add('fixed-menu__open:hover');
});

fixedMenu.addEventListener('click', function() {
  fixedMenu.classList.remove('fixed-menu__open');
});

