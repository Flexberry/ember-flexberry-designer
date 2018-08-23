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
    @private
    @property _showConfirmDialog
    @type Boolean
    @default false
  */
  _showConfirmDialog: false,

  actions: {
    /**
      Confirm close form with unsaved attributes.

      @method actions.confirmCloseUnsavedFormAction
    */
    confirmCloseUnsavedFormAction() {
      this.send('confirmCloseUnsavedForm');
    }
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFields
  */
  findUnsavedFields: function () {
    let isDirtyAttributes = this.get('model.hasDirtyAttributes');
    return isDirtyAttributes;
  }
});
