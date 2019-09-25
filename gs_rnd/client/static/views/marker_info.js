import { View } from 'backbone.marionette';
import marker_info from '../../templates/marker_info.hbs';
import './marker_li.scss';
import { wkt } from '../utils';

export class MarkerInfoView extends View {

    className() {
        return 'markers-info';
    }

    template(data) {
        const model = data.active;
        if (model) {
            const path = data.imageCollection.get(model.get('logo')).get('image_path');
            let cords = model.get('coordinates'); // fix
            let addr = model.get('address'); ///fix
            let coords = wkt(cords); //fix
            data.geometry = `Lon: ${coords[0].toFixed(4)}<br>Lat: ${coords[1].toFixed(4)}`
            data.address = addr; //fix
            data.title = model.get('title');
            data.image = path;
        }
        return marker_info(data);
    }

    ui() {
        return {
            mInfo: ".markers-info",
            info: ".info",
        };
    }

    regions() {
        return {
            'markersInfo': '.markers-info',
            'info': '.info',
        }
    }

    modelEvents() {
        return {
            'change:active': 'render',
        };
    }

    initialize() {
        this.model = new Backbone.Model({ imageCollection: this.getOption("imageCollection") });

        this.initListeners();
    }

    onRender() {
        this.$el.toggleClass('hide', !this.model.get('active'));
    }

    initListeners() {
        const gasStationCollection = this.getOption("gasStationCollection");
        this.listenTo(gasStationCollection, {
            'ready': (model) => {
                this.model.set('active', model);
            },
            'change:active': (model, value) => {
                if (!value) {
                    this.model.unset('active');
                }
            },
            'update': (gasStationCollection, options) => {
                const model = this.model.get('active');
                if (model) {
                    if (!gasStationCollection.get(model.get('id'))) {
                        this.model.unset('active');
                    }
                }
            }
        });
    }
}