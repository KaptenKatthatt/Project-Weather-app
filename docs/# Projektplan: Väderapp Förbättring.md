# Projektplan: Väderapp Förbättring & API Migration

## 📋 Projektöversikt

**Student**: Jonas  
**Projekt**: Weather App Enhancement  
**Mål**: Migrera från AccuWeather till stabilt API + lägg till avancerade funktioner  
**Varaktighet**: 2-3 veckor

---

## 🎯 Lärandemål

### Tekniska Färdigheter

- Git branching och merging workflow
- API migration och integration
- Local Storage avancerade tekniker
- Code refactoring och strukturering
- Error handling och user experience

### Utvecklingsmetodik

- Planerad utveckling i steg
- Testing av funktionalitet
- Version control best practices

---

## 📚 Förkunskaper Som Behövs

- [x] JavaScript ES6+ (destructuring, async/await, fetch)
- [x] DOM manipulation
- [x] Local Storage basics
- [x] Git basics (add, commit, push)
- [ ] Git branching (kommer att läras)
- [ ] API dokumentation läsning
- [ ] Advanced Local Storage patterns

---

## 🚀 STEG 1: API Migration ✅ **SLUTFÖRT!** (Vecka 1)

### **A. Git Workflow Setup** ✅ **KLART**

**Lärmoment**: Branching strategy, version control

#### Uppgifter:

1. **Skapa feature branch** ✅

   - Branch: `new-API-migration` skapad
   - Säker utvecklingsmiljö upprättad

2. **Backup current state** ✅
   - Kod pushad till remote som backup
   - Säker återställningspunkt skapad

### **B. API Research & Planning** ✅ **KLART**

**Lärmoment**: API dokumentation, jämförelse av tjänster

#### Uppgifter:

1. **Välj nytt API** ✅

   - **OpenWeatherMap** valt som slutlig lösning
   - Gratis tier: 1000 anrop/dag (mer än tillräckligt)
   - Utmärkt dokumentation och support

2. **Planera migration** ✅
   - JSON-struktur analyserad och jämförd
   - Identifierat nödvändiga ändringar i kod

### **C. Implementation** ✅ **KLART**

**Lärmoment**: Code refactoring, API integration

#### Uppgifter:

1. **Uppdatera forecast.js** ✅

   - API endpoints bytta till OpenWeatherMap
   - Funktioner anpassade för lat/lon istället för Key
   - Svensk språkstöd (`lang=sv`) tillagt

2. **Uppdatera app.js** ✅

   - UI-mappning fixad för ny datastruktur
   - Temperatur: `weather.main.temp`
   - Beskrivning: `weather.weather[0].description`
   - Stadsnamn: `cityDets.name`
   - Ikoner: OpenWeatherMap ikoner integrerade
   - Dag/natt logik: Använder sunrise/sunset timestamps

3. **Testing** ✅

   - Testade med olika städer (London, Stockholm, etc.)
   - Felhantering fungerar för felstavade städer
   - Local Storage fortfarande fungerar perfekt

### **D. Merge to Main** ✅ **KLART**

**Lärmoment**: Git merging, deployment

#### Uppgifter:

1. **Code review själv** ✅

   - All funktionalitet bevarad och förbättrad
   - Kod clean och strukturerad
   - Inga console.log kvar som inte behövs

2. **Merge process** ✅
   - Säker merge utan konflikter
   - Pushat till main branch framgångsrikt
   - Feature branch backup bibehållen

---

## 🚀 STEG 2: Advanced Features (Vecka 2-3)

### **A. Caching System**

**Lärmoment**: Performance optimization, data management

#### Planering:

- Hur länge ska väderdata cachas?
- Vad händer om API:et är nere?
- Hur visar du för användaren att data är cachad?

#### Implementation Strategy:

1. Design cache structure
2. Implement cache logic
3. Add cache indicators to UI
4. Test cache expiry

### **B. Favorite Cities Feature**

**Lärmoment**: Complex UI interactions, data persistence

#### Planering:

- Hur ska UI:et se ut för favorites?
- Var i HTML ska favoriter visas?
- Hur lägger man till/tar bort favoriter?
- Behövs "Add to favorites" knapp?
- Hur visas favorit-listan (dropdown, sidebar, modal)?

#### Implementation Strategy:

1. Design HTML structure för favorites lista
2. Skapa add/remove favorites funktionalitet
3. Implement favorites display med delete-knappar
4. Integrate med existing weather fetching
5. Spara favorites i localStorage
6. Quick-access till favorites från huvudsidan

### **C. Animated Wind Indicator**

**Lärmoment**: CSS animations, wind data visualization, kompass-orientering

#### Planering:

- Hur ska vindflöjeln se ut (SVG, CSS, image)?
- Hur konverterar man vindrikning (grader) till kompassriktning?
- Hur kopplar man vindhastighet till animationshastighet?
- Var ska vindflöjeln placeras i UI:et?

#### Implementation Strategy:

1. Skapa/hitta vindflöjel SVG/ikon
2. Implement CSS rotations baserat på `weather.wind.deg`
3. Skapa spinning animation baserat på `weather.wind.speed`
4. Smooth transitions mellan riktningsändringar
5. Visa vindhastighet och riktning i text också
6. Responsive design för mobil

#### Technical Details:

- **Wind Direction**: `weather.wind.deg` (0-360 grader)
- **Wind Speed**: `weather.wind.speed` (m/s)
- **CSS Transform**: `rotate(${windDeg}deg)`
- **Animation Speed**: Baserat på wind.speed värdet

