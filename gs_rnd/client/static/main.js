import { View } from 'backbone.marionette';
import * as _ from 'underscore';
import 'bootstrap';
import { Collection } from 'backbone';

import { App } from './apps/app.js';
import { MapView } from './views/map.js';
import { MarkerView } from './views/marker_li.js';
import { MarkerInfoView } from './views/marker_info.js';
import { GasStation } from './models/gas_station.js';
import { Auth } from './views/auth.js';

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
                'auth': '.auth-view-container',
            }
        })
        super(options);
    }

    onRender() {
        class GasStationList extends Collection {

            url() {
                return '/api/gas_stations';
            }

            get model() {
                return GasStation;
            }
        }

        class ImageList extends Collection {

            url() {
                return '/api/images/';
            }
        }

        const gasStationCollection = new GasStationList();
        const imageCollection = new ImageList();

        imageCollection.fetch().then(() => {

            this.showChildView('auth', new Auth({}));

            gasStationCollection.fetch();

            this.showChildView('info', new MarkerInfoView({
                gasStationCollection,
                imageCollection,

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
}