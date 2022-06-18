let weather = {
  // Untuk define weathernya, apiKey digenerate dari https://openweathermap.org/api Current Weather Data , 1000 call/day
  apiKey: "789bd3b4a21e9ac020c2c093620ae4b5",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
      
    )
      .then((response) => {
        // if (city = "") {
        //   alert("Tolong masukkan nama Kota.");
        //   console.log("Tolong masukkan nama Kota.");
        //   throw new Error("Tolong masukkan nama Kota.");
          //  && city !== ""
        // }
        if (!response.ok) {
          if (city === "") {
            alert("Tolong masukkan nama Kota.");
            throw new Error("Tolong masukkan nama Kota.");
          } else {
            alert("Cuaca pada Kota " +city+ " Tidak Ditemukan.");
            console.log("Kota tidak ditemukan");
            throw new Error("Kota tidak ditemukan.");
          }
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    // Menampilkan Weather yang sudah di get
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Cuaca di " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Kelembaban Udara : " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Kecepatan Angin : " + speed + " km/jam";
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(".container-bg").style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
console.log(weather.apiKey);

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// weather.fetchWeather("");
