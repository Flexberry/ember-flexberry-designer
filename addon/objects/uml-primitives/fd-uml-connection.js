/**
  @module ember-flexberry-designer
*/
import FdUmlBaseLink from './fd-uml-link';
import { Dependency } from './fd-uml-dependency';
import { DescriptionView } from './links-view/fd-description-view';

import { isNone } from '@ember/utils';

import $ from 'jquery';
import joint from 'npm:jointjs';

/**
  An object that defines Connection link on the UML diagram.

  @class FdUmlConnection
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new Connection(properties);
  }
});

/**
  Defines the JointJS link, which represents a Connection in the UML diagram.

  @for FdUmlConnection
  @class FdUmlConnection
  @extends Dependency
  @namespace flexberry.uml
  @constructor
*/
export let Connection = Dependency.define('flexberry.uml.Connection', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});

joint.shapes.flexberry.uml.ConnectionView = DescriptionView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<textarea class="description-input" rows="1"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function() {
    DescriptionView.prototype.initialize.apply(this, arguments);

    // Prevent paper from handling pointerdown.
    this.$box.find('textarea').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('.description-input').on('input', function (evt) {
      this.setRows(evt);
    }.bind(this));

    this.$box.find('.description-input').on('change', function (evt) {
      this.setRows(evt);
    }.bind(this));

    this.setInputValues();
  },

  setRows: function(evt) {
    let $textarea = $(evt.currentTarget);
    let textareaText = $textarea.val();
    let rows = textareaText.split(/[\n\r|\r|\n]/);
    $textarea.prop('rows', rows.length);
  },

  setInputValues: function() {
    const objectModel = this.model.get('objectModel');
    const classNameInput = this.$box.find('.description-input');
    classNameInput.prop('rows', objectModel.get('description').split(/[\n\r|\r|\n]/).length || 1);
  },

  updateInputPosition(index, selector) {
    let position = this.getLabelCoordinates(this.model.label(index).position);
    let textarea = this.$box.find(selector)[0];
    let textWidth = textarea.scrollWidth;

    $(this.$box.find(selector)).css({
      left: position.x - textWidth / 2,
      top: position.y - textarea.scrollHeight / 2,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  },
  
  setColors() {
    DescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-target/stroke', textColor);
    }
  }
});

