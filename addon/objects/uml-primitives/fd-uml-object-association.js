/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import FdUmlLink from './fd-uml-link';
import { Association } from './fd-uml-association';
import { RoleView } from './links-view/fd-role-view';
import joint from 'npm:jointjs';

/**
  An object that describes an object association link on the UML diagram.

  @class FdUmlObjectAssociation
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
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint', 'primitive');
    return new ObjectAssociation(properties);
  },
});

/**
  Defines the JointJS link, which represents an object association in the UML diagram.

  @for FdUmlObjectAssociation
  @class ObjectAssociation
  @extends flexberry.uml.Association
  @namespace flexberry.uml
  @constructor
*/
export let ObjectAssociation = Association.define('flexberry.uml.ObjectAssociation', {});

joint.shapes.flexberry.uml.ObjectAssociationView = RoleView.extend({
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
