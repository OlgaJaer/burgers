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
var slideCount = $('.viewport').children().length;
var translateWidth = 0;
const $viewport = $('.viewport'); //* 90%;
const $right = $('.navigation--right');
const $left = $('.navigation--left');
const $slider = $('.slider');

console.log('viewport');

$right.on('click', function () {
  nextSlide();
  console.log('slideCount');
});

$left.on('click', function () {
  prevSlide();
});

function nextSlide() {
  if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
    $viewport.css('transform', 'translate(0, 0)');
    slideNow = 1;
  } else {
    translateWidth = -$('.viewport').width() * (slideNow);
    $viewport.css(
      'transform', 'translate(' + translateWidth + 'px, 0)');
    slideNow++;
  }
}

function prevSlide() {
  if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
    translateWidth = -$('.viewport').width() * (slideCount - 1);

    $viewport.css(
      'transform', 'translate(' + translateWidth + 'px, 0)', );
    slideNow = slideCount;
  } else {
    translateWidth = -$('.viewport').width() * (slideNow - 2);
    $viewport.css(
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
    var formOverlay;

    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {
        formOverlay = createOverlay("Сообщение отправлено");
        document.body.appendChild(formOverlay);

      } else {
        formOverlay = createOverlay("Что-то не так");
        document.body.appendChild(formOverlay);
        // document.body.classList.add("scroll-hidden"); 
      }
    });

    setTimeout(function () {
      document.body.removeChild(formOverlay);
    }, 3000);

    function createOverlay(content) {
      const overlayElement = document.createElement("div");
      overlayElement.classList.add("overlay");

      const containerElement = document.createElement("div");
      containerElement.classList.add("container--overlay");

      const contentElement = document.createElement("div");
      contentElement.classList.add("content--overlay");
      contentElement.innerHTML = content;

      const closeElement = document.createElement("button");
      contentElement.appendChild(closeElement);
      closeElement.classList.add("btn");
      closeElement.textContent = "Закрыть";
      closeElement.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.removeChild(overlayElement);
        // document.body.classList.remove('scroll-hidden');
      });

      overlayElement.appendChild(containerElement);
      containerElement.appendChild(closeElement);
      containerElement.appendChild(contentElement);

      return overlayElement;
    }
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

phone.addEventListener('keydown', function (e) {
  let isDigit = false;
  let isDash = false;
  let isControl = false;

  if (e.key >= 0 || e.key <= 9) {
    isDigit = true;
  }

  if (e.key == '-') {
    isDash = true;
  }

  if (e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Backspace') {
    isControl = true;
  }
  if (!isDigit && !isDash && !isControl) {
    e.preventDefault();
  }
  // console.log(e.key);
});

//модальное окно-отзывы
$(function () {
   var $openButton = $(".btn--js");
   var modalTitle = $('.reviews__title');
   var modalText = $('.reviews__text');
   var $reviewsOverlay = $(".reviews--overlay");
   $openButton.on('click', function (e) {
     e.preventDefault();
     let thisBtn = this;
     let reviewTitle = thisBtn.previousElementSibling.previousElementSibling.textContent;
     let reviewText = thisBtn.nextElementSibling.textContent;

     modalTitle.innerText = reviewTitle;
     modalText.textContent = reviewText;
     console.log(modalTitle);
     
     $reviewsOverlay.fadeIn().addClass('reviews__open');
     $('body').addClass('scroll-hidden');
   });

   $reviewsOverlay.on('click', function (e) {
     e.preventDefault();
     $reviewsOverlay.fadeOut().removeClass('reviews__open');
     $('body').removeClass('scroll-hidden');
   });
  
  /* function openPopup() {

    const openButton = document.querySelectorAll(".btn--js");
    const showPopup = buildPopup(content, title);

    for (var i = 0; i < openButton.length; i++) {
      console.log(openButton);
      openButton[i].addEventListener('click', function (e) {
        console.log(openButton);
        let thisBtn = this;
        var content = thisBtn.nextElementSibling.textContent;
        var title = thisBtn.previousElementSibling.previousElementSibling.textContent;
        document.body.appendChild(showPopup);
        console.log(title);
        console.log(content);
      });

    }
  }

  openPopup()

  function buildPopup(content, title) {
    const popupElement = document.createElement("div");
    popupElement.classList.add("reviews--overlay");
    popupElement.addEventListener("click", e => {
      if (e.target === overlayElement) {
        closeElement.click();
      }
    });

    const containerElement = document.createElement("div");
    containerElement.classList.add("reviews__container")

    const textElement = document.createElement("div");
    textElement.classList.add("reviews__text");
    textElement.innerHTML = content;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("reviews__title");
    titleElement.textContent = title;

    const closeElement = document.createElement("button");
    closeElement.classList.add("reviews-close");
    closeElement.textContent = "x";
    closeElement.addEventListener("click", function () {
      document.body.removeChild(PopupElement);
    });
    closeElement.addEventListener('click', function (event) {
      event.preventDefault();
    });

    popupElement.appendChild(containerElement);
    containerElement.appendChild(closeElement);
    containerElement.appendChild(titleElement);
    containerElement.appendChild(textElement);

    return popupElement;
  };




  //one scroll page

  /* $('.one-time').slick({
     vertical: true,
     verticalSwiping: true,
     dots: true,
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     adaptiveHeight: true
   });*/
  $(document).ready(function () {

    $('.bxslider').bxSlider({
      mode: 'vertical',
      infiniteLoop: false,
    });
  });


});