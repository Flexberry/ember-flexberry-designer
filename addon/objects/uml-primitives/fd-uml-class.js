/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import $ from 'jquery';
import { isBlank, isNone } from '@ember/utils';
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
    Class is created.

    @property isCreated
    @type Boolean
  */
  isCreated: false,

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
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
    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0 },
    '.flexberry-uml-body-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0 },
    '.flexberry-uml-footer-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff', 'fill-opacity': 0 },
  },

  // Inputs padding by X.
  widthPadding: 17,

  // Inputs bottom padding by Y.
  heightBottomPadding: 4,

  // Indicates when element is highlighted.
  highlighted: false,

  // Minimum height.
  minHeight: 64,

  // Minimum width
  minWidth: 80,

  // Height by inputs.
  inputHeight: 0,

  // Width by inputs.
  inputWidth: 0,
}, {
  markup: [
    '<g class="rotatable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>'
  ].join(''),

  initialize() {
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

  getRectangles() {
    let objectModel = this.get('objectModel');

    return objectModel.get('collapsed') ?
    [
      { type: 'header', element: this }
    ] :
    [
      { type: 'header', element: this },
      { type: 'body',  element: this },
      { type: 'footer',  element: this }
    ];
  }
});
joint.util.setByPath(joint.shapes, 'flexberry.uml.BaseClass', BaseClass, '.');


