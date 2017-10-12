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
    addComponent() {
      let store = this.get('store');
      let model = this.get('model');

      let fdControlModel = store.createRecord('fd-visual-edit-control',
      {
        name: 'New control'
      });

      model.get('controls').pushObject(fdControlModel);
    },

    controlClick(control, event) {
      this.set('selectedControl', control);

      let selectedField = this.get('selectedField');
      if (selectedField && selectedField.hasClass('selected-field')) {
        selectedField.removeClass('selected-field ');
      }

      let $this = Ember.$(event.currentTarget);
      $this.addClass('selected-field ');
      this.set('selectedField', $this);
    },

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
