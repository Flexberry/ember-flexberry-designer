import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import fdUmlUseCase from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-use-case';
import { Association } from '../../objects/uml-primitives/fd-uml-association';
import fdUseCaseActor from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-actor';
import fdPartition from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-partition';
import { DirectedAssociation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-directed-association';
import { UseCaseGeneralization } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-usecase-generalization';
import { Dependency } from '../../objects/uml-primitives/fd-uml-dependency';
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
          { width: 30, height: 50 },
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
//         let newUsecaseBoundaryObject = new Partition({
//           position: { x: x, y: y },
//           size: { width: 70, height: 50 },
//           name: ''
//         });
//
//         return newUsecaseBoundaryObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addUndirAssociation button.

      @method actions.addUndirAssociation
      @param {jQuery.Event} e event.
    */
    addUndirAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let newAssociationObject = new Association({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newAssociationObject;
      }).bind(this), e, A(['flexberry.uml.Usecase', 'flexberry.uml.UsecaseActor']));
    },

    /**
      Handler for click on addDirAssociation button.

      @method actions.addDirAssociation
      @param {jQuery.Event} e event.
    */
    addDirAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let newAssociationObject = new DirectedAssociation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newAssociationObject;
      }).bind(this), e, A(['flexberry.uml.Usecase', 'flexberry.uml.UsecaseActor']));
    },

    /**
      Handler for click on addGeneralization button.

      @method actions.addGeneralization
      @param {jQuery.Event} e event.
    */
    addGeneralization(e) {
      this.createLinkData((function(linkProperties) {
        let newGeneralizationObject = new UseCaseGeneralization({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newGeneralizationObject;
      }).bind(this), e, A(['flexberry.uml.Usecase', 'flexberry.uml.UsecaseActor']));
    },

    /**
      Handler for click on addDependency button.

      @method actions.addDependency
      @param {jQuery.Event} e event.
    */
    addDependency(e) {
      this.createLinkData((function(linkProperties) {
        let newDependencyObject = new Dependency({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newDependencyObject;
      }).bind(this), e, A(['flexberry.uml.Usecase']));
    },
  }
});
