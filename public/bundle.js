/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/maps.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AerisGmapsAnimator.js":
/*!***********************************!*\
  !*** ./src/AerisGmapsAnimator.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AerisGmapsAnimator; });\nconst _options = {\n    preloadImages: true,\n    frames: 12,\n    timeInterval: {\n        amount: 1,\n        interval: \"hr\"\n    },\n    frameSpeedMS: 500,\n    bounds: {\n        south: 30,\n        west: -156,\n        north: 49,\n        east: -65\n    },\n    baseImageUrl: \"https://maps.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/stormcells,radar/512x512\"\n}\nclass AerisGmapsAnimator {\n    constructor(markerClusterer, map, options = {}) {\n        options = Object.assign({}, _options, options)\n        this.options = options\n        this.markerClusterer = markerClusterer;\n        this.map = map;\n        this.overlays = this.makeOverlays(options.timeInterval, options.baseImageUrl, options.frames);\n        this.intervalId = null;\n        this.index = 0;\n\n    }\n    start() {\n        this.intervalId = setInterval(\n            this.animate.bind(this),\n            this.options.frameSpeedMS\n        )\n    }\n    pause() {\n        clearInterval(this.intervalId);\n        this.intervalId = null;\n    }\n    clear() {\n        this.pause();\n        this.overlays.forEach(overlay => overlay.setMap(null));\n    }\n\n    animate() {\n        const lastOverlay = this.index === 0 ? this.overlays.length - 1 : this.index - 1;\n        console.log({\n            map: this.map,\n            index: this.index,\n            overlays: this.overlays\n        })\n        this.overlays[lastOverlay].setMap(null);\n        this.overlays[this.index].setMap(this.map);\n        this.index = (this.index + 1) % (this.overlays.length);\n    }\n    makeOverlays(timeInterval, baseUrl, frames) {\n        const urls = this.makeUrls(timeInterval, baseUrl, frames)\n        const overlays = [];\n\n        urls.forEach(url => {\n            overlays.push(\n                new google.maps.GroundOverlay(url, this.options.bounds, {\n                    opacity: 0.8\n                })\n            )\n        })\n        return overlays;\n    }\n    makeUrls(timeInterval, baseUrl, frames) {\n        const bounds = this.options.bounds\n        const arr = [];\n        const format = \"png\"\n        for (let i = frames; i > 0; i--) {\n            arr.push(`${baseUrl}/${bounds.south},${bounds.west},${bounds.north},${bounds.east}/-${timeInterval.amount * i }${timeInterval.interval}.${format}`)\n        }\n        if (this.options.preloadImages) {\n            this.preloadImages(arr);\n        }\n        return arr;\n    }\n    preloadImages(urlArr) {\n        urlArr.forEach(url => {\n            const preload = new Image();\n            preload.src = url\n        })\n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/AerisGmapsAnimator.js?");

/***/ }),

/***/ "./src/displayInDom.js":
/*!*****************************!*\
  !*** ./src/displayInDom.js ***!
  \*****************************/
/*! exports provided: displayCluster, displayLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayCluster\", function() { return displayCluster; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayLocation\", function() { return displayLocation; });\nfunction displayCluster(markers) {\n    const list = document.getElementById('list')\n    clearList(list);\n    const moreMarkersThanWantToDisplay = markers.length > maxClusterMarkersDisplayed\n    const maxMarkers = moreMarkersThanWantToDisplay ? maxClusterMarkersDisplayed : markers.length\n    for (let i = 0; i < maxMarkers; i++) {\n        const marker = markers[i]\n        const li = makelocationLI(marker)\n        list.appendChild(li);\n    }\n    if (markers.length > maxClusterMarkersDisplayed) {\n        const moreSymbol = document.createElement(\"h1\");\n        moreSymbol.innerText = `${markers.length - maxClusterMarkersDisplayed} more undisplayed`\n        list.appendChild(moreSymbol);\n    }\n}\n\nfunction displayLocation(marker) {\n    const list = document.getElementById('list')\n    clearList(list);\n    const li = makelocationLI(marker);\n    list.appendChild(li);\n}\n\nfunction clearList(list) {\n    list.innerHTML = ''\n}\nconst locationTemplate = `\n<div>\n    <h1 id=\"title\"></h1>\n    <h2 id=\"WOStatus\"></h1>\n    <div id='weatherData'></div>\n</div>\n`\n\nfunction makelocationLI(marker) {\n    const template = document.createElement('li');\n    template.innerHTML = locationTemplate;\n\n    const titleEl = template.querySelector('#title');\n    const WOStatusEl = template.querySelector('#WOStatus');\n    const weatherData = template.querySelector('#weatherData');\n    titleEl.innerText = marker.provider;\n    WOStatusEl.innerText = `[${marker.WOStatus}]`;\n    weatherData.innerText = JSON.stringify(marker.weatherData)\n    return template\n}\n\n\n//# sourceURL=webpack:///./src/displayInDom.js?");

/***/ }),

