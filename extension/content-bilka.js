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

// ── Auto-søgning via søgefeltet ─────────────────────────────
// Finder søgefeltet og trigger søgning med React-kompatible events.

function findSearchInput() {
  return document.querySelector('input[type="search"]')
    || document.querySelector('input[name="query"]')
    || document.querySelector('input[placeholder*="søg" i]')
    || document.querySelector('input[placeholder*="Search" i]')
    || document.querySelector('header input[type="text"]')
    || document.querySelector('nav input')
    || document.querySelector('[class*="search" i] input');
}

function fireReactInput(el, value) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  setter.call(el, value);
  el.dispatchEvent(new Event('input',  { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function fireEnter(el) {
  ['keydown','keypress','keyup'].forEach(t =>
    el.dispatchEvent(new KeyboardEvent(t, {
      key:'Enter', code:'Enter', keyCode:13, which:13, bubbles:true, cancelable:true
    }))
  );
  const form = el.closest('form');
  if (form) form.dispatchEvent(new Event('submit', { bubbles:true, cancelable:true }));
  const btn = form?.querySelector('button[type="submit"]')
    || document.querySelector('button[aria-label*="søg" i]')
    || document.querySelector('button[aria-label*="search" i]');
  if (btn) btn.click();
}

function autoSearch(term, attempt = 0) {
  const input = findSearchInput();
  if (input) {
    input.focus();
    fireReactInput(input, term);
    setTimeout(() => fireEnter(input), 200);
  } else if (attempt < 25) {
    setTimeout(() => autoSearch(term, attempt + 1), 300);
  }
}

// ── Tjek om der er en afventende søgning ────────────────────
// popup.js gemmer søgetermen i sp_pending_search inden navigation.

chrome.storage.local.get('sp_pending_search', data => {
  if (data.sp_pending_search) {
    const term = data.sp_pending_search;
    chrome.storage.local.remove('sp_pending_search');
    setTimeout(() => autoSearch(term), 600);
  }
});

// ── SmartPlate-panel ────────────────────────────────────────

function buildPanel() {
  if (document.getElementById('sp-panel')) return;
  const el = document.createElement('div');
  el.id = 'sp-panel';
  el.style.cssText = [
    'position:fixed','bottom:16px','right:16px','width:272px',
    'background:#fff','border-radius:14px',
    'box-shadow:0 6px 28px rgba(0,0,0,.22)','z-index:2147483647',
    'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',
    'overflow:hidden','color:#1a1a1a'
  ].join(';');
  document.body.appendChild(el);
  renderPanel();
}

function goToNext(allIngs, checkedSet) {
  const validIdxs = allIngs.reduce((a,ing,i) => parseIngredient(ing) ? [...a,i] : a, []);
  const nextIdx   = validIdxs.find(i => !checkedSet.has(i));
  if (nextIdx === undefined) { renderPanel(); return; }
  const term = parseIngredient(allIngs[nextIdx]);
  // Gem søgeterm og naviger til forsiden så content scriptet søger automatisk
  chrome.storage.local.set({ sp_pending_search: term }, () => {
    window.location.href = 'https://www.bilkatogo.dk/';
  });
}

function renderPanel() {
  const panel = document.getElementById('sp-panel');
  if (!panel) return;

  chrome.storage.local.get(['sp_ingredients','sp_checked'], data => {
    const allIngs  = data.sp_ingredients || [];
    const checked  = new Set(data.sp_checked || []);
    const validIdx = allIngs.reduce((a,ing,i) => parseIngredient(ing) ? [...a,i] : a, []);
    const done     = validIdx.filter(i => checked.has(i)).length;
    const total    = validIdx.length;
    const nextIdx  = validIdx.find(i => !checked.has(i));
    const allDone  = nextIdx === undefined;
    const curIng   = allDone ? null : allIngs[nextIdx];
    const curName  = curIng ? parseIngredient(curIng) : null;
    const pct      = total ? Math.round(done/total*100) : 0;

    panel.innerHTML = `
      <div style="background:#2d7a2d;color:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <b style="font-size:15px;">🥗 SmartPlate</b>
          <div style="font-size:11px;opacity:.8;margin-top:1px;">${done}/${total} lagt i kurv</div>
        </div>
        <button id="sp-close" style="background:none;border:none;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:0 2px;">×</button>
      </div>
      <div style="height:4px;background:#e0ede0;">
        <div style="height:4px;background:#2d7a2d;width:${pct}%;transition:width .3s;"></div>
      </div>

      ${allDone ? `
        <div style="padding:20px 14px;text-align:center;">
          <div style="font-size:32px;">🎉</div>
          <b style="color:#2d7a2d;font-size:15px;">Alle varer lagt i kurv!</b>
          <div style="font-size:12px;color:#999;margin-top:6px;">Gå til kurven og gennemfør bestillingen.</div>
        </div>
      ` : `
        <div style="padding:12px 14px;background:#f2f9f2;border-bottom:1px solid #e8e8e8;">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#2d7a2d;margin-bottom:3px;">Søger nu efter</div>
          <div style="font-size:16px;font-weight:700;">${curName}</div>
          <div style="font-size:11px;color:#aaa;margin-top:1px;">${curIng}</div>
        </div>
        <div style="padding:10px 14px 2px;">
          <button id="sp-done-btn" style="width:100%;padding:11px 14px;background:#2d7a2d;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">
            ✓ Lagt i kurv — søg næste vare
          </button>
        </div>
      `}

      <div style="max-height:140px;overflow-y:auto;border-top:1px solid #f0f0f0;">
        ${validIdx.map(i => {
          const name  = parseIngredient(allIngs[i]);
          const isDone = checked.has(i);
          const isCur  = i === nextIdx;
          return `<div data-sp="${i}" style="padding:6px 14px;font-size:12px;display:flex;align-items:center;gap:6px;
            cursor:pointer;border-bottom:1px solid #fafafa;background:${isCur?'#f2f9f2':'#fff'}">
            <span style="color:${isDone?'#2d7a2d':'#ccc'};width:14px;">${isDone?'✓':'○'}</span>
            <span style="${isDone?'text-decoration:line-through;color:#bbb;':''}${isCur?'font-weight:600;':''}">${name}</span>
          </div>`;
        }).join('')}
      </div>`;

    document.getElementById('sp-close')?.addEventListener('click', () => {
      panel.style.display = 'none';
    });

    document.getElementById('sp-done-btn')?.addEventListener('click', () => {
      if (nextIdx === undefined) return;
      checked.add(nextIdx);
      chrome.storage.local.set({ sp_checked: [...checked] }, () => goToNext(allIngs, checked));
    });

    panel.querySelectorAll('[data-sp]').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.sp);
        if (checked.has(i)) checked.delete(i); else checked.add(i);
        chrome.storage.local.set({ sp_checked: [...checked] }, renderPanel);
      });
    });
  });
}

setTimeout(buildPanel, 1500);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.sp_ingredients || changes.sp_checked)) renderPanel();
});
