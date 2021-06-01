import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [upload, setUpload] = useState(false);

  function getWeather(response) {
    setUpload(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2312e7899c189d46fb63d2d7ce28c492&units=metric`;
    axios.get(url).then(getWeather);
  }

  let form = (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Search city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (upload) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature:{Math.round(weather.temperature)}°C</li>
          <li>Description:{weather.description}</li>
          <li>Humdidty:{weather.humidity}%</li>
          <li>Wind:{weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
