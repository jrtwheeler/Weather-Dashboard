var city = $(".form-control").val();
var searchButton = $(".input-group-prepend");

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
