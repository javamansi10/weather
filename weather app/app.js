function getweather(){

    const apiKey = '085e7bb10ac40cb29710eb4f323e576f';
    const city = document.getElementById('city').value;

 if (!city) {
    alert('please enter a city');
    return;
 }

 const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
 const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
 
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayweather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. please try again.');
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. please try again.');
    });
}
function displayweather(data) {

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const HourlyForecastDiv = document.getElementById('hourly-forecast');

    // clear previous content
    weatherInfoDiv.innerHTML = ``;
    HourlyForecastDiv.innerHTML = ``;
    tempDivInfo.innerHTML = ``;

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = '<p>${data.massage}</p>';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp-273.15);
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconcode}10d@2x.png`;
  
        const temperatureHTML =`
     <p>${temperature}°C</p>
        `;

        const weatherHTML =` 
        <p>${cityName}</p>
        <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
     weatherInfoDiv.innerHTML = weatherHTML;
     weatherIcon.src = iconUrl
     weatherIcon.alt = description;

     showImage();
    }
} 
function displayHourlyForecast(hourlyData) {

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {

        const dateTime = new Data(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}/10dx@2x.png`;
        
        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly weather Icon">
            <span>${temperature}°C</span>
        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    
     });

}

 function displayHourlyForecast(hourlyData) {

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {

        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn${iconCode}/10d@2x.png`;
        
        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly weather Icon">
            <span>${temperature}°C</span>
        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    
     });

}

function showImage() {

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';

}