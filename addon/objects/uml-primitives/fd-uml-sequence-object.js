/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { SequenceActor } from './fd-uml-sequence-actor';

/**
  An object that describes a Sequence Object element on the UML diagram.

  @class FdUmlSequenceObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the SequenceObject.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new SequenceDiagramObject(properties);

  },
});

/**
  Defines the JointJS object, which represents a Sequence Object in the UML diagram.

  @for FdUmlSequenceDiagramObject
  @class SequenceDiagramObject
  @extends SequenceActor
  @namespace flexberry.uml
  @constructor
*/
export let SequenceDiagramObject = SequenceActor.define('flexberry.uml.sequencediagramObject', {
  attrs: {
    size: { 'width': 40, 'height': 40 },
    rect: { width: 40, height: 40, fill: '#FFFFFF', stroke: 'black' },
    text: {
      'ref': 'rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
    }
  },
  heightPadding: 20,
}, {
  initialize: function () {
    this.on('change', function () {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getObjName: function () {
    let ret = this.get('name');
    if (isEmpty(ret)) {
      return '';
    } else {
      return ret;
    }
  },

  updateRectangles: function () {
    let attrs = this.get('attrs');
    let objName = this.getObjName();
    let lines = Array.isArray(objName) ? objName : [objName];

    let maxStringChars = 8;
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