### **D. 5-Day Weather Forecast**

**Lärmoment**: Extended API integration, data visualization, UI expansion

#### Planering:

- Hur ska 5-dagars prognosen visas i UI:et?
- Ska det vara en lista, cards, eller grafisk representation?
- Vilken information ska visas för varje dag (temp, väder, ikon)?
- Hur integrerar man forecast med nuvarande design?

#### Implementation Strategy:

1. Implementera OpenWeatherMap forecast5 API anrop
2. Skapa ny HTML struktur för prognos-sektion
3. Design forecast cards/list styling
4. Parse forecast data (5 dagar, 3-timmars intervall)
5. Visa daglig min/max temperatur
6. Integrate forecast ikoner och beskrivningar
7. Responsive design för mobila enheter

#### Technical Details:

- **API Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Data format**: 5 dagar med 3-timmars steg (40 datapunkter)
- **Gratis limit**: 1000 anrop/dag (samma som current weather)
- **Data att visa**:
  - Datum/dag
  - Min/max temperatur per dag
  - Väderikon och beskrivning
  - Vindinformation

### **E. Enhanced User Experience**

**Lärmoment**: UI/UX design, responsiveness

#### Möjliga Features:

- Loading indicators
- Better error messages
- Keyboard navigation
- Mobile optimization
- Smooth transitions och micro-animations

---

## 📋 Utvecklingsriktlinjer

### **Code Quality Standards**

- Konsistent naming conventions
- Kommentarer för komplexa funktioner
- Error handling för alla API calls
- No hardcoded values (använd konstanter)

### **Testing Approach**

- Testa varje feature innan du går vidare
- Testa edge cases (tomma strings, felaktiga städer)
- Testa på olika enheter/skärmstorlekar

### **Git Workflow**

- Använd descriptive commit messages
- Commita ofta med små ändringar
- Skapa nya branches för större features

---

## 🎯 Milestones & Checkpoints

### **Milestone 1**: API Migration Complete ✅ **UPPNÅTT!**

- [x] Ny API fungerar för weather fetching
- [x] All existing functionality preserved
- [x] Merged to main branch
- [x] No breaking changes
- [x] **BONUS**: Svensk språkstöd tillagt!

### **Milestone 2**: Caching Implemented

- [ ] Weather data cachas lokalt
- [ ] Cache expiry fungerar korrekt
- [ ] Performance improvement märkbart

### **Milestone 3**: Favorites Feature

- [ ] Kan lägga till favoriter
- [ ] Kan välja från favoriter
- [ ] Favoriter persistenta mellan sessions

### **Milestone 4**: 5-Day Weather Forecast

- [ ] Forecast API integrerad med OpenWeatherMap
- [ ] 5-dagars prognos visas i UI
- [ ] Daglig min/max temperatur och väderikoner
- [ ] Responsive design för forecast-sektion

### **Milestone 5**: Wind Animation Feature

- [ ] Vindflöjel roterar baserat på vindrikning
- [ ] Animationshastighet baserat på vindhastighet
- [ ] Smooth CSS transitions

### **Milestone 6**: Polish & Deploy

- [ ] Enhanced UI/UX
- [ ] Mobile responsive
- [ ] Error handling robust
- [ ] Ready for "production"

---

### F. Country flags

Visa landsflagga bredvid stadens namn
Mål: Visa landsflagga bredvid varje stadsnamn i UI baserat på landskod från OpenWeatherMap.

API-alternativ:

flagcdn.com: Direktlänkar till PNG/SVG för varje landskod. Exempel: https://flagcdn.com/32x24/cz.png eller https://flagcdn.com/cz.svg. Dokumentation: https://flagcdn.com/
Rest Countries API: Returnerar flagga och annan landinfo. Exempel: https://restcountries.com/v3.1/alpha/cz. Dokumentation: https://restcountries.com/
OpenWeatherMap: Returnerar endast landskod, ingen flagga. Kombinera med ovanstående API:er för flagga. Dokumentation: https://openweathermap.org/current
Att göra:

Visa landsflagga bredvid varje stadsnamn i UI.
Välj API-lösning (flagcdn.com rekommenderas för enkelhet och snabbhet).
Lägg till fallback om landskod saknas eller flagga inte hittas.
Testa med olika landskoder (t.ex. CZ, SE, US, GB).
Länkar:
Country Flags API (flagcdn.com)
Du kan direkt använda en URL för att hämta en SVG eller PNG:
Byt ut cz mot valfri landskod (små bokstäver).

Rest Countries API
Du kan hämta flagga och annan info:
https://flagcdn.com/32x24/cz.png
https://flagcdn.com/cz.svg

https://restcountries.com/v3.1/alpha/cz

## 🤔 Reflektion & Utvärdering

### Efter Steg 1:

- Vad var svårast med API migration?
- Vilka förbättringar märkte du?
- Vad lärde du dig om git branching?

### Efter Steg 2:

- Vilken feature var mest utmanande?
- Hur har din code organization förbättrats?
- Vad skulle du göra annorlunda nästa gång?

---

## 📚 Resurser för Självstudier

### Git & Version Control

- Git branching best practices
- Merge vs rebase strategies

### API Integration

- REST API best practices
- Error handling patterns
- Rate limiting strategies

### JavaScript Patterns

- Module patterns
- Event handling optimization
- Local Storage advanced techniques

---

**Skapad**: 12 oktober 2025  
**Status**: Planering  
**Nästa steg**: Börja med Steg 1A - Git Workflow Setup
