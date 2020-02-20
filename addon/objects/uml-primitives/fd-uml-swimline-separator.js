/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';
import $ from 'jquery';
import { BaseObject } from './fd-uml-baseobject';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Swimline Separator an activity diagram

  @class FdUmlSwimlineSeparator
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    Text to show.

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
    Type of primitive.

    @property type
    @type String
  */
  type: computed.alias('primitive.$type'),

  /**
    Parent primitive ID.

    @property source
    @type Object
  */
  parentPrimitive: computed('primitive.ConnectedPrimitive.$ref', {
    get() {
      let ret = { id: this.get('primitive.ConnectedPrimitive.$ref') };
      return ret;
    },
    set(key, value) {
      this.set('primitive.ConnectedPrimitive.$ref', value.id);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position', 'parentPrimitive');
    properties.objectModel = this;
    let type = this.get('type');
    if (type === 'STORMCASE.UML.ad.ConcurrentStateV, UMLAD') {
      return new SwimlineSeparatorV(properties);
    } else {
      return new SwimlineSeparatorH(properties);
    }

  },
});

/**
  Defines the JointJS object, which represents a horisontal 'SwimlineSeparator' object in the UML diagram.

  @for FdUmlStartState
  @class SwimlineSeparatorH
  @extends joint.dia.Element
  @namespace flexberry.uml
  @constructor
*/
export let SwimlineSeparatorH = BaseObject.define('flexberry.uml.SwimlineSeparatorH', {

  // [minX, maxX, minY, maxY]
  ghostMoveBorder: A(),

  attrs: {
    '.flexberry-uml-header-poliline': {
      'refPoints': '0,0 10,0',
      'stroke': 'black',
      'stroke-width': 3,
      'stroke-dasharray': '7 2'
     },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<polyline class = "flexberry-uml-header-poliline"/>',
    '</g>',
  ].join(''),

  setParent: function (parentObject) {
    this.set('parentObject', parentObject);
    let objectModel = this.get('objectModel');
    objectModel.set('parentPrimitive', { id: parentObject.id });

    this.set('position', { x: parentObject.get('position').x , y: this.get('position').y});
    this.set('size', { width: parentObject.get('size').width, height: this.get('size').height });

    let positionShiftY = this.get('position').y - parentObject.get('position').y;
    this.set('positionShiftY', positionShiftY);
    
    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(parentObject.get('position'), parentObject.get('size').height)); 
    
    this.on('change:position', function(element, newPosition) {
      positionShiftY = newPosition.y - parentObject.get('position').y;
      this.set('positionShiftY', positionShiftY);
    });

    parentObject.on('change:position', this.onParentPositionChange, this);
    parentObject.on('change:size', this.onParentSizeChange, this);
  },

  onParentPositionChange(element, newPosition) {
    this.set('position', { x: newPosition.x, y: newPosition.y + this.get('positionShiftY') });
    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(newPosition, element.get('size').height));
  },

  onParentSizeChange(element, newSize) {
    let parentObject = this.get('parentObject');
    this.set('size', { width: newSize.width, height: this.get('size').height });
    if ( (parentObject.get('position').y + parentObject.get('size').height)  < this.get('position').y) {
      this.set('position', { x: this.get('position').x, y: parentObject.get('position').y + parentObject.get('size').height / 2});
    }

    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(element.get('position'), newSize.height));
  },

  calculateGhostMoveBorder: function (parentPosition, parentHeight) {
    let ghostMoveBorder = [parentPosition.x, parentPosition.x, parentPosition.y, parentPosition.y+ parentHeight];
    return ghostMoveBorder;
  },

  unsubscribeParentChanges: function () {
    this.get('parentObject').off('change:position', this.onParentPositionChange, this);
    this.get('parentObject').off('change:size', this.onParentSizeChange, this);
  }
});

/**
  Defines the JointJS object, which represents a vertical 'SwimlineSeparator' object in the UML diagram.

  @for FdUmlStartState
  @class SwimlineSeparatorV
  @extends SwimlineSeparatorH
  @namespace flexberry.uml
  @constructor
*/
export let SwimlineSeparatorV = SwimlineSeparatorH.define('flexberry.uml.SwimlineSeparatorV', {
  attrs: {
    '.flexberry-uml-header-poliline': {
      'refPoints': '0,0 0,10',
      'stroke': 'black',
      'stroke-width': 3,
      'stroke-dasharray': '7 2'
     },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<polyline class = "flexberry-uml-header-poliline"/>',
    '</g>',
  ].join(''),

  setParent: function (parentObject) {
    this.set('parentObject', parentObject);
    let objectModel = this.get('objectModel');
    objectModel.set('parentPrimitive', { id: parentObject.id });

    this.set('position', { x: this.get('position').x , y: parentObject.get('position').y});
    this.set('size', { width: this.get('size').width, height: parentObject.get('size').height });

    let positionShiftX = this.get('position').x - parentObject.get('position').x;
    this.set('positionShiftX', positionShiftX);

    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(parentObject.get('position'), parentObject.get('size').width));

    this.on('change:position', function(element, newPosition) {
      positionShiftX = newPosition.x - parentObject.get('position').x;
      this.set('positionShiftX', positionShiftX);
    });

    parentObject.on('change:position', this.onParentPositionChange, this);
    parentObject.on('change:size', this.onParentSizeChange, this);
  },

  onParentPositionChange(element, newPosition) {
    this.set('position', { x: newPosition.x + this.get('positionShiftX'), y: newPosition.y});
    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(newPosition, element.get('size').width));
  },

  onParentSizeChange(element, newSize) {
    let parentObject = this.get('parentObject');
    this.set('size', { width: this.get('size').width, height: newSize.height });
    if ( (parentObject.get('position').x + parentObject.get('size').width)  < this.get('position').x) {
      this.set('position', { x: parentObject.get('position').x + parentObject.get('size').width / 2, y: this.get('position').y });
    }

    this.set('ghostMoveBorder', this.calculateGhostMoveBorder(element.get('position'), newSize.width));
  },

  calculateGhostMoveBorder: function (parentPosition, parentWidth) {
    let ghostMoveBorder = [parentPosition.x, parentPosition.x + parentWidth, parentPosition.y, parentPosition.y];
    return ghostMoveBorder;
  }
});

