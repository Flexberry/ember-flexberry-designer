/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

/**
  An object that describes a link of the note connector type on the UML diagram.

  @class FdUmlNoteConnector
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
    return new NoteConnector(properties);
  },
});

/**
  Defines the JointJS link, which represents a note connector in the UML diagram.

  @for FdUmlNoteConnector
  @class NoteConnector
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let NoteConnector = Link.define('flexberry.uml.NoteConnector', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '3 2' },
  },
});

joint.shapes.flexberry.uml.NoteConnectorView = EmptyView;
