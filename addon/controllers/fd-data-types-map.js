/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import { A } from '@ember/array';

import FdDataType from '../objects/fd-data-type';
import { deserialize } from '../utils/transforms-utils/fd-type-map-functions';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';

/**
  Controller for the edit form of the type map.

  @class FdDataTypesMapController
  @extends <a href="http://emberjs.com/api/classes/Ember.Controller.html">Ember.Controller</a>
*/
export default Controller.extend(FdFormUnsavedData, FdReadonlyProjectMixin, {
  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Specifies whether to render the type map.

    @property showTypeMap
    @type Boolean
    @default false
  */
  showTypeMap: false,

  /**
    The stage for which the type map will be edited.

    @property stage
    @type FdDevStageModel
  */
  stage: computed.alias('model.stage'),

  /**
    All classes with stereotype «type».

    @property types
    @type Ember.NativeArray
  */
  types: computed.filterBy('model.classes', 'stereotype', '«type»'),

  /**
    All classes with stereotype «typedef».

    @property typedefs
    @type Ember.NativeArray
  */
  typedefs: computed.filterBy('model.classes', 'stereotype', '«typedef»'),

  /**
    Combined type map.

    @property typeMap
    @type Ember.NativeArray
  */
  typeMap: computed('stage', 'types', 'typedefs', function() {
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
      let typedefName = typedef.get('name') || typedef.get('nameStr');
      let dataType = typeMap.findBy('name', typedefName);
      if (!dataType) {
        typeMap.pushObject(FdDataType.create({ name: typedefName }));
      }
    });

    this.get('types').forEach((type) => {
      let typeName = type.get('name') || type.get('nameStr');
      let dataType = typeMap.findBy('name', typeName);
      if (!dataType) {
        typeMap.pushObject(FdDataType.create({ name: typeName, sqlOnly: true }));
      } else {
        dataType.set('sqlOnly', true);
      }
    });

    return typeMap.sortBy('name');
  }),

  actions: {
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
      @param {Boolean} close If `true`, the `close` action will be run after saving.
    */
    save(close) {
      this.get('appState').loading();
      run.next(() => {
        let promise = resolve();
        if (this.findUnsavedFormData()) {
          promise = this.get('stage').save();
        }

        promise.then(() => {
          if (close) {
            this.send('close');
          }
        }).catch((error) => {
          this.set('error', error);
        }).finally(() => {
          this.get('appState').reset();
        });
      });
    },
  },

  /**
    Find unsaved data. Returns true, if data has been changed, but not saved

    @method findUnsavedFormData
    @return {Boolean} Changed or not a combined type map.
  */
  findUnsavedFormData() {
    let typeMapCS = [];
    let typeMapSQL = [];
    let typeMapPostgre = [];
    let typeMapOracle = [];
    this.get('typeMap').forEach((type) => {
      let { name, sql, postgre, oracle, sqlOnly } = type.getProperties('name', 'sql', 'postgre', 'oracle', 'sqlOnly');
      typeMapSQL.push(`<${name} value="${sql || ''}" assemblydll="" />`);
      typeMapPostgre.push(`<${name} value="${postgre || ''}" assemblydll="" />`);
      typeMapOracle.push(`<${name} value="${oracle || ''}" assemblydll="" />`);
      if (!sqlOnly) {
        typeMapCS.push(`<${name} value="${type.get('cs') || ''}" assemblydll="${type.get('assemblyDll') || ''}" />`);
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
    return A([
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
