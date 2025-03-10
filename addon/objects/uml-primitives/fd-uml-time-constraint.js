/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a time constraint on the UML diagram.

  @class FdUmlTimeConstraint
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  /**
    The name of the note, actually its content.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      const nameTxt = (isArray(value)) ? value.join('\n') : value;
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
    
    return new TimeConstraint(properties);
  },
});

/**
  Defines the JointJS element, which represents the time constraint element in the UML diagram.

  @for FdUmlTimeConstraint
  @class TimeConstraint
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let TimeConstraint = BaseObject.define('flexberry.uml.TimeConstraint', {
    attrs: {
      '.flexberry-uml-header-rect': { 
        'stroke': 'black', 
        'stroke-width': 1, 
        'stroke-dasharray': '9 4'
      },
    },
  
    // Minimum height.
    minHeight: 17,
  }, {
    markup: [
      '<g class="rotatable">',
      '<rect class="flexberry-uml-header-rect"/>',
      '</g>'
    ].join(''),
  
    getRectangles() {
      return [
        { type: 'header', element: this },
      ];
    },
  });

joint.util.setByPath(joint.shapes, 'flexberry.uml.TimeConstraint', TimeConstraint, '.');

joint.shapes.flexberry.uml.TimeConstraintView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off" style="text-align: left;"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    let paramsBox = this.$box.find('.header-input');
    paramsBox.css({
      left: 2,
      position: 'absolute'
    });
  },
});
