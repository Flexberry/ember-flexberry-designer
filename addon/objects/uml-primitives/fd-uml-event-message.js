/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { NoteConnector } from './fd-uml-note-connector';

/**
  An object that describes a link of the note connector type on the UML diagram.

  @class FdUmlEventMessage
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new EventMessage(properties);
  },
});

/**
  Defines the JointJS link, which represents a note connector in the UML diagram.

  @for FdUmlEventMessage
  @class EventMessage
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let EventMessage = NoteConnector.define('flexberry.uml.EventMessage', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'blue', 'stroke-width': 1, 'stroke-dasharray': '8 3' },
  },
});

joint.shapes.flexberry.uml.EventMessageView = joint.shapes.flexberry.uml.NoteConnectorView ;