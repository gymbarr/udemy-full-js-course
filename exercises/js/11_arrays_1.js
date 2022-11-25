/*
1) Напишите функцию showFamily, которая будет принимать в себя массив строк и возвращать сообщение в нужном формате.
showFamily(family)  => 'Семья состоит из: Peter Ann Alex Linda'
Имена подставляются автоматически из массива. Если массив пустой, то выводится сообщение 'Семья пуста'

2) напишите функцию standardizeStrings, которая будет принимать в себя массив строк и будет выводить в консоль эти строки в нижнем регистре.
Пример:
standardizeStrings(favoriteCities)  выведет в консоль
lisbon
rome
milan
dublin
Это частая задача в реальности, так как от пользователя нам могут прийти ответы в самых разных форматах. В том числе и с разными буквами :) Поэтому нам нужно привести строки в один формат для правильной работы.
*/

'use strict';

const family = ['Peter', 'Ann', 'Alex', 'Linda'];

function showFamily (familyArr) {
  if (familyArr.length) {
    return console.log(`Family consists of: ${familyArr.join(' ')}`)
  }

  console.log('Family is empty');
}

showFamily(family);


const favoriteCities = ['liSBon', 'ROME', 'miLan', 'Dublin'];

function standartizeStrings (arr) {
  arr.forEach(elem => {
    console.log(elem.toLowerCase());
  });
}

standartizeStrings(favoriteCities);