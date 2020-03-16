/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import FdUmlElement from './fd-uml-element';
import joint from 'npm:jointjs';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a UseCase on the UML diagram.

  @class FdUmlUseCase
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new UseCase(properties);
  },
});

/**
  Defines the JointJS object, which represents a 'UseCase' object in the UML diagram.

  @for FdUmlUseCase
  @class UseCase
  @extends flexberry.uml.BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let UseCase = BaseObject.define('flexberry.uml.UseCase', {
  attrs: {
    rect: { 'width': 400 },
    '.flexberry-uml-header-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

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
  // markup: [
  //   '<g class="rotatable">',
  //   '<rect class="flexberry-uml-header-rect"/>',
  //   '<text class="flexberry-uml-header-text"/>',
  //   '</g>'
  // ].join(''),

  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
      tagName: 'rect',
      className: 'flexberry-uml-header-rect'
    }, {
      tagName: 'text',
      className: 'flexberry-uml-header-text'
    }]
  }],

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

joint.shapes.flexberry.uml.UseCaseView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    this.updateRectangles();
  },

  updateRectangles: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.updateRectangles.apply(this, arguments);
    let paramsBox = this.$box.find('.header-input');
    let bbox = this.model.getBBox();
    
    paramsBox.css({
      top: (bbox.height - paramsBox[0].offsetHeight)/2,
      left: (bbox.width - paramsBox[0].offsetWidth)/2,
      position: 'absolute'
    });
  },

  getUsecaseName: function() {
    return this.model.attributes.objectModel.get('name');
  },
});
