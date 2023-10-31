import Component from '@ember/component';
import FdUpdateFormviewValueMixin from '../../mixins/fd-editing-panels/fd-update-formview-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import FdConstructorValue from '../../mixins/fd-editing-panels/fd-constructor-value';
import layout from '../../templates/components/fd-editing-panels/fd-listform-editing-panel';
import { observer } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
export default Component.extend(FdUpdateFormviewValueMixin, FdConstructorValue, FdReadonlyModeMixin, {
  layout,

  /**
    Form data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Class data.

    @property dataobject
    @type Object
    @default undefined
  */
  dataobject: undefined,


  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service(),

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Edit forms arrays.

    @property editFormsItems
    @type Object
    @default undefined
  */
  editFormsItems: undefined,

  /**
    Ember.observer, watching string `model.name` and update 'formsNames' property.

    @method _editFormsObserver
  */
  _editFormsObserver: observer('model.name', function() {
    this.setItems();
    this.setForms();
  }),

  setForms() {
    const dataobject = this.get('dataobject');

    if (isBlank(dataobject)) {
      return;
    }

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));


    // «editform»
    let forms = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«editform»' && item.get('formViews.firstObject.view.class') === dataobject;
    });

    let formsMapNames = A(forms).mapBy('name');
    let formsNames = A(formsMapNames).filter((a) => !isBlank(a));
    formsNames.unshift('');
    this.set('editFormsItems', formsNames);

    let className = dataobject.get('name') || dataobject.get('nameStr');
    this.set('model.formViews.firstObject.dataObjectTypes.className', className);

    let editContainerName = this.get('model.formViews.firstObject.dataObjectTypes.editContainerName');
    let editContainerNameValue = formsNames.includes(editContainerName) ? editContainerName : '';
    this.set('model.formViews.firstObject.dataObjectTypes.editContainerName', editContainerNameValue);

    let newContainerName = this.get('model.formViews.firstObject.dataObjectTypes.newContainerName');
    let newContainerNameValue = formsNames.includes(newContainerName) ? newContainerName : '';
    this.set('model.formViews.firstObject.dataObjectTypes.newContainerName', newContainerNameValue);
  },

  /**
    Get model for constructor.

     @method getConstructorModel
     @param {Object} store Store.
     @param {Object} stage Current stage.
  */
  getConstructorModel(store) {
    let modelHash = {
      listform: undefined,
      view: undefined,
      dataobject: undefined,
    };

    modelHash.listform = this.get('model');
    modelHash.view = modelHash.listform.get('formViews.firstObject.view');

    let allClassesInStore = store.peekAll('fd-dev-class');
    modelHash.dataobject = allClassesInStore.findBy('id', modelHash.view.get('class.id'));

    return modelHash;
  },

  /**
   * See [EmberJS API](https://emberjs.com/).
   *
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments);
    this.setItems();
    this.setForms();
  },

  actions: {
    /**
      Changes the dataobject value and set view items.

      @method actions.changeDataObject
      @param {Object} value An object with a new value in the `value` property.
    */
    changeDataObject(value) {
      if (!isBlank(value)) {
        this.set('viewValue');
        const dataObjectTypes = this.get('model.formViews.firstObject.dataObjectTypes');
        if (dataObjectTypes) {
          dataObjectTypes.set('editContainerName');
          dataObjectTypes.set('newContainerName');
        }
        const dataObject = this.get('dataObjectItems').objects.findBy('name', value);
        this.set('dataobject', dataObject)
        this._setViewItems(dataObject);
        this.setForms();
      }
    },
  }
});
