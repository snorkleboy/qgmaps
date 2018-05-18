import {
    displayLocation
}
from './displayInDom.js'
import getInfoWindow from './getInfoWindow'
const maxClusterMarkersDisplayed = 8;

function makeMarkers(num, map) {
    const infoWindow = getInfoWindow();
    const locations = makeLocations(num);
    const promises = locations.map(location => {
        return fetchLocationData(location)
            .then(locationData => {
                const marker = new google.maps.Marker({
                    position: location,
                    name: `super useful company ${bigRandom()}-${bigRandom()}th street`,
                    dataPoint: "this is some data",
                    WOStatus: makeWorkOrders(),
                    provider: `super useful company ${bigRandom()}`,
                    weatherData: locationData,
                });

                marker.addListener('click', function () {
                    displayLocation(marker);
                })
                marker.addListener("mouseover", () => {
                    displayLocation(marker);
                    let temp, snow;
                    if (marker.weatherData) {
                        temp = marker.weatherData.periods[0].ob.tempF
                        snow = marker.weatherData.periods[0].ob.snowDepthCM || "no snow"
                    }

                    const content = `
                    ${ marker.name }
                    <br>
                    <br>workOrder Status':
                    <br>[${marker.WOStatus}]
                    <br>
                    <br>Weather:{
                    <br>temp:${temp}
                    <br>cm of Snow:${snow}
                    <br>}
                    `

                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                })
                marker.addListener('mouseout', () => {
                    infoWindow.close();
                });

                return marker
            })
    })

    return Promise.all(promises);

    //us lats [30,45]
    //us longs [-120,-80]
    function makeLocations(numLocations) {
        const locations = [];
        for (let i = 0; i < numLocations; i++) {
            locations[i] = {
                lat: 15 * Math.random() + 30,
                lng: -40 * Math.random() - 80
            }
        }
        return locations
    }

    function makeWorkOrders() {
        const times = Math.random() * 10
        const arr = [];
        for (let i = 0; i < times; i++) {
            arr.push(Math.random() > .5 ? " in progress " : " complete ")
        }
        return arr
    }

}
function fetchLocationData(location, from, to) {
    const urlBase = "https://api.aerisapi.com/observations/archive?client_id=45yv8VupfeOkKylvazTSa&client_secret=sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx"
    const place = `p=${location.lat},${location.lng}`
    const periodLimit = "plimit=1"
    const url = [urlBase, place, periodLimit].join('&')
    return fetch(url, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(response => {
            if (response.error) {
                console.log({
                    error: response.error
                })
            } else {
                console.log(response);
                return response.response
            }
        });
}
function bigRandom() {
    return Math.floor(Math.random() * 1000);
}
export default makeMarkers