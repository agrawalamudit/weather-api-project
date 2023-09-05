let your_weather_btn = document.querySelector("#your-weather-btn");
let search_btn = document.querySelector("#search-btn");

//screens contains - [.screen-one ,.screen-two , .screen-three]
let screens = document.querySelectorAll(".screen");

let search_icon = document.querySelector(".search-bar p");

// [screen-one , screen-three] - temprature ,weather and location
let locat_screens = document.querySelectorAll(".location h2");
let weather_screens = document.querySelectorAll(".icon-head h4");
let temp_screens = document.querySelectorAll(".temprature h2");

//cards_yours - [windspeed,humidity,clouds]
let cards_yours = document.querySelectorAll(".screen-one .cards p");
let cards_searched = document.querySelectorAll(".screen-three .cards p");

let input_value = document.querySelector(".search-bar input");

let API_key = "a28bf24ad9b0570276e2087d0b29b227";
var lat, longi;

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(await showPosition);
  } else {
    console.log("no geolocation support");
  }
}
function showPosition(position) {
  lat = position.coords.latitude;
  longi = position.coords.longitude;
  console.log(lat, longi);

  // return async (lat,longi) => {
  //     let response =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_key}`);
  // };

  showWeather(
    "jaipur",
    locat_screens[0],
    weather_screens[0],
    temp_screens[0],
    cards_yours[0],
    cards_yours[1],
    cards_yours[2],
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&units=imperial&appid=${API_key}`
  );
}
getLocation();

//for screen-one

// setTimeout(() => {window.onload = () => {
//     showWeather("jaipur",locat_screens[0],weather_screens[0],temp_screens[0],cards_yours[0],cards_yours[1],cards_yours[2],`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${26.8894208}&lon=${75.7825536}&appid=${API_key}`);
// }},0);

your_weather_btn.onclick = () => {
  your_weather_btn.style.backgroundColor = "rgba(255, 255, 255, 0.612)";
  search_btn.style.backgroundColor = "transparent";
  screens[0].style.display = "block";
  screens[1].style.display = "none";
  screens[2].style.display = "none";
};

search_btn.onclick = () => {
  your_weather_btn.style.backgroundColor = "transparent";
  search_btn.style.backgroundColor = "rgba(255, 255, 255, 0.612)";
  screens[0].style.display = "none";
  screens[1].style.display = "block";
  screens[1].style.height = "274px";
  screens[2].style.display = "none";
};

search_icon.onclick = () => {
  //screen-three display
  screens[0].style.display = "none";
  screens[1].style.display = "block";
  screens[1].style.height = "auto";
  screens[2].style.display = "block";
  showWeather(
    input_value.value,
    locat_screens[1],
    weather_screens[1],
    temp_screens[1],
    cards_searched[0],
    cards_searched[1],
    cards_searched[2],
    `https://api.openweathermap.org/data/2.5/weather?q=${input_value.value}&appid=${API_key}`
  );
};

async function showWeather(
  city,
  location,
  weather,
  temp,
  windspeed,
  humid,
  cloud,
  api
) {
  const response = await fetch(api);

  // console.log(response);

  const data = await response.json();

  console.log(data);
  console.log(`${data?.main?.temp.toFixed(2)}° c`);

  location.textContent = data.name;
  weather.textContent = `${data.weather[0].main}`;
  temp.textContent = `${data?.main?.temp.toFixed(2)}° c`;

  //cards value
  windspeed.textContent = `${data.wind.speed}m/s`;
  humid.textContent = `${data.main.humidity}%`;
  cloud.textContent = `${data.clouds.all}%`;

  // console.log(`${data.wind.speed}`)
  // console.log(`${data.main .humidity}`);
  // console.log(`${data.clouds.all}`);
}
