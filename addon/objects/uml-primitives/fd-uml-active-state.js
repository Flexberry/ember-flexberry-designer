/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { State } from './fd-uml-state';
import FdUmlObject from './fd-uml-baseobject';

/**
  An object that describes an active state on an activity diagram

  @class FdUmlActiveState
  @extends FdUmlObject
*/
export default FdUmlObject.extend({

  /**
    Text on the active state element.

    @property state
    @type String
  */
  state: Ember.computed.alias('primitive.Text.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'name', 'position', 'state');
    return new ActiveState(properties);
  }
});

/**
  Defines the JointJS object, which represents a 'Active state' object in the UML diagram.

  @for FdUmlActiveState
  @class ActiveState
  @extends State
  @namespace flexberry.uml
  @constructor
*/
export let ActiveState = State.define('flexberry.uml.ActiveState', {
}, {
  getObjName: function() {
    let state = this.get('state').length > 0 ? '«' + this.get('state') + '»' : '';
    return [this.get('name'), state];
  }
});
