import WKT from 'ol/format/WKT.js';

export function flyTo(location, view, done) {
    const duration = 2000;
    let zoom = view.getZoom();
    let parts = 2;
    let called = false;
    const maxZoom = 19;
    const minZoom = 15
    if (zoom >= minZoom) {
        zoom = minZoom;
    } else {
        zoom = zoom;
    }

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }

    view.animate({
            center: location,
            duration: duration
        },
        callback
    );
    view.animate({
            zoom: zoom,
            duration: duration / 2
        }, {
            zoom: maxZoom,
            duration: duration / 2
        },
        callback
    );
}

export function wkt(coordinates) {
    const wkt = new WKT();
    let [, geom] = coordinates.split(';');
    let coords = (wkt
        .readFeature(geom)
        .getGeometry()
        .getCoordinates()
    );
    return coords
}