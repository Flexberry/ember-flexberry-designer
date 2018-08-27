/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

//import '../../utils/fd-common-primitives';

import FdUmlElement from './fd-uml-element';

import { BaseObject } from './fd-uml-object';

/**
  An object that describes a note on the UML diagram.

  @class FdUmlNote
  @extends FdUmlElement
*/
export default FdUmlElement.extend({
  /**
    The name of the note, the content is actually.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position', 'name');
    return new Note(properties);
  },
});

/**
  Defines the JointJS element, which represents the note in the UML diagram.

  @for FdUmlNote
  @class Note
  @extends flexberryUml.BaseObject
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
      'ref':'.flexberry-uml-header-rect',
      'stroke': 'white',
      'stroke-width':'2'
    },
    '.corner': {
      'ref':'.flexberry-uml-header-rect',
      'stroke': 'black',
      'stroke-width':'1',
      'd':'M0,0 L0,10 L10,10 L0,0'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '<rect class="corner-rect" width="10" height="10"/>',
    '<path class="corner"/>',
    '</g>'
  ].join(''),

  updateRectangles() {
    joint.shapes.flexberry.uml.BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let transX = this.size().width - 10;
    attrs['.corner-rect'].transform = 'translate(' + transX + ', 0)';
    attrs['.corner'].transform = 'translate(' + transX + ', 0)';
  },
});
