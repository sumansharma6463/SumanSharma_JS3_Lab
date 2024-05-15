const api = {
    key: "19ad8e13d960eaaa406a42fa9c1c9e2d",
    base: "https://api.openweathermap.org/data/2.5/weather"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    getWeatherInfo(searchBox.value);
  }
}

function getWeatherInfo(query) {
    const url = `${api.base}?q=${query}&units=metric&appid=${api.key}`;
    fetch(url)
        .then(response => response.json())
        .then(weatherResponse => {
            if (weatherResponse.cod === 200) {
                displayResults(weatherResponse);
            } else {
                alert(weatherResponse.message);
            }
        })
        .catch(err => console.log(err));
}

function displayResults(weatherInfo) {
    let city = document.querySelector('.city');
    city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherInfo.main.temp)}<span>°C</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weatherInfo.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weatherInfo.main.temp_min)}°C / ${Math.round(weatherInfo.main.temp_max)}°C`;
}

function dateBuilder(d) {
    const DATE_FORMAT_OPTIONS = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: "short",
    }
    return d.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS)
}