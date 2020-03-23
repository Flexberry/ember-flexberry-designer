import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';

import CADModel from './fd-cad';
import {
  Model as DevUMLCADMixin,
  defineProjections,
  defineBaseModel,
} from '../mixins/regenerated/models/fd-dev-uml-cad';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlClass from '../objects/uml-primitives/fd-uml-class';
import FdUmlMultiObject from '../objects/uml-primitives/fd-uml-multi-object';
import FdUmlInstance from '../objects/uml-primitives/fd-uml-instance';
import FdUmlNAryAssociation from '../objects/uml-primitives/fd-uml-naryassociation';
import FdUmlPropertyObject from '../objects/uml-primitives/fd-uml-property-object';
import FdUmlMoreClasses from '../objects/uml-primitives/fd-uml-more-classes';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlAssociation from '../objects/uml-primitives/fd-uml-association';
import FdUmlComposition from '../objects/uml-primitives/fd-uml-composition';
import FdUmlGeneralization from '../objects/uml-primitives/fd-uml-generalization';
import FdUmlQAggregation from '../objects/uml-primitives/fd-uml-qualified-aggregation';
import FdUmlActiveObject from '../objects/uml-primitives/fd-uml-active-object';
import FdUmlTemplateClass from '../objects/uml-primitives/fd-uml-template-class';
import FdUmlPackage from '../objects/uml-primitives/fd-uml-package';
import FdUmlNestedAssociation from '../objects/uml-primitives/fd-uml-nested-association';
import FdUmlAggregation from '../objects/uml-primitives/fd-uml-aggregation';
import FdUmlDependency from '../objects/uml-primitives/fd-uml-dependency';
import FdUmlQAssociation from '../objects/uml-primitives/fd-uml-qualified-association';
import FdUmlQComposition from '../objects/uml-primitives/fd-uml-qualified-composition';
import FdUmlRealization from '../objects/uml-primitives/fd-uml-realization';
import FdUmlObjectAssociation from '../objects/uml-primitives/fd-uml-object-association';
import FdUmlNAryAssociationConnector from '../objects/uml-primitives/fd-uml-naryassociation-connector';

let Model = CADModel.extend(DevUMLCADMixin, {

  /**
    The array of primitives of this diagram.

    @property primitives
    @type Ember.Array
  */
  primitives: computed('primitivesJsonString', function() {
    let result = A();
    let primitives = this.getPrimitives();
    let elements = {};
    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      elements[primitive.$id] = primitive;
    }
    let linkTypes = {
      'STORMCASE.UML.cad.Inheritance, UMLCAD': {},
      'STORMCASE.UML.cad.Aggregation, UMLCAD': {},
      'STORMCASE.UML.cad.Composition, UMLCAD': {},
      'STORMCASE.UML.cad.Association, UMLCAD': {},
      'STORMCASE.UML.cad.Realization, UMLCAD': {},
      'STORMCASE.UML.Common.NoteConnector, UMLCommon': {}
    };
    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      if ('StartLE' in primitive) {
        let targetId = primitive.StartLE.Primitive.$ref;
        if (targetId) {
          let targetType = elements[targetId].$type;
          primitive.StartLE.refType = (targetType in linkTypes) ? 'Link' : 'Element';
        } else {
          primitive.StartLE.refType = 'Element';
        }
      }

      if ('EndLE' in primitive) {
        let targetId = primitive.EndLE.Primitive.$ref;
        if (targetId) {
          let targetType = elements[targetId].$type;
          primitive.EndLE.refType = (targetType in linkTypes) ? 'Link' : 'Element';
        } else {
          primitive.EndLE.refType = 'Element';
        }
      }

      let umlObject = this.createUmlObject(primitive);
      result.pushObject(umlObject);
    }

    return result;
  }),

  /**
    Create uml object by primitive.

    @method createUmlObject
    @param {Object} primitive primitive uml.
  */
  createUmlObject(primitive) {
    switch (primitive.$type) {
      case 'STORMCASE.UML.Common.Note, UMLCommon':
        return FdUmlNote.create({ primitive });

      case 'STORMCASE.UML.cad.Class, UMLCAD': {
        let classObject = FdUmlClass.create({ primitive, isCreated: isBlank(primitive.Name.Text) });
        classObject.set('primitive.$type', 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin');
        return classObject;
      }
      case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
        return FdUmlClass.create({ primitive, isCreated: isBlank(primitive.Name.Text) });

      case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
        return FdUmlNoteConnector.create({ primitive });

      case 'STORMCASE.UML.cad.Association, UMLCAD':
        return FdUmlAssociation.create({ primitive });

      case 'STORMCASE.UML.cad.ObjectAssociation, UMLCAD':
        return FdUmlObjectAssociation.create({ primitive });

      case 'STORMCASE.UML.cad.NaryLink, UMLCAD':
        return FdUmlNAryAssociationConnector.create({ primitive });

      case 'STORMCASE.UML.cad.QualifiedAggregationLink, UMLCAD':
        return FdUmlQAggregation.create({ primitive });

      case 'STORMCASE.UML.cad.Composition, UMLCAD':
        return FdUmlComposition.create({ primitive });

      case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
        return FdUmlGeneralization.create({ primitive });

      case 'STORMCASE.UML.cad.PropertyObject, UMLCAD':
        return FdUmlPropertyObject.create({ primitive });

      case 'STORMCASE.UML.cad.MultiObject, UMLCAD':
        return FdUmlMultiObject.create({ primitive });

      case 'STORMCASE.UML.cad.Instance, UMLCAD':
        return FdUmlInstance.create({ primitive });

      case 'STORMCASE.UML.cad.MoreClasses, UMLCAD':
        return FdUmlMoreClasses.create({ primitive });

      case 'STORMCASE.UML.cad.NarLink, UMLCAD':
        return FdUmlNAryAssociation.create({ primitive });

      case 'STORMCASE.UML.cad.ActiveObject, UMLCAD':
        return FdUmlActiveObject.create({ primitive });

      case 'STORMCASE.UML.cad.TemplateClass, UMLCAD':
        return FdUmlTemplateClass.create({ primitive });

      case 'STORMCASE.UML.cad.Package, UMLCAD':
        return FdUmlPackage.create({ primitive });

      case 'STORMCASE.UML.cad.NestedClassAssoc, UMLCAD':
        return FdUmlNestedAssociation.create({ primitive });

      case 'STORMCASE.UML.cad.Aggregation, UMLCAD':
        return FdUmlAggregation.create({ primitive });

      case 'STORMCASE.UML.cad.Dependency, UMLCAD':
        return FdUmlDependency.create({ primitive });

      case 'STORMCASE.UML.cad.QualifiedLink, UMLCAD':
        return FdUmlQAssociation.create({ primitive });

      case 'STORMCASE.UML.cad.QualifiedCompositionLink, UMLCAD':
        return FdUmlQComposition.create({ primitive });

      case 'STORMCASE.UML.cad.Realization, UMLCAD':
        return FdUmlRealization.create({ primitive });

      default:
        throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
    }
  }
});

defineBaseModel(Model);

defineProjections(Model);

export default Model;
