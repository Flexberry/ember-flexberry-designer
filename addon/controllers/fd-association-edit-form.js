import { computed, set } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';

import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import { updateAssociationOnDiagram } from '../utils/fd-update-class-diagram';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-association-list-form',

  /**
    Array all classes.

    @property implementations
    @type Array
    @default []
   */
  implementations: A(),

  /**
      Array name all classes.

    @property implementationsName
    @type Array
    @default []
   */
  implementationsName: A(),

  /**
      Name start class.

    @property startClassName
    @type String
    @default ''
   */
  startClassName: '',

  /**
      Name end class.

    @property endClassName
    @type String
    @default ''
   */
  endClassName: '',

  /**
    Flag: indicates whether to edit classes.

    @property readonlyClass
    @type Boolean
    @default true
   */
  readonlyClass: true,

  /**
    Array of access modifiers for the master property.

    @property itemsAccessModifier
    @type Array
    @default ['+', '-', '#']
   */
  itemsAccessModifier: computed(() => [
    '+',
    '-',
    '#'
  ]).readOnly(),

  /**
    Overridden method 'Save'.
  */
  save() {
    let _this = this;
    this._super(...arguments).then(() => {
      updateAssociationOnDiagram.call(_this, _this.get('store'), _this.get('model'));
    });
  },

  actions: {

    /**
      Set 'startClass'.

      @method actions.changeStartClass
    */
    changeStartClass(value) {
      if (!this.get('readonlyClass')) {
        let startClass = this.get('implementations').find(i => i.get('name') === value || i.get('nameStr') === value);
        let model = this.get('model');
        set(model, 'startClass', startClass);
        set(this, 'startClassName', startClass.get('name'));
        if (isNone(model.get('startRole')) || model.get('startRole') === '') {
          set(model, 'startRole', startClass.get('name'));
        }
      }
    },

    /**
      Set 'endClass'.

      @method actions.changeEndClass
    */
    changeEndClass(value) {
      if (!this.get('readonlyClass')) {
        let endClass = this.get('implementations').find(i => i.get('name') === value || i.get('nameStr') === value);
        let model = this.get('model');
        set(model, 'endClass', endClass);
        set(this, 'endClassName', endClass.get('name'));
        if (isNone(model.get('endRole')) || model.get('endRole') === '') {
          set(model, 'endRole', endClass.get('name'));
        }
      }
    }
  }
});
