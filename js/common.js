const $hamburger = $(".hamburger-menu__link");
const $fixedMenu = $(".fixed-menu");
const $closeMenu = $(".fixed-menu__close");

$hamburger.on('click', function (e) {
  e.preventDefault();
  $fixedMenu.fadeIn().addClass('fixed-menu__open');
  $('body').addClass('scroll-hidden');
});


$fixedMenu.on('click', function (e) {
  e.preventDefault();
  $fixedMenu.fadeOut().removeClass('fixed-menu__open');
  $('body').removeClass('scroll-hidden');
});

//аккордеон

function accordeon(btn) {
  $(btn).on('click', function () {
    let thisBtn = this;

    $(btn).each(function (index, element) {
      let accoItem = $(this).parent();

      if (thisBtn == element) {
        if (accoItem.hasClass('active')) {
          accoItem.removeClass('active');
        } else {
          accoItem.addClass('active');
        }
      } else {
        if (accoItem.hasClass('active')) {
          accoItem.removeClass('active');
        }
      }
    })
  });
}

accordeon('.team-acc__item-trigger');
accordeon('.menu-acc__item-trigger');

//слайдер

var slideNow = 1;
var slideCount = $('.slider').children().length;
var translateWidth = 0;
var viewport = $('.container--burger').width(); //* 90%;
const $right = $('.navigation--right');
const $left = $('.navigation--left');
const $slider = $('.slider')

console.log(viewport);

$right.on('click', function () {
  debugger;
  nextSlide();

});

$left.on('click', function () {
  prevSlide();
});

function nextSlide() {
  if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
    $slider.css('transform', 'translate(0, 0)');
    slideNow = 1;
  } else {
    translateWidth = -$('.viewport').width() * (slideNow);
    $slider.css(
      'transform', 'translate(' + translateWidth + 'px, 0)');
    slideNow++;
  }
}

function prevSlide() {
  if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
    translateWidth = -$('.viewport').width() * (slideCount - 1);

    $slider.css(
      'transform', 'translate(' + translateWidth + 'px, 0)', );
    slideNow = slideCount;
  } else {
    translateWidth = -$('.viewport').width() * (slideNow - 1);
    $slider.css(
      'transform', 'translate(' + translateWidth + 'px, 0)', );
    slideNow--;
  }
}

//форма

const form = document.querySelector('.form');
const send = document.querySelector('.form__button-order');

send.addEventListener('click', e => {
  e.preventDefault();

  if (validateForm(form)) {
    console.log('ok');
    const data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      comment: form.elements.comment.value,
      to: form.elements.to.value
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log('ok!');
      }
    });
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  return valid;
}

function validateField(form__block) {
  form__block.nextElementSibling.textContent = form__block.validationMessage;
  return form__block.checkValidity();
}

//phone

const phone = document.querySelector('.phone-js');

phone.addEventListener('keydown', function(e) {
  let isDigit = false;
  let isDash = false;
  let isControl = false;

  if (e.key >= 0 || e.key <= 9) {
    isDigit = true;
  }

  if (e.key == '-') {
    isDash = true;
  }

  if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == 'Backspace') {
    isControl == true;
  }
  if (!isDigit && !isDash && !isControl) {
    e.preventDefault();
  }
  console.log(e.key);
});