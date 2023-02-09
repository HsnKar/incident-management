// var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'
// , {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);


// fetching the incidents
const ab = () => {
    const incidents = fetch(`http://localhost:8080/incidents/listincidents
`);
    incidents.then(data => 
            data.json().then(incidents => {
                incidents.forEach(element => {
                    const {cause, startDate} = element;
                    console.log(`${cause} - ${startDate} - ${element.site.longitude}`)
                    
                    // var marker = L.marker([51.5, -0.09]).addTo(map);


                });
            })
        ).catch(error => console.log('There was an error with the fetch operation'));
};

ab();