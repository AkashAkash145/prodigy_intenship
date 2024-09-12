const locationInput = document.getElementById('location-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const locationName = document.getElementById('location-name');
const currentWeather = document.getElementById('current-weather');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const apiKey = '0004105a41bd51bafe1fa8e75fad0010';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

getWeatherBtn.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    if (location) {
        try {
            const response = await fetch(`${apiEndpoint}?q=${location}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            console.error(error);
        }
    }
});

function displayWeatherData(data) {
    locationName.textContent = data.name;
    currentWeather.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    try {
        const response = await fetch(`${apiEndpoint}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error(error);
    }
});