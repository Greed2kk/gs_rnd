import { View } from 'backbone.marionette';
import * as _ from 'underscore';
import 'bootstrap';

import { App } from './apps/app.js';
import { MapView } from './views/map.js';
import { MarkerView } from './views/marker_li.js';
import { MarkerInfoView } from './views/marker_info.js';


import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

import main_view_template from '../templates/main_view.hbs';

document.addEventListener("DOMContentLoaded", () => {
    new App().start();
});

export class MainView extends View {
    constructor(options = {}) {
        _.defaults(options, {
            id: 'main_view',
            template: function() {
                return main_view_template();
            },
            regions: {
                'map': '.map-view-container',
                'list': '.list-view-container',
                'info': '.info-view-container',
            }
        })
        super(options);
    }

    onRender() {
        const gasStationCollection = new Backbone.Collection([{
                geometry: [39.71230493509211, 47.23719566405421],
                name: 'Default marker',
                image: '/static/icons/default.png',
                active: false,
            },
            {
                geometry: [39.71280724683311, 47.24232550518022],
                name: 'rosneft',
                image: '/static/icons/gas_def.png',
                active: false,
            }
        ]);

        this.showChildView('info', new MarkerInfoView({
            collection: gasStationCollection,
        }));

        this.showChildView('list', new MarkerView({
            collection: gasStationCollection,
        }));
        this.showChildView('map', new MapView({
            collection: gasStationCollection,
        }));
    }
};