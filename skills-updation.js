const skills = document.querySelectorAll('.skill');

  // Circle circumference for r=52
  const circumference = 2 * Math.PI * 52;

  function setProgress(circle, percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function animateSkill(skill, targetPercent) {
    let current = 0;
    const circle = skill.querySelector('.progress-ring__circle');
    const percentText = skill.querySelector('.skill-percent');

    // Reset for animation
    circle.style.strokeDashoffset = circumference;
    percentText.textContent = '0%';

    const interval = setInterval(() => {
      if (current >= targetPercent) {
        clearInterval(interval);
      } else {
        current++;
        setProgress(circle, current);
        percentText.textContent = `${current}%`;
      }
    }, 15);
  }

  function updateSkills() {
    skills.forEach(skill => {
      const target = parseInt(skill.getAttribute('data-percentage'), 10);
      animateSkill(skill, target);
    });
  }

  // Initial animation
  updateSkills();

  // Update every 5 seconds
  setInterval(() => {
    // Optional: You can randomize or keep same percentages.
    updateSkills();
  }, 5000);