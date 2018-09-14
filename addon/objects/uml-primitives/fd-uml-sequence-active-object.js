/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { SequenceDiagramObject } from './fd-uml-sequence-object';

/**
  An object that describes a Sequence Active Object element on the UML diagram.

  @class FdUmlSequenceActiveObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the SequenceActiveObejct.

    @property attrs
    @type String
  */
  attrs: Ember.computed('primitive.Name.Text', function () {
    return { text: { text: this.get('primitive.Name.Text') } };
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS(graph) {
    let properties = this.getProperties('id', 'attrs', 'size', 'position');
    properties.graph = graph;
    return new SequenceDiagramActiveObject(properties);

  },
});

/**
  Defines the JointJS object, which represents an Active Object in the UML diagram.

  @for FdUmlSequenceDiagramActiveObject
  @class SequenceDiagramActiveObject
  @extends SequenceDiagramObject
  @namespace flexberry.uml
  @constructor
*/
export let SequenceDiagramActiveObject = SequenceDiagramObject.define('flexberry.uml.sequencediagramActiveObject', {
  attrs: {
    rect: { 'stroke-width':2 },
    text: {
      'ref': 'rect',
      'ref-y': 0,
      'ref-x': 0,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
    }
  },
  heightPadding: 20,
}, {
  initialize: function() {
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    this.on('change', function () {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);
  },

  getObjName: function() {
    let ret = this.get('attrs').text.text;
    if (Ember.isEmpty(ret)) {
      return '';
    } else {
      return ret;
    }
  },

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let objName = this.getObjName();
    let lines = Array.isArray(objName) ? objName : [objName];

    let maxStringChars = 0;
    lines.forEach(function (line) {
      if (line.length > maxStringChars) {
        maxStringChars = line.length;
      }
    });

    let hightStep = attrs.text['font-size'];
    let rectHeight = lines.length * hightStep + this.get('heightPadding');

    let widthStep = attrs.text['font-size'] / 1.5;
    let rectWidth = maxStringChars * widthStep + 10;

    attrs.text.text = lines.join('\n');
    attrs.rect.height = rectHeight;
    attrs.rect.width = rectWidth;
    this.resize(rectWidth, rectHeight);
  }
});
