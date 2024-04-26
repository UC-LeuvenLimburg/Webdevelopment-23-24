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

// Enable dynamic resizing of the map, based on the current size of the enclosing cntainer
window.addEventListener('resize', () => map.getViewPort().resize());

// Create the default UI:
const ui = H.ui.UI.createDefault(map, defaultLayers);

// Create a marker icon from an image URL:
var icon = new H.map.Icon('Logo_klein.png', { anchor: { x: 20, y: 20 } });

var markerPosities = [
    { title: "UCLL - Campus Diepenbeek", position: { lat: 50.92906, lng: 5.39559 } },
    { title: "UCLL - Campus Proximus", position: { lat: 50.84625, lng: 4.72748 } }];


// Create a group that can hold map objects:
group = new H.map.Group();

// Add the group to the map object (created earlier):
map.addObject(group);

for (let markerPos of markerPosities) {
    console.log(markerPos);
    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(markerPos.position, { icon: icon });

    // Add the marker to the map:
    group.addObject(marker);

    // Add event listener:
    marker.addEventListener('tap', function (evt) {

        // Create an info bubble at the Spire of Dublin location with the HTML content
        const infoBubble = new H.ui.InfoBubble(markerPos.position, {
            content: markerPos.title
        });
        // Add the info bubble to the UI
        ui.addBubble(infoBubble);
    });

}





