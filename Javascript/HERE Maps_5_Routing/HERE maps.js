// Initialize the platform object
var platform = new H.service.Platform({
    'apikey': ''
});

// Obtain the default map types from the platform object
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) the map
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 14,
        center: { lat: 50.92906, lng: 5.39559 },
        padding: { top: 50, left: 50, bottom: 50, right: 50 }
    });

// MapEvents enables the event system.
// The behavior variable implements default interactions for pan/zoom (also on mobile touch environments).
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Enable dynamic resizing of the map, based on the current size of the enclosing container
window.addEventListener('resize', () => map.getViewPort().resize());

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Create a marker icon from an image URL:
var icon = new H.map.Icon('Logo_klein.png', { anchor: { x: 20, y: 20 } });

var group = new H.map.Group();
map.addObject(group);

var campussenMetGegevens = [];

getLocationsData(ucllCampi)
    .then(campiWithLocations => {
        campussenMetGegevens = campiWithLocations;
        for (var campus of campiWithLocations) {
            // Create a marker using the previously instantiated icon:
            var marker = new H.map.Marker(campus.position, { icon: icon, data: campus});

            // Add event listeners:
            marker.addEventListener('tap', function (evt) {
                var markerCampus = campussenMetGegevens.find(markerCampus => markerCampus.naam == evt.target.getData().naam);
                console.log(markerCampus);
                if (markerCampus.distance && markerCampus.duration) {
                    var markerWithDistance = "Afstand: " + (markerCampus.distance / 1000).toFixed(1).replace(".", ",") + "km<br>Reisijd: " + (markerCampus.duration / 60).toFixed() + "min";
                    // Create an info bubble object at a specific geographic location:
                    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                        content: "<strong>" + markerCampus.naam + "</strong><br>Afstand: " + Math.round(markerCampus.distance / 100)/10 + "km<br>Resitijd:" + Math.round(markerCampus.duration / 60) + "min"
                        //"<br>Afstand: " + (markerCampus.distance / 1000).toFixed(1).replace(".", ",") + "km<br>Reisijd: " + (markerCampus.duration / 60).toFixed() + "min"
                    });
                } else {
                    // Create an info bubble object at a specific geographic location:
                    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                        content: "<strong>" + markerCampus.naam + "</strong><br>"
                    });
                }

                // Add info bubble to the UI:
                ui.addBubble(bubble);

            });

            // Add the marker to the map:
            group.addObject(marker);
        }

        // Zoom the map to fit the group:
        map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });
    })
    .catch(error => {
        console.error('Error:', error);
    })

document.getElementById("showPosition").addEventListener("click", function () {
    var startPoint = document.getElementById("startPoint").value;
    var start = { adres: startPoint };
    console.log(start);
    getLocationData(start).then(startPosition => {
        var startLatLng = startPosition.position;
        console.log(startLatLng);
        // Create a marker using the previously instantiated icon:
        var marker = new H.map.Marker(startLatLng);
        // Add the marker to the map:
        group.addObject(marker);
        // Zoom the map to fit the group:
        map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });

        if (campussenMetGegevens.length == ucllCampi.length) {
            getDistances(start, campussenMetGegevens)
                .then(response => {
                    console.log(response);
                    // campussenMetGegevens werd aangepast
                })
                .catch(error => {console.error(error);})
        }
    })
    .catch(error => {
        console.error(error);
        alert("Vertekpositie kan niet gevonden worden.");
    })

})

function getLocationData(campus) {
    return new Promise((resolve, reject) => {
        var url = "https://geocode.search.hereapi.com/v1/geocode?q=" + campus.adres + "&apiKey=";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject("HTTP error: " + response.status + " " + response.statusText);
                }
                return response.json();
            })
            .then(result => {
                console.log("Test", result);
                if (!result.items[0] || !result.items[0].position) {
                    reject("Request error: position not found");
                } else {
                    campus.position = result.items[0].position;
                    //campus["position"] = result.items[0].position;
                    resolve(campus);

                }
            })
            .catch(error => { reject("getLocationData error:" + error); })
    })
}

function getLocationsData(campussen) {
    var campussenWithLoc = [];
    return new Promise((resolve, reject) => {
        for (var campus of campussen) {
            getLocationData(campus)
                .then(campusWithLocation => {
                    campussenWithLoc.push(campusWithLocation);
                    if (campussenWithLoc.length == campussen.length) {
                        resolve(campussenWithLoc);
                    }
                })
                .catch(error => { reject("getLocationsData error:" + error); })
        }
    })
}

// Om getDistance te testen: 
// getDistance({ title: "UCLL - Campus Diepenbeek", position: { lat: 50.92906, lng: 5.39559 } },
//    { title: "UCLL - Campus Proximus", position: { lat: 50.84625, lng: 4.72748 } })
//    .then(antwoord => { console.log(antwoord); })

function getDistance(vertrek, aankomst) {
    return new Promise((resolve, reject) => {
        var url = "https://router.hereapi.com/v8/routes?transportMode=car";
        url += "&origin=" + vertrek.position.lat + "," + vertrek.position.lng;
        url += "&destination=" + aankomst.position.lat + "," + aankomst.position.lng;
        url += "&return=summary&apiKey=";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject("HTTP error: " + response.status + " " + response.statusText);
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                if (!result.routes[0] || !result.routes[0].sections[0] || !result.routes[0].sections[0].summary) {
                    reject("Request error: routing not found");
                } else {
                    aankomst.duration = result.routes[0].sections[0].summary.duration;
                    aankomst.distance = result.routes[0].sections[0].summary.length;
                    resolve(aankomst);
                }
            })
            .catch(error => { reject("getDistance error:" + error); })
    })

}

function getDistances(vertrek, campussen) {
    var campussenWithDist = [];
    return new Promise((resolve, reject) => {
        for (var campus of campussen) {
            getDistance(vertrek, campus)
                .then(campusWithDistance => {
                    campussenWithDist.push(campusWithDistance);
                    if (campussenWithDist.length == campussen.length) {
                        resolve(campussenWithDist);
                    }
                })
                .catch(error => { reject("getDistances error:" + error); })
        }
    })
}





