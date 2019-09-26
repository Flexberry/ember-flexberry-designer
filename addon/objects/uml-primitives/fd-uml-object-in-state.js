/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

import joint from 'npm:jointjs';

/**
  An object that describes an `Object in state` element on the UML diagram.

  @class FdUmlObjectInState
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the object.

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
    return new ObjectInState(properties);
  },
});

/**
  Defines the JointJS object, which represents Object in State UML object.

  @for FdUmlObjectInState
  @class ObjectInState
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let ObjectInState =  BaseObject.define('flexberry.uml.ObjectInState ', {
    // Minimum height.
    minHeight: 30,

    // Minimum width
    minWidth: 80,

    getRectangles() {
      return [
        { type: 'header', text: this.getObjName(), element: this },
      ];
    },
}, {
  markup: [
    '<g class="rotatable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>'
  ].join(''),
});

joint.shapes.flexberry.uml.ObjectInStateView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
   '<div class="uml-class-inputs">',
   '<textarea class="class-name-input object-in-state-input header-input" value="" rows="1" wrap="off"></textarea>',
   '<div class="input-buffer"></div>',
   '</div>'
  ].join('')
});
