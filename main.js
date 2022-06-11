let form = document.getElementById("form");
let search_bar = document.getElementById("search-bar");
let results = document.getElementById("results");
dayjs.extend(window.dayjs_plugin_utc);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "<h5 class='text-center'>Loading, please wait</h5>";
  fetch_data();
  search_bar.value = "";
});

let base = `https://api.openweathermap.org/data/2.5/weather`;
let password = `b3528849799fc69ab2e46bdd46794f25`;
let units = `metric`;
let city;
let api;

let fetch_data = async () => {
  city = search_bar.value;
  api = `${base}?q=${city}&units=${units}&appid=${password}`;

  return await fetch(api)
    .then((res) => {
      if (res.ok) {
        results.innerHTML = "";
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((res) => {
      console.log(res);
      results.innerHTML = print_results(res);
    })
    .catch(
      (err) =>
        (results.innerHTML = "<h5 class='text-center'>City not found</h5>")
    );
};

let print_results = (res) => {
  let { main, name, sys, weather, wind, timezone } = res;
  return `
  <h5 class="text-center text-capitalize mb-3">${name}, ${sys?.country}</h5>
      <div class="cards">
        <div class="card-1">
          <img src="http://openweathermap.org/img/wn/${weather
            .filter((x, y) => y === 0)
            .map((x) => x.icon)}@2x.png" alt="">
          <span class="fs-6 fw-semibold">${main.temp}° C</span>
          <span class="fw-lighter text-secondary">Temperature</span>
        </div>
        <div class="card-2">
          <i class="fs-2 bi bi-wind"></i>
          <span class="fs-6 fw-semibold">${wind.speed}km/h</span>
          <span class="fw-lighter text-secondary">Wind</span>
        </div>
        <div class="card-3">
          <i class="fs-2 bi bi-droplet"></i>
          <span class="fs-6 fw-semibold">${main.humidity}%</span>
          <span class="fw-lighter text-secondary">Humidity</span>
        </div>
        <div class="card-4">
          <i class="fs-2 bi bi-water"></i>
          <span class="fs-6 fw-semibold">${main.pressure} hPa</span>
          <span class="fw-lighter text-secondary">Pressure</span>
        </div>
        <div class="card-5">
        <i class="fs-2 bi bi-sunrise"></i>
        <span class="fs-6 fw-semibold">${hour_converter(
          sys.sunrise,
          timezone
        )}</span>
        <span class="fw-lighter text-secondary">Sun Rise</span>
        </div>
        <div class="card-6">
        <i class="fs-2 bi bi-sunset"></i>
        <span class="fs-6 fw-semibold">${hour_converter(
          sys.sunset,
          timezone
        )}</span>
        <span class="fw-lighter text-secondary">Sun Set</span>
        </div> 
        
      </div>
  `;
};

/**
 * ! Note : the timezone provided is in seconds format
 */

let hour_converter = (input, timezone) => {
  return dayjs
    .unix(input)
    .utc()
    .utcOffset(timezone / 3600)
    .format("h : mm A");
};
