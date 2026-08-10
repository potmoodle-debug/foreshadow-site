(() => {
  const data = window.FORESHADOW;
  const threadData = window.FORESHADOW_THREADS;
  if (!data) return;

  const byId = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const card = (kicker, title, text) => `
    <article class="card">
      <span class="eyebrow">${esc(kicker)}</span>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
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
      <div class="number">${esc(item.label)}</div>
      <div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div>
    </article>
  `).join('');

  byId('travel-grid').innerHTML = data.travel.map(item =>
    card('On the page', item.title, item.text)
  ).join('');

  byId('investigation-grid').innerHTML = data.investigation.map(item =>
    card('Investigation thread', item.title, item.text)
  ).join('');

  byId('network-list').innerHTML = data.network.map(([name, text]) => `
    <div class="theme-row"><strong>${esc(name)}</strong><span>${esc(text)}</span></div>
  `).join('');

  byId('location-list').innerHTML = data.locations.map(([name, text]) => `
    <div class="theme-row"><strong>${esc(name)}</strong><span>${esc(text)}</span></div>
  `).join('');

  byId('object-grid').innerHTML = data.objects.map(item =>
    card('Object / clue', item.title, item.text)
  ).join('');

  const classifyBeat = beat => {
    const text = `${beat.title} ${beat.text}`.toLowerCase();
    const tags = new Set();
    if (/1979|young jay|young ade|childhood|younger|past/.test(text)) tags.add('1979');
    if (/present|adult jay|reunion|hospital|flat|workshop|surveillance|susy|alang|uv/.test(text)) tags.add('present');
    if (/pavahuasca|time travel|time-travel|trip|journey|return|younger body|whole|hiding people/.test(text)) tags.add('travel');
    if (/clark|bartholomew|missing|police|investigat|surveillance|shades|cover-up|evidence|abuse|alang|uv|sixpence/.test(text)) tags.add('investigation');
    return [...tags];
  };

  const sceneRows = data.beats.map((beat, index) => ({ ...beat, index, tags: classifyBeat(beat) }));
  let activeSceneFilter = 'all';

  const renderScenes = () => {
    const query = (byId('scene-search')?.value || '').trim().toLowerCase();
    const filtered = sceneRows.filter(scene => {
      const filterMatch = activeSceneFilter === 'all' || scene.tags.includes(activeSceneFilter);
      const searchMatch = !query || `${scene.title} ${scene.text}`.toLowerCase().includes(query);
      return filterMatch && searchMatch;
    });

    byId('scene-count').textContent = `${filtered.length} of ${sceneRows.length} story sequences shown`;
    byId('scene-list').innerHTML = filtered.map(scene => `
      <details class="scene-row" data-scene="${scene.index + 1}">
        <summary>
          <span class="scene-number">${String(scene.index + 1).padStart(2,'0')}</span>
          <span class="scene-title-wrap">
            <strong>${esc(scene.title)}</strong>
            <span class="scene-tags">${scene.tags.map(tag => `<span>${esc(tag === 'present' ? 'present day' : tag)}</span>`).join('')}</span>
          </span>
          <span class="scene-open">+</span>
        </summary>
        <div class="scene-body"><p>${esc(scene.text)}</p></div>
      </details>
    `).join('');
  };

  byId('scene-search')?.addEventListener('input', renderScenes);
  byId('scene-filters')?.addEventListener('click', event => {
    const button = event.target.closest('[data-scene-filter]');
    if (!button) return;
    activeSceneFilter = button.dataset.sceneFilter;
    document.querySelectorAll('[data-scene-filter]').forEach(btn => btn.classList.toggle('active', btn === button));
    renderScenes();
  });
  renderScenes();

  const searchablePools = [
    ['Story sequence', data.beats.map((x, i) => ({ title: `${String(i + 1).padStart(2,'0')} · ${x.title}`, text: x.text }))],
    ['Timeline', data.timeline],
    ['Character', data.characters.map(x => ({ title: x.name, text: `${x.role}. ${x.notes}` }))],
    ['Time travel', data.travel],
    ['Investigation', data.investigation],
    ['Clue', data.objects],
    ['Location', data.locations.map(([title, text]) => ({ title, text }))],
    ['Network', data.network.map(([title, text]) => ({ title, text }))]
  ];

  const matchesThread = (item, keywords) => {
    const haystack = `${item.title || ''} ${item.text || ''}`.toLowerCase();
    return keywords.some(keyword => haystack.includes(keyword.toLowerCase()));
  };

  const renderThread = thread => {
    if (!thread) return;
    byId('thread-intro').innerHTML = `<span class="eyebrow">Selected thread</span><h3>${esc(thread.label)}</h3><p>${esc(thread.description)}</p>`;
    const groups = searchablePools.map(([label, items]) => {
      const matches = items.filter(item => matchesThread(item, thread.keywords));
      if (!matches.length) return '';
      return `<section class="thread-group"><div class="thread-group-title">${esc(label)} <span>${matches.length}</span></div>${matches.map(item => `
        <article class="thread-hit"><h4>${esc(item.title)}</h4><p>${esc(item.text)}</p></article>
      `).join('')}</section>`;
    }).filter(Boolean);
    byId('thread-results').innerHTML = groups.join('') || '<p class="empty-state">No matching entries found.</p>';
  };

  if (threadData?.threads?.length) {
    byId('thread-buttons').innerHTML = threadData.threads.map((thread, index) => `
      <button type="button" class="thread-btn${index === 0 ? ' active' : ''}" data-thread="${esc(thread.id)}">${esc(thread.label)}</button>
    `).join('');
    renderThread(threadData.threads[0]);
    byId('thread-buttons').addEventListener('click', event => {
      const button = event.target.closest('[data-thread]');
      if (!button) return;
      document.querySelectorAll('[data-thread]').forEach(btn => btn.classList.toggle('active', btn === button));
      renderThread(threadData.threads.find(thread => thread.id === button.dataset.thread));
    });
  }

  if (threadData?.relationships?.length) {
    byId('relationship-list').innerHTML = threadData.relationships.map(rel => `
      <article class="relationship-row ${esc(rel.status)}">
        <div class="relationship-pair"><strong>${esc(rel.from)}</strong><span class="relationship-arrow">→</span><strong>${esc(rel.to)}</strong></div>
        <div class="relationship-detail"><span class="rel-status ${esc(rel.status)}">${esc(rel.status)}</span><p>${esc(rel.text)}</p></div>
      </article>
    `).join('');
  }

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