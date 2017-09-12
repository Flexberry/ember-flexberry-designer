import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  pluginObject: DS.attr('string'),
  name: DS.attr('string'),
  storedType: DS.attr('string'),
  /**
    Non-stored property.

    @property type
  */
  type: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'typeCompute' method in model class (outside of this mixin) if you want to compute value of 'type' property.

    @method _typeCompute
    @private
    @example
      ```javascript
      _typeChanged: Ember.on('init', Ember.observer('type', function() {
        Ember.run.once(this, '_typeCompute');
      }))
      ```
  */
  _typeCompute: function() {
    let result = (this.typeCompute && typeof this.typeCompute === 'function') ? this.typeCompute() : null;
    this.set('type', result);
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
