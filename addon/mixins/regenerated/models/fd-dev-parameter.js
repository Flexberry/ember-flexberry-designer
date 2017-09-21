import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  caption: DS.attr('string'),
  modifier: DS.attr('s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier'),
  orderNum: DS.attr('number'),
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
  method: DS.belongsTo('fd-dev-method', { inverse: 'parameters', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      method: { presence: true }
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
  modelClass.defineProjection('EditApplication', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditEditForm', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditInterface', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditType', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('EditUserForm', 'fd-dev-parameter', {
    name: Projection.attr(''),
    modifier: Projection.attr(''),
    type: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-parameter', {
    caption: Projection.attr('Caption', { hidden: true }),
    modifier: Projection.attr('Modifier', { hidden: true }),
    orderNum: Projection.attr('OrderNum', { hidden: true }),
    realCaption: Projection.attr('RealCaption', { hidden: true }),
    type: Projection.attr('Type', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true })
  });
};
