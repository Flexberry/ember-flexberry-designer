/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdDataType from '../objects/fd-data-type';
import { deserialize } from '../utils/fd-type-map-functions';

/**
  Controller for the edit form of the type map.

  @class FdDataTypesMapController
  @extends <a href="http://emberjs.com/api/classes/Ember.Controller.html">Ember.Controller</a>
*/
export default Ember.Controller.extend({
  /**
    @property saveTitleLocaleKey
    @type String
    @default 'forms.fd-data-types-map.save-title'
  */
  saveTitleLocaleKey: 'forms.fd-data-types-map.save-title',

  /**
    @property saveMessageLocaleKey
    @type String
    @default 'forms.fd-data-types-map.save-message'
  */
  saveMessageLocaleKey: 'forms.fd-data-types-map.save-message',

  /**
    @property saveButtonLocaleKey
    @type String
    @default ''
  */
  saveButtonLocaleKey: 'forms.fd-data-types-map.save-button',

  /**
    @property rollbackButtonLocaleKey
    @type String
    @default ''
  */
  rollbackButtonLocaleKey: 'forms.fd-data-types-map.rollback-button',

  /**
    Specifies whether to render the type map.

    @property showTypeMap
    @type Boolean
    @default true
  */
  showTypeMap: true,

  /**
    The stage for which the type map will be edited.

    @property stage
    @type FdDevStageModel
  */
  stage: Ember.computed.alias('model.stage'),

  /**
    All classes with stereotype «type».

    @property types
    @type Ember.NativeArray
  */
  types: Ember.computed.filterBy('model.classes', 'stereotype', '«type»'),

  /**
    All classes with stereotype «typedef».

    @property typedefs
    @type Ember.NativeArray
  */
  typedefs: Ember.computed.filterBy('model.classes', 'stereotype', '«typedef»'),

  /**
    Combined type map.

    @property typeMap
    @type Ember.NativeArray
  */
  typeMap: Ember.computed('stage', 'types', 'typedefs', function() {
    let typeMap = this.createDefaultTypeMap();

    let typeMapCS = deserialize(this.get('stage.typeMapCSStr'));
    for (let i = 0; i < typeMapCS.length; i++) {
      let type = typeMapCS[i];
      let dataType = typeMap.findBy('name', type.name);
      if (dataType) {
        dataType.set('cs', type.value);
        dataType.set('assemblyDll', type.assemblyDll);
      } else {
        typeMap.pushObject(FdDataType.create({ name: type.name, cs: type.value, assemblyDll: type.assemblyDll }));
      }
    }

    let typeMapSQL = deserialize(this.get('stage.typeMapSQLStr'));
    for (let i = 0; i < typeMapSQL.length; i++) {
      let type = typeMapSQL[i];
      let dataType = typeMap.findBy('name', type.name);
      if (dataType) {
        dataType.set('sql', type.value);
      } else {
        typeMap.pushObject(FdDataType.create({ name: type.name, sql: type.value }));
      }
    }

    let typeMapPostgre = deserialize(this.get('stage.typeMapPostgreStr'));
    for (let i = 0; i < typeMapPostgre.length; i++) {
      let type = typeMapPostgre[i];
      let dataType = typeMap.findBy('name', type.name);
      if (dataType) {
        dataType.set('postgre', type.value);
      } else {
        typeMap.pushObject(FdDataType.create({ name: type.name, postgre: type.value }));
      }
    }

    let typeMapOracle = deserialize(this.get('stage.typeMapOracleStr'));
    for (let i = 0; i < typeMapOracle.length; i++) {
      let type = typeMapOracle[i];
      let dataType = typeMap.findBy('name', type.name);
      if (dataType) {
        dataType.set('oracle', type.value);
      } else {
        typeMap.pushObject(FdDataType.create({ name: type.name, oracle: type.value }));
      }
    }

    this.get('typedefs').forEach((typedef) => {
      let dataType = typeMap.findBy('name', typedef.get('name'));
      if (!dataType) {
        typeMap.pushObject(FdDataType.create({ name: typedef.get('name') }));
      }
    });

    this.get('types').forEach((type) => {
      let dataType = typeMap.findBy('name', type.get('name'));
      if (!dataType) {
        typeMap.pushObject(FdDataType.create({ name: type.get('name'), sqlOnly: true }));
      } else {
        dataType.set('sqlOnly', true);
      }
    });

    return typeMap.sortBy('name');
  }),

  actions: {
    /**
      Closes the form and transition to the application structure form.

      @method actions.close
    */
    close() {
      if (this.serializeTypeMap()) {
        this.send('showModalDialog', 'modal/save', { controller: this });
      } else {
        this.transitionToRoute('fd-appstruct-form');
      }
    },

    /**
      Cancels the changes made to the type map, and send `close` action.

      @method rollback
    */
    rollback() {
      this.get('stage').rollbackAttributes();

      this.set('showTypeMap', false);
      this.notifyPropertyChange('typeMap');

      this.send('removeModalDialog');
      this.send('close');
    },

    /**
      Saves the changes made to the type map.

      @method actions.save
      @param {Boolean} close Close or not form after saving.
    */
    save(close) {
      let promise = Ember.RSVP.resolve();
      if (this.serializeTypeMap()) {
        this.set('state', 'loading');
        promise = this.get('stage').save();
      }

      promise.then(() => {
        if (close) {
          this.send('close');
        }
      }).catch((error) => {
        this.set('error', error);
      }).finally(() => {
        this.set('state', '');
      });
    },
  },

  /**
    Serializes a combined type map, returns `true` if it has been changed.

    @method serializeTypeMap
    @return {Boolean} Changed or not a combined type map.
  */
  serializeTypeMap() {
    let typeMapCS = [];
    let typeMapSQL = [];
    let typeMapPostgre = [];
    let typeMapOracle = [];
    this.get('typeMap').forEach((type) => {
      let { name, sql, postgre, oracle, sqlOnly } = type.getProperties('name', 'sql', 'postgre', 'oracle', 'sqlOnly');
      typeMapSQL.push(`<${name} value="${sql}" assemblydll="" />`);
      typeMapPostgre.push(`<${name} value="${postgre}" assemblydll="" />`);
      typeMapOracle.push(`<${name} value="${oracle}" assemblydll="" />`);
      if (!sqlOnly) {
        typeMapCS.push(`<${name} value="${type.get('cs')}" assemblydll="${type.get('assemblyDll') || ''}" />`);
      }
    });

    this.get('stage').setProperties({
      typeMapCSStr: typeMapCS.length > 0 ? `<TypeMap>${typeMapCS.join('')}</TypeMap>` : null,
      typeMapSQLStr: typeMapSQL.length > 0 ? `<TypeMap>${typeMapSQL.join('')}</TypeMap>` : null,
      typeMapPostgreStr: typeMapPostgre.length > 0 ? `<TypeMap>${typeMapPostgre.join('')}</TypeMap>` : null,
      typeMapOracleStr: typeMapOracle.length > 0 ? `<TypeMap>${typeMapOracle.join('')}</TypeMap>` : null,
    });

    return this.get('stage.hasDirtyAttributes');
  },

  /**
    Returns a new type map with default values.

    @method createDefaultTypeMap
    @return {Ember.NativeArray} Type map with default values.
  */
  createDefaultTypeMap() {
    return Ember.A([
      FdDataType.create({
        name: 'bool',
        cs: 'System.Boolean',
        sql: 'BIT',
        postgre: 'BOOLEAN',
        oracle: 'NUMBER(1)',
      }),
      FdDataType.create({
        name: 'byte',
        cs: 'System.Byte',
        sql: 'TINYINT',
        postgre: 'SMALLINT',
        oracle: 'NUMBER(3)',
      }),
      FdDataType.create({
        name: 'char',
        cs: 'System.Char',
        sql: 'TINYINT',
        postgre: 'SMALLINT',
        oracle: 'NUMBER(3)',
      }),
      FdDataType.create({
        name: 'DateTime',
        cs: 'System.DateTime',
        sql: 'DATETIME',
        postgre: 'TIMESTAMP(3)',
        oracle: 'DATE',
      }),
      FdDataType.create({
        name: 'decimal',
        cs: 'System.Decimal',
        sql: 'DECIMAL',
        postgre: 'DECIMAL',
        oracle: 'NUMBER(38)',
      }),
      FdDataType.create({
        name: 'double',
        cs: 'System.Double',
        sql: 'FLOAT',
        postgre: 'DOUBLE PRECISION',
        oracle: 'FLOAT(126)',
      }),
      FdDataType.create({
        name: 'float',
        cs: 'System.Single',
        sql: 'REAL',
        postgre: 'REAL',
        oracle: 'FLOAT(53)',
      }),
      FdDataType.create({
        name: 'guid',
        cs: 'System.Guid',
        sql: 'uniqueidentifier',
        postgre: 'UUID',
        oracle: 'RAW(16)',
      }),
      FdDataType.create({
        name: 'int',
        cs: 'System.Int32',
        sql: 'INT',
        postgre: 'INT',
        oracle: 'NUMBER(10)',
      }),
      FdDataType.create({
        name: 'long',
        cs: 'System.Int64',
        sql: 'INT',
        postgre: 'BIGINT',
        oracle: 'NUMBER(20)',
      }),
      FdDataType.create({
        name: 'NullableDateTime',
        assemblyDll: 'ICSSoft.STORMNET.UserDataTypes.dll',
        cs: 'ICSSoft.STORMNET.UserDataTypes.NullableDateTime',
        sql: 'DATETIME',
        postgre: 'TIMESTAMP(3)',
        oracle: 'DATE',
      }),
      FdDataType.create({
        name: 'NullableDecimal',
        assemblyDll: 'ICSSoft.STORMNET.UserDataTypes.dll',
        cs: 'ICSSoft.STORMNET.UserDataTypes.NullableDecimal',
        sql: 'DECIMAL',
        postgre: 'DECIMAL',
        oracle: 'NUMBER(38)',
      }),
      FdDataType.create({
        name: 'NullableInt',
        assemblyDll: 'ICSSoft.STORMNET.UserDataTypes.dll',
        cs: 'ICSSoft.STORMNET.UserDataTypes.NullableInt',
        sql: 'INT',
        postgre: 'INT',
        oracle: 'NUMBER(10)',
      }),
      FdDataType.create({
        name: 'object',
        cs: 'System.Object',
        sql: 'LONGVARBINARY',
        postgre: 'BYTEA',
        oracle: 'RAW(255)',
      }),
      FdDataType.create({
        name: 'sbyte',
        cs: 'System.SByte',
        sql: 'TINYINT',
        postgre: 'SMALLINT',
        oracle: 'NUMBER(3)',
      }),
      FdDataType.create({
        name: 'short',
        cs: 'System.Int16',
        sql: 'SMALLINT',
        postgre: 'SMALLINT',
        oracle: 'NUMBER(5)',
      }),
      FdDataType.create({
        name: 'string',
        cs: 'System.String',
        sql: 'VARCHAR(255)',
        postgre: 'VARCHAR(255)',
        oracle: 'VARCHAR2(255)',
      }),
      FdDataType.create({
        name: 'uint',
        cs: 'System.UInt32',
        sql: 'INT',
        postgre: 'INT',
        oracle: 'NUMBER(10)',
      }),
      FdDataType.create({
        name: 'ulong',
        cs: 'System.UInt64',
        sql: 'INT',
        postgre: 'BIGINT',
        oracle: 'NUMBER(20)',
      }),
      FdDataType.create({
        name: 'ushort',
        cs: 'System.UInt16',
        sql: 'SMALLINT',
        postgre: 'SMALLINT',
        oracle: 'NUMBER(5)',
      }),
      FdDataType.create({
        name: 'WebFile',
        assemblyDll: 'ICSSoft.STORMNET.UserDataTypes.dll',
        cs: 'ICSSoft.STORMNET.UserDataTypes.WebFile',
        sql: 'NVARCHAR(MAX)',
        postgre: 'TEXT',
        oracle: 'NCLOB',
      }),
    ]);
  },
});
