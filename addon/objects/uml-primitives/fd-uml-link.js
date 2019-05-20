/**
  @module ember-flexberry-designer
*/

import { computed, get } from '@ember/object';
import { isNone } from '@ember/utils';

import joint from 'npm:jointjs';
import FdUmlPrimitive from './fd-uml-primitive';
import { setLinkColors } from '../../utils/fd-uml-colors';


/**
  An object that defines any link on the UML diagram.

  @class FdUmlBaseLink
  @extends FdUmlPrimitive
*/
export default FdUmlPrimitive.extend({

  /**
    An object with an `id` of another UML primitive, which is the source, for example `{ id: '1' }`.

    @property source
    @type Object
  */
  source: computed('primitive.StartPrimitive.$ref', function() {
    return { id: this.get('primitive.StartPrimitive.$ref') };
  }),

  /**
    An object with an `id` of another UML primitive, which is the target, for example `{ id: '1' }`.

    @property target
    @type Object
  */
  target: computed('primitive.EndPrimitive.$ref', function() {
    return { id: this.get('primitive.EndPrimitive.$ref') };
  }),

  /**
  The start multiplicity of a link.

  @property startMultiplicity
  @type String
  */
  startMultiplicity: computed.alias('primitive.StartMultTxt.Text'),

  /**
    The end multiplicity of a link.

    @property endMultiplicity
    @type String
  */
  endMultiplicity: computed.alias('primitive.EndMultTxt.Text'),

  /**
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: computed.alias('primitive.EndRoleTxt.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.StartRoleTxt.Text'),

  /**
    Link description.

    @property description
    @type String
  */
  description: computed.alias('primitive.Name.Text'),

  /**
    Link qualified.

    @property qualified
    @type String
  */
  qualified: computed.alias('primitive.QualifiedText.Text'),

  /**
    Link's start point.

    @property startPoint
    @type Object
  */
  startPoint: computed('primitive.StartPoint.{X,Y}', function() {
    return { x: this.get('primitive.StartPoint.X'), y: this.get('primitive.StartPoint.Y') };
  }),

  /**
    Link's end point.

    @property endPoint
    @type Object
  */
  endPoint: computed('primitive.EndPoint.{X,Y}', function() {
    return { x: this.get('primitive.EndPoint.X'), y: this.get('primitive.EndPoint.Y') };
  }),

  /**
    An array containing all the labels.

    @property labels
    @type Array
  */
  labels: computed('startMultiplicity', 'endMultiplicity', 'startRoleTxt', 'endRoleTxt', 'description', 'qualified', function () {
    return [
      { attrs: { text: { text: this.get('startMultiplicity') } } },
      { attrs: { text: { text: this.get('endMultiplicity') } } },
      { attrs: { text: { text: this.get('description') } } },
      { attrs: { text: { text: this.get('startRoleTxt') } } },
      { attrs: { text: { text: this.get('endRoleTxt') } } },
      { attrs: { text: { text: this.get('qualified') } } },
    ];
  }),

  /**
    The vertices through which this link passes. An array of objects with `X` and `Y` coordinates, for example `[{ x: 100, y: 100 }]`.

    @property vertices
    @type Array
  */
  vertices: computed('primitive.Points', function() {
    let vertices = [];
    let points = this.get('primitive.Points');
    for (let i = 1; i < points.length - 1; i++) {
      vertices.push({ x: points[i].X, y: points[i].Y });
    }

    return vertices;
  }),
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'name', 'source', 'target', 'vertices', 'labels', 'startPoint', 'endPoint');
    return new Link(properties);
  }
});

