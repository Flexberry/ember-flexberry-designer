import { computed } from '@ember/object';
import { A } from '@ember/array';
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
    let primitives = JSON.parse(this.get('primitivesJsonString')) || A();

    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      switch (primitive.$type) {
        case 'STORMCASE.UML.ad.Decision, UMLAD':
          result.pushObject(FdUmlDecision.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.State, UMLAD':
          result.pushObject(FdUmlActiveState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.StartState, UMLAD':
          result.pushObject(FdUmlStartState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.FinalState, UMLAD':
          result.pushObject(FdUmlFinalState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.ComplexTransitionH, UMLAD':
          result.pushObject(FdUmlComplexTransition.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.ComplexTransitionV, UMLAD':
          result.pushObject(FdUmlComplexTransition.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.ObjectInState, UMLAD':
          result.pushObject(FdUmlObjectInState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.SignalReceiptLeft, UMLAD':
          result.pushObject(FdUmlSignalReceipt.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.SignalReceiptRight, UMLAD':
          result.pushObject(FdUmlSignalReceipt.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.SignalSendLeft, UMLAD':
          result.pushObject(FdUmlSignalSend.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.SignalSendRight, UMLAD':
          result.pushObject(FdUmlSignalSend.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.Transition, UMLAD':
          result.pushObject(FdUmlTransition.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.ObjectFlow, UMLAD':
          result.pushObject(FdUmlObjectFlow.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.Partition, UMLAD':
          result.pushObject(FdUmlPartition.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
          result.pushObject(FdUmlNoteConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.Note, UMLCommon':
          result.pushObject(FdUmlNote.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.SwimlineSeparatorH, UMLCommon':
          result.pushObject(FdUmlSwimlineSeparator.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.SwimlineSeparatorV, UMLCommon':
          result.pushObject(FdUmlSwimlineSeparator.create({ primitive }));
          break;

        default:
          /* TODO: throw */ new Error(`Unknown primitive type: '${primitive.$type}'.`);
          break;
      }
    }

    return result;
  })

});

defineBaseModel(Model);

export default Model;
