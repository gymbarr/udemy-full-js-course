/*
В этой задаче мы уже усложним работу с объектами и массивами. Она необязательна и тут можно попробовать свои силы.
Учтите, что проверка кода в таких заданиях осуществляется автоматически, через программу. Поэтому нужно четко следовать инструкции.
Вы можете сначала решить у себя в редакторе кода, а потом вставить сюда.

Задача:
У вас есть небольшой кусочек данных о торговом центре, которые записаны в объекте shoppingMallData. Они содержат массив с данными о магазинах, где указана длина и ширина помещения; высоту помещения; стоимость отопления за 1 кубический метр и бюджет на оплату отопления за месяц.
Основная задача - это написать функцию isBudgetEnough, которая буде возвращать строку. Если бюджета хватает для отопления всего объема торгового центра - выводится 'Бюджета достаточно', если нет - 'Бюджета недостаточно'. И все 🙂
Но эта задача содержит несколько подзадач внутри:
- вычисление общей площади всех магазинов, которая вычисляется как длина магазина, умноженная на его ширину;
- вычисление общего объема торгового центра, так как цена отопления указана в кубических метрах;
- определение того, хватает ли бюджета на оплату такого объема;
- все числа идут без единиц измерения для упрощения, просто цифры и все;
- функция должна продолжать работать, даже если изменяется количество магазинов, высота, бюджет или подставляется вообще другой объект.
*/

'use strict';

const shoppingMallData = {
  shops: [
    {
      width: 10,
      length: 5
    },
    {
      width: 15,
      length: 7
    },
    {
      width: 20,
      length: 5
    },
    {
      width: 8,
      length: 10
    }
  ],
  height: 5,
  moneyPer1m3: 30,
  budget: 50000
}

function isBudgetEnough(shoppingMall) {
  let overallArea = 0;
      overallVolume = 0;
      requiredBudget = 0;
  const { shops, height, moneyPer1m3, budget } = shoppingMall;

  shops.forEach(shop => {
    // общая площадь вычисляется как сумма площадей каждого магазина
    overallArea += Object.values(shop).reduce((a, b) => a * b)
  });

  overallVolume = overallArea * height;
  requiredBudget = overallVolume * moneyPer1m3;

  return budget >= requiredBudget ? 'Budget is enough' : 'Budget is not enough'
}
