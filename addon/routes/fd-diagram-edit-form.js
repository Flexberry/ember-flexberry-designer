import EditFormRoute from 'ember-flexberry/routes/edit-form';

import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default EditFormRoute.extend({
  modelProjection: 'FdUmlCad',
  modelName: 'fd-dev-uml-cad',


  setupController: function (controller, model) {
  this._super(...arguments);
    let primitivesJsonString = model.get('primitivesJsonString');
    model.set('primitives', eval(primitivesJsonString));
  }

});
