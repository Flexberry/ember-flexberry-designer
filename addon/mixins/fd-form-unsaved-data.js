/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Mixin with the unsaved form data check, and confirm close.

  @class FdFormUnsavedData
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
    @property formName
    @type String
    @default ''
  */
  formName: '',

  /**
    @property saveTitleLocaleKey
    @type String
    @default undefined
  */
  saveTitleLocaleKey: Ember.computed('formName', function () {
    let mesageKey = 'forms.' + this.get('formName') + '.save-title';
    return mesageKey;
  }),

  /**
    @property saveMessageLocaleKey
    @type String
    @default undefined
  */
  saveMessageLocaleKey: Ember.computed('formName', function () {
    let mesageKey = 'forms.' + this.get('formName') + '.save-message';
    return mesageKey;
  }),

  /**
    @property saveButtonLocaleKey
    @type String
    @default undefined
  */
  saveButtonLocaleKey: Ember.computed('formName', function () {
    let mesageKey = 'forms.' + this.get('formName') + '.save-button';
    return mesageKey;
  }),

  /**
    @property rollbackButtonLocaleKey
    @type String
    @default undefined
  */
  rollbackButtonLocaleKey: Ember.computed('formName', function () {
    let mesageKey = 'forms.' + this.get('formName') + '.rollback-button';
    return mesageKey;
  }),

  /**
    Transition, aborted for some reason.

    @property abortedTransition
    @type Transition
  */
  abortedTransition: undefined,

  actions: {
    /**
      Repeats an attempt to perform a previously aborted transition, or transition to the application structure form.

      @method actions.closeUnsavedForm
    */
    closeUnsavedForm() {
      if (this.get('abortedTransition')) {
        this.get('abortedTransition').retry();
        this.set('abortedTransition', undefined);
      } else {
        this.transitionToRoute('fd-appstruct-form');
      }
    },

    /**
      Cancels the changes made to the type map, and send `close` action.

      @method actions.rollback
    */
    rollback() {
      this.clearDirtyAttributes();
      this.send('removeModalDialog');
      this.send('closeUnsavedForm');
    },

    /**
      Save changes and close form

      @method actions.closeWithSaving
    */
    closeWithSaving() {
      this.send('saveAndClose');
    }
  },

  /**
    Cancel form data changes

    @method clearDirtyAttributes
  */
  clearDirtyAttributes: function () {
    this.get('model').rollbackAttributes();
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFormData
  */
  findUnsavedFormData: function () {
    let isDirtyAttributes = this.get('model.hasDirtyAttributes');
    return isDirtyAttributes;
  }
});
