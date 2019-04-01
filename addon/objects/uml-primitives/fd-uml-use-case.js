/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import joint from 'npm:jointjs';

/**
  An object that describes a UseCase on the UML diagram.

  @class FdUmlUseCase
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new UseCase(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'UseCase' object in the UML diagram.

  @for FdUmlUseCase
  @class UseCase
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let UseCase = joint.shapes.basic.Generic.define('flexberry.uml.Usecase', {
  attrs: {
    rect: { 'width': 400 },
    '.uml-usecase-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.uml-usecase-text': {
      'ref': '.uml-usecase-rect',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'refY': 0.5,
      'refX': 0.5,
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  },
  name: ''
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-usecase-rect"/>',
    '</g>',
    '<image/>',
    '<text class="uml-usecase-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {
    this.on('change:name', function() {
      this.updateRectangles();
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getUsecaseName: function() {
    return this.get('name');
  },

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getUsecaseName() };
    let lines = rect.text.split('\n');

    let maxStringChars = lines[0].length;
    for (let stringIndex = 0; stringIndex < lines.length; stringIndex++) {
      if (lines[stringIndex].length >= maxStringChars) {
        maxStringChars = lines[stringIndex].length;
      }
    }

    let hightStep = attrs['.uml-usecase-text'].fontSize;
    let rectHeight = lines.length * hightStep + 20;

    let widthStep = attrs['.uml-usecase-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 20;

    attrs['.uml-usecase-text'].text = rect.text;
    attrs['.uml-usecase-rect'].height = rectHeight;
    attrs['.uml-usecase-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
  }
});
