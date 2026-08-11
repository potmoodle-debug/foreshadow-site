(() => {
  const F = window.FORESHADOW || {};
  const host = document.getElementById('development-tools');
  if (!host) return;
  const beats = F.beats || [];
  const travelBeats = beats.map((b,i)=>({b,i})).filter(x=>/1979|Pavahuasca|past|time travel|trip|journey/i.test(x.b.title+' '+x.b.text));
  const effect = travelBeats.map(({b,i})=>{
    const text=b.text||'';
    let consequence='No altered present-day outcome is explicitly recorded in this screenplay reference.';
    if (/prove|establish|real/i.test(text)) consequence='Establishes that the past is physically accessible and testable.';
    if (/Bartholomew|Armstrong/i.test(text)) consequence='Gives Jay and Ade information about Clark’s surroundings and the adults connected to him.';
    if (/memorise|registration|mole/i.test(text)) consequence='Creates information the adult travellers can carry back into the investigation.';
    return {title:b.title,action:text,consequence};
  });
  const setups=[
    ['Clark’s sixpence','Left after Clark disappears and retained by Jay.','Its continuing narrative payoff should be tracked through the later story.'],
    ['The hidden cigar tube','Used by Jay and Ade as a physical test of whether the 1979 journey is real.','Functions as evidence that their actions in the past are not merely remembered or imagined.'],
    ['Black cars / surveillance','Vehicles and watchers appear around Jay and Ade before the organisation explains itself.','Pays into Shades revealing that the pair have been observed for decades.'],
    ['Clark’s magic','Clark is shown as unusually gifted at sleight of hand.','The screenplay reference establishes the talent; any later identity/reveal connection should be made explicit on the page if intended.'],
    ['UV coordinates / 2012','A hidden message sends Jay and Ade toward Alang.','Introduces another mystery strand; its eventual answer/payoff should remain visible to the audience.']
  ];
  host.innerHTML=`
    <div class="dev-modebar"><button id="paul-mode" type="button">Paul mode</button><span>Shows only questions awaiting Paul and agreed rewrite work.</span></div>
    <div class="dev-grid">
      <section class="dev-panel"><span class="dev-kicker">TIME TRAVEL CAUSE → EFFECT</span><h3>What does each journey actually do?</h3><div>${effect.map(x=>`<article class="effect-row"><strong>${x.title}</strong><p>${x.action}</p><div class="effect-arrow">↓</div><p class="effect-result">${x.consequence}</p></article>`).join('')}</div></section>
      <section class="dev-panel"><span class="dev-kicker">FORESHADOWING TRACKER</span><h3>Setup → meaning → payoff</h3><div>${setups.map(x=>`<article class="setup-row"><strong>${x[0]}</strong><p><b>Setup:</b> ${x[1]}</p><p><b>Payoff / question:</b> ${x[2]}</p></article>`).join('')}</div></section>
    </div>`;
  document.getElementById('paul-mode')?.addEventListener('click',()=>{
    document.body.classList.toggle('paul-mode');
    const on=document.body.classList.contains('paul-mode');
    document.getElementById('paul-mode').textContent=on?'Exit Paul mode':'Paul mode';
    document.getElementById('collaboration')?.scrollIntoView({behavior:'smooth'});
    window.dispatchEvent(new CustomEvent('foreshadow-paul-mode',{detail:{on}}));
  });
})();