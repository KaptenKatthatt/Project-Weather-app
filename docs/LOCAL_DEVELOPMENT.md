# Lokal utveckling med Vercel Dev Mode

Denna guide förklarar hur du kör och testar ditt Weather App-projekt lokalt med Vercel Dev Mode. Detta simulerar hela Vercel-miljön, inklusive serverless functions, så att du kan testa API-anrop (`getWeather`, `getForecast`, `getCity`) utan att exponera din API-nyckel.

När du är klar med utvecklingen, pusha ändringarna till GitHub för automatisk deploy till Vercel på nätet.

## Förutsättningar

- Node.js och npm installerat (för Vercel CLI).
- Din OpenWeatherMap API-nyckel.
- Projektet klonat lokalt.

## Steg-för-steg-instruktioner

### 1. Installera Vercel CLI (om inte redan gjort)

Öppna terminalen i projektroten (`/home/jonas/code/Portfolion/Projekt/Weather app`) och kör:

```
npm install -g vercel
```

Detta installerar Vercel CLI globalt.

### 2. Skapa en lokal environment-fil för API-nyckeln

- Skapa en fil som heter `.env.local` i projektroten (bredvid `package.json`).
- Lägg till följande innehåll (ersätt `DIN_API_NYCKEL` med din riktiga OpenWeatherMap API-nyckel):
  ```
  API_KEY=DIN_API_NYCKEL
  ```
- **Viktigt**: Lägg till `.env.local` i `.gitignore` om det inte redan finns där, så att nyckeln inte pushas till GitHub. (Kontrollera att `.gitignore` innehåller `*.env*` eller liknande.)

### 3. Starta Vercel Dev Mode

- I terminalen (från projektroten), kör:
  ```
  vercel dev
  ```
- Detta startar en lokal server som simulerar Vercel. Du ser något liknande:
  ```
  Vercel CLI 28.0.0
  > Ready! Available at http://localhost:3000
  ```
- Öppna `http://localhost:3000` i din webbläsare.

### 4. Testa appen lokalt

- Använd appen som vanligt: Sök efter väder i en stad, kolla forecast, etc.
- Alla API-anrop går nu via din lokala serverless-funktion (`api/openweather.js`), som använder `process.env.API_KEY` från `.env.local`.
- Om något inte fungerar, kontrollera terminalen för felmeddelanden eller loggar från serverless-funktionen.

### 5. Utveckla och iterera

- Redigera dina filer (t.ex. `scripts/forecast.js`, `index.html`, CSS) i VS Code.
- Spara ändringarna — Vercel Dev Mode laddar om automatiskt i webbläsaren.
- Upprepa testning tills du är nöjd.

### 6. Stoppa lokal server

- Tryck `Ctrl+C` i terminalen för att stoppa servern när du är klar.

### 7. Pusha till Vercel på nätet (när du är färdig)

- När utvecklingen är klar, committa och pusha dina ändringar till GitHub:
  ```
  git add .
  git commit -m "Uppdaterad weather app"
  git push origin main
  ```
- Vercel redeployar automatiskt från GitHub (förutsatt att du har kopplat repot tidigare via vercel.com).
- Din app är nu live på nätet (t.ex. `https://weather-app-kaptenkatthatt.vercel.app`).

## Felsökning

- **Fel på API-anrop**: Kontrollera att `.env.local` finns och innehåller rätt `API_KEY`. Kör `vercel dev` igen.
- **Portkonflikt**: Om port 3000 är upptagen, prova `vercel dev --port 4000`.
- **Vercel CLI-fel**: Uppdatera med `npm update -g vercel`.
- **API-nyckel exponeras**: Se till att du inte har `API_KEY` i klientkod — allt ska gå via `/api/openweather`.

Om du behöver mer hjälp, kolla Vercel-dokumentationen eller fråga vidare!</content>
<parameter name="filePath">/home/jonas/code/Portfolion/Projekt/Weather app/docs/LOCAL_DEVELOPMENT.md
