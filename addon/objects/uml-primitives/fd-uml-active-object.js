/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { BaseObject } from './fd-uml-object';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes an Active Object element on the UML diagram.

  @class FdUmlActiveObject
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
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new ActiveObject(properties);

  },
});

/**
  Defines the JointJS object, which represents an Active Object in the UML diagram.

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
