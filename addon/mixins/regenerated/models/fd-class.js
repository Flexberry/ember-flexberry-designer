import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  /**
    Non-stored property.

    @property nameStr
  */
  nameStr: DS.attr('string', { defaultValue: 'Empty' }),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'nameStrCompute' method in model class (outside of this mixin) if you want to compute value of 'nameStr' property.

    @method _nameStrCompute
    @private
    @example
      ```javascript
      _nameStrChanged: Ember.on('init', Ember.observer('nameStr', function() {
        Ember.run.once(this, '_nameStrCompute');
      }))
      ```
  */
  _nameStrCompute: function() {
    let result = (this.nameStrCompute && typeof this.nameStrCompute === 'function') ? this.nameStrCompute() : null;
    this.set('nameStr', result);
  },
  attributesStr: DS.attr('string', { defaultValue: 'Empty' }),
  methodsStr: DS.attr('string', { defaultValue: 'Empty' }),
  stored: DS.attr('boolean', { defaultValue: true }),
  stereotype: DS.attr('string'),
  stage: DS.belongsTo('fd-stage', { inverse: 'classes', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
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
  modelClass.defineProjection('DependensiesSearchView', 'fd-class', {
    name: Projection.attr(''),
    stereotype: Projection.attr(''),
    nameStr: Projection.attr('')
  });
  modelClass.defineProjection('Import', 'fd-class', {
    referenceCount: Projection.attr(''),
    nameStr: Projection.attr('')
  });
  modelClass.defineProjection('References', 'fd-class', {
    referenceCount: Projection.attr('')
  });
  modelClass.defineProjection('SearchClass', 'fd-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    })
  });
};
