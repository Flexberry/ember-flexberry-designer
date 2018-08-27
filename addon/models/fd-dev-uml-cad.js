import Ember from 'ember';

import CADModel from './fd-cad';
import {
  Model as DevUMLCADMixin,
  defineProjections,
  defineBaseModel,
} from '../mixins/regenerated/models/fd-dev-uml-cad';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlClass from '../objects/uml-primitives/fd-uml-class';
import FdUmlMultiObject from '../objects/uml-primitives/fd-uml-multi-object';
import FdUmlInstance from '../objects/uml-primitives/fd-uml-instance';
import FdUmlPropertyObject from '../objects/uml-primitives/fd-uml-property-object';
import FdUmlMoreClasses from '../objects/uml-primitives/fd-uml-more-classes';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlAssociation from '../objects/uml-primitives/fd-uml-association';
import FdUmlComposition from '../objects/uml-primitives/fd-uml-composition';
import FdUmlGeneralization from '../objects/uml-primitives/fd-uml-generalization';

let Model = CADModel.extend(DevUMLCADMixin, {
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

        case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
          result.pushObject(FdUmlClass.create({ primitive }));
          break;

        case 'STORMCASE.UML.Common.NoteConnector, UMLCommon':
          result.pushObject(FdUmlNoteConnector.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Association, UMLCAD':
          result.pushObject(FdUmlAssociation.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Composition, UMLCAD':
          result.pushObject(FdUmlComposition.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
          result.pushObject(FdUmlGeneralization.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.PropertyObject, UMLCAD':
          result.pushObject(FdUmlPropertyObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.MultiObject, UMLCAD':
          result.pushObject(FdUmlMultiObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.Instance, UMLCAD':
          result.pushObject(FdUmlInstance.create({ primitive }));
          break;

        case 'STORMCASE.UML.cad.MoreClasses, UMLCAD':
          result.pushObject(FdUmlMoreClasses.create({ primitive }));
          break;

        default:
          /* TODO: throw */ new Error(`Unknown primitive type: '${primitive.$type}'.`);
          break;
      }
    }

    return result;
  }),
});

defineBaseModel(Model);

defineProjections(Model);

export default Model;
