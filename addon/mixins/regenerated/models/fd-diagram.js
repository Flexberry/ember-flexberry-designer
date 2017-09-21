import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  caseObjectsString: DS.attr('string'),
  /**
    Non-stored property.

    @property primitivesStream
  */
  primitivesStream: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'primitivesStreamCompute' method in model class (outside of this mixin) if you want to compute value of 'primitivesStream' property.

    @method _primitivesStreamCompute
    @private
    @example
      ```javascript
      _primitivesStreamChanged: Ember.on('init', Ember.observer('primitivesStream', function() {
        Ember.run.once(this, '_primitivesStreamCompute');
      }))
      ```
  */
  _primitivesStreamCompute: function() {
    let result = (this.primitivesStreamCompute && typeof this.primitivesStreamCompute === 'function') ? this.primitivesStreamCompute() : null;
    this.set('primitivesStream', result);
  },
  primitivesStreamString: DS.attr('string'),
  elements: DS.attr('string'),
  subsystem: DS.belongsTo('fd-subsystem', { inverse: 'diagrams', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      subsystem: { presence: true }
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
    _parentModelName: 'fd-object-in-system'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Diagram', 'fd-diagram', {
    primitivesStreamString: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    name: Projection.attr(''),
    createDate: Projection.attr(''),
    createUser: Projection.attr(''),
    changeDate: Projection.attr(''),
    changeUser: Projection.attr('')
  });
  modelClass.defineProjection('DiagramWithStage', 'fd-diagram', {
    primitivesStreamString: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    name: Projection.attr(''),
    createDate: Projection.attr(''),
    createUser: Projection.attr(''),
    changeDate: Projection.attr(''),
    changeUser: Projection.attr('')
  });
  modelClass.defineProjection('DiagramWithSystem', 'fd-diagram', {
    primitivesStreamString: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    name: Projection.attr(''),
    createDate: Projection.attr(''),
    createUser: Projection.attr(''),
    changeDate: Projection.attr(''),
    changeUser: Projection.attr('')
  });
  modelClass.defineProjection('ExportToWmf', 'fd-diagram', {
    name: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('SearchSystem', 'fd-diagram', {
    name: Projection.attr('')
  });
};
