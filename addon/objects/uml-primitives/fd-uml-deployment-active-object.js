/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { ActiveObject } from './fd-uml-active-object';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes an DeploymentActiveObject element on the UML diagram.

  @class FdUmlDeploymentActiveObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the DeploymentActiveObject.

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
    return new DeploymentActiveObject(properties);
  },
});

/**
  Defines the JointJS object, which represents an DeploymentActiveObject in the UML diagram.

  @for FdUmlDeploymentActiveObject
  @class DeploymentActiveObject
  @extends flexberry.uml.ActiveObject
  @namespace flexberry.uml
  @constructor
*/
export let DeploymentActiveObject = ActiveObject.define('flexberry.uml.DeploymentActiveObject', {
  attrs: {
    text: {
      'visibility': 'visible',
    },
    '.flexberry-uml-header-rect': { 'stroke-width': 2 },
  }
}, {
  updateRectangles: function() {
    this.updateRectanglesOld();
  }
});
