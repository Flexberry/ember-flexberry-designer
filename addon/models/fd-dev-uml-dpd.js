import Ember from 'ember';
import { Model as DevUMLDPDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-dpd';
import DPDModel from './fd-dpd';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlDependency from '../objects/uml-primitives/fd-uml-dependency';
import FdUmlTransition from '../objects/uml-primitives/fd-uml-transition';
import FdUmlActiveObject from '../objects/uml-primitives/fd-uml-active-object';
import FdUmlInstance from '../objects/uml-primitives/fd-uml-instance';
import FdUmlComponent from '../objects/uml-primitives/fd-uml-component';
import FdUmlNode from '../objects/uml-primitives/fd-uml-node';
import FdUmlInterface from '../objects/uml-primitives/fd-uml-interface';

let Model = DPDModel.extend(DevUMLDPDMixin, {
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

        case 'STORMCASE.UML.dpd.Dependency, UMLDPD':
          result.pushObject(FdUmlDependency.create({ primitive }));
          break;

        case 'STORMCASE.UML.dpd.Connection, UMLDPD':
          result.pushObject(FdUmlTransition.create({ primitive }));
          break;

        case 'STORMCASE.UML.dpd.ActiveDeploymentObject, UMLDPD':
          result.pushObject(FdUmlActiveObject.create({ primitive }));
          break;

        case 'STORMCASE.UML.dpd.DeploymentObject, UMLDPD':
          result.pushObject(FdUmlInstance.create({ primitive }));
          break;

        case 'STORMCASE.UML.dpd.ComponentInstance, UMLDPD':
        case 'STORMCASE.UML.dpd.Component, UMLDPD':
          result.pushObject(FdUmlComponent.create({ primitive }));
          break;

        case 'STORMCASE.UML.dpd.NodeInstance, UMLDPD':
        case 'STORMCASE.UML.dpd.Node, UMLDPD':
          result.pushObject(FdUmlNode.create({ primitive }));
          break;

        case 'STORMCASE.UML.dpd.Interface, UMLDPD':
          result.pushObject(FdUmlInterface.create({ primitive }));
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
