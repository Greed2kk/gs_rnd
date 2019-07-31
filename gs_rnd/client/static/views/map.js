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
import {Icon, Style} from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';
import {Vector as VectorLayer} from 'ol/layer.js';


import Overlay from 'ol/Overlay.js';

import * as gas_def from '../icons/gas_def.png';
import * as default_marker from '../../templates/default.png';

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
        //конец работы с попапами
        ////////////////////////////////////////

            /////////////////////////////////////////
        //начало маркеров
//           var iconFeature = new Feature({
//                geometry: new Point([39.71158504486084, 47.241686602422476]),
//                name: 'random marker',
//                population: 4000,
//                rainfall: 500
//              });
//
//              var iconStyle = new Style({
//                image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
//                  anchor: [0.5, 46],
//                  anchorXUnits: 'fraction',
//                  anchorYUnits: 'pixels',
//                  src: 'default.png',
//                }))
//              });
//
//              iconFeature.setStyle(iconStyle);
//
//              var vectorSource = new VectorSource({
//                features: [iconFeature]
//              });
//
//              var vectorLayer = new VectorLayer({
//                source: vectorSource
//              });
//






//          // display popup on click
//          this.map.on('click', function(evt) {
//            var feature = this.map.forEachFeatureAtPixel(evt.pixel,
//              function(feature) {
//                return feature;
//              });
//            if (feature) {
//              var coordinates = feature.getGeometry().getCoordinates();
//              popup.setPosition(coordinates);
//              $(element).popover({
//                placement: 'top',
//                html: true,
//                content: feature.get('name')
//              });
//              $(element).popover('show');
//            } else {
//              $(element).popover('destroy');
//            }
//          });
//
//          // change mouse cursor when over marker
//          this.map.on('pointermove', function(e) {
//            if (e.dragging) {
//              $(element).popover('destroy');
//              return;
//            }
//            var pixel = this.map.getEventPixel(e.originalEvent);
//            var hit = this.map.hasFeatureAtPixel(pixel);
//            this.map.getTarget().style.cursor = hit ? 'pointer' : '';
//          });

        //конец маркеров
       ///////////////////////////////////////


        this.activeLayer = "OSM";
        this.map = new Map({
            overlays: [overlay],
            target: 'main_view',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([39.712277054786675,47.23726874200372]),
                zoom: 14,
            })
        })

//////////////////////////////попытка 2///////////////////
/////////////////////////////////////////////////////////
//var marker = new Feature({
//  geometry: new Point(
//    proj.fromLonLat([39.71158504486084, 47.241686602422476])
//  ),  // Cordinates of New York's City Hall
//});
//marker.setStyle(new Style({
//        image: new Icon (({
//            crossOrigin: 'anonymous',
//            src: 'default.png''
//        }))
//    }));
var marker = new Feature({
  geometry: new Point(
   fromLonLat([39.71158504486084, 47.241686602422476])
  ),  // Cordinates of New York's Town Hall
});

var vectorSource = new VectorSource({
  features: [marker]
});

var markerVectorLayer = new VectorLayer({
  source: vectorSource,
});
this.map.addLayer(markerVectorLayer);
//////////////////////////конец попытки 2//////////////////////
//////////////////////////////////////////////////////////////


////////////////////кусок маркера //////////////////////////
//      var element = document.getElementById('marker');
//
//          var popup = new Overlay({
//            element: element,
//            positioning: 'bottom-center',
//            stopEvent: false,
//            offset: [0, -50]
//          });
//          this.map.addOverlay(popup);
///////////////////конец куска маркера////////////////////


        //попап на клик с координатами
        //////////////////////////////////////////
        this.map.on('singleclick', function (evt) {
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
            //конец копирки
            /////////////////////////////////////////////
        });
    }






};