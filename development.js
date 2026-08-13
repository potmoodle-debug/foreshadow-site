(() => {
  const host = document.getElementById('development-tools');
  if (!host) return;

  const strengths = [
    {
      title:'Jay’s emotional centre',
      text:'A middle-aged man whose present is destabilised by something unresolved from childhood gives the story a strong human foundation. It gives the time travel a potentially personal purpose rather than making it a gimmick.'
    },
    {
      title:'1979 and the disappearance',
      text:'The park, the sixpence, the waiting child and the disappearance have a simple, eerie quality. This feels like one of the clearest pieces of Foreshadow’s identity.'
    },
    {
      title:'Ade',
      text:'Ade feels human and textured. His derelict-school home, especially the extraordinary painted room, tells us something about him without needing exposition.'
    },
    {
      title:'The visual motifs',
      text:'The sixpence, the brook, the black car, repeated places, altered memories and people appearing where they seemingly should not can give the film a strong visual language and make the title Foreshadow meaningful.'
    },
    {
      title:'Jay as a social worker',
      text:'Paul’s planned change has strong thematic potential: Jay’s adult life becomes about damaged people, intervention and trying to prevent bad outcomes, which can echo what happened to him as a child.'
    },
    {
      title:'The psychological side of time travel',
      text:'The premise becomes strongest when revisiting the past is emotionally dangerous. The closer the time travel stays to Jay, memory and consequence, the more distinctive the story feels.'
    }
  ];

  const concerns = [
    {
      title:'Too many competing stories',
      text:'Jay, Clark’s disappearance, Bartholomew, Shades, Oneirotech, Ade, the time-travel mechanism and the wider conspiracy do not yet always feel like different faces of one story. At points they feel stacked on top of one another.'
    },
    {
      title:'The audience’s main question keeps changing',
      text:'“What happened to Clark?” is a strong question. Other mysteries sometimes arrive before that one has generated enough momentum, so they can replace the central mystery rather than deepen it.'
    },
    {
      title:'The conspiracy can overwhelm the human story',
      text:'Bartholomew, Shades and Oneirotech may all be necessary, but the more mythology they require, the further the story can move away from Jay. They may work better if they emerge gradually from his investigation.'
    },
    {
      title:'Mystery sometimes becomes confusion',
      text:'Some early sequences are difficult to understand on a first read. Mystery should make the audience want an answer; confusion can leave them unsure what they have just been asked to follow.'
    },
    {
      title:'The causal chain could be stronger',
      text:'At times the screenplay moves Jay toward the next piece of information rather than making the next event feel like the consequence of a choice he has made.'
    },
    {
      title:'Jay can feel passive',
      text:'The story is strongest when Jay makes choices that progressively cost him more: investigate, reconnect, take the substance, interfere with the past, conceal what he remembers, go back again. Each choice should make retreat harder.'
    },
    {
      title:'Time travel needs to feel indispensable',
      text:'If large parts of the film could become a conspiracy thriller about memory or experimentation without fundamentally changing, the time travel risks feeling detachable from the core story.'
    },
    {
      title:'The destination is still unclear',
      text:'The screenplay has accumulated substantial mythology while its final destination remains uncertain. It currently feels as though it has discovered more story faster than it has resolved story.'
    }
  ];

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
  const assessmentCards = items => items.map(item => `<article class="assessment-card"><h4>${esc(item.title)}</h4><p>${esc(item.text)}</p></article>`).join('');

  function render(){
    host.innerHTML=`
      <section class="reader-assessment" aria-labelledby="reader-assessment-title">
        <div class="assessment-heading">
          <span class="dev-kicker">OVERALL READER ASSESSMENT</span>
          <h3 id="reader-assessment-title">Where the screenplay feels strongest — and where it currently loses focus.</h3>
          <p>This is Chris’s reading of the current screenplay, not screenplay canon and not an instruction to rewrite it in a particular way.</p>
        </div>
        <div class="assessment-summary">
          <span class="assessment-label">THE CORE VIEW</span>
          <p>The parts closest to Jay, his childhood and the emotional consequences of going back are the strongest; the further the film moves into accumulated mythology and conspiracy, the less clear it becomes what the audience is supposed to care about.</p>
        </div>
        <div class="assessment-columns">
          <section class="assessment-column strengths">
            <div class="assessment-column-head"><span>01</span><h3>Most happy with</h3></div>
            ${assessmentCards(strengths)}
          </section>
          <section class="assessment-column concerns">
            <div class="assessment-column-head"><span>02</span><h3>Least happy with</h3></div>
            ${assessmentCards(concerns)}
          </section>
        </div>
        <div class="assessment-note">
          <strong>This does not mean removing the strange material.</strong>
          <p>Clark, Bartholomew, Shades and Oneirotech could become more effective if they gradually reveal themselves as parts of the same central mystery rather than feeling like additional mysteries the audience has to carry separately.</p>
        </div>
      </section>
      <div class="analysis-intro"><span class="source-tag script">SCRIPT</span><p>This setup-and-payoff analysis is curated from the screenplay and reader feedback. It does not infer story meaning from keywords.</p></div>
      <div class="analysis-tracker">${tracks.map(t=>`<article class="analysis-row"><div class="analysis-title"><span class="dev-kicker">SETUP → PAYOFF</span><h3>${esc(t.title)}</h3><div class="source-row"><span class="source-tag script">SCRIPT</span>${badge(t.status)}</div></div><div class="analysis-evidence"><strong>What is on the page</strong><p>${esc(t.setup)}</p></div><div class="analysis-question"><strong>Current question / status</strong><p>${esc(t.question)}</p><span class="analysis-status">${esc(t.status)}</span></div></article>`).join('')}</div>`;
  }
  render();
})();