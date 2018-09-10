/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from './fd-uml-element';

/**
  An object that describes an object on the UML diagram.

  @class FdUmlInterface
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the class.

    @property name
    @type String
  */
  name: Ember.computed.alias('primitive.Name.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'size', 'position');
    return new Interface(properties);
  },
});

/**
  Defines the JointJS object, which represents a Interface.

  @for FdUmlInterface
  @class Interface
  @extends basic.Generic
  @namespace flexberry.uml
  @constructor
*/
export let Interface = joint.shapes.basic.Generic.define('flexberry.uml.deploymentDiagram_Interface', {
  attrs: {
    size: { 'width': 24, 'height': 47 },
    link: undefined,
    linklength: 20,
    endLine: undefined
  },
  name: [],
}, {
  markup: '<g class="rotatable"><g class="scalable"></g></g>',
  initialize: function () {
    this.attributes.endLine = new joint.shapes.basic.Circle({
      size: { width: 6, height: 6 }
    });
    let sourceObj = this.get('sourceObj'); // TODO <<<<
    this.attributes.link = new joint.shapes.standard.Link({
      source: { id: sourceObj.id, anchor: { name: 'perpendicular' } },
      target: { id: this.attributes.endLine.cid },
      labels:[{
        attrs: {
          text: {
            text: this.get('name').join('\n'),
            textAnchor:'start',
            yAlignment: 'middle',
            fontWeight: 'bold',
            fontSize: '12',
            fontFamily: 'Arial'
          }
        },
        position: { distance: 10, offset: -10 },
      }],
    });
    let linklength = this.attributes.attrs.linklength;
    this.attributes.link.markup = '<path class="connection" stroke="black" ' +
      'stroke-width="1" d="M 0 0 0 0"/>';
    let shift = 3;
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    this.addTo(this.attributes.graph);

    this.attributes.endLine.addTo(this.attributes.graph);
    this.embed(this.attributes.endLine);
    this.attributes.endLine.position(-shift, linklength, { parentRelative: true });
    this.embed(this.attributes.endLine);

    let _this = this;
    this.attributes.endLine.on('change:position', function(element, position) {
      if (element._pending.tx === undefined) {
        element.position(position.x, position.y);
        return;
      }

      let x1 = sourceObj.position().x;
      let x2 = x1 + sourceObj.size().width;
      let y1 = sourceObj.position().y;
      let y2 = y1 + sourceObj.size().height;
      let beforePositionX = position.x - element._pending.tx;
      let beforePositionY = position.y - element._pending.ty;
      let posCenterX = position.x + shift;
      let posCenterY = position.y + shift;

      function move(pos, p1, p2, d, newX, newY, ort=false) {
        if (pos >= p1 + shift) {
          if (pos <= p2 - shift) {
            element.position(newX, newY);
          } else if (pos < p2) {
            if (ort) {
              element.position(d, p2 + linklength);
            } else {
              element.position(p2 + linklength, d);
            }
          }
        } else if (pos < p1) {
          if (ort) {
            element.position(d, p1 - linklength);
          } else {
            element.position(p1 - linklength, d);

          }
        }
      }

      if (posCenterY > y2) {
        move(posCenterX, x1, x2, y2 - shift * 2, position.x, beforePositionY);
      } else if (posCenterY < y1 && posCenterX < x2 && posCenterX + 2 > x1) {
        move(posCenterX, x1, x2, y1, position.x, beforePositionY);
      } else if (posCenterX > x2) {
        move(posCenterY, y1, y2, x2 - shift * 2, beforePositionX, position.y, true);
      } else if (posCenterX < x1) {
        move(posCenterY, y1, y2, x1, beforePositionX, position.y, true);
      }
    });

    sourceObj.on('change:position', function(element) {
      let endLinePosition = _this.attributes.endLine.position();
      _this.attributes.endLine.position(endLinePosition.x + element._pending.tx, endLinePosition.y + element._pending.ty);
    });

    this.attributes.link.on('change:vertices', function(element) {
      element.vertices([]);
    });

    this.attributes.link.addTo(this.attributes.graph);
    this.embed(this.attributes.link);
  }
});
