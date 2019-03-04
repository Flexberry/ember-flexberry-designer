import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
import AccessModifierEnum from '../../../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';
export let Model = Ember.Mixin.create({
  endMultiplicity: DS.attr('string', { defaultValue: 'Empty' }),
  endRole: DS.attr('string', { defaultValue: 'Empty' }),
  endRoleAccessModifier: DS.attr('s-t-o-r-m-c-a-s-e-repository-access-modifier', { defaultValue: AccessModifierEnum.Public }),
  endRoleStored: DS.attr('boolean', { defaultValue: true }),
  /**
    Non-stored property.

    @property endRoleStr
  */
  endRoleStr: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'endRoleStrCompute' method in model class (outside of this mixin) if you want to compute value of 'endRoleStr' property.

    @method _endRoleStrCompute
    @private
    @example
      ```javascript
      _endRoleStrChanged: Ember.on('init', Ember.observer('endRoleStr', function() {
        Ember.run.once(this, '_endRoleStrCompute');
      }))
      ```
  */
  _endRoleStrCompute: function() {
    let result = (this.endRoleStrCompute && typeof this.endRoleStrCompute === 'function') ? this.endRoleStrCompute() : null;
    this.set('endRoleStr', result);
  },
  /**
    Non-stored property.

    @property notNullStart
  */
  notNullStart: DS.attr('boolean'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'notNullStartCompute' method in model class (outside of this mixin) if you want to compute value of 'notNullStart' property.

    @method _notNullStartCompute
    @private
    @example
      ```javascript
      _notNullStartChanged: Ember.on('init', Ember.observer('notNullStart', function() {
        Ember.run.once(this, '_notNullStartCompute');
      }))
      ```
  */
  _notNullStartCompute: function() {
    let result = (this.notNullStartCompute && typeof this.notNullStartCompute === 'function') ? this.notNullStartCompute() : null;
    this.set('notNullStart', result);
  },
  startMultiplicity: DS.attr('string', { defaultValue: 'Empty' }),
  startRole: DS.attr('string', { defaultValue: 'Empty' }),
  startRoleAccessModifier: DS.attr('s-t-o-r-m-c-a-s-e-repository-access-modifier', { defaultValue: AccessModifierEnum.Public }),
  startRoleStored: DS.attr('boolean', { defaultValue: true }),
  /**
    Non-stored property.

    @property startRoleStr
  */
  startRoleStr: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'startRoleStrCompute' method in model class (outside of this mixin) if you want to compute value of 'startRoleStr' property.

    @method _startRoleStrCompute
    @private
    @example
      ```javascript
      _startRoleStrChanged: Ember.on('init', Ember.observer('startRoleStr', function() {
        Ember.run.once(this, '_startRoleStrCompute');
      }))
      ```
  */
  _startRoleStrCompute: function() {
    let result = (this.startRoleStrCompute && typeof this.startRoleStrCompute === 'function') ? this.startRoleStrCompute() : null;
    this.set('startRoleStr', result);
  },
  endClass: DS.belongsTo('fd-class', { inverse: null, async: false, polymorphic: true }),
  startClass: DS.belongsTo('fd-class', { inverse: null, async: false, polymorphic: true }),
  stage: DS.belongsTo('fd-stage', { inverse: 'associations', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      endClass: { presence: true },
      startClass: { presence: true },
      stage: { presence: true }
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
    _parentModelName: 'fd-repository-ref-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Import', 'fd-base-association', {
    startRole: attr(''),
    endRole: attr(''),
    referenceCount: attr(''),
    startClass: belongsTo('fd-class', '', {

    }),
    endClass: belongsTo('fd-class', '', {

    })
  });
  modelClass.defineProjection('PropertySearch', 'fd-base-association', {
    startRole: attr(''),
    endRole: attr(''),
    startClass: belongsTo('fd-class', '', {
      nameStr: attr('')
    }),
    endClass: belongsTo('fd-class', '', {

    })
  });
  modelClass.defineProjection('References', 'fd-base-association', {
    referenceCount: attr('')
  });
};
