/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Food_dist/js/modules/calculator.js":
/*!********************************************!*\
  !*** ./Food_dist/js/modules/calculator.js ***!
  \********************************************/
/***/ ((module) => {

function calculator() {
  // Calculator

  const gender = document.querySelector('#gender'),
        activity = document.querySelector('.calculating__choose_big'),
        constitution = document.querySelector('.calculating__choose_medium'),
        result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  // get initial data from local storage if they are
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    // set default data otherwise
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  // set default data to local storage
  initLocalSettings(gender, 'calculating__choose-item_active');
  initLocalSettings(activity, 'calculating__choose-item_active');

  getStaticInfo(gender, 'calculating__choose-item_active');
  getStaticInfo(activity, 'calculating__choose-item_active');
  getDynamicInfo(constitution);

  calcTotal();

  // common function for getting info about gender and activity
  function getStaticInfo(parentElement, activeClass) {
  const elements = parentElement.querySelectorAll('div');

  elements.forEach(elem => {
    elem.addEventListener('click', (event) => {
      // set values depending on info type
      if (event.target.getAttribute('data-ratio')) {
        ratio = +event.target.getAttribute('data-ratio');
        // save data to local storage
        localStorage.setItem('ratio', ratio);
      } else {
        sex = event.target.getAttribute('id');
        localStorage.setItem('sex', sex);
      }

      // switch activity class
      elements.forEach(elem => elem.classList.remove(activeClass));
      event.target.classList.add(activeClass);

      // recalculate calories result
      calcTotal();
    });
  });
  };

  // getting info about constitution
  function getDynamicInfo(parentElement) {
    const inputs = parentElement.querySelectorAll('input');

    inputs.forEach(input => {
      input.addEventListener('input', (event) => {
        // checking that input values contain only numbers
        if (input.value.match(/\D/g)) {
          input.style.border = '2px solid red';
        } else {
          input.style.border = 'none';
        }

        // set values depending on input element
        switch (event.target.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
        }

        calcTotal();
      });
    });
  };

  function initLocalSettings(parentElement, activeClass) {
    const elements = parentElement.querySelectorAll('div');

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    })
  }

  function calcTotal() {
    // all parameter have to be filed to calculate calories
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = 0;
      return;
    }

    // calculating formulas differ depending on sex
    if (sex === 'male') {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    } else {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }
  };
};

module.exports = calculator;

/***/ }),

/***/ "./Food_dist/js/modules/cards.js":
/*!***************************************!*\
  !*** ./Food_dist/js/modules/cards.js ***!
  \***************************************/
/***/ ((module) => {

function cards() {
  // Menu card

  class MenuCard {
    constructor(img, altimg, title, descr, price, parentSelector) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const cardHTML = `
        <div class="menu__item">
          <img src=${this.img} alt=${this.altimg}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        </div>
      `;

      this.parent.insertAdjacentHTML('beforeend', cardHTML);
    }
  };

  const getResource = async url => {
    const res = await fetch(url);

    if (!res.ok ) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
  };

  // getting data from server using fetch method
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  // getting data from server using axios library
  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });
};

module.exports = cards;

/***/ }),

/***/ "./Food_dist/js/modules/forms.js":
/*!***************************************!*\
  !*** ./Food_dist/js/modules/forms.js ***!
  \***************************************/
/***/ ((module) => {

function forms() {
  // Forms

  const forms = this.document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так'
  }

  forms.forEach(form => {
    bindPostData(form);
  })

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };
  
  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });
    });
  };
  
  function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  };
};

module.exports = forms;

/***/ }),

/***/ "./Food_dist/js/modules/modal.js":
/*!***************************************!*\
  !*** ./Food_dist/js/modules/modal.js ***!
  \***************************************/
/***/ ((module) => {

function modal() {
  // Modal

  const btnsContactUs = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        btnCloseModal = document.querySelector('[data-close]'),
        modalTimerId = setTimeout(openModal, 10000);

  btnsContactUs.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // open modal window when a user scrolled the page to the bottom
  window.addEventListener('scroll', showModalByScroll);

  // close modal window by clicking on close button
  btnCloseModal.addEventListener('click', closeModal);

  // close modal window by clicking on area behind the dialog
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });

  // close modal window by clicking on escape button
  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  };

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };
};

