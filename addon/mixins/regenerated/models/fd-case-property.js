import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  /**
    Non-stored property.

    @property name
  */
  name: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'nameCompute' method in model class (outside of this mixin) if you want to compute value of 'name' property.

    @method _nameCompute
    @private
    @example
      ```javascript
      _nameChanged: Ember.on('init', Ember.observer('name', function() {
        Ember.run.once(this, '_nameCompute');
      }))
      ```
  */
  _nameCompute: function() {
    let result = (this.nameCompute && typeof this.nameCompute === 'function') ? this.nameCompute() : null;
    this.set('name', result);
  },
  value: DS.attr('string'),
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
