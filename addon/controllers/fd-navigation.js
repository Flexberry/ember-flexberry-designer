import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';

export default Controller.extend({

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Value search input.

    @property searchValue
    @type String
    @default ''
  */
  searchValue: '',

  /**
    Update classes for search

    @method filteredClasses
  */
  filteredClasses: computed('searchValue', function() {
    let searchStr = this.get('searchValue');
    let model = this.get('model.classes');

    if (isBlank(searchStr)) {
      return model;
    }

    searchStr = searchStr.trim().toLocaleLowerCase();
    let filterFunction = function(item) {
      let name = item.get('name');
      if (!isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
        return item;
      }
    };

    let newClasses = model.filter(function(clazz) {
      let classes = filterFunction(clazz.settings);
      if (!isNone(classes)) {
        return clazz;
      }

      let editForms = clazz.editForms.some(filterFunction);
      let listForms = clazz.listForms.some(filterFunction);
      if (editForms || listForms) {
        return clazz;
      }
    });

    return A(newClasses);
  }),

  actions: {
    addPage() {
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').openSheet(sheetComponentName);
    },

    addFolder() {
    },

    addUrl() {
    }
  }
});
