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

    template() {
        return marker_info();
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

    showInfo() {

        const model = this.getOption("collection").on(
            "change:selected",
            (model, value, options) => {
                console.log('hi');
                if (value) {
                    console.log('hi');
                }

            });
    }
};