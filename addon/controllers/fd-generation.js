/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isNone, isBlank } from '@ember/utils';
import { Promise, resolve, reject } from 'rsvp';
import { computed } from '@ember/object';
import moment from 'moment';
import Builder from 'ember-flexberry-data/query/builder';

/**
  The controller for the form with a log of generation.

  @class FdGenerationListLogController
  @extends Ember.Controller
*/
export default Controller.extend(FdReadonlyProjectMixin, {

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
    Selected group.

    @property groupValue
    @type String
  */
  groupValue: undefined,

  /**
    Array groups.

    @property groupArray
    @type Array
  */
  groupArray: computed('i18n.locale', function() {
    return A([
      this.get('i18n').t('forms.fd-generation.all-states').toString(),
      this.get('i18n').t('forms.fd-generation.run-caption').toString(),
      this.get('i18n').t('forms.fd-generation.success-caption').toString(),
      this.get('i18n').t('forms.fd-generation.error-caption').toString(),
      this.get('i18n').t('forms.fd-generation.other-caption').toString()
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

    this.set('groupValue', this.get('i18n').t('forms.fd-generation.all-states').toString());
  },

  /**
    Load generation.

    @method loadGeneration
  */
  loadGeneration(generationId, store, indexLoad) {
    let modelName = 'fd-generation';
    let projectionName = 'EditFormView';
    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .byId(generationId);

    return new Promise((resolve) => { setTimeout(resolve, 2000); })
    .then(() => store.queryRecord(modelName, builder.build()))
    .then((generation) => {
      if (indexLoad > 5) {
        return reject({ message: this.get('i18n').t('forms.fd-generation.error-message.empty-generation').toString() });
      } else if (isNone(generation)) {
        return this.loadGeneration(generationId, store, indexLoad++);
      }

      return resolve(generation);
    });
  },

  actions: {
    /**
      Starts generation, opens its log when it starts successfully.

      @method actions.generate
    */
    generate() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');
      let project = this.get('currentProjectContext').getCurrentStage();

      adapter.callFunction('Generate', { project })
      .then((result) => this.loadGeneration(result.value, store, 0))
      .then((generation) => {
        let model = { data: generation, active: true };
        this.get('model.run').unshiftObject(model);
        this.get('fdSheetService').openSheet(this.get('sheetComponentName'), model);
        this.send('updateModel');
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
