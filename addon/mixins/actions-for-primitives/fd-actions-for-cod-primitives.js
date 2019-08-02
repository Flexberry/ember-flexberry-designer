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

import Instance from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-instance';
import ActiveObject from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-active-object';
import MultiObject from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-multi-object';
import NAryAssociation from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-naryassociation';

import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on cod diagrams.
   @class FdAcrionsForCodPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addOnCodActor button.
      @method actions.addOnCodActor
      @param {jQuery.Event} e event.
    */
    addOnCodActor(e) {
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
      Handler for click on addOnCodDesignPattern button.
      @method actions.addOnCodDesignPattern
      @param {jQuery.Event} e event.
     */
    addOnCodDesignPattern(e) {
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
      Handler for click on addOnCodAssociationLink button.
      @method actions.addOnCodAssociationLink
      @param {jQuery.Event} e event.
     */
    addOnCodAssociationLink(e) {
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
      Handler for click on addOnCodAggregationLink button.
      @method actions.addOnCodAggregationLink
      @param {jQuery.Event} e event.
    */
    addOnCodAggregationLink(e) {
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
      Handler for click on addOnCodCompositionLink button.
      @method actions.addOnCodCompositionLink
      @param {jQuery.Event} e event.
     */
    addOnCodCompositionLink(e) {
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
      Handler for click on addOnCodDesignPatternConnector button.
      @method actions.addOnCodDesignPatternConnector
      @param {jQuery.Event} e event.
    */
    addOnCodDesignPatternConnector(e) {
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
      Handler for click on addOnCodInheritance button.
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
      Handler for click on addOnCodBackwardNestedMessage button.
      @method actions.addOnCodBackwardNestedMessage
      @param {jQuery.Event} e event.
     */
    addOnCodBackwardNestedMessage(e) {
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
      Handler for click on addOnCodForwardNestedMessage button.
      @method actions.addOnCodForwardNestedMessage
      @param {jQuery.Event} e event.
     */
    addOnCodForwardNestedMessage(e) {
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
      Handler for click on addOnCodBackwardFlatMessage button.
      @method actions.addOnCodBackwardFlatMessage
      @param {jQuery.Event} e event.
     */
    addOnCodBackwardFlatMessage(e) {
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
      Handler for click on addOnCodForwardFlatMessage button.
      @method actions.addOnCodForwardFlatMessage
      @param {jQuery.Event} e event.
     */
    addOnCodForwardFlatMessage(e) {
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
      Handler for click on addOnCodBackwardAsyncMessage button.
      @method actions.addOnCodBackwardAsyncMessage
      @param {jQuery.Event} e event.
     */
    addOnCodBackwardAsyncMessage(e) {
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
      Handler for click on addOnCodForwardAsyncMessage button.
      @method actions.addOnCodForwardAsyncMessage
      @param {jQuery.Event} e event.
     */
    addOnCodForwardAsyncMessage(e) {
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

    
    /**
      Handler for click on addOnCodInstance button.

      @method actions.addOnCodInstance
      @param {jQuery.Event} e event.
     */
    addOnCodInstance(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.Instance, UMLCOD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '' }
        );
        let instance = Instance.create({ primitive: jsonObject });

        this._addToPrimitives(instance);

        return instance.JointJS();
      }).bind(this), e);
    },


    /**
      Handler for click on addOnCodMultiObject button.

      @method actions.addOnCodMultiObject
      @param {jQuery.Event} e event.
     */
    addOnCodMultiObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.MultiObject, UMLCOD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let multiObject = MultiObject.create({ primitive: jsonObject });

        this._addToPrimitives(multiObject);

        return multiObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addOnCodActiveObject button.

      @method actions.addOnCodActiveObject
      @param {jQuery.Event} e event.
     */
    addOnCodActiveObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.ActiveObject, UMLCOD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '' }
        );
        let activeObject = ActiveObject.create({ primitive: jsonObject });

        this._addToPrimitives(activeObject);

        return activeObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addOnCodNaryAssociation button.

      @method actions.addOnCodNaryAssociation
      @param {jQuery.Event} e event.
     */
    addOnCodNaryAssociation(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cod.NarLink, UMLCOD',
          { x, y },
          { width: 40, height: 40 },
          { Name: '' }
        );
        let naryAssociation = NAryAssociation.create({ primitive: jsonObject });

        this._addToPrimitives(naryAssociation);

        return naryAssociation.JointJS();
      }).bind(this), e);
    },

    //addAggregationLink
  }
});
