import { computed } from '@ember/object';
import { A } from '@ember/array';
import {
  Model as DevUMLSDMixin,
  defineBaseModel
} from '../mixins/regenerated/models/fd-dev-uml-sd';
import SDModel from './fd-sd';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlSequenceActor from '../objects/uml-primitives/fd-uml-sequence-actor';
import FdUmlSequenceObject from '../objects/uml-primitives/fd-uml-sequence-object';
import FdUmlSequenceActiveObject from '../objects/uml-primitives/fd-uml-sequence-active-object';
import FdUmlTerminator from '../objects/uml-primitives/fd-uml-terminator';
import FdUmlProcedureCall from '../objects/uml-primitives/fd-uml-procedure-call';
import FdUmlFlatMsg from '../objects/uml-primitives/fd-uml-flat-message';
import FdUmlAsyncMsg from '../objects/uml-primitives/fd-uml-async-message';
import FdUmlReturnMsg from '../objects/uml-primitives/fd-uml-return-message';

let Model = SDModel.extend(DevUMLSDMixin, {
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
        case 'STORMCASE.UML.Common.Note, UMLCommon':
          result.pushObject(FdUmlNote.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
          result.pushObject(FdUmlNoteConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.Actor, UMLSD':
          result.pushObject(FdUmlSequenceActor.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.InactiveObject, UMLSD':
          result.pushObject(FdUmlSequenceObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.ActiveObject, UMLSD':
          result.pushObject(FdUmlSequenceActiveObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.Terminator, UMLSD':
          result.pushObject(FdUmlTerminator.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.ProcedureCall, UMLSD':
          result.pushObject(FdUmlProcedureCall.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.FlatMessage, UMLSD':
          result.pushObject(FdUmlFlatMsg.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.AsyncMessage, UMLSD':
          result.pushObject(FdUmlAsyncMsg.create({ primitive }));
          break;

        case 'STORMCASE.UML.sd.ReturnMessage, UMLSD':
          result.pushObject(FdUmlReturnMsg.create({ primitive }));
          break;

        default:

          //throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
          break;
      }
    }

    return result;
  }),
});
defineBaseModel(Model);

export default Model;
