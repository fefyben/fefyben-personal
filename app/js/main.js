(function() {
  'use strict';
  
  const aboutContent = document.querySelector('#about-content'),
      skillsContent = document.querySelector('#skillsbar-content');

  fetch('content/content.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Get About content
      aboutContent.innerHTML = `<p>${ data.about.content.replace(/\n/g, '</p><p>') }</p>`;

      // Get Portfolio content - TODO

      // Get Skills content
      const skillsbarList = document.createElement('ul');
      skillsbarList.classList.add('skillsbar');

      const skillsData = Object.entries(data.skillset.skillsList);
      
      let item = '';

      for (const [lang, percent] of skillsData) {
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
        
        skillsbarList.innerHTML = item;
      }

      skillsContent.appendChild(skillsbarList);

      // Get Contact content - TODO
    })
    .catch(err => console.log(err)); // TODO

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// Load animation when skills is in Viewport
window.addEventListener('scroll', () => {
  const isInViewport = elem => {
    const distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const skills = document.querySelectorAll('.skillsbar li');

  skills.forEach(skill => {
    let skillPercent = skill.children[0].children[1].textContent;
    skillPercent = skillPercent.slice(0, -1);

    let skillItem = skill.children[1].children[0];

    if (isInViewport(document.querySelector('.skillset li:first-child')) || 
        isInViewport(document.querySelector('.skillset li:last-child'))) {
      skillItem = skillItem.className = `skillsbar-bar skillsbar-${ skillPercent }`;
    } else {
      skillItem = skillItem.classList.remove(`skillsbar-${ skillPercent }`);
    }
  });
});

