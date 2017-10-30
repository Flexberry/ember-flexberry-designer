import Ember from 'ember';

export default Ember.Component.extend({

  /**
    @property store
    @type Service
  */
  store: Ember.inject.service(),

  /**
  Flag: indicates whether to show creation button at toolbar.

  @property createNewButton
  @type Boolean
  @default true
  */
  createNewButton: true,

  /**
    Model view.

    @property model
    @type Object
    @default undefined
  */
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
    @default undefined
  */
  control: undefined,

  /**
    Current selected control.

    @property selectedControl
    @type Object
    @default undefined
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
    @default undefined
  */
  controls: undefined,

  actions: {

    /**
      Handles form 'addControl' button click.

      @method addControl
      @public
    */
    addControl() {
      let store = this.get('store');
      let fdControlModel = store.createRecord('fd-visual-edit-control',
      {
        isSelected: true,
        name: 'New control',
        notNullable: true,
      });

      this._clearSelection();
      this.get('model.controls').pushObject(fdControlModel);
      this.set('selectedControl', fdControlModel);
    },

    /**
      Handles form 'deleteControl' button click.

      @method deleteControl
      @public
    */
    deleteControl() {
      let controls = this.get('controls');
      let selectedControl = this.get('selectedControl');
      if (selectedControl && selectedControl !== controls.get('firstObject') && controls.toArray().length !== 1) {
        selectedControl.destroyRecord().then(() => {
          selectedControl.unloadRecord();
        });
        this._clearSelection();
        let lastControl = controls.get('firstObject');
        lastControl.set('isSelected', true);
        this.set('selectedControl', lastControl);
      }
    },

    /**
      Handles control-field 'controlClick' action.

      @method controlClick
      @public
    */
    controlClick(control) {
      this.set('selectedControl', control);
      this._clearSelection();
      control.set('isSelected', true);
    },

  },

  /**
    Reset selection of controls in model.

    @method _clearSelection
    @private
  */
  _clearSelection() {
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

    let controls = this.get('controls');
    this.set('selectedControl', controls ? controls.get('firstObject') : undefined);
  },

  /**
    Initializes DOM-related component's properties.
  */
  didInsertElement() {
    this._super(...arguments);
  },
});