/**
  Defines the JointJS element, which represents the UML class in the diagram.

  @for FdUmlClass
  @class Class
  @extends flexberry.uml.BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let Class = BaseClass.define('flexberry.uml.Class', {});
joint.util.setByPath(joint.shapes, 'flexberry.uml.Class', Class, '.');

joint.util.setByPath(joint.shapes, 'flexberry.uml.BaseClass', BaseClass, '.');

joint.shapes.flexberry.uml.ClassView = joint.shapes.flexberry.uml.PrimitiveElementView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="class-stereotype-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<textarea class="attributes-input body-input" value="" rows="1" wrap="off" style="visibility: visible"></textarea>',
    '<textarea class="methods-input footer-input" value="" rows="1" wrap="off" style="visibility: visible"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function() {
    joint.shapes.flexberry.uml.PrimitiveElementView.prototype.initialize.apply(this, arguments);

    let _this = this;
    let objectModel = this.model.get('objectModel');
    this.model.set('minHeight', objectModel.get('collapsed') ? 34 : 64);

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
      _this.highlight();
    });

    this.$box.find('.attributes-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.methods-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.class-name-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.attributes-input').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('attributes', rows);
      this.paper.trigger('updaterepobj', objectModel, 'attributesStr', textareaText);
    }.bind(this));

    this.$box.find('.methods-input').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('methods', rows);
      this.paper.trigger('updaterepobj', objectModel, 'methodsStr', textareaText);
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('name', textareaText);

      this.paper.trigger('checkexistelements', objectModel, this);
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('focus', function(evt) {
      let stereotype = this.normalizeStereotype($(evt.target).val());
      this.$box.find('.class-stereotype-input').val(stereotype.slice(1, -1));
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.class-name-input').on('focus', function(evt) {
      let $textarea = $(evt.currentTarget);
      let objectModel = this.model.get('objectModel');
      if (objectModel.get('primitive.$type') === 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin') {
        let isCreated = objectModel.get('isCreated');
        $textarea.attr('readonly', !isCreated);
      }
    }.bind(this));

    this.$box.find('.class-stereotype-input').on('blur', function(evt) {
      let stereotypeText = $(evt.target).val();
      let stereotype = this.normalizeStereotype(stereotypeText);
      let rows = stereotypeText.split(/[\n\r|\r|\n]/);
      let $stereotypeInput = this.$box.find('.class-stereotype-input');
      $stereotypeInput.val(stereotype);
      $stereotypeInput.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('stereotype', stereotype);
      this.paper.trigger('updaterepobj', objectModel, 'stereotype', stereotype);
      this.updateRectangles();
    }.bind(this));

    this.updateInputValue();

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);

    //Hide or show body or footer rectangle depending collapse value
    this.applyDisplayFromCollapseValue();
  },

  render: function() {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function() {
      this.$box.find('input:focus, textarea:focus').blur();
    }, this);

    this.updateBox();
    const objectModel = this.model.get('objectModel');
    this.paper.trigger('getrepobjvalues', objectModel, this);

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

  updateRectangles(resizedWidth, resizedHeight) {
    let rects = this.model.getRectangles();
    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
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
  },

  updateInputValue() {
    let objectModel = this.model.get('objectModel');
    let classNameInput = this.$box.find('.class-name-input');
    let classStereotypeInput = this.$box.find('.class-stereotype-input');
    let attributesInput = this.$box.find('.attributes-input');
    let methodsInput = this.$box.find('.methods-input');

    classNameInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    classNameInput.val(objectModel.get('name'));
    classStereotypeInput.prop('rows', objectModel.get('stereotype').split(/[\n\r|\r|\n]/).length || 1);
    classStereotypeInput.val(this.normalizeStereotype(objectModel.get('stereotype')));

    attributesInput.prop('rows', objectModel.get('attributes').length || 1);
    attributesInput.val(objectModel.get('attributes').join('\n'));
    methodsInput.prop('rows', objectModel.get('methods').length || 1);
    methodsInput.val(objectModel.get('methods').join('\n'));
    this.updateRectangles();
  },

  getButtons() {
    let buttons = joint.shapes.flexberry.uml.PrimitiveElementView.prototype.getButtons.apply(this, arguments);
    let objectModel = this.model.get('objectModel');
    let collapsed = objectModel.get('collapsed');

    buttons.pushObject({
      name: 'collapse-button',
      text: collapsed ? '&#xf065' : '&#xf066',
      handler: this.collapseElementView.bind(this),
      attrs: {
        'element': {'ref-x': 0,'ref-y': 0, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff', 'font-size': 10, 'text-anchor': 'middle', x: 0, y: 3, 'font-family': 'Icons' },
      }
    });

    if (!isNone(objectModel.get('repositoryObject'))) {
      buttons.pushObject({
        name: 'open-edit-form-button',
        text: '&#xf013',
        handler: this.openEditForm.bind(this),
        attrs: {
          'element': { 'ref-dx': -28, 'ref-y': 0, 'ref': '.joint-highlight-stroke' },
          'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
          'text': { fill: '#ffffff', x: 0, y: 3, 'font-size': 10, 'text-anchor': 'middle', 'font-family': 'Icons' },
        }
      });
    }

    return buttons;
  },

  collapseElementView(e) {
    e.stopPropagation();
    let objectModel = this.model.get('objectModel');
    let collapsedToggle = !objectModel.get('collapsed');
    objectModel.set('collapsed', collapsedToggle);
    this.model.set('minHeight', collapsedToggle ? 34 : 64);
    this.setColors();
    this.applyDisplayFromCollapseValue();
  },

  openEditForm(e) {
    e.stopPropagation();
    this.paper.trigger('element:openeditform', this);
  },

  applyDisplayFromCollapseValue() {
    let objectModel = this.model.get('objectModel');
    let collapsed = objectModel.get('collapsed');

    let displayValue = collapsed ? 'none' : 'table-cell';
    this.model.attr('.flexberry-uml-body-rect/display', displayValue);
    this.model.attr('.flexberry-uml-footer-rect/display', displayValue);

    let styleVisibilityValue = collapsed ? 'hidden' : 'visible';
    this.$box.find('.attributes-input').css('visibility', styleVisibilityValue);
    this.$box.find('.methods-input').css('visibility', styleVisibilityValue);

    const size = collapsed ? this.model.attr('.flexberry-uml-header-rect') : this.model.size();
    this.updateBox();
    this.updateRectangles(size.width, size.height);
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
