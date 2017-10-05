import Ember from 'ember';

export default Ember.Component.extend({
  /**
  Flag: indicates whether to show creation button at toolbar.

  @property createNewButton
  @type Boolean
  @default true
  */
  createNewButton: true,

  /**
    Flag: indicates whether to show delete button at toolbar.

    @property deleteButton
    @type Boolean
    @default true
  */
  deleteButton: true,

  /**
    Content to be displayed (models collection).

    @property content
    @type Object
    @default null
  */
  component: Ember.inject.service('fd-visual-edit-control'),

  /**
    Content to be displayed (models collection).

    @property content
    @type DS.ManyArray
    @default null
  */
  components: undefined,

  actions: {
    addComponent() {
      let store = this.get('store');
      let component = this.get('fd-visual-edit-control');
      let components = this.get('components');
      components = this.get('fd-visual-edit-form.components');
      this.store.createRecord(component, {});
      store.createRecord(components, {});
    }
  },

  /**
      Initializes component.
  */
  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);
  },

});
