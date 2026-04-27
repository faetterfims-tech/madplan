// ── Hjælpefunktioner ──────────────────────────────────────

const SKIP = new Set(['salt og peber','salt','peber','vand','tandstikkere til fastgørelse','tandstikkere']);

function parseIngredient(str) {
  const lower = str.toLowerCase().trim();
  if (SKIP.has(lower)) return null;

  return str
    .replace(/^[\d]+[,\.]?[\d]*\s*(g|kg|dl|cl|ml|l|tsk|spsk|stk|fed|kviste?|bundt|dåser?|glas|pk\.?|nip|liter)\s+/gi, '')
    .replace(/^[½¼¾]\s+/, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+til\s+(servering|stegning|drys|panering|fastgørelse|garnering|dryp)\b.*/gi, '')
    .replace(/,\s+i\s+\w+/gi, '')
    .trim() || null;
}

function bilkaUrl(ingredient) {
  const term = parseIngredient(ingredient);
  if (!term) return null;
  return `https://www.bilkatogo.dk/search/?query=${encodeURIComponent(term)}`;
}

function formatTime(ts) {
  if (!ts) return 'Aldrig';
  return new Date(ts).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
}

// ── State ──────────────────────────────────────────────────

let ingredients = [];
let checkedSet = new Set();
let syncedAt = null;

// ── Render ─────────────────────────────────────────────────

function render() {
  const validItems = ingredients.filter(i => parseIngredient(i) !== null);
  const done = [...checkedSet].filter(i => i < ingredients.length).length;
  const total = validItems.length;

  document.getElementById('header-sub').textContent =
    total === 0 ? 'Ingen liste' : `${done} af ${total} lagt i kurv`;

  document.getElementById('progress-text').textContent =
    total === 0 ? 'Ingen varer' : `${total} varer på listen`;

  const badge = document.getElementById('progress-badge');
  badge.textContent = `${done}/${total}`;
  badge.className = `badge${done === total && total > 0 ? '' : ''}`;

  document.getElementById('sync-time').textContent =
    syncedAt ? `Sidst: ${formatTime(syncedAt)}` : 'Aldrig synkroniseret';

  const list = document.getElementById('item-list');
  if (ingredients.length === 0) {
    list.innerHTML = `<div class="empty">Ingen liste endnu.<br>Tryk "Synkroniser" for at hente din ugeplan fra SmartPlate.</div>`;
    return;
  }

  list.innerHTML = ingredients.map((ing, i) => {
    const name = parseIngredient(ing);
    if (!name) return ''; // skip salt og peber etc.
    const isDone = checkedSet.has(i);
    const url = bilkaUrl(ing);
    return `
      <div class="item" data-index="${i}">
        <span class="item-check">${isDone ? '✓' : '○'}</span>
        <span class="item-name ${isDone ? 'done' : ''}">${name}</span>
        ${url ? `<a class="item-bilka" href="${url}" target="_blank" onclick="event.stopPropagation()">Bilka</a>` : ''}
      </div>`;
  }).join('');

  list.querySelectorAll('.item').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.index);
      if (checkedSet.has(i)) checkedSet.delete(i);
      else checkedSet.add(i);
      saveState();
      render();
    });
  });
}

// ── Gem og hent state ──────────────────────────────────────

function saveState() {
  chrome.storage.local.set({
    sp_checked: [...checkedSet]
  });
}

function loadState() {
  chrome.storage.local.get(['sp_ingredients', 'sp_synced_at', 'sp_checked'], data => {
    ingredients = data.sp_ingredients || [];
    syncedAt = data.sp_synced_at || null;
    checkedSet = new Set(data.sp_checked || []);
    render();
  });
}

// ── Knapper ────────────────────────────────────────────────

document.getElementById('btn-sync').addEventListener('click', async () => {
  const btn = document.getElementById('btn-sync');
  btn.querySelector('strong').textContent = 'Synkroniserer...';

  const response = await chrome.runtime.sendMessage({ type: 'SYNC_FROM_SMARTPLATE' });

  if (response.ok) {
    checkedSet.clear();
    saveState();
    loadState();
  } else {
    if (response.error === 'SmartPlate ikke åben') {
      chrome.tabs.create({ url: 'https://smartplate.dk' });
      window.close();
    } else {
      alert('Fejl: ' + response.error);
      btn.querySelector('strong').textContent = 'Synkroniser fra SmartPlate';
    }
  }
});

document.getElementById('btn-start-shopping').addEventListener('click', () => {
  // Find første vare der ikke er krydset af
  const nextIndex = ingredients.findIndex((ing, i) => !checkedSet.has(i) && parseIngredient(ing));
  const item = nextIndex >= 0 ? ingredients[nextIndex] : ingredients[0];
  if (!item) { alert('Ingen varer at handle.'); return; }

  const term = parseIngredient(item) || item;
  chrome.runtime.sendMessage({
    type: 'OPEN_BILKA_SEARCH',
    query: term
  });
  window.close();
});

document.getElementById('btn-reset').addEventListener('click', () => {
  checkedSet.clear();
  saveState();
  render();
});

// ── Init ───────────────────────────────────────────────────
loadState();
