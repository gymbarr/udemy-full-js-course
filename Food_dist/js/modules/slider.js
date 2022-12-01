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

export default slider;