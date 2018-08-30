/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-baselink';
import { Link } from './fd-uml-link';

/**
  An object that describes a link of the association type on the UML diagram.

  @class FdUmlAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    The start multiplicity of a link.

    @property startMultiplicity
    @type String
  */
  startMultiplicity: Ember.computed.alias('primitive.StartMultTxt.Text'),

  /**
    The end multiplicity of a link.

    @property endMultiplicity
    @type String
  */
  endMultiplicity: Ember.computed.alias('primitive.EndMultTxt.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    return new QualifiedComposition(properties);
  },
});

/**
  Defines the JointJS link, which represents a association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedComposition = Link.define('flexberry.uml.QualifiedComposition', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'url(#solids)' }
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
