/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import $ from 'jquery';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

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
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    
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
export let SequenceDiagramObject = BaseObject.define('flexberry.uml.sequencediagramObject', {
  attrs: {
    rect: { 'width': 40, 'height': 40 },
    '.flexberry-uml-header-rect': { 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
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

  // Minimum height.
  minHeight: 17,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',

    '<rect class="flexberry-uml-header-rect"/>',
    '<text class="flexberry-uml-header-text"/>',

    '</g>',
    '</g>'
  ].join(''),

  initialize: function () {
    BaseObject.prototype.initialize.apply(this, arguments);
    this.on('change:name', function() {
      this.updateRectangles();
    }, this);
  },

  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});

joint.shapes.flexberry.uml.sequencediagramObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateRectangles: function (resizedWidth, resizedHeight) {
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();

    let newHeight = Math.max( resizedHeight || oldSize.height, minHeight)
    let newWidth = Math.max( resizedWidth || oldSize.width, minWidth)

    let $box = this.$box;
    let inputs =  $box.find('.class-name-input');
    let $buffer = $box.find('.input-buffer');

    inputs.each(function() {
      let $input = $(this);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + 1);
      $input[0].style.marginLeft = -$input.width()/2 + 'px';
    });

    this.model.resize(newWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }

    let paramsBox = this.$box.find('.params-input');
    paramsBox.css({
      left: newWidth/2,
      top: newHeight + 10,
      position: 'absolute'
    });
  },
});