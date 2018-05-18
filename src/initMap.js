function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {
            lat: 40,
            lng: -90
        },
        mapTypeId: 'hybrid'
    });
    //google maps deactives scrollwheel after clicking on map for some reason
    google.maps.event.addListener(map, 'click', function (event) {
        console.log("map lcick");
        this.setOptions({
            scrollwheel: true
        });
    });

    return map;
}

export default initMap;




