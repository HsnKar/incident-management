// fetching the incidents
const ab = () => {
    const incidents = fetch(`http://localhost:8080/reporting/tick-net`);
    incidents.then(data => 
            data.json().then(incidents => {
                incidents.forEach(element => {
                    const {cause, startDate, criticality, nursingle, site, createdAt, closedAt} = element;
                    console.log(`${cause} - ${startDate} - ${element.site.longitude} - ${element.site.latitude}`);
                    // let tableData ="";
                    // tableData += `
                    //     <tr>
                    //         <td>${''}</td>
                    //         <td>${criticality}</td>
                    //         <td>${cause}</td>
                    //         <td>${startDate}</td>
                    //         <td>${""}</td>
                    //         <td>${''}</td>
                    //         <td>${''}</td>
                    //         <td>${site.name}</td>
                    //     </tr>
                    // `;
                    

                });
            })
        ).catch(error => console.log('There was an error with the fetch operation'));
};

ab();