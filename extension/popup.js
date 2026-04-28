// ── Hjælpefunktioner ──────────────────────────────────────

const SKIP = new Set(['salt og peber','salt','peber','vand','tandstikkere til fastgørelse','tandstikkere']);

function parseIngredient(str) {
  const lower = str.toLowerCase().trim();
  if (SKIP.has(lower)) return null;

  return str
    .replace(/^[\d]+-[\d]+\s+/, '')  // "2-3 " → fjern talinterval
    .replace(/^[\d]+[,\.]?[\d]*\s*(g|kg|dl|cl|ml|l|tsk|spsk|stk|fed|kviste?|potter?|bundt|dåser?|glas|pk\.?|nip|liter|skiver?)\s+/gi, '')
    .replace(/^[½¼¾]\s+/, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+til\s+(servering|stegning|drys|panering|fastgørelse|garnering|dryp|støvning|friture)\b.*/gi, '')
    .replace(/\s+eller\s+.*$/gi, '')  // "X eller Y" → behold kun X
    .replace(/,\s+i\s+\w+/gi, '')
    .trim() || null;
}

// Konverterer ingrediensnavn til et søgeord Bilka faktisk forstår
function bilkaNormalize(name) {
  if (!name) return name;
  let n = name.toLowerCase().trim();
  n = n.replace(/\s+eller\s+.*$/, '');
  n = n.replace(/\s+fra\s+dagen\s+før$/, '');
  n = n.replace(/^skallen?\s+fra\s+(?:en?\s+|\d+\s+)?/, '');
  n = n.replace(/^skal\s+af\s+\d+\s+/, '');
  n = n.replace(/^saften?\s+(?:af|fra)\s+(?:en?\s+|\d+\s+)?/, '');
  n = n.replace(/^(citron|appelsin|lime|grapefrugt)(saft|skal|zest|er)$/, '$1');
  n = n.replace(/^citroner$/, 'citron').replace(/^appelsiner$/, 'appelsin');
  n = n.replace(/^(?:frisk[et]?|tørret|tørrede?|smeltet|smeltede?|revet|revne?|varm[et]?|stærk[et]?|finthakket|finthakkede?|knust[e]?|skåret|strimlede?|kogt[e]?|rigeligt\s+friskkværnet\s+sort|friskkværnet\s+sort)\s+/, '');
  const map = {
    'zucchini': 'squash',         'courgette': 'squash',
    'paprikakrydderi': 'paprika', 'majs': 'majskerner',
    'pinjekerne': 'pinjekerner',
    'pecorino': 'parmesan',       'pecorino romano': 'parmesan',
    'ricottaost': 'ricotta',      'ingefærrod': 'ingefær',
    'chilipulver': 'chili',       'chiliflager': 'chili',
    'muskatnød': 'muskat',        'flormelis': 'flormelis',
    'floresukker': 'flormelis',   'bladselleri': 'selleri',
    'stængler bladselleri': 'selleri',
    'hakkede tomater': 'flåede tomater',
    'tørgær': 'gær',              'laurbærblade': 'laurbær',
    'laurbærblad': 'laurbær',
    'oksebouillon': 'bouillon',   'kyllingebouillon': 'bouillon',
    'svinebouillon': 'bouillon',  'grøntsagsbouillon': 'bouillon',
    'suppevisk': 'suppenudler',   'ditalini': 'suppenudler',
    'guanciale': 'bacon',         'pancetta': 'bacon',
    'porcinisvampe': 'tørrede svampe', 'porcini': 'tørrede svampe',
    'arborio': 'risottoris',      'arborioris': 'risottoris',
    'carnaroliris': 'risottoris',
    'ladyfingers': 'ladyfingere', 'savoiardi': 'ladyfingere',
    'kalvescalopper': 'kalvekød', 'kalveskank': 'kalvekød',
    'kalvekød (schnitzler/scalopper)': 'kalvekød',
    'espresso': 'espresso kaffe', 'persillerødder': 'persillerod',
    'flagesalt': 'salt',
    'peber': null,
  };
  if (n in map) { if (map[n] === null) return null; n = map[n]; }
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function bilkaUrl(ingredient) {
  const term = bilkaNormalize(parseIngredient(ingredient));
  if (!term) return null;
  return `https://www.bilkatogo.dk/search/?query=${encodeURIComponent(term)}`;
}

function formatTime(ts) {
  if (!ts) return 'Aldrig';
  return new Date(ts).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
}

// ── State ──────────────────────────────────────────────────

let ingredients = [];
let prices = [];
let totalPrice = 0;
let weekCost = 0;
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

  document.getElementById('sync-time').textContent =
    syncedAt ? `Sidst: ${formatTime(syncedAt)}` : 'Aldrig synkroniseret';

  // Budget-sektion
  renderBudget();

  const list = document.getElementById('item-list');
  if (ingredients.length === 0) {
    list.innerHTML = `<div class="empty">Ingen liste endnu.<br>Tryk "Synkroniser" for at hente din ugeplan fra SmartPlate.</div>`;
    return;
  }

  list.innerHTML = ingredients.map((ing, i) => {
    if (!parseIngredient(ing)) return '';
    const isDone = checkedSet.has(i);
    const url = bilkaUrl(ing);
    const price = prices[i];
    const priceTag = (price != null && price > 0)
      ? `<span class="item-price">~${price} kr</span>`
      : '';
    return `
      <div class="item" data-index="${i}">
        <span class="item-check">${isDone ? '✓' : '○'}</span>
        <span class="item-name ${isDone ? 'done' : ''}">${ing}</span>
        ${priceTag}
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

function renderBudget() {
  const section = document.getElementById('budget-section');
  if (totalPrice === 0 && weekCost === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  const estimated = totalPrice;
  const plan = weekCost;

  // Brug enten madplanens kostpris eller estimeret som reference
  const reference = plan > 0 ? plan : estimated;
  const pct = reference > 0 ? Math.min(100, Math.round((estimated / reference) * 100)) : 0;
  const barColor = pct > 110 ? '#e24b4a' : pct > 90 ? '#f0a500' : '#2d7a2d';

  let budgetText = '';
  if (estimated > 0) budgetText += `Estimeret indkøb: <strong>~${estimated} kr</strong>`;
  if (plan > 0) budgetText += `&ensp;·&ensp;Madplan: <strong>${plan} kr</strong>`;

  section.innerHTML = `
    <div class="section-title">Budget</div>
    <div class="budget-text">${budgetText}</div>
    ${reference > 0 ? `
    <div class="budget-bar-wrap">
      <div class="budget-bar" style="width:${pct}%;background:${barColor}"></div>
    </div>
    <div class="budget-hint">${pct}% af madplanens budget</div>` : ''}
  `;
}

// ── Gem og hent state ──────────────────────────────────────

function saveState() {
  chrome.storage.local.set({
    sp_checked: [...checkedSet]
  });
}

function loadState() {
  chrome.storage.local.get(
    ['sp_ingredients', 'sp_ingredient_prices', 'sp_total_price', 'sp_week_cost', 'sp_synced_at', 'sp_checked'],
    data => {
      ingredients = data.sp_ingredients || [];
      prices      = data.sp_ingredient_prices || [];
      totalPrice  = data.sp_total_price || 0;
      weekCost    = data.sp_week_cost || 0;
      syncedAt    = data.sp_synced_at || null;
      checkedSet  = new Set(data.sp_checked || []);
      render();
    }
  );
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
  const nextIndex = ingredients.findIndex((ing, i) => !checkedSet.has(i) && parseIngredient(ing));
  const item = nextIndex >= 0 ? ingredients[nextIndex] : ingredients[0];
  if (!item) { alert('Ingen varer at handle.'); return; }

  const term = bilkaNormalize(parseIngredient(item) || item);
  chrome.storage.local.set({ sp_pending_search: term }, () => {
    chrome.tabs.query({ url: 'https://www.bilkatogo.dk/*' }, tabs => {
      const url = 'https://www.bilkatogo.dk/';
      if (tabs.length > 0) chrome.tabs.update(tabs[0].id, { url, active: true });
      else chrome.tabs.create({ url });
    });
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
