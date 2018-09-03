/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import { Class } from './fd-uml-class';
import FdUmlClass from './fd-uml-class';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlTemplateClass
  @extends FdUmlElement
*/
export default FdUmlClass.extend({
  /**
    Params textbox.

    @property params
    @type String
  */
  params: Ember.computed.alias('primitive.TemplateTxt.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position', 'attributes', 'methods', 'params', 'stereotype');

    return new TemplateClass(properties);

  },
});

/**
  Defines the JointJS object, which represents a TemplateClass on the UML diagram.

  @for FdUmlBaseObject
  @class TemplateClass
  @extends Class
  @namespace flexberry.uml
  @constructor
*/
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

  params: [],
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
