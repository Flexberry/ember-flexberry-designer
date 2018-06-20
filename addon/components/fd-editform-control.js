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
    The control to render.

    @property control
    @type FdEditformControl|FdEditformGroup|FdEditformTabgroup
  */
  control: undefined,

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

    @property classNames
  */
  classNames: ['fd-editform-control', 'field'],

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);

    if (this.get('_isTab')) {
      this.$('.menu .item').tab();
    }
  },

  /**
    The event handler is `click`.
    Calls the `selectControlAction` action when the component is clicked.
    The action `selectControlAction` should be passed, for example, from the controller.

    @method click
    @param {JQuery.Event} event
  */
  click(event) {
    event.stopPropagation();
    this.get('selectControlAction')(this.get('control'));
  },
});
