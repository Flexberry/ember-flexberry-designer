import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

export default Ember.Component.extend({
  /**
    Form control.

    @property control
    @type Object
  */
  control: Ember.inject.service(),

  /**
    Label for field.

    @property label
    @type String
    @default undefined
  */
  label: undefined,

  /**
    Model view.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Input value.

    @property value
    @type Object
    @default undefined
  */
  defaultValue: undefined,

  /**
    Input value.

    @property value
    @type string
    @default flexberry-textbox
  */
  defaultValueControl: 'flexberry-textbox',

  /**
    Input value.

    @property value
    @type Object
    @default undefined
  */
  value: undefined,

  /**
    Type of form control.

    @property type
    @type Object
    @default undefined
   */
  type: undefined,

  /**
    Type of control input.

    @property type
    @type string
    @default text
   */
  inputType: 'text',

  /**
    Prototipes.

    @property prototypeBy
    @type Object contained:
      classId - class identificator
      devClasses - list classes with attributes
      assosiations - assosiations list
      usedAttrs  - list keys used attributes names
    @default undefined
   */
  prototypeBy: {
    classId: undefined,
    devClasses: {},
    assosiations: [],
    usedAttrs: {}
  },

  /**
    Array of avaliable controls for prototyping.

    @property avaliableControls
    @type DS.ManyArray
    @default undefined
  */
  avaliableControls: Ember.computed('prototypeBy.classId', function() {
    if (!this.prototypeBy.devClasses || !this.prototypeBy.classId || ! (this.prototypeBy.classId in this.prototypeBy.devClasses)) {
      return [];
    }
    let devClass = this.prototypeBy.devClasses[this.prototypeBy.classId];
    if (! ('attributes' in devClass)){
      return [];
    }
    let ret = [ '' ];
    for (let attrName in devClass.attributes) {
      if (attrName in this.prototypeBy.usedAttrs) {
        attrName = '✔' + attrName;
      }
      ret.push(attrName);
    }

    for (let devClassId in this.prototypeBy.devClasses) {
      if (devClassId === this.prototypeBy.classId) {
        continue;
      }
      let className = this.prototypeBy.devClasses[devClassId].name;
      let dotName = className + '.';
      for (let usedAttr in this.prototypeBy.usedAttrs) {
        if (className === usedAttr || dotName === usedAttr.substr(0, dotName.length)
        ) {
          className = '✔' + className;
          break;
        }
      }
      ret.push(className + ' ▶');
    }
//     alert(ret);
    return ret;
  }),
  /**
    Is null value.

    @property isNull
    @type Boolean
    @default false
   */
  isNull: false,

  /**
    Type of component in control.

    @property controlType
    @type string
    @default undefined
   */
  controlType: undefined,

//   /**
//     Controls array from Form model.
//
//     @property controls
//     @type DS.ManyArray
//     @default undefined
//   */
//   controls: undefined,

  /**
    Control's 'prototypeBy' dropdown caption.

    @property prototypeByDropdownCaption
    @type String
    @default t('components.fd-visual-control.prototypeBy')
  */
  prototypeByDropdownCaption: t('components.fd-visual-control.prototypeBy'),

  /**
    Control's 'name' textbox caption.

    @property nameTextboxCaption
    @type String
    @default t('components.fd-visual-control.name')
  */
  nameTextboxCaption: t('components.fd-visual-control.name'),

  /**
    Control's 'type' dropdown caption.

    @property typeDropdownCaption
    @type String
    @default t('components.fd-visual-control.type')
  */
  typeDropdownCaption: t('components.fd-visual-control.type'),

  /**
    Control's 'isNull' checkbox caption.

    @property isNullCheckboxCaption
    @type String
    @default t('components.fd-visual-control.isNull')
  */
  isNullCheckboxCaption: t('components.fd-visual-control.isNull'),

  /**
    Control's 'defaultValue' textbox caption.

    @property defaultValueTextboxCaption
    @type String
    @default t('components.fd-visual-control.defaultValue')
  */
  defaultValueTextboxCaption: t('components.fd-visual-control.defaultValue'),

  /**
    Array of control types.

    @property controlTypes
    @type DS.ManyArray
    @default undefined
  */
  controlTypes: undefined,

  actions: {

    /**
      Handles prototypeByDropdown 'onChange' action.

      @method controlTypeChange
      @public
    */
    avaliableControlChange() {
      alert('change');
//       let model = this.get('model');
//       let controls = this.get('controls');
//       let selectedControl = controls.find(item => item.get('name') === model.get('prototypeBy'));
//       model.set('value', selectedControl.get('value'));
//       model.set('type', selectedControl.get('type'));
//       model.set('inputType', selectedControl.get('inputType'));
//       model.set('controlType', selectedControl.get('controlType'));
//       model.set('isNull', selectedControl.get('isNull'));
//       model.set('defaultValue', selectedControl.get('defaultValue'));
//       model.set('defaultValueControl', selectedControl.get('defaultValueControl'));
    },

    /**
      Handles typeDropdown 'onChange' action.

      @method controlTypeChange
      @public
    */
    controlTypeChange() {
//       this._resetControl();
//       let controlTypes = this.get('controlTypes');
//       switch (this.get('model.type')) {
//         case controlTypes.objectAt(0).toString():
//           this.set('model.inputType', 'text');
//           this.set('model.controlType', 'flexberry-field');
//           this.set('model.defaultValueControl', 'flexberry-field');
//           break;
//         case controlTypes.objectAt(1).toString():
//           this.set('model.inputType', 'number');
//           this.set('model.controlType', 'flexberry-field');
//           this.set('model.defaultValue', 0);
//           this.set('model.defaultValueControl', 'flexberry-field');
//           break;
//         case controlTypes.objectAt(2).toString():
//           this.set('model.controlType', 'flexberry-checkbox');
//           this.set('model.defaultValue', false);
//           this.set('model.defaultValueControl', 'flexberry-checkbox');
//           break;
//         case controlTypes.objectAt(3).toString():
//           this.set('model.controlType', 'flexberry-simpledatetime');
//           this.set('model.defaultValueControl', 'flexberry-simpledatetime');
//           break;
//         case controlTypes.objectAt(4).toString():
//           this.set('model.controlType', 'flexberry-file');
//           this.set('model.defaultValueControl', undefined);
//           break;
//         case controlTypes.objectAt(5).toString():
//           this.set('model.controlType', 'flexberry-dropdown');
//           this.set('model.defaultValueControl', 'flexberry-dropdown');
//           break;
//         case controlTypes.objectAt(6).toString():
//           this.set('model.controlType', 'flexberry-lookup');
//           this.set('model.defaultValueControl', 'flexberry-lookup');
//           break;
//         default:
//           this.set('model.controlType', 'flexberry-textbox');
//           this.set('model.defaultValueControl', undefined);
//       }
    },
  },

  /**
    Reset displaying control's value.

    @method _resetControl
    @private
  */
  _resetControl() {
    this.set('model.prototypeBy', undefined);
    this.set('model.inputType', 'text');
    this.set('model.isNull', false);
    this.set('model.value', undefined);
    this.set('model.defaultValue', '');
  },

  /**
      Initializes component.
  */
  init() {
    this._super(...arguments);
  },

  /**
    Initializes DOM-related component's properties.
  */
  didInsertElement() {
    this._super(...arguments);
  },
});
