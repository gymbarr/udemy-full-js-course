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