import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';
import { isNone, isBlank } from '@ember/utils';
import { A } from '@ember/array';

/**
  Mixin with the support `Choice view` for controls in the edit form constructor.

  @class FdUpdateFormviewValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    View arrays.

    @property viewItems
    @type Object
    @default undefined
  */
  viewItems: undefined,

  /**
    View name.

    @property viewValue
    @type string
    @default undefined
  */
  viewValue: undefined,

  /**
    Data Object arrays.

    @property dataObjectItems
    @type Object
    @default undefined
  */
  dataObjectItems: undefined,

  /**
    Data object value.

    @property dataObjectValue
    @type string
    @default undefined
  */
  dataObjectValue: undefined,

  /**
    Flag: indicates the editing panel is open from the diagram.

    @property isDiagramEditingPanel
    @type Bool
    @default false
  */
  isDiagramEditingPanel: false,

  /**
    Set values.

    @method setItems
  */
  setItems() {
    const formView = this.get('model.formViews.firstObject.view');
    let dataobject = this.get('dataobject');

    if (isNone(dataobject) && isBlank(formView)) {
      this._setDataObjectItems();
      return;
    }

    if (isNone(dataobject)) {
      dataobject = formView.get('class');
      this.set('dataobject', dataobject);
    }

    if (this.get('isDiagramEditingPanel')) {
      this._setDataObjectItems();
      this.set('dataObjectValue', dataobject ? dataobject.get('name') : '');
    }

    this._setViewItems(dataobject);
    const viewName = formView ? formView.get('name') : '';
    this.set('viewValue', viewName);
  },


  /**
    Fill the dropdown with all classes of the stage.

    @method _setDataObjectItems
  */
  _setDataObjectItems() {
    const store = this.get('store');
    const stage = this.get('currentProjectContext').getCurrentStageModel();
    const allClassesInStore = store.peekAll('fd-dev-class');
    const dataObjects = allClassesInStore.filterBy('stage.id', stage.get('id')).filterBy('stereotype', null);

    this.set('dataObjectItems', {
      names: A(dataObjects).mapBy('name'),
      objects: A(dataObjects),
    });
  },

  /**
    Fill the dropdown with all class views.

    @method _setViewItems
  */
  _setViewItems(dataobject) {
    const views = dataobject.get('views');
    const viewsEmberA = A(views);
    const viewsMapNames = viewsEmberA.mapBy('name');
    const viewsNames = A(viewsMapNames).filter((a) => !isBlank(a));
    this.set('viewItems', {
      names: viewsNames,
      objects: viewsEmberA,
    });
  },

  actions: {

    /**
      Update 'FormView'.

      @method actions.changeViewValue
      @param {Object} value An object with a new value in the `value` property.
    */
    changeViewValue(value) {
      const model = this.get('model');
      const formViews = model.get('formViews');

      if (isBlank(formViews)) {
        const store = this.get('store');
        const formView = store.createRecord('fd-dev-form-view', {
          view: null,
          orderNum: 1
        });
        set(model, 'formViews', [formView]);
      }

      if (isBlank(value)) {
        set(model, 'formViews.firstObject.view', null);
        return;
      }

      const viewObject = this.get('viewItems').objects.findBy('name', value);
      set(model, 'formViews.firstObject.view', viewObject);
    }
  }
});
