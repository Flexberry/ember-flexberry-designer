/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes an Active Object element on the UML diagram.

  @class FdUmlActiveObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the ActiveObject.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      let nameTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', nameTxt);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new ActiveObject(properties);
  },
});

/**
  Defines the JointJS object, which represents an Active Object in the UML diagram.

  @for FdUmlActiveObject
  @class ActiveObject
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let ActiveObject = BaseObject.define('flexberry.uml.ActiveObject', {
  // Minimum width.
  minWidth: 80,

  // Minimum height.
  minHeight: 30,
}, {
  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});

joint.shapes.flexberry.uml.ActiveObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea type="text" class="active-object-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});
