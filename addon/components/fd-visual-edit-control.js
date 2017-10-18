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

  stringControlType: t('components.fd-visual-control.typeName.stringControlType'),
  boolControlType: t('components.fd-visual-control.typeName.boolControlType'),
  dateControlType: t('components.fd-visual-control.typeName.dateControlType'),
  fileControlType: t('components.fd-visual-control.typeName.fileControlType'),
  drowdownControlType: t('components.fd-visual-control.typeName.drowdownControlType'),
  lookupControlType: t('components.fd-visual-control.typeName.lookupControlType'),

  controlTypes: Ember.computed('controlTypes.[]',
  'stringControlType',
  'boolControlType',
  'dateControlType',
  'fileControlType',
  'drowdownControlType',
  'lookupControlType',
  function() {
    let arr = Ember.A();
    arr.pushObject(this.get('stringControlType'));
    arr.pushObject(this.get('boolControlType'));
    arr.pushObject(this.get('dateControlType'));
    arr.pushObject(this.get('fileControlType'));
    arr.pushObject(this.get('drowdownControlType'));
    arr.pushObject(this.get('lookupControlType'));
    return arr;
  }),

  actions: {

    avaliableControlChange() {
      let model = this.get('model');
      let controls = this.get('controls');
      let selectedControl = controls.find(item => item.get('name') === model.get('prototypeBy'));
      model.set('type', selectedControl.get('type'));
      model.set('controlType', selectedControl.get('controlType'));
      model.set('notNullable', selectedControl.get('notNullable'));
      model.set('isNull', selectedControl.get('isNull'));
    },

    controlTypeChange() {
      this.resetControl();
      let controlTypes = this.get('controlTypes');
      switch (this.get('model.type')) {
        case controlTypes.objectAt(0).toString():
          this.set('model.controlType', 'flexberry-textbox');
          break;
        case controlTypes.objectAt(1).toString():
          this.set('model.controlType', 'flexberry-checkbox');
          break;
        case controlTypes.objectAt(2).toString():
          this.set('model.controlType', 'flexberry-simpledatetime');
          break;
        case controlTypes.objectAt(3).toString():
          this.set('model.controlType', 'flexberry-file');
          break;
        case controlTypes.objectAt(4).toString():
          this.set('model.controlType', 'flexberry-dropdown');
          break;
        case controlTypes.objectAt(5).toString():
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
