window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabs = document.querySelectorAll('.tabheader__item');
        tabsContent = document.querySelectorAll('.tabcontent');
        tabsParent = document.querySelector('.tabheader__items');

  // hide all tabs with food style
  function hideTabContent() {
    tabsContent.forEach(item => {
      // item.style.display = 'none';
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

  // Timer

  const deadline = '2022-12-31';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24));
          hours = Math.floor((t / (1000 * 60 * 60)) % 24);
          minutes = Math.floor((t / (1000 * 60)) % 60);
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
    }
  };

  setClock('.timer', deadline);

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
    if (event.target === modal) {
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
});