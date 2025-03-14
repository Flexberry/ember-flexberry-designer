/**
  @module ember-flexberry-designer
*/
import FdUmlBaseLink from './fd-uml-link';
import { Dependency } from './fd-uml-dependency';
import { DescriptionView } from './links-view/fd-description-view';

import { isNone } from '@ember/utils';

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
  },

  updateInputPosition(index, selector) {
    let position = this.getLabelCoordinates(this.model.label(index).position);
    let textarea = this.$box.find(selector)[0];
    let textWidth = textarea.scrollWidth;

    let element = this.$box.find(selector)[0];
    if (element) {
      element.style.left = `${position.x - textWidth / 2}px`;
      element.style.top = `${position.y - textarea.scrollHeight / 2}px`;
      element.style.transform = `rotate(${this.model.get('angle') || 0}deg)`;
    }
  },

  updateInputWidth(selector) {
    const textarea = this.$box.find(selector)[0];
    const buffer = this.$box.find('.input-buffer');
    
    buffer.text(textarea.value || ' ');
    const newWidth = Math.max(buffer[0].offsetWidth + 1, 1);
    
    textarea.style.width = newWidth + 'px';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  },
  
  setColors() {
    DescriptionView.prototype.setColors.apply(this, arguments);

    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-target/stroke', textColor);
    }
  }
});

