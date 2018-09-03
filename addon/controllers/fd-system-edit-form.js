import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'fd-system-list-form',

  sybsystemName: Ember.computed.alias('model.name')
});
