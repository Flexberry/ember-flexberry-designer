import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';

export default EditFormNewRoute.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-uml-cad',
  templateName: 'fd-diagram-edit-form',

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  model() {
    let newRecord = this._super(...arguments);
    newRecord.set('primitivesJsonString', '[]');
    return newRecord;
  }
});
