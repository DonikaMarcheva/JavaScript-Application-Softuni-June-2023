function attachEvents() {
    let getWeatherButton = document.getElementById('submit');
    getWeatherButton.addEventListener('click', getWeatherHeandler);
    let locationInput = document.getElementById('location');
    let conditions = {
        Sunny: () => '☀',
        'Partly sunny': () => '⛅',
        Overcast: () => '☁',
        Rain: () => '☂',
        // Degrees: () => '°'
    }

    function getWeatherHeandler() {
        let forecastContainer = document.getElementById('forecast');
        forecastContainer.style.display = 'block';
        let currentForecastContainer = document.querySelector('#current');
        Array.from(currentForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        let upcomingForecastContainer = document.querySelector('#upcoming');
        Array.from(upcomingForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(body => body.json())
            .then(locations => {
                let locationName = locationInput.value;
                let location = locations.find(x => x.name === locationName);
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
                    .then(body => body.json())
                    .then(currentWeatherReport => ({ code: location.code, currentWeatherReport }))
            })
            .then(({ code, currentWeatherReport }) => {
                let htmlReport = createCurrentWeatherElements(currentWeatherReport);

                currentForecastContainer.appendChild(htmlReport);

                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            })
            .then(body => body.json())
            .then(upcomingWeatherReport => {
                let upcomingForecast = createUpcomingWeatherElement(upcomingWeatherReport);
                upcomingForecastContainer.appendChild(upcomingForecast);
            })
            .catch(err => {
                let errDiv = createElements('div', 'Error');
                errDiv.classList.add('label');
                currentForecastContainer.appendChild(errDiv);
            })

        function createUpcomingWeatherElement(weatherReport) {
            let forecastInfoDiv = createElements('div');
            forecastInfoDiv.classList.add('forecast-info');
            let day1html = createDayReport(weatherReport.forecast[0]);
            let day2html = createDayReport(weatherReport.forecast[1]);
            let day3html = createDayReport(weatherReport.forecast[2]);

            forecastInfoDiv.appendChild(day1html);
            forecastInfoDiv.appendChild(day2html);
            forecastInfoDiv.appendChild(day3html);
            return forecastInfoDiv;

        }
        function createDayReport(forecast) {

            let upcomingSpan = createElements('span');
            upcomingSpan.classList.add('upcoming');

            let upcomingSymbolSpan = createElements('span');
            upcomingSymbolSpan.classList.add('symbol');
            upcomingSymbolSpan.textContent = conditions[forecast.condition]();

            let upcomingTempSpan = createElements('span');
            upcomingTempSpan.classList.add('forecast-data');
            upcomingTempSpan.textContent = `${forecast.low}°/${forecast.high}°`;

            let upcomingWeatherSpan = createElements('span');
            upcomingWeatherSpan.classList.add('forecast-data');
            upcomingWeatherSpan.textContent = forecast.condition;

            upcomingSpan.appendChild(upcomingSymbolSpan);
            upcomingSpan.appendChild(upcomingTempSpan);
            upcomingSpan.appendChild(upcomingWeatherSpan);
            return upcomingSpan;

        }

        function createCurrentWeatherElements(weatherReport) {
            let forecastsDiv = createElements('div');
            forecastsDiv.classList.add('forecasts');

            let conditionSymbolSpan = createElements('span');
            conditionSymbolSpan.classList.add('condition', 'symbol');
            conditionSymbolSpan.textContent = conditions[weatherReport.forecast.condition]();

            let conditionSpan = createElements('span');
            conditionSpan.classList.add('condition');

            let nameSpan = createElements('span');
            nameSpan.classList.add('forecast-data');
            nameSpan.textContent = weatherReport.name;

            let tempSpan = createElements('span');
            tempSpan.classList.add('forecast-data');
            tempSpan.textContent = `${weatherReport.forecast.low}°/${weatherReport.forecast.high}°`;

            let weatherSpan = createElements('span');
            weatherSpan.classList.add('forecast-data');
            weatherSpan.textContent = weatherReport.forecast.condition;

            conditionSpan.appendChild(nameSpan);
            conditionSpan.appendChild(tempSpan);
            conditionSpan.appendChild(weatherSpan);

            forecastsDiv.appendChild(conditionSymbolSpan);
            forecastsDiv.appendChild(conditionSpan);
            return forecastsDiv;
        }


        function createElements(tagname, content) {
            let el = document.createElement(`${tagname}`);
            if (content) {
                el.textContent = content;
            }
            return el;
        }
    }
}

attachEvents();