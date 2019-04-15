/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';

/**
  Mixin with the unsaved form data check, and confirm close.

  @class FdFormUnsavedData
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  /**
    @property saveTitleLocaleKey
    @type String
    @default 'forms.fd-confirm-unsaved-form-modal.save-title'
  */
  saveTitleLocaleKey: 'forms.fd-confirm-unsaved-form-modal.save-title',

  /**
    @property saveMessageLocaleKey
    @type String
    @default 'forms.fd-confirm-unsaved-form-modal.save-message'
  */
  saveMessageLocaleKey: 'forms.fd-confirm-unsaved-form-modal.save-message',

  /**
    @property saveButtonLocaleKey
    @type String
    @default 'forms.fd-confirm-unsaved-form-modal.save-button'
  */
  saveButtonLocaleKey: 'forms.fd-confirm-unsaved-form-modal.save-button',

  /**
    @property rollbackButtonLocaleKey
    @type String
    @default 'forms.fd-confirm-unsaved-form-modal.rollback-button'
  */
  rollbackButtonLocaleKey: 'forms.fd-confirm-unsaved-form-modal.rollback-button',

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
