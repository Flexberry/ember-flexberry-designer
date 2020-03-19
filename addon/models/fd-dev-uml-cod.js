import { computed } from '@ember/object';
import { A } from '@ember/array';
import { Model as DevUMLCODMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-cod';
import CODModel from './fd-cod';

import FdUmlActiveObject from '../objects/uml-primitives/fd-uml-active-object';
import FdUmlNAryAssociation from '../objects/uml-primitives/fd-uml-naryassociation';
import FdUmlInstance from '../objects/uml-primitives/fd-uml-instance';
import FdUmlMultiObject from '../objects/uml-primitives/fd-uml-multi-object';
import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlGeneralizationCod from '../objects/uml-primitives/fd-uml-generalization-cod';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlQAggregation from '../objects/uml-primitives/fd-uml-qualified-aggregation';
import FdUmlQComposition from '../objects/uml-primitives/fd-uml-qualified-composition';
import FdUmlQAssociation from '../objects/uml-primitives/fd-uml-qualified-association';
import FdUmlNAryAssociationConnector from '../objects/uml-primitives/fd-uml-naryassociation-connector';
import FdUmlAggregationLink from '../objects/uml-primitives/fd-uml-aggregation-link';
import FdUmlAssociationLink from '../objects/uml-primitives/fd-uml-association-link';
import FdUmlCompositionLink from '../objects/uml-primitives/fd-uml-composition-link';
import FdUmlDesignPatternConnector from '../objects/uml-primitives/fd-uml-design-pattern-connector';
import FdUmlDesignPattern from '../objects/uml-primitives/fd-uml-design-pattern';
import FdUmlUsecaseActor from '../objects/uml-primitives/fd-uml-usecase-actor';
import FdUmlForwardFlatMessage from '../objects/uml-primitives/fd-uml-forward-flat-message';
import FdUmlForwardNestedMessage from '../objects/uml-primitives/fd-uml-forward-nested-message';
import FdUmlForwardAsyncMessage from '../objects/uml-primitives/fd-uml-forward-async-message';
import FdUmlBackwardNestedMessage from '../objects/uml-primitives/fd-uml-backward-nested-message';
import FdUmlBackwardFlatMessage from '../objects/uml-primitives/fd-uml-backward-flat-message';
import FdUmlBackwardAsyncMessage from '../objects/uml-primitives/fd-uml-backward-async-message';

let Model = CODModel.extend(DevUMLCODMixin, {

  /**
    The array of primitives of this diagram.

    @property primitives
    @type Ember.Array
  */
  primitives: computed('primitivesJsonString', function() {
    let result = A();
    let primitives = this.getPrimitives();

    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
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
      case 'STORMCASE.UML.cod.ActiveObject, UMLCOD':
        return FdUmlActiveObject.create({ primitive });

      case 'STORMCASE.UML.cod.NarLink, UMLCOD':
        return FdUmlNAryAssociation.create({ primitive });

      case 'STORMCASE.UML.cod.Instance, UMLCOD':
        return FdUmlInstance.create({ primitive });

      case 'STORMCASE.UML.cod.MultiObject, UMLCOD':
        return FdUmlMultiObject.create({ primitive });

      case 'STORMCASE.UML.Common.Note, UMLCommon':
        return FdUmlNote.create({ primitive });

      case 'STORMCASE.UML.cod.Inheritance, UMLCOD':
        return FdUmlGeneralizationCod.create({ primitive });

      case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
        return FdUmlNoteConnector.create({ primitive });

      case 'STORMCASE.UML.cod.QualifiedAggregationLink, UMLCOD':
        return FdUmlQAggregation.create({ primitive });

      case 'STORMCASE.UML.cod.QualifiedCompositionLink, UMLCOD':
        return FdUmlQComposition.create({ primitive });

      case 'STORMCASE.UML.cod.QualifiedLink, UMLCOD':
        return FdUmlQAssociation.create({ primitive });

      case 'STORMCASE.UML.cod.NaryLink, UMLCOD':
        return FdUmlNAryAssociationConnector.create({ primitive });

      case 'STORMCASE.UML.cod.AggregationLink, UMLCOD':
        return FdUmlAggregationLink.create({ primitive });

      case 'STORMCASE.UML.cod.Link, UMLCOD':
        return FdUmlAssociationLink.create({ primitive });

      case 'STORMCASE.UML.cod.CompositionLink, UMLCOD':
        return FdUmlCompositionLink.create({ primitive });

      case 'STORMCASE.UML.cod.DesignPatternConnector, UMLCOD':
        return FdUmlDesignPatternConnector.create({ primitive });

      case 'STORMCASE.UML.cod.DesignPattern, UMLCOD':
        return FdUmlDesignPattern.create({ primitive });

      case 'STORMCASE.UML.cod.Actor, UMLCOD':
        return FdUmlUsecaseActor.create({ primitive });

      case 'STORMCASE.UML.cod.ForwardFlatMessage, UMLCOD':
        return FdUmlForwardFlatMessage.create({ primitive });

      case 'STORMCASE.UML.cod.ForwardNestedMessage, UMLCOD':
        return FdUmlForwardNestedMessage.create({ primitive });

      case 'STORMCASE.UML.cod.ForwardAsyncMessage, UMLCOD':
        return FdUmlForwardAsyncMessage.create({ primitive });

      case 'STORMCASE.UML.cod.BackwardNestedMessage, UMLCOD':
        return FdUmlBackwardNestedMessage.create({ primitive });

      case 'STORMCASE.UML.cod.BackwardFlatMessage, UMLCOD':
        return FdUmlBackwardFlatMessage.create({ primitive });

      case 'STORMCASE.UML.cod.BackwardAsyncMessage, UMLCOD':
        return FdUmlBackwardAsyncMessage.create({ primitive });

      default:
        throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
    }
  }
});
defineBaseModel(Model);
export default Model;
