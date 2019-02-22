/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import { Class } from './fd-uml-class';

import FdUmlClass from './fd-uml-class';

/**
  An object that describes a TemplateClass on the UML diagram.

  @class FdUmlTemplateClass
  @extends FdUmlClass
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

  @for FdUmlTemplateClass
  @class TemplateClass
  @extends Class
  @namespace flexberry.uml
  @constructor
*/
export let TemplateClass = Class.define('flexberry.uml.TemplateClass', {
  attrs: {
    rect: { 'width': 200 },

    '.flexberry-uml-params-rect': {
      'stroke': 'black', 'stroke-width': 1,
      'stroke-dasharray': '7 2',
      'fill': '#ffffff',
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
    '<rect class="flexberry-uml-header-rect"/>',
    '<rect class="flexberry-uml-params-rect"/>',
    '<rect class="flexberry-uml-body-rect"/>',
    '<rect class="flexberry-uml-footer-rect"/>',
    '</g>'
  ].join(''),

  getRectangles() {
    let params = this.get('params');
    let lines = Array.isArray(params) ? params : [params];
    return [
      { type: 'params', text: lines, element: this },
      { type: 'header', text: this.getClassName(), element: this },
      { type: 'body', text: this.get('attributes'), element: this },
      { type: 'footer', text: this.get('methods'), element: this }
    ];
  },

  updateRectangles() {
    let rects = this.getRectangles();
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    rects.forEach(function(rect) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let $buffer = rect.element.inputElements.find('.input-buffer');
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        inputs.each(function() {
          let $input = Ember.$(this);
          $buffer.css('font-weight', $input.css('font-weight'));
          $buffer.text($input.val());
          $input.width($buffer.width() + 1);
          if (rect.type === 'params') {
            rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', $input.width() + 20);
          } else if ($input.width() > newWidth) {
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
    rects.forEach(function(rect) {
      if (rect.type === 'params') {
        rect.element.attr('.flexberry-uml-params-rect/transform', 'translate(' + (newWidth - 10) + ',15)');
      } else {
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
      }
    });

    this.resize(newWidth, newHeight);
  }
});

joint.shapes.flexberry.uml.TemplateClassView = joint.shapes.flexberry.uml.ClassView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="params-input" value="" rows="1" wrap="off"> </textarea>',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="class-stereotype-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="methods-input footer-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function() {
    joint.shapes.flexberry.uml.ClassView.prototype.initialize.apply(this, arguments);
    this.$box.find('.params-input').on('input', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.params-input').on('change', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.set('params', textareaText);
    }.bind(this));

    let paramsInput = this.$box.find('.params-input');
    paramsInput.prop('rows', this.model.get('params').split(/[\n\r|\r|\n]/).length || 1);
    paramsInput.val(this.model.get('params'));
  },

  updateBox: function() {
    // Set the position and dimension of the box so that it covers the JointJS element.
    let bbox = this.model.getBBox();
    let paramsBox = this.$box.find('.params-input');
    this.$box.css({
      width: bbox.width,
      height: bbox.height,
      left: bbox.x,
      top: bbox.y + paramsBox.height() + 4,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });

    paramsBox.css({
      left: bbox.width,
      top: 15 - paramsBox.height(),
      position: 'absolute'
    });
  },
});
