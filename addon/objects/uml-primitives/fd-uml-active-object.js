/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';

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
  name: computed.alias('primitive.Name.Text'),

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

joint.shapes.flexberry.uml.ActiveObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea type="text" class="active-object-input class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});
