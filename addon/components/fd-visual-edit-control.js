import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

export default Ember.Component.extend({
  /**
    Form component.

    @property component
    @type Object
  */
  component: Ember.inject.service(),

  /**
    Label for field.

    @property label
    @type String
  */
  label: undefined,

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
  prototypeBy: {
    bool: 'boolean',
    string: 'string'
  },

  /**
    Is null value.

    @property isNull
    @type Boolean
   */
  isNull: false,

  /**
    Type of component.

    @property componentTypes
    @type String[]
   */
  componentTypes: {
    bool: 'boolean',
    string: 'string'
  },

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
      Initializes component.
  */
  init() {
    this._super(...arguments);
  }

  // didInsertElement() {
  //   this._super(...arguments);
  // },
  //
  // didReceiveAttrs() {
  //   let _name = this.get('_name');
  // },

});
