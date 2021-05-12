// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// API links
var bikeLink = "https://robertodiazbriones.github.io/data/CBS_totals.json";

var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });

var myMap = L.map("map", {
      center: [0, 0],
      zoom: 2,
    });

function createMarkers(response) {
    var stations = response.station_id;
    var markers = []
    
    for (var i in stations) {
        var lat = station.lat;
        var lng = station.lng;
        var location = [lat,lng];
        
        var marker = L.circleMarker(location, {
            fillColor: red
        }).bindpopup(station.station_id);
        markers.push(marker);
    }
}

d3.json("https://robertodiazbriones.github.io/data/CBS_totals.json", createMarkers);