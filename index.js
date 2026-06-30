async function getWeather() {

    let city = document.getElementById("city").value;

    // Geocoding API
    let geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    let geoData = await geo.json();

    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;

    // Weather API
    let weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    let data = await weather.json();

    let time = data.current_weather.time;

    console.log(data.current_weather.is_day);

    // Day / Night background
    if (data.current_weather.is_day === 1) {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1603437873662-dc1f44901825?w=900')";
    } else {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1644515172713-f340282f2ab1?q=80&w=2070&auto=format&fit=crop')";
    }

    // Date
    let date = new Date(time);
    let day = date.toDateString();

    document.getElementById("day").innerHTML = day;

    // Weather data
    document.getElementById("temp").innerText =
        data.current_weather.temperature + " °C";

    document.getElementById("wind").innerText =
        "Wind Speed: " + data.current_weather.windspeed + " K/h";

    document.getElementById("pressure").innerText =
        "Wind Direction: " + data.current_weather.winddirection + " °";

    let update;
    let code = data.current_weather.weathercode;

    // Weather conditions
    if (code == 0) {
        update = "Clear Sky";
        icon.innerText = "🌞";
    }

    else if (code <= 3) {
        update = "Cloudy";
        icon.innerText = "🌩️";
    }

    else if (code <= 48) {
        update = "Fog";
        icon.innerText = "😶‍🌫️";
    }

    else if (code <= 67) {
        update = "Rain";
        icon.innerText = "🌧️";
    }

    else if (code <= 77) {
        update = "Snow";
        icon.innerText = "❄️";
    }

    else {
        update = "Thunderstorm";
        icon.innerText = "🌪️";
    }

    document.getElementById("update").innerText = update;
}
