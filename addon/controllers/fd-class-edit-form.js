import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'fd-class-list-form',

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'fd-class-storage-type+storageType':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'shortName',
            required: true,
            relationName: 'storageType',
            projection: 'ListFormView',
            dropdown: true,
            dropdownIsSearch: false,
            sorting: 'desc',
            direction: 'downward'
          };
          break;

      }
    }

    return cellComponent;
  },
});
