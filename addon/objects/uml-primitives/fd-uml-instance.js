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
    return new Instance(properties);

  },
});

/**
  Defines the JointJS object, which represents an Instance in the UML diagram.

  @for FdUmlInstance
  @class Instance
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Instance = BaseObject.define('flexberry.uml.Instance', {
  attrs: {
    text: {
      'text-decoration': 'underline',
    }
  }
});
