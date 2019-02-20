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
    '.flexberry-uml-params-rect': {
      'stroke': 'black', 'stroke-width': 1,
      'stroke-dasharray': '7 2',
      'fill': 'white',
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
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-params-rect"/>',
    '<rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>',
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
  }
});

joint.shapes.flexberry.uml.TemplateClassView = joint.shapes.flexberry.uml.ClassView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea type="text" class="params-input" value="" rows="1" wrap="off"> </textarea>',
    '<textarea class="class-name-input header-input class-t" value="" rows="1" wrap="off"></textarea>',
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
  }
});
