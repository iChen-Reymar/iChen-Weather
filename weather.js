
   document.addEventListener('DOMContentLoaded', function() {
       const searchButton = document.getElementById('searchButton');
       const cityInput = document.getElementById('cityInput');
       const weatherContainer = document.getElementById('weather');

       async function fetchWeather(cityName) {
           const apiKey = '03826feecb66403b89e03733242208';
           const apiEndpoint = 'https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7';

           try {
               const response = await fetch(apiEndpoint);
               if (!response.ok) {
                   throw new Error('Network response was not ok');
               }
               const weatherData = await response.json();
               console.log(weatherData);

               weatherContainer.innerHTML = ''; // Clear previous results

               weatherData.forecast.forecastday.forEach(element => {
                   weatherContainer.innerHTML += `
                      <div class="weather-up">
                          <h2>${cityName}</h2>
                          <p><strong>Date:</strong> ${element.date}</p>
                          <p><strong>Temperature:</strong> ${element.day.avgtemp_c}°C</p>
                          <p><img src="https:${element.day.condition.icon}" alt="${element.day.condition.text}"></p>
                          <p><strong>Weather:</strong> ${element.day.condition.text}</p>
                          <p><strong>Humidity:</strong> ${element.day.avghumidity}%</p>
                      </div>
                   `;
               });
           } catch (error) {
               weatherContainer.innerHTML = <p>Unable to retrieve weather data: ${error.message}</p>;
           }
       }

       // Fetch weather for default city on page load
       fetchWeather('Iligan City');

       searchButton.addEventListener('click', () => {
           const cityName = cityInput.value.trim();
           if (cityName) {
               fetchWeather(cityName);
           }
       });
   });
  