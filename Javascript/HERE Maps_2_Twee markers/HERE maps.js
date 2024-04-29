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

var markerPosities = [
    { title: "UCLL - Campus Diepenbeek", position: { lat: 50.92906, lng: 5.39559 } },
    { title: "UCLL - Campus Proximus", position: { lat: 50.84625, lng: 4.72748 } }];

var group = new H.map.Group();
map.addObject(group);

for (var markerPositie of markerPosities) {
    console.log(markerPositie);
    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(markerPositie.position, { icon: icon, data: markerPositie.title });

    // Add event listeners:
    marker.addEventListener('tap', function (evt) {
        var markerPosition = evt.target.getGeometry();  //markerPositie.position
        var markerData = evt.target.getData();  //markerPositie.title
        // Create an info bubble object at a specific geographic location:
        var bubble = new H.ui.InfoBubble(markerPosition, {
            content: markerData
        });

        // Add info bubble to the UI:
        ui.addBubble(bubble);

    });
    // Add the marker to the map:
    group.addObject(marker);

}

// Zoom the map to fit the group:
map.getViewModel().setLookAtData({bounds: group.getBoundingBox()});




