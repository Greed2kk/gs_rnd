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
        const GasStationCollection = Backbone.Collection.extend({
            url: '/api/gas_stations'
        });
        const ImageCollection = Backbone.Collection.extend({
            url: '/api/images'
        });

        const gasStationCollection = new GasStationCollection();
        const imageCollection = new ImageCollection();

        Promise.all([
            gasStationCollection.fetch(),
            imageCollection.fetch()
        ]).then(() => {
            this.showChildView('info', new MarkerInfoView({
                collection: gasStationCollection,
            }));
            this.showChildView('list', new MarkerView({
                collection: gasStationCollection,
            }));
            this.showChildView('map', new MapView({
                gasStationCollection,
                imageCollection,

            }));
        });
    }
};