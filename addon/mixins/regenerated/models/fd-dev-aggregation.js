import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Mixin.create({
  /**
    Non-stored property.

    @property assocType
  */
  assocType: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'assocTypeCompute' method in model class (outside of this mixin) if you want to compute value of 'assocType' property.

    @method _assocTypeCompute
    @private
    @example
      ```javascript
      _assocTypeChanged: Ember.on('init', Ember.observer('assocType', function() {
        Ember.run.once(this, '_assocTypeCompute');
      }))
      ```
  */
  _assocTypeCompute: function() {
    let result = (this.assocTypeCompute && typeof this.assocTypeCompute === 'function') ? this.assocTypeCompute() : null;
    this.set('assocType', result);
  },
  autoGenerateDetailTypeUsage: DS.attr('boolean'),
  autoGenerateTypeUsage: DS.attr('boolean'),
  detailTypeUsage: DS.attr('string'),
  pBAggregatorCustomAttributes: DS.attr('boolean'),
  pBAggregatorGetEnd: DS.attr('boolean'),
  pBAggregatorGetStart: DS.attr('boolean'),
  pBAggregatorSetEnd: DS.attr('boolean'),
  pBAggregatorSetStart: DS.attr('boolean'),
  pBDetailCustomAttributes: DS.attr('boolean'),
  pBDetailGetEnd: DS.attr('boolean'),
  pBDetailGetStart: DS.attr('boolean'),
  pBDetailSetEnd: DS.attr('boolean'),
  pBDetailSetStart: DS.attr('boolean'),
  pBMasterCustomAttributes: DS.attr('boolean'),
  pBMasterGetEnd: DS.attr('boolean'),
  pBMasterGetStart: DS.attr('boolean'),
  pBMasterSetEnd: DS.attr('boolean'),
  pBMasterSetStart: DS.attr('boolean'),
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
  typeUsage: DS.attr('string'),
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
    _parentModelName: 'fd-dev-base-association'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'fd-dev-aggregation', {
    description: attr(''),
    startRole: attr(''),
    startRolePublishName: attr(''),
    endRole: attr(''),
    endRolePublishName: attr(''),
    startMultiplicity: attr(''),
    endRoleStored: attr(''),
    autoGenerateTypeUsage: attr('Aggregator AutoGenerateTypeUsage'),
    typeUsage: attr('Aggregator TypeUsage'),
    storage: attr('Aggregator Storage'),
    autoStoreMasterDisabled: attr(''),
    autoGenerateDetailTypeUsage: attr('Detail AutoGenerateTypeUsage'),
    detailTypeUsage: attr(''),
    pBAggregatorCustomAttributes: attr(''),
    pBAggregatorGetStart: attr(''),
    pBAggregatorGetEnd: attr(''),
    pBAggregatorSetStart: attr(''),
    pBAggregatorSetEnd: attr(''),
    pBDetailCustomAttributes: attr(''),
    pBDetailGetStart: attr(''),
    pBDetailGetEnd: attr(''),
    pBDetailSetStart: attr(''),
    pBDetailSetEnd: attr('')
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-aggregation', {
    autoGenerateDetailTypeUsage: attr(''),
    autoGenerateTypeUsage: attr(''),
    detailTypeUsage: attr(''),
    pBAggregatorCustomAttributes: attr(''),
    pBAggregatorGetEnd: attr(''),
    pBAggregatorGetStart: attr(''),
    pBAggregatorSetEnd: attr(''),
    pBAggregatorSetStart: attr(''),
    pBDetailCustomAttributes: attr(''),
    pBDetailGetEnd: attr(''),
    pBDetailGetStart: attr(''),
    pBDetailSetEnd: attr(''),
    pBDetailSetStart: attr(''),
    pBMasterCustomAttributes: attr(''),
    pBMasterGetEnd: attr(''),
    pBMasterGetStart: attr(''),
    pBMasterSetEnd: attr(''),
    pBMasterSetStart: attr(''),
    typeUsage: attr(''),
    autoStoreMasterDisabled: attr(''),
    storage: attr(''),
    startRolePublishName: attr(''),
    endRolePublishName: attr(''),
    endMultiplicity: attr(''),
    endRole: attr(''),
    endRoleAccessModifier: attr(''),
    endRoleStored: attr(''),
    startMultiplicity: attr(''),
    startRole: attr(''),
    startRoleAccessModifier: attr(''),
    referenceCount: attr(''),
    name: attr(''),
    description: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr('')
    }),
    endClass: belongsTo('fd-class', '', {
      name: attr('')
    }),
    startClass: belongsTo('fd-class', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('Gen', 'fd-dev-aggregation', {
    pBAggregatorCustomAttributes: attr(''),
    pBAggregatorGetEnd: attr(''),
    pBAggregatorGetStart: attr(''),
    pBAggregatorSetEnd: attr(''),
    pBAggregatorSetStart: attr(''),
    pBDetailCustomAttributes: attr(''),
    pBDetailGetEnd: attr(''),
    pBDetailGetStart: attr(''),
    pBDetailSetEnd: attr(''),
    pBDetailSetStart: attr(''),
    pBMasterCustomAttributes: attr(''),
    pBMasterGetEnd: attr(''),
    pBMasterGetStart: attr(''),
    pBMasterSetEnd: attr(''),
    pBMasterSetStart: attr(''),
    storage: attr(''),
    autoStoreMasterDisabled: attr(''),
    typeUsage: attr(''),
    autoGenerateTypeUsage: attr(''),
    autoGenerateDetailTypeUsage: attr(''),
    description: attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-aggregation', {
    assocType: attr('AssocType', { hidden: true }),
    autoGenerateDetailTypeUsage: attr('AutoGenerateDetailTypeUsage', { hidden: true }),
    autoGenerateTypeUsage: attr('AutoGenerateTypeUsage', { hidden: true }),
    detailTypeUsage: attr('DetailTypeUsage', { hidden: true }),
    pBAggregatorCustomAttributes: attr('PBAggregatorCustomAttributes', { hidden: true }),
    pBAggregatorGetEnd: attr('PBAggregatorGetEnd', { hidden: true }),
    pBAggregatorGetStart: attr('PBAggregatorGetStart', { hidden: true }),
    pBAggregatorSetEnd: attr('PBAggregatorSetEnd', { hidden: true }),
    pBAggregatorSetStart: attr('PBAggregatorSetStart', { hidden: true }),
    pBDetailCustomAttributes: attr('PBDetailCustomAttributes', { hidden: true }),
    pBDetailGetEnd: attr('PBDetailGetEnd', { hidden: true }),
    pBDetailGetStart: attr('PBDetailGetStart', { hidden: true }),
    pBDetailSetEnd: attr('PBDetailSetEnd', { hidden: true }),
    pBDetailSetStart: attr('PBDetailSetStart', { hidden: true }),
    pBMasterCustomAttributes: attr('PBMasterCustomAttributes', { hidden: true }),
    pBMasterGetEnd: attr('PBMasterGetEnd', { hidden: true }),
    pBMasterGetStart: attr('PBMasterGetStart', { hidden: true }),
    pBMasterSetEnd: attr('PBMasterSetEnd', { hidden: true }),
    pBMasterSetStart: attr('PBMasterSetStart', { hidden: true }),
    realStorage: attr('RealStorage', { hidden: true }),
    typeUsage: attr('TypeUsage', { hidden: true }),
    autoStoreMasterDisabled: attr('AutoStoreMasterDisabled', { hidden: true }),
    realEndRole: attr('RealEndRole', { hidden: true }),
    realStartRole: attr('RealStartRole', { hidden: true }),
    storage: attr('Storage', { hidden: true }),
    startRolePublishName: attr('StartRolePublishName', { hidden: true }),
    endRolePublishName: attr('EndRolePublishName', { hidden: true }),
    endMultiplicity: attr('EndMultiplicity', { hidden: true }),
    endRole: attr('EndRole', { hidden: true }),
    endRoleAccessModifier: attr('EndRoleAccessModifier', { hidden: true }),
    endRoleStored: attr('EndRoleStored', { hidden: true }),
    endRoleStr: attr('EndRoleStr', { hidden: true }),
    notNullStart: attr('NotNullStart', { hidden: true }),
    startMultiplicity: attr('StartMultiplicity', { hidden: true }),
    startRole: attr('StartRole', { hidden: true }),
    startRoleAccessModifier: attr('StartRoleAccessModifier', { hidden: true }),
    startRoleStored: attr('StartRoleStored', { hidden: true }),
    startRoleStr: attr('StartRoleStr', { hidden: true }),
    referenceCount: attr('ReferenceCount', { hidden: true }),
    name: attr('Name', { hidden: true }),
    description: attr('Description', { hidden: true }),
    nameStr: attr('NameStr', { hidden: true }),
    endClass: belongsTo('fd-class', 'EndClass', {

    }, { hidden: true }),
    startClass: belongsTo('fd-class', 'StartClass', {

    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-aggregation', {
    startClass: belongsTo('fd-class', '', {
      name: attr('Start class')
    }, { hidden: true }),
    endClass: belongsTo('fd-class', '', {
      name: attr('End class')
    }, { hidden: true }),
    startRole: attr('Start role'),
    endRole: attr('End role'),
    storage: attr('Storage')
  });
};
