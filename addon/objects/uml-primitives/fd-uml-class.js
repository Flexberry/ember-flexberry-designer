/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a class on the UML diagram.

  @class FdUmlClass
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
    Stereotype of the class.

    @property stereotype
    @type String
  */
  stereotype: Ember.computed.alias('primitive.StereotypeTxt.Text'),

  /**
    Indicates that the class is in a collapsed state.

    @property collapsed
    @type Boolean
  */
  collapsed: Ember.computed.alias('primitive.Folded'),

  /**
    List of attributes of the class.

    @property attributes
    @type Array
  */
  attributes: Ember.computed('primitive.AttributesTxt.Text', function() {
    return this.get('primitive.AttributesTxt.Text').split('\n');
  }),

  /**
    List of methods of the class.

    @property methods
    @type Array
  */
  methods: Ember.computed('primitive.MethodsTxt.Text', function() {
    return this.get('primitive.MethodsTxt.Text').split('\n');
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'stereotype', 'size', 'position', 'methods', 'attributes');
    if (this.get('collapsed')) {
      return new ClassCollapsed(properties);
    }

    return new Class(properties);

  },
});

/**
  Defines the JointJS element, which represents the UML base class in the diagram.

  @for FdUmlClass
  @class BaseClass
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let BaseClass = joint.shapes.basic.Generic.define('flexberry.uml.BaseClass', {
  attrs: {
    rect: { 'width': 200 },

    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.flexberry-uml-body-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.flexberry-uml-footer-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'fill': 'black',
      'fontSize': 12,
      'font-family': 'Arial'
    },
    '.flexberry-uml-body-text': {
      'ref': '.flexberry-uml-body-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    },
    '.flexberry-uml-footer-text': {
      'ref': '.flexberry-uml-footer-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    }
  },

  name: [],
  attributes: [],
  methods: [],
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>',
    '<text class="flexberry-uml-body-text"/><text class="flexberry-uml-footer-text"/>',
    '</g>'
  ].join(''),

  initialize() {

    this.on('change:name change:attributes change:methods', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getClassName() {
    return this.get('name');
  },

  updateRectangles() {
    let rects = [
        { type: 'header', text: this.getClassName(), element: this },
        { type: 'body', text: this.get('attributes'), element: this },
        { type: 'footer', text: this.get('methods'), element: this }
    ];

    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    rects.forEach(function(rect) {
      if (this.markup.includes('flexberry-uml-' + rect.type + '-rect')) {

        let lines = Array.isArray(rect.text) ? rect.text : [rect.text];

        let maxStringChars = 0;
        lines.forEach(function(line) {
          if (line.length > maxStringChars) {
            maxStringChars = line.length;
          }
        });

        let hightStep = rect.element.attr('.flexberry-uml-header-text/fontSize');
        let rectHeight = lines.length * hightStep + 10;

        let widthStep = rect.element.attr('.flexberry-uml-header-text/fontSize') / 1.5;
        let rectWidth = maxStringChars * widthStep  + 10;

        newHeight += rectHeight;
        newWidth = newWidth > rectWidth ? newWidth : rectWidth;
        rect.element.attr('.flexberry-uml-' + rect.type + '-text/text', lines.join('\n'));
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/height', rectHeight);
        rect.element.attr('.flexberry-uml-' + rect.type + '-rect/transform', 'translate(0,' + offsetY + ')');

        offsetY += rectHeight;
      }
    }, this);

    newWidth = this.attributes.size.width > 1 ? this.attributes.size.width : newWidth;
    this.resize(newWidth, newHeight);
  }
});

/**
  Defines the JointJS element, which represents the UML class in the diagram.

  @for FdUmlClass
  @class Class
  @extends flexberry.uml.BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let Class = BaseClass.define('flexberry.uml.Class', {
  attrs: {
    '.flexberry-uml-header-text': { 'font-weight': 'bold' },
    '.flexberry-uml-header-text tspan[x]': { 'font-weight': 'normal' },
  },

  stereotype: '',
}, {
  getClassName() {
    return [this.get('name'), this.get('stereotype')];
  },
});

/**
  Defines the JointJS element, which represents the UML class in collapsed state.

  @for FdUmlClass
  @class ClassCollapsed
  @extends flexberry.uml.Class
  @namespace flexberry.uml
  @constructor
*/
export let ClassCollapsed = Class.define('flexberry.uml.ClassCollapsed', {}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberry.uml.ClassView = joint.dia.ElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<input type="text" class="class-name-input" value="" />',
    '<input type="text" class="class-stereotype-input" value="" />',
    '<textarea class="attributes-input" value="" rows="2"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  inputSelectors: ['.class-name-input', '.class-stereotype-input', '.attributes-input'],

  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = Ember.$(this.template);

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('input, textarea').on('input', function() {
      this.updateInputWidth();
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function(evt) {
      this.model.set('name', Ember.$(evt.target).val());
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('change', function(evt) {
      let stereotype = this.normalizeStereotype(Ember.$(evt.target).val());
      this.$box.find('.class-stereotype-input').val(stereotype);
      this.model.set('stereotype', stereotype.slice(1, -1));
    }.bind(this));

    this.$box.find('.class-name-input').val(this.model.get('name'));
    this.$box.find('.class-stereotype-input').val(this.normalizeStereotype(this.model.get('stereotype')));

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);

    this.updateBox();
  },
  render: function() {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.updateBox();
    return this;
  },

  updateBox: function() {
    this.updateInputWidth();

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

  removeBox: function() {
    this.$box.remove();
  },

  updateInputWidth: function() {
    let $buffer = this.$box.find('.input-buffer');
    let maxWidth = 0;
    this.inputSelectors.forEach((selector) => {
      let $input = this.$box.find(selector);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + 5);
      if ($input.width() > maxWidth) {
        maxWidth = $input.width();
      }
    }, this);

    let oldSize = this.model.get('size');
    this.model.set('size', { height: oldSize.height, width: maxWidth + 14 });
  },

  normalizeStereotype(stereotype) {
    if (stereotype.length > 0) {
      if (stereotype[0] !== String.fromCharCode(171)) {
        stereotype = String.fromCharCode(171) + stereotype;
      }

      if (stereotype[stereotype.length - 1] !== String.fromCharCode(187)) {
        stereotype = stereotype + String.fromCharCode(187);
      }
    }

    return stereotype;
  }
});

