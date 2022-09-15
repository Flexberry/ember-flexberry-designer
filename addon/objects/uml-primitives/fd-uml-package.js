/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import $ from 'jquery';
import joint from 'npm:jointjs';

import { BaseClass } from './fd-uml-class';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a package on the UML diagram.

  @class FdUmlPropertyObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of a package.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      let nameTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', nameTxt);
      return value;
    },
  }),

  /**
    Package's attributes.

    @property attributes
    @type Array
  */
  attributes: computed('primitive.Prop.Text', {
    get() {
      return this.get('primitive.Prop.Text').split('\n');
    },
    set(key, value) {
      let attributesTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Prop.Text', attributesTxt);
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
    return new Package(properties);

  },
});

/**
  Defines the JointJS object, which represents a Package object on the UML diagram.

  @for FdUmlPackage
  @class Package
  @extends BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let Package = BaseClass.define('flexberry.uml.Package', {
  // Minimum height.
  minHeight: 34,
}, {
  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
        tagName: 'g',
        attributes: {'transform': 'scale(0.8,1)'},
        children: [{
          tagName: 'rect',
          className: 'flexberry-uml-header-rect'
        }]
    }, {
        tagName: 'rect',
        className: 'flexberry-uml-body-rect'
    }]
  }],

  getRectangles() {
    return [
      { type: 'header', element: this },
      { type: 'body', element: this },
    ];
  },
});

joint.shapes.flexberry.uml.PackageView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="package-header-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    this.$box.find('.package-header-input').on('change', function (evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      this.triggerHistoryStep('name', textareaText);
      objectModel.set('name', textareaText);
    }.bind(this));

    this.$box.find('.package-header-input').on('input', function (evt) {
      this.setOldSize();
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));
  },

  setInputValues: function() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.setInputValues.apply(this, arguments);
    const objectModel = this.model.get('objectModel');
    let upperInput = this.$box.find('.package-header-input');
    upperInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    upperInput.val(objectModel.get('name'));
  },

  updateRectangles: function (resizedWidth, resizedHeight) {
    let rects = this.model.getRectangles();
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    const minWidth = this.model.attributes.minWidth;
    const minHeight = this.model.attributes.minHeight;
    const oldSize = this.model.size();
    rects.forEach(function(rect, index, array) {
      this.markup[0].children.forEach((child) => {
        if ((child.className == 'flexberry-uml-' + rect.type + '-rect') && (rect.element.inputElements)) {
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
            if (rect.type === 'header') {
              newWidth = $input.width() / 0.8;
            }

            if ($input.width() > newWidth) {
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
      });
    }, this.model);

    newWidth += (this.model.get('widthPadding') || 0) * 2;
    this.model.set('inputWidth', newWidth);
    rects.forEach(function(rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', Math.max(newWidth, resizedWidth || oldSize.width, minWidth));
    });

    this.model.resize(Math.max(newWidth, resizedWidth || oldSize.width, minWidth), Math.max(newHeight, resizedHeight || oldSize.height, minHeight));
    if (this.model.get('highlighted')) {
      this.unhighlight();
      this.highlight();
    }
  }

});
