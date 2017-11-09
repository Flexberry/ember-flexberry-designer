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
    Prototipes.

    @property prototypeBy
    @type Object contained:
      classId - class identificator
      devClasses - list classes with attributes
      associations - associations list
      usedAttrs  - list keys used attributes names
    @default undefined
   */
  prototypeBy: {
    classId: undefined,
    devClasses: {},
    associations: [],
    usedAttrs: {}
  },

  /**
    Array of avaliable controls for prototyping.

    @property avaliableControls
    @type DS.ManyArray
    @default undefined
  */
  avaliableControls: Ember.computed('prototypeBy.classId', function() {
    if (!this.prototypeBy.devClasses || !this.prototypeBy.classId || !(this.prototypeBy.classId in this.prototypeBy.devClasses)) {
      return [];
    }

    let devClass = this.prototypeBy.devClasses[this.prototypeBy.classId];
    if (!('attributes' in devClass)) {
      return [];
    }

    let ret = [''];
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

  stringControlType: t('components.fd-visual-control.typeName.stringControlType'),
  boolControlType: t('components.fd-visual-control.typeName.boolControlType'),
  charControlType: t('components.fd-visual-control.typeName.charControlType'),
  guidControlType: t('components.fd-visual-control.typeName.guidControlType'),
  decimalControlType: t('components.fd-visual-control.typeName.decimalControlType'),
  doubleControlType: t('components.fd-visual-control.typeName.doubleControlType'),
  floatControlType: t('components.fd-visual-control.typeName.floatControlType'),
  sbyteControlType: t('components.fd-visual-control.typeName.sbyteControlType'),
  shortControlType: t('components.fd-visual-control.typeName.shortControlType'),
  byteControlType: t('components.fd-visual-control.typeName.byteControlType'),
  intControlType: t('components.fd-visual-control.typeName.intControlType'),
  longControlType: t('components.fd-visual-control.typeName.longControlType'),
  uintControlType: t('components.fd-visual-control.typeName.uintControlType'),
  ushortControlType: t('components.fd-visual-control.typeName.ushortControlType'),
  ulongControlType: t('components.fd-visual-control.typeName.ulongControlType'),
  dateControlType: t('components.fd-visual-control.typeName.dateControlType'),
  fileControlType: t('components.fd-visual-control.typeName.fileControlType'),
  drowdownControlType: t('components.fd-visual-control.typeName.drowdownControlType'),
  lookupControlType: t('components.fd-visual-control.typeName.lookupControlType'),

  /**
    Array of control types.

    @property controlTypes
    @type DS.ManyArray
    @default undefined
  */
  controlTypes: Ember.computed('controlTypes.[]',
  'stringControlType',
  'boolControlType',
  'charControlType',
  'guidControlType',
  'decimalControlType',
  'doubleControlType',
  'floatControlType',
  'sbyteControlType',
  'shortControlType',
  'byteControlType',
  'intControlType',
  'longControlType',
  'uintControlType',
  'ushortControlType',
  'ulongControlType',
  'dateControlType',
  'fileControlType',
  'drowdownControlType',
  'lookupControlType',
  function() {
    let arr = Ember.A();
    arr.pushObject(this.get('stringControlType'));
    arr.pushObject(this.get('boolControlType'));
    arr.pushObject(this.get('charControlType'));
    arr.pushObject(this.get('guidControlType'));
    arr.pushObject(this.get('decimalControlType'));
    arr.pushObject(this.get('doubleControlType'));
    arr.pushObject(this.get('floatControlType'));
    arr.pushObject(this.get('sbyteControlType'));
    arr.pushObject(this.get('shortControlType'));
    arr.pushObject(this.get('byteControlType'));
    arr.pushObject(this.get('intControlType'));
    arr.pushObject(this.get('longControlType'));
    arr.pushObject(this.get('uintControlType'));
    arr.pushObject(this.get('ushortControlType'));
    arr.pushObject(this.get('ulongControlType'));
    arr.pushObject(this.get('dateControlType'));
    arr.pushObject(this.get('fileControlType'));
    arr.pushObject(this.get('drowdownControlType'));
    arr.pushObject(this.get('lookupControlType'));
    return arr;
  }),

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
      this._resetControl();
      let controlTypes = this.get('controlTypes');
      switch (this.get('model.typeName')) {
        case controlTypes.objectAt(0).toString(): // stringControlType
          this.set('model.type', 'string');
          this.set('model.defaultValue', '');
          break;
        case controlTypes.objectAt(1).toString(): // boolControlType
          this.set('model.controlType', 'flexberry-checkbox');
          this.set('model.type', 'boolean');
          this.set('model.defaultValue', false);
          this.set('model.defaultValueControl', 'flexberry-checkbox');
          break;
        case controlTypes.objectAt(2).toString(): // charControlType
          this.set('model.type', 'char');
          this.set('model.defaultValue', '');
          break;
        case controlTypes.objectAt(3).toString(): // guidControlType
          this.set('model.type', 'guid');
          this.set('model.defaultValue', '');
          break;
        case controlTypes.objectAt(4).toString(): // decimalControlType
          this.set('model.type', 'decimal');
          break;
        case controlTypes.objectAt(5).toString(): // doubleControlType
          this.set('model.type', 'double');
          break;
        case controlTypes.objectAt(6).toString(): // floatControlType
          this.set('model.type', 'float');
          break;
        case controlTypes.objectAt(7).toString(): // sbyteControlType
          this.set('model.type', 'sbyte');
          break;
        case controlTypes.objectAt(8).toString(): // shortControlType
          this.set('model.type', 'short');
          break;
        case controlTypes.objectAt(9).toString(): // byteControlType
          this.set('model.type', 'byte');
          break;
        case controlTypes.objectAt(10).toString(): // intControlType
          this.set('model.type', 'int');
          break;
        case controlTypes.objectAt(11).toString(): // longControlType
          this.set('model.type', 'long');
          break;
        case controlTypes.objectAt(12).toString(): // uintControlType
          this.set('model.type', 'uint');
          break;
        case controlTypes.objectAt(13).toString(): // ushortControlType
          this.set('model.type', 'ushort');
          break;
        case controlTypes.objectAt(14).toString(): // ulongControlType
          this.set('model.type', 'ulong');
          break;
        case controlTypes.objectAt(15).toString(): // dateControlType
          this.set('model.controlType', 'flexberry-simpledatetime');
          this.set('model.type', 'DateTime');
          this.set('model.defaultValue', '');
          this.set('model.defaultValueControl', 'flexberry-simpledatetime');
          break;
        case controlTypes.objectAt(16).toString(): // fileControlType
          this.set('model.controlType', 'flexberry-file');
          this.set('model.type', 'WebFile');
          this.set('model.defaultValue', '');
          this.set('model.defaultValueControl', undefined);
          break;
        case controlTypes.objectAt(17).toString(): // drowdownControlType
          this.set('model.controlType', 'flexberry-dropdown');
          this.set('model.defaultValue', '');
          this.set('model.defaultValueControl', 'flexberry-dropdown');
          break;
        case controlTypes.objectAt(18).toString(): // lookupControlType
          this.set('model.controlType', 'flexberry-lookup');
          this.set('model.defaultValue', '');
          this.set('model.defaultValueControl', 'flexberry-lookup');
          break;
        default:
          this.set('model.controlType', 'flexberry-field');
          this.set('model.defaultValue', '');
          this.set('model.defaultValueControl', undefined);
      }
    },
  },

  /**
    Reset displaying control's value.

    @method _resetControl
    @private
  */
  _resetControl() {
    this.set('model.prototypeBy', undefined);
    this.set('model.isNull', false);
    this.set('model.value', undefined);
    this.set('model.defaultValue', 0);
    this.set('model.controlType', 'flexberry-field');
    this.set('model.defaultValueControl', 'flexberry-field');
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
