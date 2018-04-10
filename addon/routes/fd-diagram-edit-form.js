import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({

  modelProjection: 'FdUmlCad',

  modelName: 'fd-dev-uml-cad',

  setupController: function (controller, model) {
    this._super(...arguments);
    let primitivesJsonString = model.get('primitivesJsonString');
    model.set('primitives', eval(primitivesJsonString));
  }

});
