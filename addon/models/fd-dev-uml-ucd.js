import { computed } from '@ember/object';
import { A } from '@ember/array';

import {
  Model as DevUMLUCDMixin,
  defineBaseModel
} from
  '../mixins/regenerated/models/fd-dev-uml-ucd';
import UCDModel from './fd-ucd';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlUsecaseActor from '../objects/uml-primitives/fd-uml-usecase-actor';
import FdUmlUseCase from '../objects/uml-primitives/fd-uml-use-case';
import FdUmlAssociation from '../objects/uml-primitives/fd-uml-association';
import FdUmlUsecaseGeneralization from '../objects/uml-primitives/fd-uml-usecase-generalization';
import FdUmlDependency from '../objects/uml-primitives/fd-uml-dependency';
import FdUmlDirectedAssociation from '../objects/uml-primitives/fd-uml-usecase-directed-association';
import FdUmlPartition from '../objects/uml-primitives/fd-uml-partition';

let Model = UCDModel.extend(DevUMLUCDMixin, {
  /**
      The array of primitives of this diagram.

      @property primitives
      @type Ember.Array
    */
  primitives: computed('primitivesJsonString', function () {
    let result = A();
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
        case 'STORMCASE.UML.ucd.Actor, UMLUCD':
          result.pushObject(FdUmlUsecaseActor.create({ primitive }));
          break;
        case 'STORMCASE.UML.ucd.UseCase, UMLUCD':
          result.pushObject(FdUmlUseCase.create({ primitive }));
          break;
        case 'STORMCASE.UML.ucd.UndirectedAssoc, UMLUCD':
          result.pushObject(FdUmlAssociation.create({ primitive }));
          break;
        case 'STORMCASE.UML.ucd.DirectedAssoc, UMLUCD':
          result.pushObject(FdUmlDirectedAssociation.create({ primitive }));
          break;
        case 'STORMCASE.UML.ucd.Dependency, UMLUCD':
          result.pushObject(FdUmlDependency.create({ primitive }));
          break;
        case 'STORMCASE.UML.ucd.Generalization, UMLUCD':
          result.pushObject(FdUmlUsecaseGeneralization.create({ primitive }));
          break;
        case 'STORMCASE.UML.ucd.Boundary, UMLUCD':
          result.pushObject(FdUmlPartition.create({ primitive }));
          break;
      }
    }

    return result;
  }),
});
defineBaseModel(Model);
export default Model;
