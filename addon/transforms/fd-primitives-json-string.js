import DS from 'ember-data';
import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default DS.Transform.extend({
  deserialize(primitivesJsonString) {
    let primitives = JSON.parse(primitivesJsonString) || [];
    let elements = {};
    let linksIds = [];
    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      let primitiveId = primitive.$id;
      elements[primitiveId] = primitive;
      if (primitive.$type === 'STORMCASE.UML.cad.Inheritance, UMLCAD') {
        linksIds.push(primitiveId);
      }
    }

    let linkTree = {};
    for (let i = 0; i < linksIds.length; i++) {
      let linkId = linksIds[i];
      let link = elements[linkId];
      let startPrimitiveId = link.StartPrimitive.$ref;
      let startPrimitive = elements[startPrimitiveId];
      if (startPrimitive.$type === 'STORMCASE.UML.cad.Inheritance, UMLCAD') {
        let parentId = startPrimitive.StartPrimitive.$ref;
        if (!(parentId in linkTree)) {
          linkTree[parentId] = {};
        }

        if (!(startPrimitiveId in linkTree[parentId])) {
          linkTree[parentId][startPrimitiveId] = [];
        }

        linkTree[parentId][startPrimitiveId].push(linkId);
      }

    }

    let linkConnectorWidth = 20;
    let linkConnectorHeight = 20;
    for (let parentClassId in linkTree) {
      for (let baseLinkId in linkTree[parentClassId]) {
        let baseLink = elements[baseLinkId];
        baseLink.$type = 'STORMCASE.UML.cad.LinkInheritance, UMLCAD';
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
          '$type': 'STORMCASE.UML.cad.Inheritance, UMLCAD',
          'StartPrimitive': {
            '$ref': parentClassId
          },
          'EndPrimitive': {
            '$ref': linkConnectorUuid
          },
          'Points': [
          ]
        };
        elements[parentLinkUuid] = parentLink;
        for (let i = 0; i < linkTree[parentClassId][baseLinkId].length; i++) {
          let linkId = linkTree[parentClassId][baseLinkId][i];
          let link = elements[linkId];
          if (i === 0) {
            linkConnector.Location.X = link.StartPoint.X - linkConnectorWidth / 2;
            linkConnector.Location.Y = link.StartPoint.Y - linkConnectorHeight / 2;
          }

          link.StartPrimitive.$ref = linkConnectorUuid;
          link.StartLE.Primitive.$ref = linkConnectorUuid;
          link.$type = 'STORMCASE.UML.cad.LinkInheritance, UMLCAD';
        }

        elements[linkConnectorUuid] = linkConnector;
      }
    }

    primitives = [];
    for (let elementUuid in elements) {
      primitives.push(elements[elementUuid]);
    }

    primitivesJsonString = JSON.stringify(primitives);
    return primitivesJsonString;
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
      Ember.set(baseLink, '$type',  'STORMCASE.UML.cad.Inheritance, UMLCAD');
      Ember.set(baseLink.StartPrimitive, '$ref', parentClassId);
      Ember.set(baseLink.StartLE.Primitive, '$ref', parentClassId);
      for (let i = 1; i < inConnectorLinksIds.length; i++) {
        let inConnectorLinkId =  inConnectorLinksIds[i];
        let inConnectorLink = elements[inConnectorLinkId];
        Ember.set(inConnectorLink, '$type',  'STORMCASE.UML.cad.Inheritance, UMLCAD');
        Ember.set(inConnectorLink.StartPrimitive, '$ref', baseLinkId);
        Ember.set(inConnectorLink.StartLE.Primitive, '$ref', baseLinkId);
        Ember.set(inConnectorLink.StartPoint, 'X', linkConnector.Location.X);
        Ember.set(inConnectorLink.StartPoint, 'Y', linkConnector.Location.Y);
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
