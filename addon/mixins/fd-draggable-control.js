/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdEditformRow from '../objects/fd-editform-row';
import FdEditformControl from '../objects/fd-editform-control';

/**
  Mixin with the support `drag and drop` for controls in the edit form constructor.

  @class FdDraggableControlMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
    The `X` coordinate with which the dragging started.

    @private
    @property _initialX
    @type Number
  */
  _initialX: undefined,

  /**
    The `Y` coordinate with which the dragging started.

    @private
    @property _initialY
    @type Number
  */
  _initialY: undefined,

  /**
    In dependent on `dragDirection` returns `_initialX` or `_initialY`.

    @private
    @property _initialXY
    @readOnly
    @type Number
  */
  _initialXY: Ember.computed('_initialX', '_initialY', 'dragDirection', function() {
    return this.get(`_initial${this.get('dragDirection')}`);
  }).readOnly(),

  /**
    The 'X' or 'Y' coordinate of the line through which you need to drag the item to move.

    @private
    @property _centerXY
    @readOnly
    @type Number
  */
  _centerXY: Ember.computed('dragDirection', function() {
    let clientRect = this.get('element').getBoundingClientRect();
    switch (this.get('dragDirection')) {
      case 'X':
        let width = clientRect.right - clientRect.left;
        return clientRect.left + width / 2;

      case 'Y':
        let height = clientRect.bottom - clientRect.top;
        return clientRect.top + height / 2;

      default:
        throw new Error(`The drag direction must be 'X' or 'Y'.`);
    }
  }).readOnly(),

  /**
    Returns the item to be dragged.

    @private
    @property _draggableProperty
    @readOnly
    @type FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab
  */
  _draggableProperty: Ember.computed('draggableProperty', function() {
    return this.get(this.get('draggableProperty'));
  }).readOnly(),

  /**
    Specifies the property name in the component, in which draggable item is stored.

    @property draggableProperty
    @type String
  */
  draggableProperty: undefined,

  /**
    Specifies the direction that will be used to sort the draggable items.
    Available values: `X` or `Y`.

    @property dragDirection
    @type String
  */
  dragDirection: undefined,

  /**
    The property to bind to `draggable` HTML attribute.

    @property draggable
    @type Boolean
    @default false
  */
  draggable: false,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property attributeBindings
  */
  attributeBindings: ['draggable'],

  /**
    The event handler is `dragStart`.

    @method dragStart
    @param {JQuery.Event} event
  */
  dragStart(event) {
    event.stopPropagation();
    this.get('setDragItemAction')(this.get('_draggableProperty'));
  },

  /**
    The event handler is `dragEnd`.

    @method dragEnd
    @param {JQuery.Event} event
  */
  dragEnd(event) {
    event.stopPropagation();
    this.get('setDragItemAction')(null);
  },

  /**
    The event handler is `dragEnter`.

    @method dragEnter
    @param {JQuery.Event} event
  */
  dragEnter(event) {
    let draggedItem = this.get('getDragItemAction')();
    let draggableItem = this.get('_draggableProperty');
    if (draggedItem === draggableItem) {
      event.stopPropagation();
    } else if (this._draggingIsSupported(draggableItem, draggedItem)) {
      this.set('_initialX', event.originalEvent.clientX);
      this.set('_initialY', event.originalEvent.clientY);

      event.stopPropagation();
      return false;
    }
  },

  /**
    The event handler is `dragOver`.

    @method dragOver
    @param {JQuery.Event} event
  */
  dragOver(event) {
    if (!this.get('_initialXY')) {
      let draggedItem = this.get('getDragItemAction')();
      let draggableItem = this.get('_draggableProperty');
      if (draggedItem === draggableItem) {
        event.stopPropagation();
      } else if (this._draggingIsSupported(draggableItem, draggedItem)) {
        this.set('_initialX', event.originalEvent.clientX);
        this.set('_initialY', event.originalEvent.clientY);

        event.stopPropagation();
        return false;
      }
    } else {
      let clientXY = Ember.get(event.originalEvent, `client${this.get('dragDirection')}`);
      let centerXY = this.get('_centerXY');
      let motion = this.get('_initialXY') - clientXY;
      
      let direction;
      if (motion >= 5 && clientXY < centerXY) {
        direction = 'up';
      } else if (motion <= -5 && clientXY > centerXY) {
        direction = 'down';
      }

      if (direction) {
        this.get('moveDragItemAction')(this.get('_draggableProperty'), direction);
        this.notifyPropertyChange('_centerXY');
        this.set('_initialX', undefined);
        this.set('_initialY', undefined);
      }

      return false;
    }
  },

  /**
    @private
    @method _draggingIsSupported
    @param {FdEditformRow|FdEditformControl} over Item over which is dragged.
    @param {FdEditformRow|FdEditformControl} dragged Dragged item.
    @return {Boolean} If dragging makes sense `true`, else `false`.
  */
  _draggingIsSupported(over, dragged) {
    let result = over instanceof FdEditformRow && dragged instanceof FdEditformRow;
    result = result || over instanceof FdEditformControl && dragged instanceof FdEditformControl;
    return result;
  },
});
