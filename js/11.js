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