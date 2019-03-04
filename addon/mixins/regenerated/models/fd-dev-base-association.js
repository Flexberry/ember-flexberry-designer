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
  autoStoreMasterDisabled: DS.attr('boolean'),
  /**
    Non-stored property.

    @property realEndRole
  */
  realEndRole: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realEndRoleCompute' method in model class (outside of this mixin) if you want to compute value of 'realEndRole' property.

    @method _realEndRoleCompute
    @private
    @example
      ```javascript
      _realEndRoleChanged: Ember.on('init', Ember.observer('realEndRole', function() {
        Ember.run.once(this, '_realEndRoleCompute');
      }))
      ```
  */
  _realEndRoleCompute: function() {
    let result = (this.realEndRoleCompute && typeof this.realEndRoleCompute === 'function') ? this.realEndRoleCompute() : null;
    this.set('realEndRole', result);
  },
  /**
    Non-stored property.

    @property realStartRole
  */
  realStartRole: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'realStartRoleCompute' method in model class (outside of this mixin) if you want to compute value of 'realStartRole' property.

    @method _realStartRoleCompute
    @private
    @example
      ```javascript
      _realStartRoleChanged: Ember.on('init', Ember.observer('realStartRole', function() {
        Ember.run.once(this, '_realStartRoleCompute');
      }))
      ```
  */
  _realStartRoleCompute: function() {
    let result = (this.realStartRoleCompute && typeof this.realStartRoleCompute === 'function') ? this.realStartRoleCompute() : null;
    this.set('realStartRole', result);
  },
  storage: DS.attr('string'),
  startRolePublishName: DS.attr('string'),
  endRolePublishName: DS.attr('string'),
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
    _parentModelName: 'fd-base-association'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AssocList', 'fd-dev-base-association', {
    referenceCount: attr('Количество упоминаний'),
    assocType: attr('Тип связи'),
    startClass: belongsTo('fd-class', '', {
      nameStr: attr('Начальный класс')
    }, { hidden: true }),
    endClass: belongsTo('fd-class', '', {
      nameStr: attr('Конечный класс')
    }, { hidden: true }),
    startRole: attr('Начальная роль'),
    endRole: attr('Конечная роль'),
    stage: belongsTo('fd-stage', '', {
      name: attr('', { hidden: true })
    }, { hidden: true }),
    storage: attr('Хранилище')
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-base-association', {
    assocType: attr('AssocType', { hidden: true }),
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
  modelClass.defineProjection('Generator', 'fd-dev-base-association', {
    assocType: attr('AssocType', { hidden: true }),
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
};
