var city = $("#city-input");
var city_list = $(".input-list");
var card_header = $(".city");
var searchButton = $("#search-button");
var clearButton = $("#clear-button");
var temperature = $(".temperature");
var humidity = $(".humidity");
var wind_speed = $(".wind-speed");
var weather_img = $(".weather-image");
var uv_index = $(".uv-index");
var date = moment().get("date");
var month = moment().get("month");
var date_div = $(".date");
var displayTime = moment().format("dddd, MMMM Do");
var date_div_text = date_div.text(displayTime);
var cityinput = city.val(getLocal("city"));
var first_forecast = $(".one");
var second_forecast = $(".two");
var third_forecast = $(".three");
var fourth_forecast = $(".four");
var fifth_forecast = $(".five");

var key = "9d93230f3ad2bc78a7973c5234d7ba2e";

function renderRows() {
  var city_list_group = $("<UL>");
  var city_list_item = $("<LI>")
    .addClass("list-group-item city-button")
    .text(getLocal("city"));
  city_list.append(city_list_group);
  city_list_group.append(city_list_item);
}

function saveLocal(key, search) {
  localStorage.setItem(key, JSON.stringify(search));
}

function getLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

function search_and_save() {
  var cityinput = city.val();
  saveLocal("city", cityinput);
  renderRows();

  if (getLocal(key) != "") {
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
      var result = response;
      card_header.text(result.city.name);
      var icon = result.list[0].weather[0].icon;
      var description = result.list[0].weather[0].description;
      var farenheight = Math.floor(
        (parseInt(result.list[0].main.temp) * 9) / 5 - 459.67
      );
      weather_img.attr(
        "src",
        "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      );
      weather_img.attr("alt", description);
      temperature.text("Temperature: " + farenheight + "°F");
      humidity.text("Humidity: " + result.list[0].main.humidity + "%");
      wind_speed.text("Wind Speed: " + result.list[0].wind.speed + "mph");
      //uv_index.text("UV Index: " + (result.list[0].main);
      forecast();
    });
  }
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
    var reply_object = reply.list[0];
    var forecast_icon = reply_object.weather[0].icon;
    var temp_val = reply_object.main.temp;
    var humidity_val = reply_object.main.humidity;
    var farenheight = Math.floor(
      (parseInt(temp_val) * 9) / 5 - 459.67
    );

    forecastCards(1, first_forecast, forecast_icon, farenheight, humidity_val);
    forecastCards(2, second_forecast, forecast_icon, farenheight, humidity_val);
    forecastCards(3, third_forecast, forecast_icon, farenheight, humidity_val);
    forecastCards(4, fourth_forecast, forecast_icon, farenheight, humidity_val);
    forecastCards(5, fifth_forecast, forecast_icon, farenheight, humidity_val);
  });
}

function forecastCards(date, div, icon, t, h) {
  div.text("");
  var later_date = moment().add(date, "day").format("dddd, MMMM Do");
  var header = $("<div>")
    .addClass("card-title")
    .addClass("forecast-cards")
    .text(later_date);
  div.append(header);
  var icon_img = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  );
  var temp = $("<p>").text("Temperature: " + t + "°F");
  var humidity = $("<p>").text("Humidity: " + h + "%");

  div.append(icon_img);
  div.append(temp);
  div.append(humidity);
}

function clear() {
  var cityinput = "";
  saveLocal("city", cityinput);
  location.reload();
}

searchButton.on("click", search_and_save);
clearButton.on("click", clear);
$(".city-button").on("click", search_and_save);
