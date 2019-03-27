import Ember from 'ember';
import layout from '../../templates/components/fd-editing-panels/fd-create-entity';

export default Ember.Component.extend({
  layout,

  actions: {
    /**
      Create new Class

       @method actions.createClass
    */
    createClass(name) {
      this.sendAction('createClass', name);
    }
  }
});