var city = $(".form-control").val();
var searchButton = $(".input-group-prepend");
var key = "9d93230f3ad2bc78a7973c5234d7ba2e"

searchButton.on("click", search_and_save);

function search_and_save() {
    saveLocal("city", city);
    alert(city)
}

function saveLocal(key, search) {
  localStorage.setItem(key, JSON.stringify(search).trim());
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