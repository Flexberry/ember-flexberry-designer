import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { Model as DevUMLDPDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-dpd';
import DPDModel from './fd-dpd';

import FdUmlNote from '../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../objects/uml-primitives/fd-uml-note-connector';
import FdUmlDependency from '../objects/uml-primitives/fd-uml-dependency';
import FdUmlConnection from '../objects/uml-primitives/fd-uml-connection';
import FdUmlDeploymentActiveObject from '../objects/uml-primitives/fd-uml-deployment-active-object';
import FdUmlInstance from '../objects/uml-primitives/fd-uml-instance';
import FdUmlComponent from '../objects/uml-primitives/fd-uml-component';
import FdUmlNode from '../objects/uml-primitives/fd-uml-node';

let Model = DPDModel.extend(DevUMLDPDMixin, {
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

      case 'STORMCASE.UML.dpd.Dependency, UMLDPD':
        return FdUmlDependency.create({ primitive });

      case 'STORMCASE.UML.dpd.Connection, UMLDPD':
        return FdUmlConnection.create({ primitive });

      case 'STORMCASE.UML.dpd.ActiveDeploymentObject, UMLDPD':
        return FdUmlDeploymentActiveObject.create({ primitive });

      case 'STORMCASE.UML.dpd.DeploymentObject, UMLDPD':
        return FdUmlInstance.create({ primitive });

      case 'STORMCASE.UML.dpd.ComponentInstance, UMLDPD':
      case 'STORMCASE.UML.dpd.Component, UMLDPD':
        return FdUmlComponent.create({ primitive });

      case 'STORMCASE.UML.dpd.NodeInstance, UMLDPD':
      case 'STORMCASE.UML.dpd.Node, UMLDPD':
        return FdUmlNode.create({ primitive });

      case 'STORMCASE.UML.dpd.Interface, UMLDPD': //TODO need fix primitive 'Interface' TFS 169736
        return;

      default:
        throw new Error(`Unknown primitive type: '${primitive.$type}'.`);
    }
  }
});
defineBaseModel(Model);
export default Model;
