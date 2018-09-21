/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import joint from 'npm:jointjs';

/**
  An object that describes an association link on the UML diagram.

  @class FdUmlAssociation
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'repositoryObject', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint');
    return new Association(properties);
  },
});

/**
  Defines the JointJS link, which represents an association in the UML diagram.

  @for FdUmlAssociation
  @class Association
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let Association = Link.define('flexberry.uml.Association', {
  attrs: {
    text: { visibility: 'hidden' }
  },
});

joint.shapes.flexberry.uml.AssociationView = joint.dia.LinkView.extend({
  template: [
    '<div class="input-buffer"></div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="start-multiplicity-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="end-multiplicity-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="description-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="start-role-input" value="" />',
    '</div>',
    '<div class="uml-link-inputs">',
    '<input type="text" class="end-role-input" value="" />',
    '</div>'
  ].join(''),

  /**
    Link's source element.

    @property sourceElement
    @type Object
  */
  sourceElement: undefined,

  /**
    Link's target element.

    @property targetElement
    @type Object
  */
  targetElement: undefined,

  initialize: function() {
    joint.dia.LinkView.prototype.initialize.apply(this, arguments);

    this.$box = Ember.$(this.template);
    this.model.inputElements = this.$box;

    // Prevent paper from handling pointerdown.
    this.$box.find('input').on('mousedown click', function(evt) {
      evt.stopPropagation();
    });

    this.$box.find('.start-multiplicity-input').on('input', function(evt) {
      this.model.setLabelText('startMultiplicity', Ember.$(evt.target).val());
    }.bind(this));

    this.$box.find('.end-multiplicity-input').on('input', function(evt) {
      this.model.setLabelText('endMultiplicity', Ember.$(evt.target).val());
    }.bind(this));

    this.$box.find('.description-input').on('input', function(evt) {
      this.model.setLabelText('description', Ember.$(evt.target).val());
    }.bind(this));

    this.$box.find('.start-role-input').on('input', function(evt) {
      this.model.setLabelText('startRole', Ember.$(evt.target).val());
    }.bind(this));

    this.$box.find('.end-role-input').on('input', function(evt) {
      this.model.setLabelText('endRole', Ember.$(evt.target).val());
    }.bind(this));

    // Initialize inputs values.
    let startMultiplicityInput = this.$box.find('.start-multiplicity-input');
    let endMultiplicityInput = this.$box.find('.end-multiplicity-input');
    let descriptionInput = this.$box.find('.description-input');
    let startRoleInput = this.$box.find('.start-role-input');
    let endRoleInput = this.$box.find('.end-role-input');
    startMultiplicityInput.val(this.model.getLabelText('startMultiplicity'));
    endMultiplicityInput.val(this.model.getLabelText('endMultiplicity'));
    descriptionInput.val(this.model.getLabelText('description'));
    startRoleInput.val(this.model.getLabelText('startRole'));
    endRoleInput.val(this.model.getLabelText('endRole'));

    this.model.on('change', this.updateBox, this);
    this.model.on('remove', this.removeBox, this);

    this.model.on('change:source', function() {
      let sourceElement = this.model.getSourceElement();
      if (sourceElement !== this.sourceElement) {
        if (!Ember.isNone(this.sourceElement)) {
          this.sourceElement.off('change:position change:size', this.updateBox, this);
        }

        if (!Ember.isNone(sourceElement)) {
          sourceElement.on('change:position change:size', this.updateBox, this);
        }

        this.sourceElement = sourceElement;
      }
    }, this);

    this.model.on('change:target', function() {
      let targetElement = this.model.getTargetElement();
      if (targetElement !== this.targetElement) {
        if (!Ember.isNone(this.targetElement)) {
          this.targetElement.off('change:position change:size', this.updateBox, this);
        }

        if (!Ember.isNone(targetElement)) {
          targetElement.on('change:position change:size', this.updateBox, this);
        }

        this.targetElement = targetElement;
      }
    }, this);

    this.sourceElement = this.model.getSourceElement();
    if (!Ember.isNone(this.sourceElement)) {
      this.sourceElement.on('change:position change:size', this.updateBox, this);
    }

    this.targetElement = this.model.getTargetElement();
    if (!Ember.isNone(this.targetElement)) {
      this.targetElement.on('change:position change:size', this.updateBox, this);
    }
  },

  render: function() {
    joint.dia.LinkView.prototype.render.apply(this, arguments);
    this.paper.$el.prepend(this.$box);
    this.updateBox();
    return this;
  },

  updateBox: function() {
    this.updateInputsWidth([
      '.start-multiplicity-input',
      '.end-multiplicity-input',
      '.description-input',
      '.start-role-input',
      '.end-role-input'
    ]);

    // Update labels offset.
    let vertices = this.model.get('vertices') || [];
    let startPointA = this.getLabelCoordinates({ distance: 0, offset: 0 });
    let endPointB = this.getLabelCoordinates({ distance: 1, offset: 0 });
    let startPointB = vertices[0] || endPointB;
    let endPointA = vertices[vertices.length - 1] || startPointA;
    this.model.updateLabelsPositions(startPointA, startPointB, false);
    this.model.updateLabelsPositions(endPointA, endPointB, true);

    // Update inputs positions.
    let startMultiplicityPosition = this.getLabelCoordinates(this.model.label(0).position);
    let startMultiplicityWidth = this.$box.find('.start-multiplicity-input').width();
    Ember.$(this.$box[1]).css({
      left: startMultiplicityPosition.x - 7 - startMultiplicityWidth / 2,
      top: startMultiplicityPosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
    let endMultiplicityPosition = this.getLabelCoordinates(this.model.label(1).position);
    let endMultiplicityWidth = this.$box.find('.end-multiplicity-input').width();
    Ember.$(this.$box[2]).css({
      left: endMultiplicityPosition.x - 7 - endMultiplicityWidth / 2,
      top: endMultiplicityPosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
    let descriptionPosition = this.getLabelCoordinates(this.model.get('labels')[2].position);
    let descriptionWidth = this.$box.find('.description-input').width();
    Ember.$(this.$box[3]).css({
      left: descriptionPosition.x - 7 - descriptionWidth / 2,
      top: descriptionPosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
    let startRolePosition = this.getLabelCoordinates(this.model.get('labels')[3].position);
    let startRoleWidth = this.$box.find('.start-role-input').width();
    Ember.$(this.$box[4]).css({
      left: startRolePosition.x - 7 - startRoleWidth / 2,
      top: startRolePosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
    let endRolePosition = this.getLabelCoordinates(this.model.get('labels')[4].position);
    let endRoleWidth = this.$box.find('.end-role-input').width();
    Ember.$(this.$box[5]).css({
      left: endRolePosition.x - 7 - endRoleWidth / 2,
      top: endRolePosition.y - 10,
      transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
    });
  },

  removeBox: function() {
    this.$box.remove();
  },

  updateInputsWidth(inputSelectors) {
    let selectors = Ember.isArray(inputSelectors) ? inputSelectors : [inputSelectors];
    let $buffer = Ember.$(this.$box[0]);
    selectors.forEach((selector) => {
      let $input = this.$box.find(selector);
      $buffer.css('font-weight', $input.css('font-weight'));
      $buffer.text($input.val());
      $input.width($buffer.width() + 1);
    }, this);
  },
});
