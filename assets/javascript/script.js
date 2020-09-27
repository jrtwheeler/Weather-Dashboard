var city = $("#city-input");
var city_list = $(".input-list");
var card_header = $(".card-title")
var searchButton = $("#search-button");
var clearButton = $("#clear-button");
var key = "9d93230f3ad2bc78a7973c5234d7ba2e";

function renderRows() {
  var city_list_group = $("<UL>");
  var city_list_item = $("<LI>")
    .addClass("list-group-item")
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
    alert(url);
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      //Return the results in an object
      var result = response;
      console.log(result);
      card_header.text(result.city.name)
    });
  }
}

function clear() {
  var cityinput = "";
  saveLocal("city", cityinput);
  location.reload();
}

searchButton.on("click", search_and_save);
clearButton.on("click", clear);
