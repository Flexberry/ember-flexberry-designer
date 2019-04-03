import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, hasMany, belongsTo } from 'ember-flexberry-data/utils/attributes';
import DataServiceObjectEventsEnum from '../../../enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';

export let Model = Mixin.create({
  accessType: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-access-type'),
  addAuditFields: DS.attr('boolean'),
  appConfig: DS.attr('string'),
  /**
    Non-stored property.

    @property appConfigFile
  */
  appConfigFile: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'appConfigFileCompute' method in model class (outside of this mixin) if you want to compute value of 'appConfigFile' property.

    @method _appConfigFileCompute
    @private
    @example
      ```javascript
      _appConfigFileChanged: Ember.on('init', Ember.observer('appConfigFile', function() {
        Ember.run.once(this, '_appConfigFileCompute');
      }))
      ```
  */
  _appConfigFileCompute: function() {
    let result = (this.appConfigFileCompute && typeof this.appConfigFileCompute === 'function') ? this.appConfigFileCompute() : null;
    this.set('appConfigFile', result);
  },
  auditConnectionStringName: DS.attr('string'),
  auditEnabled: DS.attr('boolean'),
  auditWinServiceUrl: DS.attr('string'),
  autoAltered: DS.attr('boolean'),
  /**
    Non-stored property.

    @property bSClass
  */
  bSClass: DS.attr('new-platform-flexberry-web-designer-business-server-class'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'bSClassCompute' method in model class (outside of this mixin) if you want to compute value of 'bSClass' property.

    @method _bSClassCompute
    @private
    @example
      ```javascript
      _bSClassChanged: Ember.on('init', Ember.observer('bSClass', function() {
        Ember.run.once(this, '_bSClassCompute');
      }))
      ```
  */
  _bSClassCompute: function() {
    let result = (this.bSClassCompute && typeof this.bSClassCompute === 'function') ? this.bSClassCompute() : null;
    this.set('bSClass', result);
  },
  /**
    Non-stored property.

    @property bSEvents
  */
  bSEvents: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'bSEventsCompute' method in model class (outside of this mixin) if you want to compute value of 'bSEvents' property.

    @method _bSEventsCompute
    @private
    @example
      ```javascript
      _bSEventsChanged: Ember.on('init', Ember.observer('bSEvents', function() {
        Ember.run.once(this, '_bSEventsCompute');
      }))
      ```
  */
  _bSEventsCompute: function() {
    let result = (this.bSEventsCompute && typeof this.bSEventsCompute === 'function') ? this.bSEventsCompute() : null;
    this.set('bSEvents', result);
  },
  businessServerEvents: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', { defaultValue: DataServiceObjectEventsEnum.OnAllEvents }),
  caption: DS.attr('string'),
  /**
    Non-stored property.

    @property comPlusServerOptions
  */
  comPlusServerOptions: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'comPlusServerOptionsCompute' method in model class (outside of this mixin) if you want to compute value of 'comPlusServerOptions' property.

    @method _comPlusServerOptionsCompute
    @private
    @example
      ```javascript
      _comPlusServerOptionsChanged: Ember.on('init', Ember.observer('comPlusServerOptions', function() {
        Ember.run.once(this, '_comPlusServerOptionsCompute');
      }))
      ```
  */
  _comPlusServerOptionsCompute: function() {
    let result = (this.comPlusServerOptionsCompute && typeof this.comPlusServerOptionsCompute === 'function') ? this.comPlusServerOptionsCompute() : null;
    this.set('comPlusServerOptions', result);
  },
  comPlusServerPropertiesStr: DS.attr('string'),
  /**
    Non-stored property.

    @property containers
  */
  containers: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'containersCompute' method in model class (outside of this mixin) if you want to compute value of 'containers' property.

    @method _containersCompute
    @private
    @example
      ```javascript
      _containersChanged: Ember.on('init', Ember.observer('containers', function() {
        Ember.run.once(this, '_containersCompute');
      }))
      ```
  */
  _containersCompute: function() {
    let result = (this.containersCompute && typeof this.containersCompute === 'function') ? this.containersCompute() : null;
    this.set('containers', result);
  },
  containersStr: DS.attr('containers-tree'),
  /**
    Non-stored property.

    @property dataObjectTypes
  */
  dataObjectTypes: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'dataObjectTypesCompute' method in model class (outside of this mixin) if you want to compute value of 'dataObjectTypes' property.

    @method _dataObjectTypesCompute
    @private
    @example
      ```javascript
      _dataObjectTypesChanged: Ember.on('init', Ember.observer('dataObjectTypes', function() {
        Ember.run.once(this, '_dataObjectTypesCompute');
      }))
      ```
  */
  _dataObjectTypesCompute: function() {
    let result = (this.dataObjectTypesCompute && typeof this.dataObjectTypesCompute === 'function') ? this.dataObjectTypesCompute() : null;
    this.set('dataObjectTypes', result);
  },
  dataObjectTypesStr: DS.attr('string'),
  deleteAudit: DS.attr('boolean'),
  deleteAuditViewName: DS.attr('string'),
  disableAllRightChecks: DS.attr('boolean'),
  /**
    Non-stored property.

    @property editFormOperations
  */
  editFormOperations: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'editFormOperationsCompute' method in model class (outside of this mixin) if you want to compute value of 'editFormOperations' property.

    @method _editFormOperationsCompute
    @private
    @example
      ```javascript
      _editFormOperationsChanged: Ember.on('init', Ember.observer('editFormOperations', function() {
        Ember.run.once(this, '_editFormOperationsCompute');
      }))
      ```
  */
  _editFormOperationsCompute: function() {
    let result = (this.editFormOperationsCompute && typeof this.editFormOperationsCompute === 'function') ? this.editFormOperationsCompute() : null;
    this.set('editFormOperations', result);
  },
  editFormOperationsStr: DS.attr('string'),
  expandOperations: DS.attr('boolean'),
  fixDependedForm: DS.attr('boolean'),
  formUrl: DS.attr('string'),
  generateCatcher: DS.attr('boolean'),
  generateComPlusServer: DS.attr('boolean'),
  generateDependedForm: DS.attr('boolean'),
  generateHttpRemoteServer: DS.attr('boolean'),
  hierarchicalMaster: DS.attr('string'),
  insertAudit: DS.attr('boolean'),
  insertAuditViewName: DS.attr('string'),
  /**
    Non-stored property.

    @property listFormOperations
  */
  listFormOperations: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'listFormOperationsCompute' method in model class (outside of this mixin) if you want to compute value of 'listFormOperations' property.

    @method _listFormOperationsCompute
    @private
    @example
      ```javascript
      _listFormOperationsChanged: Ember.on('init', Ember.observer('listFormOperations', function() {
        Ember.run.once(this, '_listFormOperationsCompute');
      }))
      ```
  */
  _listFormOperationsCompute: function() {
    let result = (this.listFormOperationsCompute && typeof this.listFormOperationsCompute === 'function') ? this.listFormOperationsCompute() : null;
    this.set('listFormOperations', result);
  },
  listFormOperationsStr: DS.attr('string'),
  loadingOrder: DS.attr('string'),
  /**
    Non-stored property.

    @property loadingOrderXML
  */
  loadingOrderXML: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'loadingOrderXMLCompute' method in model class (outside of this mixin) if you want to compute value of 'loadingOrderXML' property.

    @method _loadingOrderXMLCompute
    @private
    @example
      ```javascript
      _loadingOrderXMLChanged: Ember.on('init', Ember.observer('loadingOrderXML', function() {
        Ember.run.once(this, '_loadingOrderXMLCompute');
      }))
      ```
  */
  _loadingOrderXMLCompute: function() {
    let result = (this.loadingOrderXMLCompute && typeof this.loadingOrderXMLCompute === 'function') ? this.loadingOrderXMLCompute() : null;
    this.set('loadingOrderXML', result);
  },
  namespacePostfix: DS.attr('string'),
  onlyShowSelectedValue: DS.attr('boolean'),
  packet: DS.attr('string'),
  pBCustomAttributes: DS.attr('boolean'),
  pBGetViewsForForm: DS.attr('boolean'),
  pBMembers: DS.attr('boolean'),
  primaryKeyStorage: DS.attr('string'),
  printContainer: DS.attr('string'),
  /**
    Non-stored property.

    @property propertyLookup
  */
  propertyLookup: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'propertyLookupCompute' method in model class (outside of this mixin) if you want to compute value of 'propertyLookup' property.

    @method _propertyLookupCompute
    @private
    @example
      ```javascript
      _propertyLookupChanged: Ember.on('init', Ember.observer('propertyLookup', function() {
        Ember.run.once(this, '_propertyLookupCompute');
      }))
      ```
  */
  _propertyLookupCompute: function() {
    let result = (this.propertyLookupCompute && typeof this.propertyLookupCompute === 'function') ? this.propertyLookupCompute() : null;
    this.set('propertyLookup', result);
  },
  propertyLookupStr: DS.attr('fd-propertylookupstr'),
  publishToEBSD: DS.attr('boolean'),
  /**
    Non-stored property.

    @property realCaption
  */
  realCaption: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realCaptionCompute' method in model class (outside of this mixin) if you want to compute value of 'realCaption' property.

    @method _realCaptionCompute
    @private
    @example
      ```javascript
      _realCaptionChanged: Ember.on('init', Ember.observer('realCaption', function() {
        Ember.run.once(this, '_realCaptionCompute');
      }))
      ```
  */
  _realCaptionCompute: function() {
    let result = (this.realCaptionCompute && typeof this.realCaptionCompute === 'function') ? this.realCaptionCompute() : null;
    this.set('realCaption', result);
  },
  /**
    Non-stored property.

    @property realNamespace
  */
  realNamespace: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realNamespaceCompute' method in model class (outside of this mixin) if you want to compute value of 'realNamespace' property.

    @method _realNamespaceCompute
    @private
    @example
      ```javascript
      _realNamespaceChanged: Ember.on('init', Ember.observer('realNamespace', function() {
        Ember.run.once(this, '_realNamespaceCompute');
      }))
      ```
  */
  _realNamespaceCompute: function() {
    let result = (this.realNamespaceCompute && typeof this.realNamespaceCompute === 'function') ? this.realNamespaceCompute() : null;
    this.set('realNamespace', result);
  },
  /**
    Non-stored property.

    @property realPacket
  */
  realPacket: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realPacketCompute' method in model class (outside of this mixin) if you want to compute value of 'realPacket' property.

    @method _realPacketCompute
    @private
    @example
      ```javascript
      _realPacketChanged: Ember.on('init', Ember.observer('realPacket', function() {
        Ember.run.once(this, '_realPacketCompute');
      }))
      ```
  */
  _realPacketCompute: function() {
    let result = (this.realPacketCompute && typeof this.realPacketCompute === 'function') ? this.realPacketCompute() : null;
    this.set('realPacket', result);
  },
  /**
    Non-stored property.

    @property realPrimaryKeyStorage
  */
  realPrimaryKeyStorage: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realPrimaryKeyStorageCompute' method in model class (outside of this mixin) if you want to compute value of 'realPrimaryKeyStorage' property.

    @method _realPrimaryKeyStorageCompute
    @private
    @example
      ```javascript
      _realPrimaryKeyStorageChanged: Ember.on('init', Ember.observer('realPrimaryKeyStorage', function() {
        Ember.run.once(this, '_realPrimaryKeyStorageCompute');
      }))
      ```
  */
  _realPrimaryKeyStorageCompute: function() {
    let result = (this.realPrimaryKeyStorageCompute && typeof this.realPrimaryKeyStorageCompute === 'function') ? this.realPrimaryKeyStorageCompute() : null;
    this.set('realPrimaryKeyStorage', result);
  },
  /**
    Non-stored property.

    @property realStorage
  */
  realStorage: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realStorageCompute' method in model class (outside of this mixin) if you want to compute value of 'realStorage' property.

    @method _realStorageCompute
    @private
    @example
      ```javascript
      _realStorageChanged: Ember.on('init', Ember.observer('realStorage', function() {
        Ember.run.once(this, '_realStorageCompute');
      }))
      ```
  */
  _realStorageCompute: function() {
    let result = (this.realStorageCompute && typeof this.realStorageCompute === 'function') ? this.realStorageCompute() : null;
    this.set('realStorage', result);
  },
  scriptName: DS.attr('string'),
  selectAudit: DS.attr('boolean'),
  selectAuditViewName: DS.attr('string'),
  standartDesktop: DS.attr('boolean'),
  storage: DS.attr('string'),
  publishName: DS.attr('string'),
  storeInstancesInType: DS.attr('string'),
  /**
    Non-stored property.

    @property storeInstancesInTypeXML
  */
  storeInstancesInTypeXML: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'storeInstancesInTypeXMLCompute' method in model class (outside of this mixin) if you want to compute value of 'storeInstancesInTypeXML' property.

    @method _storeInstancesInTypeXMLCompute
    @private
    @example
      ```javascript
      _storeInstancesInTypeXMLChanged: Ember.on('init', Ember.observer('storeInstancesInTypeXML', function() {
        Ember.run.once(this, '_storeInstancesInTypeXMLCompute');
      }))
      ```
  */
  _storeInstancesInTypeXMLCompute: function() {
    let result = (this.storeInstancesInTypeXMLCompute && typeof this.storeInstancesInTypeXMLCompute === 'function') ?
      this.storeInstancesInTypeXMLCompute() : null;
    this.set('storeInstancesInTypeXML', result);
  },
  trim: DS.attr('boolean'),
  updateAudit: DS.attr('boolean'),
  updateAuditViewName: DS.attr('string'),
  /**
    Non-stored property.

    @property useCache
  */
  useCache: DS.attr('boolean'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'useCacheCompute' method in model class (outside of this mixin) if you want to compute value of 'useCache' property.

    @method _useCacheCompute
    @private
    @example
      ```javascript
      _useCacheChanged: Ember.on('init', Ember.observer('useCache', function() {
        Ember.run.once(this, '_useCacheCompute');
      }))
      ```
  */
  _useCacheCompute: function() {
    let result = (this.useCacheCompute && typeof this.useCacheCompute === 'function') ? this.useCacheCompute() : null;
    this.set('useCache', result);
  },
  useDefaultView: DS.attr('boolean'),
  writeMode: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode'),
  writeSessions: DS.attr('boolean'),
  businessServerClass: DS.belongsTo('fd-dev-class', { inverse: null, async: false }),
  classStorageTypes: DS.hasMany('fd-class-storage-type', { inverse: 'class', async: false }),
  views: DS.hasMany('fd-dev-view', { inverse: 'class', async: false }),
  methods: DS.hasMany('fd-dev-method', { inverse: 'class', async: false }),
  formViews: DS.hasMany('fd-dev-form-view', { inverse: 'class', async: false }),
  attributes: DS.hasMany('fd-dev-attribute', { inverse: 'class', async: false }),
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
    _parentModelName: 'fd-class'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ApplicationClassView', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    containersStr: attr('')
  });
  modelClass.defineProjection('AttributesChangeView', 'fd-dev-class', {
    attributesStr: attr(''),
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr(''),
      type: attr(''),
      caption: attr(''),
      description: attr(''),
      class: belongsTo('fd-dev-class', '', {

      })
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      properties: attr(''),
      definition: attr(''),
      class: belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('AttributesView', 'fd-dev-class', {
    attributesStr: attr(''),
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr(''),
      type: attr(''),
      class: belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('AuditPrototyping', 'fd-dev-class', {
    stereotype: attr(''),
    nameStr: attr(''),
    name: attr(''),
    auditEnabled: attr(''),
    addAuditFields: attr(''),
    useDefaultView: attr(''),
    insertAudit: attr(''),
    insertAuditViewName: attr(''),
    deleteAudit: attr(''),
    deleteAuditViewName: attr(''),
    updateAudit: attr(''),
    updateAuditViewName: attr(''),
    selectAudit: attr(''),
    selectAuditViewName: attr(''),
    attributesStr: attr(''),
    stored: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      stored: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      notNull: attr(''),
      dataServiceExpressionXML: attr('DataService Expression'),
      order: attr(''),
      storage: attr(''),
      trim: attr('')
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      definition: attr('')
    })
  });
  modelClass.defineProjection('BusinessServer', 'fd-dev-class', {
    nameStr: attr(''),
    stereotype: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      isEvent: attr(''),
      accessType: attr(''),
      pBCustomAttributes: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('BusinessServerExtra', 'fd-dev-class', {
    nameStr: attr(''),
    name: attr(''),
    stereotype: attr(''),
    views: hasMany('fd-dev-view', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('ClassV', 'fd-dev-class', {
    referenceCount: attr('Количество упоминаний'),
    stereotype: attr('Стереотип'),
    nameStr: attr('Название'),
    description: attr('Описание'),
    packet: attr(''),
    namespacePostfix: attr('Namespace postfix'),
    stage: belongsTo('fd-stage', '', {
      name: attr('', { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('EditApplication', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    caption: attr(''),
    standartDesktop: attr(''),
    namespacePostfix: attr(''),
    pBCustomAttributes: attr(''),
    disableAllRightChecks: attr(''),
    containersStr: attr(''),
    auditConnectionStringName: attr('Имя строки соединения с БД аудита'),
    auditWinServiceUrl: attr('Адрес сервиса аудита'),
    writeSessions: attr('Вести аудит сессий пользователей'),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      pBCustomAttributes: attr(''),
      isEvent: attr(''),
      accessType: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditBusinessServer', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBMembers: attr(''),
    generateComPlusServer: attr(''),
    generateHttpRemoteServer: attr(''),
    publishToEBSD: attr('')
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-class', {
    accessType: attr('Access check type'),
    addAuditFields: attr('Добавить поля аудита'),
    auditEnabled: attr('Вести аудит класса'),
    autoAltered: attr(''),
    bSClass: attr('Business Server'),
    bSEvents: attr('BS Events'),
    businessServerClass: belongsTo('fd-dev-class', '', {
      stereotype: attr('', { hidden: true })
    }, { hidden: true }),
    caption: attr(''),
    deleteAudit: attr('Вести аудит операции удаления'),
    deleteAuditViewName: attr('Имя представления для аудита операции удаления'),
    description: attr(''),
    formUrl: attr('Путь к форме просмотра объекта'),
    insertAudit: attr('Вести аудит операции создания'),
    insertAuditViewName: attr('Имя представления для аудита операции создания'),
    loadingOrderXML: attr('LoadingOrder'),
    name: attr(''),
    namespacePostfix: attr(''),
    packet: attr(''),
    pBCustomAttributes: attr(''),
    pBMembers: attr(''),
    primaryKeyStorage: attr(''),
    publishToEBSD: attr(''),
    selectAudit: attr('Вести аудит операции чтения'),
    selectAuditViewName: attr('Имя представления для аудита операции чтения'),
    storage: attr(''),
    publishName: attr(''),
    stored: attr(''),
    trim: attr(''),
    updateAudit: attr('Вести аудит операции изменения'),
    updateAuditViewName: attr('Имя представления для аудита операции изменения'),
    useDefaultView: attr('Использовать представление по умолчанию'),
    writeMode: attr('Режим записи аудита'),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      stored: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      notNull: attr(''),
      dataServiceExpressionXML: attr('DataService Expression'),
      storage: attr(''),
      publishName: attr(''),
      hint: attr(''),
      order: attr(''),
      trim: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr(''),
      autoincrement: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      isEvent: attr(''),
      pBCustomAttributes: attr(''),
      name: attr(''),
      description: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      description: attr(''),
      properties: attr('')
    })
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    caption: attr(''),
    generateDependedForm: attr(''),
    fixDependedForm: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBCustomAttributes: attr(''),
    pBMembers: attr(''),
    propertyLookup: attr(''),
    editFormOperations: attr(''),
    printContainer: attr(''),
    scriptName: attr(''),
    publishToEBSD: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    formViews: hasMany('fd-dev-form-view', '', {
      viewForForm: attr(''),
      view: belongsTo('fd-dev-view', '', {

      }, { hidden: true })
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      caption: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      pBCustomAttributes: attr(''),
      publishToUser: attr(''),
      isEvent: attr(''),
      accessType: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditEnum', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    onlyShowSelectedValue: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr(''),
      description: attr(''),
      defaultValue: attr(''),
      caption: attr('')
    })
  });
  modelClass.defineProjection('EditEventArg', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    generateCatcher: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBMembers: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      isEvent: attr(''),
      pBCustomAttributes: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditExternal', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr('', { hidden: true }),
    description: attr('Template class'),
    storeInstancesInTypeXML: attr('StoreInstancesInType'),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBMembers: attr(''),
    pBCustomAttributes: attr(''),
    publishToEBSD: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr(''),
      configuration: belongsTo('fd-configuration', '', {
        name: attr('', { hidden: true }),
        project: belongsTo('fd-project', '', {
          name: attr('', { hidden: true }),
          repository: belongsTo('fd-repository', '', {
            name: attr('', { hidden: true })
          }, { hidden: true })
        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-class', {
    name: attr('Name'),
    description: attr('Description')
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-class', {
    businessServerEvents: attr(''),
    businessServerClass: belongsTo('fd-dev-class', '', {
      stereotype: attr('', { hidden: true })
    }),
    description: attr(''),
    name: attr(''),
    namespacePostfix: attr(''),
    packet: attr(''),
    pBMembers: attr(''),
    publishToEBSD: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr(''),
      type: attr(''),
      description: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      isEvent: attr(''),
      pBCustomAttributes: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    caption: attr(''),
    generateDependedForm: attr(''),
    fixDependedForm: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBCustomAttributes: attr(''),
    pBMembers: attr(''),
    scriptName: attr(''),
    publishToEBSD: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    formViews: hasMany('fd-dev-form-view', '', {
      viewForForm: attr(''),
      dataObjectTypesStr: attr(''),
      listFormOperationsStr: attr(''),
      hierarchicalMaster: attr(''),
      view: belongsTo('fd-dev-view', '', {

      }, { hidden: true })
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      caption: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      pBCustomAttributes: attr(''),
      publishToUser: attr(''),
      isEvent: attr(''),
      accessType: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    caption: attr(''),
    generateDependedForm: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBCustomAttributes: attr(''),
    pBGetViewsForForm: attr(''),
    pBMembers: attr(''),
    publishToEBSD: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    formViews: hasMany('fd-dev-form-view', '', {
      viewForForm: attr(''),
      view: belongsTo('fd-dev-view', '', {

      }, { hidden: true })
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      caption: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      pBCustomAttributes: attr(''),
      isEvent: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    formViews: hasMany('fd-dev-form-view', '', {
      view: belongsTo('fd-dev-view', '', {
        name: attr(''),
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        }, { hidden: true })
      }, { hidden: true })
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      definition: attr(''),
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditType', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    storeInstancesInType: attr('StoreInstancesInType'),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBMembers: attr(''),
    pBCustomAttributes: attr(''),
    publishToEBSD: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      isEvent: attr(''),
      pBCustomAttributes: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    pBCustomAttributes: attr(''),
    pBMembers: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    scriptName: attr(''),
    publishToEBSD: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr(''),
      name: attr(''),
      description: attr(''),
      type: attr(''),
      defaultValue: attr(''),
      pBCustomAttributes: attr(''),
      pBGetEnd: attr(''),
      pBGetStart: attr(''),
      pBSetEnd: attr(''),
      pBSetStart: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      name: attr(''),
      caption: attr(''),
      description: attr(''),
      type: attr(''),
      parametersStr: attr('', { hidden: true }),
      pBCustomAttributes: attr(''),
      publishToUser: attr(''),
      isEvent: attr(''),
      accessType: attr(''),
      parameters: hasMany('fd-dev-parameter', '', {
        name: attr(''),
        modifier: attr(''),
        type: attr(''),
        description: attr('')
      })
    })
  });
  modelClass.defineProjection('FdAttributesChangeView', 'fd-dev-class', {
    attributesStr: attr(''),
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr(''),
      type: attr(''),
      caption: attr(''),
      description: attr(''),
      class: belongsTo('fd-dev-class', '', {

      })
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      definition: attr(''),
      class: belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('FdAttributesForForm', 'fd-dev-class', {
    name: attr(''),
    stereotype: attr(''),
    formViews: hasMany('fd-dev-form-view', '', {
      dataObjectTypesStr: attr(''),
      view: belongsTo('fd-dev-view', '', {
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        }),
        definition: attr('')
      }),
      class: belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('FdEditClassForm', 'fd-dev-class', {
    caption: attr('Заголовок'),
    name: attr('Имя'),
    publishName: attr(''),
    stored: attr(''),
    storage: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    businessServerClass: belongsTo('fd-dev-class', 'Бизнес-сервер', {
      name: attr('', { hidden: true })
    }, { displayMemberPath: 'name' }),
    businessServerEvents: attr('События бизнес-сервера'),
    nameStr: attr('', { hidden: true }),
    stage: belongsTo('fd-stage', '', {

    }, { hidden: true }),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr('Имя'),
      caption: attr('Заголовок'),
      type: attr('Тип'),
      description: attr('Описание'),
      class: belongsTo('fd-dev-class', '', {

      }, { hidden: true })
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr('Имя'),
      description: attr('Описание'),
      class: belongsTo('fd-dev-class', '', {

      }, { hidden: true })
    }),
    classStorageTypes: hasMany('fd-class-storage-type', '', {
      connectionName: attr('Имя соединения'),
      connectionString: attr('Строка соединения'),
      class: belongsTo('fd-dev-class', '', {

      }, { hidden: true }),
      storageType: belongsTo('fd-storage-type', 'Тип хранилища', {

      }, { displayMemberPath: 'shortName' })
    })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-class', {
    accessType: attr(''),
    addAuditFields: attr(''),
    auditConnectionStringName: attr(''),
    auditEnabled: attr(''),
    auditWinServiceUrl: attr(''),
    autoAltered: attr(''),
    businessServerEvents: attr(''),
    caption: attr(''),
    comPlusServerPropertiesStr: attr(''),
    containersStr: attr(''),
    dataObjectTypesStr: attr(''),
    deleteAudit: attr(''),
    deleteAuditViewName: attr(''),
    disableAllRightChecks: attr(''),
    editFormOperationsStr: attr(''),
    expandOperations: attr(''),
    fixDependedForm: attr(''),
    formUrl: attr(''),
    generateCatcher: attr(''),
    generateComPlusServer: attr(''),
    generateDependedForm: attr(''),
    generateHttpRemoteServer: attr(''),
    hierarchicalMaster: attr(''),
    insertAudit: attr(''),
    insertAuditViewName: attr(''),
    listFormOperationsStr: attr(''),
    loadingOrder: attr(''),
    namespacePostfix: attr(''),
    onlyShowSelectedValue: attr(''),
    packet: attr(''),
    pBCustomAttributes: attr(''),
    pBGetViewsForForm: attr(''),
    pBMembers: attr(''),
    primaryKeyStorage: attr(''),
    printContainer: attr(''),
    propertyLookupStr: attr(''),
    publishToEBSD: attr(''),
    realCaption: attr(''),
    realNamespace: attr(''),
    realPacket: attr(''),
    realPrimaryKeyStorage: attr(''),
    realStorage: attr(''),
    scriptName: attr(''),
    selectAudit: attr(''),
    selectAuditViewName: attr(''),
    standartDesktop: attr(''),
    storage: attr(''),
    publishName: attr(''),
    storeInstancesInType: attr(''),
    trim: attr(''),
    updateAudit: attr(''),
    updateAuditViewName: attr(''),
    useDefaultView: attr(''),
    writeMode: attr(''),
    writeSessions: attr(''),
    nameStr: attr(''),
    attributesStr: attr(''),
    methodsStr: attr(''),
    stored: attr(''),
    stereotype: attr(''),
    referenceCount: attr(''),
    name: attr(''),
    description: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr('')
    }),
    businessServerClass: belongsTo('fd-dev-class', '', {
      name: attr('')
    }),
    views: hasMany('fd-dev-view', '', {
      definition: attr(''),
      name: attr(''),
      description: attr(''),
      nameStr: attr(''),
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      })
    }),
    formViews: hasMany('fd-dev-form-view', '', {
      view: belongsTo('fd-dev-view', '', {
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        })
      })
    }),
    attributes: hasMany('fd-dev-attribute', '', {
      name: attr(''),
      type: attr(''),
      notNull: attr(''),
      defaultValue: attr(''),
      description: attr(''),
      accessModifier: attr('')
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr(''),
      type: attr(''),
      name: attr('')
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-class', {
    referenceCount: attr(''),
    stored: attr(''),
    attributesStr: attr(''),
    methodsStr: attr(''),
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    pBMembers: attr(''),
    autoAltered: attr(''),
    caption: attr(''),
    loadingOrder: attr(''),
    onlyShowSelectedValue: attr(''),
    pBCustomAttributes: attr(''),
    primaryKeyStorage: attr(''),
    storage: attr(''),
    publishName: attr(''),
    storeInstancesInType: attr(''),
    trim: attr(''),
    description: attr(''),
    generateDependedForm: attr(''),
    fixDependedForm: attr(''),
    packet: attr(''),
    namespacePostfix: attr(''),
    pBGetViewsForForm: attr(''),
    businessServerEvents: attr(''),
    businessServerClass: belongsTo('fd-dev-class', '', {
      nameStr: attr(''),
      attributesStr: attr(''),
      methodsStr: attr('')
    }),
    disableAllRightChecks: attr(''),
    dataObjectTypesStr: attr(''),
    propertyLookupStr: attr(''),
    standartDesktop: attr(''),
    containersStr: attr(''),
    appConfig: attr(''),
    hierarchicalMaster: attr(''),
    listFormOperationsStr: attr(''),
    editFormOperationsStr: attr(''),
    printContainer: attr(''),
    generateComPlusServer: attr(''),
    comPlusServerPropertiesStr: attr(''),
    generateHttpRemoteServer: attr(''),
    scriptName: attr(''),
    publishToEBSD: attr(''),
    generateCatcher: attr(''),
    expandOperations: attr(''),
    accessType: attr(''),
    auditEnabled: attr(''),
    useDefaultView: attr(''),
    insertAudit: attr(''),
    insertAuditViewName: attr(''),
    deleteAudit: attr(''),
    deleteAuditViewName: attr(''),
    updateAudit: attr(''),
    updateAuditViewName: attr(''),
    selectAudit: attr(''),
    selectAuditViewName: attr(''),
    formUrl: attr(''),
    writeMode: attr(''),
    auditConnectionStringName: attr(''),
    auditWinServiceUrl: attr(''),
    addAuditFields: attr(''),
    writeSessions: attr(''),
    attributes: hasMany('fd-dev-attribute', '', {
      accessModifier: attr('AccessModifier', { hidden: true }),
      autoincrement: attr('Autoincrement', { hidden: true }),
      caption: attr('Caption', { hidden: true }),
      dataServiceExpression: attr('DataServiceExpression', { hidden: true }),
      dataServiceExpressionXML: attr('DataServiceExpressionXML', { hidden: true }),
      defaultValue: attr('DefaultValue', { hidden: true }),
      hint: attr('Hint', { hidden: true }),
      notNull: attr('NotNull', { hidden: true }),
      order: attr('Order', { hidden: true }),
      orderNum: attr('OrderNum', { hidden: true }),
      pBCustomAttributes: attr('PBCustomAttributes', { hidden: true }),
      pBGetEnd: attr('PBGetEnd', { hidden: true }),
      pBSetEnd: attr('PBSetEnd', { hidden: true }),
      pBGetStart: attr('PBGetStart', { hidden: true }),
      pBSetStart: attr('PBSetStart', { hidden: true }),
      realCaption: attr('RealCaption', { hidden: true }),
      realStorage: attr('RealStorage', { hidden: true }),
      storage: attr('Storage', { hidden: true }),
      publishName: attr('PublishName', { hidden: true }),
      stored: attr('Stored', { hidden: true }),
      trim: attr('Trim', { hidden: true }),
      type: attr('Type', { hidden: true }),
      name: attr('Name', { hidden: true }),
      description: attr('Description', { hidden: true }),
      nameStr: attr('NameStr', { hidden: true })
    }),
    methods: hasMany('fd-dev-method', '', {
      accessModifier: attr('AccessModifier', { hidden: true }),
      accessType: attr('AccessType', { hidden: true }),
      caption: attr('Caption', { hidden: true }),
      isEvent: attr('IsEvent', { hidden: true }),
      orderNum: attr('OrderNum', { hidden: true }),
      parametersStr: attr('ParametersStr', { hidden: true }),
      pBCustomAttributes: attr('PBCustomAttributes', { hidden: true }),
      publishToUser: attr('PublishToUser', { hidden: true }),
      realCaption: attr('RealCaption', { hidden: true }),
      type: attr('Type', { hidden: true }),
      typeParametersStr: attr('TypeParametersStr', { hidden: true }),
      name: attr('Name', { hidden: true }),
      description: attr('Description', { hidden: true }),
      nameStr: attr('NameStr', { hidden: true }),
      parameters: hasMany('fd-dev-parameter', '', {
        caption: attr('Caption', { hidden: true }),
        modifier: attr('Modifier', { hidden: true }),
        orderNum: attr('OrderNum', { hidden: true }),
        realCaption: attr('RealCaption', { hidden: true }),
        type: attr('Type', { hidden: true }),
        name: attr('Name', { hidden: true }),
        description: attr('Description', { hidden: true }),
        nameStr: attr('NameStr', { hidden: true })
      })
    }),
    formViews: hasMany('fd-dev-form-view', '', {
      view: belongsTo('fd-dev-view', '', {
        name: attr(''),
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        }, { hidden: true })
      }),
      dataObjectTypes: attr('DataObjectTypes', { hidden: true }),
      dataObjectTypesStr: attr('DataObjectTypesStr', { hidden: true }),
      hierarchicalMaster: attr('HierarchicalMaster', { hidden: true }),
      listFormOperations: attr('ListFormOperations', { hidden: true }),
      listFormOperationsStr: attr('ListFormOperationsStr', { hidden: true }),
      orderNum: attr('OrderNum', { hidden: true }),
      propertyLookup: attr('PropertyLookup', { hidden: true }),
      propertyLookupStr: attr('PropertyLookupStr', { hidden: true }),
      viewForForm: attr('ViewForForm', { hidden: true }),
      name: attr('Name', { hidden: true }),
      description: attr('Description', { hidden: true }),
      nameStr: attr('NameStr', { hidden: true }),
      controls: hasMany('fd-dev-form-control', '', {
        name: attr(''),
        propertyPath: attr(''),
        settingsXml: attr(''),
        order: attr(''),
        controlType: belongsTo('fd-dev-control-type', '', {
          name: attr('')
        }),
        propertyType: belongsTo('fd-dev-type-definition', '', {
          name: attr('')
        }),
        formView: belongsTo('fd-dev-form-view', '', {
          view: belongsTo('fd-dev-view', '', {

          })
        })
      })
    }),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      description: attr(''),
      definition: attr(''),
      class: belongsTo('fd-dev-class', '', {

      })
    }),
    classStorageTypes: hasMany('fd-class-storage-type', '', {
      connectionName: attr(''),
      connectionString: attr(''),
      storageType: belongsTo('fd-storage-type', '', {

      }, { displayMemberPath: 'shortName' })
    })
  });
  modelClass.defineProjection('GetClassByGuid', 'fd-dev-class', {
    name: attr(''),
    description: attr(''),
    stereotype: attr(''),
    caption: attr(''),
    attributesStr: attr(''),
    stage: belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('LightStage', 'fd-dev-class', {
    generateCatcher: attr(''),
    generateComPlusServer: attr(''),
    generateHttpRemoteServer: attr(''),
    nameStr: attr(''),
    packet: attr(''),
    stereotype: attr('')
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    formViews: hasMany('fd-dev-form-view', '', {
      view: belongsTo('fd-dev-view', '', {
        name: attr(''),
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        }, { hidden: true })
      }, { hidden: true })
    })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-class', {
    stereotype: attr('Stereotype'),
    name: attr('Name'),
    description: attr('Description'),
    packet: attr('Packet'),
    namespacePostfix: attr('Namespace postfix'),
    stage: belongsTo('fd-stage', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('LoadNameView', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    description: attr(''),
    caption: attr('')
  });
  modelClass.defineProjection('Prototyping', 'fd-dev-class', {
    stereotype: attr(''),
    nameStr: attr(''),
    views: hasMany('fd-dev-view', '', {
      name: attr(''),
      definition: attr('')
    })
  });
  modelClass.defineProjection('SearchAppClassAndEditContainers', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    caption: attr(''),
    containersStr: attr(''),
    stage: belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('SearchClass', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    caption: attr(''),
    stage: belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('SearchClassLoadView', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    caption: attr(''),
    stage: belongsTo('fd-stage', '', {

    }),
    formViews: hasMany('fd-dev-form-view', '', {
      dataObjectTypesStr: attr(''),
      view: belongsTo('fd-dev-view', '', {
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        }),
        definition: attr('')
      }),
      class: belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('SearchFormClassView', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    containersStr: attr(''),
    stage: belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('SearchListFormAndEditLink', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    caption: attr(''),
    dataObjectTypesStr: attr(''),
    stage: belongsTo('fd-stage', '', {

    }),
    formViews: hasMany('fd-dev-form-view', '', {
      dataObjectTypesStr: attr(''),
      view: belongsTo('fd-dev-view', '', {
        class: belongsTo('fd-dev-class', '', {
          name: attr('')
        }),
        definition: attr('')
      }),
      class: belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('ViewPeeker', 'fd-dev-class', {
    name: attr(''),
    nameStr: attr(''),
    stereotype: attr(''),
    description: attr(''),
    views: hasMany('fd-dev-view', '', {
      name: attr('')
    })
  });
};
