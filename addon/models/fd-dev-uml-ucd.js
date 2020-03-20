import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
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
import FdUmlUsecaseGeneralization from '../objects/uml-primitives/fd-uml-usecase-generalization';
import FdUmlDependency from '../objects/uml-primitives/fd-uml-dependency';
import FdUmlUnDirectedAssociation from '../objects/uml-primitives/fd-uml-usecase-undirected-association';
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
      case 'STORMCASE.UML.ucd.Actor, UMLUCD':
        return FdUmlUsecaseActor.create({ primitive });
      case 'STORMCASE.UML.ucd.UseCase, UMLUCD':
        return FdUmlUseCase.create({ primitive });
      case 'STORMCASE.UML.ucd.UndirectedAssoc, UMLUCD':
        return FdUmlUnDirectedAssociation.create({ primitive });
      case 'STORMCASE.UML.ucd.DirectedAssoc, UMLUCD':
        return FdUmlDirectedAssociation.create({ primitive });
      case 'STORMCASE.UML.ucd.Dependency, UMLUCD':
        return FdUmlDependency.create({ primitive });
      case 'STORMCASE.UML.ucd.Generalization, UMLUCD':
        return FdUmlUsecaseGeneralization.create({ primitive });
      case 'STORMCASE.UML.ucd.Boundary, UMLUCD':
        return FdUmlPartition.create({ primitive });
    }
  }
});
defineBaseModel(Model);
export default Model;
