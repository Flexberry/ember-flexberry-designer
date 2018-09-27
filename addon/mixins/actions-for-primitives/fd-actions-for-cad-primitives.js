import Ember from 'ember';
import uuid from 'npm:node-uuid';

import FdUmlClass from '../../objects/uml-primitives/fd-uml-class';
import { Association } from '../../objects/uml-primitives/fd-uml-association';
import { Aggregation } from '../../objects/uml-primitives/fd-uml-aggregation';
import { Composition } from '../../objects/uml-primitives/fd-uml-composition';
import { Generalization } from '../../objects/uml-primitives/fd-uml-generalization';
import { Realization } from '../../objects/uml-primitives/fd-uml-realization';
import { NestedClassAssociation } from '../../objects/uml-primitives/fd-uml-nested-association';
import { TemplateClass } from '../../objects/uml-primitives/fd-uml-template-class';
import { Instance } from '../../objects/uml-primitives/fd-uml-instance';
import { ActiveObject } from '../../objects/uml-primitives/fd-uml-active-object';
import { MultiObject } from '../../objects/uml-primitives/fd-uml-multi-object';
import { PropertyObject } from '../../objects/uml-primitives/fd-uml-property-object';
import { NAryAssociation } from '../../objects/uml-primitives/fd-uml-naryassociation';
import { QualifiedAssociation } from '../../objects/uml-primitives/fd-uml-qualified-association';
import { QualifiedComposition } from '../../objects/uml-primitives/fd-uml-qualified-composition';
import { QualifiedAggregation } from '../../objects/uml-primitives/fd-uml-qualified-aggregation';
import { MoreClasses } from '../../objects/uml-primitives/fd-uml-more-classes';
import { Package } from '../../objects/uml-primitives/fd-uml-package';

