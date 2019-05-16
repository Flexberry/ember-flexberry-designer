/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';

import joint from 'npm:jointjs';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a Sequence Actor element on the UML diagram.

  @class FdUmlSequenceActor
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the SequenceActor.

    @property attrs
    @type String
  */
  attrs: computed('primitive.Name.Text', function() {
    return { text: { text: this.get('primitive.Name.Text') } };
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS(graph) {
    let properties = this.getProperties('id', 'attrs', 'size', 'position');
    properties.graph = graph;
    return new SequenceDiagramActor(properties);

  },
});

/**
  Defines the JointJS object, which represents a Sequence Actor in the UML diagram.

  @for FdUmlSequenceActor
  @class SequenceDiagramActor
  @extends basic.Generic.
  @namespace flexberry.uml
  @constructor
*/
export let SequenceActor = joint.shapes.basic.Generic.define('flexberry.uml.SequenceActor', {
  attrs: {
    size: {},
    rect: {},
    link: undefined,
    linklength: 20,
    endLine: undefined,
    text: {
      'ref': 'image',
      'ref-y': 50,
      'ref-x': 0,
      'text-anchor': 'start',
      'y-alignment': 'end',
      'font-weight': 'bold',
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial'
    }
  }
}, {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',
    initialize: function () {
      let width = this.attributes.attrs.size.width;
      let height = this.attributes.attrs.size.height;
      this.resize(width, height);
      this.attributes.attrs.rect.width = width;
      this.attributes.attrs.rect.height = height;

      this.attributes.endLine = new joint.shapes.basic.Circle({
        size: {
          width: 10,
          height: 10
        }
      });
      this.attributes.link = new joint.dia.Link({
        source: {
          id: this.cid,
          anchor: {
            name: 'bottom'
          }
        },
        target: {
          id: this.attributes.endLine.cid
        }
      });
      this.attributes.link.markup = '<path class="connection" stroke="black" ' +
        'stroke-width="' +
        this.attributes.attrs.rect['stroke-width'] +
        '" d="M 0 0 0 0"/>';
      let shift = this.attributes.attrs.rect.width / 2 - 4;
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
      this.addTo(this.attributes.graph);
      this.attributes.endLine.addTo(this.attributes.graph);
      this.embed(this.attributes.endLine);
      this.attributes.endLine.position(shift, 100, { parentRelative: true });
      this.embed(this.attributes.endLine);
      this.attributes.endLine.on('change:position', function (element, position) {
        let actor = element.getParentCell();
        let actorPosition = actor.position();
        element.position(actorPosition.x + shift, position.y);
      });
      this.attributes.link.addTo(this.attributes.graph);
      this.embed(this.attributes.link);
    }
  });

/**
  Defines the JointJS object, which represents a Sequence Actor in the UML diagram.

  @for FdUmlSequenceActor
  @class SequenceDiagramActor
  @extends SequenceActor
  @namespace flexberry.uml
  @constructor
*/
export let SequenceDiagramActor = SequenceActor.define('flexberry.uml.SequenceDiagramActor', {
  attrs: {
    size: { 'width': 24, 'height': 47 },
    image: { 'xlink:href': '/assets/images/actor.svg' }
  }
});
