import makeMarkers from './makeMarkers';
import makeClusterer from './makeClusterer';
import makeOverlays from './makeOverlays.js';
import initMap from './initMap';

document.addEventListener("DOMContentLoaded",()=>{

    const map = initMap()
    makeMarkers(20,map)
        .then(markers => makeClusterer(map,markers))
        .then(markerClusterer => makeOverlays(markerClusterer))
        .then(buttonFunctions=> bindButtons(buttonFunctions));
});







function bindButtons({ map, radar, RainAndSnow, StormCellsAndLightning, firesDroughtAlertsTropical, staticRadar, animator }) {
    
    const overlayMapTypes = map.overlayMapTypes
    const radarToggleButton = document.getElementById('toggleRadar');
    const staticRadarToggleButton = document.getElementById('staticRadarToggleButton')
    const rainAndSnowToggleButton = document.getElementById('toggleRainAndSnow')
    const stormCellsAndLightningToggleButton = document.getElementById('toggleStormCells')
    const randomCoolStuffToggleButton = document.getElementById('toggleRandomCoolStuff')

    radarToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, radar, radarToggleButton))
    rainAndSnowToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, RainAndSnow, rainAndSnowToggleButton))
    stormCellsAndLightningToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, StormCellsAndLightning, stormCellsAndLightningToggleButton))
    randomCoolStuffToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, firesDroughtAlertsTropical, randomCoolStuffToggleButton))
    staticRadarToggleButton.addEventListener('click', () => setOverlay(map, staticRadar, staticRadarToggleButton))

    const animationStartButton = document.getElementById("startAnimation");
    const animationStopButton = document.getElementById("stopAnimation");
    const animationPuaseButton = document.getElementById("pauseAnimation");

    animationPuaseButton.addEventListener('click', () => animator.pause())
    animationStartButton.addEventListener('click', () => animator.start())
    animationStopButton.addEventListener('click', () => animator.clear())


}

function toggleOverlay(overlayMapTypes, overlay, button) {
    console.log("toggle");
    const overlayIdx = overlayMapTypes.indexOf(overlay);
    if (overlayIdx === -1) {
        overlayMapTypes.push(overlay);
        button.classList.add("button-on")
    } else {
        overlayMapTypes.removeAt(overlayIdx)
        button.classList.remove("button-on")
    }
}

function setOverlay(map, overlay, button) {
    if (!overlay.map) {
        overlay.setMap(map);
        button.classList.add("button-on")
    } else {
        overlay.setMap(null);
        button.classList.remove("button-on")
    }
}