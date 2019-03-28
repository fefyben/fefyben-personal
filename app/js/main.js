'use strict';

const langs = { 
  "HTML": "100",
  "CSS": "92",
  "Javascript": "71",
  "PHP": "53",
  "Angular": "65"
};
const entries = Object.entries(langs);

(function getSkills() {
  let item = '';

  for (const [lang, percent] of entries) {
    let num = parseInt(percent);
    num = Math.round(num / 10);

    item += `
      <li>
        <div class="skillsbar-header">
          <h3>${ lang }</h3>
          <span class="percent">${ num }0%</span>
        </div>
        <div class="skillsbar-container">
          <span class="skillsbar-bar skillsbar-${ num }0"></span>
        </div>
      </li>
    `;
    
    document.querySelector('.skillsbar').innerHTML = item;
  }
})();

const skillSet = document.querySelector('.skillset');

const isInViewport = elem => {
  const distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

window.addEventListener('scroll', function(e) {
  let skills = document.querySelectorAll('.skillsbar li');

  skills.forEach(skill => {
    let skillPercent = skill.children[0].children[1].textContent;
    skillPercent = skillPercent.slice(0, -1);

    let skillItem = skill.children[1].children[0];

	  if (isInViewport(skillSet)) {
      skillItem = skillItem.className = `skillsbar-bar skillsbar-${ skillPercent }`;
    } else {
      skillItem = skillItem.classList.remove(`skillsbar-${ skillPercent }`);
    }
  });
}, false);