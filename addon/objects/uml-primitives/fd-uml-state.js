/**
  @module ember-flexberry-designer
*/

import { StdClass } from './fd-uml-std-class';
import FdUmlObject from './fd-uml-baseobject';

/**
  An object that describes an active state on an activity diagram

  @class FdUmlState
  @extends FdUmlObject
*/
export default FdUmlObject.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new State(properties);
  }
});

/**
  Defines the JointJS object, which represents a 'State' object in the UML diagram.

  @for FdUmlState
  @class State
  @extends StdClass
  @namespace flexberry.uml
  @constructor
*/
export let State = StdClass.define('flexberry.uml.State', {
  attrs: {
    '.flexberry-uml-header-rect': { rx:10, ry:10 },
  }
});
