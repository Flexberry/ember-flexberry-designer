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
    _parentModelName: 'new-platform-flexberry-web-designer-base-association'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AssocList', 'new-platform-flexberry-web-designer-dev-base-association', {
    referenceCount: Projection.attr('Количество упоминаний'),
    assocType: Projection.attr('Тип связи'),
    startClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      nameStr: Projection.attr('Начальный класс')
    }, { hidden: true }),
    endClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      nameStr: Projection.attr('Конечный класс')
    }, { hidden: true }),
    startRole: Projection.attr('Начальная роль'),
    endRole: Projection.attr('Конечная роль'),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {
      name: Projection.attr('', { hidden: true })
    }, { hidden: true }),
    storage: Projection.attr('Хранилище')
  });
  modelClass.defineProjection('EditPropertyLookups', 'new-platform-flexberry-web-designer-dev-base-association', {
    assocType: Projection.attr('AssocType', { hidden: true }),
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
    endClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'EndClass', {

    }, { hidden: true }),
    startClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'StartClass', {

    }, { hidden: true })
  });
  modelClass.defineProjection('Generator', 'new-platform-flexberry-web-designer-dev-base-association', {
    assocType: Projection.attr('AssocType', { hidden: true }),
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
    endClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'EndClass', {

    }, { hidden: true }),
    startClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'StartClass', {

    }, { hidden: true })
  });
};
