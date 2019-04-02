import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default EmberObject.extend({

  _randomValue: computed(() => ({
    bool: function() {
      let ret = Math.random() * 2 > 1.0 ? 'true' : 'false';
      return ret;
    },

    char: function() {
      let ret = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
      return ret;
    },

    string: function() {
      let strs = [
        'Реверс инжиниринг',
        'Конференция',
        'Эйяфь-ядлайё-кюдль',
        'WEB интерфейс',
        'Метод',
        'Контрагент',
        'Геокоординаты',
        'Недостроенное здание',
        'Референдум о независимости'
      ];
      let ret = strs[Math.floor(Math.random() * strs.length)];
      return ret;
    },

    tFile: function() {
      let strs = [
        'http://flexberry.ru',
        'https://vk.com/flexberry',
        'hhtps://www.facebook.com/groups/Flexberry',
        'hhtp://twitter.com/Flexberry',
        'https://www.youtube.com/user/FlexberryPLATFORM'
      ];
      let ret = strs[Math.floor(Math.random() * strs.length)];
      return ret;
    },

    guid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0;
        let v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    decimal: function() {
      return (Math.random() * 1000000 - 500000).toFixed(2);
    },

    double: function() {
      return (Math.random() * 1000000 - 500000).toFixed(2);
    },

    float: function() {
      return (Math.random() * 1000000 - 500000).toFixed(2);
    },

    int: function() {
      return Math.floor((Math.random() * 4294967296) - (Math.random() * 2147483648));
    },

    short: function() {
      return Math.floor((Math.random() * 65536) - (Math.random() * 32768));
    },

    long: function() {
      return Math.floor((Math.random() * 18446744073709552000) - (Math.random() * 9223372036854776000));
    },

    uint: function() {
      return Math.floor((Math.random() * 4294967296));
    },

    ushort: function() {
      return Math.floor((Math.random() * 65536));
    },

    ulong: function() {
      return Math.floor((Math.random() * 18446744073709552000));
    },

    byte: function() {
      return Math.floor((Math.random() * 256));

    },

    sbyte: function() {
      return Math.floor((Math.random() * 256) - (Math.random() * 128));
    },

    NullableInt: function() {
      let ret = (Math.random() > 0.5) ? Math.floor((Math.random() * 4294967296) - (Math.random() * 2147483648)) : null;
      return ret;
    },

    NullableDecimal: function() {
      let ret = (Math.random() > 0.5) ? (Math.random() * 1000000 - 500000).toFixed(2) : null;
      return ret;
    },

    DateTime: function() {
      let ret = new Date(Math.floor(Math.random() * 2147483648 * 1000));
      return ret;
    },

    NullableDateTime: function() {
      let ret =  (Math.random() > 0.5) ? new Date(Math.floor(Math.random() * 2147483648 * 1000)) : null;
      return ret;
    },

    object: function() {
      let ret = '{}';
      return ret;
    },
  })),

  _checkValue: computed(() => ({
    bool: function(value) {
      let ret = value === 'true' || value === 'false';
      return ret;
    },

    char: function(value) {
      let ret = typeof value === 'string' && value.length <= 1;
      return ret;
    },

    string: function(value) {
      let ret = typeof value === 'string';
      return ret;
    },

    tFile: function(value) {
      let ret = typeof value === 'string';
      return ret;
    },

    guid: function(value) {
      var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}$/gi;
      return regexGuid.test(value);
    },

    decimal: function(value) {
      return +value === parseFloat(value);
    },

    double: function(value) {
      return +value === parseFloat(value);
    },

    float: function(value) {
      return +value === parseFloat(value);
    },

    int: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 2147483648 && val > -2147483648;
    },

    short: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 32768 && val > -32768;
    },

    long: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 9223372036854776000 && val > -9223372036854776000;
    },

    uint: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 4294967296;
    },

    ushort: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 65536;
    },

    ulong: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 18446744073709552000;
    },

    byte: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 256;
    },

    sbyte: function(value) {
      let val =  parseInt(value);
      return +value === val && val < 128 && val > -128;
    },

    NullableInt: function(value) {
      let val =  parseInt(value);
      return value.toLowerCase() === 'null' || +value === val && val < 2147483648 && val > -2147483648;
    },

    NullableDecimal: function(value) {
      return value.toLowerCase() === 'null' || +value === parseInt(value);
    },

    DateTime: function(value) {
      let ret = !isNaN(Date.parse(value));
      return ret;
    },

    NullableDateTime: function(value) {
      let ret =  value.toLowerCase() === 'null' || !isNaN(Date.parse(value));
      return ret;
    },

    object: function(value) {
      let ret = typeof value === 'object';
      return ret;
    },
  })),

  _flexberryTypeToFD: computed(() => ({
    'bool': 'bool',
    'System.Boolean': 'bool',

    'byte': 'byte',
    'System.Byte': 'byte',
    'sbyte': 'sbyte',
    'System.SByte': 'sbyte',

    'short': 'short',
    'System.Int16': 'short',
    'ushort': 'ushort',
    'System.UInt16': 'ushort',

    'int': 'int',
    'System.Int32': 'int',
    'uint': 'uint',
    'System.UInt32': 'uint',

    'long': 'long',
    'System.Int64': 'long',
    'ulong': 'ulong',
    'System.UInt64': 'ulong',

    'float': 'float',
    'System.Single': 'float',

    'double': 'double',
    'System.Double': 'double',

    'decimal': 'decimal',
    'System.Decimal': 'decimal',

    'DateTime': 'DateTime',
    'System.DateTime': 'DateTime',

    'char': 'string',
    'System.Char': 'string',
    'string': 'string',
    'System.String': 'string',

    'guid': 'guid',
    'System.Guid': 'guid',

    'object': 'object',
    'System.Object': 'object',

    'NullableDateTime': 'DateTime',
    'ICSSoft.STORMNET.UserDataTypes.NullableDateTime': 'DateTime',
    'NullableInt': 'int',
    'ICSSoft.STORMNET.UserDataTypes.NullableInt': 'int',
    'NullableDecimal': 'decimal',
    'ICSSoft.STORMNET.UserDataTypes.NullableDecimal': 'decimal',
    'WebFile': 'WebFile',
    'ICSSoft.STORMNET.UserDataTypes.WebFile': 'WebFile',
  })),

  flexberryTypes: function() {
    let ret = Object.keys(this._flexberryTypeToFD);
    return ret;
  },

  fDTypes: function() {
    let types = {};
    for (let i in this._flexberryTypeToFD) {
      types[this._flexberryTypeToFD[i]] = true;
    }

    let ret = Object.keys(types);
    return ret;
  },

  flexberryTypeToFD: function(type) {
    if (!type) {
      return undefined;
    }

    let ret = this._flexberryTypeToFD[type];
    if (ret === undefined) {
      ret = null;
    }

    return ret;
  },

  fDTypeToFlexberry: function(type) {
    for (let val in this._flexberryTypeToFD) {
      if (val === type) {
        return val;
      }
    }

    return null;
  },

  randomValue: function(type) {
    if (!type) {
      type = 'string';
    }

    return this._randomValue[type]();
  },

  checkValue: function(type, value) {
    return this._checkValue[type](value);
  }

});
