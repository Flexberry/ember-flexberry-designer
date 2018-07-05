import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  accessModifier: DS.attr('s-t-o-r-m-c-a-s-e-repository-access-modifier'),
  autoincrement: DS.attr('boolean'),
  caption: DS.attr('string'),
  dataServiceExpression: DS.attr('string'),
  /**
    Non-stored property.

    @property dataServiceExpressionXML
  */
  dataServiceExpressionXML: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'dataServiceExpressionXMLCompute' method in model class (outside of this mixin) if you want to compute value of 'dataServiceExpressionXML' property.

    @method _dataServiceExpressionXMLCompute
    @private
    @example
      ```javascript
      _dataServiceExpressionXMLChanged: Ember.on('init', Ember.observer('dataServiceExpressionXML', function() {
        Ember.run.once(this, '_dataServiceExpressionXMLCompute');
      }))
      ```
  */
  _dataServiceExpressionXMLCompute: function() {
    let result = (this.dataServiceExpressionXMLCompute && typeof this.dataServiceExpressionXMLCompute === 'function') ?
      this.dataServiceExpressionXMLCompute() : null;
    this.set('dataServiceExpressionXML', result);
  },
  defaultValue: DS.attr('string'),
  hint: DS.attr('string'),
  notNull: DS.attr('boolean'),
  order: DS.attr('boolean'),
  orderNum: DS.attr('number'),
  pBCustomAttributes: DS.attr('boolean'),
  pBGetEnd: DS.attr('boolean'),
  pBSetEnd: DS.attr('boolean'),
  pBGetStart: DS.attr('boolean'),
  pBSetStart: DS.attr('boolean'),
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
  storage: DS.attr('string'),
  publishName: DS.attr('string'),
  stored: DS.attr('boolean'),
  trim: DS.attr('boolean'),
  type: DS.attr('string'),
  class: DS.belongsTo('fd-dev-class', { inverse: 'attributes', async: false }),
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
  modelClass.defineProjection('AuditPrototyping', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditApplication', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditEnum', 'fd-dev-attribute', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    defaultValue: Projection.attr(''),
    caption: Projection.attr('')
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-attribute', {
    name: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditType', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('FdClassEditForm', 'fd-dev-attribute', {
    name: Projection.attr('Имя'),
    caption: Projection.attr('Заголовок'),
    type: Projection.attr('Тип'),
    description: Projection.attr('Описание'),
    class: Projection.belongsTo('fd-dev-class', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('FormDesigner', 'fd-dev-attribute', {
    name: Projection.attr(''),
    type: Projection.attr(''),
    caption: Projection.attr(''),
    description: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-attribute', {
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
  });
  modelClass.defineProjection('SearchAttribute', 'fd-dev-attribute', {
    name: Projection.attr(''),
    type: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-attribute', {
    name: Projection.attr(''),
    type: Projection.attr(''),
    notNull: Projection.attr(''),
    defaultValue: Projection.attr(''),
    description: Projection.attr('')
  });
};
