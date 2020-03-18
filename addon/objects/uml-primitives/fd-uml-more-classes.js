/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';
import { A } from '@ember/array';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a 'more classes' object on the UML diagram.

  @class FdUmlMoreClasses
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'position');
    properties.objectModel = this;
    return new MoreClasses(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'MoreClasses' object in the UML diagram.

  @for FdUmlMoreClasses
  @class MoreClasses
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let MoreClasses = joint.shapes.basic.Generic.define('flexberry.uml.MoreClasses', {

  objectModel: null,

  size: { width: 50, height: 10 },
  attrs: {
    circle: { fill: 'black', r: '10' },
  },
}, {
  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
      tagName: 'g',
      className: 'scalable',
      children: [{
        tagName: 'circle'
      }, {
        tagName: 'circle',
        attributes: {'transform': 'translate(40,0)'}
      }, {
        tagName: 'circle',
        attributes: {'transform': 'translate(80,0)'}
      }]
    }]
  }],

  initialize() {
    this.on('change:position', function(element, newPosition) {
      let objectModel = this.get('objectModel');
      if (objectModel) {
        objectModel.set('x', newPosition.x);
        objectModel.set('y', newPosition.y);
        this.trigger('uml-update');
      }
    }, this);

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  }
});

joint.shapes.flexberry.uml.MoreClassesView = joint.shapes.flexberry.uml.PrimitiveElementView.extend({
  getSizeChangers() {
    return A();
  },

  setColors() {
    const brushColor = this.getBrushColor();

    this.model.attr(`circle/fill`, brushColor);
  }
});
