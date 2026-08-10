(() => {
  const data = window.FORESHADOW;
  if (!data) return;

  const status = (name) => `<span class="status ${name}">${name}</span>`;

  document.getElementById('strapline').textContent = data.project.strapline;
  document.getElementById('core-concept').textContent = data.concept.core;
  document.getElementById('title-function').textContent = data.concept.titleFunction;

  document.getElementById('principle-grid').innerHTML = data.principles.map(item => `
    <article class="card">
      ${status(item.status)}
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');

  document.getElementById('mechanics').innerHTML = data.mechanics.map(item => `
    <article class="timeline-step" tabindex="0" data-step="${item.id}">
      <div class="number">${item.label}</div>
      <div>
        ${status(item.status)}
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join('');

  document.getElementById('character-grid').innerHTML = data.characters.map(item => `
    <article class="card">
      ${status(item.status)}
      <h3>${item.name}</h3>
      <p><strong style="color:#d8d2c8">${item.role}</strong></p>
      <p style="margin-top:.75rem">${item.notes}</p>
    </article>
  `).join('');

  document.getElementById('theme-list').innerHTML = data.themes.map(([name, text]) => `
    <div class="theme-row"><strong>${name}</strong><span>${text}</span></div>
  `).join('');

  document.getElementById('influence-grid').innerHTML = data.influences.map(item => `
    <article class="influence">
      <span class="eyebrow">Influence</span>
      <div><h3>${item.title}</h3><p>${item.use}</p></div>
    </article>
  `).join('');

  document.getElementById('rewrite-grid').innerHTML = data.rewrite.map(item => `
    <article class="card">
      ${status(item.status)}
      <h3>${item.title}</h3>
      <p>${item.why}</p>
    </article>
  `).join('');

  document.getElementById('question-list').innerHTML = data.questions.map(item => `
    <div class="question-item">${item}</div>
  `).join('');

  const memories = [
    'You remember the life you left.',
    'You also remember the life that replaced it.',
    'A third history arrives with people you know differently.',
    'Soon, certainty is the thing that no longer survives.'
  ];

  function renderMemories(count) {
    const stack = document.getElementById('memory-stack');
    stack.innerHTML = memories.slice(0, count).map((text, i) => {
      const opacity = 1 - i * 0.2;
      const y = i * 24;
      const x = i * 7;
      return `<div class="memory-line" style="opacity:${opacity};transform:translate(${x}px, ${y}px)">${text}</div>`;
    }).join('');
  }
  renderMemories(2);

  document.querySelectorAll('[data-memory]').forEach(btn => {
    btn.addEventListener('click', () => renderMemories(Number(btn.dataset.memory)));
  });

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