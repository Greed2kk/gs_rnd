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
            data = model.toJSON();
            let coords = wkt(data.coordinates);
            data.geometry = `Координаты: <br> Lon: ${coords[0].toFixed(4)} <br> Lat: ${coords[1].toFixed(4)}`;
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
        this.model = new Backbone.Model();
        this.initListeners();
    }

    onRender() {
        this.$el.toggleClass('hide', !this.model.get('active'));
    }

    initListeners() {
        const collection = this.getOption("collection");
        this.listenTo(collection, {
            'ready': (model) => {
                this.model.set('active', model);
            },
            'change:active': (model, value) => {
                if (!value) {
                    this.model.unset('active');
                }
            },
            'update': (collection, options) => {
                const model = this.model.get('active');
                if (model) {
                    if (!collection.get(model.get('id'))) {
                        this.model.unset('active');
                    }
                }
            }
        });
    }
}