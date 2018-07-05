import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
  businessServerEvents: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', { defaultValue: 'OnAllEvents' }),
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
  /* merged manually start */
  containersStr: DS.attr('containers-tree'),
  /* merged manually end */
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
  propertyLookupStr: DS.attr('string'),
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
      /* merged manually start */
      caption: {
        presence: {
          // message: this.get('i18n').t('models.fd-dev-class.validations.caption')
          message: 'Caption is required'
        }
      }
      /* merged manually end */
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
    _parentModelName: 'fd-class'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ApplicationClassView', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    containersStr: Projection.attr('')
  });
  modelClass.defineProjection('AttributesChangeView', 'fd-dev-class', {
    attributesStr: Projection.attr(''),
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      type: Projection.attr(''),
      caption: Projection.attr(''),
      description: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      properties: Projection.attr(''),
      definition: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('AttributesView', 'fd-dev-class', {
    attributesStr: Projection.attr(''),
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      type: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('AuditPrototyping', 'fd-dev-class', {
    stereotype: Projection.attr(''),
    nameStr: Projection.attr(''),
    name: Projection.attr(''),
    auditEnabled: Projection.attr(''),
    addAuditFields: Projection.attr(''),
    useDefaultView: Projection.attr(''),
    insertAudit: Projection.attr(''),
    insertAuditViewName: Projection.attr(''),
    deleteAudit: Projection.attr(''),
    deleteAuditViewName: Projection.attr(''),
    updateAudit: Projection.attr(''),
    updateAuditViewName: Projection.attr(''),
    selectAudit: Projection.attr(''),
    selectAuditViewName: Projection.attr(''),
    attributesStr: Projection.attr(''),
    stored: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      stored: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      notNull: Projection.attr(''),
      dataServiceExpressionXML: Projection.attr('DataService Expression'),
      order: Projection.attr(''),
      storage: Projection.attr(''),
      trim: Projection.attr('')
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      definition: Projection.attr('')
    })
  });
  modelClass.defineProjection('BusinessServer', 'fd-dev-class', {
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      isEvent: Projection.attr(''),
      accessType: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('BusinessServerExtra', 'fd-dev-class', {
    nameStr: Projection.attr(''),
    name: Projection.attr(''),
    stereotype: Projection.attr(''),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr('')
    })
  });
  modelClass.defineProjection('ClassV', 'fd-dev-class', {
    referenceCount: Projection.attr('Количество упоминаний'),
    stereotype: Projection.attr('Стереотип'),
    nameStr: Projection.attr('Название'),
    description: Projection.attr('Описание'),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr('Namespace postfix'),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr('', { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('EditApplication', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    caption: Projection.attr(''),
    standartDesktop: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    disableAllRightChecks: Projection.attr(''),
    containersStr: Projection.attr(''),
    auditConnectionStringName: Projection.attr('Имя строки соединения с БД аудита'),
    auditWinServiceUrl: Projection.attr('Адрес сервиса аудита'),
    writeSessions: Projection.attr('Вести аудит сессий пользователей'),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      pBCustomAttributes: Projection.attr(''),
      isEvent: Projection.attr(''),
      accessType: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditBusinessServer', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBMembers: Projection.attr(''),
    generateComPlusServer: Projection.attr(''),
    generateHttpRemoteServer: Projection.attr(''),
    publishToEBSD: Projection.attr('')
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-class', {
    accessType: Projection.attr('Access check type'),
    addAuditFields: Projection.attr('Добавить поля аудита'),
    auditEnabled: Projection.attr('Вести аудит класса'),
    autoAltered: Projection.attr(''),
    bSClass: Projection.attr('Business Server'),
    bSEvents: Projection.attr('BS Events'),
    businessServerClass: Projection.belongsTo('fd-dev-class', '', {
      stereotype: Projection.attr('', { hidden: true })
    }, { hidden: true }),
    caption: Projection.attr(''),
    deleteAudit: Projection.attr('Вести аудит операции удаления'),
    deleteAuditViewName: Projection.attr('Имя представления для аудита операции удаления'),
    description: Projection.attr(''),
    formUrl: Projection.attr('Путь к форме просмотра объекта'),
    insertAudit: Projection.attr('Вести аудит операции создания'),
    insertAuditViewName: Projection.attr('Имя представления для аудита операции создания'),
    loadingOrderXML: Projection.attr('LoadingOrder'),
    name: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    packet: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    pBMembers: Projection.attr(''),
    primaryKeyStorage: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    selectAudit: Projection.attr('Вести аудит операции чтения'),
    selectAuditViewName: Projection.attr('Имя представления для аудита операции чтения'),
    storage: Projection.attr(''),
    publishName: Projection.attr(''),
    stored: Projection.attr(''),
    trim: Projection.attr(''),
    updateAudit: Projection.attr('Вести аудит операции изменения'),
    updateAuditViewName: Projection.attr('Имя представления для аудита операции изменения'),
    useDefaultView: Projection.attr('Использовать представление по умолчанию'),
    writeMode: Projection.attr('Режим записи аудита'),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      stored: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      notNull: Projection.attr(''),
      dataServiceExpressionXML: Projection.attr('DataService Expression'),
      storage: Projection.attr(''),
      publishName: Projection.attr(''),
      hint: Projection.attr(''),
      order: Projection.attr(''),
      trim: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr(''),
      autoincrement: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      isEvent: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      description: Projection.attr(''),
      properties: Projection.attr('')
    })
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    caption: Projection.attr(''),
    generateDependedForm: Projection.attr(''),
    fixDependedForm: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    pBMembers: Projection.attr(''),
    propertyLookup: Projection.attr(''),
    editFormOperations: Projection.attr(''),
    printContainer: Projection.attr(''),
    scriptName: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      viewForForm: Projection.attr(''),
      view: Projection.belongsTo('fd-dev-view', '', {

      }, { hidden: true })
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      caption: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      pBCustomAttributes: Projection.attr(''),
      publishToUser: Projection.attr(''),
      isEvent: Projection.attr(''),
      accessType: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditEnum', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    onlyShowSelectedValue: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      description: Projection.attr(''),
      defaultValue: Projection.attr(''),
      caption: Projection.attr('')
    })
  });
  modelClass.defineProjection('EditEventArg', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    generateCatcher: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBMembers: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      isEvent: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditExternal', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr('', { hidden: true }),
    description: Projection.attr('Template class'),
    storeInstancesInTypeXML: Projection.attr('StoreInstancesInType'),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBMembers: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr(''),
      configuration: Projection.belongsTo('fd-configuration', '', {
        name: Projection.attr('', { hidden: true }),
        project: Projection.belongsTo('fd-project', '', {
          name: Projection.attr('', { hidden: true }),
          repository: Projection.belongsTo('fd-repository', '', {
            name: Projection.attr('', { hidden: true })
          }, { hidden: true })
        }, { hidden: true })
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-class', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-class', {
    businessServerEvents: Projection.attr(''),
    businessServerClass: Projection.belongsTo('fd-dev-class', '', {
      stereotype: Projection.attr('', { hidden: true })
    }),
    description: Projection.attr(''),
    name: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    packet: Projection.attr(''),
    pBMembers: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      type: Projection.attr(''),
      description: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      isEvent: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    caption: Projection.attr(''),
    generateDependedForm: Projection.attr(''),
    fixDependedForm: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    pBMembers: Projection.attr(''),
    scriptName: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      viewForForm: Projection.attr(''),
      dataObjectTypesStr: Projection.attr(''),
      listFormOperationsStr: Projection.attr(''),
      hierarchicalMaster: Projection.attr(''),
      view: Projection.belongsTo('fd-dev-view', '', {

      }, { hidden: true })
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      caption: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      pBCustomAttributes: Projection.attr(''),
      publishToUser: Projection.attr(''),
      isEvent: Projection.attr(''),
      accessType: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    caption: Projection.attr(''),
    generateDependedForm: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    pBGetViewsForForm: Projection.attr(''),
    pBMembers: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      viewForForm: Projection.attr(''),
      view: Projection.belongsTo('fd-dev-view', '', {

      }, { hidden: true })
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      caption: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      pBCustomAttributes: Projection.attr(''),
      isEvent: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      view: Projection.belongsTo('fd-dev-view', '', {
        name: Projection.attr(''),
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        }, { hidden: true })
      }, { hidden: true })
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      definition: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr('')
      }, { hidden: true })
    })
  });
  modelClass.defineProjection('EditType', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    storeInstancesInType: Projection.attr('StoreInstancesInType'),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBMembers: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      isEvent: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    pBMembers: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    scriptName: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      defaultValue: Projection.attr(''),
      pBCustomAttributes: Projection.attr(''),
      pBGetEnd: Projection.attr(''),
      pBGetStart: Projection.attr(''),
      pBSetEnd: Projection.attr(''),
      pBSetStart: Projection.attr('')
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr(''),
      name: Projection.attr(''),
      caption: Projection.attr(''),
      description: Projection.attr(''),
      type: Projection.attr(''),
      parametersStr: Projection.attr('', { hidden: true }),
      pBCustomAttributes: Projection.attr(''),
      publishToUser: Projection.attr(''),
      isEvent: Projection.attr(''),
      accessType: Projection.attr(''),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        name: Projection.attr(''),
        modifier: Projection.attr(''),
        type: Projection.attr(''),
        description: Projection.attr('')
      })
    })
  });
  modelClass.defineProjection('FdAttributesChangeView', 'fd-dev-class', {
    attributesStr: Projection.attr(''),
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      type: Projection.attr(''),
      caption: Projection.attr(''),
      description: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      definition: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('FdAttributesForForm', 'fd-dev-class', {
    name: Projection.attr(''),
    stereotype: Projection.attr(''),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      dataObjectTypesStr: Projection.attr(''),
      view: Projection.belongsTo('fd-dev-view', '', {
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        }),
        definition: Projection.attr('')
      }),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('FdEditClassForm', 'fd-dev-class', {
    caption: Projection.attr('Заголовок'),
    name: Projection.attr('Имя'),
    publishName: Projection.attr(''),
    stored: Projection.attr(''),
    storage: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    businessServerClass: Projection.belongsTo('fd-dev-class', 'Бизнес-сервер', {
      name: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'name' }),
    businessServerEvents: Projection.attr('События бизнес-сервера'),
    stage: Projection.belongsTo('fd-stage', '', {

    }, { hidden: true }),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr('Имя'),
      caption: Projection.attr('Заголовок'),
      type: Projection.attr('Тип'),
      description: Projection.attr('Описание'),
      class: Projection.belongsTo('fd-dev-class', '', {

      }, { hidden: true })
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr('Имя'),
      description: Projection.attr('Описание'),
      class: Projection.belongsTo('fd-dev-class', '', {

      }, { hidden: true })
    }),
    classStorageTypes: Projection.hasMany('fd-class-storage-type', '', {
      connectionName: Projection.attr('Имя соединения'),
      connectionString: Projection.attr('Строка соединения'),
      class: Projection.belongsTo('fd-dev-class', '', {

      }, { hidden: true }),
      storageType: Projection.belongsTo('fd-storage-type', 'Тип хранилища', {

      }, { displayMemberPath: 'shortName' })
    })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-class', {
    accessType: Projection.attr(''),
    addAuditFields: Projection.attr(''),
    auditConnectionStringName: Projection.attr(''),
    auditEnabled: Projection.attr(''),
    auditWinServiceUrl: Projection.attr(''),
    autoAltered: Projection.attr(''),
    businessServerEvents: Projection.attr(''),
    caption: Projection.attr(''),
    comPlusServerPropertiesStr: Projection.attr(''),
    containersStr: Projection.attr(''),
    dataObjectTypesStr: Projection.attr(''),
    deleteAudit: Projection.attr(''),
    deleteAuditViewName: Projection.attr(''),
    disableAllRightChecks: Projection.attr(''),
    editFormOperationsStr: Projection.attr(''),
    expandOperations: Projection.attr(''),
    fixDependedForm: Projection.attr(''),
    formUrl: Projection.attr(''),
    generateCatcher: Projection.attr(''),
    generateComPlusServer: Projection.attr(''),
    generateDependedForm: Projection.attr(''),
    generateHttpRemoteServer: Projection.attr(''),
    hierarchicalMaster: Projection.attr(''),
    insertAudit: Projection.attr(''),
    insertAuditViewName: Projection.attr(''),
    listFormOperationsStr: Projection.attr(''),
    loadingOrder: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    onlyShowSelectedValue: Projection.attr(''),
    packet: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    pBGetViewsForForm: Projection.attr(''),
    pBMembers: Projection.attr(''),
    primaryKeyStorage: Projection.attr(''),
    printContainer: Projection.attr(''),
    propertyLookupStr: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    realCaption: Projection.attr(''),
    realNamespace: Projection.attr(''),
    realPacket: Projection.attr(''),
    realPrimaryKeyStorage: Projection.attr(''),
    realStorage: Projection.attr(''),
    scriptName: Projection.attr(''),
    selectAudit: Projection.attr(''),
    selectAuditViewName: Projection.attr(''),
    standartDesktop: Projection.attr(''),
    storage: Projection.attr(''),
    publishName: Projection.attr(''),
    storeInstancesInType: Projection.attr(''),
    trim: Projection.attr(''),
    updateAudit: Projection.attr(''),
    updateAuditViewName: Projection.attr(''),
    useDefaultView: Projection.attr(''),
    writeMode: Projection.attr(''),
    writeSessions: Projection.attr(''),
    nameStr: Projection.attr(''),
    attributesStr: Projection.attr(''),
    methodsStr: Projection.attr(''),
    stored: Projection.attr(''),
    stereotype: Projection.attr(''),
    referenceCount: Projection.attr(''),
    name: Projection.attr(''),
    description: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr('')
    }),
    businessServerClass: Projection.belongsTo('fd-dev-class', '', {
      name: Projection.attr('')
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      definition: Projection.attr(''),
      name: Projection.attr(''),
      description: Projection.attr(''),
      nameStr: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr('')
      })
    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      view: Projection.belongsTo('fd-dev-view', '', {
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        })
      })
    }),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      type: Projection.attr(''),
      notNull: Projection.attr(''),
      defaultValue: Projection.attr(''),
      description: Projection.attr('')
    }),
  });
  modelClass.defineProjection('Generator', 'fd-dev-class', {
    referenceCount: Projection.attr(''),
    stored: Projection.attr(''),
    attributesStr: Projection.attr(''),
    methodsStr: Projection.attr(''),
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    pBMembers: Projection.attr(''),
    autoAltered: Projection.attr(''),
    caption: Projection.attr(''),
    loadingOrder: Projection.attr(''),
    onlyShowSelectedValue: Projection.attr(''),
    pBCustomAttributes: Projection.attr(''),
    primaryKeyStorage: Projection.attr(''),
    storage: Projection.attr(''),
    publishName: Projection.attr(''),
    storeInstancesInType: Projection.attr(''),
    trim: Projection.attr(''),
    description: Projection.attr(''),
    generateDependedForm: Projection.attr(''),
    fixDependedForm: Projection.attr(''),
    packet: Projection.attr(''),
    namespacePostfix: Projection.attr(''),
    pBGetViewsForForm: Projection.attr(''),
    businessServerEvents: Projection.attr(''),
    businessServerClass: Projection.belongsTo('fd-dev-class', '', {
      nameStr: Projection.attr(''),
      attributesStr: Projection.attr(''),
      methodsStr: Projection.attr('')
    }),
    disableAllRightChecks: Projection.attr(''),
    dataObjectTypesStr: Projection.attr(''),
    propertyLookupStr: Projection.attr(''),
    standartDesktop: Projection.attr(''),
    containersStr: Projection.attr(''),
    appConfig: Projection.attr(''),
    hierarchicalMaster: Projection.attr(''),
    listFormOperationsStr: Projection.attr(''),
    editFormOperationsStr: Projection.attr(''),
    printContainer: Projection.attr(''),
    generateComPlusServer: Projection.attr(''),
    comPlusServerPropertiesStr: Projection.attr(''),
    generateHttpRemoteServer: Projection.attr(''),
    scriptName: Projection.attr(''),
    publishToEBSD: Projection.attr(''),
    generateCatcher: Projection.attr(''),
    expandOperations: Projection.attr(''),
    accessType: Projection.attr(''),
    auditEnabled: Projection.attr(''),
    useDefaultView: Projection.attr(''),
    insertAudit: Projection.attr(''),
    insertAuditViewName: Projection.attr(''),
    deleteAudit: Projection.attr(''),
    deleteAuditViewName: Projection.attr(''),
    updateAudit: Projection.attr(''),
    updateAuditViewName: Projection.attr(''),
    selectAudit: Projection.attr(''),
    selectAuditViewName: Projection.attr(''),
    formUrl: Projection.attr(''),
    writeMode: Projection.attr(''),
    auditConnectionStringName: Projection.attr(''),
    auditWinServiceUrl: Projection.attr(''),
    addAuditFields: Projection.attr(''),
    writeSessions: Projection.attr(''),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      accessModifier: Projection.attr('AccessModifier', { hidden: true }),
      autoincrement: Projection.attr('Autoincrement', { hidden: true }),
      caption: Projection.attr('Caption', { hidden: true }),
      dataServiceExpression: Projection.attr('DataServiceExpression', { hidden: true }),
      dataServiceExpressionXML: Projection.attr('DataServiceExpressionXML', { hidden: true }),
      defaultValue: Projection.attr('DefaultValue', { hidden: true }),
      hint: Projection.attr('Hint', { hidden: true }),
      notNull: Projection.attr('NotNull', { hidden: true }),
      order: Projection.attr('Order', { hidden: true }),
      orderNum: Projection.attr('OrderNum', { hidden: true }),
      pBCustomAttributes: Projection.attr('PBCustomAttributes', { hidden: true }),
      pBGetEnd: Projection.attr('PBGetEnd', { hidden: true }),
      pBSetEnd: Projection.attr('PBSetEnd', { hidden: true }),
      pBGetStart: Projection.attr('PBGetStart', { hidden: true }),
      pBSetStart: Projection.attr('PBSetStart', { hidden: true }),
      realCaption: Projection.attr('RealCaption', { hidden: true }),
      realStorage: Projection.attr('RealStorage', { hidden: true }),
      storage: Projection.attr('Storage', { hidden: true }),
      publishName: Projection.attr('PublishName', { hidden: true }),
      stored: Projection.attr('Stored', { hidden: true }),
      trim: Projection.attr('Trim', { hidden: true }),
      type: Projection.attr('Type', { hidden: true }),
      name: Projection.attr('Name', { hidden: true }),
      description: Projection.attr('Description', { hidden: true }),
      nameStr: Projection.attr('NameStr', { hidden: true })
    }),
    methods: Projection.hasMany('fd-dev-method', '', {
      accessModifier: Projection.attr('AccessModifier', { hidden: true }),
      accessType: Projection.attr('AccessType', { hidden: true }),
      caption: Projection.attr('Caption', { hidden: true }),
      isEvent: Projection.attr('IsEvent', { hidden: true }),
      orderNum: Projection.attr('OrderNum', { hidden: true }),
      parametersStr: Projection.attr('ParametersStr', { hidden: true }),
      pBCustomAttributes: Projection.attr('PBCustomAttributes', { hidden: true }),
      publishToUser: Projection.attr('PublishToUser', { hidden: true }),
      realCaption: Projection.attr('RealCaption', { hidden: true }),
      type: Projection.attr('Type', { hidden: true }),
      typeParametersStr: Projection.attr('TypeParametersStr', { hidden: true }),
      name: Projection.attr('Name', { hidden: true }),
      description: Projection.attr('Description', { hidden: true }),
      nameStr: Projection.attr('NameStr', { hidden: true }),
      parameters: Projection.hasMany('fd-dev-parameter', '', {
        caption: Projection.attr('Caption', { hidden: true }),
        modifier: Projection.attr('Modifier', { hidden: true }),
        orderNum: Projection.attr('OrderNum', { hidden: true }),
        realCaption: Projection.attr('RealCaption', { hidden: true }),
        type: Projection.attr('Type', { hidden: true }),
        name: Projection.attr('Name', { hidden: true }),
        description: Projection.attr('Description', { hidden: true }),
        nameStr: Projection.attr('NameStr', { hidden: true })
      })
    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      view: Projection.belongsTo('fd-dev-view', '', {
        name: Projection.attr(''),
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        }, { hidden: true })
      }),
      dataObjectTypes: Projection.attr('DataObjectTypes', { hidden: true }),
      dataObjectTypesStr: Projection.attr('DataObjectTypesStr', { hidden: true }),
      hierarchicalMaster: Projection.attr('HierarchicalMaster', { hidden: true }),
      listFormOperations: Projection.attr('ListFormOperations', { hidden: true }),
      listFormOperationsStr: Projection.attr('ListFormOperationsStr', { hidden: true }),
      orderNum: Projection.attr('OrderNum', { hidden: true }),
      propertyLookup: Projection.attr('PropertyLookup', { hidden: true }),
      propertyLookupStr: Projection.attr('PropertyLookupStr', { hidden: true }),
      viewForForm: Projection.attr('ViewForForm', { hidden: true }),
      name: Projection.attr('Name', { hidden: true }),
      description: Projection.attr('Description', { hidden: true }),
      nameStr: Projection.attr('NameStr', { hidden: true }),
      controls: Projection.hasMany('fd-dev-form-control', '', {
        name: Projection.attr(''),
        propertyPath: Projection.attr(''),
        settingsXml: Projection.attr(''),
        order: Projection.attr(''),
        controlType: Projection.belongsTo('fd-dev-control-type', '', {
          name: Projection.attr('')
        }),
        propertyType: Projection.belongsTo('fd-dev-type-definition', '', {
          name: Projection.attr('')
        }),
        formView: Projection.belongsTo('fd-dev-form-view', '', {
          view: Projection.belongsTo('fd-dev-view', '', {

          })
        })
      })
    }),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      description: Projection.attr(''),
      definition: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    }),
    classStorageTypes: Projection.hasMany('fd-class-storage-type', '', {
      connectionName: Projection.attr(''),
      connectionString: Projection.attr(''),
      storageType: Projection.belongsTo('fd-storage-type', '', {

      }, { displayMemberPath: 'shortName' })
    })
  });
  modelClass.defineProjection('GetClassByGuid', 'fd-dev-class', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    stereotype: Projection.attr(''),
    caption: Projection.attr(''),
    attributesStr: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('LightStage', 'fd-dev-class', {
    generateCatcher: Projection.attr(''),
    generateComPlusServer: Projection.attr(''),
    generateHttpRemoteServer: Projection.attr(''),
    nameStr: Projection.attr(''),
    packet: Projection.attr(''),
    stereotype: Projection.attr('')
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      view: Projection.belongsTo('fd-dev-view', '', {
        name: Projection.attr(''),
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        }, { hidden: true })
      }, { hidden: true })
    })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-class', {
    referenceCount: Projection.attr('Reference count'),
    stereotype: Projection.attr('Stereotype'),
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    packet: Projection.attr('Packet'),
    namespacePostfix: Projection.attr('Namespace postfix'),
    stage: Projection.belongsTo('fd-stage', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('LoadNameView', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    description: Projection.attr(''),
    caption: Projection.attr('')
  });
  modelClass.defineProjection('Prototyping', 'fd-dev-class', {
    stereotype: Projection.attr(''),
    nameStr: Projection.attr(''),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr(''),
      definition: Projection.attr('')
    })
  });
  modelClass.defineProjection('SearchAppClassAndEditContainers', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    caption: Projection.attr(''),
    containersStr: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('SearchClass', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    caption: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('SearchClassLoadView', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    caption: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      dataObjectTypesStr: Projection.attr(''),
      view: Projection.belongsTo('fd-dev-view', '', {
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        }),
        definition: Projection.attr('')
      }),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('SearchFormClassView', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    containersStr: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    })
  });
  modelClass.defineProjection('SearchListFormAndEditLink', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    caption: Projection.attr(''),
    dataObjectTypesStr: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    }),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      dataObjectTypesStr: Projection.attr(''),
      view: Projection.belongsTo('fd-dev-view', '', {
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr('')
        }),
        definition: Projection.attr('')
      }),
      class: Projection.belongsTo('fd-dev-class', '', {

      })
    })
  });
  modelClass.defineProjection('ViewPeeker', 'fd-dev-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    description: Projection.attr(''),
    views: Projection.hasMany('fd-dev-view', '', {
      name: Projection.attr('')
    })
  });

  /* merged manually start */
  modelClass.defineProjection('FormConstructor', 'fd-dev-class', {
    name: Projection.attr(''),
    caption: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {}),
    formViews: Projection.hasMany('fd-dev-form-view', '', {
      view: Projection.belongsTo('fd-dev-view', '', {
        name: Projection.attr(''),
        definition: Projection.attr(''),
        class: Projection.belongsTo('fd-dev-class', '', {
          name: Projection.attr(''),
          caption: Projection.attr(''),
          stage: Projection.belongsTo('fd-stage', '', {}),
          attributes: Projection.hasMany('fd-dev-attribute', '', {
            name: Projection.attr(''),
            caption: Projection.attr(''),
            type: Projection.attr(''),
            notNull: Projection.attr(''),
            defaultValue: Projection.attr(''),
            class: Projection.belongsTo('fd-dev-class', '', {}),
          }),
        })
      }),
    }),
  });

  modelClass.defineProjection('DataObjects', 'fd-dev-class', {
    name: Projection.attr(''),
    caption: Projection.attr(''),
    stereotype: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {}),
    attributes: Projection.hasMany('fd-dev-attribute', '', {
      name: Projection.attr(''),
      caption: Projection.attr(''),
      type: Projection.attr(''),
      notNull: Projection.attr(''),
      defaultValue: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {}),
    }),
  });
  /* merged manually end */
};
