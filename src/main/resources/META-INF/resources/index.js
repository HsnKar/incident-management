var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'
, {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




// fetching the incidents
const ab = () => {
    const incidents = fetch(`http://localhost:8080/incidents/listincidents
`);
    incidents.then(data => 
            data.json().then(incidents => {
                incidents.forEach(element => {
                    const {cause, startDate} = element;
                    var lat = element.site.latitude;
                    var lgt = element.site.longitude;
                    console.log(`${cause} - ${startDate} - ${element.site.longitude} - ${element.site.latitude}`)
                    
                    // var marker = L.marker([51.5, -0.09]).addTo(map);
                    var marker = L.marker([lat, lgt]).addTo(map);


                });
            })
        ).catch(error => console.log('There was an error with the fetch operation'));
};

ab();

var satellite = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

layerControl.addBaseLayer(satellite, "Satellite");