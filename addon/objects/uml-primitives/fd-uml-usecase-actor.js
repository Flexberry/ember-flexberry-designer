/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';
import joint from 'npm:jointjs';

/**
  An object that describes a UsecaseActor on the UML diagram.

  @class FdUmlUsecaseActor
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
    return new UsecaseActor(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'UsecaseActor' object in the UML diagram.

  @for FdUmlUsecaseActor
  @class UsecaseActor
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let UsecaseActor = BaseObject.define('flexberry.uml.UsecaseActor', {
  attrs: {
    image: {
      'xlink:href': 'assets/images/actor.svg',
      width: 30,
      'ref': '.flexberry-uml-header-text',
      'refY': -55,
      'refX': 3,
      height: 50
    },

    text: {
      'visibility': 'visible'
    },

    '.flexberry-uml-header-text': {
      'ref': '',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '</g>',
    '<image/>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {
    BaseObject.prototype.initialize.apply(this, arguments);

  }

});

joint.shapes.flexberry.uml.UsecaseActorView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});

joint.shapes.flexberry.uml.UsecaseActorView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="instance-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});
