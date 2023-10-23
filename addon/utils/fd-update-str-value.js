import { isBlank, isNone } from '@ember/utils';
import RepositoryAccessModifier  from '../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

/**
  Update Attributes.
*/
let updateAttributes = function(classObject, store) {
  const attributesStr = classObject.get('attributesStr');
  if (isNone(attributesStr) || isBlank(attributesStr.trim())) {
    return;
  }

  const attributes = classObject.get('attributes');
  const copyAttributes = attributes.slice();
  copyAttributes.forEach((attr) => attr.deleteRecord());

  let regexStr;
  if (classObject.get('stereotype') === '«enumeration»') {
    regexStr = /()()([\wа-я]+)()(\s*=\s*(.+))?/i;
  } else {
    regexStr = /([/]?)([+\-#]?)([\wа-я]+)\s*:\s*([\wа-я]+)(\s*=\s*(.+))?/i;
  }

  const attributesStrArray = attributesStr.split('\n');
  const resultMatch = attributesStrArray.map((attStr) => {
    return attStr.match(regexStr);
  });

  resultMatch.forEach((result) => {
    if (!isNone(result)) {
      const stored = result[1];
      const modifier = result[2];
      const attrName = result[3];
      const attrType = result[4];
      const defaultVal = result[6];

      let attribute = attributes.findBy('name', attrName);
      if (isNone(attribute)) {
        attribute = store.createRecord('fd-dev-attribute', {
          class: classObject,
          name: attrName
        });
      } else if (!attribute.get('isNew')) {
        attribute.rollbackAttributes();
      }

      attribute.set('stored', stored === '');
      attribute.set('type', attrType);
      attribute.set('defaultValue', defaultVal || null);

      switch (modifier) {
        case '':
          attribute.set('accessModifier', RepositoryAccessModifier.Public);
          break;
        default:
          attribute.set('accessModifier', modifier);
      }
    }
  });
};

/**
  Update Methods.
*/
let updateMethods = function(classObject, store) {
  const methodsStr = classObject.get('methodsStr');
  if (isNone(methodsStr) || isBlank(methodsStr.trim())) {
    return;
  }

  const methods = classObject.get('methods');
  const copyMethods = methods.slice();
  copyMethods.map((delMethod) => {
    delMethod.deleteRecord();
  });

  const regexStr = /([/]?)([+\-#]?)([\wа-я]+)(<([\wа-я:,;]+)>)?\((.+)?\)(\s*:\s*([\wа-я]+))?/i;
  const methodsStrArray = methodsStr.split('\n');
  const resultMatch = methodsStrArray.map((methStr) => {
    return methStr.match(regexStr);
  });

  resultMatch.forEach((result) => {
    if (!isNone(result)) {
      const methEvent = result[1];
      const modifier = result[2];
      const methName = result[3];
      const methParams = result[6];
      const methType = result[8];
      const methTypeParams = result[5];

      const sortMethParams = function(str) {
        if (!isBlank(str)) {
          const array = str.split(',');
          const newArray = array.sort();

          return newArray.join(',');
        }

        return '';
      };

      const methParamsSort = sortMethParams(methParams);
      let method = methods.find(function(meth) {
        const name = meth.get('name');
        const params = sortMethParams(meth.get('parametersStr'));
        if (name === methName && params === methParamsSort) {
          return meth;
        }
      });

      if (isNone(method)) {
        method = store.createRecord('fd-dev-method', {
          class: classObject,
          name: methName
        });
      } else {
        method.rollbackAttributes();
      }

      method.set('isEvent', methEvent === '/');
      method.set('parametersStr', methParamsSort);
      method.set('type', methType);
      method.set('typeParametersStr', methTypeParams || '');

      switch (modifier) {
        case '':
          method.set('accessModifier', RepositoryAccessModifier.Public);
          break;
        default:
          method.set('accessModifier', modifier);
      }
    }
  });
};

/**
  Update repositoryObjects by str properties.
*/
let updateObjectByStr = function(classObject, store) {
  updateAttributes(classObject, store);
  updateMethods(classObject, store);
};

/**
  Update NameStr.
*/
let updateNameStr = function(classObject) {
  const name = classObject.get('name');
  classObject.set('nameStr', name);
};

/**
  Update AttributesStr.
*/
let updateAttributesStr = function(classObject) {
  let newAttributesStr = '';
  let attributes = classObject.get('attributes').filterBy('isDeleted', false);
  attributes.forEach((attribute) => {
    let attrName = attribute.get('name');
    if (!isBlank(attrName)) {
      if (!isBlank(newAttributesStr)) {
        newAttributesStr += '\n';
      }

      if (classObject.get('stereotype') !== '«enumeration»') {
        let stored = attribute.get('stored');
        if (!isNone(stored) && !stored) {
          newAttributesStr += '/';
        }

        newAttributesStr += attribute.get('accessModifier') || '+';
        newAttributesStr += attrName;
        let attrType = attribute.get('type');
        if (!isBlank(attrType)) {
          newAttributesStr += ':' + attrType;
        }

        let attrDefaultValue = attribute.get('defaultValue');
        if (!isNone(attrDefaultValue) && !isBlank(attrDefaultValue.trim())) {
          newAttributesStr += "=" + attrDefaultValue.trim();
        }
      } else {
        newAttributesStr += attrName;
        let attrDefaultValue = attribute.get('defaultValue');
        if (!isNone(attrDefaultValue) && !isBlank(attrDefaultValue.trim())) {
          newAttributesStr += "=" + attrDefaultValue.trim();
        }
      }
    }
  });

  let changedAttributes = classObject.get('attributes').filterBy('hasDirtyAttributes');

  if (!isBlank(newAttributesStr) || changedAttributes.length > 0) {
    classObject.set('attributesStr', newAttributesStr);
  }
};

/**
  Update MethodsStr.
*/
let updateMethodsStr = function(classObject) {
  let newMethodsStr = '';
  let methods = classObject.get('methods').filterBy('isDeleted', false);
  methods.forEach((method) => {
    let methName = method.get('name');
    if (!isBlank(methName)) {
      if (!isBlank(newMethodsStr)) {
        newMethodsStr += '\n';
      }

      let isEvent = method.get('isEvent');
      if (!isNone(isEvent) && isEvent) {
        newMethodsStr += '/';
      }

      newMethodsStr += method.get('accessModifier') || '+';
      newMethodsStr += methName;
      let methTypeParametersStr = method.get('typeParametersStr');
      if (!isBlank(methTypeParametersStr)) {
        newMethodsStr += '<' + methTypeParametersStr + '>';
      }

      let parametersStr = method.get('parametersStr') || '';
      newMethodsStr += '(' + parametersStr + ')';
      let methType = method.get('type');
      if (!isBlank(methType)) {
        newMethodsStr += ':' + methType;
      }
    }
  });

  let changedMethods= classObject.get('methods').filterBy('hasDirtyAttributes');

  if (!isBlank(newMethodsStr) || changedMethods.length > 0) {
    classObject.set('methodsStr', newMethodsStr);
  }
};

/**
  Update str properties class by repositoryObjects.
*/
let updateStrByObjects = function(classObject) {
  updateNameStr(classObject);
  updateAttributesStr(classObject);
  updateMethodsStr(classObject);
};

/**
  Update startRole.
*/
let updateStartRole = function(linkObject) {
  let startRoleStr = linkObject.getWithDefault('startRoleStr', '').trim();
  if (startRoleStr[0] === '+' || startRoleStr[0] === '-' || startRoleStr[0] === '#') {
    startRoleStr = startRoleStr.slice(1);
  }

  linkObject.set('startRole', startRoleStr);
};

/**
  Update endRole.
*/
let updateEndRole = function(linkObject) {
  let endRoleStr = linkObject.getWithDefault('endRoleStr', '').trim();
  if (endRoleStr[0] === '+' || endRoleStr[0] === '-' || endRoleStr[0] === '#') {
    endRoleStr = endRoleStr.slice(1);
  }

  linkObject.set('endRole', endRoleStr);
};

/**
  Update repositoryObjects link by str properties.
*/
let updateLinkByStr = function(linkObject) {
  updateStartRole(linkObject);
  updateEndRole(linkObject);
};

/**
  Update startRoleStr.
*/
let updateStartRoleStr = function(linkObject) {
  let startRole = linkObject.get('startRole');
  if (startRole[0] === '+' || startRole[0] === '-' || startRole[0] === '#') {
    startRole = startRole.slice(1);
  }

  let newStartRole = '';
  if (!isBlank(startRole)) {
    newStartRole =  `${linkObject.getWithDefault('startRoleAccessModifier', '+')}${startRole.trim()}`;
  }

  linkObject.set('startRoleStr', newStartRole);
};

/**
  Update endRoleStr.
*/
let updateEndRoleStr = function(linkObject) {
  let endRole = linkObject.get('endRole');
  if (endRole[0] === '+' || endRole[0] === '-' || endRole[0] === '#') {
    endRole = endRole.slice(1);
  }

  let newEndRole = '';
  if (!isBlank(endRole)) {
    newEndRole =  `${linkObject.getWithDefault('endRoleAccessModifier', '+')}${endRole.trim()}`;
  }

  linkObject.set('endRoleStr', newEndRole);
};

/**
  Update str properties link by repositoryObjects.
*/
let updateStrByLink = function(linkObject) {
  updateStartRoleStr(linkObject);
  updateEndRoleStr(linkObject);
};

export {
  updateObjectByStr,
  updateStrByObjects,
  updateLinkByStr,
  updateStrByLink
};
