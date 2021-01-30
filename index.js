
// 
// 
$(document).ready(function () {
    $(".searchBtn").on("click", function () {
        var searchValue = $("#search-value").val()
        $("#search-value").val("")
        getWeather(searchValue);
        createWeatherBtn(searchValue)
    });
 if (localStorage.getItem("history") != null) {
JSON.parse(localStorage.getItem("history")).forEach(cityBtn => {
    createWeatherBtn(cityBtn)
})

 }


});

 function createWeatherBtn (city) {
  $("#historyList").append(`<button onclick="javascript:getWeather('${city}')" >${city}</button>`)   

 }


function getWeather(searchValue) {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=cd110b8f7f9c9303ea50c9e68d261cb3",
        method: "GET",
        dataType: "json",
    }).then(function (response) {
        console.log(response);
        storeHistory(searchValue);

        forecast(response.city.coord.lat, response.city.coord.lon);
       // $("<button>").appendTo(historyList).text(searchValue);
        $("#weatherList").empty();
        $("<h3>").appendTo(weatherList).text(response.city.name);
        $("<p>").appendTo(weatherList).text("Temperature:  " + response.list[0].main.temp);
        $("<p>").appendTo(weatherList).text("Humidity:  " + response.list[0].main.humidity);
        $("<p>").appendTo(weatherList).text("Wind Speed:  " + response.list[0].wind.speed + " MPH");
         
    });
}

// $("#historyList").on("click", function () {
//     getWeather()
//     // var historySlot = searchValue.appendTo(weatherList)
//     // document.historySlot.append(weatherList)
// });



function forecast(lat, lon) {
    
    var urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f14d9b76ec9372ef96ee61a166296635`;
    $.ajax({
        url: urlForecast,
        method: "GET",
        dataType: "json",
    }).then(function (response) {
        console.log("forecast data:");
        console.log(response);
       renderWeather(response)

    });
}


function renderWeather (weatherData) {
    $("#forecast-row").empty()
  weatherData.daily.splice(0,5).forEach(weather => {
      $("#forecast-row").append(`
        <div class="col card text-white bg-primary mx-2" style="max-width: 18rem;">
              <h4 class="card-header"> 1/13/2021 </h4>
              <div id="forecast" class="card-body"> 
                <h4 class="card-title"> sunny</h4>
                <h3 class="card-text">Temp: ${weather.temp.day}</h3> 
                <h3 class="card-text">Humidity: ${weather.humidity}</h3>
              </div>
              </p>
          </div>
    `)
  })
    
    // $("<p>").appendTo(".card-header").text(weatherData.city)
    // $("<p>").appendTo($("#forecast")).text(weatherData.daily[0].humidity)
    // $("<p>").appendTo($("#forecast")).text(weatherData.daily[0].temp.day)
    // $(forecastBox).appendTo($("#forecast"));

}






function storeHistory(city) {

    //var searchBtn = $(".searchBtn");
    var storeCity = localStorage.getItem("history") != null ? JSON.parse(localStorage.getItem("history")) : []
    storeCity.push(city)
    localStorage.setItem("history", JSON.stringify(storeCity));
   
           
}
    