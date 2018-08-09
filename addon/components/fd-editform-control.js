/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdDraggableControlMixin from '../mixins/fd-draggable-control';

import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';

/**
  This component rendered the control on the edit form.

  @class FdEditformControlComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
  @uses FdDraggableControlMixin
*/
export default Ember.Component.extend(FdDraggableControlMixin, {
  /**
    An object in the format `{ 'typeName': 'componentName' }`, which describes which components should be rendered for each type.

    @private
    @property _componentsTypeMap
    @type Object
  */
  _componentsTypeMap: {
    'bool': 'flexberry-checkbox',
    'System.Boolean': 'flexberry-checkbox',

    'DateTime': 'flexberry-simpledatetime',
    'System.DateTime': 'flexberry-simpledatetime',
    'ICSSoft.STORMNET.UserDataTypes.NullableDateTime': 'flexberry-simpledatetime',

    'ICSSoft.STORMNET.UserDataTypes.WebFile': 'fd-file',

    'char': 'flexberry-textbox',
    'System.Char': 'flexberry-textbox',
    'string': 'flexberry-textbox',
    'System.String': 'flexberry-textbox',

    'byte': 'flexberry-textbox',
    'System.Byte': 'flexberry-textbox',
    'sbyte': 'flexberry-textbox',
    'System.SByte': 'flexberry-textbox',
    'short': 'flexberry-textbox',
    'System.Int16': 'flexberry-textbox',
    'ushort': 'flexberry-textbox',
    'System.UInt16': 'flexberry-textbox',
    'int': 'flexberry-textbox',
    'System.Int32': 'flexberry-textbox',
    'uint': 'flexberry-textbox',
    'System.UInt32': 'flexberry-textbox',
    'long': 'flexberry-textbox',
    'System.Int64': 'flexberry-textbox',
    'ulong': 'flexberry-textbox',
    'System.UInt64': 'flexberry-textbox',
    'ICSSoft.STORMNET.UserDataTypes.NullableInt': 'flexberry-textbox',

    'float': 'flexberry-textbox',
    'System.Single': 'flexberry-textbox',
    'double': 'flexberry-textbox',
    'System.Double': 'flexberry-textbox',
    'decimal': 'flexberry-textbox',
    'System.Decimal': 'flexberry-textbox',
    'ICSSoft.STORMNET.UserDataTypes.NullableDecimal': 'flexberry-textbox',

    'object': 'flexberry-textbox',
    'System.Object': 'flexberry-textbox',
    'guid': 'flexberry-textbox',
    'System.Guid': 'flexberry-textbox',

    'enumeration': 'flexberry-dropdown',
    'master': 'fd-lookup',
    'detail': 'fd-groupedit',

    'default': 'flexberry-textbox',
  },

  /**
    The passed control is a simple control.

    @private
    @property _isControl
    @readOnly
    @type Boolean
  */
  _isControl: Ember.computed('control', function() {
    return this.get('control') instanceof FdEditformControl;
  }).readOnly(),

  /**
    The passed control is a group.

    @private
    @property _isGroup
    @readOnly
    @type Boolean
  */
  _isGroup: Ember.computed('control', function() {
    return this.get('control') instanceof FdEditformGroup;
  }).readOnly(),

  /**
    The passed control is tabs.

    @private
    @property _isTab
    @readOnly
    @type Boolean
  */
  _isTab: Ember.computed('control', function() {
    return this.get('control') instanceof FdEditformTabgroup;
  }).readOnly(),

  /**
    The name of the component that will be rendered for this control.

    @private
    @property _componentName
    @readOnly
    @type String
  */
  _componentName: Ember.computed('_componentProperties.type', function() {
    return this.get('_componentsTypeMap')[this.get('_componentProperties.type')];
  }).readOnly(),

  /**
    An object with properties for rendering the component.

    @private
    @property _componentProperties
    @readOnly
    @type Object
  */
  _componentProperties: Ember.computed('control.propertyDefinition.name', 'control.propertyDefinition.detailViewName', function() {
    let propertyDefinition = this.get('control.propertyDefinition');
    if (propertyDefinition) {
      return this.get('getComponentPropertiesAction')(propertyDefinition);
    } else {
      return { type: 'default' };
    }
  }).readOnly(),

  /**
    Used in class name bindings to overlap the content of the control.

    @private
    @property _dimmed
    @type Boolean
  */
  _dimmed: Ember.computed.reads('draggable'),

  /**
    Used in class name bindings to add a class when this control is selected.

    @private
    @property _isSelected
    @readOnly
    @type Boolean
  */
  _isSelected: Ember.computed('control', 'selectedItem', function() {
    return this.get('control') === this.get('selectedItem');
  }).readOnly(),

  /**
    Used in class name bindings visibility.

    @private
    @property _isNotVisible
    @readOnly
    @type Boolean
  */
  _isNotVisible: Ember.computed('control', 'selectedItem.propertyDefinition.visible', function() {
    let control = this.get('control');
    if (control instanceof FdEditformControl) {
      return !this.get('control.propertyDefinition.visible');
    }

    return false;
  }).readOnly(),

  /**
    {{#crossLink "FdEditformConstructorController/selectedItem:property"}}Passed from above{{/crossLink}}, the selected item.

    @property selectedItem
  */
  selectedItem: undefined,

  /**
    The control to render.

    @property control
    @type FdEditformControl|FdEditformGroup|FdEditformTabgroup
  */
  control: undefined,

  /**
    If the passed control is tabs, contains active tab.

    @property activeTab
    @type FdEditformTab
  */
  activeTab: Ember.computed.alias('control.activeTab'),

  /**
    See description {{#crossLink "FdDraggableControlMixin/draggableProperty:property"}}here{{/crossLink}}.

    @property draggableProperty
  */
  draggableProperty: 'control',

  /**
    See description {{#crossLink "FdDraggableControlMixin/dragDirection:property"}}here{{/crossLink}}.

    @property dragDirection
  */
  dragDirection: 'X',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNameBindings
  */
  classNameBindings: ['_dimmed:dimmed', '_isSelected:selected', '_isNotVisible:blackout'],

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['fd-editform-control', 'ui', 'dimmable', 'field'],

  actions: {
    /**
      Change active tab.

      @method actions.changeTab
      @param {FdEditformTab} tab New tab.
    */
    changeTab(tab) {
      this.get('selectItemAction')(tab.tab);
    },
  },

  /**
    The event handler is `click`.
    Calls the `selectItemAction` action when the component is clicked.
    The action `selectItemAction` should be passed, for example, from the controller.

    @method click
    @param {JQuery.Event} event
  */
  click(event) {
    event.stopPropagation();
    this.get('selectItemAction')(this.get('control'));
  },
});
