/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdUmlElement from './fd-uml-element';
import { BaseClass } from './fd-uml-class';

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
    Stereotype of the class.

    @property stereotype
    @type String
  */
  stereotype: Ember.computed.alias('primitive.StereotypeTxt.Text'),

  /**
    Indicates that the class is in a collapsed state.

    @property collapsed
    @type Boolean
  */
  collapsed: Ember.computed.alias('primitive.Folded'),

  /**
    List of class attributes.

    @property attributes
    @type Array
  */
  attributes: Ember.computed('primitive.AttributesTxt.Text', function() {
    if (!Ember.isEmpty(this.get('primitive.AttributesTxt.Text'))) {
      return this.get('primitive.AttributesTxt.Text').split('\n');
    }

    return [];
  }),

  /**
    List of methods of the class.

    @property methods
    @type Array
  */
  methods: Ember.computed('primitive.MethodsTxt.Text', function() {
    if (!Ember.isEmpty(this.get('primitive.MethodsTxt.Text'))) {
      return this.get('primitive.MethodsTxt.Text').split('\n');
    }

    return [];
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'stereotype', 'size', 'position', 'methods', 'attributes');

    return new PropertyObject(properties);

  },
});

export let PropertyObject = BaseClass.define('flexberry.uml.PropertyObject', {
  attrs: {
    '.flexberry-uml-header-text': {
      'text-decoration': 'underline'
    },
  },
}, {
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/>',
      '</g>',
      '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/>',
      '</g>'
    ].join('')
  });
