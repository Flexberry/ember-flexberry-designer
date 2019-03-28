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
import FdUmlGeneralization from '../objects/uml-primitives/fd-uml-generalization';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlQAggregation from '../objects/uml-primitives/fd-uml-qualified-aggregation';
import FdUmlQComposition from '../objects/uml-primitives/fd-uml-qualified-composition';
import FdUmlQAssociation from '../objects/uml-primitives/fd-uml-qualified-association';
import FdUmlAssociation from '../objects/uml-primitives/fd-uml-association';
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
    let primitives = JSON.parse(this.get('primitivesJsonString')) || A();

    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      switch (primitive.$type) {
        case 'STORMCASE.UML.cod.ActiveObject, UMLCOD':
          result.pushObject(FdUmlActiveObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.NarLink, UMLCOD':
          result.pushObject(FdUmlNAryAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.Instance, UMLCOD':
          result.pushObject(FdUmlInstance.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.MultiObject, UMLCOD':
          result.pushObject(FdUmlMultiObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.Note, UMLCommon':
          result.pushObject(FdUmlNote.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.Inheritance, UMLCOD':
          result.pushObject(FdUmlGeneralization.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
          result.pushObject(FdUmlNoteConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.QualifiedAggregationLink, UMLCOD':
          result.pushObject(FdUmlQAggregation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.QualifiedCompositionLink, UMLCOD':
          result.pushObject(FdUmlQComposition.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.QualifiedLink, UMLCOD':
          result.pushObject(FdUmlQAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.NaryLink, UMLCOD':
          result.pushObject(FdUmlAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.AggregationLink, UMLCOD':
          result.pushObject(FdUmlAggregationLink.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.Link, UMLCOD':
          result.pushObject(FdUmlAssociationLink.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.CompositionLink, UMLCOD':
          result.pushObject(FdUmlCompositionLink.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.DesignPatternConnector, UMLCOD':
          result.pushObject(FdUmlDesignPatternConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.DesignPattern, UMLCOD':
          result.pushObject(FdUmlDesignPattern.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.Actor, UMLCOD':
          result.pushObject(FdUmlUsecaseActor.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.ForwardFlatMessage, UMLCOD':
          result.pushObject(FdUmlForwardFlatMessage.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.ForwardNestedMessage, UMLCOD':
          result.pushObject(FdUmlForwardNestedMessage.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.ForwardAsyncMessage, UMLCOD':
          result.pushObject(FdUmlForwardAsyncMessage.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.BackwardNestedMessage, UMLCOD':
          result.pushObject(FdUmlBackwardNestedMessage.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.BackwardFlatMessage, UMLCOD':
          result.pushObject(FdUmlBackwardFlatMessage.create({ primitive }));
          break;

        case 'STORMCASE.UML.cod.BackwardAsyncMessage, UMLCOD':
          result.pushObject(FdUmlBackwardAsyncMessage.create({ primitive }));
          break;

        default:
          throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
      }
    }

    return result;
  }),
});
defineBaseModel(Model);
export default Model;
