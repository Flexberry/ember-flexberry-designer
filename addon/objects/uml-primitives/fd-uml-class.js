/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import '../../utils/fd-common-primitives';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlClass
  @extends FdUmlObject
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
    return this.get('primitive.AttributesTxt.Text').split('\n');
  }),

  /**
    List of methods of the class.

    @property methods
    @type Array
  */
  methods: Ember.computed('primitive.MethodsTxt.Text', function() {
    return this.get('primitive.MethodsTxt.Text').split('\n');
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'stereotype', 'size', 'position', 'methods', 'attributes');
    if (this.get('collapsed')) {
      return new ClassCollapsed(properties);
    } else {
      return new Class(properties);
    }
  },
});

/**
  Defines the JointJS element, which represents the UML class in the diagram.

  @for FdUmlClass
  @class Class
  @extends flexberryUml.BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let Class = joint.shapes.flexberryUml.BaseClass.define('flexberry.uml.Class', {
  attrs: {
    '.flexberry-uml-header-text': { 'font-weight': 'bold' },
    '.flexberry-uml-header-text tspan[x]': { 'font-weight': 'normal' },
  },

  stereotype: [],
}, {
  getClassName() {
    return [this.get('name'), this.get('stereotype')];
  },
});

/**
  Defines the JointJS element, which represents the UML class in collapsed state.

  @for FdUmlClass
  @class ClassCollapsed
  @extends flexberry.uml.Class
  @namespace flexberry.uml
  @constructor
*/
export let ClassCollapsed = Class.define('flexberry.uml.ClassCollapsed', {}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});
