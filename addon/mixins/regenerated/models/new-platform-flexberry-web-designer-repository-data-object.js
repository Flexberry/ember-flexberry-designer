import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  description: DS.attr('string'),
  /**
    Non-stored property.

    @property nameStr
  */
  nameStr: DS.attr('string'),
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
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Properties', 'new-platform-flexberry-web-designer-repository-data-object', {
    name: Projection.attr('Имя'),
    description: Projection.attr('Описание')
  });
  modelClass.defineProjection('UpdateApiView', 'new-platform-flexberry-web-designer-repository-data-object', {
    name: Projection.attr(''),
    description: Projection.attr('')
  });
};
