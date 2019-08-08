import "ol/ol.css";
import { View as MnView } from "backbone.marionette";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import * as proj from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { toLonLat } from "ol/proj.js";
import { defaults as defaultControls } from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import { click } from "ol/events/condition.js";
import Select from "ol/interaction/Select.js";
import Overlay from "ol/Overlay.js";

import Zoom from "ol/control/Zoom";
import { easeIn, easeOut } from "ol/easing.js";

//для маркера
import Point from "ol/geom/Point.js";
import Feature from "ol/Feature.js";
import { Icon, Style } from "ol/style.js";
import VectorSource from "ol/source/Vector.js";
import { Vector as VectorLayer } from "ol/layer.js";


import map_view from "../../templates/map_view.hbs";
//import popup_view from '../../templates/popup_view.hbs';

export class MapView extends MnView {
    tagName() {
        return 'div';
    }

    className() {
        return 'map-container';
    }

    template() {
        return map_view();
    }

    ui() {
        return {
            popup: "#popup",
            content: "#popup-content",
            closer: "#popup-closer",
            mInfo: ".markers-info",
            info: ".info",

        };
    }

    onAttach() {
        let overlay = new Overlay({
            element: this.ui.popup[0],
            autoPan: false,
            autoPanMargin: 200,
            autoPanAnimation: {
                duration: 250
            }
        });
        this.overlay = overlay;
        overlay.setOffset([0, -20]);

        this.ui.closer.on("click", () => {
            overlay.setPosition(undefined);
            this.ui.closer.blur();
            return false;
        });

        function customLatLng(coord) {
            const [lat, lng] = coord;
            return `Lat:${lat.toFixed(4)} Lon:${lng.toFixed(4)}`;
        }

        let mousePositionControl = new MousePosition({
            coordinateFormat: customLatLng,
            projection: "EPSG:4326",
            className: "custom-mouse-position",
            undefinedHTML: "&nbsp;"
        });

        this.activeLayer = "OSM";
        this.map = new Map({
            controls: defaultControls().extend([mousePositionControl]),
            overlays: [overlay], //вот тут как???
            target: "main_view",
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([39.712277054786675, 47.23726874200372]),
                zoom: 14
            })
        });
        const { collection } = this.options;
        const features = collection.map(item => {
            const { geometry, name, image } = item.pick("geometry", "name", "image");
            const feature = new Feature({
                name,
                geometry: new Point(fromLonLat(geometry))
            });
            feature.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: image,
                        size: [64, 64],
                        scale: 0.5
                    })
                })
            );
            return feature;
        });

        let vectorSource = new VectorSource({
            features
        });
        //console.log(vectorSource);

        let markerVectorLayer = new VectorLayer({
            source: vectorSource
        });

        this.map.addLayer(markerVectorLayer);

        this.map.on("click", e => {
            this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                console.log(`Координаты ${feature.getGeometry().getCoordinates()}`);
                const coordinate = feature.getGeometry().getCoordinates();
                this.ui.content.html(`Это маркер: ${feature.values_.name}`);
                overlay.setPosition(coordinate);

            });
        });

        this.initListeners();
    }

    initListeners() {
        const view = this.map.getView();

        const model = this.getOption("collection").on(
            "change:selected",
            (model, value, options) => {
                //console.log(model);
                if (value) {
                    function show() {
                        const coords = model.get("geometry");
                        return fromLonLat(coords);
                    }
                    const coords = show();

                    let name = model.get("name");
                    console.log(coords);

                    function flyTo(location, view, done) {
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

                    setTimeout(() => {
                        flyTo(coords, view, () => {
                            // this.overlay.setPosition(undefined);
                            // this.ui.content.blur();
                            ///вот это как починить? ///
                            this.ui.content.html(`Это маркер: ${name}`);
                            this.overlay.setPosition(coords);
                            ////////////////////////////
                            console.log("done");
                        });
                    }, 500);

                }
            });
    }
}