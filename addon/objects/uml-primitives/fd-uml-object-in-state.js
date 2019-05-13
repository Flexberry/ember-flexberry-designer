/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';

import { BaseObject } from './fd-uml-baseobject';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an `Object in state` element on the UML diagram.

  @class FdUmlObjectInState
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the object.

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
    The state of the ObjectInState.

    @property state
    @type String
  */
  state: computed.alias('primitive.Text.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new ObjectInState(properties);

  },
});

/**
  Defines the JointJS object, which represents Object in State UML object.

  @for FdUmlObjectInState
  @class ObjectInState
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let ObjectInState = BaseObject.define('flexberry.uml.ObjectInState', {
  attrs: {
    'text tspan': { 'text-decoration': 'underline' },
    'text tspan[x]': { 'font-weight': 'bold', 'text-decoration': 'none' },
    'text': { 'visibility': 'visible' },
  },

}, {
    getObjName: function () {
      let state = this.get('objectModel.state').length > 0 ? '[' + this.get('objectModel.state') + ']' : '';
      return [this.get('objectModel.name'), state];
    },

    updateRectangles: function () {
      this.updateRectanglesOld();
    }
  });
