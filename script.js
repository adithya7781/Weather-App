const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '7bf67d1da70961be2dc285d3cc894cec';

$(document).ready(function () {
    weatherFn('Hyderabad'); // Default city to display weather data
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);

    // Get the icon code and construct the icon URL
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Set the icon URL to the image element
    $('#weather-icon').attr('src', iconUrl);

    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-info').fadeIn();
}
