
// Mapbox public access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiYmNyYWNrbmUiLCJhIjoiY2t3aWxpdngyMG9pODJvbDVzeW11Mm04dSJ9.0hQfgQ8NPgGQlmfj0eu_4A';

// Map object using outdoors style
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// Get bus data every 5 seconds
async function run() {
  mapMarkers.forEach((marker) => marker.remove());
  const locations = await getBusLocations();
  addMarker(locations);
  // Timer
  setTimeout(run, 5000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

// Map markers with locations of buses
let mapMarkers = [];
function addMarker(locations) {
  for (i = 0; i <= locations.length - 1; i++) {
    var marker = new mapboxgl.Marker()
      .setLngLat([
        locations[i].attributes.longitude,
        locations[i].attributes.latitude,
      ])
      .addTo(map);
    mapMarkers.push(marker);
  }
  return mapMarkers;
}

//Function that gets the data every 5 seconds from MBTA
run();