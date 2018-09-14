/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { BaseObject } from './fd-uml-baseobject';
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
    let properties = this.getProperties('id', 'size', 'name', 'position', 'state');
    if (this.get('type') === 'STORMCASE.UML.std.State, UMLSTD') {
      return new State(properties);
    } else if (this.get('type') === 'STORMCASE.UML.std.Class, UMLSTD') {
      return new StdClass(properties);
    } else {
      return new ActiveState(properties);
    }

  },
});

/**
  Defines the JointJS object, which represents a 'StdClass' object in the UML diagram.

  @for FdUmlActiveState
  @class StdClass
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let StdClass = BaseObject.define('flexberry.uml.stdClass', {
  attrs: {
    'text': { 'font-weight': 'bold' }
  }
});

/**
  Defines the JointJS object, which represents a 'State' object in the UML diagram.

  @for FdUmlActiveState
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
