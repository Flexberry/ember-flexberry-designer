/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import { isArray, A } from '@ember/array';
import { isNone } from '@ember/utils';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

import joint from 'npm:jointjs';

/**
  An object that describes an history on the UML diagram.

  @class FdUmlHistory
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Name on the start state element.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text') || '';
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
    let properties = this.getProperties('id', 'position');
    properties.objectModel = this;
    if (this.primitive.$type === 'STORMCASE.UML.std.DeepHistory, UMLSTD') {
      return new DeepHistory(properties);
    } else {
      return new History(properties);
    }
  },
});

/**
  Defines the JointJS object, which represents a History.

  @for FdUmlHistory
  @class History
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let History = BaseObject.define('flexberry.uml.History', {
  size: { width: 20, height: 20 },
  attrs: {
    '.flexberry-uml-header-circle-outer': { 'fill': 'white', 'stroke': 'black', 'stroke-width': 1, 'r': 30, 'ref-y': 10, 'ref-x': 10 },
    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-circle-outer',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'fill': 'black',
      'text': 'H',
      'font-family':'Times New Roman', 
      'font-size': '12'
    }
  },
  
  // Minimum height.
  minHeight: 20,

  // Minimum width
  minWidth: 20,

  getRectangles() {
    return [];
  },
}, {
  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
      tagName: 'g',
      className: 'scalable',
      children: [{
        tagName: 'circle',
        className: 'flexberry-uml-header-circle-outer'
      }]
    }, {
        tagName: 'text',
        className: 'flexberry-uml-header-text'
    }]
  }],
});

joint.shapes.flexberry.uml.HistoryView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
  ].join(''),

  getSizeChangers() {
    return A();
  },

  // No resize.
  updateRectangles() {},

   setColors() {
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.flexberry-uml-header-circle-outer/stroke', textColor);
      this.model.attr('.flexberry-uml-header-text/stroke', textColor);
    }
  },
});

/**
  Defines the JointJS object, which represents a DeepHistory.

  @for FdUmlHistory
  @class DeepHistory
  @extends History
  @namespace flexberry.uml
  @constructor
*/
export let DeepHistory = History.define('flexberry.uml.DeepHistory', {
  attrs: {     
    '.flexberry-uml-header-text': {
      'text': 'H*',
  }}
});

joint.shapes.flexberry.uml.DeepHistoryView = joint.shapes.flexberry.uml.HistoryView;
