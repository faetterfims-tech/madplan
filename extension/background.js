// ── Prislookup — Bilka-priser april 2026 ─────────────────────
// Format: 'ingrediensnavn': [pris_kr, per_mængde, enhed]
// enhed: 'g', 'ml', 'stk', 'flat' (flat = fast pris per opskrift)
const PRICE_TABLE = {
  // Kød
  'hakket oksekød':     [55, 500, 'g'],
  'hakket svinekød':    [33, 500, 'g'],
  'hakket kylling':     [28, 500, 'g'],
  'kyllingefilet':      [62, 600, 'g'],
  'kyllingebryst':      [62, 600, 'g'],
  'kyllingelår':        [52, 1000, 'g'],
  'hel kylling':        [75, 1400, 'g'],
  'frikadellekød':      [45, 500, 'g'],
  'bacon':              [28, 150, 'g'],
  'skinke':             [25, 200, 'g'],
  'pepperoni':          [32, 150, 'g'],
  'laksefilet':         [80, 400, 'g'],
  'laks':               [80, 400, 'g'],
  'røget laks':         [50, 200, 'g'],
  'torskefilet':        [70, 400, 'g'],
  'torsk':              [70, 400, 'g'],
  'rødspætte':          [65, 400, 'g'],
  'fiskefilet':         [65, 400, 'g'],
  'fiskefars':          [35, 400, 'g'],
  'rejer':              [42, 200, 'g'],
  'tun':                [16, 1, 'flat'],
  'makrel':             [18, 1, 'flat'],
  'svinebov':           [45, 1000, 'g'],
  'svinekam':           [55, 1000, 'g'],
  'stegt flæsk':        [50, 400, 'g'],
  'hamburgerryg':       [45, 400, 'g'],
  'oksesteg':           [110, 1000, 'g'],
  'okseinderlår':       [95, 800, 'g'],
  'oksebøf':            [70, 200, 'g'],
  'bøffer':             [70, 200, 'g'],
  'ribeye bøffer':      [120, 200, 'g'],
  'kalvekød':           [95, 500, 'g'],
  'lammekoteletter':    [60, 200, 'g'],
  'lammekød':           [130, 1000, 'g'],
  'andebryst':          [70, 400, 'g'],
  // Mejeri
  'mælk':               [13, 1000, 'ml'],
  'sødmælk':            [13, 1000, 'ml'],
  'fløde':              [24, 500, 'ml'],
  'creme fraiche':      [14, 200, 'g'],
  'smør':               [26, 250, 'g'],
  'revet parmesan':     [17, 50, 'g'],
  'parmesan':           [17, 50, 'g'],
  'mozzarella':         [26, 125, 'g'],
  'revet mozzarella':   [28, 150, 'g'],
  'mascarpone':         [35, 250, 'g'],
  'ricotta':            [28, 250, 'g'],
  'feta':               [30, 200, 'g'],
  'cheddar':            [38, 400, 'g'],
  'revet cheddar':      [28, 200, 'g'],
  'yoghurt naturel':    [18, 500, 'g'],
  'æg':                 [4, 1, 'stk'],
  // Pasta, ris, mel
  'spaghetti':          [16, 500, 'g'],
  'pasta':              [16, 500, 'g'],
  'rigatoni':           [16, 500, 'g'],
  'penne':              [16, 500, 'g'],
  'farfalle':           [18, 500, 'g'],
  'tagliatelle':        [18, 500, 'g'],
  'lasagneplader':      [20, 250, 'g'],
  'suppenudler':        [15, 400, 'g'],
  'ris':                [24, 1000, 'g'],
  'risottoris':         [32, 500, 'g'],
  'quinoa':             [35, 400, 'g'],
  'linser':             [18, 500, 'g'],
  'røde linser':        [18, 500, 'g'],
  'mel':                [3, 1, 'flat'],
  'hvedemel':           [3, 1, 'flat'],
  'gær':                [5, 1, 'flat'],
  // Dåsevarer
  'flåede tomater':     [14, 400, 'g'],
  'hakkede tomater':    [12, 400, 'g'],
  'kokosmælk':          [16, 400, 'ml'],
  'kikærter':           [12, 400, 'g'],
  'kidneybønner':       [12, 400, 'g'],
  'hvide bønner':       [12, 400, 'g'],
  'majs':               [12, 340, 'g'],
  'tomatpuré':          [10, 1, 'flat'],
  // Grøntsager
  'løg':                [4, 1, 'stk'],
  'rødløg':             [6, 1, 'stk'],
  'hvidløg':            [6, 1, 'stk'],
  'gulerødder':         [14, 1000, 'g'],
  'kartofler':          [16, 1000, 'g'],
  'søde kartofler':     [10, 1, 'stk'],
  'tomater':            [24, 500, 'g'],
  'cherrytomater':      [28, 500, 'g'],
  'peberfrugt':         [12, 1, 'stk'],
  'squash':             [18, 1, 'stk'],
  'aubergine':          [18, 1, 'stk'],
  'broccoli':           [22, 1, 'stk'],
  'blomkål':            [24, 1, 'stk'],
  'champignoner':       [28, 500, 'g'],
  'blandede svampe':    [28, 500, 'g'],
  'tørrede svampe':     [35, 25, 'g'],
  'spinat':             [22, 200, 'g'],
  'grønkål':            [22, 1, 'flat'],
  'spidskål':           [18, 1, 'flat'],
  'rødkål':             [22, 1000, 'g'],
  'salat':              [16, 1, 'stk'],
  'porre':              [8, 1, 'stk'],
  'selleri':            [20, 1, 'stk'],
  'asparges':           [35, 500, 'g'],
  'avocado':            [14, 1, 'stk'],
  'citron':             [6, 1, 'stk'],
  'lime':               [6, 1, 'stk'],
  'appelsin':           [5, 1, 'stk'],
  'agurk':              [16, 1, 'stk'],
  'ingefær':            [10, 1, 'flat'],
  'persillerod':        [10, 1, 'stk'],
  'forårsløg':          [10, 1, 'flat'],
  // Pantry — krydderier og diverse (flad pris per brug)
  'olie':               [3, 1, 'flat'],
  'olivenolie':         [5, 1, 'flat'],
  'rapsolie':           [2, 1, 'flat'],
  'sesamolie':          [4, 1, 'flat'],
  'sojasauce':          [4, 1, 'flat'],
  'hvidvin':            [8, 100, 'ml'],
  'rødvin':             [10, 100, 'ml'],
  'eddike':             [3, 1, 'flat'],
  'sukker':             [2, 1, 'flat'],
  'honning':            [5, 1, 'flat'],
  'sennep':             [4, 1, 'flat'],
  'mayonnaise':         [5, 1, 'flat'],
  'ketchup':            [3, 1, 'flat'],
  'remoulade':          [8, 1, 'flat'],
  'salsa':              [12, 1, 'flat'],
  'pesto':              [22, 1, 'flat'],
  'tahini':             [8, 1, 'flat'],
  'bearnaisesauce':     [28, 1, 'flat'],
  'hollandaisesauce':   [28, 1, 'flat'],
  'vaniljesovs':        [20, 1, 'flat'],
  'bbq-sauce':          [20, 1, 'flat'],
  'bouillon':           [3, 1, 'flat'],
  'ladyfingere':        [28, 200, 'g'],
  'rugbrød':            [24, 1, 'flat'],
  'toastbrød':          [18, 1, 'flat'],
  'tortillaer':         [20, 1, 'flat'],
  'tacosskaller':       [15, 1, 'flat'],
  'tortillachips':      [18, 200, 'g'],
  'burgerboller':       [20, 1, 'flat'],
  'pitabrød':           [15, 1, 'flat'],
  'flute':              [12, 1, 'flat'],
  'gnocchi':            [28, 500, 'g'],
  'pizzadej':           [20, 1, 'flat'],
  'butterdej':          [30, 1, 'flat'],
  'pinjekerner':        [28, 50, 'g'],
  'espresso':           [8, 1, 'flat'],
  'kakaopulver':        [4, 1, 'flat'],
  // Tilføjet for nye opskrifter
  'havregryn':          [4, 1, 'flat'],
  'rasp':               [3, 1, 'flat'],
  'maizena':            [3, 1, 'flat'],
  'worcestershire sauce': [4, 1, 'flat'],
  'balsamicoeddike':    [5, 1, 'flat'],
  'soltørrede tomater': [18, 100, 'g'],
  'syltede agurker':    [16, 1, 'flat'],
  'syltede rødbeder':   [14, 1, 'flat'],
  'brun farin':         [3, 1, 'flat'],
  'røget paprika':      [4, 1, 'flat'],
  'mango':              [18, 1, 'stk'],
  'spidskommen':        [3, 1, 'flat'],
  'kardemomme':         [4, 1, 'flat'],
  'nelliker':           [3, 1, 'flat'],
  'koriander':          [4, 1, 'flat'],
  'laurbær':            [2, 1, 'flat'],
  'oregano':            [3, 1, 'flat'],
  'timian':             [3, 1, 'flat'],
  'flæsk':              [50, 400, 'g'],
  'nakkefilet':         [55, 1000, 'g'],
  'nakkekoteletter':    [55, 1000, 'g'],
  'svinemørbrad':       [70, 500, 'g'],
  'medisterpølse':      [40, 500, 'g'],
  'chorizo':            [35, 150, 'g'],
  'rød karrypasta':     [4, 1, 'flat'],
  'dijonsennep':        [4, 1, 'flat'],
  'pastinak':           [8, 1, 'stk'],
  'pastinakker':        [8, 1, 'stk'],
  'fennikel':           [22, 1, 'stk'],
  'babykartofler':      [20, 1000, 'g'],
  'frosne ærter':       [18, 400, 'g'],
  'kapers':             [15, 1, 'flat'],
  'gule ærter':         [15, 500, 'g'],
  'flækkede gule ærter': [15, 500, 'g'],
  'hvidløgspulver':     [3, 1, 'flat'],
  'løgpulver':          [3, 1, 'flat'],
  'cayennepeber':       [3, 1, 'flat'],
  'gurkemeje':          [3, 1, 'flat'],
  'garam masala':       [4, 1, 'flat'],
  'allehånde':          [3, 1, 'flat'],
  'fladbrød':           [15, 1, 'flat'],
  'basmatiris':         [20, 1000, 'g'],
  'teriyakisauce':      [20, 1, 'flat'],
  'fishsauce':          [8, 1, 'flat'],
  'edamamebønner':      [25, 200, 'g'],
  'rugmel':             [5, 1, 'flat'],
  'hampefrø':           [20, 1, 'flat'],
  'valnødder':          [30, 100, 'g'],
  'fennikelfrø':        [3, 1, 'flat'],
  'mørk chokolade':     [15, 100, 'g'],
  'entrecote':          [100, 300, 'g'],
  'kalkunschnitzel':    [65, 500, 'g'],
  'kalkun':             [70, 500, 'g'],
  'riseddike':          [4, 1, 'flat'],
  'sesamfrø':           [4, 1, 'flat'],
  'vaniljepulver':      [3, 1, 'flat'],
  'græskarkerner':      [15, 100, 'g'],
  'wienerpølser':       [25, 6, 'stk'],
  'rucola':             [20, 100, 'g'],
  'pickles':            [15, 1, 'flat'],
  'syltede agurker':    [16, 1, 'flat'],
  'æblecidereddike':    [5, 1, 'flat'],
  'peanutbutter':       [25, 350, 'g'],
  'kokosolie':          [5, 1, 'flat'],
  'citrongræs':         [8, 1, 'flat'],
  'blåmuslinger':       [45, 500, 'g'],
  'muslinger':          [45, 500, 'g'],
  'svinekam':           [55, 1000, 'g'],
  'oksetykkam':         [90, 1000, 'g'],
  'svesker':            [20, 200, 'g'],
  'oliven':             [18, 185, 'g'],
  'sardiner':           [18, 1, 'flat'],
  'ansjoser':           [20, 1, 'flat'],
  'hvide bønner':       [12, 400, 'g'],
  'nudler':             [16, 250, 'g'],
  'æbler':              [5, 1, 'stk'],
  'æble':               [5, 1, 'stk'],
  'ærter':              [18, 400, 'g'],
  'grønne ærter':       [18, 400, 'g'],
  'rosmarin':           [3, 1, 'flat'],
  'persille':           [6, 1, 'flat'],
  'dild':               [5, 1, 'flat'],
  'basilikum':          [8, 1, 'flat'],
  'purløg':             [6, 1, 'flat'],
};

