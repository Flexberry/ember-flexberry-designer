/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import { BaseObject } from './fd-uml-baseobject';
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
  name: computed.alias('primitive.Name.Text'),

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
});

joint.shapes.flexberry.uml.InstanceView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="instance-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});
