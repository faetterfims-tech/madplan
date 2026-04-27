// SmartPlate — Bilka ToGo content script

const SKIP = new Set(['salt og peber','salt','peber','vand','tandstikkere til fastgørelse','tandstikkere']);

function parseIngredient(str) {
  if (SKIP.has(str.toLowerCase().trim())) return null;
  return str
    .replace(/^[\d]+[,\.]?[\d]*\s*(g|kg|dl|cl|ml|l|tsk|spsk|stk|fed|kviste?|bundt|dåser?|glas|pk\.?|nip|liter)\s+/gi, '')
    .replace(/^[½¼¾]\s+/, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+til\s+(servering|stegning|drys|panering|fastgørelse|garnering|dryp)\b.*/gi, '')
    .replace(/,\s+i\s+\w+/gi, '')
    .trim() || null;
}

// ── Auto-søgning ────────────────────────────────────────────
// Sætter søgeterm i Bilka ToGos søgefelt og trigger søgning automatisk.
// Bilka ToGo er React — vi skal bruge native input setter + React-events.

function triggerReactInput(input, value) {
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  nativeSetter.call(input, value);
  input.dispatchEvent(new Event('input',  { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

function triggerSearch(input) {
  // Prøv Enter-tast
  ['keydown','keypress','keyup'].forEach(type => {
    input.dispatchEvent(new KeyboardEvent(type, {
      key: 'Enter', code: 'Enter', keyCode: 13,
      which: 13, bubbles: true, cancelable: true
    }));
  });
  // Prøv form submit
  const form = input.closest('form');
  if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  // Prøv søgeknap-klik
  const btn = form?.querySelector('button[type="submit"]') ||
              document.querySelector('button[aria-label*="søg" i]') ||
              document.querySelector('button[aria-label*="search" i]') ||
              document.querySelector('[data-testid*="search"] button') ||
              document.querySelector('.search-button');
  if (btn) btn.click();
}

function findSearchInput() {
  return document.querySelector('input[type="search"]') ||
         document.querySelector('input[name="query"]') ||
         document.querySelector('input[placeholder*="søg" i]') ||
         document.querySelector('input[placeholder*="Search" i]') ||
         document.querySelector('header input') ||
         document.querySelector('nav input') ||
         document.querySelector('.search input') ||
         document.querySelector('[class*="search" i] input');
}

function autoSearch(term) {
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    const input = findSearchInput();
    if (input) {
      clearInterval(interval);
      input.focus();
      triggerReactInput(input, term);
      setTimeout(() => triggerSearch(input), 150);
    } else if (attempts > 30) {
      clearInterval(interval);
    }
  }, 300);
}

// Kør auto-søgning hvis URL har ?query= parameter
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('query');
if (queryParam) {
  setTimeout(() => autoSearch(queryParam), 800);
}

// ── SmartPlate panel ────────────────────────────────────────

function buildPanel() {
  if (document.getElementById('sp-panel')) return;
  const panel = document.createElement('div');
  panel.id = 'sp-panel';
  panel.style.cssText = [
    'position:fixed','bottom:16px','right:16px','width:272px',
    'background:#fff','border-radius:14px',
    'box-shadow:0 6px 28px rgba(0,0,0,.22)','z-index:2147483647',
    'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',
    'font-size:14px','overflow:hidden','color:#1a1a1a'
  ].join(';');
  document.body.appendChild(panel);
  renderPanel();
}

function renderPanel() {
  const panel = document.getElementById('sp-panel');
  if (!panel) return;

  chrome.storage.local.get(['sp_ingredients','sp_checked'], data => {
    const allIngs  = data.sp_ingredients || [];
    const checked  = new Set(data.sp_checked || []);
    const validIdxs = allIngs.reduce((acc,ing,i) => parseIngredient(ing) ? [...acc,i] : acc, []);
    const done     = validIdxs.filter(i => checked.has(i)).length;
    const total    = validIdxs.length;
    const nextIdx  = validIdxs.find(i => !checked.has(i));
    const allDone  = nextIdx === undefined;
    const curIng   = allDone ? null : allIngs[nextIdx];
    const curName  = curIng ? parseIngredient(curIng) : null;
    const pct      = total ? Math.round(done/total*100) : 0;

    panel.innerHTML = `
      <div id="sp-header" style="background:#2d7a2d;color:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
        <div>
          <b style="font-size:15px;">🥗 SmartPlate</b>
          <div style="font-size:11px;opacity:.85;margin-top:1px;">${done}/${total} lagt i kurv</div>
        </div>
        <button id="sp-close" style="background:none;border:none;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:0;">×</button>
      </div>
      <div style="height:4px;background:#e0e0e0;"><div style="height:4px;background:#2d7a2d;width:${pct}%;transition:width .3s;"></div></div>

      ${allDone ? `
        <div style="padding:18px;text-align:center;">
          <div style="font-size:32px;margin-bottom:8px;">🎉</div>
          <b style="color:#2d7a2d;">Alle varer lagt i kurv!</b>
          <div style="font-size:12px;color:#999;margin-top:6px;">Gå til kurven og gennemfør bestillingen.</div>
        </div>
      ` : `
        <div style="padding:12px 14px;background:#f2f9f2;border-bottom:1px solid #e8e8e8;">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#2d7a2d;margin-bottom:3px;">Søger nu efter</div>
          <div style="font-size:16px;font-weight:700;">${curName}</div>
          <div style="font-size:11px;color:#999;margin-top:1px;">${curIng}</div>
        </div>
        <div style="padding:10px 14px 4px;">
          <button id="sp-done-btn" style="width:100%;padding:10px 14px;background:#2d7a2d;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;text-align:left;">
            ✓ Lagt i kurv — søg næste vare
          </button>
        </div>
      `}

      <div id="sp-list" style="max-height:130px;overflow-y:auto;border-top:1px solid #f0f0f0;">
        ${validIdxs.map(i => {
          const name = parseIngredient(allIngs[i]);
          const isDone = checked.has(i);
          const isCur = i === nextIdx;
          return `<div style="padding:6px 14px;font-size:12px;display:flex;align-items:center;gap:6px;
            cursor:pointer;border-bottom:1px solid #fafafa;
            background:${isCur?'#f2f9f2':'transparent'}"
            data-sp="${i}">
            <span style="color:${isDone?'#2d7a2d':'#ccc'};width:14px;font-size:13px;">${isDone?'✓':'○'}</span>
            <span style="${isDone?'text-decoration:line-through;color:#bbb;':''}${isCur?'font-weight:600;':''}">${name}</span>
          </div>`;
        }).join('')}
      </div>
    `;

    // Luk
    document.getElementById('sp-close')?.addEventListener('click', e => {
      e.stopPropagation();
      panel.style.display = 'none';
    });

    // Lagt i kurv → næste
    document.getElementById('sp-done-btn')?.addEventListener('click', () => {
      if (nextIdx === undefined) return;
      checked.add(nextIdx);
      chrome.storage.local.set({ sp_checked: [...checked] }, () => {
        const newNext = validIdxs.find(i => !checked.has(i));
        if (newNext !== undefined) {
          const term = parseIngredient(allIngs[newNext]);
          window.location.href = `https://www.bilkatogo.dk/search/?query=${encodeURIComponent(term)}`;
        } else {
          renderPanel();
        }
      });
    });

    // Manuel kryds af
    panel.querySelectorAll('[data-sp]').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.sp);
        if (checked.has(i)) checked.delete(i); else checked.add(i);
        chrome.storage.local.set({ sp_checked: [...checked] }, renderPanel);
      });
    });
  });
}

// Vis panel og lyt på storage-ændringer
setTimeout(buildPanel, 1200);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.sp_ingredients || changes.sp_checked)) {
    renderPanel();
  }
});
