import { isBlank, isNone } from '@ember/utils';
import RepositoryAccessModifier  from '../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

/**
  Update Attributes.
*/
let updateAttributes = function(classObject, store) {
  let attributesStr = classObject.get('attributesStr');
  if (isNone(attributesStr) || isBlank(attributesStr.trim())) {
    return '';
  }

  let attributes = classObject.get('attributes');
  let copyAttributes = attributes.slice();
  copyAttributes.forEach((attr) => attr.deleteRecord());

  let regexStr;
  if (classObject.get('stereotype') === '«enumeration»') {
    regexStr = /()()(\w+)()(\s*=\s*(.+))?/i;
  } else {
    regexStr = /([/]?)([+\-#]?)(\w+)\s*:\s*([\wа-яА-Я]+)(\s*=\s*(.+))?/i;
  }

  let attributesStrArray = attributesStr.split('\n');
  let resultMatch = attributesStrArray.map((attStr) => {
    return attStr.match(regexStr);
  });

  let errorMatch = resultMatch.indexOf(null);
  if (errorMatch === -1) {
      resultMatch.forEach((result) => {
        let stored = result[1];
        let modifier = result[2];
        let attrName = result[3];
        let attrType = result[4];
        let defaultVal = result[6];

        let attribute = attributes.findBy('name', attrName);
        if (isNone(attribute)) {
          attribute = store.createRecord('fd-dev-attribute', {
            class: classObject,
            name: attrName
          });
        } else {
          attribute.rollbackAttributes();
        }

        attribute.set('stored', stored === '');
        attribute.set('type', attrType);
        attribute.set('defaultValue', defaultVal);

        switch (modifier) {
          case '':
            attribute.set('accessModifier', RepositoryAccessModifier.Public);
            break;
          default:
            attribute.set('accessModifier', modifier);
        }
      });

      return '';
  } else {
    return 'Invalid attribute:' + attributesStrArray[errorMatch] + '. ';
  }
};

/**
  Update Methods.
*/
let updateMethods = function(classObject, store) {
  let methodsStr = classObject.get('methodsStr');
  if (isNone(methodsStr) || isBlank(methodsStr.trim())) {
    return '';
  }

  let methods = classObject.get('methods');
  let copyMethods = methods.slice();
  copyMethods.map((delMethod) => {
    delMethod.deleteRecord();
  });

  let regexStr = /([/]?)([+\-#]?)(\w+)(<([\w:,;]+)>)?\((.+)?\)(\s*:\s*(\w+))?/i;
  let methodsStrArray = methodsStr.split('\n');
  let resultMatch = methodsStrArray.map((methStr) => {
    return methStr.match(regexStr);
  });

  let errorMatch = resultMatch.indexOf(null);
  if (errorMatch === -1) {
      resultMatch.forEach((result) => {
        let methEvent = result[1];
        let modifier = result[2];
        let methName = result[3];
        let methParams = result[6];
        let methType = result[8];
        let methTypeParams = result[5];

        let sortMethParams = function(str) {
          if (!isBlank(str)) {
            let array = str.split(',');
            let newArray = array.sort();

            return newArray.join(',');
          }

          return str;
        };

        let methParamsSort = sortMethParams(methParams);
        let method = methods.find(function(meth) {
          let name = meth.get('name');
          let params = sortMethParams(meth.get('parametersStr'));
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
        method.set('typeParametersStr', methTypeParams);

        switch (modifier) {
          case '':
            method.set('accessModifier', RepositoryAccessModifier.Public);
            break;
          default:
            method.set('accessModifier', modifier);
        }
      });

      return '';
  } else {
    return 'Invalid method: ' + methodsStrArray[errorMatch] + '.';
  }
};

/**
  Update repositoryObjects by str properties.
*/
let updateObjectByStr = function(classObject, store) {
  let attrMassage = updateAttributes(classObject, store);
  let methMassage = updateMethods(classObject, store);
  return attrMassage + methMassage;
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

  classObject.set('attributesStr', newAttributesStr);
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

  classObject.set('methodsStr', newMethodsStr);
};

/**
  Update str properties by repositoryObjects.
*/
let updateStrByObjects = function(classObject) {
  updateAttributesStr(classObject);
  updateMethodsStr(classObject);

  return true;
};


export {
  updateAttributes,
  updateMethods,
  updateObjectByStr,
  updateAttributesStr,
  updateMethodsStr,
  updateStrByObjects
};
