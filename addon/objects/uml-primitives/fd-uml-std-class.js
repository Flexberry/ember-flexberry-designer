/**
  @module ember-flexberry-designer
*/
import { BaseObject } from './fd-uml-baseobject';
import FdUmlObject from './fd-uml-baseobject';

import joint from 'npm:jointjs';

/**
  An object that describes an active state on an activity diagram

  @class FdUmlStdClass
  @extends FdUmlObject
*/
export default FdUmlObject.extend({
  /**
    The name of the class.

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
    let properties = this.getProperties('id', 'size', 'position', 'state');
    properties.objectModel = this;
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
});

joint.shapes.flexberry.uml.StdClassView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="instance-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});