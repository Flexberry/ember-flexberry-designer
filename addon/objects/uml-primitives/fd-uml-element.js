/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import FdUmlPrimitive from './fd-uml-primitive';

/**
  An object that defines any element on the UML diagram.

  @class FdUmlElement
  @extends FdUmlPrimitive
*/
export default FdUmlPrimitive.extend({

  /**
    The height of this element.

    @property height
    @type Number
  */
  height: computed.alias('primitive.Size.Height'),

  /**
    The width of this element.

    @property width
    @type Number
  */
  width: computed.alias('primitive.Size.Width'),

  /**
    An object with the properties `height` and `width` of this element, for example `{ height: 100, width: 100 }`.

    @property size
    @type Object
  */
  size: computed('height', 'width', function() {
    return this.getProperties('height', 'width');
  }),

  /**
    The `X` coordinate of this element.

    @property x
    @type Number
  */
  x: computed.alias('primitive.Location.X'),

  /**
    The `Y` coordinate of this element.

    @property y
    @type Number
  */
  y: computed.alias('primitive.Location.Y'),

  /**
    An object with the coordinates `X` and `Y` of this element, for example `{ x: 100, y: 100 }`.

    @property position
    @type Object
  */
  position: computed('x', 'y', function() {
    return this.getProperties('x', 'y');
  }),
});
