## Bugs

Summarize both rain and snow prec?

## App general

Validate HTML & CSS

Make the background cover all the screen even on large screens.

"Renskriv" Figman och tag några bilder på den till dokumentationen.

- Gör olika vyer.
- Från början till slut.
- Brainstorming och sketchning.

## -----------------------DONE and DONE-------------------------

NOPE Göra om kollen för solUpp/ner baserat på forecast sys pod:d/n ? Eller använd sunset/sunrise-variablerna till att visa när solen går upp/ner också.

Fix language on forecast table to check for localLanguage at start.

Make switches start on the correct position based on language or units from localStorage.

Save language and unit settings to localStorage

Make the app less wide

Implement media queries

Testa om Vercel är lättare och har mer generöst med tokens.
Klödda med Netlify så jag kan få upp den där.

Språkstöd för engelska

Stöd för Fahrenheit

Fixa att temaväxlaren inte funkar med Hurva men med Askeröd, som inte har local_name heller. Funkar inte heller i Halmstad.

Stöd för nederbörd i snöform

Autofocus på sökrutan

Lägg in en koll om local name finns eller ej. Har den local name? Har den local name på svenska?

Felmeddelande om den inte hittar staden. Basera den på felet om att den inte hittar latituden(undefined).

- Dölja GUI:t
- Visa felmeddelande

  % chans för regn(POP)

- Gör kolumnerna lika breda så "känns som" hamnar en rad och och graden på nästa rad.

Fixa buggen med att knappen inte är kopplad till autoväxling på tema och därmed visar fel ibland.

Skriva dokumentation om projektet från början till slut. Inspiration från SMHI. Idéer som kommit och gått med foton som inte fungerade i praktiken.

Växla till Dark mode om det är natt i den staden man sökt fram?

✅Flaggor bredvid varje stadsnamn

# Forecast Table

✅Funktion som renderar tabellen. Istf att upprepa dagens väder fem gånger.

## ✅Highest and lowest temp of day

//Dygnets lägsta och högsta temp. 00-21
// Lägsta Ta alla mätpunkter på main.temp_min och plocka ut lägsta
// Högsta main.temp_max och plocka ut högsta

## ✅Wind speed average and max gust for a chosen day

✅ //Vind: högsta vind/byar under dagen
//function highestWind som tar in alla vindvärden för den dagen och plockar ut det högsta
:happy
✅//funktion som ska returnera alla mätningar för en dag och sen kolla max och min temp, medelvind och maxvind och summera nederbörd
//Vind högsta vind/byar under dagen
//function highestWind som tar in alla vindvärden för den dagen och plockar ut det högsta

## ✅Rain for all day

// Dygnets nederbörd räknas från sön 08:00 till sön 23:00.
//function daysRain

nederbördsArray.reduce för att slå ihop alla regnvärden för en dag.
Välj alla mätningar från kl 2-23, 8st.

### SKROTAT

Unsplash API:
https://unsplash.com/documentation#search-photos

Visa 3 bilder från staden i carousel, sök på natt/dag. Hämta från API.
