import DS from 'ember-data';
import { set } from '@ember/object';
import uuid from 'npm:node-uuid';

export default DS.Transform.extend({

  deserialize(primitivesJsonString) {
    let primitives = JSON.parse(primitivesJsonString) || [];
    let linkTypes = this._linkTypes();
    let elements = {};
    let linksIds = [];
    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      let primitiveId = primitive.$id;
      elements[primitiveId] = primitive;
//       if (primitive.$type === 'STORMCASE.UML.cad.Inheritance, UMLCAD') {
      if (primitive.$type in linkTypes) {
        linksIds.push(primitiveId);
      }
    }

    let linkTree = {};
    for (let i = 0; i < linksIds.length; i++) {
      let linkId = linksIds[i];
      let link = elements[linkId];
      let startPrimitiveId = link.StartPrimitive.$ref;
      let startPrimitive = elements[startPrimitiveId];
      let endPrimitiveId = link.EndPrimitive.$ref;
      let endPrimitive = elements[endPrimitiveId];
//       if (startPrimitive.$type === 'STORMCASE.UML.cad.Inheritance, UMLCAD') {
      if (startPrimitive.$type in linkTypes || endPrimitive.$type in linkTypes) {
        let baseLinkId;
        let parentId;
        let LE;
        let connectorToLinkEnd = startPrimitive.$type in linkTypes;
        if (connectorToLinkEnd) {
          baseLinkId = startPrimitiveId;
          parentId = startPrimitive.StartPrimitive.$ref;
          LE = link.StartLE;
        } else {
          baseLinkId = endPrimitiveId;
          parentId = endPrimitive.StartPrimitive.$ref;
          LE = link.EndLE;
        }
        let crossedLinkInfo = {
            connectedLinkId: linkId,
            LE: LE,
            connectorToLinkEnd: connectorToLinkEnd
        };

        if (!(parentId in linkTree)) {
          linkTree[parentId] = {};
        }

        if (!(baseLinkId in linkTree[parentId])) {
          linkTree[parentId][baseLinkId] = [];
        }

        linkTree[parentId][baseLinkId].push(crossedLinkInfo);
      }

    }

    for (let parentClassId in linkTree) {
      for (let baseLinkId in linkTree[parentClassId]) {
        let baseLink = elements[baseLinkId];
        let EnPrimitiveRef = baseLink.EndPrimitive.$ref;
        let crossedLinksInfo = linkTree[parentClassId][baseLinkId];
        let baseLinkPoints =  baseLink.Points;
        baseLink.Points = [baseLinkPoints[0] ];
        let prevX = baseLinkPoints[0].X;
        let prevY = baseLinkPoints[0].Y;
        let lastPointNo = 0;
        crossedLinksInfo.sort(this._cmpByLE);
        let linkConnector;
        for (let i = 0; i < crossedLinksInfo.length; i++) {
          let crossedLinkInfo =  crossedLinksInfo[i];
          let crossPoint = crossedLinkInfo.LE.Point;
          let connectedLinkId = crossedLinkInfo.connectedLinkId;
          let connectedLink = elements[connectedLinkId];
          while (lastPointNo < crossedLinkInfo.LE.SegmNo) {
            baseLink.Points.push(baseLinkPoints[lastPointNo]);
            lastPointNo += 1;
          }

          baseLink.Points.push(crossPoint);
          let X = crossPoint.X;
          let Y = crossPoint.Y;
          if (i==0 || prevX != X || prevY != Y) {
            linkConnector = this._linkConnector(X, Y);
            elements[linkConnector.$id] = linkConnector;
            baseLink.EndPrimitive.$ref = linkConnector.$id;
//             baseLink.EndLE.Primitive.$ref = linkConnector.$id;
            elements[baseLink.$id] = baseLink;
            baseLink = this._toConnectorLink(parentClassId, linkConnector.$id);
            baseLink.Points.push(crossPoint);
          }

          if (crossedLinkInfo.connectorToLinkEnd) {
            connectedLink.EndPrimitive.$ref = linkConnector.$id;
            connectedLink.EndLE.Primitive.$ref = linkConnector.$id;
          } else {
            connectedLink.StartPrimitive.$ref = linkConnector.$id;
            connectedLink.StartLE.Primitive.$ref = linkConnector.$id;
          }
          prevX = X;
          prevY = Y;
        }

        while (lastPointNo < baseLinkPoints.length) {
          baseLink.Points.push(baseLinkPoints[lastPointNo]);
          lastPointNo += 1;
        }
        baseLink.EndPrimitive.$ref = EnPrimitiveRef;
        baseLink.EndLE.Primitive.$ref = EnPrimitiveRef;
        elements[baseLink.$id] = baseLink;
      }
    }

/** ---------------------------

    let linkConnectorWidth = 20;
    let linkConnectorHeight = 20;
    for (let parentClassId in linkTree) {
      for (let baseLinkId in linkTree[parentClassId]) {
        let baseLink = elements[baseLinkId];
//         baseLink.$type = 'STORMCASE.UML.cad.LinkInheritance, UMLCAD';
        let baseLinkType = baseLink.$type;
        baseLink.$type = linkTypes[baseLinkType].sublinkType;
        let linkConnectorUuid = '{' + uuid.v4() + '}';
        let linkConnector = {
          '$id': linkConnectorUuid,
          '$type': 'STORMCASE.UML.cad.LinkConnector, UMLCAD',
          'Name': {
            'Text': 'LinkConnector'
          },
          'Location': {
            '$type': 'System.Drawing.Point, System.Drawing',
            'IsEmpty': false,
            'X': -1,
            'Y': -1
          },
          'Size': {
            '$type': 'System.Drawing.Size, System.Drawing',
            'IsEmpty': false,
            'Width': linkConnectorWidth,
            'Height': linkConnectorHeight
          }
        };
        baseLink.StartPrimitive.$ref = linkConnectorUuid;
        baseLink.StartLE.Primitive.$ref = linkConnectorUuid;
        let parentLinkUuid = '{' + uuid.v4() + '}';
        let parentLink = {
          '$id': parentLinkUuid,
//           '$type': 'STORMCASE.UML.cad.Inheritance, UMLCAD',
          '$type': baseLinkType,
          'StartPrimitive': {
            '$ref': parentClassId
          },
          'EndPrimitive': {
            '$ref': linkConnectorUuid
          },
          'Points': [
          ]
        };
        let link0Id = linkTree[parentClassId][baseLinkId][0];
        let link0 =  elements[link0Id];
        let nCrossSegment = this._findCrossSegment(baseLink.Points, link0.StartPoint);
        for (let i = 0; i < nCrossSegment; i++) {
          parentLink.Points.push(baseLink.Points[i]);
        }

        parentLink.Points.push(link0.StartPoint);
        let baseLinkPoints = [ link0.StartPoint ];
        for (let i = nCrossSegment; i < baseLink.Points.length; i++) {
          baseLinkPoints.push(baseLink.Points[i]);
        }

        baseLink.Points = baseLinkPoints;
        linkConnector.Location.X = link0.StartPoint.X - linkConnectorWidth / 2;
        linkConnector.Location.Y = link0.StartPoint.Y - linkConnectorHeight / 2;
        elements[parentLinkUuid] = parentLink;
        for (let i = 0; i < linkTree[parentClassId][baseLinkId].length; i++) {
          let linkId = linkTree[parentClassId][baseLinkId][i];
          let link = elements[linkId];
          link.StartPrimitive.$ref = linkConnectorUuid;
          link.StartLE.Primitive.$ref = linkConnectorUuid;
//           link.$type = 'STORMCASE.UML.cad.LinkInheritance, UMLCAD';
          link.$type = linkTypes[baseLinkType].sublinkType;
        }

        elements[linkConnectorUuid] = linkConnector;
      }
    }
*/
    primitives = [];
    for (let elementUuid in elements) {
      primitives.push(elements[elementUuid]);
    }

    primitivesJsonString = JSON.stringify(primitives);
    return primitivesJsonString;
  },

  _linkTypes() {
    return {
      'STORMCASE.UML.cad.Inheritance, UMLCAD': {
        sublinkType: 'STORMCASE.UML.cad.LinkInheritance, UMLCAD',
        isBaseLink: true,
      },
      'STORMCASE.UML.cad.Aggregation, UMLCAD': {
        sublinkType: 'STORMCASE.UML.cad.LinkInheritance, UMLCAD',
        isBaseLink: true,
      },
      'STORMCASE.UML.cad.Composition, UMLCAD': {
        sublinkType: 'STORMCASE.UML.cad.LinkInheritance, UMLCAD',
        isBaseLink: true,
      },
      'STORMCASE.UML.cad.Association, UMLCAD': {
        sublinkType: 'STORMCASE.UML.cad.LinkInheritance, UMLCAD',
        isBaseLink: true,
      },
      'STORMCASE.UML.cad.Realization, UMLCAD': {
        sublinkType: 'SSTORMCASE.UML.cad.Realization, UMLCAD',
        isBaseLink: false,
      },
      'STORMCASE.UML.Common.NoteConnector, UMLCommon': {
        sublinkType: 'STORMCASE.UML.Common.NoteConnector, UMLCommon',
        isBaseLink: false,
      }
    };
  },

  _linkConnector(X, Y) {
    let linkConnectorWidth = 20;
    let linkConnectorHeight = 20;
    let linkConnectorUuid = '{' + uuid.v4() + '}';
    let linkConnector = {
      '$id': linkConnectorUuid,
      '$type': 'STORMCASE.UML.cad.LinkConnector, UMLCAD',
      'Name': {
        'Text': 'LinkConnector'
      },
      'Location': {
        '$type': 'System.Drawing.Point, System.Drawing',
        'IsEmpty': false,
        'X': X - linkConnectorWidth / 2,
        'Y': Y - linkConnectorHeight / 2
      },
      'Size': {
        '$type': 'System.Drawing.Size, System.Drawing',
        'IsEmpty': false,
        'Width': linkConnectorWidth,
        'Height': linkConnectorHeight
      }
    };
    return linkConnector;
  },

  _toConnectorLink(fromUuid, toUuid) {
    let toConnectorLinkUuid = '{' + uuid.v4() + '}';
    let toConnectorLink = {
      '$id': toConnectorLinkUuid,
      '$type': 'STORMCASE.UML.cad.LinkInheritance, UMLCAD',
      'StartPrimitive': {
        '$ref': fromUuid
      },
      'StartLE': {
        'Primitive': {
          '$ref': '',
        }
      },
      'EndPrimitive': {
        '$ref': toUuid
      },
      'EndLE': {
        'Primitive': {
          '$ref': '',
        }
      },
      'Points': [
      ]
    };
    return toConnectorLink;
  },

  _cmpByLE(crossInfo1, crossInfo2) {
    let ret = crossInfo1.LE.SegmNo - crossInfo2.LE.SegmNo;
    if (ret == 0) {
      ret = crossInfo1.LE.Percent - crossInfo2.LE.Percent;
    }

    return ret;
  },


  _findCrossSegment(points, crossPoint) {
    let i;
    for (i = 0; i < points.length-1; i++) {
      let point1 = points[i];
      let point2 = points[i+1];
      let minX = Math.min(point1.X, point2.X);
      let maxX = Math.max(point1.X, point2.X);
      let minY = Math.min(point1.Y, point2.Y);
      let maxY = Math.max(point1.Y, point2.Y);
      if (crossPoint.X >= minX && crossPoint.X <= maxX && crossPoint.Y >= minY && crossPoint.Y <= maxY) {
        let a = point1.Y - point2.Y;
        let b = point2.X - point1.X;
        let c = point1.X * point2.Y - point2.X * point1.Y;
        let norm = Math.sqrt(a * a + b * b);
        let d = a *  crossPoint.X + b * crossPoint.Y + c;
        d = Math.abs(d / norm);
        if (d < 2) {
          break;
        }
      }
    }

    return i+1;
  },

  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }

    let primitives = JSON.parse(deserialized) || [];
    let elements = {};
    let linksIds = [];
    let linkConnectorsIds = [];
    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      let primitiveId = primitive.$id;
      elements[primitiveId] = primitive;
      switch (primitive.$type) {
        case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
          linksIds.push(primitiveId);
          break;
        case 'STORMCASE.UML.cad.LinkInheritance, UMLCAD':
          linksIds.push(primitiveId);
          break;
        case 'STORMCASE.UML.cad.LinkConnector, UMLCAD':
          linkConnectorsIds.push(primitiveId);
          break;
      }
    }

    let inConnectorsLinksIds = [];
    let outConnectorsLinksIds = [];
    let inConnectorsLinksTree = {};
    let outConnectorsLinksTree = {};
    for (let i = 0; i < linksIds.length; i++) {
      let linkId = linksIds[i];
      let link = elements[linkId];
      let startPrimitiveId = link.StartPrimitive.$ref;
      let startPrimitive = elements[startPrimitiveId];
      let endPrimitiveId = link.EndPrimitive.$ref;
      let endPrimitive = elements[endPrimitiveId];
      let linkConnectorId;
      if (startPrimitive.$type === 'STORMCASE.UML.cad.LinkConnector, UMLCAD') {
        inConnectorsLinksIds.push(linkId);
        linkConnectorId = startPrimitive.$id;
        if (!(linkConnectorId in inConnectorsLinksTree)) {
          inConnectorsLinksTree[linkConnectorId] = [];
        }

        inConnectorsLinksTree[linkConnectorId].push(linkId);
      } else {
        if (endPrimitive.$type === 'STORMCASE.UML.cad.LinkConnector, UMLCAD') {
          outConnectorsLinksIds.push(linkId);
          linkConnectorId = endPrimitive.$id;
          if (linkConnectorId in outConnectorsLinksTree) {
            throw new Error(`linkConnector: '$linkConnectorId' has more, then one parent Class`);
          }

          outConnectorsLinksTree[linkConnectorId] = linkId;
        }
      }
    }

    for (let linkConnectorId in inConnectorsLinksTree) {
      let linkConnector = elements[linkConnectorId];
      let outConnectorLinkId = outConnectorsLinksTree[linkConnectorId];
      let outConnectorLink = elements[outConnectorLinkId];
      let parentClassId = outConnectorLink.StartPrimitive.$ref;
      let inConnectorLinksIds = inConnectorsLinksTree[linkConnectorId];
      let baseLinkId = inConnectorLinksIds[0];
      let baseLink = elements[baseLinkId];
      let baseLinkPoints = baseLink.Points;
      baseLinkPoints.shift();
      let outConnectorLinkPoints = outConnectorLink.Points;
      outConnectorLinkPoints.pop();
      let mergePoints=outConnectorLinkPoints.concat(baseLinkPoints);
      set(baseLink, 'Points', mergePoints);
      set(baseLink, '$type',  'STORMCASE.UML.cad.Inheritance, UMLCAD');
      set(baseLink.StartPrimitive, '$ref', parentClassId);
      set(baseLink.StartLE.Primitive, '$ref', parentClassId);
      for (let i = 1; i < inConnectorLinksIds.length; i++) {
        let inConnectorLinkId =  inConnectorLinksIds[i];
        let inConnectorLink = elements[inConnectorLinkId];
        set(inConnectorLink, '$type',  'STORMCASE.UML.cad.Inheritance, UMLCAD');
        set(inConnectorLink.StartPrimitive, '$ref', baseLinkId);
        set(inConnectorLink.StartLE.Primitive, '$ref', baseLinkId);
        set(inConnectorLink.StartPoint, 'X', linkConnector.Location.X);
        set(inConnectorLink.StartPoint, 'Y', linkConnector.Location.Y);
      }

      delete elements[linkConnectorId];
    }

    for (let i in outConnectorsLinksIds) {
      let outConnectorsLinkId = outConnectorsLinksIds[i];
      delete elements[outConnectorsLinkId];
    }

    primitives = [];
    for (let elementUuid in elements) {
      primitives.push(elements[elementUuid]);
    }

    let primitivesJsonString = JSON.stringify(primitives);
    return primitivesJsonString;
  }
});
