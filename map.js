var actividad = "";
$(document).ready(function () {
  const tilesProvider = "	https://{s}.tile.openstreetmap.org/${z}/${x}/${y}.png"
  var map = L.map('mapid').setView([19.229202, -97.7820099], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW50b25pb21jaCIsImEiOiJja2dzcXRkY3YwM3Z3MnBuMmY5OTF3MGhyIn0.3TF5qxEWSgU1459OhJ_X_Q'
  }).addTo(map);

  for (f = 0; f < historial.locations.length - 1; f++) {

    //console.log(historial.locations[f].latitudeE7, historial.locations[f].longitudeE7);

    if (historial.locations[f].activity != undefined) {
      actividad = historial.locations[f].activity[0].activity[0].type;
    } else {
      actividad = "UNKNOWN";
    }

    var markers = [

      [historial.locations[f].latitudeE7 / 10000000, historial.locations[f].longitudeE7 / 10000000, actividad],
      [historial.locations[f + 1].latitudeE7 / 10000000, historial.locations[f + 1].longitudeE7 / 10000000, actividad]
    ];

    //console.log(lat)
    var lat = markers[0][0]
    var lon = markers[0][1]
    //console.log(lat)

    L.marker(markers[0]).addTo(map).bindPopup(actividad).openPopup();
    console.log(markers);


    if (actividad == "STILL") {
      L.polyline(markers, { color: 'red' }).addTo(map);
    } else {
      if (actividad == "UNKNOWN") {
        L.polyline(markers, { color: 'blue' }).addTo(map)
      } else {
        if (actividad == "TILTING") {
          L.polyline(markers, { color: 'green' }).addTo(map);
        } else {
          if (actividad == "IN_VEHICLE") {
            L.polyline(markers, { color: 'black' }).addTo(map);
          } else {
            if (actividad == "ON_FOOT") {
              L.polyline(markers, { color: 'brown' }).addTo(map);
            } else {
              if (actividad == "RUNNING") {
                L.polyline(markers, { color: 'gray' }).addTo(map);
              } else {
                if (actividad == "WALKING") {
                  L.polyline(markers, { color: 'orange' }).addTo(map);
                }
              }
            }
          }
        }
      }
    }

  }

});