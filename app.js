(() => {
  const data = window.FORESHADOW;
  if (!data) return;

  document.getElementById('story-summary').textContent = data.summary;

  document.getElementById('beat-grid').innerHTML = data.beats.map(item => `
    <article class="card">
      <span class="eyebrow">Story beat</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');

  document.getElementById('character-grid').innerHTML = data.characters.map(item => `
    <article class="card">
      <span class="eyebrow">${item.role}</span>
      <h3>${item.name}</h3>
      <p>${item.notes}</p>
    </article>
  `).join('');

  document.getElementById('timeline-list').innerHTML = data.timeline.map(item => `
    <article class="timeline-step" tabindex="0">
      <div class="number">${item.label}</div>
      <div><h3>${item.title}</h3><p>${item.text}</p></div>
    </article>
  `).join('');

  document.getElementById('travel-grid').innerHTML = data.travel.map(item => `
    <article class="card">
      <span class="eyebrow">On the page</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');

  document.getElementById('location-list').innerHTML = data.locations.map(([name, text]) => `
    <div class="theme-row"><strong>${name}</strong><span>${text}</span></div>
  `).join('');

  document.getElementById('object-grid').innerHTML = data.objects.map(item => `
    <article class="card">
      <span class="eyebrow">Object / clue</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');

  const navLinks = [...document.querySelectorAll('.nav a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-10% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
})();