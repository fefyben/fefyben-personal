'use strict';

(function getSkills() {
  let item = '';

  fetch('content/skills.json')
    .then(res => res.json())
    .then(data => {
      const entries = Object.entries(data);

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
    })
    .catch(err => console.log(err));
})();

// Load animation when skills is in Viewport
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

	  if (isInViewport(document.querySelector('.skillset li:first-child')) || isInViewport(document.querySelector('.skillset li:last-child'))) {
      skillItem = skillItem.className = `skillsbar-bar skillsbar-${ skillPercent }`;
    } else {
      skillItem = skillItem.classList.remove(`skillsbar-${ skillPercent }`);
    }
  });
}, false);

// document.addEventListener("DOMContentLoaded", getAbout());
// Get About content
window.onload = function getAbout() {
  fetch('content/about.txt')
    .then(res => res.text())
    .then(data => {
      document.querySelector('#about-content').innerHTML = data;
    })
    .catch(err => console.log(err));
};