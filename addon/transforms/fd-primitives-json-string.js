import DS from 'ember-data';

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
        let segsLengths = [];
        let linkLength = 0;
        for (let i =1; i < baseLink.Points.length; i++) {
          let x0 = baseLink.Points[i-1].X;
          let y0 = baseLink.Points[i-1].Y;
          let x1 = baseLink.Points[i].X;
          let y1 = baseLink.Points[i].Y;
          let length = Math.sqrt((x0 -= x1) * x0 + (y0 -= y1) * y0);
          linkLength += length;
          segsLengths.push(length);
        }
        let crossedLinksInfo = linkTree[parentClassId][baseLinkId];
        for (let i = 0; i < crossedLinksInfo.length; i++) {
          let crossedLinkInfo =  crossedLinksInfo[i];
          let segmNo = crossedLinkInfo.LE.SegmNo;
          let length = 0;
          let j;
          for (j = 0; j < segmNo; j++) {
            length += segsLengths[j];
          }
          length += segsLengths[j] * crossedLinkInfo.LE.Percent;
          let connectedLink = elements[crossedLinkInfo.connectedLinkId];
          crossedLinkInfo.LE.ratio = length / linkLength;
        }
      }
    }
    primitives = [];
    for (let elementUuid in elements) {
      primitives.push(elements[elementUuid]);
    }
    primitivesJsonString = JSON.stringify(primitives);
    return primitivesJsonString;    
  },
  
  _linkTypes() {
    return {
      'STORMCASE.UML.cad.Inheritance, UMLCAD': {},
      'STORMCASE.UML.cad.Aggregation, UMLCAD': {},
      'STORMCASE.UML.cad.Composition, UMLCAD': {},
      'STORMCASE.UML.cad.Association, UMLCAD': {},
      'STORMCASE.UML.cad.Realization, UMLCAD': {},
      'STORMCASE.UML.Common.NoteConnector, UMLCommon': {}
    };
  },  
  
    
  serialize(deserialized) {
    return deserialized;
  }
});
