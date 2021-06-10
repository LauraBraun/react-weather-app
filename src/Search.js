import React, { useState } from "react";
import Weather from "./Weather"
import axios from "axios";
import FormatDate from "./FormatDate"
import "./Search.css"

export default function Search(props) {
 const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState("");
  const [upload, setUpload] = useState(false);

  function getWeather(response) {
    setUpload(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      city: response.data.name,
      date: new Date (response.data.dt * 1000)
    });
  }

 function updateCity(event) {
 setCity(event.target.value);
  }

  function search () {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2312e7899c189d46fb63d2d7ce28c492&units=metric`;
    axios.get(url).then(getWeather);
  }

  function handleSearch(event) {
    event.preventdefault();
    Search()
  }

  let form = ( <div className="Search">
        <header>
        <div className="row">
          <div className="col-sm">
           <form id="citysearch" onSubmit= {handleSearch}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search City"
                  aria-label="Search City"
                  aria-describedby="button-addon2"
                  id="search-city"
                  onChange={updateCity}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                >Search</button>
              </div>
            </form>
            <section id="displayCurrentWeather">
              <button className="btn btn-outline-secondary" id="coordinates">
                            Current location
              </button>
              <br/>
             <img src={weather.icon} alt={weather.description}/>
              <span className="currentTemp">{weather.temperature}</span>
              <button id="degreeConversion">°C</button>
            </section>
          </div>
          <ul className="col">
            <li id="displayCity">{weather.city}</li>
            <li id="currentDay">Friday</li>
            <li id="currentDate"><FormatDate date={weather.date} /></li>
            <br />
            <br />
            <li id="weatherDescription" className="text-capitalize">{weather.description}</li>
            <li id="humidity">Humidity: {weather.humidity}%</li>
            <li id="windspeed">Wind: {weather.wind} m/s</li>
            <li id="precipitation">Precipitation: 0 %</li>
          </ul>
        </div>
      </header>

      <br />

      <footer>
        <div className="row" id="forecast"></div>
      </footer>
    </div>
     
  );

  if (upload) {
    return (
      <div>
        {form}
        <Weather data={Weather}/>
      </div>
    );
  } else {
    search();
    return "Loading....";
  }
}
