# SmartPlate — Familiens komplette indkøbsassistent

## Om projektet
SmartPlate er en dansk familie-indkøbsassistent bygget som PWA (Progressive Web App).
Hele appen kører i browseren via localStorage — ingen backend, ingen server, ingen driftsomkostninger.

## Ejer
Daniel Faetter — lastbilchauffør, ingen kodebaggrund. Arbejder på dansk i naturligt sprog med Claude Code.

## Links
- **Live app:** https://faetterfims-tech.github.io/madplan
- **Frontend repo:** https://github.com/faetterfims-tech/madplan
- **Backend repo (udfases):** https://github.com/faetterfims-tech/madplan-backend
- **Domæne:** smartplate.dk (skal peges på GitHub Pages)
- **Lokalt arbejdsmappe:** C:\Users\featt\Desktop\SmartPlate\madplan-frontend

## Tech stack
- Ren HTML/CSS/JavaScript (én enkelt `index.html` fil)
- PWA med `manifest.json`
- localStorage til al data
- GitHub Pages til hosting
- Ingen build-trin, ingen frameworks, ingen npm

## Datastruktur i localStorage
```
madplan_week      → { Monday: {name, cost, time, cuisine, ingredients[], steps[]}, ... }
madplan_ratings   → { "Lasagne": "liked"|"disliked", ... }
madplan_favourites → [{name, cost, time, cuisine, ingredients[], steps[]}, ...]
madplan_recent    → ["Lasagne", "Pasta Bolognese", ...]
```

## Filstruktur (nuværende)
```
index.html          ← hele appen (HTML + CSS + JS i én fil)
manifest.json       ← PWA-konfiguration
CLAUDE.md           ← denne fil
data/               ← (oprettes) JSON-opskriftsdatabase
  recipes-italian.json
  recipes-asian.json
  recipes-nordic.json
  recipes-mexican.json
  recipes-middleeast.json
  recipes-quick.json
  recipes-weekend.json
  recipes-vegetarian.json
  recipes-index.json  ← let index til hurtig søgning
```

## Workflow med Claude
1. Daniel beskriver ændringer på dansk i naturligt sprog
2. Claude eksekverer direkte i filerne
3. Claude pusher automatisk til GitHub når ændringen er godkendt
4. Claude fortæller kort hvad der er gjort og om noget kræver manuel handling

## Vigtige regler
- AL logik skal køre client-side (ingen backend)
- Aldrig API-nøgler i frontend-koden
- Dansk sprog i hele brugergrænsefladen
- Mobiloptimeret til iPhone (PWA)
- Fungerer offline
- Lynhurtigt — ingen loading-tider

## Fase 1 features (byg nu)
- [x] Ugentlig madplan
- [x] Kategoriseret indkøbsliste
- [x] Favoritter og præferencer
- [x] PWA-support
- [ ] Fjern backend-afhængighed (erstat med algoritme + lokal database)
- [ ] NDA beta-onboarding med underskrift
- [ ] 1000 opskrifter i lokal JSON-database
- [ ] Smart planlægningsalgoritme (budget, variation, historik, sæson)
- [ ] Budgetvælger
- [ ] Antal personer + aldersgrupper
- [ ] Shuffle-knap per dag
- [ ] 14-dages tilstand
- [ ] Intervalbaserede forbrugsvarer
- [ ] Sæsonfunktion
- [ ] Mærkedage med AI-integration
- [ ] Supermarkedsvælger

## Fase 2 features (byg ikke nu)
- Brugerkonti (Google/Apple login)
- Cloud database (Supabase)
- Automatisk overførsel til Bilka ToGo
- Betalingssystem (49 kr/måned via Stripe)
- App Store version via Capacitor
- Tilbudsintegration
- MitID integration

## DNS — smartplate.dk → GitHub Pages
Hos Simply.com skal disse DNS-records oprettes:
```
Type: A    Navn: @    Værdi: 185.199.108.153
Type: A    Navn: @    Værdi: 185.199.109.153
Type: A    Navn: @    Værdi: 185.199.110.153
Type: A    Navn: @    Værdi: 185.199.111.153
Type: CNAME  Navn: www  Værdi: faetterfims-tech.github.io
```
Derefter i GitHub repo Settings → Pages → Custom domain: smartplate.dk
