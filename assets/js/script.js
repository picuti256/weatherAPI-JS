// Variaveis
const apiKey = "4b45b7beb322acd968517a21e58b5787"; //-> Para conseguir a API Key é necessário realizar o cadastro no site https://openweathermap.org
const apiCountry = "https://countryflagsapi.com/png/";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement= document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const minTempeture = document.querySelector("#minTemp span");
const maxTempeture = document.querySelector("#maxTemp span");
const feelsLike = document.querySelector("#feelsLike span")
const umidtyElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data")

// Funções

//Function to access API data
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

//Function to get API Data
const showWeatherData = async(city) =>{
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = data.main.temp.toFixed(1);
    minTempeture.innerText = data.main.temp_min.toFixed(1);
    maxTempeture.innerText = data.main.temp_max.toFixed(1);
    feelsLike.innerText = data.main.feels_like.toFixed(1);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountry + data.sys.country);
    umidtyElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${parseInt(data.wind.speed)}KM/h`;

    weatherContainer.classList.remove("hide");
}

const verifyIfIsCity = async () => {
    const city = await getWeatherData(city)

    let verifyCity = city.cod;
    return verifyCity
}


// Eventos

//Evento do botão para pegar os dados.
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;

    try{
        showWeatherData(city);
    } catch(e) {
        window.alert("Cidade inexistente, por favor verificar.")
    }

})

cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city);
    }
})
