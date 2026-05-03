// ── Prislookup — Bilka-priser april 2026 ─────────────────────
// Format: 'ingrediensnavn': [pris_kr, per_mængde, enhed]
// enhed: 'g', 'ml', 'stk', 'flat' (flat = fast pris per opskrift)
const PRICE_TABLE = {
  // Kød — Bilka-kalibrerede priser maj 2026
  'hakket oksekød':     [82, 500, 'g'],
  'hakket svinekød':    [52, 500, 'g'],
  'hakket kylling':     [42, 500, 'g'],
  'kyllingefilet':      [78, 600, 'g'],
  'kyllingebryst':      [78, 600, 'g'],
  'kyllingelår':        [68, 1000, 'g'],
  'hel kylling':        [98, 1400, 'g'],
  'frikadellekød':      [60, 500, 'g'],
  'bacon':              [42, 150, 'g'],
  'skinke':             [38, 200, 'g'],
  'pepperoni':          [45, 150, 'g'],
  'laksefilet':         [145, 400, 'g'],
  'laks':               [145, 400, 'g'],
  'røget laks':         [68, 200, 'g'],
  'torskefilet':        [100, 400, 'g'],
  'torsk':              [100, 400, 'g'],
  'rødspætte':          [88, 400, 'g'],
  'fiskefilet':         [88, 400, 'g'],
  'fiskefars':          [52, 400, 'g'],
  'rejer':              [62, 200, 'g'],
  'tun':                [22, 1, 'flat'],
  'makrel':             [22, 1, 'flat'],
  'svinebov':           [65, 1000, 'g'],
  'svinekam':           [82, 1000, 'g'],
  'stegt flæsk':        [65, 400, 'g'],
  'hamburgerryg':       [58, 400, 'g'],
  'oksesteg':           [160, 1000, 'g'],
  'okseinderlår':       [145, 800, 'g'],
  'oksebøf':            [112, 200, 'g'],
  'bøffer':             [112, 200, 'g'],
  'ribeye bøffer':      [165, 200, 'g'],
  'kalvekød':           [128, 500, 'g'],
  'lammekoteletter':    [82, 200, 'g'],
  'lammekød':           [168, 1000, 'g'],
  'andebryst':          [88, 400, 'g'],
  // Mejeri
  'mælk':               [15, 1000, 'ml'],
  'sødmælk':            [15, 1000, 'ml'],
  'fløde':              [35, 500, 'ml'],
  'piskefløde':         [35, 500, 'ml'],
  'creme fraiche':      [22, 200, 'g'],
  'smør':               [42, 250, 'g'],
  'revet parmesan':     [28, 50, 'g'],
  'parmesan':           [28, 50, 'g'],
  'mozzarella':         [38, 125, 'g'],
  'revet mozzarella':   [42, 150, 'g'],
  'mascarpone':         [48, 250, 'g'],
  'ricotta':            [42, 250, 'g'],
  'feta':               [42, 200, 'g'],
  'cheddar':            [55, 400, 'g'],
  'revet cheddar':      [42, 200, 'g'],
  'yoghurt naturel':    [24, 500, 'g'],
  'græsk yoghurt':      [28, 500, 'g'],
  'æg':                 [5, 1, 'stk'],
  // Pasta, ris, mel
  'spaghetti':          [22, 500, 'g'],
  'pasta':              [22, 500, 'g'],
  'rigatoni':           [22, 500, 'g'],
  'penne':              [22, 500, 'g'],
  'farfalle':           [25, 500, 'g'],
  'tagliatelle':        [25, 500, 'g'],
  'lasagneplader':      [28, 250, 'g'],
  'suppenudler':        [20, 400, 'g'],
  'ris':                [28, 1000, 'g'],
  'risottoris':         [42, 500, 'g'],
  'quinoa':             [45, 400, 'g'],
  'linser':             [22, 500, 'g'],
  'røde linser':        [22, 500, 'g'],
  'mel':                [4, 1, 'flat'],
  'hvedemel':           [4, 1, 'flat'],
  'gær':                [6, 1, 'flat'],
  // Dåsevarer
  'flåede tomater':     [18, 400, 'g'],
  'hakkede tomater':    [16, 400, 'g'],
  'kokosmælk':          [22, 400, 'ml'],
  'kikærter':           [16, 400, 'g'],
  'kidneybønner':       [16, 400, 'g'],
  'hvide bønner':       [16, 400, 'g'],
  'majs':               [16, 340, 'g'],
  'tomatpuré':          [12, 1, 'flat'],
  // Grøntsager
  'løg':                [5, 1, 'stk'],
  'rødløg':             [7, 1, 'stk'],
  'hvidløg':            [8, 1, 'stk'],
  'gulerødder':         [18, 1000, 'g'],
  'kartofler':          [22, 1000, 'g'],
  'søde kartofler':     [14, 1, 'stk'],
  'tomater':            [32, 500, 'g'],
  'cherrytomater':      [38, 500, 'g'],
  'peberfrugt':         [16, 1, 'stk'],
  'squash':             [22, 1, 'stk'],
  'aubergine':          [22, 1, 'stk'],
  'broccoli':           [28, 1, 'stk'],
  'blomkål':            [32, 1, 'stk'],
  'champignoner':       [40, 500, 'g'],
  'blandede svampe':    [40, 500, 'g'],
  'tørrede svampe':     [42, 25, 'g'],
  'spinat':             [30, 200, 'g'],
  'grønkål':            [28, 1, 'flat'],
  'spidskål':           [22, 1, 'flat'],
  'rødkål':             [28, 1000, 'g'],
  'salat':              [22, 1, 'stk'],
  'porre':              [10, 1, 'stk'],
  'selleri':            [26, 1, 'stk'],
  'bladselleri':        [26, 1, 'stk'],
  'asparges':           [45, 500, 'g'],
  'avocado':            [18, 1, 'stk'],
  'citron':             [8, 1, 'stk'],
  'lime':               [8, 1, 'stk'],
  'appelsin':           [6, 1, 'stk'],
  'agurk':              [18, 1, 'stk'],
  'ingefær':            [12, 1, 'flat'],
  'persillerod':        [12, 1, 'stk'],
  'forårsløg':          [12, 1, 'flat'],
  // Pantry — krydderier og diverse (flad pris per brug)
  'olie':               [4, 1, 'flat'],
  'olivenolie':         [6, 1, 'flat'],
  'rapsolie':           [3, 1, 'flat'],
  'sesamolie':          [5, 1, 'flat'],
  'sojasauce':          [5, 1, 'flat'],
  'hvidvin':            [10, 100, 'ml'],
  'rødvin':             [12, 100, 'ml'],
  'eddike':             [4, 1, 'flat'],
  'sukker':             [3, 1, 'flat'],
  'honning':            [6, 1, 'flat'],
  'sennep':             [5, 1, 'flat'],
  'mayonnaise':         [6, 1, 'flat'],
  'ketchup':            [4, 1, 'flat'],
  'remoulade':          [10, 1, 'flat'],
  'salsa':              [15, 1, 'flat'],
  'pesto':              [28, 1, 'flat'],
  'tahini':             [10, 1, 'flat'],
  'bearnaisesauce':     [35, 1, 'flat'],
  'hollandaisesauce':   [35, 1, 'flat'],
  'vaniljesovs':        [22, 1, 'flat'],
  'bbq-sauce':          [22, 1, 'flat'],
  'bouillon':           [4, 1, 'flat'],
  'ladyfingere':        [35, 200, 'g'],
  'rugbrød':            [30, 1, 'flat'],
  'toastbrød':          [22, 1, 'flat'],
  'tortillaer':         [25, 1, 'flat'],
  'tacosskaller':       [20, 1, 'flat'],
  'tortillachips':      [22, 200, 'g'],
  'burgerboller':       [25, 1, 'flat'],
  'pitabrød':           [20, 1, 'flat'],
  'flute':              [15, 1, 'flat'],
  'gnocchi':            [35, 500, 'g'],
  'pizzadej':           [25, 1, 'flat'],
  'butterdej':          [35, 1, 'flat'],
  'pinjekerner':        [35, 50, 'g'],
  'espresso':           [10, 1, 'flat'],
  'kakaopulver':        [5, 1, 'flat'],
  // Tilføjet for nye opskrifter — kalibrerede maj 2026
  'havregryn':          [5, 1, 'flat'],
  'rasp':               [4, 1, 'flat'],
  'maizena':            [4, 1, 'flat'],
  'worcestershire sauce': [5, 1, 'flat'],
  'balsamicoeddike':    [6, 1, 'flat'],
  'soltørrede tomater': [30, 100, 'g'],
  'syltede agurker':    [22, 1, 'flat'],
  'syltede rødbeder':   [20, 1, 'flat'],
  'brun farin':         [4, 1, 'flat'],
  'røget paprika':      [5, 1, 'flat'],
  'mango':              [22, 1, 'stk'],
  'spidskommen':        [4, 1, 'flat'],
  'kardemomme':         [5, 1, 'flat'],
  'nelliker':           [4, 1, 'flat'],
  'koriander':          [5, 1, 'flat'],
  'laurbær':            [3, 1, 'flat'],
  'oregano':            [4, 1, 'flat'],
  'timian':             [4, 1, 'flat'],
  'rosmarin':           [5, 1, 'flat'],
  'persille':           [8, 1, 'flat'],
  'dild':               [8, 1, 'flat'],
  'basilikum':          [10, 1, 'flat'],
  'purløg':             [8, 1, 'flat'],
  'flæsk':              [65, 400, 'g'],
  'nakkefilet':         [85, 1000, 'g'],
  'nakkekoteletter':    [82, 1000, 'g'],
  'svinemørbrad':       [92, 500, 'g'],
  'medisterpølse':      [52, 500, 'g'],
  'chorizo':            [50, 150, 'g'],
  'rød karrypasta':     [5, 1, 'flat'],
  'dijonsennep':        [5, 1, 'flat'],
  'pastinak':           [10, 1, 'stk'],
  'pastinakker':        [10, 1, 'stk'],
  'fennikel':           [26, 1, 'stk'],
  'babykartofler':      [28, 1000, 'g'],
  'frosne ærter':       [22, 400, 'g'],
  'kapers':             [18, 1, 'flat'],
  'gule ærter':         [18, 500, 'g'],
  'flækkede gule ærter': [18, 500, 'g'],
  'hvidløgspulver':     [4, 1, 'flat'],
  'løgpulver':          [4, 1, 'flat'],
  'cayennepeber':       [4, 1, 'flat'],
  'gurkemeje':          [4, 1, 'flat'],
  'garam masala':       [5, 1, 'flat'],
  'allehånde':          [4, 1, 'flat'],
  'fladbrød':           [20, 1, 'flat'],
  'basmatiris':         [28, 1000, 'g'],
  'teriyakisauce':      [25, 1, 'flat'],
  'fishsauce':          [10, 1, 'flat'],
  'edamamebønner':      [32, 200, 'g'],
  'rugmel':             [5, 1, 'flat'],
  'hampefrø':           [22, 1, 'flat'],
  'valnødder':          [38, 100, 'g'],
  'fennikelfrø':        [4, 1, 'flat'],
  'mørk chokolade':     [18, 100, 'g'],
  'entrecote':          [125, 300, 'g'],
  'kalkunschnitzel':    [78, 500, 'g'],
  'kalkun':             [75, 500, 'g'],
  'riseddike':          [5, 1, 'flat'],
  'sesamfrø':           [5, 1, 'flat'],
  'vaniljepulver':      [4, 1, 'flat'],
  'græskarkerner':      [18, 100, 'g'],
  'wienerpølser':       [32, 6, 'stk'],
  'rucola':             [25, 100, 'g'],
  'pickles':            [18, 1, 'flat'],
  'æblecidereddike':    [6, 1, 'flat'],
  'peanutbutter':       [32, 350, 'g'],
  'kokosolie':          [6, 1, 'flat'],
  'citrongræs':         [10, 1, 'flat'],
  'blåmuslinger':       [55, 500, 'g'],
  'muslinger':          [55, 500, 'g'],
  'oksetykkam':         [120, 1000, 'g'],
  'svesker':            [25, 200, 'g'],
  'oliven':             [22, 185, 'g'],
  'sardiner':           [22, 1, 'flat'],
  'ansjoser':           [25, 1, 'flat'],
  'nudler':             [20, 250, 'g'],
  'æbler':              [6, 1, 'stk'],
  'æble':               [6, 1, 'stk'],
  'ærter':              [22, 400, 'g'],
  'grønne ærter':       [22, 400, 'g'],
  'mandler':            [35, 100, 'g'],
  'saltede mandler':    [35, 100, 'g'],
  'saltede peanuts':    [25, 100, 'g'],
  // c006-c010
  'karry':              [5, 1, 'flat'],
  'kanel':              [4, 1, 'flat'],
  'rød chili':          [6, 1, 'stk'],
  'chili':              [6, 1, 'stk'],
  'rødbeder':           [22, 500, 'g'],
  'rødkål':             [28, 1, 'flat'],
  'saltmandler':        [35, 100, 'g'],
  // c011-c020
  'grahamsmel':         [5, 1, 'flat'],
  'knoldselleri':       [35, 1, 'stk'],
  'chilipulver':        [4, 1, 'flat'],
  'majskerner':         [16, 340, 'g'],
  'grøntsagsbouillon':  [4, 1, 'flat'],
  'hønsebouillon':      [4, 1, 'flat'],
  'oksebouillon':       [4, 1, 'flat'],
  'muskat':             [4, 1, 'flat'],
  'muskatnød':          [4, 1, 'flat'],
  'paprika':            [4, 1, 'flat'],
  'sød paprika':        [4, 1, 'flat'],
  'stødt paprika':      [4, 1, 'flat'],
  'rugbrødsskiver':     [30, 1, 'flat'],
  'rødspættefileter':   [88, 400, 'g'],
  'tortilla':           [25, 1, 'flat'],
  'mangosalsa':         [15, 1, 'flat'],
  'majsstivelse':       [4, 1, 'flat'],
  'kokosfløde':         [22, 400, 'ml'],
  'kokosmælk':          [22, 400, 'ml'],
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
