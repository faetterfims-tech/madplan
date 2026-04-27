// Lytter efter besked fra popup om at synkronisere fra SmartPlate
chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  if (msg.type === 'SYNC_FROM_SMARTPLATE') {
    syncFromSmartPlate().then(respond);
    return true; // async respond
  }
  if (msg.type === 'OPEN_BILKA_SEARCH') {
    chrome.tabs.query({ url: 'https://www.bilkatogo.dk/*' }, tabs => {
      const url = `https://www.bilkatogo.dk/search/?query=${encodeURIComponent(msg.query)}`;
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { url, active: true });
      } else {
        chrome.tabs.create({ url });
      }
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

    await chrome.storage.local.set({
      sp_ingredients: data.ingredients,
      sp_synced_at: Date.now()
    });
    return { ok: true, count: data.ingredients.length };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// Kører inde i SmartPlate-fanen
function readSmartPlateData() {
  try {
    const weekPlan = JSON.parse(localStorage.getItem('madplan_week') || '{}');
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const seen = new Map();
    days.forEach(day => {
      const meal = weekPlan[day];
      if (!meal?.ingredients) return;
      meal.ingredients.forEach(ing => {
        const key = ing.toLowerCase().trim();
        if (!seen.has(key)) seen.set(key, ing);
      });
    });
    return { ingredients: [...seen.values()] };
  } catch(e) {
    return { ingredients: [] };
  }
}
