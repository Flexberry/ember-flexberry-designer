/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlClass
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    Stereotype of the class.

    @property stereotype
    @type String
  */
  stereotype: Ember.computed.alias('primitive.StereotypeTxt.Text'),

  /**
    Indicates that the class is in a collapsed state.

    @property collapsed
    @type Boolean
  */
  collapsed: Ember.computed.alias('primitive.Folded'),

  /**
    List of attributes of the class.

    @property attributes
    @type Array
  */
  attributes: Ember.computed('primitive.AttributesTxt.Text', function() {
    return this.get('primitive.AttributesTxt.Text').split('\n');
  }),

  /**
    List of methods of the class.

    @property methods
    @type Array
  */
  methods: Ember.computed('primitive.MethodsTxt.Text', function() {
    return this.get('primitive.MethodsTxt.Text').split('\n');
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'stereotype', 'size', 'position', 'methods', 'attributes');
    if (this.get('collapsed')) {
      return new ClassCollapsed(properties);
    }

    return new Class(properties);

  },
});

/**
  Defines the JointJS element, which represents the UML base class in the diagram.

  @for FdUmlClass
  @class BaseClass
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let BaseClass = joint.shapes.basic.Generic.define('flexberry.uml.BaseClass', {
  attrs: {
    rect: { 'width': 200 },

    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.flexberry-uml-body-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.flexberry-uml-footer-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'fill': 'black',
      'fontSize': 12,
      'font-family': 'Arial'
    },
    '.flexberry-uml-body-text': {
      'ref': '.flexberry-uml-body-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    },
    '.flexberry-uml-footer-text': {
      'ref': '.flexberry-uml-footer-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    }
  },

  name: [],
  attributes: [],
  methods: [],
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/><text class="flexberry-uml-footer-text"/>',
    '</g>'
  ].join(''),

  initialize() {

    this.on('change:name change:attributes change:methods', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getClassName() {
    return this.get('name');
  },

  updateRectangles() {

    var attrs = this.get('attrs');

    var rects = [
        { type: 'header', text: this.getClassName() },
        { type: 'body', text: this.get('attributes') },
        { type: 'footer', text: this.get('methods') }
    ];

    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    let _this = this;
    rects.forEach(function(rect) {
      if (_this.markup.includes('flexberry-uml-' + rect.type + '-rect')) {

        let lines = Array.isArray(rect.text) ? rect.text : [rect.text];

        let maxStringChars = 0;
        lines.forEach(function(line) {
          if (line.length > maxStringChars) {
            maxStringChars = line.length;
          }
        });

        let hightStep = attrs['.flexberry-uml-header-text'].fontSize;
        let rectHeight = lines.length * hightStep + 10;

        let widthStep = attrs['.flexberry-uml-header-text'].fontSize / 1.5;
        let rectWidth = maxStringChars * widthStep  + 10;

        newHeight += rectHeight;
        newWidth = newWidth > rectWidth ? newWidth : rectWidth;
        attrs['.flexberry-uml-' + rect.type + '-text'].text = lines.join('\n');
        attrs['.flexberry-uml-' + rect.type + '-rect'].height = rectHeight;
        attrs['.flexberry-uml-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

        offsetY += rectHeight;
      }
    });

    newWidth = this.attributes.size.width > 1 ? this.attributes.size.width : newWidth;
    this.resize(newWidth, newHeight);
  }
});

/**
  Defines the JointJS element, which represents the UML class in the diagram.

  @for FdUmlClass
  @class Class
  @extends flexberry.uml.BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let Class = BaseClass.define('flexberry.uml.Class', {
  attrs: {
    '.flexberry-uml-header-text': { 'font-weight': 'bold' },
    '.flexberry-uml-header-text tspan[x]': { 'font-weight': 'normal' },
  },

  stereotype: [],
}, {
  getClassName() {
    return [this.get('name'), this.get('stereotype')];
  },
});

/**
  Defines the JointJS element, which represents the UML class in collapsed state.

  @for FdUmlClass
  @class ClassCollapsed
  @extends flexberry.uml.Class
  @namespace flexberry.uml
  @constructor
*/
export let ClassCollapsed = Class.define('flexberry.uml.ClassCollapsed', {}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});
