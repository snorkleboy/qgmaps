import AerisGmapsAnimator from './AerisGmapsAnimator'

function setOverLays(clusterer) {
    const map = clusterer.map
    const radar = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return ['https://maps1.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/radar/',
                zoom, '/', coord.x, '/', coord.y, '/current.png'
            ].join('');
        },
        tileSize: new google.maps.Size(256, 256)
    });

    const RainAndSnow = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return `https://maps2.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/fsnow-accum,fice-accum/${zoom}/${coord.x}/${coord.y}/current.png`
        },
        tileSize: new google.maps.Size(256, 256)
    });
    const StormCellsAndLightning = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return `https://maps3.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/stormcells,stormreports,lightning-strike-density/${zoom}/${coord.x}/${coord.y}/current.png`
        },
        tileSize: new google.maps.Size(256, 256)
    });

    const firesDroughtAlertsTropical = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return `https://maps4.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/drought-monitor,tropical,fires-outlook,alerts/${zoom}/${coord.x}/${coord.y}/current.png`
        },
        tileSize: new google.maps.Size(256, 256)
    });

    const bounds = {
        south: 31.8,
        west: -123.1,
        north: 48.6,
        east: -62.9
    }
    const url = `https://maps.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/radar/512x512/${bounds.south},${bounds.west},${bounds.north},${bounds.east}/current.png`

    const staticRadar = new google.maps.GroundOverlay(url, bounds, {
        opacity: 0.8
    });


    const animator = new AerisGmapsAnimator(clusterer, map);

    // bindButtons({
    return ({
        radar,
        RainAndSnow,
        StormCellsAndLightning,
        firesDroughtAlertsTropical,
        staticRadar,
        animator,
        map
    });
}



export default setOverLays