/***/ "./src/getInfoWindow.js":
/*!******************************!*\
  !*** ./src/getInfoWindow.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getInfoWindow; });\nlet infoWindow;\nfunction getInfoWindow() {\n    infoWindow = infoWindow || new google.maps.InfoWindow({\n            maxWidth: 200\n    });\n    return infoWindow\n}\n\n\n//# sourceURL=webpack:///./src/getInfoWindow.js?");

/***/ }),

/***/ "./src/initMap.js":
/*!************************!*\
  !*** ./src/initMap.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction initMap() {\n    const map = new google.maps.Map(document.getElementById('map'), {\n        zoom: 5,\n        center: {\n            lat: 40,\n            lng: -90\n        },\n        mapTypeId: 'hybrid'\n    });\n    //google maps deactives scrollwheel after clicking on map for some reason\n    google.maps.event.addListener(map, 'click', function (event) {\n        console.log(\"map lcick\");\n        this.setOptions({\n            scrollwheel: true\n        });\n    });\n\n    return map;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (initMap);\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/initMap.js?");

/***/ }),

/***/ "./src/makeClusterer.js":
/*!******************************!*\
  !*** ./src/makeClusterer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _displayInDom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayInDom.js */ \"./src/displayInDom.js\");\n/* harmony import */ var _getInfoWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getInfoWindow */ \"./src/getInfoWindow.js\");\n\n\n\nconst maxClusterMarkersDisplayed = 8;\n\n\nfunction makeClusterer(map, markers) {\n    const infoWindow = Object(_getInfoWindow__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n    const markerCluster = new MarkerClusterer(map, markers, {\n        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',\n        zoomOnClick: false,\n    });\n    markerCluster.addListener('clusterclick', function (cluster) {\n        const markers = cluster.getMarkers();\n        Object(_displayInDom_js__WEBPACK_IMPORTED_MODULE_0__[\"displayCluster\"])(markers)\n        let names = markers.slice(0, maxClusterMarkersDisplayed).map(marker => marker.name).join('<br>');\n\n        if (markers.length > maxClusterMarkersDisplayed) {\n            names += `<br> ${markers.length - maxClusterMarkersDisplayed} undisplayed`\n        }\n        infoWindow.setContent(names)\n        infoWindow.setPosition(cluster.getCenter())\n        infoWindow.open(map, markerCluster);\n    });\n\n    return markerCluster;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeClusterer);\n\n//# sourceURL=webpack:///./src/makeClusterer.js?");

/***/ }),

