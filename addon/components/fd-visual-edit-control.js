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
    'flexberry-textbox',
    'flexberry-checkbox',
    'flexberry-datepicker'
  ],

  controlType: undefined,

  controls: undefined,

  avaliableControls: Ember.computed('avaliableControls', function() {
    let controls = this.get('controls');
    return controls;
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
    controlTypeChange() {
      switch (this.get('model.type')) {
          case 'bool':
            this.set('model.controlType', 'flexberry-checkbox');
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
            this.set('model.controlType', 'flexberry-datepicker');
            break;
          case 'NullableDateTime':
            this.set('model.controlType', 'flexberry-datepicker');
            break;

          case 'NullableDecimal':
            this.set('model.controlType', 'flexberry-textbox');
            break;
          case 'NullableInt':
            this.set('model.controlType', 'flexberry-textbox');
            break;

          case 'object':
            this.set('model.controlType', 'flexberry-textbox');
            break;

          default:
            this.set('model.controlType', 'flexberry-textbox');
        }
    },
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