// Beregn pris for én konsolideret ingrediens-streng
function estimatePrice(ingString) {
  const FRACS = { '½': 0.5, '¼': 0.25, '¾': 0.75 };
  const UNITS = 'kg|g|liter|l|dl|cl|ml|spsk|tsk|stk|fed|kviste?|bundt|dåser?|glas|pk\\.?|nip|skiver?';

  const clean = ingString.replace(/\s*\([^)]*\)/g, '').trim();
  let amount = 1, unit = 'stk', name = clean;

  let m;
  m = clean.match(new RegExp(`^([\\d]+[,.]?[\\d]*)\\s*(${UNITS})\\s+(.+)$`, 'i'));
  if (m) { amount = parseFloat(m[1].replace(',', '.')); unit = m[2].toLowerCase(); name = m[3].trim(); }
  else {
    m = clean.match(new RegExp(`^([½¼¾])\\s*(${UNITS})\\s+(.+)$`, 'i'));
    if (m) { amount = FRACS[m[1]]; unit = m[2].toLowerCase(); name = m[3].trim(); }
    else {
      m = clean.match(/^([\d]+[,.]?[\d]*)\s+(.+)$/);
      if (m) { amount = parseFloat(m[1].replace(',', '.')); unit = 'stk'; name = m[2].trim(); }
    }
  }

  const nameLower = name.toLowerCase().trim();

  // Præcist match
  let entry = PRICE_TABLE[nameLower];

  // Delvist match — find den længste nøgle der optræder i ingrediensnavnet
  if (!entry) {
    let bestKey = '';
    for (const key of Object.keys(PRICE_TABLE)) {
      if (nameLower.includes(key) && key.length > bestKey.length) bestKey = key;
    }
    if (bestKey) entry = PRICE_TABLE[bestKey];
  }

  if (!entry) return null;

  const [priceKr, perAmount, perUnit] = entry;
  if (perUnit === 'flat') return priceKr;

  // Konverter mængde til base-enhed
  let baseAmount = amount;
  if (perUnit === 'g') {
    if (unit === 'kg') baseAmount = amount * 1000;
    else if (unit !== 'g') return priceKr; // uklar enhed → brug flat
  } else if (perUnit === 'ml') {
    if (unit === 'l' || unit === 'liter') baseAmount = amount * 1000;
    else if (unit === 'dl') baseAmount = amount * 100;
    else if (unit === 'cl') baseAmount = amount * 10;
    else if (unit !== 'ml') return priceKr;
  }
  // stk: brug amount direkte

  return Math.round((baseAmount / perAmount) * priceKr);
}

