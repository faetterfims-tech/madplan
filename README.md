# 🥗 Ugentlig Madplan

En simpel webapp til ugentlig madplanlægning med AI-forslag og Bilka ToGo indkøbsliste.

---

## 🚀 Sådan lægger du den på GitHub Pages (trin for trin)

### 1. Opret en GitHub-konto
Gå til [github.com](https://github.com) og opret en gratis konto hvis du ikke allerede har en.

### 2. Opret et nyt repository
- Klik på det grønne **"New"** knap øverst til venstre
- Giv det navnet: `madplan`
- Sæt det til **Public**
- Sæt flueben ved **"Add a README file"**
- Klik **"Create repository"**

### 3. Upload filerne
- Klik på **"Add file"** → **"Upload files"**
- Træk og slip disse filer ind:
  - `index.html`
  - `manifest.json`
  - `icon.png` *(valgfri — et grønt madplan-ikon)*
- Skriv "Madplan app" i commit-beskrivelsen
- Klik **"Commit changes"**

### 4. Slå GitHub Pages til
- Gå til **Settings** (tandhjul øverst til højre)
- Klik på **"Pages"** i menuen til venstre
- Under **"Source"** → vælg **"Deploy from a branch"**
- Under **"Branch"** → vælg **"main"** og **"/ (root)"**
- Klik **"Save"**

### 5. Vent 1-2 minutter
GitHub bygger siden. Refresh siden efter lidt, og du ser et link øverst:
> **Your site is live at: `https://DITBRUGERNAVN.github.io/madplan`**

---

## 📱 Sådan gemmer din kone den som app på iPhone

1. Åbn linket i **Safari** på iPhone *(skal være Safari, ikke Chrome)*
2. Tryk på **Del-knappen** (firkant med pil op) nederst på skærmen
3. Scroll ned og tryk **"Føj til hjemmeskærm"**
4. Tryk **"Tilføj"**

Appen vises nu som en ikon på hjemmeskærmen — ligesom en rigtig app! 🎉

---

## 💡 Funktioner

- 📅 **Ugeplan** — 7 dages madplan med dag-for-dag oversigt
- 🛒 **Indkøbsliste** — automatisk genereret, kategoriseret, med link til Bilka ToGo
- ⭐ **Favoritter** — gem yndlingsopskrifter og tilføj dem til ugeplanen
- 📊 **Præferencer** — AI husker hvad familien kan lide og ikke lide
- 💾 **Husker alt** — data gemmes på telefonen (fungerer offline)
- ✨ **AI-planlægning** — genererer en hel uges madplan inden for budget

---

## 🤖 Brug af AI

Da appen hostes statisk, sker AI-planlægningen via Claude i chatten:

1. Tryk **"Planlæg uge med AI"** i appen
2. Kopiér beskeden der vises
3. Send den til Claude i chatten
4. Claude svarer med en madplan — kopiér JSON-svaret
5. Indsæt det i appen med `window.loadMealPlan([...])` i browser-konsollen

*Tip: Bed Claude om at lave en ny plan når du vil skifte uge!*
