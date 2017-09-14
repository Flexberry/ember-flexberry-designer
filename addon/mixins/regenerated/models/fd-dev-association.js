import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
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
    description: Projection.attr(''),
    startRole: Projection.attr(''),
    startMultiplicity: Projection.attr(''),
    startRoleAccessModifier: Projection.attr(''),
    startRoleStored: Projection.attr(''),
    endRole: Projection.attr(''),
    endMultiplicity: Projection.attr(''),
    autoGenerateTypeUsage: Projection.attr(''),
    typeUsage: Projection.attr(''),
    storage: Projection.attr(''),
    autoStoreMasterDisabled: Projection.attr(''),
    pBMasterCustomAttributes: Projection.attr(''),
    pBMasterGetStart: Projection.attr(''),
    pBMasterGetEnd: Projection.attr(''),
    pBMasterSetStart: Projection.attr(''),
    pBMasterSetEnd: Projection.attr('')
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-association', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('FormDesigner', 'fd-dev-association', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    startRole: Projection.attr(''),
    startClass: Projection.belongsTo('fd-class', '', {
      name: Projection.attr(''),
      description: Projection.attr('')
    }),
    stage: Projection.belongsTo('fd-stage', '', {

    }),
    endClass: Projection.belongsTo('fd-class', '', {

    })
  });
  modelClass.defineProjection('Gen', 'fd-dev-association', {
    pBMasterCustomAttributes: Projection.attr(''),
    pBMasterGetEnd: Projection.attr(''),
    pBMasterGetStart: Projection.attr(''),
    storage: Projection.attr(''),
    autoStoreMasterDisabled: Projection.attr(''),
    typeUsage: Projection.attr(''),
    autoGenerateTypeUsage: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-association', {
    assocType: Projection.attr('AssocType', { hidden: true }),
    autoGenerateTypeUsage: Projection.attr('AutoGenerateTypeUsage', { hidden: true }),
    pBMasterCustomAttributes: Projection.attr('PBMasterCustomAttributes', { hidden: true }),
    pBMasterGetEnd: Projection.attr('PBMasterGetEnd', { hidden: true }),
    pBMasterSetEnd: Projection.attr('PBMasterSetEnd', { hidden: true }),
    pBMasterGetStart: Projection.attr('PBMasterGetStart', { hidden: true }),
    pBMasterSetStart: Projection.attr('PBMasterSetStart', { hidden: true }),
    realStorage: Projection.attr('RealStorage', { hidden: true }),
    typeUsage: Projection.attr('TypeUsage', { hidden: true }),
    autoStoreMasterDisabled: Projection.attr('AutoStoreMasterDisabled', { hidden: true }),
    realEndRole: Projection.attr('RealEndRole', { hidden: true }),
    realStartRole: Projection.attr('RealStartRole', { hidden: true }),
    storage: Projection.attr('Storage', { hidden: true }),
    endMultiplicity: Projection.attr('EndMultiplicity', { hidden: true }),
    endRole: Projection.attr('EndRole', { hidden: true }),
    endRoleAccessModifier: Projection.attr('EndRoleAccessModifier', { hidden: true }),
    endRoleStored: Projection.attr('EndRoleStored', { hidden: true }),
    endRoleStr: Projection.attr('EndRoleStr', { hidden: true }),
    notNullStart: Projection.attr('NotNullStart', { hidden: true }),
    startMultiplicity: Projection.attr('StartMultiplicity', { hidden: true }),
    startRole: Projection.attr('StartRole', { hidden: true }),
    startRoleAccessModifier: Projection.attr('StartRoleAccessModifier', { hidden: true }),
    startRoleStored: Projection.attr('StartRoleStored', { hidden: true }),
    startRoleStr: Projection.attr('StartRoleStr', { hidden: true }),
    referenceCount: Projection.attr('ReferenceCount', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true }),
    endClass: Projection.belongsTo('fd-class', 'EndClass', {

    }, { hidden: true }),
    startClass: Projection.belongsTo('fd-class', 'StartClass', {

    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-association', {
    referenceCount: Projection.attr('Reference count'),
    assocType: Projection.attr('Association type'),
    startClass: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('Start class')
    }, { hidden: true }),
    endClass: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('End class')
    }, { hidden: true }),
    startRole: Projection.attr('Start role'),
    endRole: Projection.attr('End role'),
    storage: Projection.attr('Storage')
  });
};
