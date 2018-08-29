/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { Class } from './fd-uml-class';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlPropertyObject
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
    The name of the class.

    @property name
    @type String
  */
  params: Ember.computed.alias('primitive.TemplateTxt.Text'),

  /**
  List of class attributes.

  @property attributes
  @type Array
*/
  attributes: Ember.computed('primitive.AttributesTxt.Text', function () {
    return this.get('primitive.AttributesTxt.Text').split('\n');
  }),

  /**
    List of methods of the class.

    @property methods
    @type Array
  */
  methods: Ember.computed('primitive.MethodsTxt.Text', function () {
    return this.get('primitive.MethodsTxt.Text').split('\n');
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position', 'attributes', 'methods', 'params');

    return new TemplateClass(properties);

  },
});

export let TemplateClass = Class.define('flexberry.uml.TemplateClass', {
  attrs: {
    '.flexberry-uml-params-rect': {
      'stroke': 'black', 'stroke-width': 1,
      'stroke-dasharray': '7 2',
      'fill': 'white',
    },

    '.flexberry-uml-params-text': {
      'ref': '.flexberry-uml-params-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'font-weight': 'bold',
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial'
    },
  },

  params:[],
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-params-rect"/>',
    '<rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-params-text"/>',
    '<text class="flexberry-uml-body-text"/><text class="flexberry-uml-footer-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    Class.prototype.updateRectangles.apply(this, arguments);

    var attrs = this.get('attrs');

    let params = this.get('params');
    let lines = Array.isArray(params) ? params : [params];

    let maxStringChars = 0;
    lines.forEach(function(line) {
      if (line.length > maxStringChars) {
        maxStringChars = line.length;
      }
    });

    let rectHeight = lines.length * 12 + 10;
    let rectWidth = maxStringChars * 8 + 10;

    attrs['.flexberry-uml-params-text'].text = lines.join('\n');
    attrs['.flexberry-uml-params-rect'].height = rectHeight;
    attrs['.flexberry-uml-params-rect'].width = rectWidth;

    let topTranslate = -rectHeight + 5;
    attrs['.flexberry-uml-params-rect'].transform = 'translate(160, ' + topTranslate + ' )';

    let newHeight = this.size().height + attrs['.flexberry-uml-params-rect'].height;
    let newWidth = this.size().width + attrs['.flexberry-uml-params-rect'].width;

    this.resize(newWidth, newHeight);
  }
});
