/**
  @module ember-flexberry-designer
*/
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

    this.$box.find('.description-input').on('blur', function(evt) {
      this.addSquareBracketsToDescription($(evt.target));
    }.bind(this));
  },

  addSquareBracketsToDescription($input) {
    const description = $input.val();
    const lines = description.split('\n');
    const updatedDescription = lines
      .map(line => line.startsWith('[')?`${line}]`:line.endsWith(']')?`[${line}`:`[${line}]`)
      .join('\n');

    $input.val(updatedDescription);
    this.updateInputWidth('.description-input');
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

  updateInputWidth(selector) {
    const textarea = this.$box.find(selector)[0];
  
    // Create a temporary span to change the width of the text
    let buffer = document.createElement('span');
    buffer.style.visibility = 'hidden';
    buffer.style.whiteSpace = 'pre';
    buffer.style.position = 'absolute';
    buffer.style.font = window.getComputedStyle(textarea).font;
    buffer.textContent = textarea.value || ' ';
  
    document.body.appendChild(buffer);
    const newWidth = Math.max(buffer.offsetWidth + 1, 1);
    document.body.removeChild(buffer);
  
    textarea.style.width = newWidth + 'px';
  
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  },

  setColors() {
    NormalizedDescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-target/stroke', textColor);
    }
  }
});
