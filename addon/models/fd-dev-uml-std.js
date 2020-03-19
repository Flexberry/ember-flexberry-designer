import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { Model as DevUMLSTDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-std';
import STDModel from './fd-std';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlStateEx from '../objects/uml-primitives/fd-uml-state-ex';
import FdUmlStdClass from '../objects/uml-primitives/fd-uml-std-class';
import FdUmlState from '../objects/uml-primitives/fd-uml-state';
import FdUmlComplexTransition from '../objects/uml-primitives/fd-uml-complex-transition';
import FdUmlConnection from '../objects/uml-primitives/fd-uml-connection';
import FdUmlHistory from '../objects/uml-primitives/fd-uml-history';
import FdUmlStartState from '../objects/uml-primitives/fd-uml-start-state';
import FdUmlFinalState from '../objects/uml-primitives/fd-uml-final-state';

let Model = STDModel.extend(DevUMLSTDMixin, {
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
      if (!isNone(umlObject)) {
        result.pushObject(umlObject);
      }
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

      case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
        return FdUmlNoteConnector.create({ primitive });

      case 'STORMCASE.UML.std.CompositeState, UMLSTD':
      case 'STORMCASE.UML.std.StateEx, UMLSTD':
        return FdUmlStateEx.create({ primitive });

      case 'STORMCASE.UML.std.Class, UMLSTD':
        return FdUmlStdClass.create({ primitive });

      case 'STORMCASE.UML.std.State, UMLSTD':
        return FdUmlState.create({ primitive });

      case 'STORMCASE.UML.std.ComplexTransitionV, UMLSTD':
      case 'STORMCASE.UML.std.ComplexTransitionH, UMLSTD':
        return FdUmlComplexTransition.create({ primitive });

      case 'STORMCASE.UML.std.Transition, UMLSTD':
        return FdUmlConnection.create({ primitive });

      case 'STORMCASE.UML.std.DeepHistory, UMLSTD':
      case 'STORMCASE.UML.std.History, UMLSTD':
        return FdUmlHistory.create({ primitive });

      case 'STORMCASE.UML.std.StartState, UMLSTD':
        return FdUmlStartState.create({ primitive });

      case 'STORMCASE.UML.std.FinalState, UMLSTD':
        return FdUmlFinalState.create({ primitive });

      case 'STORMCASE.UML.std.EventMessage, UMLSTD': // TODO need fix primitive EventMessage 169738
        return;

      case 'STORMCASE.UML.std.ConcurrentState, UMLSTD': // TODO need create primitive ConcurrentState 169738
        return;

      default:
        throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
    }
  }
});
defineBaseModel(Model);
export default Model;
