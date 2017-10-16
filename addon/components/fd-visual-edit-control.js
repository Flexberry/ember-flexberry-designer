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
  */
  label: undefined,

  model: undefined,

  /**
    Input value.

    @property value
    @type String
  */
  value: undefined,

  /**
    Type of html input.

    @property type
    @type String
    @default 'text'
   */
  type: 'text',

  /**
    Prototipes.

    @property prototypeBy
    @type String[]
   */
  prototypeBy: undefined,

  /**
    Is control not Nullable.

    @property notNullable
    @type Boolean
   */
  notNullable: false,

  /**
    Is null value.

    @property isNull
    @type Boolean
   */
  isNull: false,

  /**
    Type of control.

    @property controlTypes
    @type String[]
   */
  controlTypes: [
    'bool',
    'WebFile',
    'char',
    'string',
    'guid',
    'decimal',
    'double',
    'float',
    'sbyte',
    'short',
    'byte',
    'int',
    'long',
    'uint',
    'ushort',
    'ulong',
    'DateTime',
    'NullableDateTime',
    'NullableDecimal',
    'NullableInt',
    'object',
    'flexberry-groupedit',
    'flexberry-lookup'
  ],

  controlType: undefined,

  controls: undefined,

  avaliableControls: Ember.computed('avaliableControls', 'controls.[]', function() {
    let controls = this.get('controls');
    if (controls) {
      return controls.map(item => item.get('name'));
    } else {
      return undefined;
    }
  }),

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

  actions: {

    avaliableControlChange() {
      //TODO задать свойства модели из выбранного контрола.
    },

    controlTypeChange() {
      this.resetControl();
      switch (this.get('model.type')) {
        case 'bool':
          this.set('model.controlType', 'flexberry-checkbox');
          break;

        case 'WebFile':
          this.set('model.controlType', 'flexberry-file');
          break;

        case 'char':
        case 'string':
          this.set('model.controlType', 'flexberry-textbox');
          break;

        case 'decimal':
        case 'double':
        case 'float':
        case 'sbyte':
        case 'short':
        case 'byte':
        case 'int':
        case 'long':
        case 'uint':
        case 'ushort':
        case 'ulong':
          this.set('model.controlType', 'flexberry-textbox');
          break;

        case 'DateTime':
          this.set('model.controlType', 'flexberry-simpledatetime');
          break;
        case 'NullableDateTime':
          this.set('model.controlType', 'flexberry-simpledatetime');
          this.set('model.notNullable', false);
          break;

        case 'NullableDecimal':
          this.set('model.controlType', 'flexberry-textbox');
          this.set('model.notNullable', false);
          break;
        case 'NullableInt':
          this.set('model.controlType', 'flexberry-textbox');
          this.set('model.notNullable', false);
          break;

        case 'object':
          this.set('model.controlType', 'flexberry-textbox');
          break;

        case 'flexberry-groupedit':
          this.set('model.controlType', 'flexberry-groupedit');
          break;

        case 'flexberry-lookup':
          this.set('model.controlType', 'flexberry-lookup');
          break;

        default:
          this.set('model.controlType', 'flexberry-textbox');
      }
    },
  },

  resetControl() {
    this.set('model.prototypeBy', undefined);
    this.set('model.notNullable', true);
    this.set('model.isNull', false);
    this.set('model.value', undefined);
    this.set('model.defaultValue', undefined);
  },

  /**
      Initializes component.
  */
  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);
  },
});
