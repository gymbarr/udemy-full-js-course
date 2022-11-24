'use strict';

const personalPlanPeter = {
  name: "Peter",
  age: "29",
  skills: {
      languages: ['ru', 'eng'],
      programmingLangs: {
          js: '20%',
          php: '10%'
      },
      exp: '1 month'
  },
  showAgeAndLangs(personalPlan) {
    const {
      age,
      skills: { languages }
    } = personalPlan;

    let personInfo = `I'm ${age} years old and I know languages: `;

    console.log(languages);
    for (let lang of languages) {
      personInfo += `${lang.toUpperCase()} `;
    }

    console.log(personInfo.trim());
  }
};

function showExperience(personalPlan) {
  const { exp } = personalPlan.skills;
  console.log(exp);
}

function showProgrammingLangs(personalPlan) {
  const { programmingLangs } = personalPlan.skills;
  let langsInfo = '';

  for (let lang in programmingLangs) {
    langsInfo += `Language ${lang} learned by ${programmingLangs[lang]} `;
  }

  console.log(langsInfo.trim());
}

function showAgeAndLangs(personalPlan) {
  let {
    age,
    skills: { languages }
  } = personalPlan;

  let personInfo = `I'm ${age} years old and I know languages: `;

  for (let lang of languages) {
    personInfo += `${lang.toUpperCase()} `;
  }

  console.log(personInfo.trim());
}

showExperience(personalPlanPeter);
showProgrammingLangs(personalPlanPeter);
personalPlanPeter.showAgeAndLangs(personalPlanPeter);