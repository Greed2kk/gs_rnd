import "ol/ol.css";
import { View as MnView } from "backbone.marionette";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import Overlay from "ol/Overlay.js";
import WKT from 'ol/format/WKT.js';

//для маркера
import Point from "ol/geom/Point.js";
import Feature from "ol/Feature.js";
import { Icon, Style } from "ol/style.js";
import VectorSource from "ol/source/Vector.js";
import { Vector as VectorLayer } from "ol/layer.js";
import _ from 'underscore';
import { flyTo } from '../utils';

import map_view from "../../templates/map_view.hbs";

export class MapView extends MnView {

    className() {
        return 'map-view';
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
            info: ".markers-info",
            mapC: "#map-container",
        };
    }

    initialize() {
        _.bindAll(this, 'onCloserClick');
        this._isFlying = false;
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
            overlays: [overlay],
            target: "map-container",
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
        const wkt = new WKT();
        const { gasStationCollection, imageCollection } = this.options;
        const features = gasStationCollection.map(item => {
            const { coordinates, title, marker, id } = item.pick("id", "coordinates", "title", "marker");
            const path = imageCollection.get(marker).get('image_path');
            const [, geom] = coordinates.split(';');
            const feature = new Feature({
                name: title,
                id,
                geometry: new Point(fromLonLat(wkt
                    .readFeature(geom)
                    .getGeometry()
                    .getCoordinates()
                )),
            });
            feature.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: path,
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

        let markerVectorLayer = new VectorLayer({
            source: vectorSource,
            name: 'markers'
        });

        this.map.addLayer(markerVectorLayer);

        this.map.on("click", e => {
            this.map.forEachFeatureAtPixel(e.pixel, (feature) => {
                const { id } = feature.getProperties();
                let model = collection.get(id);
                const child = collection.find(model => model.get('active'));
                if (child) {
                    child.set('active', false);
                }
                model.set('active', true);
            });
        });

        this.initListeners();
    }

    onBeforeDestroy() {
        this.ui.closer.off('click', this.onCloserClick);
    }

    onCloserClick() {
        this.overlay.setPosition(undefined);
        const collection = this.getOption("collection");
        let model = collection.findWhere({ active: true });
        if (model) {
            model.set('active', false);
        }
    }

    findFeatureByModel(model) {
        const layers = this.map.getLayers().getArray();
        const layer = layers.find(layer => layer.getProperties().name === 'markers');
        return layer.getSource().getFeatures().find(feature => feature.getProperties().id === model.get('id'));
    }

    showOverlay(model) {
        const feature = this.findFeatureByModel(model);
        const coordinate = feature.getGeometry().getCoordinates();
        this.ui.content.html(`Это маркер: ${feature.getProperties().name}`);
        this.overlay.setPosition(coordinate);
    }

    initListeners() {
        const collection = this.getOption("collection");
        this.listenTo(collection, {
            'change:active': (model, value, options) => {
                if (value) {
                    const feature = this.findFeatureByModel(model);
                    const coordinate = feature.getGeometry().getCoordinates();
                    if (options.animate) {
                        if (!this._isFlying) {
                            this._isFlying = true;
                            flyTo(coordinate, this.map.getView(), () => {
                                model.trigger('ready', model);
                                this._isFlying = false;
                            });
                        }
                    } else {
                        model.trigger('ready', model);
                    }
                } else {
                    this.onCloserClick();
                    this.map.un('click', this.onCloserClick);
                }
            },
            'ready': (model) => {
                this.map.on('click', this.onCloserClick);
                this.showOverlay(model);
            }
        });

        this.ui.closer.on('click', this.onCloserClick);
    }
}
