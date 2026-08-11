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
    {
      id: 'story-clarity',
      category: 'Story clarity',
      title: 'What is the audience meant to care about?',
      note: 'The core story is strong, but as the conspiracy and mystery layers build it becomes harder to tell which question or relationship should matter most to the viewer.',
      response: '',
      status: 'Unanswered'
    },
    {
      id: 'time-travel-change',
      category: 'Time travel',
      title: 'Does time travel visibly change the present?',
      note: 'Make the cause-and-effect of travelling into the past easier to track. The audience should be able to point to clear present-day consequences created by a journey into the past.',
      response: '',
      status: 'Unanswered'
    },
    {
      id: 'susy-river',
      category: 'Continuity question',
      title: 'Susy describing the river',
      note: 'Susy talks about being waist-deep in the river even though she is shown using a wheelchair. Is this intentional, a reference to an earlier time, or wording that needs clarifying?',
      response: '',
      status: 'Unanswered'
    },
    {
      id: 'clark-shades',
      category: 'Character / reveal',
      title: 'Clark and Shades',
      note: 'Paul has said Clark is Shades. Check whether the screenplay itself makes that identity clear enough, and whether the reveal lands at the intended point.',
      response: '',
      status: 'Unanswered'
    }
  ];

  const localLoad = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null');
      return Array.isArray(saved) && saved.length ? saved : starterNotes;
    } catch (_) {
      return starterNotes;
    }
  };

  const localSave = notes => localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));

  const usingSupabase = config.storage === 'supabase' && config.supabaseUrl && config.supabaseAnonKey;
  storageBadge.textContent = usingSupabase ? 'Shared online saving' : 'Saved on this browser';
  storageBadge.className = `collab-storage-badge ${usingSupabase ? 'online' : 'local'}`;

  const supabaseHeaders = () => ({
    'apikey': config.supabaseAnonKey,
    'Authorization': `Bearer ${config.supabaseAnonKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  });

  const supabaseBase = () => `${config.supabaseUrl.replace(/\/$/, '')}/rest/v1/foreshadow_notes`;

  async function remoteLoad() {
    const response = await fetch(`${supabaseBase()}?select=*&order=created_at.asc`, { headers: supabaseHeaders() });
    if (!response.ok) throw new Error(`Load failed: ${response.status}`);
    const rows = await response.json();
    if (!rows.length) {
      for (const note of starterNotes) await remoteUpsert(note);
      return starterNotes;
    }
    return rows.map(row => ({
      id: row.id,
      category: row.category,
      title: row.title,
      note: row.note,
      response: row.response || '',
      status: row.status || 'Unanswered'
    }));
  }

  async function remoteUpsert(note) {
    const response = await fetch(`${supabaseBase()}?on_conflict=id`, {
      method: 'POST',
      headers: { ...supabaseHeaders(), 'Prefer': 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify(note)
    });
    if (!response.ok) throw new Error(`Save failed: ${response.status}`);
  }

  async function remoteDelete(id) {
    const response = await fetch(`${supabaseBase()}?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: supabaseHeaders()
    });
    if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
  }

  let notes = usingSupabase ? [] : localLoad();

  const persist = async note => {
    if (usingSupabase) return remoteUpsert(note);
    localSave(notes);
  };

  const render = () => {
    root.innerHTML = notes.map(item => `
      <article class="collab-card" data-note-id="${esc(item.id)}">
        <div class="collab-card-head">
          <div>
            <span class="collab-category">${esc(item.category)}</span>
            <h3>${esc(item.title)}</h3>
          </div>
          <select class="collab-status" aria-label="Status for ${esc(item.title)}">
            ${statuses.map(status => `<option value="${esc(status)}"${status === item.status ? ' selected' : ''}>${esc(status)}</option>`).join('')}
          </select>
        </div>
        <p class="collab-note">${esc(item.note)}</p>
        <label class="collab-response-label">Paul's response
          <textarea class="collab-response" rows="5" placeholder="Paul can write his response here…">${esc(item.response)}</textarea>
        </label>
        <div class="collab-actions">
          <button type="button" class="collab-save">Save response</button>
          <span class="collab-save-state" aria-live="polite"></span>
          <button type="button" class="collab-delete" title="Remove this note">Remove</button>
        </div>
      </article>
    `).join('');
  };

  root.addEventListener('click', async event => {
    const card = event.target.closest('[data-note-id]');
    if (!card) return;
    const id = card.dataset.noteId;
    const item = notes.find(note => note.id === id);
    if (!item) return;

    if (event.target.closest('.collab-save')) {
      item.response = card.querySelector('.collab-response').value;
      item.status = card.querySelector('.collab-status').value;
      const state = card.querySelector('.collab-save-state');
      state.textContent = 'Saving…';
      try {
        await persist(item);
        state.textContent = usingSupabase ? 'Saved online' : 'Saved on this browser';
      } catch (error) {
        console.error(error);
        state.textContent = 'Could not save';
      }
    }

    if (event.target.closest('.collab-delete')) {
      if (!confirm('Remove this Foreshadow note?')) return;
      try {
        if (usingSupabase) await remoteDelete(id);
        notes = notes.filter(note => note.id !== id);
        if (!usingSupabase) localSave(notes);
        render();
      } catch (error) {
        console.error(error);
        card.querySelector('.collab-save-state').textContent = 'Could not remove';
      }
    }
  });

  root.addEventListener('change', event => {
    if (!event.target.matches('.collab-status')) return;
    const card = event.target.closest('[data-note-id]');
    const item = notes.find(note => note.id === card?.dataset.noteId);
    if (item) item.status = event.target.value;
  });

  addForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = new FormData(addForm);
    const title = String(form.get('title') || '').trim();
    const note = String(form.get('note') || '').trim();
    const category = String(form.get('category') || 'Suggestion').trim();
    if (!title || !note) return;

    const item = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      category,
      title,
      note,
      response: '',
      status: 'Unanswered'
    };

    notes.push(item);
    try {
      await persist(item);
      addForm.reset();
      render();
      document.querySelector(`[data-note-id="${item.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      console.error(error);
      notes.pop();
      alert('The note could not be saved.');
    }
  });

  async function init() {
    if (usingSupabase) {
      root.innerHTML = '<p class="collab-loading">Loading shared Foreshadow notes…</p>';
      try {
        notes = await remoteLoad();
      } catch (error) {
        console.error(error);
        storageBadge.textContent = 'Online connection failed';
        storageBadge.className = 'collab-storage-badge local';
        notes = localLoad();
      }
    }
    render();
  }

  init();
})();
