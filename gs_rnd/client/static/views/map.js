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

//import template_map from '../../templates/map_view.hbs';
import main_view from '../../templates/main_view.hbs';

export class MapView extends MnView {

    constructor(options = {}) {
        _.defaults(options, {
            id: 'main_view',
            template: function () {
                return main_view();
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
                center: fromLonLat([47.24007, 39.71067]),
                zoom: 18,
            })
        })
    }
};

