import Component from '@ember/component';
import FdUpdateFormviewValueMixin from '../../mixins/fd-editing-panels/fd-update-formview-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-listform-editing-panel';
import { on } from '@ember/object/evented';
import { observer } from '@ember/object';
import { isNone, isBlank } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
export default Component.extend(FdUpdateFormviewValueMixin, FdReadonlyModeMixin, {
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
  /* eslint-disable ember/no-on-calls-in-components */
  _editFormsObserver: on('didInsertElement', observer('model.name', function() {
    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

    let dataobject = this.get('dataobject');
    if (isNone(dataobject)) {
      dataobject = this.get('model.formViews.firstObject.view.class');
    }

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
  })),
});
