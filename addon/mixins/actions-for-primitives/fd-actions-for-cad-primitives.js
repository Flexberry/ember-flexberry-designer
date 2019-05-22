import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { A, isArray } from '@ember/array';
import uuid from 'npm:node-uuid';

import FdUmlClass from '../../objects/uml-primitives/fd-uml-class';
import FdUmlAssociation from '../../objects/uml-primitives/fd-uml-association';
import FdUmlAggregation from '../../objects/uml-primitives/fd-uml-aggregation';
import FdUmlComposition from '../../objects/uml-primitives/fd-uml-composition';
import FdUmlGeneralization from '../../objects/uml-primitives/fd-uml-generalization';
import FdUmlRealization from '../../objects/uml-primitives/fd-uml-realization';
import FdUmlNestedClassAssociation from '../../objects/uml-primitives/fd-uml-nested-association';
import FdUmlTemplateClass from '../../objects/uml-primitives/fd-uml-template-class';
import FdUmlInstance from '../../objects/uml-primitives/fd-uml-instance';
import FdUmlActiveObject from '../../objects/uml-primitives/fd-uml-active-object';
import FdUmlMultiObject from '../../objects/uml-primitives/fd-uml-multi-object';
import FdUmlPropertyObject from '../../objects/uml-primitives/fd-uml-property-object';
import FdUmlNAryAssociation from '../../objects/uml-primitives/fd-uml-naryassociation';
import FdUmlQualifiedAssociation from '../../objects/uml-primitives/fd-uml-qualified-association';
import FdUmlQualifiedComposition from '../../objects/uml-primitives/fd-uml-qualified-composition';
import FdUmlQualifiedAggregation from '../../objects/uml-primitives/fd-uml-qualified-aggregation';
import FdUmlMoreClasses from '../../objects/uml-primitives/fd-uml-more-classes';
import FdUmlPackage from '../../objects/uml-primitives/fd-uml-package';
import FdUmlObjectAssociation from '../../objects/uml-primitives/fd-uml-object-association';
import FdUmlNAryAssociationConnector from '../../objects/uml-primitives/fd-uml-naryassociation-connector';
import FdUmlDependency from '../../objects/uml-primitives/fd-uml-dependency';
import { findFreeNodeTreeNameIndex } from '../../utils/fd-metods-for-tree';
import { getJsonForClass, getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on cad diagrams.

  @class FdActionsForCadPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
  */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Add new object to diagram's primitives.

    @method _addToPrimitives
    @param {Object} umlClass
   */
  _addToPrimitives(umlClass) {
    if (!umlClass) {
      return;
    }

    let primitives = this.get('model.primitives');
    if (isArray(primitives)) {
      primitives.pushObject(umlClass);
    } else {
      this.set('model.primitives', A([ umlClass ]));
    }
  },

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
          attributesStr: '',
          methodsStr: '',
        });
        newClass.incrementProperty('referenceCount');
        let umlClass = FdUmlClass.create({ primitive: getJsonForClass(newClass, null, 0, { location: { X, Y } }), isCreated: true });

        this._addToPrimitives(umlClass);

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
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.Association, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', StartMultTxt: '', EndMultTxt: '', StartRoleTxt: '', EndRoleTxt: '' },
          { NamePos: 0.0, InitialMultiplicity: 1.0 }
        );

        let associationObject = FdUmlAssociation.create({ primitive: jsonObject });
        associationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(associationObject);

        let newAssociation = associationObject.JointJS();
        newAssociation.setLabelText('startMultiplicity', '1');
        newAssociation.setLabelText('endMultiplicity', '*');

        return newAssociation;
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass', 'flexberry.uml.ClassCollapsed']), function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let endClass = this.getRepObj(store, stage, linkProperties.endClassRepObj.id, 'fd-dev-class');
        let startClass = this.getRepObj(store, stage, linkProperties.startClassRepObj.id, 'fd-dev-class');

        if (isNone(endClass) || isNone(startClass)) {
          return null;
        }

        let id = uuid.v4();
        let newAssociation = store.createRecord('fd-dev-association', {
          id: id,
          endClass: endClass,
          startClass: startClass,
          stage: stage,
          startMultiplicity: '1',
          endMultiplicity: '*'
        });
        newAssociation.incrementProperty('referenceCount');

        return newAssociation;
      }.bind(this));
    },

    /**
      Handler for click on addAggregation button.

      @method actions.addAggregation
      @param {jQuery.Event} e event.
     */
    addAggregation(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.Aggregation, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', StartMultTxt: '', EndMultTxt: '', StartRoleTxt: '', EndRoleTxt: '' },
          { NamePos: 0.0 }
        );

        let aggregationObject = FdUmlAggregation.create({ primitive: jsonObject });
        aggregationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(aggregationObject);

        let newAggregation = aggregationObject.JointJS();
        newAggregation.setLabelText('startMultiplicity', '1');
        newAggregation.setLabelText('endMultiplicity', '*');

        return newAggregation;
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addComposition button.

      @method actions.addComposition
      @param {jQuery.Event} e event.
     */
    addComposition(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.Composition, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', StartMultTxt: '', EndMultTxt: '', StartRoleTxt: '', EndRoleTxt: '' },
          { NamePos: 0.0, InitialMultiplicity: 1.0 }
        );

        let compositionObject = FdUmlComposition.create({ primitive: jsonObject });
        compositionObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(compositionObject);

        let newComposition = compositionObject.JointJS();
        newComposition.setLabelText('startMultiplicity', '1');
        newComposition.setLabelText('endMultiplicity', '*');

        return newComposition;
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']), function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let endClass = this.getRepObj(store, stage, linkProperties.endClassRepObj.id, 'fd-dev-class');
        let startClass = this.getRepObj(store, stage, linkProperties.startClassRepObj.id, 'fd-dev-class');

        if (isNone(endClass) || isNone(startClass)) {
          return null;
        }

        let id = uuid.v4();
        let newComposition = store.createRecord('fd-dev-aggregation', {
          id: id,
          endClass: endClass,
          startClass: startClass,
          stage: stage,
          startMultiplicity: '1',
          endMultiplicity: '*'
        });
        newComposition.incrementProperty('referenceCount');

        return newComposition;
      }.bind(this));
    },

    /**
      Handler for click on addInheritance button.

      @method actions.addInheritance
      @param {jQuery.Event} e event.
     */
    addInheritance(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.Inheritance, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let inheritanceObject = FdUmlGeneralization.create({ primitive: jsonObject });
        inheritanceObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(inheritanceObject);

        return inheritanceObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']), function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let childClass = this.getRepObj(store, stage, linkProperties.endClassRepObj.id, 'fd-dev-class');
        let parentClass = this.getRepObj(store, stage, linkProperties.startClassRepObj.id, 'fd-dev-class');

        if (isNone(childClass) || isNone(parentClass)) {
          return null;
        }

        let id = uuid.v4();
        let newInheritance = store.createRecord('fd-dev-inheritance', {
          id: id,
          child: childClass,
          parent: parentClass,
          stage: stage,
        });
        newInheritance.incrementProperty('referenceCount');

        return newInheritance;
      }.bind(this));
    },

    /**
      Handler for click on addRealization button.

      @method actions.addRealization
      @param {jQuery.Event} e event.
     */
    addRealization(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.Realization, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null
        );

        let realizationObject = FdUmlRealization.create({ primitive: jsonObject });
        realizationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(realizationObject);

        return realizationObject.JointJS();
      }).bind(this), e, {
        start: A(['flexberry.uml.NAryAssociation']),
        end: A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass'])
      });
    },

    /**
      Handler for click on addNestedClassAssociation button.

      @method actions.addNestedClassAssociation
      @param {jQuery.Event} e event.
     */
    addNestedClassAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.NestedClassAssoc, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let nestedClassAssociationObject = FdUmlNestedClassAssociation.create({ primitive: jsonObject });
        nestedClassAssociationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(nestedClassAssociationObject);

        return nestedClassAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addTemplateClass button.

      @method actions.addTemplateClass
      @param {jQuery.Event} e event.
     */
    addTemplateClass(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.TemplateClass, UMLCAD',
          { x, y },
          { width: 150, height: 40 },
          { Name: '', AttributesTxt: '', MethodsTxt: '', StereotypeTxt: '', TemplateTxt: '' },
          { InitialFolded: false, Folded: false }
        );
        let templateClass = FdUmlTemplateClass.create({ primitive: jsonObject });

        this._addToPrimitives(templateClass);

        return templateClass.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addInstance button.

      @method actions.addInstance
      @param {jQuery.Event} e event.
     */
    addInstance(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.Instance, UMLCAD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '' }
        );
        let instance = FdUmlInstance.create({ primitive: jsonObject });

        this._addToPrimitives(instance);

        return instance.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addActiveObject button.

      @method actions.addActiveObject
      @param {jQuery.Event} e event.
     */
    addActiveObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.ActiveObject, UMLCAD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '' }
        );
        let activeObject = FdUmlActiveObject.create({ primitive: jsonObject });

        this._addToPrimitives(activeObject);

        return activeObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addMultiObject button.

      @method actions.addMultiObject
      @param {jQuery.Event} e event.
     */
    addMultiObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.MultiObject, UMLCAD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '' }
        );
        let multiObject = FdUmlMultiObject.create({ primitive: jsonObject });

        this._addToPrimitives(multiObject);

        return multiObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addPropertyObject button.

      @method actions.addPropertyObject
      @param {jQuery.Event} e event.
     */
    addPropertyObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.PropertyObject, UMLCAD',
          { x, y },
          { width: 80, height: 40 },
          { Name: '', Prop: '' }
        );
        let propertyObject = FdUmlPropertyObject.create({ primitive: jsonObject });

        this._addToPrimitives(propertyObject);

        return propertyObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addNaryAssociation button.

      @method actions.addNaryAssociation
      @param {jQuery.Event} e event.
     */
    addNaryAssociation(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.NarLink, UMLCAD',
          { x, y },
          { width: 40, height: 40 },
          { Name: '' }
        );
        let naryAssociation = FdUmlNAryAssociation.create({ primitive: jsonObject });

        this._addToPrimitives(naryAssociation);

        return naryAssociation.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addNaryAssociationConnector button.

      @method actions.addNaryAssociationConnector
      @param {jQuery.Event} e event.
     */
    addNaryAssociationConnector(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.NaryLink, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' }
        );

        let naryAssociationConnectorObject = FdUmlNAryAssociationConnector.create({ primitive: jsonObject });
        naryAssociationConnectorObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(naryAssociationConnectorObject);

        return naryAssociationConnectorObject.JointJS();
      }).bind(this), e, {
        start: A(['flexberry.uml.NAryAssociation']),
        end: A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass', 'flexberry.uml.Instance'])
      });
    },

    /**
      Handler for click on addQualifiedLink button.

      @method actions.addQualifiedLink
      @param {jQuery.Event} e event.
     */
    addQualifiedLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.QualifiedLink, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '', QualifiedText: '' },
          { NamePos: 0.0 }
        );

        let qualifiedAssociationObject = FdUmlQualifiedAssociation.create({ primitive: jsonObject });
        qualifiedAssociationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(qualifiedAssociationObject);

        return qualifiedAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addQualifiedCompositionLink button.

      @method actions.addQualifiedCompositionLink
      @param {jQuery.Event} e event.
     */
    addQualifiedCompositionLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.QualifiedCompositionLink, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '', QualifiedText: '' },
          { NamePos: 0.0 }
        );

        let qualifiedCompositionObject = FdUmlQualifiedComposition.create({ primitive: jsonObject });
        qualifiedCompositionObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(qualifiedCompositionObject);

        return qualifiedCompositionObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addQualifiedAggregationLink button.

      @method actions.addQualifiedAggregationLink
      @param {jQuery.Event} e event.
     */
    addQualifiedAggregationLink(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.QualifiedAggregationLink, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '', QualifiedText: '' },
          { NamePos: 0.0 }
        );

        let qualifiedAggregationObject = FdUmlQualifiedAggregation.create({ primitive: jsonObject });
        qualifiedAggregationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(qualifiedAggregationObject);

        return qualifiedAggregationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass']));
    },

    /**
      Handler for click on addMoreClasses button.

      @method actions.addMoreClasses
      @param {jQuery.Event} e event.
     */
    addMoreClasses(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.MoreClasses, UMLCAD',
          { x, y },
          { width: 50, height: 20 }
        );
        let moreClassesObject = FdUmlMoreClasses.create({ primitive: jsonObject });

        this._addToPrimitives(moreClassesObject);

        return moreClassesObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addDependency button.

      @method actions.addDependency
      @param {jQuery.Event} e event.
     */
    addDependency(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.Dependency, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let dependencyObject = FdUmlDependency.create({ primitive: jsonObject });
        dependencyObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(dependencyObject);

        return dependencyObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass', 'flexberry.uml.Instance',
       'flexberry.uml.ActiveObject', 'flexberry.uml.PropertyObject', 'flexberry.uml.MultiObject', 'flexberry.uml.Package']));
    },

    /**
      Handler for click on addPackage button.

      @method actions.addPackage
      @param {jQuery.Event} e event.
     */
    addPackage(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.cad.Package, UMLCAD',
          { x, y },
          { width: 60, height: 40 },
          { Name: '', Prop: '' }
        );
        let packageObject = FdUmlPackage.create({ primitive: jsonObject });

        this._addToPrimitives(packageObject);

        return packageObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addObjectAssociation button.

      @method actions.addObjectAssociation
      @param {jQuery.Event} e event.
     */
    addObjectAssociation(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.cad.ObjectAssociation, UMLCAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '' },
          { NamePos: 0.0 }
        );

        let objectAssociationObject = FdUmlObjectAssociation.create({ primitive: jsonObject });
        objectAssociationObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(objectAssociationObject);

        return objectAssociationObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Instance', 'flexberry.uml.PropertyObject']));
    }
  }
});
