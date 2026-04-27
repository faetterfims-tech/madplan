// SmartPlate-panel injiceret i Bilka ToGo
// Viser indkøbsliste og hjælper med at navigere varer

if (document.getElementById('sp-panel')) {
  // Allerede indlæst — opdater kun
  updatePanel();
} else {
  initPanel();
}

function parseIngredient(str) {
  const skip = new Set(['salt og peber','salt','peber','vand','tandstikkere til fastgørelse','tandstikkere']);
  if (skip.has(str.toLowerCase().trim())) return null;

  return str
    .replace(/^[\d]+[,\.]?[\d]*\s*(g|kg|dl|cl|ml|l|tsk|spsk|stk|fed|kviste?|bundt|dåser?|glas|pk\.?|nip|liter)\s+/gi, '')
    .replace(/^[½¼¾]\s+/, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+til\s+(servering|stegning|drys|panering|fastgørelse|garnering|dryp)\b.*/gi, '')
    .replace(/,\s+i\s+\w+/gi, '')
    .trim() || null;
}

function initPanel() {
  const panel = document.createElement('div');
  panel.id = 'sp-panel';
  panel.style.cssText = [
    'position:fixed', 'bottom:20px', 'right:20px', 'width:280px',
    'background:white', 'border-radius:14px',
    'box-shadow:0 4px 24px rgba(0,0,0,.18)', 'z-index:2147483647',
    'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',
    'font-size:14px', 'overflow:hidden',
    'transition:transform .2s'
  ].join(';');

  document.body.appendChild(panel);
  updatePanel();
}

function updatePanel() {
  const panel = document.getElementById('sp-panel');
  if (!panel) return;

  chrome.storage.local.get(['sp_ingredients', 'sp_checked'], data => {
    const items = (data.sp_ingredients || []).filter(i => parseIngredient(i));
    const checkedSet = new Set(data.sp_checked || []);
    const done = [...checkedSet].filter(i => i < (data.sp_ingredients || []).length).length;

    if (items.length === 0) {
      panel.innerHTML = `
        <div style="padding:14px;background:#2d7a2d;color:white;display:flex;justify-content:space-between;align-items:center;">
          <strong>🥗 SmartPlate</strong>
          <button onclick="document.getElementById('sp-panel').style.display='none'"
            style="background:none;border:none;color:white;font-size:18px;cursor:pointer;padding:0;">×</button>
        </div>
        <div style="padding:14px;color:#666;font-size:13px;">
          Ingen indkøbsliste.<br>
          <a href="https://smartplate.dk" style="color:#2d7a2d;">Åbn SmartPlate</a> og synkroniser.
        </div>`;
      return;
    }

    // Find næste vare der ikke er afkrydset
    const allIngredients = data.sp_ingredients || [];
    const nextIdx = allIngredients.findIndex((ing, i) => !checkedSet.has(i) && parseIngredient(ing) !== null);
    const currentIng = nextIdx >= 0 ? allIngredients[nextIdx] : null;
    const currentName = currentIng ? parseIngredient(currentIng) : null;
    const allDone = nextIdx < 0;

    panel.innerHTML = `
      <div style="padding:12px 14px;background:#2d7a2d;color:white;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:15px;">🥗 SmartPlate</strong>
          <div style="font-size:11px;opacity:.85;margin-top:1px;">${done}/${items.length} lagt i kurv</div>
        </div>
        <button id="sp-close" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;padding:0;line-height:1;">×</button>
      </div>

      ${allDone ? `
        <div style="padding:16px;text-align:center;">
          <div style="font-size:28px;margin-bottom:8px;">🎉</div>
          <div style="font-weight:600;color:#2d7a2d;">Alle varer fundet!</div>
          <div style="font-size:12px;color:#999;margin-top:4px;">Gå til kurven og betal.</div>
        </div>
      ` : `
        <div style="padding:12px 14px;background:#f0f7f0;border-bottom:1px solid #e0e0e0;">
          <div style="font-size:11px;color:#2d7a2d;font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px;">Søger nu efter</div>
          <div style="font-size:16px;font-weight:700;color:#1a1a1a;">${currentName}</div>
          <div style="font-size:11px;color:#999;margin-top:2px;">${currentIng}</div>
        </div>
        <div style="padding:10px 14px;">
          <button id="sp-done-btn" style="width:100%;padding:10px;background:#2d7a2d;color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">
            ✓ Lagt i kurv — søg næste
          </button>
        </div>
      `}

      <div style="border-top:1px solid #f0f0f0;max-height:150px;overflow-y:auto;">
        ${allIngredients.map((ing, i) => {
          const name = parseIngredient(ing);
          if (!name) return '';
          const isDone = checkedSet.has(i);
          return `<div style="padding:7px 14px;font-size:12px;color:${isDone?'#2d7a2d':'#444'};
            border-bottom:1px solid #f9f9f9;display:flex;align-items:center;gap:6px;cursor:pointer;"
            data-sp-idx="${i}">
            <span style="width:14px;font-size:13px;">${isDone?'✓':'·'}</span>
            <span style="${isDone?'text-decoration:line-through;color:#aaa;':''}">${name}</span>
          </div>`;
        }).join('')}
      </div>
    `;

    // Luk
    document.getElementById('sp-close')?.addEventListener('click', () => {
      panel.style.display = 'none';
    });

    // Lagt i kurv → søg næste
    document.getElementById('sp-done-btn')?.addEventListener('click', () => {
      if (nextIdx >= 0) {
        checkedSet.add(nextIdx);
        chrome.storage.local.set({ sp_checked: [...checkedSet] }, () => {
          // Find næste og søg
          const newNext = allIngredients.findIndex((ing, i) => !checkedSet.has(i) && parseIngredient(ing));
          if (newNext >= 0) {
            const term = parseIngredient(allIngredients[newNext]);
            window.location.href = `https://www.bilkatogo.dk/search/?query=${encodeURIComponent(term)}`;
          } else {
            updatePanel();
          }
        });
      }
    });

    // Manuel afkrydsning af enkelt vare
    panel.querySelectorAll('[data-sp-idx]').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.spIdx);
        if (checkedSet.has(i)) checkedSet.delete(i); else checkedSet.add(i);
        chrome.storage.local.set({ sp_checked: [...checkedSet] }, updatePanel);
      });
    });
  });
}
