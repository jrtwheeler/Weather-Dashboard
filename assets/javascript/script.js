//Use JQuery to select elements in HTML
var city = $("#city-input");
var city_list = $(".input-list");
var card_header = $(".city");
var cityinput;
var city_list_item;
var searchButton = $("#search-button");
var clearButton = $("#clear-button");
var temperature = $(".temperature");
var humidity = $(".humidity");
var wind_speed = $(".wind-speed");
var weather_img = $(".weather-image");
var uv_index = $(".uv-index");
var daily_forecast_card = $(".daily-forecast-cards");
var forecast_cards = $(".forecast-cards");
var first_forecast = $(".one");
var second_forecast = $(".two");
var third_forecast = $(".three");
var fourth_forecast = $(".four");
var fifth_forecast = $(".five");

//Use moment() for the dates
var date = moment().get("date");
var month = moment().get("month");
var date_div = $(".date");
var displayTime = moment().format("dddd, MMMM Do");
var date_div_text = date_div.text(displayTime);

//API Key for Weather
var key = "9d93230f3ad2bc78a7973c5234d7ba2e";

//If the local storage search history is cleared, cityinput field is set to "Enter city name", else cityinput is set to last searched name
if (!JSON.parse(localStorage.getItem("city"))) {
  cityinput = "Enter city name";
} else {
  cityinput = city.val(getLocal("city"));
}

//Hide the daily forecast and five day forecast cards
daily_forecast_card.hide();
forecast_cards.hide();

//This function saves a key and stringified variable to local storage
function saveLocal(key, search) {
  localStorage.setItem(key, JSON.stringify(search));
}

//This function returns a value from a key in local storage
function getLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

//This function builds the button list element for each city the user enters and stores in local storage
function renderRows() {
  //This is the button created when a user enters a name in the city-input field
  var city_list_item = $("<button>")
    .addClass("list-group-item m-2 col-12")
    .text(getLocal("city"));
  //The button is appended to the city_list div
  city_list.append(city_list_item);
  //When the button is clicked ...
  city_list_item.on("click", function () {
    //it returns and locally saves the button text as the new city variable for the api call ...
    cityinput = city_list_item.text();
    saveLocal("city", cityinput);
    //and then it calls the ajax call function
    ajax_calls();
  });
}

function ajax_calls() {
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    getLocal("city") +
    "&appid=" +
    key;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    //Return the results in an object

    var lat = response.city.coord.lat;
    var long = response.city.coord.lon;

    var result = response;
    card_header.text(result.city.name);
    var icon = result.list[0].weather[0].icon;
    var description = result.list[0].weather[0].description;
    var farenheight = Math.floor(
      (parseInt(result.list[0].main.temp) * 9) / 5 - 459.67
    );
    weather_img.attr(
      "src",
      "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    );
    weather_img.attr("alt", description);
    temperature.text("Temperature: " + farenheight + "°F");
    humidity.text("Humidity: " + result.list[0].main.humidity + "%");
    wind_speed.text("Wind Speed: " + result.list[0].wind.speed + "mph");
    var kelvin_url =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      key;
    $.ajax({
      url: kelvin_url,
      method: "GET",
    }).then(function (response) {
      if (parseInt(response.value) <= 2) {
        uv_index.text("UV Index: " + response.value).css("color", "green");
      }
      if (parseInt(response.value) <= 5 && parseInt(response.value) > 2) {
        uv_index.text("UV Index: " + response.value).css("color", "orange");
      }
      if (parseInt(response.value) > 6) {
        uv_index.text("UV Index: " + response.value).css("color", "red");
      }
    });
    forecast();
  });
}

function forecast() {
  var forecast_url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    getLocal("city") +
    "&appid=" +
    key;
  $.ajax({
    url: forecast_url,
    method: "GET",
  }).then(function (reply) {
    forecastCards(1, first_forecast, reply, 0);
    forecastCards(2, second_forecast, reply, 8);
    forecastCards(3, third_forecast, reply, 16);
    forecastCards(4, fourth_forecast, reply, 24);
    forecastCards(5, fifth_forecast, reply, 32);
  });
}

function forecastCards(date, div, reply, num) {
  var reply_object = reply.list[num];
  var forecast_icon = reply_object.weather[0].icon;
  var temp_val = reply_object.main.temp;
  var humidity_val = reply_object.main.humidity;
  var farenheight = Math.floor((parseInt(temp_val) * 9) / 5 - 459.67);
  div.text("");
  var later_date = moment().add(date, "day").format("dddd, MMMM Do");
  var header = $("<div>")
    .addClass("card-title")
    .addClass("forecast-cards")
    .text(later_date);
  div.append(header);
  var icon_img = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + forecast_icon + "@2x.png"
  );
  var temp = $("<p>").text("Temperature: " + farenheight + "°F");
  var humidity = $("<p>").text("Humidity: " + humidity_val + "%");

  div.append(icon_img);
  div.append(temp);
  div.append(humidity);
}

//This function gathers function calls for the search button event listener
function search_and_save() {
  daily_forecast_card.show();
  forecast_cards.show();
  cityinput = city.val();
  saveLocal("city", cityinput);
  renderRows();
  ajax_calls();
}

//This function clears the search history and resets the page
function clear() {
  var cityinput = "";
  saveLocal("city", cityinput);
  location.reload();
}

searchButton.on("click", search_and_save);
clearButton.on("click", clear);
