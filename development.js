(() => {
  const host = document.getElementById('development-tools');
  if (!host) return;
  const tracks = [
    {
      id:'emotional-centre', title:'Clark’s disappearance',
      setup:'The screenplay repeatedly states that Clark’s disappearance broke Jay, Ade and Susy and shaped their adult lives.',
      question:'Does the later conspiracy material keep that emotional centre visible enough for the audience?',
      source:'script', status:'reader question'
    },
    {
      id:'sixpence', title:'Clark’s sixpence',
      setup:'The sixpence is left after Clark vanishes and Jay keeps it into adulthood.',
      question:'What later story function or payoff does the sixpence ultimately have?',
      source:'script', status:'unresolved'
    },
    {
      id:'time-travel-change', title:'Changing the past changes what is remembered',
      setup:'The screenplay shows memory/record mismatches after the 1979 trips; Paul has also described this as a Mandela-effect consequence of altered history.',
      question:'The rule is now clearer; the remaining craft question is how clearly the film itself communicates the new reality to the audience.',
      source:'mixed', status:'paul clarified'
    },
    {
      id:'surveillance', title:'Black cars and long-term surveillance',
      setup:'Black vehicles and watchers appear before Shades explains that Jay and Ade have been monitored for decades.',
      question:'This has a visible setup and later explanation. The unresolved question is what the organisation ultimately wants.',
      source:'script', status:'partial payoff'
    },
    {
      id:'clark-magic', title:'Clark’s magic',
      setup:'Clark is established as unusually gifted at sleight of hand before his disappearance.',
      question:'Does this ability connect to a later identity, event or thematic payoff, or is it simply character texture?',
      source:'script', status:'unresolved'
    },
    {
      id:'uv-2012', title:'UV message / 2012 / Alang',
      setup:'A hidden UV message sends Jay and Ade toward coordinates, the year 2012 and Alang.',
      question:'What answer does this thread eventually give the audience, and how does it connect back to Clark and the central story?',
      source:'script', status:'unresolved'
    }
  ];
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const badge = s => s==='paul clarified' ? '<span class="source-tag paul">PAUL</span>' : s==='unresolved' ? '<span class="source-tag unresolved">UNRESOLVED</span>' : '<span class="source-tag chris">CHRIS</span>';
  function render(){
    host.innerHTML=`<div class="analysis-intro"><span class="source-tag script">SCRIPT</span><p>This analysis is curated from the screenplay and reader feedback. It does not infer story meaning from keywords.</p></div><div class="analysis-tracker">${tracks.map(t=>`<article class="analysis-row"><div class="analysis-title"><span class="dev-kicker">SETUP → PAYOFF</span><h3>${esc(t.title)}</h3><div class="source-row"><span class="source-tag script">SCRIPT</span>${badge(t.status)}</div></div><div class="analysis-evidence"><strong>What is on the page</strong><p>${esc(t.setup)}</p></div><div class="analysis-question"><strong>Current question / status</strong><p>${esc(t.question)}</p><span class="analysis-status">${esc(t.status)}</span></div></article>`).join('')}</div>`;
  }
  render();
})();