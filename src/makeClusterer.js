import {
    displayCluster
}
from './displayInDom.js'

import getInfoWindow from './getInfoWindow'
const maxClusterMarkersDisplayed = 8;


function makeClusterer(map, markers) {
    const infoWindow = getInfoWindow();

    const markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        zoomOnClick: false,
    });
    markerCluster.addListener('clusterclick', function (cluster) {
        const markers = cluster.getMarkers();
        displayCluster(markers)
        let names = markers.slice(0, maxClusterMarkersDisplayed).map(marker => marker.name).join('<br>');

        if (markers.length > maxClusterMarkersDisplayed) {
            names += `<br> ${markers.length - maxClusterMarkersDisplayed} undisplayed`
        }
        infoWindow.setContent(names)
        infoWindow.setPosition(cluster.getCenter())
        infoWindow.open(map, markerCluster);
    });

    return markerCluster;
}

export default makeClusterer