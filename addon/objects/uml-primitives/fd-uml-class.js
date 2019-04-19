/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import $ from 'jquery';
import { isBlank } from '@ember/utils';
import { isArray } from '@ember/array';

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
  name: computed.alias('primitive.Name.Text', {
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
    Stereotype of the class.

    @property stereotype
    @type String
  */
  stereotype: computed('primitive.StereotypeTxt.Text', {
    get() {
      return this.get('primitive.StereotypeTxt.Text');
    },
    set(key, value) {
      let stereotypeTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.StereotypeTxt.Text', stereotypeTxt);
      return value;
    },
  }),

  /**
    Indicates that the class is in a collapsed state.

    @property collapsed
    @type Boolean
  */
  collapsed: computed.alias('primitive.Folded'),

  /**
    List of attributes of the class.

    @property attributes
    @type Array
  */
  attributes: computed('primitive.AttributesTxt.Text', {
    get() {
      return this.get('primitive.AttributesTxt.Text').split('\n');
    },
    set(key, value) {
      let attributesTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.AttributesTxt.Text', attributesTxt);
      return value;
    },
  }),

  /**
    List of methods of the class.

    @property methods
    @type Array
  */

  methods: computed('primitive.MethodsTxt.Text', {
    get() {
      return this.get('primitive.MethodsTxt.Text').split('\n');
    },
    set(key, value) {
      let methodsTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.MethodsTxt.Text', methodsTxt);
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

  objectModel: null,

  attrs: {
    rect: { 'width': 200 },

    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0 },
    '.flexberry-uml-body-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0 },
    '.flexberry-uml-footer-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0 },
  },

  name: '',
  attributes: [],
  methods: [],

  // Inputs padding by X.
  widthPadding: 15,

  // Inputs bottom padding by Y.
  heightBottomPadding: 4,
}, {
  markup: [
    '<g class="rotatable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>'
  ].join(''),

  initialize() {
    this.on('change:name change:stereotype change:attributes change:methods', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.on('change:size', function(element, newSize) {
      let objectModel = this.get('objectModel');
      if (objectModel) {
        objectModel.set('height', newSize.height);
        objectModel.set('width', newSize.width);
        this.trigger('uml-update');
      }
    }, this);

    this.on('change:position', function(element, newPosition) {
      let objectModel = this.get('objectModel');
      if (objectModel) {
        objectModel.set('x', newPosition.x);
        objectModel.set('y', newPosition.y);
        this.trigger('uml-update');
      }
    }, this);

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getClassName() {
    return this.get('name');
  },

  getRectangles() {
    return [
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
          let $input = $(this);
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
    rects.forEach(function(rect) {
      rect.element.attr('.flexberry-uml-' + rect.type + '-rect/width', newWidth);
    });

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
    '</g>'
  ].join(''),

  getRectangles() {
    return [
      { type: 'header', text: this.getClassName(), element: this }
    ];
  },
});

joint.shapes.flexberry.uml.ClassView = joint.dia.ElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="class-stereotype-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="methods-input footer-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    this.$box = $(this.template);
    this.model.inputElements = this.$box;

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('.attributes-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.methods-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.class-name-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.attributes-input').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('attributes', rows);
    }.bind(this));

    this.$box.find('.methods-input').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('methods', rows);
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('name', textareaText);
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('focus', function(evt) {
      let stereotype = this.normalizeStereotype($(evt.target).val());
      this.$box.find('.class-stereotype-input').val(stereotype.slice(1, -1));
      this.model.updateRectangles();
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('blur', function(evt) {
      let stereotypeText = $(evt.target).val();
      let stereotype = this.normalizeStereotype(stereotypeText);
      let rows = stereotypeText.split(/[\n\r|\r|\n]/);
      let $stereotypeInput = this.$box.find('.class-stereotype-input');
      $stereotypeInput.val(stereotype);
      $stereotypeInput.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('stereotype', stereotype.slice(1, -1));
      this.model.updateRectangles();
    }.bind(this));

    let classNameInput = this.$box.find('.class-name-input');
    let classStereotypeInput = this.$box.find('.class-stereotype-input');
    let attributesInput = this.$box.find('.attributes-input');
    let methodsInput = this.$box.find('.methods-input');
    classNameInput.prop('rows', this.model.get('name').split(/[\n\r|\r|\n]/).length || 1);
    classNameInput.val(this.model.get('name'));
    classStereotypeInput.prop('rows', this.model.get('stereotype').split(/[\n\r|\r|\n]/).length || 1);
    classStereotypeInput.val(this.model.get('stereotype'));

    attributesInput.prop('rows', this.model.get('attributes').length || 1);
    attributesInput.val(this.model.get('attributes').join('\n'));
    methodsInput.prop('rows', this.model.get('methods').length || 1);
    methodsInput.val(this.model.get('methods').join('\n'));

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);
  },

  render: function() {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function() {
      this.$box.find('input, textarea').blur();
    }, this);
    this.updateBox();
    this.model.updateRectangles();
    return this;
  },

  updateBox: function() {
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

  normalizeStereotype(stereotype) {
    stereotype = stereotype.replace(new RegExp(`${String.fromCharCode(171)}|${String.fromCharCode(187)}`, 'g'), '');
    if (!isBlank(stereotype)) {
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

joint.shapes.flexberry.uml.ClassCollapsedView = joint.shapes.flexberry.uml.ClassView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="class-stereotype-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
});
