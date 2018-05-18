export function displayCluster(markers) {
    const list = document.getElementById('list')
    clearList(list);
    const moreMarkersThanWantToDisplay = markers.length > maxClusterMarkersDisplayed
    const maxMarkers = moreMarkersThanWantToDisplay ? maxClusterMarkersDisplayed : markers.length
    for (let i = 0; i < maxMarkers; i++) {
        const marker = markers[i]
        const li = makelocationLI(marker)
        list.appendChild(li);
    }
    if (markers.length > maxClusterMarkersDisplayed) {
        const moreSymbol = document.createElement("h1");
        moreSymbol.innerText = `${markers.length - maxClusterMarkersDisplayed} more undisplayed`
        list.appendChild(moreSymbol);
    }
}

export function displayLocation(marker) {
    const list = document.getElementById('list')
    clearList(list);
    const li = makelocationLI(marker);
    list.appendChild(li);
}

function clearList(list) {
    list.innerHTML = ''
}
const locationTemplate = `
<div>
    <h1 id="title"></h1>
    <h2 id="WOStatus"></h1>
    <div id='weatherData'></div>
</div>
`

function makelocationLI(marker) {
    const template = document.createElement('li');
    template.innerHTML = locationTemplate;

    const titleEl = template.querySelector('#title');
    const WOStatusEl = template.querySelector('#WOStatus');
    const weatherData = template.querySelector('#weatherData');
    titleEl.innerText = marker.provider;
    WOStatusEl.innerText = `[${marker.WOStatus}]`;
    weatherData.innerText = JSON.stringify(marker.weatherData)
    return template
}