import { findFreeNodeTreeNameIndex } from '../../utils/fd-metods-for-tree';
import { getJsonForClass } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on cad diagrams.

  @class FdAcrionsForCadPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
  */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      Handler for click on addClass button.

      @method actions.addClass
      @param {jQuery.Event} e event.
     */
    addClass(e) {
      this.createObjectData((function(X, Y) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let allClasses = store.peekAll('fd-dev-class');
        let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

        let index = findFreeNodeTreeNameIndex('NewClass', 1, classesCurrentStage, 'name');
        let freeName = 'NewClass' + index;

        let id = uuid.v4();
        let newClass = store.createRecord('fd-dev-class', {
          id: id,
          stage: stage,
          caption: freeName,
          description: freeName,
          name: freeName,
          nameStr: freeName,
        });
        let umlClass = FdUmlClass.create({ primitive: getJsonForClass(newClass, null, 0, { location: { X, Y } }) });

        this.get('createdClasses').pushObject(newClass);
        this.get('model.primitives').pushObject(umlClass);

        return umlClass.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addAssociation button.

      @method actions.addAssociation
      @param {jQuery.Event} e event.
     */
    addAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let endClass = this.getRepObj(store, stage, linkProperties.endClassRepObj, 'fd-dev-class');
        let startClass = this.getRepObj(store, stage, linkProperties.startClassRepObj, 'fd-dev-class');

        let newAssociation = store.createRecord('fd-dev-association', {
          endClass: endClass,
          startClass: startClass,
          stage: stage,
          startMultiplicity: '1',
          endMultiplicity: '*'
        });

        let newAssociationObject = new Association({
          source: {
            id: linkProperties.target
          },
          target: {
            id: linkProperties.source
          },
          vertices: linkProperties.points.reverseObjects(),
          repositoryObject: newAssociation
        });
        newAssociationObject.setLabelText('startMultiplicity', '1');
        newAssociationObject.setLabelText('endMultiplicity', '*');

        return newAssociationObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addAggregation button.

      @method actions.addAggregation
      @param {jQuery.Event} e event.
     */
    addAggregation(e) {
      this.createLinkData((function(linkProperties) {
        let newAggregationObject = new Aggregation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });
        newAggregationObject.setLabelText('startMultiplicity', '1');
        newAggregationObject.setLabelText('endMultiplicity', '*');

        return newAggregationObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addComposition button.

      @method actions.addComposition
      @param {jQuery.Event} e event.
     */
    addComposition(e) {
      this.createLinkData((function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let endClass = this.getRepObj(store, stage, linkProperties.endClassRepObj, 'fd-dev-class');
        let startClass = this.getRepObj(store, stage, linkProperties.startClassRepObj, 'fd-dev-class');

        let newComposition = store.createRecord('fd-dev-aggregation', {
          endClass: endClass,
          startClass: startClass,
          stage: stage,
          startMultiplicity: '1',
          endMultiplicity: '*'
        });

        let newCompositionObject = new Composition({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points,
          repositoryObject: newComposition
        });
        newCompositionObject.setLabelText('startMultiplicity', '1');
        newCompositionObject.setLabelText('endMultiplicity', '*');

        return newCompositionObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addInheritance button.

      @method actions.addInheritance
      @param {jQuery.Event} e event.
     */
    addInheritance(e) {
      this.createLinkData((function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let childClass = this.getRepObj(store, stage, linkProperties.endClassRepObj, 'fd-dev-class');
        let parentClass = this.getRepObj(store, stage, linkProperties.startClassRepObj, 'fd-dev-class');

        let newInheritance = store.createRecord('fd-dev-aggregation', {
          child: childClass,
          parent: parentClass,
          stage: stage,
        });

        let newInheritanceObject = new Generalization({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points,
          repositoryObject: newInheritance
        });

        return newInheritanceObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addRealization button.

      @method actions.addRealization
      @param {jQuery.Event} e event.
     */
    addRealization(e) {
      this.createLinkData((function(linkProperties) {
        let newRealizationObject = new Realization({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newRealizationObject;
      }).bind(this), e, {
        start: Ember.A(['flexberry.uml.NAryAssociation']),
        end: Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass'])
      });
    },

    /**
      Handler for click on addNestedClassAssociation button.

      @method actions.addNestedClassAssociation
      @param {jQuery.Event} e event.
     */
    addNestedClassAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let newNestedClassAssociationObject = new NestedClassAssociation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newNestedClassAssociationObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addTemplateClass button.

      @method actions.addTemplateClass
      @param {jQuery.Event} e event.
     */
    addTemplateClass(e) {
      this.createObjectData((function(x, y) {
        let newTemplateClassObject = new TemplateClass({
          position: { x: x, y: y },
          size: { width: 150, height: 40 },
          name: '',
          attributes: '',
          methods: '',
        });

        return newTemplateClassObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addInstance button.

      @method actions.addInstance
      @param {jQuery.Event} e event.
     */
    addInstance(e) {
      this.createObjectData((function(x, y) {
        let newInstanceObject = new Instance({
          position: { x: x, y: y },
          size: { width: 80, height: 30 },
          name: ''
        });

        return newInstanceObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addActiveObject button.

      @method actions.addActiveObject
      @param {jQuery.Event} e event.
     */
    addActiveObject(e) {
      this.createObjectData((function(x, y) {
        let newActiveObject = new ActiveObject({
          position: { x: x, y: y },
          size: { width: 80, height: 30 },
          name: ''
        });

        return newActiveObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addMultiObject button.

      @method actions.addMultiObject
      @param {jQuery.Event} e event.
     */
    addMultiObject(e) {
      this.createObjectData((function(x, y) {
        let newMultiObject = new MultiObject({
          position: { x: x, y: y },
          size: { width: 80, height: 30 },
          name: ''
        });

        return newMultiObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addPropertyObject button.

      @method actions.addPropertyObject
      @param {jQuery.Event} e event.
     */
    addPropertyObject(e) {
      this.createObjectData((function(x, y) {
        let newPropertyObject = new PropertyObject({
          position: { x: x, y: y },
          size: { width: 80, height: 40 },
          name: ''
        });

        return newPropertyObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addNaryAssociation button.

      @method actions.addNaryAssociation
      @param {jQuery.Event} e event.
     */
    addNaryAssociation(e) {
      this.createObjectData((function(x, y) {
        let newNAryAssociationObject = new NAryAssociation({
          position: { x: x, y: y },
          size: { width: 40, height: 40 },
          name: ''
        });

        return newNAryAssociationObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addNaryAssociationConnector button.

      @method actions.addNaryAssociationConnector
      @param {jQuery.Event} e event.
     */
    addNaryAssociationConnector(e) {
      this.createLinkData((function(linkProperties) {
        let newNaryAssociationConnectorObject = new Association({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newNaryAssociationConnectorObject;
      }).bind(this), e, {
        start: Ember.A(['flexberry.uml.NAryAssociation']),
        end: Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass', 'flexberry.uml.Instance'])
      });
    },

    /**
      Handler for click on addQualifiedLink button.

      @method actions.addQualifiedLink
      @param {jQuery.Event} e event.
     */
    addQualifiedLink(e) {
      this.createLinkData((function(linkProperties) {
        let newQualifiedAssociationObject = new QualifiedAssociation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newQualifiedAssociationObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addQualifiedCompositionLink button.

      @method actions.addQualifiedCompositionLink
      @param {jQuery.Event} e event.
     */
    addQualifiedCompositionLink(e) {
      this.createLinkData((function(linkProperties) {
        let newQualifiedCompositionObject = new QualifiedComposition({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newQualifiedCompositionObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addQualifiedAggregationLink button.

      @method actions.addQualifiedAggregationLink
      @param {jQuery.Event} e event.
     */
    addQualifiedAggregationLink(e) {
      this.createLinkData((function(linkProperties) {
        let newQualifiedAggregationObject = new QualifiedAggregation({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newQualifiedAggregationObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addMoreClasses button.

      @method actions.addMoreClasses
      @param {jQuery.Event} e event.
     */
    addMoreClasses(e) {
      this.createObjectData((function(x, y) {
        let newMoreClassesObject = new MoreClasses({
          position: { x: x, y: y },
        });

        return newMoreClassesObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addPackege button.

      @method actions.addPackege
      @param {jQuery.Event} e event.
     */
    addPackege(e) {
      this.createObjectData((function(x, y) {
        let newPackageObject = new Package({
          position: { x: x, y: y },
          size: { width: 60, height: 40 },
          name: '',
          attributes: ''
        });

        return newPackageObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addObjectAssociation button.

      @method actions.addObjectAssociation
      @param {jQuery.Event} e event.
     */
    addObjectAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let newDependencyObject = new Association({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newDependencyObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Instance', 'flexberry.uml.PropertyObject']));
    }
  }
});
