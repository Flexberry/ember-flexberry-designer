import Ember from 'ember';
import layout from '../templates/components/fd-visual-edit-list-form';

export default Ember.Component.extend({
  layout,

  store: Ember.inject.service('store'),

  init: function() {
    this._super();
  },

  actions: {
    showForm: function() {
      let store = this.get('store');
      let select = Ember.$('#selectForm').get(0);
      let option = select.options[select.selectedIndex];
      let formId = option.value;
      let formName = option.innerText;


    }

  }


});
