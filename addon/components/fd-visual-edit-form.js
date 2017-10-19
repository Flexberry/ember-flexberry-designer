import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  /**
  Flag: indicates whether to show creation button at toolbar.

  @property createNewButton
  @type Boolean
  @default true
  */
  createNewButton: true,

  model: undefined,

  /**
    Flag: indicates whether to show delete button at toolbar.

    @property deleteButton
    @type Boolean
    @default true
  */
  deleteButton: true,

  /**
    Control view.

    @property control
    @type Object
    @default null
  */
  control: undefined,

  /**
    Current selected control.

    @property selectedControl
    @type Object
    @default null
  */

  selectedControl: undefined,

  /**
    Current selected control.

    @property selectedControl
    @type Object
    @default null
  */

  selectedField: undefined,

  /**
    Controls array from model.

    @property controls
    @type DS.ManyArray
    @default null
  */
  controls: undefined,

  actions: {
    addControl() {
      let store = this.get('store');
      let fdControlModel = store.createRecord('fd-visual-edit-control',
      {
        isSelected: true,
        name: 'New control',
        notNullable: true,
      });

      this.clearSelection();
      this.get('model.controls').pushObject(fdControlModel);
      this.set('selectedControl', fdControlModel);
    },

    controlClick(control) {
      this.set('selectedControl', control);
      this.clearSelection();
      control.set('isSelected', true);
    },

  },

  clearSelection() {
    let controls = this.get('model.controls');
    controls.forEach(function(item) {
      item.set('isSelected', false);
    });
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
