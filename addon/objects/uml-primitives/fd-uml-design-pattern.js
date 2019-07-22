/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a DesignPattern on the UML diagram.

  @class FdUmlDesignPattern
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

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

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new DesignPattern(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'DesignPattern' object in the UML diagram.

  @for FdUmlDesignPattern
  @class DesignPattern
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let DesignPattern = BaseObject.define('flexberry.uml.DesignPattern', {
  attrs: {
    '.flexberry-uml-header-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeDasharray': '10,2', 'stroke-width': '1', 'fill': '#ffffff' }
  }
});

joint.shapes.flexberry.uml.DesignPatternView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="instance-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});