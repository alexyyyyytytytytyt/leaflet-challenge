function createMap(earthquakes) {
    // Adding the tile layer
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var baseMaps = {
        "Street Map" : street,
    };

    var overlayMaps = {
        "EarthQuakes" : earthquakes
    }

    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [street,earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = [-10, 10, 30, 50, 70, 90]
  var colors = ["#01796F", "#8FD400", "#FDE64B", "#893101", "#EC9706", "#D30000"]
  var labels = [];

  // Add the minimum and maximum.
  var legendInfo = 
    "<div class=\"labels\">" +

    "</div>";

  div.innerHTML = legendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\">"+limits[index]+"-"+limits[index+1]+"</li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};
console.log("Welcome")
// Adding the legend to the map
legend.addTo(myMap);


}


  // Use this link to get the GeoJSON data.


function createCircles(response){
    circle_list = response.features
    var bikemarkers = [];

    for(let i = 0; i < circle_list.length; i++){
        var station = circle_list[i]

        let bikeM = L.circle([station.geometry.coordinates[1], station.geometry.coordinates[0]],
            {
        fillOpacity: 0.5,
        radius: station.properties.mag * 15000
        }).bindPopup(`<h1> ${station.properties.place} </h1> <hr> <h2> Mag: ${station.properties.mag} </h2> <hr> <h2> Depth: ${station.geometry.coordinates[2]} </h2> <hr> <h2> Lon: ${station.geometry.coordinates[1]}, Lat: ${station.geometry.coordinates[0]} </h2> <hr> <h2> ID: ${station.id} </h2>`)

        console.log(station.geometry.coordinates[2])

        if (station.geometry.coordinates[2] > 90) {
            bikeM.options.color = "#D30000"
        }
        
        else if (station.geometry.coordinates[2] > 70 && station.geometry.coordinates[2] <= 90) {
            bikeM.options.color = "#EC9706"
        }

        else if (station.geometry.coordinates[2] > 50 && station.geometry.coordinates[2] <= 70) {
            bikeM.options.color = "#893101"
        }

        else if (station.geometry.coordinates[2] > 30 && station.geometry.coordinates[2] <= 50) {
            bikeM.options.color = "#FDE64B"
        }
        
        else if (station.geometry.coordinates[2] > 10 && station.geometry.coordinates[2] <= 30) {
            bikeM.options.color = "#8FD400"
        }

        else {
            bikeM.options.color = "#01796F"
        }

        bikemarkers.push(bikeM)
    }
    console.log(circle_list[0].properties.place)
    bikemarkerGrp = L.layerGroup(bikemarkers)
    createMap(bikemarkerGrp)
}

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  // Our style object

  // Getting our GeoJSON data
d3.json(url).then(function(response) {
    createCircles(response)
    console.log(response)
});

// var info = L.control({
//     position: "bottomright"
// });

// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
// };

// info.addTo(map)











