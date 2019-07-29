
import * as Bb from 'backbone';
import { View } from 'backbone.marionette';
import * as _ from 'underscore';
import { Radio } from 'backbone';

import './main.css';

import { App } from './apps/app.js';
import { MapView } from './views/map.js';


import main_view_template from '../templates/main_view.hbs';


document.addEventListener("DOMContentLoaded", () => {
  new App().start();
});

export class MainView extends View {
    constructor(options={}){
      _.defaults(options, {
        id: 'main_view',
        template: function(){
            return main_view_template();
        },
        regions: {
          'main_container': '.main_container'
        }
      })
      super(options);
    }

    onRender(){
//      const mapView = new MapView();
this.showChildView('main_container', new MapView());
    }
};
