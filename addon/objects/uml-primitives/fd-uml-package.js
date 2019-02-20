/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
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
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    Package's attributes.

    @property attributes
    @type String
  */
  attributes: Ember.computed.alias('primitive.Prop.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position', 'attributes');

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
  attrs: {
    '.flexberry-uml-header-text': {
      'text-decoration': 'underline',
      'font-weight': 'normal'
    },
    '.flexberry-uml-body-text': {
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<g transform="scale(0.8,1)"><rect class="flexberry-uml-header-rect" /></g><rect class="flexberry-uml-body-rect"/>',
    '</g>',
    '</g>'
  ].join(''),

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

joint.shapes.flexberry.uml.PackageView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="package-header-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  getRectangles() {
    return [
      { type: 'header', text: this.getObjName(), element: this },
      { type: 'body', text: this.get('attributes'), element: this },
    ];
  },

  initialize: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    this.$box.find('.package-header-input').on('change', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.set('name', textareaText);
    }.bind(this));

    this.$box.find('.package-header-input').on('input', function (evt) {
      let $textarea = Ember.$(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.attributes-input').on('input', function (evt) {
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

    let upperInput = this.$box.find('.package-header-input');
    upperInput.prop('rows', this.model.get('name').split(/[\n\r|\r|\n]/).length || 1);
    upperInput.val(this.model.get('name'));
  }
});
