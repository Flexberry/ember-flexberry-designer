import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';

import { UsecaseActor } from '../../objects/uml-primitives/fd-uml-usecase-actor';
import { DesignPattern } from '../../objects/uml-primitives/fd-uml-design-pattern';
import { AssociationLink } from '../../objects/uml-primitives/fd-uml-association-link';
import { AggregationLink } from '../../objects/uml-primitives/fd-uml-aggregation-link';
import { CompositionLink } from '../../objects/uml-primitives/fd-uml-composition-link';
import { Generalization } from '../../objects/uml-primitives/fd-uml-generalization';
import { DesignPatternConnector } from '../../objects/uml-primitives/fd-uml-design-pattern-connector';
import { ForwardFlatMessage } from '../../objects/uml-primitives/fd-uml-forward-flat-message';
import { ForwardNestedMessage } from '../../objects/uml-primitives/fd-uml-forward-nested-message';
import { ForwardAsyncMessage } from '../../objects/uml-primitives/fd-uml-forward-async-message';
import { BackwardNestedMessage } from '../../objects/uml-primitives/fd-uml-backward-nested-message';
import { BackwardFlatMessage } from '../../objects/uml-primitives/fd-uml-backward-flat-message';
import { BackwardAsyncMessage } from '../../objects/uml-primitives/fd-uml-backward-async-message';
import { Association } from '../../objects/uml-primitives/fd-uml-association';
import { QualifiedAssociation } from '../../objects/uml-primitives/fd-uml-qualified-association';
import { QualifiedComposition } from '../../objects/uml-primitives/fd-uml-qualified-composition';
import { QualifiedAggregation } from '../../objects/uml-primitives/fd-uml-qualified-aggregation';

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
    addActor(e) {
      this.createObjectData((function(x, y) {
        let newUsecaseActorObject = new UsecaseActor({
          position: { x: x, y: y },
          name: ''
        });

        return newUsecaseActorObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addDesignPattern button.
      @method actions.addDesignPattern
      @param {jQuery.Event} e event.
     */
    addDesignPattern(e) {
      this.createObjectData((function(x, y) {
        let newDesignPatternObject = new DesignPattern({
          position: { x: x, y: y },
          size: { width: 100, height: 40 },
          name: ''
        });

        return newDesignPatternObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addOnCodNaryAssociationConnector button.
      @method actions.addOnCodNaryAssociationConnector
      @param {jQuery.Event} e event.
   */
    addOnCodNaryAssociationConnector(e) {
      this.createLinkData((function(linkProperties) {
        let newNaryAssociationConnectorObject = new Association({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newNaryAssociationConnectorObject;
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
        let newAssociationLinkObject = new AssociationLink({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newAssociationLinkObject;
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
        let newQualifiedAssociationObject = new QualifiedAssociation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newQualifiedAssociationObject;
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addAggregationLink button.
      @method actions.addAggregationLink
      @param {jQuery.Event} e event.
    */
    addAggregationLink(e) {
      this.createLinkData((function(linkProperties) {
        let newAggregationLinkObject = new AggregationLink({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newAggregationLinkObject;
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addOnCodQualifiedAggregationLink button.
      @method actions.addOnCodQualifiedAggregationLink
      @param {jQuery.Event} e event.
    */
    addOnCodQualifiedAggregationLink(e) {
      this.createLinkData((function(linkProperties) {
        let newQualifiedAggregationObject = new QualifiedAggregation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newQualifiedAggregationObject;
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addCompositionLink button.
      @method actions.addCompositionLink
      @param {jQuery.Event} e event.
     */
    addCompositionLink(e) {
      this.createLinkData((function(linkProperties) {
        let newCompositionLinkObject = new CompositionLink({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newCompositionLinkObject;
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addOnCodQualifiedCompositionLink button.
      @method actions.addOnCodQualifiedCompositionLink
      @param {jQuery.Event} e event.
    */
    addOnCodQualifiedCompositionLink(e) {
      this.createLinkData((function(linkProperties) {
        let newQualifiedCompositionObject = new QualifiedComposition({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newQualifiedCompositionObject;
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.MultiObject']));
    },

    /**
      Handler for click on addDesignPatternConnector button.
      @method actions.addDesignPatternConnector
      @param {jQuery.Event} e event.
    */
    addDesignPatternConnector(e) {
      this.createLinkData((function(linkProperties) {
        let newDesignPatternConnectorObject = new DesignPatternConnector({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newDesignPatternConnectorObject;
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
        let newInheritanceLinkObject = new Generalization({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newInheritanceLinkObject;
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
        let newBackwardNestedMessageObject = new BackwardNestedMessage({
          position: { x: x, y: y }
        });

        return newBackwardNestedMessageObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addForwardNestedMessage button.
      @method actions.addForwardNestedMessage
      @param {jQuery.Event} e event.
     */
    addForwardNestedMessage(e) {
      this.createObjectData((function(x, y) {
        let newForwardNestedMessageObject = new ForwardNestedMessage({
          position: { x: x, y: y }
        });

        return newForwardNestedMessageObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addBackwardFlatMessage button.
      @method actions.addBackwardFlatMessage
      @param {jQuery.Event} e event.
     */
    addBackwardFlatMessage(e) {
      this.createObjectData((function(x, y) {
        let newBackwardFlatMessageObject = new BackwardFlatMessage({
          position: { x: x, y: y }
        });

        return newBackwardFlatMessageObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addForwardFlatMessage button.
      @method actions.addForwardFlatMessage
      @param {jQuery.Event} e event.
     */
    addForwardFlatMessage(e) {
      this.createObjectData((function(x, y) {
        let newForwardFlatMessageObject = new ForwardFlatMessage({
          position: { x: x, y: y }
        });

        return newForwardFlatMessageObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addBackwardAsyncMessage button.
      @method actions.addBackwardAsyncMessage
      @param {jQuery.Event} e event.
     */
    addBackwardAsyncMessage(e) {
      this.createObjectData((function(x, y) {
        let newBackwardAsyncMessageObject = new BackwardAsyncMessage({
          position: { x: x, y: y }
        });

        return newBackwardAsyncMessageObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addForwardAsyncMessage button.
      @method actions.addForwardAsyncMessage
      @param {jQuery.Event} e event.
     */
    addForwardAsyncMessage(e) {
      this.createObjectData((function(x, y) {
        let newForwardAsyncMessageObject = new ForwardAsyncMessage({
          position: { x: x, y: y }
        });

        return newForwardAsyncMessageObject;
      }).bind(this), e);
    },
  }
});
