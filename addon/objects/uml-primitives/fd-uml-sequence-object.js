/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import $ from 'jquery';
import joint from 'npm:jointjs';

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

  // Minimum width.
  minWidth: 40,

  // Minimum height.
  minHeight: 40,

  // Inputs padding by Y.
  heightPadding: 10,

  // Minimum line lenght.
  minLineLength: 10,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<g class="flexberry-uml-header-rect">',
    '<rect class="transparent" x="0" y="0" width="125" height="110" fill="transparent" stroke="transparent"/>',
    '<rect class="header" width="125" height="40" />',
    '<path class="line" d="M 63 40 63 110" />',
    '</g>',
    '</g>',
    '</g>'
  ].join(''),

  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});

export let SequencediagramObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  updateRectangles: function (resizedWidth, resizedHeight) {
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const widthPadding = this.model.attributes.widthPadding;
    const heightPadding = this.model.attributes.heightPadding;
    const minLineLength = this.model.attributes.minLineLength;
    const oldSize = this.model.size();

    let newHeight = Math.max( resizedHeight || oldSize.height, minHeight)
    let newWidth = Math.max( resizedWidth || oldSize.width, minWidth)

    let inputs =  this.$box.find('.class-name-input');
    let $buffer = this.$box.find('.input-buffer');

    inputs.each(function() {
      let $input = $(this);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + widthPadding);
      
      if ($input.width() > newWidth) {
        newWidth = $input.width();
      }
    });

    const rect = this.$el.find('.flexberry-uml-header-rect rect.header')[0];
    const path = this.$el.find('.flexberry-uml-header-rect path.line')[0];

    if (!rect || !path) {
      this.model.resize(newWidth, newHeight);
      if (this.model.get('highlighted')) {
        this.unhighlight();
        this.highlight();
      }
      return;
    }

    const pathBBox = path.getBBox();
    const rectBBox = rect.getBBox();

    const rectHeight = inputs[0].offsetHeight + 2 * heightPadding;
    newHeight = Math.max(newHeight, rectHeight + minLineLength);
    const transformX = newWidth / rectBBox.width;
    const transformY = newHeight / (rectBBox.height + pathBBox.height);
    rect.setAttribute('height', rectHeight / transformY);

    const scalable = this.$el.find('.scalable')[0];
    const transform = scalable.transform.baseVal.consolidate().matrix;
    transform.a = transformX;
    transform.d = transformY;

    inputs.css({
      top: (rectHeight - inputs[0].offsetHeight) / 2,
      left: (newWidth - inputs[0].offsetWidth) / 2,
      position: 'absolute'
    });

    const d = path.getAttribute('d');
    path.setAttribute('d', d.replace(/(M)\s(-?\d+(?:\.\d+)?)\s(-?\d+(?:\.\d+)?)/, (_, command, x) => `${command} ${x} ${rectHeight / transformY}`));
 
    this.model.resize(newWidth, newHeight);
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  },
});

joint.shapes.flexberry.uml.sequencediagramObjectView = SequencediagramObjectView;