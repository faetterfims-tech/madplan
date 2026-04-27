// Lytter efter besked fra popup om at synkronisere fra SmartPlate
chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  if (msg.type === 'SYNC_FROM_SMARTPLATE') {
    syncFromSmartPlate().then(respond);
    return true; // async respond
  }
  if (msg.type === 'OPEN_BILKA_SEARCH') {
    chrome.storage.local.set({ sp_pending_search: msg.query }, () => {
      chrome.tabs.query({ url: 'https://www.bilkatogo.dk/*' }, tabs => {
        const url = 'https://www.bilkatogo.dk/';
        if (tabs.length > 0) chrome.tabs.update(tabs[0].id, { url, active: true });
        else chrome.tabs.create({ url });
      });
    });
    respond({ ok: true });
    return true;
  }
});

async function syncFromSmartPlate() {
  const tabs = await chrome.tabs.query({ url: 'https://smartplate.dk/*' });
  if (tabs.length === 0) return { ok: false, error: 'SmartPlate ikke åben' };

  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: readSmartPlateData
    });
    const data = results[0].result;
    if (!data || !data.ingredients.length) return { ok: false, error: 'Ingen indkøbsliste' };

    const consolidated = consolidateIngredients(data.ingredients);
    await chrome.storage.local.set({
      sp_ingredients: consolidated,
      sp_synced_at: Date.now()
    });
    return { ok: true, count: consolidated.length };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// Slår dubletter sammen og summer mængder — fx "2 løg" + "2 løg" → "4 løg"
function consolidateIngredients(rawList) {
  const SKIP = new Set(['salt og peber','salt','peber','vand','tandstikkere til fastgørelse','tandstikkere']);
  const FRACS = { '½': 0.5, '¼': 0.25, '¾': 0.75 };
  const UNITS = 'kg|g|liter|l|dl|cl|ml|spsk|tsk|stk|fed|kviste?|bundt|dåser?|glas|pk\\.?|nip';

  function parseIng(str) {
    if (SKIP.has(str.toLowerCase().trim())) return null;
    const clean = str
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/\s+til\s+(servering|stegning|drys|panering|fastgørelse|garnering|dryp)\b.*/gi, '')
      .replace(/,.*$/, '')
      .trim();

    let m;
    m = clean.match(new RegExp(`^([\\d]+[,.]?[\\d]*)\\s*(${UNITS})\\s+(.+)$`, 'i'));
    if (m) return { amount: parseFloat(m[1].replace(',','.')), unit: m[2].toLowerCase(), name: m[3].trim() };

    m = clean.match(new RegExp(`^([½¼¾])\\s*(${UNITS})\\s+(.+)$`, 'i'));
    if (m) return { amount: FRACS[m[1]], unit: m[2].toLowerCase(), name: m[3].trim() };

    m = clean.match(/^([\d]+[,.]?[\d]*)\s+(.+)$/);
    if (m) return { amount: parseFloat(m[1].replace(',','.')), unit: '', name: m[2].trim() };

    m = clean.match(/^([½¼¾])\s+(.+)$/);
    if (m) return { amount: FRACS[m[1]], unit: '', name: m[2].trim() };

    return { amount: null, unit: null, name: clean };
  }

  function toBase(amount, unit) {
    const u = (unit || '').toLowerCase();
    if (u === 'kg') return { amount: amount * 1000, unit: 'g' };
    if (u === 'l' || u === 'liter') return { amount: amount * 1000, unit: 'ml' };
    if (u === 'dl') return { amount: amount * 100, unit: 'ml' };
    if (u === 'cl') return { amount: amount * 10, unit: 'ml' };
    return { amount, unit: u };
  }

  function fmt(amount, unit) {
    if (unit === 'g' && amount >= 1000) return `${+(amount / 1000).toFixed(2).replace(/\.?0+$/, '')} kg`;
    if (unit === 'ml' && amount >= 1000) return `${+(amount / 1000).toFixed(2).replace(/\.?0+$/, '')} l`;
    if (unit === 'ml' && amount >= 100) return `${+(amount / 100).toFixed(1).replace(/\.?0+$/, '')} dl`;
    const d = Number.isInteger(amount) ? amount : parseFloat(amount.toFixed(1));
    return unit ? `${d} ${unit}` : `${d}`;
  }

  const groups = new Map();
  rawList.forEach(ing => {
    const p = parseIng(ing);
    if (!p) return;
    const key = p.name.toLowerCase().trim();
    if (!groups.has(key)) groups.set(key, { name: p.name, amount: null, unit: null });
    const g = groups.get(key);
    if (p.amount === null) return;
    const base = toBase(p.amount, p.unit || '');
    if (g.amount === null) { g.amount = base.amount; g.unit = base.unit; }
    else if (g.unit === base.unit) g.amount += base.amount;
    // ukompatible enheder ignoreres (fx "1 dåse" + "200 ml")
  });

  return [...groups.values()].map(g =>
    g.amount !== null ? `${fmt(g.amount, g.unit)} ${g.name}` : g.name
  );
}

// Kører inde i SmartPlate-fanen — returnerer ALLE ingredienser inkl. dubletter
function readSmartPlateData() {
  try {
    const weekPlan = JSON.parse(localStorage.getItem('madplan_week') || '{}');
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const all = [];
    days.forEach(day => {
      const meal = weekPlan[day];
      if (!meal?.ingredients) return;
      meal.ingredients.forEach(ing => all.push(ing));
    });
    return { ingredients: all };
  } catch(e) {
    return { ingredients: [] };
  }
}
