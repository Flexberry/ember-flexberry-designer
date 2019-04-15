import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';

export default EditFormNewRoute.extend({
  modelProjection: 'FdDiagramE',
  modelName: 'fd-diagram',
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
