var city = $("#city-input");
var city_list = $(".input-group")
var searchButton = $(".btn-primary");
var key = "9d93230f3ad2bc78a7973c5234d7ba2e"

searchButton.on("click", search_and_save);

function search_and_save() {
  var cityinput = city.val();
  saveLocal("city", cityinput);
  renderRows ();
}

function renderRows () {
  var city_list_div = $("<p>").addClass("col-12 card mt-3 mb-3").text(getLocal("city"))
  city_list.append(city_list_div);

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

  

  
