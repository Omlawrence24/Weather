        
        // 
        // var forecast = $("#forecast").appendTo($(cardbody1)).text(response);

        $(document).ready(function () {
            $(".searchBtn").on("click", function(){
            var searchValue = $("#search-value").val()
            $("#search-value").val("")
            getWeather(searchValue);

            });
            
            
            
            });
            
            
            
            function getWeather(searchValue) {
            
                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=cd110b8f7f9c9303ea50c9e68d261cb3",
                    method: "GET",
                    dataType: "json",
                }).then(function (response) {
                    // console.log(response)
                     storeHistory()
                    //var searchValue = $(".search-value").val()

                    
                    var historyEntry = $("<button>").appendTo(historyList).text(searchValue)
                    var weatherList = $("#weatherList").empty()
                    var cityName = $("<h3>").appendTo(weatherList).text(response.city.name);
                    var tempature = $("<p>").appendTo(weatherList).text("Temperature:  " + response.list[0].main.temp);
                    var hummidity = $("<p>").appendTo(weatherList).text("Humidity:  " + response.list[0].main.humidity);
                    var windSpeed = $("<p>").appendTo(weatherList).text("Wind Speed:  " + response.list[0].wind.speed + " MPH");
                    var button = document.getElementById("historyList");
                    button.onclick = function(){
        
                    //     var historySlot = searchValue.appendTo(weatherList)
                    //  document.historySlot.append(weatherList)
                    }
                    

                });
            }
             
            function getUv() {
                    var latt = uv.city.coord.lat
                    var long = uv.city.coord.lon
                    var urlUv = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latt + "&lon=" + long + "long&cnt={cnt}&appid=cd110b8f7f9c9303ea50c9e68d261cb3"

                $.ajax({
                    url: urlUv,
                    method: "GET",
                    dataType: "json",
                }).then(function (uv) {
                    console.log(uv)
                     var uvIndex = $("<p>").appendTo(weatherList).text(uv);
                });
            }
            
            function storeHistory() {
                var searchValue = $("#search-value").val()
                //var searchBtn = $(".searchBtn");
                //var storeCity =  [];
                 localStorage.setItem("History", searchValue);
                 //alert(localStorage.getItem(searchValue))
                 //storeCity.push(userCity)miami
            //console.log(localStorage.getItem("History"));
            }
            // JSON.parse(localStorage.getItem("History")) ||
            // for (let i = 0; i < userHistory + 1; i++) {
                 
            //     userhistory.appendTo($("#historyList"));
            // }
            
            // function replacetext() {
            // weatherList.replaceWith(userCity.attr({
            //         id: '#weatherList',
            //         value: userCity.text()
            //     }));
            
            //    userCity.insertAfter("#weatherList");
            
            // } 
            
            // function historyList () {
            // //     var historyList = [{""}]
            
            //     userCity.push(historyList){}