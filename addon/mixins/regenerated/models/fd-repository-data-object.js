import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Properties', 'fd-repository-data-object', {
    name: attr('Имя'),
    description: attr('Описание')
  });
  modelClass.defineProjection('UpdateApiView', 'fd-repository-data-object', {
    name: attr(''),
    description: attr('')
  });
};
