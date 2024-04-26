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
        center: { lat: 50.92906, lng: 5.39559 }
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

// Create a marker using the previously instantiated icon:
var marker = new H.map.Marker({ lat: 50.92906, lng: 5.39559 }, { icon: icon });

// Add event listeners:
marker.addEventListener('tap', function (evt) {
    // Create an info bubble object at a specific geographic location:
    var bubble = new H.ui.InfoBubble({ lat: 50.92906, lng: 5.39559 }, {
        content: '<b>UCLL Campus Diepenbeek</b><br />Agoralaan 1, 3590 Diepenbeek'
    });

    // Add info bubble to the UI:
    ui.addBubble(bubble);

});

// Add the marker to the map:
map.addObject(marker);