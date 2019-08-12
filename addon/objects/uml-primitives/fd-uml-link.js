/**
  @module ember-flexberry-designer
*/

import { computed, get } from '@ember/object';
import { isNone } from '@ember/utils';

import joint from 'npm:jointjs';
import FdUmlPrimitive from './fd-uml-primitive';

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
  source: computed('primitive.StartPrimitive.$ref', {
    get() {
      let ret = { id: this.get('primitive.StartPrimitive.$ref') };
      let segmNo = this.get('primitive.StartLE.SegmNo');
      if (segmNo >= 0) {
        let percent = this.get('primitive.StartLE.Percent');
        ret.anchor = {
          name: 'connectionSegmRatio',
          args: {
            segmNo: segmNo,
            percent: percent
          }
        };
      }
      return ret;
    },
    set(key, value) {
      this.set('primitive.StartPrimitive.$ref', value.id);
      this.set('primitive.StartLE.Primitive.$ref', value.id);
      return value;
    },
  }),

  /**
    An object with an `id` of another UML primitive, which is the target, for example `{ id: '1' }`.

    @property target
    @type Object
  */
  target: computed('primitive.EndPrimitive.$ref', {
    get() {
      let ret = { id: this.get('primitive.EndPrimitive.$ref') };
      let segmNo = this.get('primitive.EndLE.SegmNo');
      if (segmNo >= 0) {
        let percent = this.get('primitive.StartLE.Percent');
        ret.anchor = {
          name: 'connectionSegmRatio',
          args: {
            segmNo: segmNo,
            percent: percent
          }
        };
    }
      return ret;
    },
    set(key, value) {
      this.set('primitive.EndPrimitive.$ref', value.id);
      this.set('primitive.EndLE.Primitive.$ref', value.id);
      return value;
    },
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
  startPoint: computed('primitive.StartPoint.{X,Y}', {
    get() {
      return { x: this.get('primitive.StartPoint.X'), y: this.get('primitive.StartPoint.Y') };
    },
    set(key, value) {
      this.set('primitive.StartLE.Point.X', value.x);
      this.set('primitive.StartLE.Point.Y', value.y);
      this.set('primitive.StartPoint.X', value.x);
      this.set('primitive.StartPoint.Y', value.y);
      return value;
    },
  }),

  /**
    Link's end point.

    @property endPoint
    @type Object
  */
  endPoint: computed('primitive.EndPoint.{X,Y}', {
    get() {
      return { x: this.get('primitive.EndPoint.X'), y: this.get('primitive.EndPoint.Y') };
    },
    set(key, value) {
      this.set('primitive.EndLE.Point.X', value.x);
      this.set('primitive.EndLE.Point.Y', value.y);
      this.set('primitive.EndPoint.X', value.x);
      this.set('primitive.EndPoint.Y', value.y);
      return value;
    },
  }),

  /**
    An array containing all the labels.

    @property labels
    @type Array
  */
  labels: computed('startMultiplicity', 'endMultiplicity', 'startRoleTxt', 'endRoleTxt', 'description', 'qualified', function () {
    return [
      { attrs: { text: { text: this.get('description') } } },
      { attrs: { text: { text: this.get('startRoleTxt') } } },
      { attrs: { text: { text: this.get('endRoleTxt') } } },
      { attrs: { text: { text: this.get('startMultiplicity') } } },
      { attrs: { text: { text: this.get('endMultiplicity') } } },
      { attrs: { text: { text: this.get('qualified') } } },
    ];
  }),

  /**
    The vertices through which this link passes. An array of objects with `X` and `Y` coordinates, for example `[{ x: 100, y: 100 }]`.

    @property vertices
    @type Array
  */
  vertices: computed('primitive.Points', {
    get() {
      let vertices = [];
      let points = this.get('primitive.Points');
      for (let i = 1; i < points.length - 1; i++) {
        vertices.push({ x: points[i].X, y: points[i].Y });
      }

      return vertices;
    },
    set(key, value) {
      let points = [this.get('primitive.StartPoint')];

      for (let i = 0; i < value.length; i++) {
        points.push({
          $type: 'System.Drawing.Point, System.Drawing',
          IsEmpty: false,
          X: value[i].x,
          Y: value[i].y
        });
      }

      points.push(this.get('primitive.EndPoint'));

      this.set('primitive.Points', points);
      return value;
    },
  }),
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
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

  objectModel: null,

  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' }
  },
  labels: [{
    position: { distance: 0.5, offset: 0 }, attrs: { text: { text: '' } } //description
  }, {
    position: { distance: 5, offset: -12 }, attrs: { text: { text: '' } } //startRoleTxt
  }, {
    position: { distance: -5, offset: -12 }, attrs: { text: { text: '' } } //endRoleTxt
  }, {
    position: { distance: 5, offset: 12 }, attrs: { text: { text: '' } } //startMultiplicity
  }, {
    position: { distance: -5, offset: 12 }, attrs: { text: { text: '' } } //endMultiplicity
  }, {
    position: { distance: 5, offset: 0 }, attrs: { text: { text: '' } } //QualifiedText
  }]
}, {
    initialize: function () {
      let vertices = this.get('vertices') || [];
      let startPointA = this.get('startPoint');
      let startPointB = vertices[0] || this.get('endPoint');
      this.updateLabelsPositions(startPointA, startPointB, false);
      let endPointA = vertices[vertices.lenght - 1] || this.get('startPoint');
      let endPointB = this.get('endPoint');
      this.updateLabelsPositions(endPointA, endPointB, true);

      this.on('change:vertices', function(element, newVertices) {
        let objectModel = this.get('objectModel');
        if (objectModel) {
          objectModel.set('vertices', newVertices);
          this.trigger('uml-update');
        }
      }, this);

      this.on('change:repositoryObject', function(element, newRepository) {
        let objectModel = this.get('objectModel');
        if (objectModel) {
          objectModel.set('repositoryObject', isNone(newRepository) ? null : `{${newRepository.get('id')}}`);
        }
      }, this);

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

      this.label(0, { position: { distance: this.getLabelDistance('description') }, inverseTextDirection: true });
      let angle = 180 * Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x) / Math.PI;
      if (angle >= -45 && angle <= 45) {
        if (isEnd) {
          this.label(4, { position: { distance: this.getLabelDistance('endMultiplicity'), offset: 12 }, inverseTextDirection: false });
          this.label(2, { position: { distance: this.getLabelDistance('endRole'), offset: -12 }, inverseTextDirection: false });
        } else {
          this.label(3, { position: { distance: this.getLabelDistance('startMultiplicity'), offset: 12 }, inverseTextDirection: true });
          this.label(2, { position: { distance: this.getLabelDistance('startRole'), offset: -12 }, inverseTextDirection: true });
          this.label(5, { position: { distance: this.getLabelDistance('qualified'), offset: 12 }, inverseTextDirection: true });
        }
      }

      if (angle >= -135 && angle < -45) {
        if (isEnd) {
          this.label(4, { position: { distance: this.getLabelDistance('endMultiplicity', true), offset: 6 }, inverseTextDirection: true });
          this.label(2, { position: { distance: this.getLabelDistance('endRole', true), offset: -6 }, inverseTextDirection: false });
        } else {
          this.label(3, { position: { distance: this.getLabelDistance('startMultiplicity', true), offset: 6 }, inverseTextDirection: true });
          this.label(1, { position: { distance: this.getLabelDistance('startRole', true), offset: -6 }, inverseTextDirection: false });
          this.label(5, { position: { distance: this.getLabelDistance('qualified', true), offset: -6 }, inverseTextDirection: true });
        }
      }

      if (angle > 45 && angle <= 135) {
        if (isEnd) {
          this.label(4, { position: { distance: this.getLabelDistance('endMultiplicity', true), offset: -6 }, inverseTextDirection: true });
          this.label(2, { position: { distance: this.getLabelDistance('endRole', true), offset: 6 }, inverseTextDirection: false });
        } else {
          this.label(3, { position: { distance: this.getLabelDistance('startMultiplicity', true), offset: -6 }, inverseTextDirection: true });
          this.label(1, { position: { distance: this.getLabelDistance('startRole', true), offset: 6 }, inverseTextDirection: false });
          this.label(5, { position: { distance: this.getLabelDistance('qualified', true), offset: -6 }, inverseTextDirection: true });
        }
      }

      if (angle < -135 || angle > 135) {
        if (isEnd) {
          this.label(4, { position: { distance: this.getLabelDistance('endMultiplicity'), offset: -12 }, inverseTextDirection: true });
          this.label(2, { position: { distance: this.getLabelDistance('endRole'), offset: 12 }, inverseTextDirection: true });
        } else {
          this.label(3, { position: { distance: this.getLabelDistance('startMultiplicity'), offset: -12 }, inverseTextDirection: false });
          this.label(1, { position: { distance: this.getLabelDistance('startRole'), offset: 12 }, inverseTextDirection: false });
          this.label(5, { position: { distance: this.getLabelDistance('qualified'), offset: -12 }, inverseTextDirection: false });
        }
      }
    },

    setLabelText: function (label, text) {
      let objectModel = this.get('objectModel');
      switch (label) {
        case 'startMultiplicity':
          this.label(3, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          objectModel.set('startMultiplicity', text);
          break;
        case 'endMultiplicity':
          this.label(4, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          objectModel.set('endMultiplicity', text);
          break;
        case 'description':
          this.label(0, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          objectModel.set('description', text);
          break;
        case 'startRole':
          this.label(1, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          objectModel.set('startRoleTxt', text);
          break;
        case 'endRole':
          this.label(2, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          objectModel.set('endRoleTxt', text);
          break;
        case 'qualified':
          this.label(5, { attrs: { text: { text: text, 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' } } });
          objectModel.set('qualified', text);
          break;
      }

      return;
    },

    getLabelText: function (labelName) {
      let label = {};
      switch (labelName) {
        case 'startMultiplicity':
          label = this.label(3);
          break;
        case 'endMultiplicity':
          label = this.label(4);
          break;
        case 'description':
          label = this.label(0);
          break;
        case 'startRole':
          label = this.label(1);
          break;
        case 'endRole':
          label = this.label(2);
          break;
        case 'qualified':
          label =  this.label(5);
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

joint.util.setByPath(joint.shapes, 'flexberry.uml.Link', Link, '.');


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
      this.label(0, { attrs: { text: { 'text-decoration': 'underline', } } });
      joint.dia.Link.prototype.initialize.apply(this, arguments);
    },
  });

joint.util.setByPath(joint.shapes, 'flexberry.uml.BaseLinkWithUnderline', LinkWithUnderline, '.');

let Point = joint.g.Point;

joint.linkAnchors.connectionSegmRatio = function(endView, endMagnet, anchorReference, args) {
  let segments=endView.path.segments;
  let segmNo = args.segmNo;
  let percent = args.percent;
  if (percent > 1.0) percent = 1.0;
  if (percent < 0.0) percent = 0.0;
  let pathNo;
  for (pathNo = 0; segments[pathNo].isSubpathStart; pathNo+=1);
  for (let tailSegNo = segmNo; tailSegNo > 0 ; tailSegNo -=1) {
    pathNo +=1;
  }
  let x0 = segments[pathNo].start.x;
  let y0 = segments[pathNo].start.y;
  let x1 = segments[pathNo].end.x;
  let y1 = segments[pathNo].end.y;
  let x = x0 + (x1 - x0) * percent;
  let y = y0 + (y1 - y0) * percent;
  let ret = new Point({x: x, y: y});
  return ret;
};

