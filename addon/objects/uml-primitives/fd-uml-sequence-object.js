/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';
import { BaseObject } from './fd-uml-baseobject';

/**
  An object that describes a Sequence Object element on the UML diagram.

  @class FdUmlSequenceObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the SequenceObject.

    @property name
    @type String
  */
  name: computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    
    return new SequenceDiagramObject(properties);
  },
});

/**
  Defines the JointJS object, which represents a Sequence Object in the UML diagram.

  @for FdUmlSequenceDiagramObject
  @class SequenceDiagramObject
  @extends SequenceActor
  @namespace flexberry.uml
  @constructor
*/
export let SequenceDiagramObject = BaseObject.define('flexberry.uml.sequencediagramObject', {
  // Minimum width.
  minWidth: 40,

  // Minimum height.
  minHeight: 40,

  heightPadding: 20,
}, {
  getRectangles() {
    return [
      { type: 'header', element: this }
    ];
  },
});

joint.shapes.flexberry.uml.sequencediagramObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend({
  template: [
    '<div class="uml-class-inputs">',
    '<textarea class="class-name-input header-input" value="" rows="1" wrap="off"></textarea>',
    '<div class="input-buffer"></div>',
    '</div>'
  ].join(''),

  initialize: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.initialize.apply(this, arguments);
    this.updateRectangles();
  },

  updateRectangles: function () {
    joint.shapes.flexberry.uml.BaseObjectView.prototype.updateRectangles.apply(this, arguments);
    let paramsBox = this.$box.find('.header-input');
    let bbox = this.model.getBBox();
    
    paramsBox.css({
      top: (bbox.height - paramsBox[0].offsetHeight)/2,
      left: (bbox.width - paramsBox[0].offsetWidth)/2,
      position: 'absolute'
    });
  },
});