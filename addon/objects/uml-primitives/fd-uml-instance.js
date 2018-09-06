/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { BaseObject } from './fd-uml-object';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes an instance on the UML diagram.

  @class FdUmlInstance
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  /**
    The name of the instance.

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
