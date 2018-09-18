/**
  @module ember-flexberry-designer
*/

import { BaseObject } from './fd-uml-baseobject';
import FdUmlObject from './fd-uml-baseobject';

/**
  An object that describes an active state on an activity diagram

  @class FdUmlStdClass
  @extends FdUmlObject
*/
export default FdUmlObject.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'name', 'position', 'state');
    return new StdClass(properties);
  }
});

/**
  Defines the JointJS object, which represents a 'StdClass' object in the UML diagram.

  @for FdUmlStdClass
  @class StdClass
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let StdClass = BaseObject.define('flexberry.uml.StdClass', {
  attrs: {
    'text': { 'font-weight': 'bold' }
  }
});
