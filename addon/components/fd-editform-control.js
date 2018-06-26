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
    Type of rendered component.

    @private
    @property _component
    @readOnly
    @type String
  */
  _component: Ember.computed('control.type', function() {
    switch (this.get('control.type')) {
      case 'date': return 'flexberry-datepicker';
      case 'bool': return 'flexberry-checkbox';
      default: return 'flexberry-textbox';
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
  activeTab: undefined,

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
  classNameBindings: ['_dimmed:dimmed', '_isSelected:selected'],

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
      this.set('activeTab', tab);
      this.get('selectItemAction')(tab);
    },
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method willRender
  */
  willRender() {
    this._super(...arguments);

    if (this.get('_isTab')) {
      this.set('activeTab', this.get('control.tabs.firstObject'));
    }
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
