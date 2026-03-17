# Deploy till Vercel

Den här appen är nu ett Vite-projekt men använder fortfarande route `/api/openweather`.
I produktion hanteras den routen av serverless-funktionen i `api/openweather.js` på Vercel.

## Deploya och ersätt befintlig app

1. Pusha senaste ändringar till repot som är kopplat till din Vercel-app.
2. I Vercel-projektet (`project-weather-app`), kontrollera build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Lägg till miljövariabel i Vercel:
   - `API_KEY=DIN_OPENWEATHER_API_NYCKEL`
4. Trigger en ny deploy (via push eller `Redeploy` i Vercel UI).

Den nya deployen ersätter automatiskt den gamla på samma Vercel-projekt/domän.

## Viktigt

- `vercel.json` i projektroten styr build/output och function-config.
- API-funktionen ligger i `api/openweather.js` och används av frontend via `/api/openweather`.

## Snabb check efter deploy

- Öppna appen och sök en stad.
- Verifiera att väderdata laddas (dvs att `/api/openweather` svarar).
- Om API-anrop faller: kontrollera att `API_KEY` finns i Vercel Environment Variables och redeploya.
