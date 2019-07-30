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
import {toLonLat} from 'ol/proj.js';


import {toStringHDMS} from 'ol/coordinate.js'
import Overlay from 'ol/Overlay.js';

import * as gas_def from '../icons/gas_def.png';
import * as _default from '../icons/default.png';

//import template_map from '../../templates/map_view.hbs';
import main_view from '../../templates/main_view.hbs';

import popup_view from '../../templates/popup_cords.hbs';

export class MapView extends MnView {

    constructor(options = {}) {
        _.defaults(options, {
            id: 'main_view',
            template: function () {
                return main_view(), popup_view();
            },
        });
        super(options);
    }

    onAttach (){
        this.activeLayer = "OSM";
        this.map = new Map({
            target: 'main_view',
             layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
            view: new View({
                center: fromLonLat([ 39.719510, 47.232462]),
                zoom: 13,
            })
        })


        this.map.on('singleclick', function(evt) {
        let coordinate = evt.coordinate;
        let hdms = toStringHDMS(toLonLat(coordinate));

        content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
            '</code>';
        overlay.setPosition(coordinate);
      });



    }

//работа с попапами
onLeftMapClick(){

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

var overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };





}








};

