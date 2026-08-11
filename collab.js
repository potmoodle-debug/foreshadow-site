(() => {
  const config = window.FORESHADOW_COLLAB_CONFIG || { storage: 'local' };
  const root = document.getElementById('collab-notes');
  const storageBadge = document.getElementById('collab-storage-badge');
  const addForm = document.getElementById('collab-add-form');
  if (!root || !addForm) return;

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const LOCAL_KEY = 'foreshadow-collab-notes-v1';
  const statuses = ['Unanswered', 'Discussing', 'Agreed', 'Rejected', 'Rewrite'];
  const starterNotes = [
    {id:'story-clarity',category:'Story clarity',title:'What is the audience meant to care about?',note:'The core story is strong, but as the conspiracy and mystery layers build it becomes harder to tell which question or relationship should matter most to the viewer.',response:'',status:'Unanswered'},
    {id:'time-travel-change',category:'Time travel',title:'Does time travel visibly change the present?',note:'Make the cause-and-effect of travelling into the past easier to track. The audience should be able to point to clear present-day consequences created by a journey into the past.',response:'',status:'Unanswered'},
    {id:'susy-river',category:'Continuity question',title:'Susy describing the river',note:'Susy talks about being waist-deep in the river even though she is shown using a wheelchair. Is this intentional, a reference to an earlier time, or wording that needs clarifying?',response:'',status:'Unanswered'},
    {id:'clark-shades',category:'Character / reveal',title:'Clark and Shades',note:'Paul has said Clark is Shades. Check whether the screenplay itself makes that identity clear enough, and whether the reveal lands at the intended point.',response:'',status:'Unanswered'}
  ];

  const localLoad=()=>{try{const s=JSON.parse(localStorage.getItem(LOCAL_KEY)||'null');return Array.isArray(s)&&s.length?s:starterNotes}catch(_){return starterNotes}};
  const localSave=n=>localStorage.setItem(LOCAL_KEY,JSON.stringify(n));
  const usingSupabase=config.storage==='supabase'&&config.supabaseUrl&&config.supabaseAnonKey;
  storageBadge.textContent=usingSupabase?'Shared online saving':'Saved on this browser';
  storageBadge.className=`collab-storage-badge ${usingSupabase?'online':'local'}`;
  const headers=()=>({'apikey':config.supabaseAnonKey,'Authorization':`Bearer ${config.supabaseAnonKey}`,'Content-Type':'application/json','Prefer':'return=representation'});
  const base=()=>`${config.supabaseUrl.replace(/\/$/,'')}/rest/v1/foreshadow_responses`;
  const normalStatus=s=>String(s||'Unanswered').toLowerCase();
  const displayStatus=s=>statuses.find(x=>x.toLowerCase()===String(s||'').toLowerCase())||'Unanswered';

  async function remoteLoad(){
    const r=await fetch(`${base()}?select=note_id,response,status`,{headers:headers()});
    if(!r.ok)throw new Error(`Load failed: ${r.status}`);
    const rows=await r.json(); const map=new Map(rows.map(x=>[x.note_id,x]));
    return starterNotes.map(n=>{const x=map.get(n.id);return {...n,response:x?.response||'',status:displayStatus(x?.status)}});
  }
  async function remoteUpsert(n){
    const body={note_id:n.id,response:n.response||'',status:normalStatus(n.status),updated_at:new Date().toISOString()};
    const r=await fetch(`${base()}?on_conflict=note_id`,{method:'POST',headers:{...headers(),'Prefer':'resolution=merge-duplicates,return=representation'},body:JSON.stringify(body)});
    if(!r.ok)throw new Error(`Save failed: ${r.status}`);
  }

  let notes=usingSupabase?[]:localLoad();
  const persist=async n=>usingSupabase?remoteUpsert(n):localSave(notes);
  const render=()=>{root.innerHTML=notes.map(item=>`<article class="collab-card" data-note-id="${esc(item.id)}"><div class="collab-card-head"><div><span class="collab-category">${esc(item.category)}</span><h3>${esc(item.title)}</h3></div><select class="collab-status" aria-label="Status for ${esc(item.title)}">${statuses.map(s=>`<option value="${esc(s)}"${s===item.status?' selected':''}>${esc(s)}</option>`).join('')}</select></div><p class="collab-note">${esc(item.note)}</p><label class="collab-response-label">Paul's response<textarea class="collab-response" rows="5" placeholder="Paul can write his response here…">${esc(item.response)}</textarea></label><div class="collab-actions"><button type="button" class="collab-save">Save response</button><span class="collab-save-state" aria-live="polite"></span></div></article>`).join('')};

  root.addEventListener('click',async e=>{const c=e.target.closest('[data-note-id]');if(!c||!e.target.closest('.collab-save'))return;const n=notes.find(x=>x.id===c.dataset.noteId);if(!n)return;n.response=c.querySelector('.collab-response').value;n.status=c.querySelector('.collab-status').value;const s=c.querySelector('.collab-save-state');s.textContent='Saving…';try{await persist(n);s.textContent=usingSupabase?'Saved online':'Saved on this browser'}catch(err){console.error(err);s.textContent='Could not save'}});
  root.addEventListener('change',e=>{if(!e.target.matches('.collab-status'))return;const c=e.target.closest('[data-note-id]');const n=notes.find(x=>x.id===c?.dataset.noteId);if(n)n.status=e.target.value});

  addForm.addEventListener('submit',e=>{e.preventDefault();alert('New shared suggestions are being kept separate for now. Existing Foreshadow notes and Paul responses save online.');});

  async function init(){if(usingSupabase){root.innerHTML='<p class="collab-loading">Loading shared Foreshadow notes…</p>';try{notes=await remoteLoad();storageBadge.textContent='Shared online saving';storageBadge.className='collab-storage-badge online'}catch(err){console.error(err);storageBadge.textContent='Online connection failed';storageBadge.className='collab-storage-badge local';notes=localLoad()}}render()}
  init();
})();
