import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  /**
    Non-stored property.

    @property additionalPluginsSettings
  */
  additionalPluginsSettings: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'additionalPluginsSettingsCompute' method in model class (outside of this mixin) if you want to compute value of 'additionalPluginsSettings' property.

    @method _additionalPluginsSettingsCompute
    @private
    @example
      ```javascript
      _additionalPluginsSettingsChanged: Ember.on('init', Ember.observer('additionalPluginsSettings', function() {
        Ember.run.once(this, '_additionalPluginsSettingsCompute');
      }))
      ```
  */
  _additionalPluginsSettingsCompute: function() {
    let result = (this.additionalPluginsSettingsCompute && typeof this.additionalPluginsSettingsCompute === 'function') ?
      this.additionalPluginsSettingsCompute() : null;
    this.set('additionalPluginsSettings', result);
  },
  additionalPluginsSettingsStr: DS.attr('string'),
  auditEnabled: DS.attr('boolean'),
  /**
    Non-stored property.

    @property chosenPalette
  */
  chosenPalette: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'chosenPaletteCompute' method in model class (outside of this mixin) if you want to compute value of 'chosenPalette' property.

    @method _chosenPaletteCompute
    @private
    @example
      ```javascript
      _chosenPaletteChanged: Ember.on('init', Ember.observer('chosenPalette', function() {
        Ember.run.once(this, '_chosenPaletteCompute');
      }))
      ```
  */
  _chosenPaletteCompute: function() {
    let result = (this.chosenPaletteCompute && typeof this.chosenPaletteCompute === 'function') ? this.chosenPaletteCompute() : null;
    this.set('chosenPalette', result);
  },
  company: DS.attr('string'),
  connectionString: DS.attr('string'),
  copyright: DS.attr('string'),
  dataObjectNameSpace: DS.attr('string'),
  /**
    Non-stored property.

    @property defaultAccessType
  */
  defaultAccessType: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-access-type'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'defaultAccessTypeCompute' method in model class (outside of this mixin) if you want to compute value of 'defaultAccessType' property.

    @method _defaultAccessTypeCompute
    @private
    @example
      ```javascript
      _defaultAccessTypeChanged: Ember.on('init', Ember.observer('defaultAccessType', function() {
        Ember.run.once(this, '_defaultAccessTypeCompute');
      }))
      ```
  */
  _defaultAccessTypeCompute: function() {
    let result = (this.defaultAccessTypeCompute && typeof this.defaultAccessTypeCompute === 'function') ? this.defaultAccessTypeCompute() : null;
    this.set('defaultAccessType', result);
  },
  defaultBaseClass: DS.attr('string'),
  defaultDetailArrayClass: DS.attr('string'),
  defaultEditScriptName: DS.attr('string'),
  defaultListScriptName: DS.attr('string'),
  /**
    Non-stored property.

    @property defaultTypeMapTypes
  */
  defaultTypeMapTypes: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'defaultTypeMapTypesCompute' method in model class (outside of this mixin) if you want to compute value of 'defaultTypeMapTypes' property.

    @method _defaultTypeMapTypesCompute
    @private
    @example
      ```javascript
      _defaultTypeMapTypesChanged: Ember.on('init', Ember.observer('defaultTypeMapTypes', function() {
        Ember.run.once(this, '_defaultTypeMapTypesCompute');
      }))
      ```
  */
  _defaultTypeMapTypesCompute: function() {
    let result = (this.defaultTypeMapTypesCompute && typeof this.defaultTypeMapTypesCompute === 'function') ? this.defaultTypeMapTypesCompute() : null;
    this.set('defaultTypeMapTypes', result);
  },
  defaultWriteMode: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode'),
  /**
    Non-stored property.

    @property doNotDeleteExtraTables
  */
  doNotDeleteExtraTables: DS.attr('boolean'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'doNotDeleteExtraTablesCompute' method in model class (outside of this mixin) if you want to compute value of 'doNotDeleteExtraTables' property.

    @method _doNotDeleteExtraTablesCompute
    @private
    @example
      ```javascript
      _doNotDeleteExtraTablesChanged: Ember.on('init', Ember.observer('doNotDeleteExtraTables', function() {
        Ember.run.once(this, '_doNotDeleteExtraTablesCompute');
      }))
      ```
  */
  _doNotDeleteExtraTablesCompute: function() {
    let result = (this.doNotDeleteExtraTablesCompute && typeof this.doNotDeleteExtraTablesCompute === 'function') ?
      this.doNotDeleteExtraTablesCompute() : null;
    this.set('doNotDeleteExtraTables', result);
  },
  /**
    Non-stored property.

    @property enableAuElement
  */
  enableAuElement: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'enableAuElementCompute' method in model class (outside of this mixin) if you want to compute value of 'enableAuElement' property.

    @method _enableAuElementCompute
    @private
    @example
      ```javascript
      _enableAuElementChanged: Ember.on('init', Ember.observer('enableAuElement', function() {
        Ember.run.once(this, '_enableAuElementCompute');
      }))
      ```
  */
  _enableAuElementCompute: function() {
    let result = (this.enableAuElementCompute && typeof this.enableAuElementCompute === 'function') ? this.enableAuElementCompute() : null;
    this.set('enableAuElement', result);
  },
  indexComment: DS.attr('string'),
  isAuditDatabaseLocal: DS.attr('boolean'),
  isReportDatabaseLocal: DS.attr('boolean'),
  /**
    Non-stored property.

    @property lastIndexDate
  */
  lastIndexDate: DS.attr('date'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'lastIndexDateCompute' method in model class (outside of this mixin) if you want to compute value of 'lastIndexDate' property.

    @method _lastIndexDateCompute
    @private
    @example
      ```javascript
      _lastIndexDateChanged: Ember.on('init', Ember.observer('lastIndexDate', function() {
        Ember.run.once(this, '_lastIndexDateCompute');
      }))
      ```
  */
  _lastIndexDateCompute: function() {
    let result = (this.lastIndexDateCompute && typeof this.lastIndexDateCompute === 'function') ? this.lastIndexDateCompute() : null;
    this.set('lastIndexDate', result);
  },
  operationsEnumNamespace: DS.attr('string'),
  operationsEnumPacket: DS.attr('string'),
  oracleConnectionString: DS.attr('string'),
  postgreConnectionString: DS.attr('string'),
  product: DS.attr('string'),
  /**
    Non-stored property.

    @property realDataObjectNameSpace
  */
  realDataObjectNameSpace: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realDataObjectNameSpaceCompute' method in model class (outside of this mixin) if you want to compute value of 'realDataObjectNameSpace' property.

    @method _realDataObjectNameSpaceCompute
    @private
    @example
      ```javascript
      _realDataObjectNameSpaceChanged: Ember.on('init', Ember.observer('realDataObjectNameSpace', function() {
        Ember.run.once(this, '_realDataObjectNameSpaceCompute');
      }))
      ```
  */
  _realDataObjectNameSpaceCompute: function() {
    let result = (this.realDataObjectNameSpaceCompute && typeof this.realDataObjectNameSpaceCompute === 'function') ?
      this.realDataObjectNameSpaceCompute() : null;
    this.set('realDataObjectNameSpace', result);
  },
  scriptNamespace: DS.attr('string'),
  scriptPacket: DS.attr('string'),
  serializedIndex: DS.attr('string'),
  signAssemblies: DS.attr('boolean'),
  sourceAzStoragePath: DS.attr('string'),
  sourceCodeCSPath: DS.attr('string'),
  sourceCodeVBPath: DS.attr('string'),
  sourceControlUri: DS.attr('string'),
  sQLPath: DS.attr('string'),
  /**
    Non-stored property.

    @property typeMapAccess
  */
  typeMapAccess: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeMapAccessCompute' method in model class (outside of this mixin) if you want to compute value of 'typeMapAccess' property.

    @method _typeMapAccessCompute
    @private
    @example
      ```javascript
      _typeMapAccessChanged: Ember.on('init', Ember.observer('typeMapAccess', function() {
        Ember.run.once(this, '_typeMapAccessCompute');
      }))
      ```
  */
  _typeMapAccessCompute: function() {
    let result = (this.typeMapAccessCompute && typeof this.typeMapAccessCompute === 'function') ? this.typeMapAccessCompute() : null;
    this.set('typeMapAccess', result);
  },
  typeMapAccessStr: DS.attr('string'),
  /**
    Non-stored property.

    @property typeMapCS
  */
  typeMapCS: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeMapCSCompute' method in model class (outside of this mixin) if you want to compute value of 'typeMapCS' property.

    @method _typeMapCSCompute
    @private
    @example
      ```javascript
      _typeMapCSChanged: Ember.on('init', Ember.observer('typeMapCS', function() {
        Ember.run.once(this, '_typeMapCSCompute');
      }))
      ```
  */
  _typeMapCSCompute: function() {
    let result = (this.typeMapCSCompute && typeof this.typeMapCSCompute === 'function') ? this.typeMapCSCompute() : null;
    this.set('typeMapCS', result);
  },
  typeMapCSStr: DS.attr('string'),
  /**
    Non-stored property.

    @property typeMapOracle
  */
  typeMapOracle: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeMapOracleCompute' method in model class (outside of this mixin) if you want to compute value of 'typeMapOracle' property.

    @method _typeMapOracleCompute
    @private
    @example
      ```javascript
      _typeMapOracleChanged: Ember.on('init', Ember.observer('typeMapOracle', function() {
        Ember.run.once(this, '_typeMapOracleCompute');
      }))
      ```
  */
  _typeMapOracleCompute: function() {
    let result = (this.typeMapOracleCompute && typeof this.typeMapOracleCompute === 'function') ? this.typeMapOracleCompute() : null;
    this.set('typeMapOracle', result);
  },
  typeMapOracleStr: DS.attr('string'),
  /**
    Non-stored property.

    @property typeMapPostgre
  */
  typeMapPostgre: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeMapPostgreCompute' method in model class (outside of this mixin) if you want to compute value of 'typeMapPostgre' property.

    @method _typeMapPostgreCompute
    @private
    @example
      ```javascript
      _typeMapPostgreChanged: Ember.on('init', Ember.observer('typeMapPostgre', function() {
        Ember.run.once(this, '_typeMapPostgreCompute');
      }))
      ```
  */
  _typeMapPostgreCompute: function() {
    let result = (this.typeMapPostgreCompute && typeof this.typeMapPostgreCompute === 'function') ? this.typeMapPostgreCompute() : null;
    this.set('typeMapPostgre', result);
  },
  typeMapPostgreStr: DS.attr('string'),
  /**
    Non-stored property.

    @property typeMapSQL
  */
  typeMapSQL: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeMapSQLCompute' method in model class (outside of this mixin) if you want to compute value of 'typeMapSQL' property.

    @method _typeMapSQLCompute
    @private
    @example
      ```javascript
      _typeMapSQLChanged: Ember.on('init', Ember.observer('typeMapSQL', function() {
        Ember.run.once(this, '_typeMapSQLCompute');
      }))
      ```
  */
  _typeMapSQLCompute: function() {
    let result = (this.typeMapSQLCompute && typeof this.typeMapSQLCompute === 'function') ? this.typeMapSQLCompute() : null;
    this.set('typeMapSQL', result);
  },
  typeMapSQLStr: DS.attr('string'),
  /**
    Non-stored property.

    @property typeMapVB
  */
  typeMapVB: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeMapVBCompute' method in model class (outside of this mixin) if you want to compute value of 'typeMapVB' property.

    @method _typeMapVBCompute
    @private
    @example
      ```javascript
      _typeMapVBChanged: Ember.on('init', Ember.observer('typeMapVB', function() {
        Ember.run.once(this, '_typeMapVBCompute');
      }))
      ```
  */
  _typeMapVBCompute: function() {
    let result = (this.typeMapVBCompute && typeof this.typeMapVBCompute === 'function') ? this.typeMapVBCompute() : null;
    this.set('typeMapVB', result);
  },
  typeMapVBStr: DS.attr('string'),
  useSourceControl: DS.attr('boolean'),
  version: DS.attr('string'),
  typeDefinitions: DS.hasMany('fd-dev-type-definition', { inverse: 'stage', async: false }),
  controlTypes: DS.hasMany('fd-dev-control-type', { inverse: 'stage', async: false }),
  users: DS.hasMany('fd-user-in-stage', { inverse: 'stage', async: false }),
  moduleSettings: DS.hasMany('fd-dev-module-setting', { inverse: 'stage', async: false }),
  generations: DS.hasMany('fd-generation', { inverse: 'stage', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-stage'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditPrototyping', 'fd-dev-stage', {
    typeMapCS: attr(''),
    typeMapCSStr: attr('')
  });
  modelClass.defineProjection('Backup', 'fd-dev-stage', {
    name: attr(''),
    description: attr(''),
    company: attr(''),
    product: attr(''),
    copyright: attr(''),
    version: attr(''),
    dataObjectNameSpace: attr(''),
    sourceCodeCSPath: attr(''),
    sourceCodeVBPath: attr(''),
    sQLPath: attr(''),
    typeMapCSStr: attr(''),
    typeMapVBStr: attr(''),
    typeMapSQLStr: attr(''),
    typeMapAccessStr: attr(''),
    typeMapOracleStr: attr(''),
    defaultBaseClass: attr(''),
    defaultDetailArrayClass: attr(''),
    connectionString: attr(''),
    oracleConnectionString: attr(''),
    postgreConnectionString: attr(''),
    additionalPluginsSettingsStr: attr(''),
    defaultEditScriptName: attr(''),
    defaultListScriptName: attr(''),
    sourceAzStoragePath: attr(''),
    operationsEnumPacket: attr(''),
    operationsEnumNamespace: attr(''),
    signAssemblies: attr(''),
    auditEnabled: attr(''),
    isAuditDatabaseLocal: attr(''),
    isReportDatabaseLocal: attr(''),
    defaultWriteMode: attr(''),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      valueXML: attr(''),
      moduleSettingTypeName: attr(''),
      moduleSettingType: belongsTo('fd-dev-module-setting-type', '', {

      }, { hidden: true }),
      stage: belongsTo('fd-dev-stage', '', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('Compiler', 'fd-dev-stage', {
    company: attr(''),
    product: attr(''),
    copyright: attr(''),
    version: attr(''),
    dataObjectNameSpace: attr(''),
    sourceCodeCSPath: attr(''),
    sourceCodeVBPath: attr(''),
    sQLPath: attr(''),
    typeMapCSStr: attr(''),
    typeMapVBStr: attr(''),
    typeMapSQLStr: attr(''),
    typeMapAccessStr: attr(''),
    defaultBaseClass: attr(''),
    defaultDetailArrayClass: attr(''),
    defaultEditScriptName: attr(''),
    defaultListScriptName: attr(''),
    signAssemblies: attr(''),
    additionalPluginsSettingsStr: attr(''),
    name: attr(''),
    description: attr('')
  });
  modelClass.defineProjection('EditAccessGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    sQLPath: attr(''),
    typeMapAccessStr: attr('', { hidden: true }),
    typeMapAccess: attr('Карта типов'),
    additionalPluginsSettings: attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: attr('', { hidden: true }),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditCSGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    company: attr('Название компании'),
    product: attr('Название продукта'),
    copyright: attr('Copyright'),
    version: attr('Версия'),
    sourceCodeCSPath: attr('Каталог для исходного кода'),
    typeMapCSStr: attr('', { hidden: true }),
    typeMapCS: attr('Карта типов'),
    enableAuElement: attr(''),
    auditEnabled: attr('Вести аудит в приложение'),
    defaultWriteMode: attr('Режим записи аудита по умолчанию'),
    dataObjectNameSpace: attr('NameSpace'),
    defaultBaseClass: attr('Default base class'),
    defaultDetailArrayClass: attr('Default detail array class'),
    defaultEditScriptName: attr('Default edit script name'),
    defaultListScriptName: attr('Default list script name'),
    scriptPacket: attr('Script packet'),
    scriptNamespace: attr('Script namespace postfix'),
    signAssemblies: attr('Подписывать сборки'),
    additionalPluginsSettings: attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: attr('', { hidden: true }),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-stage', {
    name: attr('Name'),
    description: attr('Description'),
    company: attr('Company'),
    copyright: attr('Copyright'),
    product: attr('Product'),
    configuration: belongsTo('fd-configuration', '', {
      project: belongsTo('fd-project', '', {
        repository: belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('EditMSSQLDirectGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    typeMapSQLStr: attr('', { hidden: true }),
    typeMapSQL: attr('Карта типов'),
    connectionString: attr('Строка соединения'),
    additionalPluginsSettings: attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: attr('', { hidden: true }),
    doNotDeleteExtraTables: attr('Не удалять существующие таблицы'),
    isAuditDatabaseLocal: attr('БД аудита в БД приложения'),
    isReportDatabaseLocal: attr('БД web-отчётов в БД приложения'),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditOracleGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    sQLPath: attr(''),
    typeMapOracle: attr('Карта типов'),
    doNotDeleteExtraTables: attr('Не удалять существующие таблицы'),
    typeMapOracleStr: attr('', { hidden: true }),
    isAuditDatabaseLocal: attr('БД аудита в БД приложения'),
    isReportDatabaseLocal: attr('БД web-отчётов в БД приложения'),
    additionalPluginsSettings: attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: attr('', { hidden: true }),
    oracleConnectionString: attr('Строка соединения'),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditPostgreSqlDirectGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    typeMapPostgre: attr('Карта типов'),
    postgreConnectionString: attr('Строка соединения'),
    typeMapPostgreStr: attr('', { hidden: true }),
    additionalPluginsSettingsStr: attr('', { hidden: true }),
    doNotDeleteExtraTables: attr('Не удалять существующие таблицы'),
    additionalPluginsSettings: attr('Дополнительные настройки'),
    isAuditDatabaseLocal: attr('БД аудита в БД приложения'),
    isReportDatabaseLocal: attr('БД web-отчётов в БД приложения'),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-stage', {

  });
  modelClass.defineProjection('EditRightManagementGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    sourceAzStoragePath: attr('Имя файла хранилища'),
    defaultAccessType: attr('Тип проверки доступа по умолчанию'),
    additionalPluginsSettingsStr: attr('', { hidden: true })
  });
  modelClass.defineProjection('EditSQLGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    sQLPath: attr(''),
    typeMapSQLStr: attr('', { hidden: true }),
    typeMapSQL: attr('Карта типов'),
    additionalPluginsSettings: attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: attr('', { hidden: true }),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditVBGenerator', 'fd-dev-stage', {
    name: attr('Название стадии'),
    description: attr('Описание'),
    company: attr(''),
    product: attr(''),
    copyright: attr(''),
    version: attr(''),
    dataObjectNameSpace: attr(''),
    sourceCodeVBPath: attr(''),
    typeMapVBStr: attr('', { hidden: true }),
    typeMapVB: attr(''),
    defaultBaseClass: attr(''),
    defaultDetailArrayClass: attr(''),
    defaultEditScriptName: attr(''),
    defaultListScriptName: attr(''),
    signAssemblies: attr('')
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-stage', {
    additionalPluginsSettingsStr: attr(''),
    auditEnabled: attr(''),
    company: attr(''),
    copyright: attr(''),
    dataObjectNameSpace: attr(''),
    defaultAccessType: attr(''),
    defaultBaseClass: attr(''),
    defaultDetailArrayClass: attr(''),
    defaultEditScriptName: attr(''),
    defaultListScriptName: attr(''),
    defaultWriteMode: attr(''),
    doNotDeleteExtraTables: attr(''),
    indexComment: attr(''),
    isAuditDatabaseLocal: attr(''),
    isReportDatabaseLocal: attr(''),
    lastIndexDate: attr(''),
    operationsEnumNamespace: attr(''),
    operationsEnumPacket: attr(''),
    product: attr(''),
    realDataObjectNameSpace: attr(''),
    scriptNamespace: attr(''),
    scriptPacket: attr(''),
    serializedIndex: attr(''),
    signAssemblies: attr(''),
    sourceAzStoragePath: attr(''),
    sourceCodeCSPath: attr(''),
    sourceCodeVBPath: attr(''),
    sourceControlUri: attr(''),
    sQLPath: attr(''),
    typeMapAccessStr: attr(''),
    typeMapCSStr: attr(''),
    typeMapOracleStr: attr(''),
    typeMapPostgreStr: attr(''),
    typeMapSQLStr: attr(''),
    typeMapVBStr: attr(''),
    useSourceControl: attr(''),
    version: attr(''),
    createUser: attr(''),
    createDate: attr(''),
    changeUser: attr(''),
    changeDate: attr(''),
    name: attr(''),
    description: attr(''),
    nameStr: attr(''),
    configuration: belongsTo('fd-configuration', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('FormDesigner_ProjectE', 'fd-dev-stage', {
    name: attr('Название'),
    description: attr('Описание'),
    product: attr(''),
    configuration: belongsTo('fd-configuration', '', {
      project: belongsTo('fd-project', '', {
        repository: belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('FormDesigner_ProjectL', 'fd-dev-stage', {
    name: attr('Название'),
    description: attr('Описание'),
    product: attr('', { hidden: true }),
    configuration: belongsTo('fd-configuration', '', {
      project: belongsTo('fd-project', '', {
        repository: belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('Generations', 'fd-dev-stage', {
    name: attr(''),
    generations: hasMany('fd-generation', '', {
      userName: attr('Пользователь'),
      state: attr('Состояние'),
      startTime: attr('Время старта'),
      percentComplete: attr('% выполнения'),
      endTime: attr('Время окончания'),
      stage: belongsTo('fd-dev-stage', 'Имя стадии', {
        name: attr('Имя стадии')
      }),
      generationReason: attr('Действие')
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-stage', {
    name: attr(''),
    description: attr(''),
    company: attr(''),
    product: attr(''),
    copyright: attr(''),
    version: attr(''),
    dataObjectNameSpace: attr(''),
    sourceCodeCSPath: attr(''),
    sourceCodeVBPath: attr(''),
    sQLPath: attr(''),
    typeMapCSStr: attr(''),
    typeMapVBStr: attr(''),
    typeMapSQLStr: attr(''),
    typeMapAccessStr: attr(''),
    typeMapOracleStr: attr(''),
    typeMapPostgreStr: attr(''),
    defaultBaseClass: attr(''),
    defaultDetailArrayClass: attr(''),
    connectionString: attr(''),
    oracleConnectionString: attr(''),
    postgreConnectionString: attr(''),
    additionalPluginsSettingsStr: attr(''),
    defaultEditScriptName: attr(''),
    defaultListScriptName: attr(''),
    sourceAzStoragePath: attr(''),
    operationsEnumPacket: attr(''),
    operationsEnumNamespace: attr(''),
    signAssemblies: attr(''),
    auditEnabled: attr(''),
    isAuditDatabaseLocal: attr(''),
    defaultWriteMode: attr(''),
    isReportDatabaseLocal: attr(''),
    typeDefinitions: hasMany('fd-dev-type-definition', '', {
      name: attr(''),
      caption: attr(''),
      mapTypeName: attr(''),
      mapTypeAssemblyName: attr(''),
      formatAttribute: attr('')
    }),
    controlTypes: hasMany('fd-dev-control-type', '', {
      name: attr('Имя'),
      designerHtmlTemplate: attr('Шаблон'),
      designerMetadataXml: attr('Метаданные дизайна'),
      editedType: belongsTo('fd-dev-type-definition', '', {
        name: attr('', { hidden: true })
      })
    }),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('IntelliSearchPluginIndexing', 'fd-dev-stage', {
    name: attr(''),
    changeDate: attr(''),
    lastIndexDate: attr(''),
    indexComment: attr(''),
    typeMapCSStr: attr(''),
    serializedIndex: attr('')
  });
  modelClass.defineProjection('IntelliSearchPluginLight', 'fd-dev-stage', {
    name: attr(''),
    changeDate: attr(''),
    lastIndexDate: attr(''),
    indexComment: attr(''),
    configuration: belongsTo('fd-configuration', '', {
      name: attr(''),
      project: belongsTo('fd-project', '', {
        name: attr(''),
        repository: belongsTo('fd-repository', '', {
          name: attr('')
        })
      })
    })
  });
  modelClass.defineProjection('IntelliSearchPluginSearch', 'fd-dev-stage', {
    name: attr(''),
    changeDate: attr(''),
    lastIndexDate: attr(''),
    indexComment: attr(''),
    configuration: belongsTo('fd-configuration', '', {
      name: attr(''),
      project: belongsTo('fd-project', '', {
        name: attr(''),
        repository: belongsTo('fd-repository', '', {
          name: attr('')
        })
      })
    }),
    serializedIndex: attr('')
  });
  modelClass.defineProjection('LightStage', 'fd-dev-stage', {
    company: attr(''),
    product: attr(''),
    sourceCodeCSPath: attr(''),
    moduleSettings: hasMany('fd-dev-module-setting', '', {
      moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: attr('ValueXML'),
      moduleSettingTypeName: attr(''),
      stage: belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-stage', {
  });
  modelClass.defineProjection('ListFormViewEnterprise', 'fd-dev-stage', {
    name: attr('Name'),
    description: attr('Description'),
    changeUser: attr('Change user'),
    changeDate: attr('Change date'),
    createUser: attr('Create user'),
    createDate: attr('Create date'),
    configuration: belongsTo('fd-configuration', '', {
      project: belongsTo('fd-project', '', {
        repository: belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-stage', {
    name: attr('Name'),
    description: attr('Description'),
    changeUser: attr('Change user'),
    changeDate: attr('Change date'),
    createUser: attr('Create user'),
    createDate: attr('Create date'),
    configuration: belongsTo('fd-configuration', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('Prototyping', 'fd-dev-stage', {
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-dev-stage', {
    name: attr('')
  });
  modelClass.defineProjection('ViewPeeker', 'fd-dev-stage', {
  });
};
