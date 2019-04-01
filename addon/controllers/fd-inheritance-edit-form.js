import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { set } from '@ember/object';
import { isNone } from '@ember/utils';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import { updateInheritanceOnDiagram } from '../utils/fd-update-class-diagram';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-inheritance-list-form',

  /**
    Service that get current project contexts.

    @property currentProjectContext
    @type {Class}
    @default service()
  */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Array all classes.

    @property implementations
    @type Array
    @default []
  */
  implementations: A(),

  /**
    Array name parent classes.

    @property parentNames
    @type Array
    @default []
  */
  parentNames: A(),

  /**
    Array name child classes.

    @property childNames
    @type Array
    @default []
  */
  childNames: A(),

  /**
    Name parent class.

    @property parentName
    @type String
    @default ''
  */
  parentName: '',

  /**
    Name child class.

    @property childName
    @type String
    @default ''
  */
  childName: '',

  /**
    Flag: indicates whether to edit dropdowns.

    @property readonlyDropdown
    @type Boolean
    @default true
  */
  readonlyDropdown: true,

  /**
    Overridden metod 'Save'.
  */
  save() {
    let _this = this;
    this._super(...arguments).then(() => {
      updateInheritanceOnDiagram.call(_this, _this.get('store'), _this.get('model'));
    });
  },

  actions: {
    /**
      Set 'Parent'.

      @method actions.changeParent
    */
    changeParent(value) {
      if (!this.get('readonlyDropdown')) {
        let parent = this.get('implementations').find(i => i.get('name') === value || i.get('nameStr') === value);
        let model = this.get('model');
        set(model, 'parent', parent);
        set(this, 'parentName', parent.get('name'));

        let newChild = this._getNewItems(value);
        this.set('childNames', newChild);
      }
    },

    /**
      Set 'Child'.

      @method actions.changeChild
    */
    changeChild(value) {
      if (!this.get('readonlyDropdown')) {
        let child = this.get('implementations').find(i => i.get('name') === value || i.get('nameStr') === value);
        let model = this.get('model');
        set(model, 'child', child);
        set(this, 'childName', child.get('name'));

        let newParent = this._getNewItems(value);
        this.set('parentNames', newParent);
      }
    },

    /**
      Overridden action for button 'Save'.
      @method actions.save
    */
    save() {
      if (!this.get('readonlyDropdown')) {
        let stagePk = this.get('currentProjectContext').getCurrentStage();
        let model = this.get('model');
        let childId = model.get('child.id');
        let parentId = model.get('parent.id');
        let inheritance = this.get('store').peekAll('fd-dev-inheritance').filterBy('stage.id', stagePk);
        let reversRecord = inheritance.find(function(item) {
          return item.get('child.id') === parentId && item.get('parent.id') === childId && !isNone(item.get('id'));
        });

        if (isNone(reversRecord)) {
          this._super(...arguments);
        } else {
          this.set('error', new Error(this.get('i18n').t('forms.fd-inheritance-edit-form.error')));
        }
      } else {
        this._super(...arguments);
      }
    }
  },

  /**
    Create new items for dropdown.

    @method _getNewItems
  */
  _getNewItems(value) {
    let newItems = this.get('implementations').filter(function(item) {
      return item.get('name') !== value && item.get('nameStr') !== value;
    });

    return A(newItems).map(i => i.get('name') || i.get('nameStr'));
  }
});
