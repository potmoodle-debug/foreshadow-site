(()=>{
  const evidence = {
    'story-clarity': {
      title: 'What the screenplay actually says',
      note: 'These are Paul’s words from the current screenplay, not reader interpretation.',
      quotes: [
        { label: 'SUSY', text: '“It affected all of us so deeply. And you more than anyone else of course.”' },
        { label: 'JAY', text: '“We’ve all lived with Clark’s disappearance every day.”' },
        { label: 'ADE', text: '“We should have been there for each other after that but we were kids and it broke us all. It sucked all the colour from our childhood. I never recovered and I’m pretty sure neither of you did either.”' }
      ],
      reading: 'The emotional centre is already stated on the page: Clark’s disappearance broke the group. The reader-feedback question is therefore whether the later mystery layers keep that emotional centre visible enough.'
    },
    'susy-river': {
      title: 'What the screenplay actually says',
      note: 'The line that prompted the question appears in Susy’s memory of the brook.',
      quotes: [
        { label: 'SUSY', text: '“Our whole childhood seemed to flow with the Brook. The fishing and dam building. It’s a wonder we don’t all have webbed feet with the amount of time we spent up to our waists in water, but especially making dens in the reed beds.”' },
        { label: 'SCENE DIRECTION — LATER BROOK SCENE', text: '“A bunch of kids are playing in the Brook… The kids are waist deep in their swimming shorts and t-shirts.”' }
      ],
      reading: 'The screenplay establishes the children being in the water, but does not itself describe Susy being helped out of her wheelchair. Paul’s separate response supplies that intended physical detail.'
    },
    'time-travel-change': {
      title: 'What the screenplay actually says',
      note: 'Two passages on the page show history or memory behaving differently after the trips.',
      quotes: [
        { label: 'JAY — CAFÉ', text: '“My best memory is of the four of us, You, me, Susy and Clark. The time we found that huge hornet nest in our den in the reeds…”' },
        { label: 'ADE', text: '“Yeah, I remember that day but I thought you told the story of my brother and the Kangerellipigs. Didn’t you?”' },
        { label: 'JAY', text: '“No, don’t you remember? On the way up there you sprained your ankle and I helped you home. You could barely walk. We were gutted we couldn’t go with them.”' },
        { label: 'ADE', text: '“I need you to watch this Jay.”' },
        { label: 'SHADES — LATER', text: '“We watched Laurier kick the shit out of several adults when he was a week shy of his eleventh birthday. You were both there. We watch you closely after that and you make no mention of it for nearly thirty years. Not once! Then suddenly, now, you’re talking about nothing else.”' }
      ],
      reading: 'The camcorder scene gives the audience a tangible mismatch between recorded history and Jay’s current memory. Shades later identifies another discontinuity. Paul’s response about the Mandela effect and reality “shuffling” events explains the rule behind what the script is already showing.'
    },
    'clark-shades': {
      title: 'What the screenplay actually says',
      note: 'This is how Shades is presented in the current draft.',
      quotes: [
        { label: 'SCENE DIRECTION', text: '“Jay sits opposite ‘Shades’ across a small table in a small interview room.”' },
        { label: 'SHADES', text: '“You’re not detained. We just want to ask you some questions about Bartholomew. Our organisation has been watching you two for thirty years.”' }
      ],
      reading: 'The current screenplay introduces Shades as a present-day member of a watching organisation. It does not state on the page that Shades is Clark. This feedback item should therefore be treated as an identity question rather than a confirmed reveal.'
    }
  };

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function decorate(){
    document.querySelectorAll('.collab-card[data-id]').forEach(card => {
      if (card.querySelector('.script-evidence')) return;
      const item = evidence[card.dataset.id];
      if (!item) return;
      const block = document.createElement('section');
      block.className = 'script-evidence';
      block.innerHTML = `
        <div class="script-evidence-head"><span>SCREENPLAY EVIDENCE</span><strong>${esc(item.title)}</strong></div>
        <p class="script-evidence-note">${esc(item.note)}</p>
        <div class="script-quote-list">${item.quotes.map(q => `<blockquote class="script-quote"><span>${esc(q.label)}</span><p>${esc(q.text)}</p></blockquote>`).join('')}</div>
        <div class="script-reading"><span>WHAT THIS MEANS FOR THE NOTE</span><p>${esc(item.reading)}</p></div>`;
      const response = card.querySelector('.collab-response-label');
      if (response) card.insertBefore(block, response);
      else card.appendChild(block);
    });
  }

  document.addEventListener('DOMContentLoaded', decorate);
  window.addEventListener('foreshadow-notes-loaded', decorate);
  const root = document.getElementById('collab-notes');
  if (root) {
    const observer = new MutationObserver(() => decorate());
    observer.observe(root, { childList:true, subtree:true });
  }
})();