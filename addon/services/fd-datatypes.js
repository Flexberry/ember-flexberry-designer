import Ember from 'ember';

export default Ember.Service.extend({

  _randomValue: {
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

    WebFile: function() {
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
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    decimal: function() {
      return   (Math.random() * 1000000 - 500000).toFixed(2);
    },


    double: function() {
      return   (Math.random() * 1000000 - 500000).toFixed(2);
    },


    float: function() {
      return   (Math.random() * 1000000 - 500000).toFixed(2);
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
      let ret = new Date(Math.floor(Math.random()*(2147483648)*1000));
      return ret;
    },

    NullableDateTime: function() {
      let ret =  (Math.random() > 0.5) ? new Date(Math.floor(Math.random()*(2147483648)*1000)) : null;
      return ret;
    },

    object: function() {
      let ret = '{}';
      return ret;
    },
  },

  _checkValue: {
    bool: function(value) {
      let ret = value === 'true' || value === 'false' ;
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

    WebFile: function(value) {
      let ret = typeof value === 'string';
      return ret;
    },

    guid: function(value) {
      var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
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

  },

  _flexberryTypeToFD: {
    boolean: 'bool',
    WebFile: 'file',
    char: 'char',
    string: 'string',
    guid: 'guid',
    decimal: 'decimal',
    double: 'double',
    float: 'float',
    sbyte: 'sbyte',
    short: 'short',
    byte: 'byte',
    int: 'int',
    long: 'long',
    uint: 'uint',
    ushort: 'ushort',
    ulong: 'ulong',
    DateTime: 'DateTime',
    NullableDateTime: 'NullableDateTime',
    NullableDecimal: 'NullableDecimal',
    NullableInt: 'NullableInt',
    object: 'object'
  },

  flexberryTypeToFD(type) {
    if (type === undefined) {
      return undefined;
    }
    let ret = this._flexberryTypeToFD[type];
    if (ret === undefined) {
      ret = null;
    }
    return ret;
  },

  fDTypeToFlexberry(type) {
    for (let val in this._flexberryTypeToFD) {
      if (val === type) {
        return val;
      }
    }

    return null;
  },

  randomValue: function(type) {
    if (type === undefined) {
      type = 'string';
    }
    return this._randomValue[type]();
  },

  checkValue: function(type, value) {
    return this._checkValue[type](value);
  }

});
