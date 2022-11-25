/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

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

const adv = document.querySelectorAll('.promo__adv img');
const poster = document.querySelector('.promo__bg');
const genre = document.querySelector('.promo__genre');
const movieList = document.querySelector('.promo__interactive-list');

// removing advertising blocks
adv.forEach(item => item.remove());

// changing the genre of the movie
genre.textContent = "Драма";

// replace poster background image
poster.style.background = 'url("./img/bg.jpg") center center/cover no-repeat';

movieDB.movies.sort();

movieList.innerHTML = "";

// gettting list of movies from movieDB object + add ordering
movieDB.movies.forEach((movie, i) => {
    movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${movie}
            <div class="delete"></div>
        </li>
    `;
});

