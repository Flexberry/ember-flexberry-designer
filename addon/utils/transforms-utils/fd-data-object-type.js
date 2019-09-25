/**
  @module ember-flexberry-designer
*/

import FdDataObjectTypes from '../../objects/fd-data-object-types';

/**
  Returns an array of DataObjectType.

  @method deserialize
  @param {String} dataObjectType Definition the dataObjectType in XML format.
  @return {Object} An object of dataObjectType.
*/
export function deserialize(dataObjectType) {
  let ret = FdDataObjectTypes.create({
    className: '',
    newContainerName: '',
    editContainerName: ''
  });

  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(dataObjectType, 'text/xml');
  if (xmlDoc) {

    // Get Types from xml.
    let types = xmlDoc.getElementsByTagName('Types');
    if (types.length > 0) {
      let typesList = types[0].getElementsByTagName('TypesList');

      // Get TypesList from xml.
      if (typesList.length > 0) {
        let items = typesList[0].getElementsByTagName('Item');
        let item = items[0];
        ret.set('className', item.getAttribute('ClassName'));
        ret.set('newContainerName', item.getAttribute('NewContainerName'));
        ret.set('editContainerName', item.getAttribute('EditContainerName'));
      }
    }
  }

  return ret;
}

/**
  Returns definition the dataObjectType in XML format.

  @method serialize
  @param {Object} deserialized An object dataObjectType.
  @return {String} Definition the dataObjectType in XML format.
*/
export function serialize(deserialized) {
  if (!deserialized) {
    return deserialized;
  }

  let dataObjectTypeItemList = '';

  if (deserialized instanceof FdDataObjectTypes) {
    let className = `ClassName="${deserialized.className}"`;
    let newContainerName = `NewContainerName="${deserialized.newContainerName}"`;
    let editContainerName = `EditContainerName="${deserialized.editContainerName}"`;
    dataObjectTypeItemList += `<Item ${className} ${newContainerName} ${editContainerName} />`;
  }

  return `<Types><TypesList>${dataObjectTypeItemList}</TypesList></Types>`;
}
