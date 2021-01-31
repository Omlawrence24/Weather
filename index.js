
// THIS STARTS MY CODE CONSISTS OF MAIN BUTTON/FUNCTION CALLS/SEARCH VALUE
$(document).ready(function () {
    $(".searchBtn").on("click", function () {
        var searchValue = $("#search-value").val()
        //CLEARS THE INPUT FIELD
        $("#search-value").val("")
        //CALLS AJAX AND WEATHER OUTPUT
        getWeather(searchValue);
        //CREATE WEATHER BUTTON
        createWeatherBtn(searchValue)
    });

    //LOCAL STORAGE ALLOW THE SITE TO GRAB PREVIOUS SEARCHES
 if (localStorage.getItem("history") != null) {
JSON.parse(localStorage.getItem("history")).forEach(cityBtn => {
    createWeatherBtn(cityBtn)
})

 }


});
// CREATES THE BUTTON W/ IN HISTORY LIST TO ALLOW CLICK REACTION
 function createWeatherBtn (city) {
  $("#historyList").append(`<button onclick="javascript:getWeather('${city}')" >${city}</button>`)   

 }

// INITIAL API FUNCTION THAT "GETS" WEATHERLIST INFO 
function getWeather(searchValue) {

    //THE INITIAL API W/ INTERCHANGLEABLE CITY VALUE CACANATED 
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=cd110b8f7f9c9303ea50c9e68d261cb3",
        method: "GET",
        dataType: "json",
    }).then(function (response) {
        console.log(response);

        //THIS STORES THE USER INPUT IN LOCAL STORAGE
        storeHistory(searchValue);
        // CALLS THE MAIN INFO FOR CITY WEATHER
        forecast(response.city.coord.lat, response.city.coord.lon);
        //CLEARS THE MAIN CARD SO THAT A NEW CITY APPEARS IN MAIN CARD 
        $("#weatherList").empty();
        
        $("<h3>").appendTo(weatherList).text(response.city.name);
        $("<p>").appendTo(weatherList).text("Temperature:  " + response.list[0].main.temp);
        $("<p>").appendTo(weatherList).text("Humidity:  " + response.list[0].main.humidity);
        $("<p>").appendTo(weatherList).text("Wind Speed:  " + response.list[0].wind.speed + " MPH");
        
         
    });
}
//THIS FUNCTION CREATES MY 5 FORECASTS
function forecast(lat, lon) {
    
    //CUSTOM API CALL FOR UV INDEX AND FORECAST DETAILS
    var urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f14d9b76ec9372ef96ee61a166296635`;
    $.ajax({
        url: urlForecast,
        method: "GET",
        dataType: "json",
    }).then(function (response) {
        console.log("forecast data:");
        console.log(response);
       renderWeather(response)
       //THIS CREATES THE UV ON PAGE 
     $("<p>").appendTo(weatherList).text("UV Index:  " + response.current.uvi);
    });
}

// THIS FUNCTION CREATE THE ACT OF PENDING THE FIVE FORECASTS ON PAGE 
function renderWeather (weatherData) {
    $("#forecast-row").empty()

    // CREATED A FOR LOOP THAT WOULD ONLY DISPLAY UP TO 5
    //CREATED A PARA TO ENABLE MULTI VALUES TO PASS THROUGH FUNCTION 
    // THIS METHOD LITERALLY RECREATES THE CARD REPEAT 
  weatherData.daily.splice(0,5).forEach(weather => {
      $("#forecast-row").append(`
        <div class="col card text-white bg-primary mx-2" style="max-width: 18rem;">
              <h4 class="card-header"> 1/13/2021 </h4>
              <div id="forecast" class="card-body"> 
                <h4 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-minus" viewBox="0 0 16 16">
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
              </svg></h4>
                <h3 class="card-text">Temp: ${weather.temp.day}</h3> 
                <h3 class="card-text">Humidity: ${weather.humidity}</h3>
              </div>
              </p>
          </div>
    `)
  })
    
}





// THIS FUNCTION STORES ALL DATA TO THE LOCAL STORAGE AND ALLOWS  PREVIOUS CITIES TO 
//STAY ON PAGE AND CREATE A HISTORY LIST
//THIS ALSO IS CREATING AN ARRAY THAT PUSHES THIS SEARCHES INTO AN ARRAY WHICH ENABLES YOU PULL THEM OUT LATER

function storeHistory(city) {

    var storeCity = localStorage.getItem("history") != null ? JSON.parse(localStorage.getItem("history")) : []
    storeCity.push(city)
    localStorage.setItem("history", JSON.stringify(storeCity));
   
           
}
    