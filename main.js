let form = document.getElementById("form");
let search_bar = document.getElementById("search-bar");
let results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "Loading, please wait";
  fetch_data();
  search_bar.value = "";
});

let base = `https://api.openweathermap.org/data/2.5/weather`;
let password = `b3528849799fc69ab2e46bdd46794f25`;
let city;
let api;

let fetch_data = async () => {
  city = search_bar.value;
  api = `${base}?q=${city}&appid=${password}`;

  return await fetch(`${base}?q=${city}&appid=${password}`)
    .then((res) => {
      if (res.ok) {
        results.innerHTML = "";
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((res) => console.log(res))
    .catch((err) => (results.innerHTML = "City not found"));
};
