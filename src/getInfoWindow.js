let infoWindow;
export default function getInfoWindow() {
    infoWindow = infoWindow || new google.maps.InfoWindow({
            maxWidth: 200
    });
    return infoWindow
}
