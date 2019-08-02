import "ol/ol.css";
import { View as MnView } from 'backbone.marionette';
import _ from "underscore";
import $ from 'jquery';
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from 'ol/source/XYZ';
import { toLonLat } from 'ol/proj.js';
import { defaults as defaultControls } from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import { click } from 'ol/events/condition.js';
import Select from 'ol/interaction/Select.js';

//для маркера
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { Icon, Style } from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';
import { Vector as VectorLayer } from 'ol/layer.js';

import Overlay from 'ol/Overlay.js';

import * as default_marker from '../icons/default.png';
import * as gas_def from '../icons/gas_def.png';

//import template_map from '../../templates/map_view.hbs';
import main_view from '../../templates/main_view.hbs';

import popup_view from '../../templates/popup_cords.hbs';


//import map_markers_view from '../../templates/map_markers_popup.hbs';

export class MapView extends MnView {

  template() {
    return main_view(), popup_view();
  }

  ui() {
    return {
        'popup': '#popup',
        'content': '#popup-content',
        'closer': '#popup-closer',
    };
  }



  onAttach() {
//    var container = document.querySelector('#popup');
//    var content = document.querySelector('#popup-content');
//    var closer = document.querySelector('#popup-closer');
   // debugger
    var overlay = new Overlay({
      element: this.ui.popup[0],
      autoPan: false,
      autoPanMargin: 200,
      autoPanAnimation: {
        duration: 250
      }
    });

    overlay.setOffset([0, -20]);

    this.ui.closer.on('click', () => {
        overlay.setPosition(undefined);
        this.ui.closer.blur();
        return false;
    })

    function customLatLng(coord) {
        const [ lat, lng ] = coord;
        return `Lat:${lat.toFixed(2)} Lon:${lng.toFixed(2)}`;
    }

    var mousePositionControl = new MousePosition({
      coordinateFormat: customLatLng,
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
     // target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    //debugger;

    this.activeLayer = "OSM";
    this.map = new Map({
      controls: defaultControls().extend([mousePositionControl]),
      overlays: [overlay],
      target: 'main_view',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([39.712277054786675, 47.23726874200372]),
        zoom: 14,
      })
    })

    //this.map.addOverlay(mousePositionControl);

    let marker_def = new Feature({
      geometry: new Point(
        fromLonLat([39.71230493509211, 47.23719566405421])
      ),
      name: 'Default marker',
    });
    marker_def.setStyle(new Style({
      image: new Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: default_marker,
        size: [64, 64],
        scale: 0.5,
      }))
    }));

    let marker_rosneft = new Feature({
      geometry: new Point(
        fromLonLat([39.71280724683311, 47.24232550518022])
      ),
      name: 'Rosneft',

    });

    marker_rosneft.setStyle(new Style({
      image: new Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: gas_def,
        size: [64, 64],
        scale: 0.5,
      }))
    }));

    let vectorSource = new VectorSource({
      features: [marker_def, marker_rosneft]

    });

    let markerVectorLayer = new VectorLayer({
      source: vectorSource,
    });
    this.map.addLayer(markerVectorLayer);

    this.map.on('click', (e) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        console.log(`Координаты ${feature.getGeometry().getCoordinates()}`);
        const coordinate = feature.getGeometry().getCoordinates();
        this.ui.content.html(`Это маркер: ${feature.values_.name}`);
        overlay.setPosition(coordinate);
      })
    })
  }

};