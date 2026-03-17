# Lokal utveckling med Vite

Den här guiden visar hur du kör Weather App lokalt som ett Vite-projekt.
API-anropen behålls oförändrade i frontend (`/api/openweather`) men hanteras i Vites dev-server via en lokal middleware, så din `API_KEY` exponeras inte i klientkoden.

## Förutsättningar

- Node.js 18+ och npm.
- En OpenWeatherMap API-nyckel.
- Projektet klonat lokalt.

## Kom igång

### 1. Installera beroenden

Kör i projektroten:

```bash
npm install
```

### 2. Lägg till miljövariabel

Skapa `.env.local` i projektroten och lägg till:

```env
API_KEY=DIN_OPENWEATHER_API_NYCKEL
```

Tips: utgå från `.env.example`.

### 3. Starta utvecklingsservern

```bash
npm run dev
```

Öppna adressen som skrivs ut i terminalen (normalt `http://localhost:5173`).

### 4. Bygg för produktion

```bash
npm run build
```

Byggoutput hamnar i `dist/`.

### 5. Förhandsgranska build lokalt

```bash
npm run preview
```

## Deploy

Se [DEPLOYMENT.md](./DEPLOYMENT.md) för en kort guide för Netlify och GitHub Pages.

## Felsökning

- Om API-anrop misslyckas: kontrollera att `.env.local` finns och innehåller giltig `API_KEY`.
- Om porten är upptagen: starta med t.ex. `npm run dev -- --port 5174`.
