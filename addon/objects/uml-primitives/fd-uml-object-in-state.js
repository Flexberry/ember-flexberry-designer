/**
  @module ember-flexberry-designer
*/

import joint from 'npm:jointjs';

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isBlank } from '@ember/utils';

import { ActiveState } from './fd-uml-active-state';
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
    Text on the object in state element.

    @property state
    @type String
  */
  state: computed('primitive.Text.Text', {
    get() {
      return this.get('primitive.Text.Text');
    },
    set(key, value) {
      let stateTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Text.Text', stateTxt);
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
    return new ObjectInState(properties);
  },
});

/**
  Defines the JointJS object, which represents Object in State UML object.

  @for FdUmlObjectInState
  @class ObjectInState
  @extends flexberry.uml.ActiveState
  @namespace flexberry.uml
  @constructor
*/
export let ObjectInState = ActiveState.define('flexberry.uml.ObjectInState', {
  attrs: {
    '.flexberry-uml-header-rect': { 
      'rx': 0,
      'ry': 0,
    },
  },
});

joint.shapes.flexberry.uml.ObjectInStateView = joint.shapes.flexberry.uml.ActiveStateView.extend({
  template: [
   '<div class="uml-class-inputs">',
   '<textarea class="class-name-input object-in-state-input header-input" value="" rows="1" wrap="off"></textarea>',
   '<textarea class="state-input header-input" value="" rows="1" wrap="off"></textarea>',
   '<div class="input-buffer"></div>',
   '</div>'
  ].join(''),

  normalizeState(state) {
    let beforeChar = String.fromCharCode(91);
    let afterChar = String.fromCharCode(93);
    let normalizedState = state.replace(new RegExp(`${'\\'+beforeChar}|${'\\'+afterChar}`, 'g'), '');
    if (!isBlank(normalizedState)) {
      if (normalizedState[0] !== beforeChar) {
        normalizedState = beforeChar + normalizedState;
      }

      if (normalizedState[normalizedState - 1] !== afterChar) {
        normalizedState = normalizedState + afterChar;
      }
    }

    return normalizedState;
  }
});
