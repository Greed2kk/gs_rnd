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

  constructor(options = {}) {
    _.defaults(options, {
      id: 'main_view',
      template: function () {
        return main_view(), popup_view()
      },
    });
    super(options);
  }

  onAttach() {

    //работа с попапами
    //////////////////////////////////

    let container = document.querySelector('#popup');
    let content = document.querySelector('#popup-content');
    let closer = document.querySelector('#popup-closer');

    let overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });


    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };


    this.activeLayer = "OSM";
    this.map = new Map({
      overlays: [overlay],
      target: 'test,
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

    ///////////////////////////маркеры//////////////
    ///////////////////////////////////////////////
    let marker = new Feature({
      geometry: new Point(
        fromLonLat([39.71158504486084, 47.241686602422476])
      ),
    });

    let marker2 = new Feature({
      geometry: new Point(
        fromLonLat([39.71230493509211,47.23719566405421])
      ),
      name: 'Test',
      population: 4000,
      rainfall: 500,
    });
    marker2.setStyle(new Style({
      image: new Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: default_marker,
        size: [64, 64],
        scale: 0.5,
      }))
    }));

      let marker3 = new Feature({
      geometry: new Point(
        fromLonLat([39.71280724683311,47.24232550518022])
      ),
       name: 'Null Island',
       population: 4000,
       rainfall: 500,
    });
       marker3.setStyle(new Style({
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
      features: [marker, marker2, marker3]

    });

    let markerVectorLayer = new VectorLayer({
      source: vectorSource,
    });
    this.map.addLayer(markerVectorLayer);

    //////////////////////////конец маркеров//////////////////////
    //////////////////////////////////////////////////////////////

    //попап на клик с координатами
    //////////////////////////////////////////
    this.map.on('contextmenu', function (evt) {
      let coordinate = evt.coordinate;
      let hdms = toLonLat(coordinate);

      //конец попапа на клик с координатами

      //начало копирки
      content.innerHTML = `Координаты клика: <div id='copy'>${hdms}</div>`;
      overlay.setPosition(coordinate);
      let button = document.getElementById('userButton');
      let copy = document.getElementById('copy').textContent;
      button.addEventListener("click", function (event) {
        navigator.clipboard.writeText(copy);
        document.execCommand("copy");
      });
    });

/////////////конец копирки
/////////////////////////////////////////////


////////////////////popup на маркеры /////////
//
    let element = document.getElementById('marker_popup');

      let popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      });
      this.map.addOverlay(popup);


      // display popup on click
      this.map.on('click', (evt) => {
        let feature = this.map.forEachFeatureAtPixel(evt.pixel,
          function(feature) {
            return feature;
          });
        if (feature) {
          let coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          $(element).popover({
            placement: 'top',
            html: true,
            content: feature.get('name')
          });
          $(element).popover('show');
        } else {
          $(element).popover('destroy');
        }
      });

//      // change mouse cursor when over marker
//      this.map.on('pointermove', (e) => {
//        if (e.dragging) {
//          $(element).popover('destroy');
//          return;
//        }
//        let pixel = this.map.getEventPixel(e.originalEvent);
//      let hit = this.map.hasFeatureAtPixel(pixel);
//        this.map.getTarget().style.cursor = hit ? 'pointer' : '';
//      });

////////////////////popup на маркеры /////////


////////////////////////////////////////////////////////////////////
///////////////отключение контекста при нажатии пкм ////////////////
window.oncontextmenu = (function(e){                ////////////////
    return false;                                   ////////////////
});                                                 ////////////////
///////////////отключение контекста при нажатии пкм ////////////////
////////////////////////////////////////////////////////////////////
  }






};