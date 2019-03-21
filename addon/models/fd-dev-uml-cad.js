import Ember from 'ember';

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
import FdUmlLinkConnector from '../objects/uml-primitives/fd-uml-link-connector';

import uuid from 'npm:node-uuid';

let Model = CADModel.extend(DevUMLCADMixin, {
  /**
    The array of primitives of this diagram.

    @property primitives
    @type Ember.Array
  */
  primitives: Ember.computed('primitivesJsonString', function() {
    let result = Ember.A();
    let primitives = JSON.parse(this.get('primitivesJsonString')) || [];
    primitives = this._addConnector(primitives);

    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      switch (primitive.$type) {
        case 'STORMCASE.UML.Common.Note, UMLCommon':
          result.pushObject(FdUmlNote.create({ primitive }));
          break;

        case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
          result.pushObject(FdUmlClass.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
          result.pushObject(FdUmlNoteConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Association, UMLCAD':
          result.pushObject(FdUmlAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.ObjectAssociation, UMLCAD':
          result.pushObject(FdUmlObjectAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.NaryLink, UMLCAD':
          result.pushObject(FdUmlNAryAssociationConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.QualifiedAggregationLink, UMLCAD':
          result.pushObject(FdUmlQAggregation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Composition, UMLCAD':
          result.pushObject(FdUmlComposition.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
          result.pushObject(FdUmlGeneralization.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.PropertyObject, UMLCAD':
          result.pushObject(FdUmlPropertyObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.MultiObject, UMLCAD':
          result.pushObject(FdUmlMultiObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Instance, UMLCAD':
          result.pushObject(FdUmlInstance.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.MoreClasses, UMLCAD':
          result.pushObject(FdUmlMoreClasses.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.NarLink, UMLCAD':
          result.pushObject(FdUmlNAryAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.ActiveObject, UMLCAD':
          result.pushObject(FdUmlActiveObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.TemplateClass, UMLCAD':
          result.pushObject(FdUmlTemplateClass.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Package, UMLCAD':
          result.pushObject(FdUmlPackage.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.NestedClassAssoc, UMLCAD':
          result.pushObject(FdUmlNestedAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Aggregation, UMLCAD':
          result.pushObject(FdUmlAggregation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Dependency, UMLCAD':
          result.pushObject(FdUmlDependency.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.QualifiedLink, UMLCAD':
          result.pushObject(FdUmlQAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.QualifiedCompositionLink, UMLCAD':
          result.pushObject(FdUmlQComposition.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Realization, UMLCAD':
          result.pushObject(FdUmlRealization.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.LinkConnector, UMLCAD':
          result.pushObject(FdUmlLinkConnector.create({ primitive }));
          break;

        default:
          throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
      }
    }

    return result;
  }),

  _addConnector: function(primitives) {
    let elements = {};
    let links = [];
    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      elements[primitive.$id] = primitive;
      if (primitive.$type === 'STORMCASE.UML.cad.Inheritance, UMLCAD') {
        links.push(primitive);
      }
    }

    let linkTree = {};
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      let startPrimitiveId = link.StartPrimitive.$ref;
      let startPrimitive = elements[startPrimitiveId];
      if (startPrimitive.$type === 'STORMCASE.UML.cad.Inheritance, UMLCAD') {
        let parentId = startPrimitive.StartPrimitive.$ref;
        if (!(parentId in linkTree)) {
          linkTree[parentId] = {};
        }

        if (!(startPrimitiveId in linkTree[parentId])) {
          linkTree[parentId][startPrimitiveId] = [];
        }

        linkTree[parentId][startPrimitiveId].push(link.$id);
      }

    }

    let linkConnectorWidth = 20;
    let linkConnectorHeight = 20;
    for (let parentClassId in linkTree) {
      for (let baseLinkId in linkTree[parentClassId]) {
        let baseLink = elements[baseLinkId];
        let linkConnectorUuid = '{' + uuid.v4() + '}';
        let linkConnector = {
          '$id': linkConnectorUuid,
          '$type': 'STORMCASE.UML.cad.LinkConnector, UMLCAD',
          'Name': {
            'Text': 'LinkConnector'
          },
          'Location': {
            '$type': 'System.Drawing.Point, System.Drawing',
            'IsEmpty': false,
            'X': -1,
            'Y': -1
          },
          'Size': {
            '$type': 'System.Drawing.Size, System.Drawing',
            'IsEmpty': false,
            'Width': linkConnectorWidth,
            'Height': linkConnectorHeight
          }
        };
        baseLink.StartPrimitive.$ref = linkConnectorUuid;
        baseLink.StartLE.Primitive.$ref = linkConnectorUuid;
        let parentLinkUuid = '{' + uuid.v4() + '}';
        let parentLink = {
          '$id': parentLinkUuid,
          '$type': 'STORMCASE.UML.cad.Inheritance, UMLCAD',
          'StartPrimitive': {
            '$ref': parentClassId
          },
          'EndPrimitive': {
            '$ref': linkConnectorUuid
          },
          'Points': [
          ]
        };
        elements[parentLinkUuid] = parentLink;
        for (let i = 0; i < linkTree[parentClassId][baseLinkId].length; i++) {
          let linkId = linkTree[parentClassId][baseLinkId][i];
          let link = elements[linkId];
          if (i === 0) {
            linkConnector.Location.X = link.StartPoint.X - linkConnectorWidth / 2;
            linkConnector.Location.Y = link.StartPoint.Y - linkConnectorHeight / 2;
          }

          link.StartPrimitive.$ref = linkConnectorUuid;
          link.StartLE.Primitive.$ref = linkConnectorUuid;
        }

        elements[linkConnectorUuid] = linkConnector;
      }
    }

    primitives = [];
    for (let elementUuid in elements) {
      primitives.push(elements[elementUuid]);
    }

    return primitives;
  }

});

defineBaseModel(Model);

defineProjections(Model);

export default Model;
