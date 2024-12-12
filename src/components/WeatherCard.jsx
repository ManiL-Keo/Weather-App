import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "../assets/images/search.png";
import clearIcon from "../assets/images/clear.png";
import cloudsIcon from "../assets/images/clouds.png";
import drizzleIcon from "../assets/images/drizzle.png";
import humidityIcon from "../assets/images/humidity.png";
import rainIcon from "../assets/images/rain.png";
import snowIcon from "../assets/images/snow.png";
import windIcon from "../assets/images/wind.png";
import "./WeatherCard.css";

const WeatherCard = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudsIcon,
    "02n": cloudsIcon,
    "03d": cloudsIcon,
    "03n": cloudsIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async (city) => {
    if (city == "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData();
      console.error("Error in fetching weather data...");
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="WeatherCard">
      <div className="Search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        <img
          src={SearchIcon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img className="WeatherIcon" src={weatherData.icon} alt="" />
          <p className="Temperature">{weatherData.temperature}°C</p>
          <p className="Location">{weatherData.location}</p>
          <div className="Weather-Data">
            <div className="col">
              <img src={humidityIcon} alt="" />
              <div>
                <p className="humidity">{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="" />
              <div>
                <p className="WindSpeed">{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeatherCard;
