/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an object on the UML diagram.

  @class FdUmlObject
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
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new BaseObject(properties);
  },
});

/**
  Defines the JointJS object, which represents a BaseObject.

  @for FdUmlBaseObject
  @class BaseObject
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let BaseObject = joint.shapes.basic.Generic.define('flexberry.uml.BaseObject', {
  attrs: {
    text: { 'visibility': 'hidden' },

    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'fill': 'black',
      'fontSize': 12,
      'font-family': 'Arial'
    }
  },
  name: [],
  heightPadding: 10,

  // Inputs padding by X.
  widthPadding: 7,

  // Inputs bottom padding by Y.
  heightBottomPadding: 4,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {

    this.on('change:name change:attributes', function () {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getObjName: function () {
    return this.get('name');
  },

  getRectangles() {
    return [
      { type: 'header', text: this.getObjName(), element: this },
      { type: 'body', text: this.get('attributes'), element: this },
    ];
  },

  // Delete this after inserting inputs in all objects.
  updateRectanglesOld: function () {
    let attrs = this.get('attrs');
    let objName = this.getObjName();
    let lines = Array.isArray(objName) ? objName : [objName];
    let maxStringChars = 0;
    lines.forEach(function (line) {
      if (line.length > maxStringChars) {
        maxStringChars = line.length;
      }
    });

    let hightStep = attrs['.flexberry-uml-header-text'].fontSize;
    let rectHeight = lines.length * hightStep + this.get('heightPadding');
    let widthStep = attrs['.flexberry-uml-header-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep + 10;
    attrs['.flexberry-uml-header-text'].text = lines.join('\n');
    attrs['.flexberry-uml-header-rect'].height = rectHeight;
    attrs['.flexberry-uml-header-rect'].width = rectWidth;
  },

  updateRectangles: function () {
    let rects = this.getRectangles();

    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    rects.forEach(function (rect) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let $buffer = rect.element.inputElements.find('.input-buffer');
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        inputs.each(function () {
          let $input = Ember.$(this);
          $buffer.css('font-weight', $input.css('font-weight'));
          $buffer.text($input.val());
          $input.width($buffer.width() + 1);
          if ($input.width() > newWidth) {
            newWidth = $input.width();
          }

          rectHeight += $input.height();
        });

        rectHeight += rect.element.get('heightBottomPadding') || 0;
        newHeight += rectHeight;
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);

        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this);

    newWidth += (this.get('widthPadding') || 0) * 2;
    rects.forEach(function (rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
    });

    this.resize(newWidth, newHeight);
  }
});

joint.shapes.flexberry.uml.BaseObjectView = joint.dia.ElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = Ember.$(this.template);
    this.model.inputElements = this.$box;

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function (evt) {
      evt.stopPropagation();
    });

    this.$box.find('.attributes-input').on('input', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.class-name-input').on('input', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.attributes-input').on('change', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.set('attributes', rows);
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.set('name', textareaText);
    }.bind(this));

    let classNameInput = this.$box.find('.class-name-input');
    let attributesInput = this.$box.find('.attributes-input');
    classNameInput.prop('rows', this.model.get('name').split(/[\n\r|\r|\n]/).length || 1);
    classNameInput.val(this.model.get('name'));

    if (Ember.isPresent(this.model.get('attributes'))) {
      attributesInput.prop('rows', this.model.get('attributes').length || 1);
      if (this.model.get('attributes') instanceof Array) {
        attributesInput.val(this.model.get('attributes').join('\n'));
      } else {
        attributesInput.val(this.model.get('attributes'));
      }
    } else {
      attributesInput.prop('rows', 1);
    }

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);
  },

  render: function () {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function () {
      this.$box.find('input, textarea').blur();
    }, this);
    this.updateBox();
    this.model.updateRectangles();
    return this;
  },

  updateBox: function () {
    // Set the position and dimension of the box so that it covers the JointJS element.
    let bbox = this.model.getBBox();
    this.$box.css({
      width: bbox.width,
      height: bbox.height,
      left: bbox.x,
      top: bbox.y,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  },

  removeBox: function () {
    this.$box.remove();
  },
});
