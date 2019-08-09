import { View } from 'backbone.marionette';
//import { Events } from 'backbone';
//import { SightsCollection } from '../models/sight.js';
import marker_info from '../../templates/marker_info.hbs';
import './marker_li.scss';


export class MarkerInfoView extends View {
    tagName() {
        return 'div';
    }

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
        this.showInfo();
        this.$el.toggleClass('hide', !this.model.get('active'));
    }

    showInfo() {
        const collection = this.getOption("collection");
        const model = collection.on(
            "change:selected",
            (model, value, options) => {
                const gasStation = collection.findWhere({ selected: true });
                this.model.set('active', gasStation);
                // if (value) {
                //     this.model.set('active', model);
                // const coords = model.get("geometry");
                // const name = model.get("name");
                // const image = model.get("image");
                // //let z = this.$el.find('.title-info');
                // //console.log(z);
                // let title = document.querySelector('.title-info');
                // title.innerHTML = name;
                // let coord = document.querySelector('.full-info');
                // coord.innerHTML = `Координаты: <br> Lon: ${coords[0].toFixed(4)} <br> Lat: ${coords[1].toFixed(4)}`;
                // }
            });
    }

};