import Ember from 'ember';
/*import FdVisualEditFormModel from 'ember-flexberry-designer/models/fd-visual-edit-form';*/

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
  component: undefined,

  /**
    Content to be displayed (models collection).

    @property content
    @type DS.ManyArray
    @default null
  */
  components: null,

  actions: {
    addComponent(component) {
      let components = this.get('components');
      components = Ember.A();
      components.pushObject(component);
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
