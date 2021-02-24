/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';
import FdGroupDropdown from '../mixins/fd-group-dropdown';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isNone, isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import moment from 'moment';

/**
  The controller for the form with a log of generation.

  @class FdGenerationListLogController
  @extends Ember.Controller
*/
export default Controller.extend(FdReadonlyProjectMixin, FdGroupDropdown, {

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Value search input.

    @property searchValue
    @type String
    @default ''
  */
  searchValue: '',

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Array groups.

    @property groupArray
    @type Array
  */
  groupArray: computed('i18n.locale', function() {
    return A([
      'forms.fd-generation.all-states',
      'forms.fd-generation.run-caption',
      'forms.fd-generation.success-caption',
      'forms.fd-generation.error-caption',
      'forms.fd-generation.other-caption'
    ]);
  }),

  /**
    Update model for search

    @method filteredModel
  */
  filteredModel: computed('model', 'searchValue', function() {
    let searchStr = this.get('searchValue');
    let model = this.get('model');

    if (isBlank(searchStr)) {
      return model;
    }

    searchStr = searchStr.trim().toLocaleLowerCase();
    let filterFunction = function(item) {
      let data = moment(item.data.get('startTime')).format('DD.MM.YYYY HH:mm:ss');
      if (!isNone(data) && data.toLocaleLowerCase().indexOf(searchStr) !== -1) {
        return item;
      }
    };

    let newModel = {};

    for (let prop in model) {
      let newdata = model[prop].filter(filterFunction);
      newModel[prop] = A(newdata);
    }

    return newModel;
  }),

  init() {
    this._super(...arguments);

    this.set('groupValueLocale', 'forms.fd-generation.all-states');
  },

  actions: {
    /**
      This method will notify all observers that the model changed value.

       @method actions.updateModel
    */
    updateModel() {
      this.notifyPropertyChange('model');
    }
  }
});
