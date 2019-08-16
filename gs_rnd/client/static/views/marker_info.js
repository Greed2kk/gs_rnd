import { View } from 'backbone.marionette';
import marker_info from '../../templates/marker_info.hbs';
import './marker_li.scss';


export class MarkerInfoView extends View {

    className() {
        return 'markers-info';
    }

    template(data) {
        const model = data.active;
        if (model) {
            data = model.toJSON();
            const coords = data.geometry;
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
    }

    onRender() {
        this.initListeners();
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
            }
        });
    }
};
