import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
  attributesStr: DS.attr('string'),
  methodsStr: DS.attr('string'),
  stored: DS.attr('boolean'),
  stereotype: DS.attr('string'),
  stage: DS.belongsTo('new-platform-flexberry-web-designer-stage', { inverse: 'classes', async: false, polymorphic: true }),
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-ref-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DependensiesSearchView', 'new-platform-flexberry-web-designer-class', {
    name: Projection.attr(''),
    stereotype: Projection.attr(''),
    nameStr: Projection.attr('')
  });
  modelClass.defineProjection('Import', 'new-platform-flexberry-web-designer-class', {
    referenceCount: Projection.attr(''),
    nameStr: Projection.attr('')
  });
  modelClass.defineProjection('References', 'new-platform-flexberry-web-designer-class', {
    referenceCount: Projection.attr('')
  });
  modelClass.defineProjection('SearchClass', 'new-platform-flexberry-web-designer-class', {
    name: Projection.attr(''),
    nameStr: Projection.attr(''),
    stereotype: Projection.attr(''),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {

    })
  });
};
