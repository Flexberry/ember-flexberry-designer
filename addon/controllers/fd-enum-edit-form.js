import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'fd-class-list-form',
  header: Ember.computed.alias('model.data.name')
});
