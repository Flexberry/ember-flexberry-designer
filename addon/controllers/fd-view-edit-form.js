import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';

export default EditFormController.extend({
  parentRoute: 'fd-view-list-form',

  selectedRowIndex: null,
  lookupTypeItems: ['default', 'standard', 'combo', 'custom'],

  propertyType: Ember.computed('rowModel', function() {
    let rowModel = this.get('rowModel');
    if (rowModel instanceof FdViewAttributesDetail) {
      return 'isDetail';
    } else if (rowModel instanceof FdViewAttributesMaster) {
      return 'isMaster';
    } else {
      return null;
    }
  }),

  rowModel: Ember.computed('selectedRowIndex', function() {
    let model = this.get('model.data.definition');
    let index = this.get('selectedRowIndex');
    if (!Ember.isNone(index)) {
      let rowModel = model[index];
      return rowModel;
    }

    return null;
  }),

  actions: {
    onCreateCaptionClick() {
      let rowModel = this.get('rowModel');
      if (Ember.isNone(rowModel)) {
        return;
      }

      let splitName = rowModel.name.split('.');
      let caption = '';
      splitName.forEach((partCaption) => {
        caption = partCaption + ' ' + caption;
      });

      Ember.set(rowModel, 'caption', caption.trim());
    },

    onAttributesClick(index) {
      this.set('selectedRowIndex', index);
    }
  }
});
