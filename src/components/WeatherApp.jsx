import React, { useEffect, useState } from "react";
import './../App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedCard from "./weatherCard";
import Article from "./Article";
// import Question from "./Question";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [hrWeatherData, setHrWeatherData] = useState(null);
    const [dayWeatherData, setDayWeatherData] = useState(null);
    const [newsData, setNewsWeatherData] = useState(null);
    const [loc, setLoc] = useState(false)

    // useEffect(() => {
    //     const fetchLatLon = async (city, state, country) => {
    //         const API_KEY = import.meta.env.VITE_API_KEY;
    //         const url = new URL("https://api.openweathermap.org/geo/1.0/direct?q=Philadelphia,PA,US,")
    //         url.searchParams.append("appid", API_KEY)
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         console.log(data[0]["lat"]);
    //         console.log(data[0]["lon"]);
    //         setWeatherData(data);
    //     };
    //     // fetchLatLon();
    // }, []);

    async function fetchLatLon(e) {
        e.preventDefault()
        
        // get values
        const city = e.target[0]["value"]
        const state = e.target[1]["value"]
        const country = e.target[2]["value"]
        const API_KEY_WEATHER = import.meta.env.VITE_API_KEY_WEATHER;
        const API_KEY_NEWS = import.meta.env.VITE_API_KEY_NEWS

        // create url
        const url1 = new URL("https://api.openweathermap.org/geo/1.0/direct?");
        url1.searchParams.append("q", city + "," + state + "," + country);
        url1.searchParams.append("appid", API_KEY_WEATHER)
        
        // get response
        const response = await fetch(url1);
        const data = await response.json();
        const lat = data[0]["lat"];
        const lon = data[0]["lon"];
        setLoc({"city": e.target[0]["value"], "state": e.target[1]["value"], "country": e.target[2]["value"]});

        // current weather response
        const url2 = new URL("https://api.openweathermap.org/data/2.5/weather?");
        url2.searchParams.append("lat", lat);
        url2.searchParams.append("lon", lon);
        url2.searchParams.append("appid", API_KEY_WEATHER)
        const curr_weather = await fetch(url2);
        const curr_weather_data = await curr_weather.json();
        setWeatherData(curr_weather_data);

        // hourly forecast
        const url3 = new URL("https://pro.openweathermap.org/data/2.5/forecast/hourly?");
        console.log(url3);
        url3.searchParams.append("lat", lat);
        url3.searchParams.append("lon", lon);
        url3.searchParams.append("appid", API_KEY_WEATHER)
        const hr_weather = await fetch(url3);
        const hr_weather_data = await hr_weather.json();
        console.log(hr_weather_data);
        setHrWeatherData(hr_weather_data);

        // daily forecast
        const url4 = new URL("https://api.openweathermap.org/data/2.5/forecast/daily?");
        url4.searchParams.append("lat", lat);
        url4.searchParams.append("lon", lon);
        url4.searchParams.append("cnt", 7);
        url4.searchParams.append("appid", API_KEY_WEATHER)
        const day_weather = await fetch(url4);
        const day_weather_data = await day_weather.json();
        console.log(day_weather_data);
        setDayWeatherData(day_weather_data);

        // news
        const url5 = new URL("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?");
        url5.searchParams.append("api-key", API_KEY_NEWS)
        console.log(url5);
        const news = await fetch(url5);
        const news_data = await news.json();
        console.log(news_data);
        setNewsWeatherData(news_data);
    }

    return (
        <>
            <h1>Weather App</h1>
            <form method="POST" onSubmit={fetchLatLon}>
                <TextField id="standard-basic" label="City" variant="standard" />
                <TextField id="standard-basic" label="State" variant="standard" />
                <TextField id="standard-basic" label="Country" variant="standard" />
                <p>
                    <Button type="submit" id="sub-button" variant="outlined">Submit</Button>
                </p>
            </form>
            <h3>Current Weather</h3>
            <div className="curr-container">
                {weatherData && <OutlinedCard city={loc["city"]} weather={weatherData["weather"][0]} main={weatherData["main"]} time="current" size={600}/>}
            </div>
            <h3>Hourly Forcast</h3>
            <div className="hourly-container">
                {hrWeatherData && hrWeatherData['list'].slice(0, 24).map((hr, i) => (
                    <div key={i} className="hourly">
                        <OutlinedCard city={loc["city"]} weather={hr["weather"][0]} main={hr["main"]} time={"+" + (i + 1) + " hour(s)"} size={250}/>
                    </div>
                ))}
            </div>
            <h3>Daily Forcast</h3>
            <div className="hourly-container">
                {dayWeatherData && dayWeatherData['list'].map((day, i) => (
                    <div key={i} className="hourly">
                        <OutlinedCard key={i} city={loc["city"]} weather={day["weather"][0]} main={{"temp": day["temp"]["day"], "temp_min": day["temp"]["min"], "temp_max": day["temp"]["max"]}} time={"+" + (i + 1) + " day(s)"} size={250}/>
                    </div>
                ))}
            </div>
            <h3>Articles</h3>
            <div className="hourly-container">
                {newsData && newsData['results'].slice(0, 5).map((article, i) => (
                    <div key={i} className="hourly">
                        <Article title={article['title']} author={article['byline']} abs={article['abstract']} url={article["url"]}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WeatherApp;