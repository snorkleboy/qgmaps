const _options = {
    preloadImages: true,
    frames: 12,
    timeInterval: {
        amount: 1,
        interval: "hr"
    },
    frameSpeedMS: 500,
    bounds: {
        south: 30,
        west: -156,
        north: 49,
        east: -65
    },
    baseImageUrl: "https://maps.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/stormcells,radar/512x512"
}
export default class AerisGmapsAnimator {
    constructor(markerClusterer, map, options = {}) {
        options = Object.assign({}, _options, options)
        this.options = options
        this.markerClusterer = markerClusterer;
        this.map = map;
        this.overlays = this.makeOverlays(options.timeInterval, options.baseImageUrl, options.frames);
        this.intervalId = null;
        this.index = 0;

    }
    start() {
        this.intervalId = setInterval(
            this.animate.bind(this),
            this.options.frameSpeedMS
        )
    }
    pause() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    clear() {
        this.pause();
        this.overlays.forEach(overlay => overlay.setMap(null));
    }

    animate() {
        const lastOverlay = this.index === 0 ? this.overlays.length - 1 : this.index - 1;
        console.log({
            map: this.map,
            index: this.index,
            overlays: this.overlays
        })
        this.overlays[lastOverlay].setMap(null);
        this.overlays[this.index].setMap(this.map);
        this.index = (this.index + 1) % (this.overlays.length);
    }
    makeOverlays(timeInterval, baseUrl, frames) {
        const urls = this.makeUrls(timeInterval, baseUrl, frames)
        const overlays = [];

        urls.forEach(url => {
            overlays.push(
                new google.maps.GroundOverlay(url, this.options.bounds, {
                    opacity: 0.8
                })
            )
        })
        return overlays;
    }
    makeUrls(timeInterval, baseUrl, frames) {
        const bounds = this.options.bounds
        const arr = [];
        const format = "png"
        for (let i = frames; i > 0; i--) {
            arr.push(`${baseUrl}/${bounds.south},${bounds.west},${bounds.north},${bounds.east}/-${timeInterval.amount * i }${timeInterval.interval}.${format}`)
        }
        if (this.options.preloadImages) {
            this.preloadImages(arr);
        }
        return arr;
    }
    preloadImages(urlArr) {
        urlArr.forEach(url => {
            const preload = new Image();
            preload.src = url
        })
    }

}