joint.shapes.flexberry.uml.SwimlineSeparatorHView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input final-state-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    let objectModel = this.model.get('objectModel');
    let parentPrimitiveId = objectModel.parentPrimitive.id;
    let parentPrimitive = this.options.model.graph.getCell(parentPrimitiveId);

    if (!isNone(parentPrimitive)) {
      this.model.setParent(parentPrimitive);
      parentPrimitive.on('change:size', function() {
        this.updateRectangles()
      }, this);
    }

    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);

    let _this = this;

    // Prevent paper from handling pointerdown.
    this.$box.find('input, textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
      _this.highlight();
    });

    this.$box.find('.class-name-input').on('input', function(evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      this.updateRectangles();
    }.bind(this));

    this.$box.find('.class-name-input').on('change', function (evt) {
      let $textarea = $(evt.currentTarget);
      let textareaText = $textarea.val();
      let rows = textareaText.split(/[\n\r|\r|\n]/);
      $textarea.prop('rows', rows.length);
      let objectModel = this.model.get('objectModel');
      objectModel.set('name', textareaText);
    }.bind(this));

    this.updateInputValue();

    // Update the box position whenever the underlying model changes.
    this.model.on('change', this.updateBox, this);

    // Remove the box when the model gets removed from the graph.
    this.model.on('remove', this.removeBox, this);

    this.options.model.graph.on('remove', this.checkParentExist, this);
  },

  updateInputValue() {
    let objectModel = this.model.get('objectModel');
    let classNameInput = this.$box.find('.class-name-input');

    classNameInput.prop('rows', objectModel.get('name').split(/[\n\r|\r|\n]/).length || 1);
    classNameInput.val(objectModel.get('name'));
  },

  render: function () {
    joint.dia.ElementView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.paper.on('blank:pointerdown link:pointerdown element:pointerdown', function () {
      this.$box.find('input:focus, textarea:focus').blur();
    }, this);

    this.updateBox();
    this.updateRectangles();
    return this;
  },

  updateBox: function () {
    // Set the position and dimension of the box so that it covers the JointJS element.
    let bbox = this.model.getBBox();
    this.$box.css({
      width: bbox.width,
      height: bbox.height,
      left: bbox.x,
      top: bbox.y
    });
  },

  //In updateRectangles update only text sizes, because start/final state not have rectanles
  updateRectangles() {
    let $buffer = this.$box.find('.input-buffer');
    let $input = this.$box.find('.class-name-input');
    $buffer.css('font-weight', $input.css('font-weight'));
    $buffer.text($input.val());    
    $input.width($buffer.width() + 1);

    //shift state text
    let textLength = $input.val().length;
    $input.css({top: -15, left: (this.$box.width() / 2) - textLength*2.5, position:'absolute'});
  },

  setColors() {
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.flexberry-uml-header-poliline/stroke', textColor);
    }
  },

  //In updateRectangles update only text sizes, because start/final state not have rectanles
  checkParentExist(element) {
    let objectModel = this.model.get('objectModel');
    let parentPrimitiveId = objectModel.get('parentPrimitive.id');
    let deletedElementId = element.get('id');

    if (parentPrimitiveId === deletedElementId) {
      this.model.remove();
    }
  },

  removeBox: function () {
    this.options.model.graph.off('remove', this.checkParentExist, this);
    this.model.unsubscribeParentChanges();

    this.$box.remove();
  },

  getSizeChangers() {
    return A();
  }
});

joint.shapes.flexberry.uml.SwimlineSeparatorVView = joint.shapes.flexberry.uml.SwimlineSeparatorHView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input complex-transition-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
   ].join(''),

   updateRectangles() {
    let $buffer = this.$box.find('.input-buffer');
    let $input = this.$box.find('.class-name-input');
    $buffer.css('font-weight', $input.css('font-weight'));
    $buffer.text($input.val());
    $input.width($buffer.width() + 1);

    //shift state text
    $input.css({top: (this.$box.height() / 2), left: 5,  position:'absolute'});
   },
});