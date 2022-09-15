/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

import { BaseObject } from './fd-uml-baseobject';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a states on the UML diagram.

  @class FdUmlStateEx
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the states.

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
    List of attributes of the states.

    @property attributes
    @type String
  */
  attributes: computed('primitive.Text.Text', {
    get() {
      return this.get('primitive.Text.Text').split('\n');
    },
    set(key, value) {
      let attributesTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Text.Text', attributesTxt);
      return value;
    },
  }),

  /**
    Type of primitive.

    @property type
    @type String
  */
  type: computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    if (this.get('type') === 'STORMCASE.UML.std.CompositeState, UMLSTD') {
      return new CompositeState(properties);
    } else {
      return new StateEx(properties);
    }

  },
});

/**
  Defines the JointJS element, which represents the UML StateEx in the diagram.

  @for FdUmlStateEx
  @class StateEx
  @extends flexberry.uml.BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let StateEx = BaseObject.define('flexberry.uml.StateEx', {
  attrs: {
    '.flexberry-uml-body-rect': {
      'stroke': 'black',
      'stroke-width': 1,
      'fill': '#ffffff',
      'fill-opacity': 0
    },
  },

  // Minimum width.
  minWidth: 80,

  // Minimum height.
  minHeight: 60,
}, {

  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
      tagName: 'rect',
      className: 'flexberry-uml-header-rect'
    }, {
      tagName: 'rect',
      className: 'flexberry-uml-body-rect'
    }]
  }],

  getRectangles() {
    return [
      { type: 'header', element: this },
      { type: 'body',  element: this },
    ];
  },
});

joint.shapes.flexberry.uml.StateExView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join('')
});

/**
  Defines the JointJS element, which represents the UML CompositeState in the diagram.

  @for FdUmlStateEx
  @class CompositeState
  @extends StateEx
  @namespace flexberry.uml
  @constructor
*/
export let CompositeState = StateEx.define('flexberry.uml.CompositeState', {
  attrs: { '.flexberry-uml-body-text': { 'font-weight':'bold', 'ref-y': 0, 'y-alignment': 'start' } }
});

joint.shapes.flexberry.uml.CompositeStateView = joint.shapes.flexberry.uml.StateExView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join('')
});
