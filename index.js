const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const input = document.getElementById("input")
    const weatherdetails = document.getElementById("weatherdetails")

    var inputValue = input.value.trim();
    if (inputValue) {
        const apiKey = "2112be72875cfac7c3f6e256a278af1a";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => {
                if (!response) {
                    weatherdetails.innerHTML = "Network response was not ok"
                }

                return response.json()
            })

            .then((data) => {
                getWeather(data)
            })
            .catch((error) => {
                if (error.message == "Failed to fetch") {
                    weatherdetails.innerHTML = error.message;
                } else {
                    weatherdetails.innerHTML = "<h3>Invalid City Name</h3>"

                }

            })
    }
    else {
        weatherdetails.innerHTML = "<h3>Please Write The Location</h3>"
    }

    input.value = ""
})

function getWeather(data) {
    const city = data.name;
    const temperature = data.main.temp;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const lon = data.coord.lon;
    const lat = data.coord.lat;


    weatherdetails.innerHTML = `
                                <h3>City: ${city}</h3>
                                 <h4>Temperature: ${temperature}°C</h4>
                                 <h4>Pressure: ${pressure}°C</h4>
                                 <h4>Humidity: ${humidity}°C</h4>
                                 <h4>Wind Speed: ${windSpeed}°C</h4>
                                 <h4>Description: ${description}</h4>
                                 <h4>Longitude: ${lon}</h4>
                                 <h4>Latitude: ${lat}</h4>
                                 `;
}