/***/ "./src/makeMarkers.js":
/*!****************************!*\
  !*** ./src/makeMarkers.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _displayInDom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayInDom.js */ \"./src/displayInDom.js\");\n/* harmony import */ var _getInfoWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getInfoWindow */ \"./src/getInfoWindow.js\");\n\n\nconst maxClusterMarkersDisplayed = 8;\n\nfunction makeMarkers(num, map) {\n    const infoWindow = Object(_getInfoWindow__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    const locations = makeLocations(num);\n    const promises = locations.map(location => {\n        return fetchLocationData(location)\n            .then(locationData => {\n                const marker = new google.maps.Marker({\n                    position: location,\n                    name: `super useful company ${bigRandom()}-${bigRandom()}th street`,\n                    dataPoint: \"this is some data\",\n                    WOStatus: makeWorkOrders(),\n                    provider: `super useful company ${bigRandom()}`,\n                    weatherData: locationData,\n                });\n\n                marker.addListener('click', function () {\n                    Object(_displayInDom_js__WEBPACK_IMPORTED_MODULE_0__[\"displayLocation\"])(marker);\n                })\n                marker.addListener(\"mouseover\", () => {\n                    Object(_displayInDom_js__WEBPACK_IMPORTED_MODULE_0__[\"displayLocation\"])(marker);\n                    let temp, snow;\n                    if (marker.weatherData) {\n                        temp = marker.weatherData.periods[0].ob.tempF\n                        snow = marker.weatherData.periods[0].ob.snowDepthCM || \"no snow\"\n                    }\n\n                    const content = `\n                    ${ marker.name }\n                    <br>\n                    <br>workOrder Status':\n                    <br>[${marker.WOStatus}]\n                    <br>\n                    <br>Weather:{\n                    <br>temp:${temp}\n                    <br>cm of Snow:${snow}\n                    <br>}\n                    `\n\n                    infoWindow.setContent(content);\n                    infoWindow.open(map, marker);\n                })\n                marker.addListener('mouseout', () => {\n                    infoWindow.close();\n                });\n\n                return marker\n            })\n    })\n\n    return Promise.all(promises);\n\n    //us lats [30,45]\n    //us longs [-120,-80]\n    function makeLocations(numLocations) {\n        const locations = [];\n        for (let i = 0; i < numLocations; i++) {\n            locations[i] = {\n                lat: 15 * Math.random() + 30,\n                lng: -40 * Math.random() - 80\n            }\n        }\n        return locations\n    }\n\n    function makeWorkOrders() {\n        const times = Math.random() * 10\n        const arr = [];\n        for (let i = 0; i < times; i++) {\n            arr.push(Math.random() > .5 ? \" in progress \" : \" complete \")\n        }\n        return arr\n    }\n\n}\nfunction fetchLocationData(location, from, to) {\n    const urlBase = \"https://api.aerisapi.com/observations/archive?client_id=45yv8VupfeOkKylvazTSa&client_secret=sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx\"\n    const place = `p=${location.lat},${location.lng}`\n    const periodLimit = \"plimit=1\"\n    const url = [urlBase, place, periodLimit].join('&')\n    return fetch(url, {\n            mode: 'cors'\n        })\n        .then(data => data.json())\n        .then(response => {\n            if (response.error) {\n                console.log({\n                    error: response.error\n                })\n            } else {\n                console.log(response);\n                return response.response\n            }\n        });\n}\nfunction bigRandom() {\n    return Math.floor(Math.random() * 1000);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeMarkers);\n\n//# sourceURL=webpack:///./src/makeMarkers.js?");

/***/ }),

/***/ "./src/makeOverlays.js":
/*!*****************************!*\
  !*** ./src/makeOverlays.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AerisGmapsAnimator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AerisGmapsAnimator */ \"./src/AerisGmapsAnimator.js\");\n\n\nfunction setOverLays(clusterer) {\n    const map = clusterer.map\n    const radar = new google.maps.ImageMapType({\n        getTileUrl: function (coord, zoom) {\n            return ['https://maps1.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/radar/',\n                zoom, '/', coord.x, '/', coord.y, '/current.png'\n            ].join('');\n        },\n        tileSize: new google.maps.Size(256, 256)\n    });\n\n    const RainAndSnow = new google.maps.ImageMapType({\n        getTileUrl: function (coord, zoom) {\n            return `https://maps2.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/fsnow-accum,fice-accum/${zoom}/${coord.x}/${coord.y}/current.png`\n        },\n        tileSize: new google.maps.Size(256, 256)\n    });\n    const StormCellsAndLightning = new google.maps.ImageMapType({\n        getTileUrl: function (coord, zoom) {\n            return `https://maps3.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/stormcells,stormreports,lightning-strike-density/${zoom}/${coord.x}/${coord.y}/current.png`\n        },\n        tileSize: new google.maps.Size(256, 256)\n    });\n\n    const firesDroughtAlertsTropical = new google.maps.ImageMapType({\n        getTileUrl: function (coord, zoom) {\n            return `https://maps4.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/drought-monitor,tropical,fires-outlook,alerts/${zoom}/${coord.x}/${coord.y}/current.png`\n        },\n        tileSize: new google.maps.Size(256, 256)\n    });\n\n    const bounds = {\n        south: 31.8,\n        west: -123.1,\n        north: 48.6,\n        east: -62.9\n    }\n    const url = `https://maps.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/radar/512x512/${bounds.south},${bounds.west},${bounds.north},${bounds.east}/current.png`\n\n    const staticRadar = new google.maps.GroundOverlay(url, bounds, {\n        opacity: 0.8\n    });\n\n\n    const animator = new _AerisGmapsAnimator__WEBPACK_IMPORTED_MODULE_0__[\"default\"](clusterer, map);\n\n    // bindButtons({\n    return ({\n        radar,\n        RainAndSnow,\n        StormCellsAndLightning,\n        firesDroughtAlertsTropical,\n        staticRadar,\n        animator,\n        map\n    });\n}\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setOverLays);\n\n//# sourceURL=webpack:///./src/makeOverlays.js?");

