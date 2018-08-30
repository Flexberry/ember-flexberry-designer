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
    The name of the ActiveObject.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    List of object's attributes.

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
    return new ActiveObject(properties);

  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlActiveObject
  @class ActiveObject
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let ActiveObject = BaseObject.define('flexberry.uml.ActiveObject', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-weight': 'bold'
    }
  }
});