module.exports = modal;

/***/ }),

/***/ "./Food_dist/js/modules/slider.js":
/*!****************************************!*\
  !*** ./Food_dist/js/modules/slider.js ***!
  \****************************************/
/***/ ((module) => {

function slider() {
  // Slider

  let slideCurrent = 1,
      sliderOffset = 0;
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        sliderTotal = document.querySelector('#total'),
        sliderCurrent = document.querySelector('#current'),
        sliderPrev = document.querySelector('.offer__slider-prev'),
        sliderNext = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slideWidth = +window.getComputedStyle(slidesWrapper).width.match(/(\d|\.)/g).join(""),
        slidesCount = slides.length;

  // setting slides field
  slidesField.style.width = 100 * slidesCount + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  // setting slides wrapper
  slidesWrapper.style.overflow = 'hidden';

  // set equal width to all slides
  slides.forEach(slide => {
    slide.style.width = slideWidth + 'px';
  });

  slider.style.position = 'relative';

  // create carousel indicators and add it to the dom tree
  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  // create and add to the dom tree dots for carousel
  for (let i = 0; i < slidesCount; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    indicators.append(dot);
  }

  const dots = slider.querySelectorAll('.dot');

  // add events to all the dots
  dots.forEach(dot => {
    const slideTo = dot.getAttribute('data-slide-to');
    dot.addEventListener('click', function() { showSlide(slideTo) });
  });

  // initialize slide and slides counter
  showSlide(slideCurrent);
  sliderTotal.textContent = getZero(slidesCount);

  // show previous slide on click by the previous slide button
  sliderPrev.addEventListener('click', () => {
    showSlide(--slideCurrent);
  });

  // show next slide on click by the next slide button
  sliderNext.addEventListener('click', () => {
    showSlide(++slideCurrent);
  });

  function showSlide(slideNum) {
    // check limit values of slider
    if (slideNum > slidesCount) {
      slideCurrent = 1;
    } else if (slideNum < 1) {
      slideCurrent = slidesCount;
    } else {
      slideCurrent = slideNum;
    }

    // switch active dot
    dots.forEach(dot => {
      if (dot.getAttribute('data-slide-to') == slideCurrent) {
        dot.classList.add('dot-active');
      } else {
        dot.classList.remove('dot-active');
      }
    });

    // set slider position for current slide
    sliderOffset += slideWidth * (slideCurrent - 1) - sliderOffset;
    slidesField.style.transform = `translateX(-${sliderOffset}px)`;
    // set slide number in counter
    sliderCurrent.textContent = getZero(slideCurrent);
  };
};

module.exports = slider;

/***/ }),

/***/ "./Food_dist/js/modules/tabs.js":
/*!**************************************!*\
  !*** ./Food_dist/js/modules/tabs.js ***!
  \**************************************/
/***/ ((module) => {

function tabs() {
  // Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  // hide all tabs with food style
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    // remove activity class in all tabs
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  // displaying food style content depending on chosen tab
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  };

  // hide all tabs and display the first tab when page loaded
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if (item == target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
};

module.exports = tabs;

/***/ }),

/***/ "./Food_dist/js/modules/timer.js":
/*!***************************************!*\
  !*** ./Food_dist/js/modules/timer.js ***!
  \***************************************/
/***/ ((module) => {

function timer() {
  // Timer

  const deadline = '2022-12-31';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60)) % 24),
          minutes = Math.floor((t / (1000 * 60)) % 60),
          seconds = Math.floor((t / (1000)) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  };

  // adds zero sign to element of the timer if needed
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    // update clock at once to prevent displaying there old data
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    };
  };

  setClock('.timer', deadline);
};

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./Food_dist/js/script.js ***!
  \********************************/
window.addEventListener('DOMContentLoaded', () => {
  const calculator = __webpack_require__(/*! ./modules/calculator */ "./Food_dist/js/modules/calculator.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./Food_dist/js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./Food_dist/js/modules/forms.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./Food_dist/js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./Food_dist/js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./Food_dist/js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./Food_dist/js/modules/timer.js");
   
  tabs();
  modal();
  timer();
  cards();
  calculator();
  forms();
  slider();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map