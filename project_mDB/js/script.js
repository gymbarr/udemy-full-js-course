/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против..."
  ]
};

const maxMovieNameLength = 21;

const adv = document.querySelectorAll('.promo__adv img');
const poster = document.querySelector('.promo__bg');
const genre = document.querySelector('.promo__genre');
const movieList = document.querySelector('.promo__interactive-list');

const btnConfirm = document.querySelector('.add button');
const inputMovieName = document.querySelector('.add input');

// removing advertising blocks
adv.forEach(item => item.remove());

// changing the genre of the movie
genre.textContent = "Драма";

// replace poster background image
poster.style.background = 'url("./img/bg.jpg") center center/cover no-repeat';

// display movies from the object db
displayMoviesList();

// adding a new movie to the watched list
btnConfirm.addEventListener('click', addMovie);


function displayMoviesList() {
  movieList.innerHTML = "";
  // perform case-insensitive sorting of movies
  movieDB.movies.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // gettting list of movies from movieDB object + add ordering
  movieDB.movies.forEach((movie, i) => {
    // truncate name if it greater than max limit
    let shortMovie = movie.length > maxMovieNameLength ? `${movie.substring(0, maxMovieNameLength)}...` : movie;

    movieList.innerHTML += `
      <li class="promo__interactive-item">${i + 1}. ${shortMovie}
        <div class="delete"></div>
      </li>
    `;
  });

  const btnsRemoveMovie = document.querySelectorAll('.delete');

  // add event listener to each remove movie button
  btnsRemoveMovie.forEach(btn => {
    btn.addEventListener('click', removeMovie);
  });
};

function addMovie() {
  if (inputMovieName.value === "") return;

  const favoriteCheckBox = document.querySelector('.add [type="checkbox"]');

  // add full movie name to the object DB
  movieDB.movies.push(inputMovieName.value);
  displayMoviesList();

  if (favoriteCheckBox.checked) {
    console.log('Adding favorite movie!');
  };

  // clear form input after successful adding movie
  inputMovieName.value = "";
  favoriteCheckBox.checked = false;
};

function removeMovie(event) {
  const btnRemove = event.target;
  const movieElement = btnRemove.parentElement;
  const movieIndex = movieElement.textContent[0] - 1;

  // remove movie by its index from object DB and render all movies again
  movieDB.movies.splice(movieIndex, 1);
  displayMoviesList();
};
