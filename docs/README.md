# Weather App Project Documentation

## Introduction and Purpose

This is a weather application that fetches real-time data from Open Weather Maps API. The purpose was to learn how to work with API's and present the large amount of information from such an API in a comprehensible manner.

## Background and Inspiration

After doing a Weather App tutorial at Net Ninja for my Front End trade school, I got very interested in working with API's of different kinds. I decided to flesh out the app I made in the tutorial and make it look like the Swedish weather institutes website SMHI.se. They present the weather information in a very minimalistic and easy to grasp way which inspired me. Fast and easy digestion of the information in services like these with high amounts of data is key.

I also tried different ideas to put a personal spin on the project, some fell out better than others. My interest in geography led me to adding a flag API that gets the flag from the country of the selected city. I also looked into adding a couple of pictures from the selected city but found it unreliable. When experimenting with it I got unrelated pictures too often from the API's I tested.

## Requirements and Functionality

Key features:

- Fetch and display current weather (temperature, rain, wind).
- Show 5-day forecast.
- Show the country flag of selected city
- Handle user location input.

Functionality:

- Find weather for any city in the world
- Light/Dark mode based on time of day of selected city, or user choice.
- Display both current weather and a forecast
- Searched location and theme saved in local storage

## Technologies and Tools

- Built with Vanilla JS and ES Modules.
- Bootstrap for styling and UI https://getbootstrap.com/
- OpenWeatherMap weather API https://openweathermap.org/
- Flag CDN from https://flagpedia.net
- Netninja Weather app tutorial: https://netninja.dev/courses/modern-javascript-from-novice-to-ninja/lectures/31515766

## Design and Architecture

- Bootstrap handles theme switching and UI
- Vanilla JS handles API calling and functionality

Data flow: User input -> API request -> Parse response -> Display.

## Implementation and Code

[Outline steps: "Started with setting up the project, then integrated SMHI API. Key code snippet:"]

Started with the tutorial from Net Ninja about how to make a weather app with async functions. Basic functionality with Accuweather API. Because Accuweather only had a two week free trial I had to switch to another API, I found Openweather map's API to be very similar and easy to convert to.

Main challenges coding wise:

- API calling
- Digging into API responses to find where your data was and if some related data closeby also could be used.
- Structuring large amounts of data to be easily digested and quick to get an overview.
- Splitting code into parts with ES Modules to make it easier to work with.
