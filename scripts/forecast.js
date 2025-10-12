//Get weather information
const getWeather = async (lat, lon) => {
  const base = `https://api.openweathermap.org/data/2.5/weather?`;
  const query = `lat=${lat}&lon=${lon}&units=metric&appid=${key}&lang=sv`;

  /* https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&&unit=metric&appid=a8ce3a9d3851c8bd1a775190c33a067e
   */

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data);
  return data;
};

//Get city information. Gets Key that is then used in getWeather to get the weather for that city.
const getCity = async (city) => {
  const base = "http://api.openweathermap.org/geo/1.0/direct";
  const query = `?q=${city}&limit=1&appid=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data[0]);

  return data[0];
};
/* getCity("manchester")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
 */
// getWeather("329260");
