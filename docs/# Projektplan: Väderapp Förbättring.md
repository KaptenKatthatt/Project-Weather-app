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

## 🚀 STEG 1: API Migration (Vecka 1)

### **A. Git Workflow Setup**

**Lärmoment**: Branching strategy, version control

#### Uppgifter:

1. **Skapa feature branch**

   - Tänk på: Vad är ett bra branch-namn?
   - Varför arbetar vi i branches istället för direkt i main?

2. **Backup current state**
   - Vad händer om något går fel?
   - Hur säkerställer vi att vi kan gå tillbaka?

### **B. API Research & Planning**

**Lärmoment**: API dokumentation, jämförelse av tjänster

#### Uppgifter:

1. **Välj nytt API**

   - Jämför: OpenWeatherMap vs WeatherAPI vs andra
   - Analysera: Rate limits, gratis tier, dokumentation
   - Frågor att ställa: Vilken JSON-struktur? Hur många anrop?

2. **Planera migration**
   - Vilka funktioner i din kod behöver ändras?
   - Vilka nya fält finns tillgängliga i det nya API:et?

### **C. Implementation**

**Lärmoment**: Code refactoring, API integration

#### Uppgifter:

1. **Uppdatera forecast.js**

   - Tänk på: Hur behåller du samma interface men ändrar implementation?
   - Vilka funktioner behöver uppdateras?

2. **Uppdatera app.js**

   - Vilka ändringar behövs i UI-koden?
   - Hur hanterar du olika datastrukturer?

3. **Testing**
   - Testa med olika städer
   - Kontrollera att felhantering fungerar
   - Verifiera att Local Storage fortfarande fungerar

### **D. Merge to Main**

**Lärmoment**: Git merging, deployment

#### Uppgifter:

1. **Code review själv**

   - Funkar allt som tidigare?
   - Är koden clean och kommenterad?

2. **Merge process**
   - Hur gör man en säker merge?
   - Vad gör man om det blir konflikter?

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

### **D. Enhanced User Experience**

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

### **Milestone 1**: API Migration Complete

- [ ] Ny API fungerar för weather fetching
- [ ] All existing functionality preserved
- [ ] Merged to main branch
- [ ] No breaking changes

### **Milestone 2**: Caching Implemented

- [ ] Weather data cachas lokalt
- [ ] Cache expiry fungerar korrekt
- [ ] Performance improvement märkbart

### **Milestone 3**: Favorites Feature

- [ ] Kan lägga till favoriter
- [ ] Kan välja från favoriter
- [ ] Favoriter persistenta mellan sessions

### **Milestone 4**: Polish & Deploy

- [ ] Enhanced UI/UX
- [ ] Mobile responsive
- [ ] Error handling robust
- [ ] Ready for "production"

---

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
