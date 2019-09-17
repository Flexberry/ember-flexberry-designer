/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';
/**
  An object that describes a link of the Qualified association type on the UML diagram.

  @class FdUmlQualifiedAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: computed.alias('primitive.RightText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.LeftText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new QualifiedAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents a Qualified Association in the UML diagram.

  @for FdUmlQualifiedAssiociation
  @class QualifiedAssociation
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedAssociation = Link.define('flexberry.uml.QualifiedAssociation', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  }
}, {
  initialize: function() {
    // called from Backbone constructor
    Link.prototype.initialize.apply(this, arguments);

    // link markup is so complex that we need to fetch its definition
    var markup = (this.markup || this.get('markup'));

    // append <linearGradient> to markup, so that it covers whole path
    markup += '<linearGradient id="solids" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop class="brush-color" offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop class="brush-color" offset="50%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop class="text-color" offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '<stop class="text-color" offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '</linearGradient>';
    this.set('markup', markup);
  },

  getLabelDistance: function (labelName, isVertical) {
    switch (labelName) {
      case 'qualified':
        return isVertical ? 10 : 5;
      case 'startRole':
        return 30;
      case 'endRole':
        return isVertical ? -10 : -5;
      case 'description':
        return 0.5;
    }
  }
});

joint.shapes.flexberry.uml.QualifiedAssociationView = QualifiedView.extend({
  setColors() {
    QualifiedView.prototype.setColors.apply(this, arguments);

    const brushColor = this.getBrushColor();
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
    }

    if (!isNone(brushColor)) {
      this.model.attr('.marker-source/fill', brushColor);
    }
  }
});
