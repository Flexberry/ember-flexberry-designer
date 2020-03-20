import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
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

      case 'STORMCASE.UML.sd.Actor, UMLSD':
        return FdUmlSequenceActor.create({ primitive });

      case 'STORMCASE.UML.sd.InactiveObject, UMLSD':
        return FdUmlSequenceObject.create({ primitive });

      case 'STORMCASE.UML.sd.ActiveObject, UMLSD':
        return FdUmlSequenceActiveObject.create({ primitive });

      case 'STORMCASE.UML.sd.Terminator, UMLSD':
        return FdUmlTerminator.create({ primitive });

      case 'STORMCASE.UML.sd.ProcedureCall, UMLSD':
        return FdUmlProcedureCall.create({ primitive });

      case 'STORMCASE.UML.sd.FlatMessage, UMLSD':
        return FdUmlFlatMsg.create({ primitive });

      case 'STORMCASE.UML.sd.AsyncMessage, UMLSD':
        return FdUmlAsyncMsg.create({ primitive });

      case 'STORMCASE.UML.sd.ReturnMessage, UMLSD':
        return FdUmlReturnMsg.create({ primitive });

      default:
        //throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
        return;
    }
  }
});
defineBaseModel(Model);

export default Model;
