/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { BaseObject } from './fd-uml-object';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a n-ar associacion on the UML diagram.

  @class FdUmlNAryAssociation
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position', 'attributes');

    return new Decision(properties);

  },
});

/**
  Defines the JointJS object, which represents a 'NAryAssociation' object in the UML diagram.

  @for FdUmlNAryAssociation
  @class NAryAssociation
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Decision = BaseObject.define('flexberry.uml.Decision', {
  attrs: {
    path: {
      'd': 'M 0 20 L 50 0 100 20 50 40 Z',
    }
  },
  heightPadding: 40,
}, {
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<path class="flexberry-uml-header-rect"/>',
      '</g>',
      '<text class="flexberry-uml-header-text"/>',
      '</g>'
    ].join(''),
  });
