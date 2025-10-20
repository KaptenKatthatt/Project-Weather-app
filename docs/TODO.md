App generellt
Animerade väderikoner? Kanske bara på vänstra kortet
✅Flaggor bredvid varje stadsnamn

Felmeddelande om den inte hittar staden. Basera den på felet om att den inte hittar latituden.

Forecast Table
// Dygnets nederbörd räknas från sön 08:00 till sön 23:00.
//function daysRain

//Vind högsta vind/byar under dagen
//function highestWind som tar in alla vindvärden för den dagen och plockar ut det högsta

Visa landsflagga bredvid stadens namn
Mål: Visa landsflagga bredvid varje stadsnamn i UI baserat på landskod från OpenWeatherMap.

## Flaggor bredvid varje stadsnamn

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
