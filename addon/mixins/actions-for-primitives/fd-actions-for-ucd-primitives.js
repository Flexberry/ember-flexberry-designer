import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import fdUmlUseCase from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-use-case';
import fdUseCaseActor from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-actor';
import fdPartition from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-partition';
import FdDirectedAssociation from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-directed-association';
import FdUnDirectedAssociation from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-undirected-association';
import FdUseCaseGeneralization from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-generalization';
import FdDependency from '../../objects/uml-primitives/fd-uml-dependency';
import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on ucd diagrams.

  @class FdActionsForUCDPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addUseCase button.

      @method actions.addUseCase
      @param {jQuery.Event} e event.
     */
    addUseCase(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ucd.UseCase, UMLUCD',
          { x, y },
          { width: 100, height: 40 },
          { Name: '' }
        );
        let usecaseObject = fdUmlUseCase.create({ primitive: jsonObject });
        this._addToPrimitives(usecaseObject);
        return usecaseObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addActor button.
      @method actions.addActor
      @param {jQuery.Event} e event.
    */
    addActor(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ucd.Actor, UMLUCD',
          { x, y },
          { width: 25, height: 50 },
          { Name: '' }
        );
        let usecaseActorObject = fdUseCaseActor.create({ primitive: jsonObject });
        this._addToPrimitives(usecaseActorObject);
        return usecaseActorObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addBoundary button.
      @method actions.addBoundary
      @param {jQuery.Event} e event.
    */
    addBoundary(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ucd.Boundary, UMLUCD',
          { x, y },
          { width: 20, height: 13 },
          { Name: '' }
        );
        let usecasePartitionObject = fdPartition.create({ primitive: jsonObject });
        this._addToPrimitives(usecasePartitionObject);
        return usecasePartitionObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addUndirAssociation button.

      @method actions.addUndirAssociation
      @param {jQuery.Event} e event.
    */
    addUndirAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.ucd.UndirectedAssoc, UMLUCD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '' }
        );
        let undirAssociationObject = FdUnDirectedAssociation.create({ primitive: jsonObject });
        undirAssociationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(undirAssociationObject);
        return undirAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.UseCase', 'flexberry.uml.UsecaseActor']));
    },

    /**
      Handler for click on addDirAssociation button.

      @method actions.addDirAssociation
      @param {jQuery.Event} e event.
    */
    addDirAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.ucd.DirectedAssoc, UMLUCD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '' }
        );
        let associationObject = FdDirectedAssociation.create({ primitive: jsonObject });
        associationObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(associationObject);
        return associationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.UseCase', 'flexberry.uml.UsecaseActor']));
    },

    /**
      Handler for click on addGeneralization button.

      @method actions.addGeneralization
      @param {jQuery.Event} e event.
    */
    addGeneralization(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.ucd.Generalization, UMLUCD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '' }
        );
        let generalitionObject = FdUseCaseGeneralization.create({ primitive: jsonObject });
        generalitionObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(generalitionObject);
        return generalitionObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.UseCase', 'flexberry.uml.UsecaseActor']));
    },

    /**
     Handler for click on addUCDDependency* button.

     @method actions.addUCDDependency
      @param {jQuery.Event} e event.
    */
    addUCDDependency(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.ucd.Dependency, UMLUCD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          null,
          { Name: '' }
        );
        let depencyObject = FdDependency.create({ primitive: jsonObject });
        depencyObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(depencyObject);
        return depencyObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.UseCase']));
    },
  }
});
