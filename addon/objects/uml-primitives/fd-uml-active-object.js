/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { BaseObject } from './fd-uml-baseobject';
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
    Type of primitive.

    @property type
    @type String
  */
  type: Ember.computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    if (this.get('type') === 'STORMCASE.UML.dpd.ActiveDeploymentObject, UMLDPD') {
      return new DeploymentActiveObject(properties);
    } else {
      return new ActiveObject(properties);
    }

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

export let DeploymentActiveObject = ActiveObject.define('flexberry.uml.deploymentDiagram_ActiveObject', {
  attrs: {
    '.flexberry-uml-header-rect': { 'stroke-width': 2 },
  }
});
