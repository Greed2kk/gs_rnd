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
    onAttach() {
        //работа с попапами
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
                center: fromLonLat([39.72570419311523, 47.234897586694956]),
                zoom: 14,
            })
        })
        //попап на клик с координатами
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
                event.preventDefault();
                console.log(copy);
                navigator.clipboard.writeText(copy);
                document.execCommand("copy");
            });
            //конец копирки
        });

    }

};