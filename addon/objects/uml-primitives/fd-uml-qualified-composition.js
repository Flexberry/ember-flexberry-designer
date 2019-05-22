/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import FdUmlLink, { Link } from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';

/**
  An object that describes a link of the `Qualified Composition` type on the UML diagram.

  @class FdUmlQualifiedComposition
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
    Link description.

    @property description
    @type String
  */
  description: computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint', 'primitive');
    return new QualifiedComposition(properties);
  },
});

/**
  Defines the JointJS link, which represents a Qualified Composition in the UML diagram.

  @for FdUmlQualifiedComposition
  @class QualifiedComposition
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedComposition = Link.define('flexberry.uml.QualifiedComposition', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'url(#solids)' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
  linkInitialize: Link.prototype.initialize
}, {

  initialize: function() {
    // called from Backbone constructor
    // call base initialize()
    joint.dia.Link.prototype.initialize.apply(this, arguments);
    this.attributes.linkInitialize.apply(this, arguments);
//     flexberry.uml.Link.prototype.initialize.apply(this, arguments);

    this.label(2, { attrs: { text: { 'text-decoration': 'underline', } } });

    // link markup is so complex that we need to fetch its definition
    var markup = (this.markup || this.get('markup'));

    // append <linearGradient> to markup, so that it covers whole path
    markup += '<linearGradient id="solids" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop offset="50%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '</linearGradient>';
    this.set('markup', markup);
  },
  getLabelDistance: function (labelName, isVertical) {
    switch (labelName) {
      case 'qualified':
        return isVertical ? 10 : 5;
      case 'startRole':
        return 55;
      case 'endRole':
        return isVertical ? -10 : -5;
      case 'description':
        return 0.5;
      default:
        // eslint-disable-next-line no-console
        console.log('ERROR - choose correct label name');
    }
  }
});

joint.shapes.flexberry.uml.QualifiedCompositionView = QualifiedView.extend({
  template: [
    '<div class="input-buffer"></div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input underline-text" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="start-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="end-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="qualified-input" value="" />',
    '</div>'
  ].join(''),
});