// ── Lytter efter besked fra popup ────────────────────────────

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  if (msg.type === 'SYNC_FROM_SMARTPLATE') {
    syncFromSmartPlate().then(respond);
    return true;
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
    const prices = consolidated.map(ing => estimatePrice(ing)); // pris per vare
    const totalPrice = prices.reduce((sum, p) => sum + (p || 0), 0);

    await chrome.storage.local.set({
      sp_ingredients:       consolidated,
      sp_ingredient_prices: prices,
      sp_total_price:       totalPrice,
      sp_week_cost:         data.weekCost || 0,
      sp_synced_at:         Date.now()
    });
    return { ok: true, count: consolidated.length };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── Konsolidér dublet-ingredienser ───────────────────────────

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
  });

  return [...groups.values()].map(g =>
    g.amount !== null ? `${fmt(g.amount, g.unit)} ${g.name}` : g.name
  );
}

// ── Læs data fra SmartPlate-fanen ────────────────────────────

function readSmartPlateData() {
  try {
    const weekPlan = JSON.parse(localStorage.getItem('madplan_week') || '{}');
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const all = [];
    let weekCost = 0;
    days.forEach(day => {
      const meal = weekPlan[day];
      if (!meal?.ingredients) return;
      meal.ingredients.forEach(ing => all.push(ing));
      if (meal.cost) weekCost += meal.cost;
    });
    return { ingredients: all, weekCost };
  } catch(e) {
    return { ingredients: [], weekCost: 0 };
  }
}
