'use strict';

module.exports = {
  name: 'ember-flexberry-designer',

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/@aspnet/signalr/dist/browser/signalr.js');
  }
};
