import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import {
  Model as DevUMLADMixin,
  defineBaseModel
} from
  '../mixins/regenerated/models/fd-dev-uml-ad';
import ADModel from './fd-ad';

import FdUmlDecision from '../objects/uml-primitives/fd-uml-decision';
import FdUmlActiveState from '../objects/uml-primitives/fd-uml-active-state';
import FdUmlStartState from '../objects/uml-primitives/fd-uml-start-state';
import FdUmlFinalState from '../objects/uml-primitives/fd-uml-final-state';
import FdUmlComplexTransition from '../objects/uml-primitives/fd-uml-complex-transition';
import FdUmlObjectInState from '../objects/uml-primitives/fd-uml-object-in-state';
import FdUmlSignalReceipt from '../objects/uml-primitives/fd-uml-signal-receipt';
import FdUmlSignalSend from '../objects/uml-primitives/fd-uml-signal-send';
import FdUmlTransition from '../objects/uml-primitives/fd-uml-transition';
import FdUmlObjectFlow from '../objects/uml-primitives/fd-uml-object-flow';
import FdUmlPartition from '../objects/uml-primitives/fd-uml-partition';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlSwimlineSeparator from '../objects/uml-primitives/fd-uml-swimline-separator';

let Model = ADModel.extend(DevUMLADMixin, {
  /**
      The array of primitives of this diagram.

      @property primitives
      @type Ember.Array
    */
  primitives: computed('primitivesJsonString', function () {
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
      case 'STORMCASE.UML.ad.Decision, UMLAD':
        return FdUmlDecision.create({ primitive });

      case 'STORMCASE.UML.ad.State, UMLAD':
        return FdUmlActiveState.create({ primitive });

      case 'STORMCASE.UML.ad.StartState, UMLAD':
        return FdUmlStartState.create({ primitive });

      case 'STORMCASE.UML.ad.FinalState, UMLAD':
        return FdUmlFinalState.create({ primitive });

      case 'STORMCASE.UML.ad.ComplexTransitionH, UMLAD':
        return FdUmlComplexTransition.create({ primitive });

      case 'STORMCASE.UML.ad.ComplexTransitionV, UMLAD':
        return FdUmlComplexTransition.create({ primitive });

      case 'STORMCASE.UML.ad.ObjectInState, UMLAD':
        return FdUmlObjectInState.create({ primitive });

      case 'STORMCASE.UML.ad.SignalReceiptLeft, UMLAD':
        return FdUmlSignalReceipt.create({ primitive });

      case 'STORMCASE.UML.ad.SignalReceiptRight, UMLAD':
        return FdUmlSignalReceipt.create({ primitive });

      case 'STORMCASE.UML.ad.SignalSendLeft, UMLAD':
        return FdUmlSignalSend.create({ primitive });

      case 'STORMCASE.UML.ad.SignalSendRight, UMLAD':
        return FdUmlSignalSend.create({ primitive });

      case 'STORMCASE.UML.ad.Transition, UMLAD':
        return FdUmlTransition.create({ primitive });

      case 'STORMCASE.UML.ad.ObjectFlow, UMLAD':
        return FdUmlObjectFlow.create({ primitive });

      case 'STORMCASE.UML.ad.Partition, UMLAD':
        return FdUmlPartition.create({ primitive });

      case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
        return FdUmlNoteConnector.create({ primitive });

      case 'STORMCASE.UML.Common.Note, UMLCommon':
        return FdUmlNote.create({ primitive });

      case 'STORMCASE.UML.ad.ConcurrentStateH, UMLAD':
        return FdUmlSwimlineSeparator.create({ primitive });

      case 'STORMCASE.UML.ad.ConcurrentStateV, UMLAD':
        return FdUmlSwimlineSeparator.create({ primitive });

      default:
        /* TODO: throw */ new Error(`Unknown primitive type: '${primitive.$type}'.`);
        return;
    }
  }

});

defineBaseModel(Model);

export default Model;
