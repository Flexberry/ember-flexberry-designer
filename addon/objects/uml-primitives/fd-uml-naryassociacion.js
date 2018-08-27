/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { BaseObject } from './fd-uml-object';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlPropertyObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  /**
    The name of the class.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    Indicates that the class is in a collapsed state.

    @property collapsed
    @type Boolean
  */
  collapsed: Ember.computed.alias('primitive.Name.IsFolded'),

  /**
    List of class attributes.

    @property attributes
    @type Array
  */
  attributes: Ember.computed('primitive.AttributesTxt.Text', function() {
    if (!Ember.isEmpty(this.get('primitive.Prop.Text'))) {
      return this.get('primitive.Prop.Text').split('\n');
    }

    return [];
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position', 'attributes');

    return new NAryAssociation(properties);

  },
});

export let NAryAssociation = BaseObject.define('flexberry.uml.NAryAssociation', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size': '12'
    },
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
  })