/***/ }),

/***/ "./src/maps.js":
/*!*********************!*\
  !*** ./src/maps.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _makeMarkers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeMarkers */ \"./src/makeMarkers.js\");\n/* harmony import */ var _makeClusterer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeClusterer */ \"./src/makeClusterer.js\");\n/* harmony import */ var _makeOverlays_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./makeOverlays.js */ \"./src/makeOverlays.js\");\n/* harmony import */ var _initMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initMap */ \"./src/initMap.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\",()=>{\n\n    const map = Object(_initMap__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()\n    Object(_makeMarkers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(20,map)\n        .then(markers => Object(_makeClusterer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(map,markers))\n        .then(markerClusterer => Object(_makeOverlays_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(markerClusterer))\n        .then(buttonFunctions=> bindButtons(buttonFunctions));\n});\n\n\n\n\n\n\n\nfunction bindButtons({ map, radar, RainAndSnow, StormCellsAndLightning, firesDroughtAlertsTropical, staticRadar, animator }) {\n    \n    const overlayMapTypes = map.overlayMapTypes\n    const radarToggleButton = document.getElementById('toggleRadar');\n    const staticRadarToggleButton = document.getElementById('staticRadarToggleButton')\n    const rainAndSnowToggleButton = document.getElementById('toggleRainAndSnow')\n    const stormCellsAndLightningToggleButton = document.getElementById('toggleStormCells')\n    const randomCoolStuffToggleButton = document.getElementById('toggleRandomCoolStuff')\n\n    radarToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, radar, radarToggleButton))\n    rainAndSnowToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, RainAndSnow, rainAndSnowToggleButton))\n    stormCellsAndLightningToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, StormCellsAndLightning, stormCellsAndLightningToggleButton))\n    randomCoolStuffToggleButton.addEventListener('click', () => toggleOverlay(overlayMapTypes, firesDroughtAlertsTropical, randomCoolStuffToggleButton))\n    staticRadarToggleButton.addEventListener('click', () => setOverlay(map, staticRadar, staticRadarToggleButton))\n\n    const animationStartButton = document.getElementById(\"startAnimation\");\n    const animationStopButton = document.getElementById(\"stopAnimation\");\n    const animationPuaseButton = document.getElementById(\"pauseAnimation\");\n\n    animationPuaseButton.addEventListener('click', () => animator.pause())\n    animationStartButton.addEventListener('click', () => animator.start())\n    animationStopButton.addEventListener('click', () => animator.clear())\n\n\n}\n\nfunction toggleOverlay(overlayMapTypes, overlay, button) {\n    console.log(\"toggle\");\n    const overlayIdx = overlayMapTypes.indexOf(overlay);\n    if (overlayIdx === -1) {\n        overlayMapTypes.push(overlay);\n        button.classList.add(\"button-on\")\n    } else {\n        overlayMapTypes.removeAt(overlayIdx)\n        button.classList.remove(\"button-on\")\n    }\n}\n\nfunction setOverlay(map, overlay, button) {\n    if (!overlay.map) {\n        overlay.setMap(map);\n        button.classList.add(\"button-on\")\n    } else {\n        overlay.setMap(null);\n        button.classList.remove(\"button-on\")\n    }\n}\n\n//# sourceURL=webpack:///./src/maps.js?");

/***/ })

/******/ });