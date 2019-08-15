/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a note on the UML diagram.

  @class FdUmlNote
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the note, actually its content.

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
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new Note(properties);
  },
});

/**
  Defines the JointJS element, which represents the note in the UML diagram.

  @for FdUmlNote
  @class Note
  @extends BaseObject
  @namespace flexberry.uml
  @constructor
*/
export let Note = BaseObject.define('flexberry.uml.Note', {
  attrs: {
    '.flexberry-uml-header-text': {
      'font-weight': 'bold',
      'ref-y': 0,
      'ref-x': 0,
      'text-anchor': 'start',
      'y-alignment': 'start',
    },
    '.corner-rect': {
      'ref': '.flexberry-uml-header-rect',
      'stroke': 'white',
      'stroke-width': '2'
    },
    '.corner': {
      'ref': '.flexberry-uml-header-rect',
      'stroke': 'black',
      'stroke-width': '1',
      'd': 'M0,0 L0,10 L10,10 L0,0'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '<rect class="corner-rect" width="10" height="10"/>',
    '<path class="corner"/>',
    '</g>'
  ].join(''),
});

joint.util.setByPath(joint.shapes, 'flexberry.uml.Note', Note, '.');

joint.shapes.flexberry.uml.NoteView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),
  
  updateRectangles() {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.updateRectangles.apply(this, arguments);
    let transX = this.model.size().width - 8;

    this.model.attr('.corner-rect/transform', `translate(${transX}, 0)`);
    this.model.attr('.corner/transform', `translate(${transX}, 0)`);
  },
});
