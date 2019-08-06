import { View, CollectionView } from 'backbone.marionette';
import * as _ from 'underscore';
import $ from 'jquery';

//import { SightsCollection } from '../models/sight.js';
import markerList from '../../templates/list_view.hbs';
import { MapView } from './map.js';

import './marker_li.scss';

class GasStationView extends View {
    template(data) {
        return `<div>${data.name}</div>`;
    }

    modelEvents() {
        return {
            'change': 'render',
        };
    }

    onRender() {
        this.$el.toggleClass('selected', this.model.get('selected'));
    }

    // events() {
    //     return {
    //         'click': 'onClick'
    //     }
    // }
    // onClick() {
    //     this.trigger('child:click', this);
    // }
    triggers() {
        return {
            'click': 'child:click',
        };
    }
}

class GasStationCollectionView extends CollectionView {
    childView() {
            return GasStationView;
        }
        // childViewTriggers
    childViewEvents() {
        return {
            'child:click': view => {
                const child = this.collection.find(model => model.get('selected'));
                if (child) {
                    child.set('selected', false);
                }
                view.model.set('selected', true);
                console.log('вы кликнули по', view.model.get('name'));
            }
        }
    }
}

export class MarkerView extends View {

    template() {
        return markerList();
    }

    ui() {
        return {
            's-area': '.search-area',
            's-control': '.search-controls',
            's-bar': '.search-bar',
            'cter': '.container',
        };
    }

    regions() {
        return {
            'qlist': '.sights-list',
        }
    }

    initialize() {
        function myMarkers(data) {
            this.marker = data;
        }
    }

    onRender() {
        this.showChildView('qlist', new GasStationCollectionView({
            collection: this.getOption('collection'),
        }));

        // markers_info.forEach(function(marker) {
        //     (new MyView(marker)).render()
        // });
    }
}