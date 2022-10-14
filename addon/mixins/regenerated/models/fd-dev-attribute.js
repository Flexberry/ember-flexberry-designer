import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
  modelClass.defineProjection('AuditPrototyping', 'fd-dev-attribute', {
    accessModifier: attr(''),
    stored: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    notNull: attr(''),
    dataServiceExpressionXML: attr('DataService Expression'),
    order: attr(''),
    storage: attr(''),
    trim: attr('')
  });
  modelClass.defineProjection('EditApplication', 'fd-dev-attribute', {
    accessModifier: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr('')
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-attribute', {
    accessModifier: attr(''),
    stored: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    notNull: attr(''),
    dataServiceExpressionXML: attr('DataService Expression'),
    storage: attr(''),
    publishName: attr(''),
    hint: attr(''),
    order: attr(''),
    trim: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr(''),
    autoincrement: attr('')
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-attribute', {
    accessModifier: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr('')
  });
  modelClass.defineProjection('EditEnum', 'fd-dev-attribute', {
    name: attr(''),
    description: attr(''),
    defaultValue: attr(''),
    caption: attr('')
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-attribute', {
    name: attr(''),
    type: attr(''),
    description: attr('')
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-attribute', {
    accessModifier: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr('')
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-attribute', {
    accessModifier: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr('')
  });
  modelClass.defineProjection('EditType', 'fd-dev-attribute', {
    accessModifier: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr('')
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-attribute', {
    accessModifier: attr(''),
    name: attr(''),
    description: attr(''),
    type: attr(''),
    defaultValue: attr(''),
    pBCustomAttributes: attr(''),
    pBGetEnd: attr(''),
    pBGetStart: attr(''),
    pBSetEnd: attr(''),
    pBSetStart: attr('')
  });
  modelClass.defineProjection('FdClassEditForm', 'fd-dev-attribute', {
    name: attr('Имя'),
    caption: attr('Заголовок'),
    type: attr('Тип'),
    description: attr('Описание'),
    class: belongsTo('fd-dev-class', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-attribute', {
    name: attr(''),
    type: attr(''),
    notNull: attr(''),
    defaultValue: attr(''),
    description: attr(''),
    accessModifier: attr(''),
    stored: attr(''),
    caption: attr(''),
    dataServiceExpression: attr('')
  });
  modelClass.defineProjection('FormDesigner', 'fd-dev-attribute', {
    name: attr(''),
    type: attr(''),
    caption: attr(''),
    description: attr(''),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-attribute', {
    accessModifier: attr('AccessModifier', { hidden: true }),
    autoincrement: attr('Autoincrement', { hidden: true }),
    caption: attr('Caption', { hidden: true }),
    dataServiceExpression: attr('DataServiceExpression', { hidden: true }),
    dataServiceExpressionXML: attr('DataServiceExpressionXML', { hidden: true }),
    defaultValue: attr('DefaultValue', { hidden: true }),
    hint: attr('Hint', { hidden: true }),
    notNull: attr('NotNull', { hidden: true }),
    order: attr('Order', { hidden: true }),
    orderNum: attr('OrderNum', { hidden: true }),
    pBCustomAttributes: attr('PBCustomAttributes', { hidden: true }),
    pBGetEnd: attr('PBGetEnd', { hidden: true }),
    pBSetEnd: attr('PBSetEnd', { hidden: true }),
    pBGetStart: attr('PBGetStart', { hidden: true }),
    pBSetStart: attr('PBSetStart', { hidden: true }),
    realCaption: attr('RealCaption', { hidden: true }),
    realStorage: attr('RealStorage', { hidden: true }),
    storage: attr('Storage', { hidden: true }),
    publishName: attr('PublishName', { hidden: true }),
    stored: attr('Stored', { hidden: true }),
    trim: attr('Trim', { hidden: true }),
    type: attr('Type', { hidden: true }),
    name: attr('Name', { hidden: true }),
    description: attr('Description', { hidden: true }),
    nameStr: attr('NameStr', { hidden: true })
  });
  modelClass.defineProjection('SearchAttribute', 'fd-dev-attribute', {
    name: attr(''),
    type: attr(''),
    class: belongsTo('fd-dev-class', '', {

    })
  });
};
