import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  accessModifier: DS.attr('s-t-o-r-m-c-a-s-e-repository-access-modifier'),
  accessType: DS.attr('i-c-s-soft-s-t-o-r-m-n-e-t-access-type'),
  caption: DS.attr('string'),
  isEvent: DS.attr('boolean'),
  orderNum: DS.attr('number'),
  /**
    Non-stored property.

    @property parametersStr
  */
  parametersStr: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'parametersStrCompute' method in model class (outside of this mixin) if you want to compute value of 'parametersStr' property.

    @method _parametersStrCompute
    @private
    @example
      ```javascript
      _parametersStrChanged: Ember.on('init', Ember.observer('parametersStr', function() {
        Ember.run.once(this, '_parametersStrCompute');
      }))
      ```
  */
  _parametersStrCompute: function() {
    let result = (this.parametersStrCompute && typeof this.parametersStrCompute === 'function') ? this.parametersStrCompute() : null;
    this.set('parametersStr', result);
  },
  pBCustomAttributes: DS.attr('boolean'),
  publishToUser: DS.attr('boolean'),
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
  type: DS.attr('string'),
  /**
    Non-stored property.

    @property typeParametersStr
  */
  typeParametersStr: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeParametersStrCompute' method in model class (outside of this mixin) if you want to compute value of 'typeParametersStr' property.

    @method _typeParametersStrCompute
    @private
    @example
      ```javascript
      _typeParametersStrChanged: Ember.on('init', Ember.observer('typeParametersStr', function() {
        Ember.run.once(this, '_typeParametersStrCompute');
      }))
      ```
  */
  _typeParametersStrCompute: function() {
    let result = (this.typeParametersStrCompute && typeof this.typeParametersStrCompute === 'function') ? this.typeParametersStrCompute() : null;
    this.set('typeParametersStr', result);
  },
  class: DS.belongsTo('fd-dev-class', { inverse: 'methods', async: false }),
  parameters: DS.hasMany('fd-dev-parameter', { inverse: 'method', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      class: { presence: true }
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
    _parentModelName: 'fd-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AddOperations', 'fd-dev-method', {
    name: Projection.attr(''),
    parametersStr: Projection.attr(''),
    accessType: Projection.attr('')
  });
  modelClass.defineProjection('EditApplication', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditBusinessServer', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditType', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-method', {
    accessModifier: Projection.attr(''),
    type: Projection.attr(''),
    name: Projection.attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-method', {
    accessModifier: Projection.attr(''),
    type: Projection.attr(''),
    name: Projection.attr(''),
  });
};
