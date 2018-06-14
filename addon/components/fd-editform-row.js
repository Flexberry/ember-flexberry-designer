/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  This component rendered one row with controls on the edit form.

  @class FdEditformRowComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    The component is rendered as one column.

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
    @default false
  */
  _dimmed: false,

  /**
    The property to bind to `draggable` HTML attribute.

    @private
    @property _draggable
    @type String
    @default 'true'
  */
  _draggable: 'true',

  /**
    Indicates that this row is dragging.

    @private
    @property _dragging
    @type Boolean
    @default false
  */
  _dragging: false,

  /**
    The `Y` coordinate with which the dragging started.

    @private
    @property _initialY
    @type Number
    @default null
  */
  _initialY: null,

  /**
    The 'Y' coordinate of the line through which you need to drag the row to move.

    @private
    @property _waterline
    @readOnly
    @type Number
  */
  _waterline: Ember.computed(function() {
    let clientRect = this.get('element').getBoundingClientRect();
    let height = clientRect.bottom - clientRect.top;
    return clientRect.top + height / 2;
  }).readOnly(),

  /**
    The row to render.

    @property row
    @type FdEditformRow
  */
  row: undefined,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property attributeBindings
  */
  attributeBindings: ['_draggable:draggable'],

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNameBindings
  */
  classNameBindings: ['_singleColumn:field:fields', '_singleColumn::equal', '_singleColumn::width', '_dimmed:dimmed'],

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['ui', 'dimmable'],

  /**
    Calls `selectAction` action when clicking on component when it is renderd as one column.

    @method click
    @param {JQuery.Event} event
  */
  click(event) {
    event.stopPropagation();
    if (this.get('_singleColumn')) {
      this.get('selectAction')(this.get('row.controls.firstObject'));
    }
  },

  /**
    The event handler is `dragStart`.

    @method dragStart
    @param {JQuery.Event} event
  */
  dragStart(event) {
    event.stopPropagation();
    this.set('_dimmed', true);
    this.set('_dragging', true);
    this.get('setDragRowAction')(this.get('row'));
  },

  /**
    The event handler is `dragEnd`.

    @method dragEnd
    @param {JQuery.Event} event
  */
  dragEnd(event) {
    event.stopPropagation();
    this.set('_dimmed', false);
    this.set('_dragging', false);
    this.get('setDragRowAction')(null);
  },

  /**
    The event handler is `dragEnter`.

    @method dragEnter
    @param {JQuery.Event} event
  */
  dragEnter(event) {
    event.stopPropagation();
    let draggedRow = this.get('getDragRowAction')();
    if (this.get('row') === draggedRow) {
      this.set('_dragging', true);
    }

    if (!this.get('_dragging')) {
      this.set('_initialY', event.originalEvent.clientY);
      return false;
    }
  },

  /**
    The event handler is `dragOver`.

    @method dragOver
    @param {JQuery.Event} event
  */
  dragOver(event) {
    event.stopPropagation();
    if (!this.get('_dragging')) {
      let motion = this.get('_initialY') - event.originalEvent.clientY;
      let waterline = this.get('_waterline');

      let direction;
      if (motion >= 5 && event.originalEvent.clientY < waterline) {
        direction = 'up';
      } else if (motion <= -5 && event.originalEvent.clientY > waterline) {
        direction = 'down';
      }

      if (direction) {
        this.get('moveRowAction')(this.get('row'), direction);
        this.notifyPropertyChange('_waterline');
      }

      return false;
    }
  },
});
