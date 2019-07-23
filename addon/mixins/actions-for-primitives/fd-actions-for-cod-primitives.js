import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';

import UsecaseActor from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-actor';
import DesignPattern from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-design-pattern';
import AssociationLink from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-association-link';
import AggregationLink from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-aggregation-link';
import CompositionLink from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-composition-link';
import Generalization from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-generalization';
import DesignPatternConnector from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-design-pattern-connector';
import ForwardFlatMessage from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-forward-flat-message';
import ForwardNestedMessage from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-forward-nested-message';
import ForwardAsyncMessage from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-forward-async-message';
import BackwardNestedMessage from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-backward-nested-message';
import BackwardFlatMessage from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-backward-flat-message';
import BackwardAsyncMessage from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-backward-async-message';
import Association from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-association';
import QualifiedAssociation from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-association';
import QualifiedComposition from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-composition';
import QualifiedAggregation from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-aggregation';

import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on cod diagrams.
   @class FdAcrionsForCodPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addActor button.
      @method actions.addActor
      @param {jQuery.Event} e event.
    */
    addCodActor(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.Actor, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = UsecaseActor.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addDesignPattern button.
      @method actions.addDesignPattern
      @param {jQuery.Event} e event.
     */
    addDesignPattern(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.DesignPattern, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = DesignPattern.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addOnCodNaryAssociationConnector button.
      @method actions.addOnCodNaryAssociationConnector
      @param {jQuery.Event} e event.
   */
    addOnCodNaryAssociationConnector(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.NaryLink, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = Association.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, {
        start: A(['flexberry.uml.NAryAssociation']),
        end: A(['flexberry.uml.NAryAssociation', 'flexberry.uml.Instance', 'flexberry.uml.ActiveObject',
         'flexberry.uml.MultiObject', 'flexberry.uml.DesignPattern'])
      });
    },

    /**
      Handler for click on addAssociationLink button.
      @method actions.addAssociationLink
      @param {jQuery.Event} e event.
     */
    addAssociationLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.Link, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = AssociationLink.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.ActiveObject', 'flexberry.uml.MultiObject',
       'flexberry.uml.UsecaseActor', 'flexberry.uml.DesignPattern', 'flexberry.uml.ForwardAsyncMessage', 'flexberry.uml.ForwardFlatMessage',
       'flexberry.uml.ForwardNestedMessage', 'flexberry.uml.ForwardAsyncMessage', 'flexberry.uml.ForwardFlatMessage', 'flexberry.uml.ForwardNestedMessage']));
    },

    /**
      Handler for click on addOnCodQualifiedLink button.
      @method actions.addOnCodQualifiedLink
      @param {jQuery.Event} e event.
    */
    addOnCodQualifiedLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.QualifiedLink, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = QualifiedAssociation.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addAggregationLink button.
      @method actions.addAggregationLink
      @param {jQuery.Event} e event.
    */
    addAggregationLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.AggregationLink, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = AggregationLink.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addOnCodQualifiedAggregationLink button.
      @method actions.addOnCodQualifiedAggregationLink
      @param {jQuery.Event} e event.
    */
    addOnCodQualifiedAggregationLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.QualifiedAggregationLink, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = QualifiedAggregation.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addCompositionLink button.
      @method actions.addCompositionLink
      @param {jQuery.Event} e event.
     */
    addCompositionLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.CompositionLink, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = CompositionLink.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addOnCodQualifiedCompositionLink button.
      @method actions.addOnCodQualifiedCompositionLink
      @param {jQuery.Event} e event.
    */
    addOnCodQualifiedCompositionLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.QualifiedCompositionLink, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = QualifiedComposition.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addDesignPatternConnector button.
      @method actions.addDesignPatternConnector
      @param {jQuery.Event} e event.
    */
    addDesignPatternConnector(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.DesignPatternConnector, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = DesignPatternConnector.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, {
        start: A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject', 'flexberry.uml.UsecaseActor']),
        end: A(['flexberry.uml.DesignPattern'])
      });
    },

    /**
      Handler for click on addInheritanceLink button.
      @method actions.addOnCodInheritance
      @param {jQuery.Event} e event.
     */
    addOnCodInheritance(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cod.Inheritance, UMLCOD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '-' }
        );
        let undirAssociationObject = Generalization.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, {
        start: A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject', 'flexberry.uml.DesignPattern']),
        end: A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject'])
      });
    },

    /**
      Handler for click on addBackwardNestedMessage button.
      @method actions.addBackwardNestedMessage
      @param {jQuery.Event} e event.
     */
    addBackwardNestedMessage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.BackwardNestedMessage, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = BackwardNestedMessage.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addForwardNestedMessage button.
      @method actions.addForwardNestedMessage
      @param {jQuery.Event} e event.
     */
    addForwardNestedMessage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.ForwardNestedMessage, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = ForwardNestedMessage.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addBackwardFlatMessage button.
      @method actions.addBackwardFlatMessage
      @param {jQuery.Event} e event.
     */
    addBackwardFlatMessage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.BackwardFlatMessage, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = BackwardFlatMessage.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addForwardFlatMessage button.
      @method actions.addForwardFlatMessage
      @param {jQuery.Event} e event.
     */
    addForwardFlatMessage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.ForwardFlatMessage, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = ForwardFlatMessage.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addBackwardAsyncMessage button.
      @method actions.addBackwardAsyncMessage
      @param {jQuery.Event} e event.
     */
    addBackwardAsyncMessage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.BackwardAsyncMessage, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = BackwardAsyncMessage.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addForwardAsyncMessage button.
      @method actions.addForwardAsyncMessage
      @param {jQuery.Event} e event.
     */
    addForwardAsyncMessage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.ForwardAsyncMessage, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let codObject = ForwardAsyncMessage.create({ primitive: jsonObject });
        this._addToPrimitives(codObject);
        return codObject.JointJS();
      }).bind(this), e);
    },
  }
});
