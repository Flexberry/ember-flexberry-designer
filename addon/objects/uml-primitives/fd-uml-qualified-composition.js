/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';
import { LinkWithUnderline } from './fd-uml-link';

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
  endRoleTxt: Ember.computed.alias('primitive.RightText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: Ember.computed.alias('primitive.LeftText.Text'),

  /**
    Link description.

    @property description
    @type String
  */
  description: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint');
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
export let QualifiedComposition = LinkWithUnderline.define('flexberry.uml.QualifiedComposition', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'url(#solids)' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },
}, {

  initialize: function() {
    // called from Backbone constructor
    // call base initialize()
    joint.dia.Link.prototype.initialize.apply(this, arguments);

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
  }
});

joint.shapes.flexberry.uml.QualifiedCompositionView = QualifiedView;
