var map = L.map('map').setView([-18.879190, 47.507905], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  , {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);



// fetching the incidents

const ab = () => {
  const incidents = fetch(`http://localhost:8080/incidents/showonmap`);
  incidents.then(data =>
    data.json().then(incidents => {
      incidents.forEach(element => {
        const { cause, startDate, criticality, nursingle, site } = element;
        var lat = element.site.latitude;
        var lgt = element.site.longitude;
        console.log(`${cause} - ${startDate} - ${element.site.longitude} - ${element.site.latitude}`)

        //red Marker
        var redMarker = L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // create the marker with the red icon
        var marker = L.marker([lat, lgt], { icon: redMarker }).addTo(map);


        // var marker = L.marker([51.5, -0.09]).addTo(map);
        // var marker = L.marker([lat, lgt]).addTo(map);
        marker.bindPopup(`<b><strong>Niveau de criticité:</strong> ${criticality}!</b><br><strong>Problème</strong>: ${nursingle.name}<br><strong>Lieu:</strong> ${site.name}<br><strong>date de début: </strong> ${startDate}.`);
        // var popup = L.popup()
        // .setLatLng([lat, lgt])
        // .setContent(`<b><strong>Niveau de criticité:</strong> ${criticality}!</b><br><strong>Problème</strong>: ${nursingle.name}<br><strong>Lieu:</strong> ${site.name}<br><strong>date de début: </strong> ${startDate}.`)
        // .openOn(map);



      });
    })
  ).catch(error => console.log('There was an error with the fetch operation'));
};
ab();

// setInterval(ab, 5000);

// var satellite = L.tileLayer(mapboxUrl, { id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution });

// layerControl.addBaseLayer(satellite, "Satellite");