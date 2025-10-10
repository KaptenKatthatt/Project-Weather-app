const cityForm = document.querySelector("form");

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets, //Om både nyckeln och värdet har samma namn räcker det att man skriver det en gång.
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //Update UI with the new city
  updateCity(city)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
