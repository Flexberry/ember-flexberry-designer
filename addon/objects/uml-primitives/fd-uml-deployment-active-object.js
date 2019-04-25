/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';

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
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      let nameTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', nameTxt);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
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
