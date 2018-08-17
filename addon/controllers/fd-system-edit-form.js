import EditFormController from 'ember-flexberry/controllers/edit-form';
import Ember from 'ember';

export default EditFormController.extend({
  parentRoute: 'fd-system-list-form',

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
    let checkResult = false;
    let modelChanges = this.get('model').changedAttributes();

    if (Ember.keys(modelChanges).length > 0) {
      checkResult = true;
    }

    return checkResult;
  }
});
