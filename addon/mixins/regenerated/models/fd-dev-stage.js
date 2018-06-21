import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
  moduleSettings: DS.hasMany('fd-dev-module-setting', { inverse: 'stage', async: false }),
  generations: DS.hasMany('fd-generation', { inverse: 'stage', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-stage'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditPrototyping', 'fd-dev-stage', {
    typeMapCS: Projection.attr(''),
    typeMapCSStr: Projection.attr('')
  });
  modelClass.defineProjection('Backup', 'fd-dev-stage', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    company: Projection.attr(''),
    product: Projection.attr(''),
    copyright: Projection.attr(''),
    version: Projection.attr(''),
    dataObjectNameSpace: Projection.attr(''),
    sourceCodeCSPath: Projection.attr(''),
    sourceCodeVBPath: Projection.attr(''),
    sQLPath: Projection.attr(''),
    typeMapCSStr: Projection.attr(''),
    typeMapVBStr: Projection.attr(''),
    typeMapSQLStr: Projection.attr(''),
    typeMapAccessStr: Projection.attr(''),
    typeMapOracleStr: Projection.attr(''),
    defaultBaseClass: Projection.attr(''),
    defaultDetailArrayClass: Projection.attr(''),
    connectionString: Projection.attr(''),
    oracleConnectionString: Projection.attr(''),
    postgreConnectionString: Projection.attr(''),
    additionalPluginsSettingsStr: Projection.attr(''),
    defaultEditScriptName: Projection.attr(''),
    defaultListScriptName: Projection.attr(''),
    sourceAzStoragePath: Projection.attr(''),
    operationsEnumPacket: Projection.attr(''),
    operationsEnumNamespace: Projection.attr(''),
    signAssemblies: Projection.attr(''),
    auditEnabled: Projection.attr(''),
    isAuditDatabaseLocal: Projection.attr(''),
    isReportDatabaseLocal: Projection.attr(''),
    defaultWriteMode: Projection.attr(''),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      
    })
  });
  modelClass.defineProjection('Compiler', 'fd-dev-stage', {
    company: Projection.attr(''),
    product: Projection.attr(''),
    copyright: Projection.attr(''),
    version: Projection.attr(''),
    dataObjectNameSpace: Projection.attr(''),
    sourceCodeCSPath: Projection.attr(''),
    sourceCodeVBPath: Projection.attr(''),
    sQLPath: Projection.attr(''),
    typeMapCSStr: Projection.attr(''),
    typeMapVBStr: Projection.attr(''),
    typeMapSQLStr: Projection.attr(''),
    typeMapAccessStr: Projection.attr(''),
    defaultBaseClass: Projection.attr(''),
    defaultDetailArrayClass: Projection.attr(''),
    defaultEditScriptName: Projection.attr(''),
    defaultListScriptName: Projection.attr(''),
    signAssemblies: Projection.attr(''),
    additionalPluginsSettingsStr: Projection.attr(''),
    name: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditAccessGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    sQLPath: Projection.attr(''),
    typeMapAccessStr: Projection.attr('', { hidden: true }),
    typeMapAccess: Projection.attr('Карта типов'),
    additionalPluginsSettings: Projection.attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true }),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditCSGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    company: Projection.attr('Название компании'),
    product: Projection.attr('Название продукта'),
    copyright: Projection.attr('Copyright'),
    version: Projection.attr('Версия'),
    sourceCodeCSPath: Projection.attr('Каталог для исходного кода'),
    typeMapCSStr: Projection.attr('', { hidden: true }),
    typeMapCS: Projection.attr('Карта типов'),
    enableAuElement: Projection.attr(''),
    auditEnabled: Projection.attr('Вести аудит в приложение'),
    defaultWriteMode: Projection.attr('Режим записи аудита по умолчанию'),
    dataObjectNameSpace: Projection.attr('NameSpace'),
    defaultBaseClass: Projection.attr('Default base class'),
    defaultDetailArrayClass: Projection.attr('Default detail array class'),
    defaultEditScriptName: Projection.attr('Default edit script name'),
    defaultListScriptName: Projection.attr('Default list script name'),
    scriptPacket: Projection.attr('Script packet'),
    scriptNamespace: Projection.attr('Script namespace postfix'),
    signAssemblies: Projection.attr('Подписывать сборки'),
    additionalPluginsSettings: Projection.attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true }),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-stage', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    company: Projection.attr('Company'),
    copyright: Projection.attr('Copyright'),
    product: Projection.attr('Product'),
    configuration: Projection.belongsTo('fd-configuration', '', {
      project: Projection.belongsTo('fd-project', '', {
        repository: Projection.belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('EditMSSQLDirectGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    typeMapSQLStr: Projection.attr('', { hidden: true }),
    typeMapSQL: Projection.attr('Карта типов'),
    connectionString: Projection.attr('Строка соединения'),
    additionalPluginsSettings: Projection.attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true }),
    doNotDeleteExtraTables: Projection.attr('Не удалять существующие таблицы'),
    isAuditDatabaseLocal: Projection.attr('БД аудита в БД приложения'),
    isReportDatabaseLocal: Projection.attr('БД web-отчётов в БД приложения'),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditOracleGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    sQLPath: Projection.attr(''),
    typeMapOracle: Projection.attr('Карта типов'),
    doNotDeleteExtraTables: Projection.attr('Не удалять существующие таблицы'),
    typeMapOracleStr: Projection.attr('', { hidden: true }),
    isAuditDatabaseLocal: Projection.attr('БД аудита в БД приложения'),
    isReportDatabaseLocal: Projection.attr('БД web-отчётов в БД приложения'),
    additionalPluginsSettings: Projection.attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true }),
    oracleConnectionString: Projection.attr('Строка соединения'),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditPostgreSqlDirectGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    typeMapPostgre: Projection.attr('Карта типов'),
    postgreConnectionString: Projection.attr('Строка соединения'),
    typeMapPostgreStr: Projection.attr('', { hidden: true }),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true }),
    doNotDeleteExtraTables: Projection.attr('Не удалять существующие таблицы'),
    additionalPluginsSettings: Projection.attr('Дополнительные настройки'),
    isAuditDatabaseLocal: Projection.attr('БД аудита в БД приложения'),
    isReportDatabaseLocal: Projection.attr('БД web-отчётов в БД приложения'),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-stage', {
    
  });
  modelClass.defineProjection('EditRightManagementGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    sourceAzStoragePath: Projection.attr('Имя файла хранилища'),
    defaultAccessType: Projection.attr('Тип проверки доступа по умолчанию'),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true })
  });
  modelClass.defineProjection('EditSQLGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    sQLPath: Projection.attr(''),
    typeMapSQLStr: Projection.attr('', { hidden: true }),
    typeMapSQL: Projection.attr('Карта типов'),
    additionalPluginsSettings: Projection.attr('Дополнительные настройки'),
    additionalPluginsSettingsStr: Projection.attr('', { hidden: true }),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditVBGenerator', 'fd-dev-stage', {
    name: Projection.attr('Название стадии'),
    description: Projection.attr('Описание'),
    company: Projection.attr(''),
    product: Projection.attr(''),
    copyright: Projection.attr(''),
    version: Projection.attr(''),
    dataObjectNameSpace: Projection.attr(''),
    sourceCodeVBPath: Projection.attr(''),
    typeMapVBStr: Projection.attr('', { hidden: true }),
    typeMapVB: Projection.attr(''),
    defaultBaseClass: Projection.attr(''),
    defaultDetailArrayClass: Projection.attr(''),
    defaultEditScriptName: Projection.attr(''),
    defaultListScriptName: Projection.attr(''),
    signAssemblies: Projection.attr('')
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-stage', {
    additionalPluginsSettingsStr: Projection.attr(''),
    auditEnabled: Projection.attr(''),
    company: Projection.attr(''),
    copyright: Projection.attr(''),
    dataObjectNameSpace: Projection.attr(''),
    defaultAccessType: Projection.attr(''),
    defaultBaseClass: Projection.attr(''),
    defaultDetailArrayClass: Projection.attr(''),
    defaultEditScriptName: Projection.attr(''),
    defaultListScriptName: Projection.attr(''),
    defaultWriteMode: Projection.attr(''),
    doNotDeleteExtraTables: Projection.attr(''),
    indexComment: Projection.attr(''),
    isAuditDatabaseLocal: Projection.attr(''),
    isReportDatabaseLocal: Projection.attr(''),
    lastIndexDate: Projection.attr(''),
    operationsEnumNamespace: Projection.attr(''),
    operationsEnumPacket: Projection.attr(''),
    product: Projection.attr(''),
    realDataObjectNameSpace: Projection.attr(''),
    scriptNamespace: Projection.attr(''),
    scriptPacket: Projection.attr(''),
    serializedIndex: Projection.attr(''),
    signAssemblies: Projection.attr(''),
    sourceAzStoragePath: Projection.attr(''),
    sourceCodeCSPath: Projection.attr(''),
    sourceCodeVBPath: Projection.attr(''),
    sourceControlUri: Projection.attr(''),
    sQLPath: Projection.attr(''),
    typeMapAccessStr: Projection.attr(''),
    typeMapCSStr: Projection.attr(''),
    typeMapOracleStr: Projection.attr(''),
    typeMapPostgreStr: Projection.attr(''),
    typeMapSQLStr: Projection.attr(''),
    typeMapVBStr: Projection.attr(''),
    useSourceControl: Projection.attr(''),
    version: Projection.attr(''),
    createUser: Projection.attr(''),
    createDate: Projection.attr(''),
    changeUser: Projection.attr(''),
    changeDate: Projection.attr(''),
    name: Projection.attr(''),
    description: Projection.attr(''),
    nameStr: Projection.attr(''),
    configuration: Projection.belongsTo('fd-configuration', '', {
      name: Projection.attr('')
    })
  });
  modelClass.defineProjection('FormDesigner_ProjectE', 'fd-dev-stage', {
    name: Projection.attr('Название'),
    description: Projection.attr('Описание'),
    product: Projection.attr(''),
    configuration: Projection.belongsTo('fd-configuration', '', {
      project: Projection.belongsTo('fd-project', '', {
        repository: Projection.belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('FormDesigner_ProjectL', 'fd-dev-stage', {
    name: Projection.attr('Название'),
    description: Projection.attr('Описание'),
    product: Projection.attr('', { hidden: true }),
    configuration: Projection.belongsTo('fd-configuration', '', {
      project: Projection.belongsTo('fd-project', '', {
        repository: Projection.belongsTo('fd-repository', '', {

        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('Generations', 'fd-dev-stage', {
    name: Projection.attr(''),
    generations: Projection.hasMany('fd-generation', '', {
      userName: Projection.attr('Пользователь'),
      state: Projection.attr('Состояние'),
      startTime: Projection.attr('Время старта'),
      percentComplete: Projection.attr('% выполнения'),
      endTime: Projection.attr('Время окончания'),
      stage: Projection.belongsTo('fd-dev-stage', 'Имя стадии', {
        name: Projection.attr('Имя стадии')
      }, { hidden: true }),
      generationReason: Projection.attr('Действие')
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-stage', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    company: Projection.attr(''),
    product: Projection.attr(''),
    copyright: Projection.attr(''),
    version: Projection.attr(''),
    dataObjectNameSpace: Projection.attr(''),
    sourceCodeCSPath: Projection.attr(''),
    sourceCodeVBPath: Projection.attr(''),
    sQLPath: Projection.attr(''),
    typeMapCSStr: Projection.attr(''),
    typeMapVBStr: Projection.attr(''),
    typeMapSQLStr: Projection.attr(''),
    typeMapAccessStr: Projection.attr(''),
    typeMapOracleStr: Projection.attr(''),
    typeMapPostgreStr: Projection.attr(''),
    defaultBaseClass: Projection.attr(''),
    defaultDetailArrayClass: Projection.attr(''),
    connectionString: Projection.attr(''),
    oracleConnectionString: Projection.attr(''),
    postgreConnectionString: Projection.attr(''),
    additionalPluginsSettingsStr: Projection.attr(''),
    defaultEditScriptName: Projection.attr(''),
    defaultListScriptName: Projection.attr(''),
    sourceAzStoragePath: Projection.attr(''),
    operationsEnumPacket: Projection.attr(''),
    operationsEnumNamespace: Projection.attr(''),
    signAssemblies: Projection.attr(''),
    auditEnabled: Projection.attr(''),
    isAuditDatabaseLocal: Projection.attr(''),
    defaultWriteMode: Projection.attr(''),
    isReportDatabaseLocal: Projection.attr(''),
    typeDefinitions: Projection.hasMany('fd-dev-type-definition', '', {
      name: Projection.attr(''),
      caption: Projection.attr(''),
      mapTypeName: Projection.attr(''),
      mapTypeAssemblyName: Projection.attr(''),
      formatAttribute: Projection.attr('')
    }),
    controlTypes: Projection.hasMany('fd-dev-control-type', '', {
      name: Projection.attr('Имя'),
      designerHtmlTemplate: Projection.attr('Шаблон'),
      designerMetadataXml: Projection.attr('Метаданные дизайна'),
      editedType: Projection.belongsTo('fd-dev-type-definition', '', {
        name: Projection.attr('', { hidden: true })
      })
    }),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('IntelliSearchPluginIndexing', 'fd-dev-stage', {
    name: Projection.attr(''),
    changeDate: Projection.attr(''),
    lastIndexDate: Projection.attr(''),
    indexComment: Projection.attr(''),
    typeMapCSStr: Projection.attr(''),
    serializedIndex: Projection.attr('')
  });
  modelClass.defineProjection('IntelliSearchPluginLight', 'fd-dev-stage', {
    name: Projection.attr(''),
    changeDate: Projection.attr(''),
    lastIndexDate: Projection.attr(''),
    indexComment: Projection.attr(''),
    configuration: Projection.belongsTo('fd-configuration', '', {
      name: Projection.attr(''),
      project: Projection.belongsTo('fd-project', '', {
        name: Projection.attr(''),
        repository: Projection.belongsTo('fd-repository', '', {
          name: Projection.attr('')
        })
      })
    })
  });
  modelClass.defineProjection('IntelliSearchPluginSearch', 'fd-dev-stage', {
    name: Projection.attr(''),
    changeDate: Projection.attr(''),
    lastIndexDate: Projection.attr(''),
    indexComment: Projection.attr(''),
    configuration: Projection.belongsTo('fd-configuration', '', {
      name: Projection.attr(''),
      project: Projection.belongsTo('fd-project', '', {
        name: Projection.attr(''),
        repository: Projection.belongsTo('fd-repository', '', {
          name: Projection.attr('')
        })
      })
    }),
    serializedIndex: Projection.attr('')
  });
  modelClass.defineProjection('LightStage', 'fd-dev-stage', {
    company: Projection.attr(''),
    product: Projection.attr(''),
    sourceCodeCSPath: Projection.attr(''),
    moduleSettings: Projection.hasMany('fd-dev-module-setting', '', {
      moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
        name: Projection.attr('Name ModuleSettingType')
      }, { hidden: true }),
      valueXML: Projection.attr('ValueXML'),
      stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

      }, { hidden: true })
    })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-stage', {
    
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-stage', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    changeUser: Projection.attr('Change user'),
    changeDate: Projection.attr('Change date'),
    createUser: Projection.attr('Create user'),
    createDate: Projection.attr('Create date'),
    configuration: Projection.belongsTo('fd-configuration', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('Prototyping', 'fd-dev-stage', {
    
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-dev-stage', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('ViewPeeker', 'fd-dev-stage', {
    
  });
};