/**
  Defines the JointJS link, which represents a Link in the UML diagram.

  @for FdUmlLink
  @class Link
  @extends dia.Link
  @namespace flexberry.uml
  @constructor
*/
export let Link = joint.dia.Link.define('flexberry.uml.Link', {
  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' }
  },
  labels: [{
    position: { distance: 5, offset: 12 }, attrs: { text: { text: '' } } //startMultiplicity
  }, {
    position: { distance: -5, offset: 12 }, attrs: { text: { text: '' } } //endMultiplicity
  }, {
    position: { distance: 0.5, offset: 0 }, attrs: { text: { text: '' } } //description
  }, {
    position: { distance: 5, offset: -12 }, attrs: { text: { text: '' } } //startRoleTxt
  }, {
    position: { distance: -5, offset: -12 }, attrs: { text: { text: '' } } //endRoleTxt
  }, {
    position: { distance: 5, offset: 0 }, attrs: { text: { text: '' } } //QualifiedText
  }]
}, {
    initialize: function (properties) {
      setLinkColors(properties.primitive, this);
      let vertices = this.get('vertices') || [];
      let startPointA = this.get('startPoint');
      let startPointB = vertices[0] || this.get('endPoint');
      this.updateLabelsPositions(startPointA, startPointB, false);
      let endPointA = vertices[vertices.lenght - 1] || this.get('startPoint');
      let endPointB = this.get('endPoint');
      this.updateLabelsPositions(endPointA, endPointB, true);
      joint.dia.Link.prototype.initialize.apply(this, arguments);
    },

    /**
      Updates labels positions.

      @method updateLabelsPositions
      @param {Object} pointA
      @param {Object} pointB
      @param {Boolean} isEnd True when pointB is an end of the link.
    */
    updateLabelsPositions(pointA, pointB, isEnd) {
      if (isNone(pointA) || isNone(pointB)) {
        return;
      }

      this.label(2, { position: { distance: this.getLabelDistance('description') } });
      let angle = 180 * Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x) / Math.PI;
      if (angle >= -45 && angle <= 45) {
        if (isEnd) {
          this.label(1, { position: { distance: this.getLabelDistance('endMultiplicity'), offset: 12 }, inverseTextDirection: false });
          this.label(4, { position: { distance: this.getLabelDistance('endRole'), offset: -12 }, inverseTextDirection: false });
        } else {
          this.label(0, { position: { distance: this.getLabelDistance('startMultiplicity'), offset: 12 }, inverseTextDirection: true });
          this.label(3, { position: { distance: this.getLabelDistance('startRole'), offset: -12 }, inverseTextDirection: true });
          this.label(5, { position: { distance: this.getLabelDistance('qualified'), offset: 12 }, inverseTextDirection: true });
        }
      }

      if (angle >= -135 && angle < -45) {
        if (isEnd) {
          this.label(1, { position: { distance: this.getLabelDistance('endMultiplicity', true), offset: 6 }, inverseTextDirection: true });
          this.label(4, { position: { distance: this.getLabelDistance('endRole', true), offset: -6 }, inverseTextDirection: false });
        } else {
          this.label(0, { position: { distance: this.getLabelDistance('startMultiplicity', true), offset: 6 }, inverseTextDirection: true });
          this.label(3, { position: { distance: this.getLabelDistance('startRole', true), offset: -6 }, inverseTextDirection: false });
          this.label(5, { position: { distance: this.getLabelDistance('qualified', true), offset: -6 }, inverseTextDirection: true });
        }
      }

      if (angle > 45 && angle <= 135) {
        if (isEnd) {
          this.label(1, { position: { distance: this.getLabelDistance('endMultiplicity', true), offset: -6 }, inverseTextDirection: true });
          this.label(4, { position: { distance: this.getLabelDistance('endRole', true), offset: 6 }, inverseTextDirection: false });
        } else {
          this.label(0, { position: { distance: this.getLabelDistance('startMultiplicity', true), offset: -6 }, inverseTextDirection: true });
          this.label(3, { position: { distance: this.getLabelDistance('startRole', true), offset: 6 }, inverseTextDirection: false });
          this.label(5, { position: { distance: this.getLabelDistance('qualified', true), offset: -6 }, inverseTextDirection: true });
        }
      }

      if (angle < -135 || angle > 135) {
        if (isEnd) {
          this.label(1, { position: { distance: this.getLabelDistance('endMultiplicity'), offset: -12 }, inverseTextDirection: true });
          this.label(4, { position: { distance: this.getLabelDistance('endRole'), offset: 12 }, inverseTextDirection: true });
        } else {
          this.label(0, { position: { distance: this.getLabelDistance('startMultiplicity'), offset: -12 }, inverseTextDirection: false });
          this.label(3, { position: { distance: this.getLabelDistance('startRole'), offset: 12 }, inverseTextDirection: false });
          this.label(5, { position: { distance: this.getLabelDistance('qualified'), offset: -12 }, inverseTextDirection: false });
        }
      }
    },

    setLabelText: function (label, text) {
      switch (label) {
        case 'startMultiplicity':
          this.label(0, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          break;
        case 'endMultiplicity':
          this.label(1, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          break;
        case 'description':
          this.label(2, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          break;
        case 'startRole':
          this.label(3, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          break;
        case 'endRole':
          this.label(4, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          break;
        case 'qualified':
          this.label(5, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('ERROR - choose correct label name');
          break;
      }

      return;
    },

    getLabelText: function (labelName) {
      let label = {};
      switch (labelName) {
        case 'startMultiplicity':
          label = this.label(0);
          break;
        case 'endMultiplicity':
          label = this.label(1);
          break;
        case 'description':
          label = this.label(2);
          break;
        case 'startRole':
          label = this.label(3);
          break;
        case 'endRole':
          label = this.label(4);
          break;
        case 'qualified':
          label = this.label(5);
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('ERROR - choose correct label name');
      }

      return get(label, 'attrs.text.text');
    },

    getLabelDistance: function (labelName, isVertical) {
      switch (labelName) {
        case 'startMultiplicity':
        case 'startRole':
          return isVertical ? 10 : 5;
        case 'endMultiplicity':
        case 'endRole':
          return isVertical ? -10 : -5;
        case 'description':
          return 0.5;
        case 'qualified':
          return 0;
        default:
          // eslint-disable-next-line no-console
          console.log('ERROR - choose correct label name');
      }
    },
  });

/**
  Defines the JointJS link, which represents a Link with underline in the UML diagram.

  @for FdUmlLink
  @class LinkWithUnderline
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let LinkWithUnderline = Link.define('flexberry.uml.BaseLinkWithUnderline', {
}, {
    initialize: function () {
      this.label(2, { attrs: { text: { 'text-decoration': 'underline', } } });
      joint.dia.Link.prototype.initialize.apply(this, arguments);
    },
  });
