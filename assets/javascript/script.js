var city = $("#city-input");
var city_list = $(".input-list")
var searchButton = $("#search-button");
var clearButton = $("#clear-button");
var cityinput = '';
var key = "9d93230f3ad2bc78a7973c5234d7ba2e"

searchButton.on("click", search_and_save);
clearButton.on("click", clear);

function search_and_save() {
  var cityinput = city.val();
  saveLocal("city", cityinput);
  renderRows ();
}

function clear() {
  var cityinput = "";
  saveLocal("city", cityinput);
  location.reload();
}

function renderRows () {
  var city_list_group = $("<UL>");
  var city_list_item = $("<LI>").addClass("list-group-item").text(getLocal("city"))
  city_list.append(city_list_group);
  city_list_group.append(city_list_item);
}

function saveLocal(key, search) {
  localStorage.setItem(key, JSON.stringify(search));
}

function getLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

var url = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=" + key;

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    //Return the results in an object
    var result = response;
    console.log(result)
  });

  

  
