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

for (var campus of ucllCampi) {
    getLocationData(campus)
        .then(response => {
            console.log(response);
            // Create a marker using the previously instantiated icon:
            var marker = new H.map.Marker(response.position, { icon: icon, data: response });

            // Add the marker to the map:
            group.addObject(marker);

            // Add event listeners:
            marker.addEventListener('tap', function (evt) {
                // Create an info bubble object at a specific geographic location:
                var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                    content: "<strong>" + evt.target.getData().naam + "</strong><br>" + evt.target.getData().adres
                });

                // Add info bubble to the UI:
                ui.addBubble(bubble);

            });

            // Zoom the map to fit the group:
            map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });
        })
        .catch(error => {
            console.error('Error:', error);
        })
}



function getLocationData(campus) {
    return new Promise((resolve, reject) => {
        var url = "https://geocode.search.hereapi.com/v1/geocode?q=" + campus.adres + "&apiKey=";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject(new Error("HTTP error: " + response.status + " " + response.statusText));
                }
                return response.json();
            })
            .then(result => {
                if (!result.items[0].position) {
                    reject(new Error("Request error: position not found"));
                } else {
                    campus.position = result.items[0].position;
                    //campus["position"] = result.items[0].position;
                    resolve(campus);
                }
            })
            .catch(error => {
                reject(new Error("getLocationData error:" + error));
            })
    })
}






