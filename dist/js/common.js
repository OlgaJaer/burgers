const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;
const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const setActiveMenuItem = itemEq => {
  $('.pagescroll__item')
    .eq(itemEq)
    .addClass('activeS')
    .siblings()
    .removeClass('activeS');
}

const performTransition = sectionEq => {
  const position = `${sectionEq * -100}%`;
  const mouseInertionIsFinished = 300;
  const transitionIsFinished = 1000;

  if (inScroll === false) {
    inScroll = true;
    display.css({
      transform: `translateY(${position})`
    });
  
    sections.eq(sectionEq)
      .addClass('activeS')
      .siblings()
      .removeClass('activeS');

//*исключить инерцию
    setTimeout(() => {
      inScroll = false;
      setActiveMenuItem(sectionEq);
    }, transitionIsFinished + mouseInertionIsFinished);
  }
};

const scrollToSection = direction => {
  const activeSection = sections.filter('.activeS');
  const prevSection = activeSection.prev();
  const nextSection = activeSection.next();
   
  if (direction == 'up' && prevSection.length) {
    performTransition(prevSection.index());
  }
 
  if (direction == "down" && nextSection.length) {
    performTransition(nextSection.index());
  }
}

$(document).on({
  wheel: e => {
    const direction = e.originalEvent.deltaY > 0 ? "down" : "up";
    scrollToSection(direction);
    /*const deltaY = e.originalEvent.deltaY;
    console.log(deltaY);
    if (deltaY > 0) {
      console.log('down');
      scrollToSection('down');
    }
  
    if (deltaY < 0 ) {
      console.log("up");
      scrollToSection('up');
    }*/
  },
  keydown: e => {
    console.log(e.keyCode);
  
    switch (e.keyCode) {
      case 40: 
        scrollToSection("down");
        break;
      case 38:
        scrollToSection("up");
        break;
    }
  },
  touchmove: e => e.preventDefault //убираем белые полосы при скролинге
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();
  const target = $(e.currentTarget).attr('data-scroll-to');

  performTransition(target);
})

if (isMobile) {
  $(document).swipe({
    swipe:function(
      event, 
      direction, 
      distance, 
      duration, 
      fingerCount, 
      fingerData
      ) {
    /*
    *потому что библиотека возвращает фактическое перемещение пальца вниз/вверх, 
    а функция scrollToSection работает на перемещении страницы
    */
      const scrollDirection = direction == "down" ? "up" : "down" ;
  
      scrollToSection(scrollDirection);
    }
  });  
}

 

/*$(function(){
    
  let $links = $('.pagescroll a');
  //let $links = $('.fixed-menu__list a')
  function onClick(btn) {
    $(btn).on('click', function (e){
      e.preventDefault();
    
      $(btn).removeClass('active');
      let ref = $(this).attr('href'); 
      //.addClass('active')
      let $target = $(ref);
  
      if ($target.length > 0) {
        let pos = $target.offset().top;
        let current = $(window).scrollTop();
        let diff = Math.abs(current - pos);
     
        $('html,body').animate({
          scrollTop: pos
        }, diff / 2);
      }
    });
  }

  onClick('.pagescroll a');
  onClick('.fixed-menu__list a');

  let $btn = $(".to-top");
  let btnShowed = false;

  $(window).on('scroll', onScroll);

  function onScroll() {
    let pos = $(window).scrollTop(); 

    if (!btnShowed && pos > window.innerHeight) {
        $btn.stop(true).fadeIn(500);
        btnShowed = true;
    } else if(btnShowed && pos <= window.innerHeight){
        $btn.stop(true).fadeOut(500);
        btnShowed = false;
    }

    $links.removeClass('active');

    for(let i = $links.length -1; i >= 0; i--){
      let ref = $links.eq(i).attr('href');
      let $header = $(ref);

      if(pos > $header.offset().top - 200){
        $links.eq(i).addClass('active');
        break;
      }
    }
  };

  onScroll();

  $btn.click(function () {
    let pos = $(window).scrollTop();

    $('body,html').animate({
      scrollTop: 0
    }, pos / 3);
  });
});*/


const $hamburger = $(".hamburger-menu__link");
const $fixedMenu = $(".fixed-menu");
const $closeMenu = $(".fixed-menu__close");
const navLink = document.querySelectorAll(".fixed-menu__item-link");

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

for (let i = 0; i < navLink.length; i += 1) {
  navLink[i].addEventListener("click", function () {
    $fixedMenu.fadeOut().removeClass('fixed-menu__open');
  });
}

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


$right.on('click', function () {
  nextSlide();
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
    let reviewText = thisBtn.previousElementSibling.textContent;

    modalTitle.text(reviewTitle);
    modalText.text(reviewText);
    console.log(modalTitle);

    $reviewsOverlay.fadeIn().addClass('reviews__open');
    $('body').addClass('scroll-hidden');
  });

  $reviewsOverlay.on('click', function (e) {
    e.preventDefault();
    $reviewsOverlay.fadeOut().removeClass('reviews__open');
    $('body').removeClass('scroll-hidden');
  });


});

//$('.bxslider').bxSlider({
//  mode: 'vertical',
//  infiniteLoop: false,
//  hideControlOnEnd: true
//});