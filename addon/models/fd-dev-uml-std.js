import Ember from 'ember';
import { Model as DevUMLSTDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-std';
import STDModel from './fd-std';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlStateEx from '../objects/uml-primitives/fd-uml-state-ex';
import FdUmlActiveState from '../objects/uml-primitives/fd-uml-active-state';
import FdUmlComplexTransition from '../objects/uml-primitives/fd-uml-complex-transition';
import FdUmlTransition from '../objects/uml-primitives/fd-uml-transition';
import FdUmlHistory from '../objects/uml-primitives/fd-uml-history';
import FdUmlStartState from '../objects/uml-primitives/fd-uml-start-state';
import FdUmlFinalState from '../objects/uml-primitives/fd-uml-final-state';

let Model = STDModel.extend(DevUMLSTDMixin, {
  /**
    The array of primitives of this diagram.

    @property primitives
    @type Ember.Array
  */
  primitives: Ember.computed('primitivesJsonString', function() {
    let result = Ember.A();
    let primitives = JSON.parse(this.get('primitivesJsonString'));

    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      switch (primitive.$type) {
        case 'STORMCASE.UML.Common.Note, UMLCommon':
          result.pushObject(FdUmlNote.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
          result.pushObject(FdUmlNoteConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.CompositeState, UMLSTD':
        case 'STORMCASE.UML.std.StateEx, UMLSTD':
          result.pushObject(FdUmlStateEx.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.Class, UMLSTD':
        case 'STORMCASE.UML.std.State, UMLSTD':
          result.pushObject(FdUmlActiveState.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.ComplexTransitionV, UMLSTD':
        case 'STORMCASE.UML.std.ComplexTransitionH, UMLSTD':
          result.pushObject(FdUmlComplexTransition.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.Transition, UMLSTD':
          result.pushObject(FdUmlTransition.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.DeepHistory, UMLSTD':
        case 'STORMCASE.UML.std.History, UMLSTD':
          result.pushObject(FdUmlHistory.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.StartState, UMLSTD':
          result.pushObject(FdUmlStartState.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.FinalState, UMLSTD':
          result.pushObject(FdUmlFinalState.create({ primitive }));
          break;

        case 'STORMCASE.UML.std.EventMessage, UMLSTD': // TODO need fix primitive EventMessage 169738
          break;

        case 'STORMCASE.UML.std.ConcurrentState, UMLSTD': // TODO need create primitive ConcurrentState 169738
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
