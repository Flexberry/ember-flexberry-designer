/**
  @module ember-flexberry-designer
*/
import $ from 'jquery';
import joint from 'npm:jointjs';

import FdUmlBaseLink from './fd-uml-link';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Connection } from './fd-uml-connection';
import { Dependency } from './fd-uml-dependency';
import { NormalizedDescriptionView } from './links-view/fd-normalized-description-view';

/**
  An object that defines Transition link on the UML diagram.

  @class FdUmlTransition
  @extends FdUmlBaseLink
*/
export default FdUmlBaseLink.extend({

  /**
    Type of primitive.

    @property type
    @type String
  */
  type: computed.alias('primitive.$type'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    if (this.get('type') === 'STORMCASE.UML.ad.Transition, UMLAD') {
      return new Transition(properties);
    } else {
      return new Connection(properties);
    }
  }
});

/**
  Defines the JointJS link, which represents a Connection in the UML diagram.
  @for FdUmlTransition
  @class FdUmlTransition
  @extends Connection
  @namespace flexberry.uml
  @constructor
*/
export let Transition = Connection.define('flexberry.uml.Transition', {
  attrs: {
    rect: { 'visibility': 'visible' },
  }
}, {
  initialize: function () {
    Dependency.prototype.initialize.apply(this, arguments);
  }
});

joint.shapes.flexberry.uml.TransitionView = NormalizedDescriptionView.extend({
  template: [
    '<div class="uml-link-inputs">',
    '<textarea class="description-input" rows="1"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function() {
    NormalizedDescriptionView.prototype.initialize.apply(this, arguments);

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
    NormalizedDescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-target/stroke', textColor);
    }
  }
});
