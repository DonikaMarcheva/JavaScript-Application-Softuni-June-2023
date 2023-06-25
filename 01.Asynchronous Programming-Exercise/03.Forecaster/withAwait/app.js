const conditions = {
    Sunny: '&#x2600',
    'Partly sunny': '&#x26C5',
    Overcast: '&#x2601',
    Rain: '&#x2614',
    Degrees: '&#176'
}
function attachEvents() {
    document.getElementById('submit').addEventListener('click',getWeather);
    
    async function getWeather(){
        const forecastContainer = document.getElementById('forecast');
        try{
        forecastContainer.style.display = 'block';
        const currentForecastContainer = document.querySelector('#current');
        Array.from(currentForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        let upcomingForecastContainer = document.querySelector('#current');
        Array.from(upcomingForecastContainer.querySelectorAll('div')).forEach((el, i) => {
            i !== 0 ? el.remove() : el;
        })
        const locationInput = document.getElementById('location');
        const locationName = locationInput.value;

        const url='http://localhost:3030/jsonstore/forecaster/locations';
        const response= await fetch(url);
        const data = await response.json();
        const townInfo=data.find(x=>x.name===locationName);
        
        createForecast(townInfo.code);
      locationInput.value='';
    }catch{
        forecastContainer.style.display = 'block';
        forecastContainer.innerHTML='Error';
    }
    }

        async function createForecast(code){
            const currentForecastContainer = document.querySelector('#current');
            let upcomingForecastContainer = document.querySelector('#upcoming');

            const urlToday=`http://localhost:3030/jsonstore/forecaster/today/${code}`;
            const urlUpcoming=`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

            const responseToday= await fetch(urlToday);
            const dataToday=await responseToday.json();
            const responseUpcoming= await fetch(urlUpcoming);
            const dataUpcoming=await responseUpcoming.json();

            const htmlReport=createToday(dataToday);
            currentForecastContainer.appendChild(htmlReport);

            const htmlUpcomingReport=createUpcoming(dataUpcoming);
            upcomingForecastContainer.appendChild(htmlUpcomingReport);

        }
    
    function createUpcoming(data){
        let forecastInfoDiv = createElements('div');
        forecastInfoDiv.classList.add('forecast-info');
        let day1html = createDayReport(data.forecast[0]);
        let day2html = createDayReport(data.forecast[1]);
        let day3html = createDayReport(data.forecast[2]);

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
        upcomingSymbolSpan.innerHTML = conditions[forecast.condition];

        let upcomingTempSpan = createElements('span');
        upcomingTempSpan.classList.add('forecast-data');
        upcomingTempSpan.innerHTML = `${forecast.low}${conditions['Degrees']}/${forecast.high}${conditions['Degrees']}`;

        let upcomingWeatherSpan = createElements('span');
        upcomingWeatherSpan.classList.add('forecast-data');
        upcomingWeatherSpan.textContent = forecast.condition;

        upcomingSpan.appendChild(upcomingSymbolSpan);
        upcomingSpan.appendChild(upcomingTempSpan);
        upcomingSpan.appendChild(upcomingWeatherSpan);
        return upcomingSpan;

    }
    function createToday(data){
        let forecastsDiv = createElements('div');
        forecastsDiv.classList.add('forecasts');
         
        let conditionSymbolSpan = createElements('span');
        conditionSymbolSpan.classList.add('condition', 'symbol');
        conditionSymbolSpan.innerHTML = conditions[data.forecast.condition];

        let conditionSpan = createElements('span');
        conditionSpan.classList.add('condition');

        let nameSpan = createElements('span');
        nameSpan.classList.add('forecast-data');
        nameSpan.textContent=data.name;

        let tempSpan = createElements('span');
        tempSpan.classList.add('forecast-data');
        tempSpan.textContent = `${data.forecast.low}°/${data.forecast.high}°`;

        let weatherSpan = createElements('span');
        weatherSpan.classList.add('forecast-data');
        weatherSpan.textContent = data.forecast.condition;

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
attachEvents();