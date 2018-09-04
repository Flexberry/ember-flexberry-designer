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
    The state of the ActiveObject.

    @property state
    @type String
  */
  state: Ember.computed.alias('primitive.Text.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'state', 'size', 'position', 'attributes');
    return new ObjectInState(properties);

  },
});

/**
  Defines the JointJS object, which represents Object in State UML object.

  @for FdUmlObjectInState
  @class ObjectInState
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let ObjectInState = BaseObject.define('flexberry.uml.ObjectInState', {
  attrs: {
    'text tspan': { 'text-decoration': 'underline' },
    'text tspan[x]': { 'font-weight': 'bold', 'text-decoration': 'none' },
  },
  state: [],

}, {
    getObjName: function () {
      let state = this.get('state').length > 0 ? '[' + this.get('state') + ']' : '';
      return [this.get('name'), state];
    }
  });
