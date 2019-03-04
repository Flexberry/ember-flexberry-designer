import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
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
  autoGenerateTypeUsage: DS.attr('boolean'),
  pBMasterCustomAttributes: DS.attr('boolean'),
  pBMasterGetEnd: DS.attr('boolean'),
  pBMasterSetEnd: DS.attr('boolean'),
  pBMasterGetStart: DS.attr('boolean'),
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
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});

export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-dev-base-association'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'fd-dev-association', {
    description: attr(''),
    startRole: attr(''),
    startRolePublishName: attr(''),
    startMultiplicity: attr(''),
    startRoleAccessModifier: attr(''),
    startRoleStored: attr(''),
    endRole: attr(''),
    endRolePublishName: attr(''),
    endMultiplicity: attr(''),
    autoGenerateTypeUsage: attr(''),
    typeUsage: attr(''),
    storage: attr(''),
    autoStoreMasterDisabled: attr(''),
    pBMasterCustomAttributes: attr(''),
    pBMasterGetStart: attr(''),
    pBMasterGetEnd: attr(''),
    pBMasterSetStart: attr(''),
    pBMasterSetEnd: attr('')
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-association', {
    name: attr('Name'),
    description: attr('Description')
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-association', {
    assocType: attr(''),
    autoGenerateTypeUsage: attr(''),
    pBMasterCustomAttributes: attr(''),
    pBMasterGetEnd: attr(''),
    pBMasterSetEnd: attr(''),
    pBMasterGetStart: attr(''),
    pBMasterSetStart: attr(''),
    realStorage: attr(''),
    typeUsage: attr(''),
    autoStoreMasterDisabled: attr(''),
    realEndRole: attr(''),
    realStartRole: attr(''),
    storage: attr(''),
    startRolePublishName: attr(''),
    endRolePublishName: attr(''),
    endMultiplicity: attr(''),
    endRole: attr(''),
    endRoleAccessModifier: attr(''),
    endRoleStored: attr(''),
    endRoleStr: attr(''),
    notNullStart: attr(''),
    startMultiplicity: attr(''),
    startRole: attr(''),
    startRoleAccessModifier: attr(''),
    startRoleStored: attr(''),
    startRoleStr: attr(''),
    referenceCount: attr(''),
    name: attr(''),
    description: attr(''),
    nameStr: attr(''),
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
  modelClass.defineProjection('FormDesigner', 'fd-dev-association', {
    name: attr(''),
    description: attr(''),
    startRole: attr(''),
    startClass: belongsTo('fd-class', '', {
      name: attr(''),
      description: attr('')
    }),
    stage: belongsTo('fd-stage', '', {

    }),
    endClass: belongsTo('fd-class', '', {

    })
  });
  modelClass.defineProjection('Gen', 'fd-dev-association', {
    pBMasterCustomAttributes: attr(''),
    pBMasterGetEnd: attr(''),
    pBMasterGetStart: attr(''),
    storage: attr(''),
    autoStoreMasterDisabled: attr(''),
    typeUsage: attr(''),
    autoGenerateTypeUsage: attr(''),
    description: attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-association', {
    assocType: attr('AssocType', { hidden: true }),
    autoGenerateTypeUsage: attr('AutoGenerateTypeUsage', { hidden: true }),
    pBMasterCustomAttributes: attr('PBMasterCustomAttributes', { hidden: true }),
    pBMasterGetEnd: attr('PBMasterGetEnd', { hidden: true }),
    pBMasterSetEnd: attr('PBMasterSetEnd', { hidden: true }),
    pBMasterGetStart: attr('PBMasterGetStart', { hidden: true }),
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
  modelClass.defineProjection('ListFormView', 'fd-dev-association', {
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
