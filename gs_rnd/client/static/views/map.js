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

import * as gas_def from '../icons/gas_def.png';
import * as _default from '../icons/default.png';

import template_map from '../../templates/map_view.hbs';


export class MapView extends MnView {
//    template() {
//        return template_map();
//    }
    constructor(options = {}) {
        _.defaults(options, {
            id: 'map_view',
            template: function () {
                return template_map();
            },
        });
        super(options);

    }
    onAttach (){
         this.activeLayer = "OSM";
        this.map = new Map({
            target: 'map',
            view: new View({
                center: fromLonLat([46.31907010112867, 47.08480340314222]),
                zoom: 12,
            })
        })
    }
};

