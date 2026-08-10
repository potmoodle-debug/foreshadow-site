(() => {
  const data = window.FORESHADOW;
  if (!data) return;

  const byId = id => document.getElementById(id);
  const card = (kicker, title, text) => `
    <article class="card">
      <span class="eyebrow">${kicker}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>`;

  byId('story-summary').textContent = data.summary;

  byId('beat-grid').innerHTML = data.beats.map((item, index) =>
    card(`Story beat ${String(index + 1).padStart(2,'0')}`, item.title, item.text)
  ).join('');

  byId('character-grid').innerHTML = data.characters.map(item =>
    card(item.role, item.name, item.notes)
  ).join('');

  byId('timeline-list').innerHTML = data.timeline.map(item => `
    <article class="timeline-step" tabindex="0">
      <div class="number">${item.label}</div>
      <div><h3>${item.title}</h3><p>${item.text}</p></div>
    </article>
  `).join('');

  byId('travel-grid').innerHTML = data.travel.map(item =>
    card('On the page', item.title, item.text)
  ).join('');

  byId('investigation-grid').innerHTML = data.investigation.map(item =>
    card('Investigation thread', item.title, item.text)
  ).join('');

  byId('network-list').innerHTML = data.network.map(([name, text]) => `
    <div class="theme-row"><strong>${name}</strong><span>${text}</span></div>
  `).join('');

  byId('location-list').innerHTML = data.locations.map(([name, text]) => `
    <div class="theme-row"><strong>${name}</strong><span>${text}</span></div>
  `).join('');

  byId('object-grid').innerHTML = data.objects.map(item =>
    card('Object / clue', item.title, item.text)
  ).join('');

  document.querySelectorAll('.timeline-step').forEach(step => {
    const activate = () => {
      document.querySelectorAll('.timeline-step').forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    };
    step.addEventListener('click', activate);
    step.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') activate();
    });
  });

  const navLinks = [...document.querySelectorAll('.nav a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-10% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
})();