/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdDraggableControlMixin from '../mixins/fd-draggable-control';

/**
  This component rendered one row with controls on the edit form.

  @class FdEditformRowComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
  @uses FdDraggableControlMixin
*/
export default Ember.Component.extend(FdDraggableControlMixin, {
  /**
    Indicates that the row contains only one control.

    @private
    @property _singleColumn
    @type Boolean
  */
  _singleColumn: Ember.computed.equal('row.controls.length', 1),

  /**
    Used in class name bindings to overlap the content of the row.

    @private
    @property _dimmed
    @type Boolean
  */
  _dimmed: Ember.computed.reads('draggable'),

  /**
    Used in class name bindings to add a class when this row is selected.

    @private
    @property _iSelected
    @readOnly
    @type Boolean
  */
  _iSelected: Ember.computed('row', 'selectedItem', function() {
    return this.get('row') === this.get('selectedItem');
  }).readOnly(),

  /**
    {{#crossLink "FdEditformConstructorController/selectedItem:property"}}Passed from above{{/crossLink}}, the selected item.

    @property selectedItem
  */
  selectedItem: undefined,

  /**
    The row to render.

    @property row
    @type FdEditformRow
  */
  row: undefined,

  /**
    See description {{#crossLink "FdDraggableControlMixin/draggableProperty:property"}}here{{/crossLink}}.

    @property draggableProperty
  */
  draggableProperty: 'row',

  /**
    See description {{#crossLink "FdDraggableControlMixin/dragDirection:property"}}here{{/crossLink}}.

    @property dragDirection
  */
  dragDirection: 'Y',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNameBindings
  */
  classNameBindings: ['_singleColumn::fields', '_singleColumn::equal', '_singleColumn::width', '_dimmed:dimmed', '_iSelected:selected'],

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['fd-editform-row', 'ui', 'dimmable'],

  /**
    The event handler is `click`.
    Calls the `selectItemAction` action when the component is clicked.
    The action `selectItemAction` should be passed, for example, from the controller.

    @method click
    @param {JQuery.Event} event
  */
  click(event) {
    event.stopPropagation();
    this.get('selectItemAction')(this.get('row'));
  },
});
