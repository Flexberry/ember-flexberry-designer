import Controller from '@ember/controller';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';
import { computed } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';

export default Controller.extend(FdSheetCloseConfirm, FdReadonlyProjectMixin, {

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
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

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
      this.get('i18n').t('forms.fd-application-model.all-types').toString(),
      this.get('i18n').t('forms.fd-application-model.entity-group').toString(),
      this.get('i18n').t('forms.fd-application-model.enum-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.type-content-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.typedef-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.bs-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.interface-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.external-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.extinterface-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.application-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.userform-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.geolayer-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.geolayerstyle-caption').toString(),
      this.get('i18n').t('forms.fd-application-model.userstereotype-caption').toString(),
    ]);
  }),

  /**
    Update model for sort.

    @method sortModel
  */
  sortModel: computed('model', function() {
    let model = this.get('model');
    let newClasses = model.classes.sortBy('settings.data.name');
    let newModel = {
      classes: A(newClasses)
    };

    for (let prop in model) {
      if (prop !== 'classes') {
        let newdata = model[prop].sortBy('data.name');
        newModel[prop] = A(newdata);
      }
    }

    return newModel;
  }),

  /**
    Update model for search.

    @method filteredModel
  */
  filteredModel: computed('sortModel', 'searchValue', function() {
    let searchStr = this.get('searchValue');
    let model = this.get('sortModel');

    if (isBlank(searchStr)) {
      return model;
    }

    searchStr = searchStr.trim().toLocaleLowerCase();
    let filterFunction = function(item) {
      let name = item.data.get('name');
      if (!isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
        return item;
      }
    };

    let newClasses = model.classes.filter(function(clazz) {
      let classes = filterFunction(clazz.settings);
      if (!isNone(classes)) {
        return clazz;
      }

      let editForms = clazz.editForms.some(filterFunction);
      let listForms = clazz.listForms.some(filterFunction);
      let parents = clazz.parents.some(filterFunction);
      let bs = !isNone(clazz.bs) ? filterFunction(clazz.bs) : null;

      if (editForms || listForms || parents || !isNone(bs)) {
        return clazz;
      }
    });

    let newModel = {
      classes: A(newClasses)
    };

    for (let prop in model) {
      if (prop !== 'classes') {
        let newdata = model[prop].filter(filterFunction);
        newModel[prop] = A(newdata);
      }
    }

    return newModel;
  }),

  init() {
    this._super(...arguments);

    this.set('groupValue', this.get('i18n').t('forms.fd-application-model.all-types').toString());
  },

  actions: {
    /**
      Create new class.

       @method actions.createClass
       @param {String} stereotype Stereotype.
       @param {Object} dataobject Dataobject for list and edit form.
    */
    createClass(stereotype, dataobject) {
      let store = this.get('store');
      let currentStage = this.get('currentProjectContext').getCurrentStageModel();
      let newClass = store.createRecord('fd-dev-class', {
        stage: currentStage,
        caption: '',
        description: '',
        name: '',
        nameStr: '',
        stereotype: stereotype
      });

      if (!isBlank(dataobject) && !(dataobject instanceof $.Event)) {
        let formView = store.createRecord('fd-dev-form-view', {
          view: null,
          orderNum: 1
        });

        newClass.set('formViews', [formView]);
      }

      let model = { data: newClass, active: true, dataobject: dataobject };

      this.set('isAddMode', false);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), model);
    },

    /**
      Open create class edit panel.

       @method actions.openCreateClassEditPanel
    */
    openCreateClassEditPanel() {
      this.set('isAddMode', true);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'));
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
