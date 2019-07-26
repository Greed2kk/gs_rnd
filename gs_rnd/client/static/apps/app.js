import { Application } from 'backbone.marionette';
import { history } from 'backbone';
import { MainView } from '../main.js';
import * as _ from 'underscore';


export class App extends Application {


  constructor(options={}) {
    _.defaults(options, {
      region: '#app',
    })
    super(options)
  }

  onStart(app, options) {
//    history.start();

    this.showView( new MainView() )
  }
};


