import { View } from 'backbone.marionette';
import * as _ from 'underscore';
import * as L from 'leaflet';
import $ from 'jquery';

import 'leaflet-osm';
//import 'leaflet-draw';
//import 'leaflet.measurecontrol';
//import 'leaflet-mouse-position';

import * as gas_def from '../icons/gas_def.png';
import * as _default from '../icons/default.png';


import map_template from '../../templates/map_view.hbs';

export class MapView extends View {
  constructor(options={}){
    (options, {
      id: 'map_view',
      template: map_template,
    });
    super(options);

    this.map = L.map('map_view').setView([47.2252, 39.7096], 14);
    new L.OSM.Mapnik().addTo(this.map);


  }
  };