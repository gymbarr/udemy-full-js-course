function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
};

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const btnsContactUs = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        btnCloseModal = document.querySelector('[data-close]');

  btnsContactUs.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  // open modal window when a user scrolled the page to the bottom
  window.addEventListener('scroll', showModalByScroll);

  // close modal window by clicking on close button
  btnCloseModal.addEventListener('click', () => closeModal(modalSelector));

  // close modal window by clicking on area behind the dialog
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == "") {
      closeModal(modalSelector);
    }
  });

  // close modal window by clicking on escape button
  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };
};

export default modal;
export {closeModal};
export {openModal};