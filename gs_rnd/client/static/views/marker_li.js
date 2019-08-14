import { View, CollectionView } from 'backbone.marionette';
import * as _ from 'underscore';

//import { SightsCollection } from '../models/sight.js';
import markerList from '../../templates/list_view.hbs';


import './marker_li.scss';

class GasStationView extends View {
    // id() {
    //     return 'marker_button';
    // }

    tagName() {
        return 'div';
    }

    className() {
        return 'list-group-item list-group-item-action list-info-gs';
    }


    template(data) {
        return `${data.name}`;
    }

    modelEvents() {
        return {
            'change': 'render',
        };
    }

    onRender() {
        this.$el.toggleClass('active', this.model.get('active'));
    }

    triggers() {
        return {
            'click': 'child:click',
        };
    }
}

class GasStationCollectionView extends CollectionView {
    tagName() {
        return 'div';
    }

    className() {
        return 'list-group';
    }
    childView() {
            return GasStationView;
        }
        // childViewTriggers
    childViewEvents() {
        return {
            'child:click': view => {
                const child = this.collection.find(model => model.get('active'));
                if (child) {
                    child.set('active', false);
                }
                view.model.set('active', true);
                console.log('вы кликнули по', view.model.get('name'));
            }
        }
    }
}

export class MarkerView extends View {
    tagName() {
        return 'div';
    }

    className() {
        return 'all-markers';
    }

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

    onRender() {
        this.showChildView('qlist', new GasStationCollectionView({
            collection: this.getOption('collection'),
        }));

        // markers_info.forEach(function(marker) {
        //     (new MyView(marker)).render()
        // });
    }
}