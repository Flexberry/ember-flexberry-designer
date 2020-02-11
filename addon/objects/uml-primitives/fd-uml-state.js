/**
  @module ember-flexberry-designer
*/
import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

/**
  An object that describes an active state on an activity diagram

  @class FdUmlState
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
      let attributesTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', attributesTxt);
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
    return new State(properties);
  }
});

/**
  Defines the JointJS object, which represents a 'State' object in the UML diagram.

  @for FdUmlState
  @class State
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let State = BaseObject.define('flexberry.uml.State', {
  attrs: {
    '.flexberry-uml-header-rect': { rx:10, ry:10 },
  },

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

joint.shapes.flexberry.uml.StateView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="instance-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});