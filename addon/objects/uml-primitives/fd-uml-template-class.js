/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import $ from 'jquery';
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
  params: computed('primitive.TemplateTxt.Text', {
    get() {
      return this.get('primitive.TemplateTxt.Text').split('\n');
    },
    set(key, value) {
      let paramsTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.TemplateTxt.Text', paramsTxt);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
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
    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0, 'mask': 'url(#custom-mask)' },
    '.flexberry-uml-params-rect': {
      'stroke': 'black', 'stroke-width': 1,
      'stroke-dasharray': '7 2',
      'fill': '#ffffff',
      'fill-opacity': 0
    },

    '.view-rect': { 'x': -1, 'y': -1, 'fill': 'white' },
    '.not-view-rect': { 'x': -1, 'y': -1, 'fill': 'black' }
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<defs>',
    '<mask id="custom-mask">',
    '<rect class="view-rect"/>',
    '<rect class="not-view-rect"/>',
    '</mask>',
    '</defs>',
    '<rect class="flexberry-uml-header-rect"/>',
    '<rect class="flexberry-uml-params-rect"/>',
    '<rect class="flexberry-uml-body-rect"/>',
    '<rect class="flexberry-uml-footer-rect"/>',
    '</g>'
  ].join(''),

  getRectangles() {
    return [
      { type: 'params', element: this },
      { type: 'header', element: this },
      { type: 'body', element: this },
      { type: 'footer', element: this }
    ];
  },
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
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.params-input').on('change', function (evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('params', textareaText);
    }.bind(this));

    let objectModel = this.model.get('objectModel');
    let paramsInput = this.$box.find('.params-input');
    paramsInput.prop('rows', objectModel.get('params').length || 1);
    paramsInput.val(objectModel.get('params').join('\n'));
    this.updateRectangles();
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

  render: function() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.render.apply(this, arguments);

    let mask = document.getElementById('custom-mask');
    let viewMaskId = $(mask).children('.view-rect').attr('id');
    let maskId = 'mask_tc_' + viewMaskId;
    mask.setAttribute('id', maskId);
    let attrs = this.model.get('attrs');
    attrs['.flexberry-uml-header-rect'].mask = 'url(#' + maskId + ')';
    this.updateRectangles();
    this.update();

    return this;
  },

  getButtons() {
    let buttons = joint.shapes.flexberry.uml.ClassView.prototype.getButtons.apply(this, arguments);
    let openEditFormButton = buttons.findBy('name', 'open-edit-form-button');
    buttons.removeObject(openEditFormButton);

    return buttons;
  },

  updateRectangles(resizedWidth, resizedHeight) {
    let rects = this.model.getRectangles();
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    let paramHeight = 0;
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();
    rects.forEach(function(rect, index, array) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect') && rect.element.inputElements) {
        let rectHeight = 0;
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        let inputsDiv = inputs[0].parentElement;
        if (! inputsDiv.parentElement || ! inputsDiv.parentElement.className.includes('joint-paper')) {
          let jointPaper = $('.joint-paper')[0];
          jointPaper.appendChild(inputsDiv);
        }
        let $buffer = rect.element.inputElements.find('.input-buffer');
        inputs.each(function() {
          let $input = $(this);
          $buffer.css('font-weight', $input.css('font-weight'));
          $buffer.text($input.val());
          $input.width($buffer.width() + 1);
          if (rect.type === 'params') {
            paramHeight = $input.height() + 4;
            rect.element.attr('.flexberry-uml-params-rect/width', $input.width() + 20);
            rect.element.attr('.not-view-rect/width', $input.width() + 20);
            rect.element.attr('.not-view-rect/height', paramHeight);
          } else if ($input.width() > newWidth) {
            newWidth = $input.width();
          }

          rectHeight += $input.height();
        });

        rectHeight += rect.element.get('heightBottomPadding') || 0;
        newHeight += rectHeight;
        if (array.length === index + 1) {
          this.set('inputHeight', newHeight);
          rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', Math.max((resizedHeight || oldSize.height) - offsetY, minHeight - offsetY, rectHeight));
        } else {
          rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);
        }

        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this.model);

    newWidth += (this.model.get('widthPadding') || 0) * 2;
    rects.forEach(function(rect) {
      let templateWidth = Math.max(newWidth, resizedWidth || oldSize.width, minWidth);
      if (rect.type === 'params') {
        rect.element.attr('.flexberry-uml-params-rect/transform', 'translate(' + (templateWidth - 10) + ',15)');
        rect.element.attr('.not-view-rect/transform', 'translate(' + (templateWidth - 10) + ',' + (15 - paramHeight) + ')');
      } else {
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', templateWidth);
//         rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
      }
    });

    newWidth = Math.max(newWidth, resizedWidth || oldSize.width, minWidth);
    this.model.attr('.view-rect/width', newWidth + 2);
    this.model.attr('.view-rect/height', newHeight + 2);

    //this.model.resize(newWidth, newHeight);
    this.model.resize(newWidth, Math.max(newHeight, resizedHeight || oldSize.height, minHeight));

    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  },

//   getSizeChangers() {
//     return A();
//   }
});
