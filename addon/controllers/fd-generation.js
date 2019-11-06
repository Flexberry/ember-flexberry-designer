/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import FdReadonlyFromBackendMixin from '../mixins/fd-readonly-from-backend';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isNone, isBlank } from '@ember/utils';
import EmberObject, { computed, observer } from '@ember/object';
import moment from 'moment';
import Builder from 'ember-flexberry-data/query/builder';

/**
  The controller for the form with a log of generation.

  @class FdGenerationListLogController
  @extends Ember.Controller
*/
export default Controller.extend(FdReadonlyFromBackendMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

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
    Ember.observer, watching property `searchValue` and send action from 'fd-sheet' component.

    @method searchValueObserver
  */
  searchValueObserver: observer('searchValue', function() {
    let sheetComponentName = this.get('sheetComponentName');
    let fdSheetService = this.get('fdSheetService');
    if (fdSheetService.isVisible(sheetComponentName)) {
      fdSheetService.closeSheet(sheetComponentName);
    }
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

  actions: {
    /**
      Starts generation, opens its log when it starts successfully.

      @method actions.generate
    */
    generate() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');
      let project = this.get('currentProjectContext').getCurrentStage();

      adapter.callFunction('Generate', { project }).then((result) => {
        let modelName = 'fd-generation';
        let projectionName = 'EditFormView';
        let builder = new Builder(store)
          .from(modelName)
          .selectByProjection(projectionName)
          .byId(result.value);

        store.queryRecord(modelName, builder.build()).then((generation) => {
          let model = { data: generation, active: true };
          this.get('model.run').unshiftObject(model);
          this.get('fdSheetService').openSheet(this.get('sheetComponentName'), EmberObject.create({ model: model }));
          this.send('updateModel');
        });
      });
    },

    /**
      This method will notify all observers that the model changed value.

       @method actions.updateModel
    */
    updateModel() {
      this.notifyPropertyChange('model');
    }
  }
});
