import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AddOperations', 'fd-dev-method', {
    name: attr(''),
    parametersStr: attr(''),
    accessType: attr('')
  });
  modelClass.defineProjection('EditApplication', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditBusinessServer', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditType', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-method', {
    accessModifier: attr(''),
    type: attr(''),
    name: attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-method', {
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
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-method', {
    accessModifier: attr(''),
    type: attr(''),
    name: attr(''),
  });
};
