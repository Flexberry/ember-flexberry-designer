/**
  @module ember-flexberry-designer
*/

import { computed, get } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';

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
      if (this.get('primitive.StartLE.refType') == 'Link') {
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
      }
      return ret;
    },
    set(key, value) {
      this.set('primitive.StartPrimitive.$ref', value.id);
      this.set('primitive.StartLE.Primitive.$ref', value.id);
      if ('segmNo' in value) {
        this.set('primitive.StartLE.SegmNo', value.segmNo);
      }
      if ('percent' in value) {
        this.set('primitive.StartLE.Percent', value.percent);
      }
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
      if (this.get('primitive.EndLE.refType') == 'Link') {
        let segmNo = this.get('primitive.EndLE.SegmNo');
        if (segmNo >= 0) {
          let percent = this.get('primitive.EndLE.Percent');
          ret.anchor = {
            name: 'connectionSegmRatio',
            args: {
              segmNo: segmNo,
              percent: percent
            }
          };
        }
      }
      return ret;
    },
    set(key, value) {
      this.set('primitive.EndPrimitive.$ref', value.id);
      this.set('primitive.EndLE.Primitive.$ref', value.id);
      if ('segmNo' in value) {
        this.set('primitive.EndLE.SegmNo', value.segmNo);
      }
      if ('percent' in value) {
        this.set('primitive.EndLE.Percent', value.percent);
      }
      return value;
    },
  }),

  /**
   The start segmNo of a link.                                *

   @property startSegmNo
   @type String
   */
  startSegmNo: computed('primitive.StartLE.SegmNo', {
    get() {
      return this.get('primitive.StartLE.SegmNo');
    },
    set(key, value) {
      this.set('primitive.StartLE.SegmNo', value);
      return value;
    }
  }),

  /**
   The end segmNo of a link.                                *

   @property endSegmNo
   @type String
   */
  endSegmNo: computed('primitive.EndLE.SegmNo', {
    get() {
      return this.get('primitive.EndLE.SegmNo');
    },
    set(key, value) {
      this.set('primitive.EndLE.SegmNo', value);
      return value;
    }
  }),

  /**
   *   The start percent of a link.                                *
   *
   *   @property startPercent
   *   @type String
   */
  startPercent: computed('primitive.StartLE.Percent', {
    get() {
      return this.get('primitive.StartLE.Percent');
    },
    set(key, value) {
      this.set('primitive.StartLE.Percent', value);
      return value;
    }
  }),

  /**
   *   The end percent of a link.                                *
   *
   *   @property endPercent
   *   @type String
   */
  endPercent: computed('primitive.EndLE.Percent', {
    get() {
      return this.get('primitive.EndLE.Percent');
    },
    set(key, value) {
      this.set('primitive.EndLE.Percent', value);
      return value;
    }
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
      this.set('primitive.Points.0', this.get('primitive.StartPoint'));
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
      let pointsLength = this.get('primitive.Points.length');
      this.set(`primitive.Points.${pointsLength - 1}`, this.get('primitive.EndPoint'));
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
    Use for add point connection cyclec link with 1 vertices.

    @property vertices
    @type Bool
  */
  cyclecLinkSwitch: false,

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

  connectedLinks: {},

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
          let connectedLinks = this.get('connectedLinks');
          let vertices = this.get('objectModel').vertices;
          let delta = newVertices.length - vertices.length;
          let nSegment;
          if (delta > 0) {  //Adding vertex
            let prevVertex, vertex, newVertex;
            for (nSegment = 0; nSegment < vertices.length; nSegment+=1) {
              newVertex = newVertices[nSegment];
              vertex = vertices[nSegment];
              if (vertex.x != newVertex.x || vertex.y != newVertex.y) {
                break;
              }
              prevVertex = vertex;
            }
            newVertex = newVertices[nSegment];
            if (nSegment >= vertices.length) {
              vertex = this.getTargetPoint()
            }
            if (nSegment == 0) {
              prevVertex = this.getSourcePoint();
            }

            let newVertexProject = {};
            let percent = this._getPercentSegmInfo(prevVertex, vertex, newVertex);
            newVertexProject.x = prevVertex.x + (vertex.x - prevVertex.x) * percent;
            newVertexProject.y = prevVertex.y + (vertex.y - prevVertex.y) * percent;
            for (let id in connectedLinks) {
              let connectedLink = connectedLinks[id];
              let connectedLinkObjectModel = connectedLink.model.get('objectModel');
              let percent = this._getPercentSegmInfo(prevVertex, newVertexProject, connectedLink.sourcePoint);
              if (percent >= 0) {
                connectedLinkObjectModel.set('startSegmNo', nSegment);
              } else {
                percent = this._getPercentSegmInfo(newVertexProject, vertex, connectedLink.sourcePoint);
                if (percent >= 0) {
                  connectedLinkObjectModel.set('startSegmNo', nSegment+1);
                } else {
                  let startSegmNo = connectedLinkObjectModel.get('startSegmNo');
                  if (startSegmNo >= nSegment) {
                    connectedLinkObjectModel.set('startSegmNo', startSegmNo + 1);
                  }
                }
              }
            }

          } else {
            if (delta <0) { //Removing vertex0
              let prevVertex, vertex, removedVertex;
              for (nSegment = 0; nSegment < newVertices.length; nSegment+=1) {
                vertex = newVertices[nSegment];
                removedVertex = vertices[nSegment];
                if (vertex.x != removedVertex.x || vertex.y != removedVertex.y) {
                  break;
                }
                prevVertex = vertex;
              }
              removedVertex = vertices[nSegment];
              if (nSegment >= newVertices.length) {
                vertex = this.getTargetPoint()
              }
              if (nSegment == 0) {
                prevVertex = this.getSourcePoint();
              }
              let len1 = this._segmentLength(prevVertex, removedVertex);
              let fullLen = len1 + this._segmentLength(removedVertex, vertex);
              for (let id in connectedLinks) {
                let connectedLink = connectedLinks[id];
                let connectedLinkObjectModel = connectedLink.model.get('objectModel');
                let percent = this._getPercentSegmInfo(prevVertex, removedVertex, connectedLink.sourcePoint);
                if (percent >= 0) {
                  let len = this._segmentLength(prevVertex, connectedLink.sourcePoint);
                  percent = len / fullLen;
                  connectedLinkObjectModel.set('startSegmNo', nSegment);
                } else {
                  percent = this._getPercentSegmInfo(removedVertex, vertex, connectedLink.sourcePoint);
                  if (percent >= 0) {
                    connectedLinkObjectModel.set('startSegmNo', nSegment);
                    let len = len1 + this._segmentLength(removedVertex, connectedLink.sourcePoint);
                    percent = len / fullLen;
                    connectedLinkObjectModel.set('startSegmNo', nSegment);
                  }
                  else {
                    let segmNo = connectedLinkObjectModel.get('startSegmNo');
                    if (segmNo > nSegment+1) {
                      connectedLinkObjectModel.set('startSegmNo', segmNo-1);
                    }
                  }
                }

              }
            }
          }

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
      Add new history step.

      @method triggerHistoryStep
      @param {String} propName Changed property name
      @param {Object} newValue New value
      @param {Object} oldValue Old value
    */
    triggerHistoryStep(propName, newValue, oldValue) {
      let changes = A();

      const objectModel = this.get('objectModel');
      changes.addObject({ field: propName, oldValue: oldValue || objectModel.get(propName), newValue: newValue });
      this.graph.trigger('history:add', this.get('id'), changes);
    },

    connectedToLine: function() {
      let objectModel= this.get('objectModel');
      let ret= objectModel.get('primitive.EndLE.refType') == 'Link' && objectModel.get('primitive.EndLE.SegmNo') >= 0 ||
        objectModel.get('primitive.StartLE.refType') == 'Link' && objectModel.get('primitive.StartLE.SegmNo') >= 0;
      return ret;
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
          this.label(1, { position: { distance: this.getLabelDistance('startRole'), offset: -12 }, inverseTextDirection: true });
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

    _getPercentSegmInfo: function(point1, point2, middlePoint) {
      let minX = Math.min(point1.x, point2.x);
      let minY = Math.min(point1.y, point2.y);
      let maxX = Math.max(point1.x, point2.x);
      let maxY = Math.max(point1.y, point2.y);
      if (middlePoint.x < minX || middlePoint.y < minY || middlePoint.x > maxX || middlePoint.y > maxY) {
        return -1.0;
      }
      let len1 = this._segmentLength(point1, point2);
      let len2 = this._segmentLength(point1, middlePoint);
      let ret = len2 / len1;
      return ret;
    },

    _segmentLength: function(point1,point2) {
      let deltaX = point2.x - point1.x;
      let deltaY = point2.y - point1.y;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

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

joint.linkAnchors.connectionSegmRatio = function(endView/*, endMagnet, anchorReference, args*/) {
  let connectedLinks = endView.model.get('connectedLinks');
  if (!(this.id  in connectedLinks)) {
    connectedLinks[this.id] = this;
  }
  let segments=endView.path.segments;
  let objectModel = this.model.get('objectModel');
  let segmNo = objectModel.startSegmNo;
  let percent;
  if (segmNo >= 0) {
    percent = objectModel.startPercent;
  } else {
    segmNo =  objectModel.endSegmNo;
    percent = objectModel.endPercent;
  }
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
