import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  caseObjectsString: DS.attr('string', { defaultValue: 'Empty' }),
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
  primitivesStreamString: DS.attr('string', { defaultValue: 'Empty' }),
  /**
    Non-stored property.

    @property primitivesJsonString
  */
  primitivesJsonString: DS.attr('string', { defaultValue: 'Empty' }),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'primitivesJsonStringCompute' method in model class (outside of this mixin) if you want to compute value of 'primitivesJsonString' property.

    @method _primitivesJsonStringCompute
    @private
    @example
      ```javascript
      _primitivesJsonStringChanged: Ember.on('init', Ember.observer('primitivesJsonString', function() {
        Ember.run.once(this, '_primitivesJsonStringCompute');
      }))
      ```
  */
  _primitivesJsonStringCompute: function() {
    let result = (this.primitivesJsonStringCompute && typeof this.primitivesJsonStringCompute === 'function') ? this.primitivesJsonStringCompute() : null;
    this.set('primitivesJsonString', result);
  },
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
    changeUser: Projection.attr(''),
    subsystem: Projection.belongsTo('fd-subsystem', '', {
      stage: Projection.belongsTo('fd-stage', '', {

      })
    }, { hidden: true })
  });
  modelClass.defineProjection('DiagramWithSystem', 'fd-diagram', {
    primitivesStreamString: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    name: Projection.attr(''),
    createDate: Projection.attr(''),
    createUser: Projection.attr(''),
    changeDate: Projection.attr(''),
    changeUser: Projection.attr(''),
    subsystem: Projection.belongsTo('fd-subsystem', '', {

    })
  });
  modelClass.defineProjection('ExportToWmf', 'fd-diagram', {
    name: Projection.attr(''),
    description: Projection.attr('')
  });
  modelClass.defineProjection('FdDiagram', 'fd-diagram', {
    name: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    primitivesStreamString: Projection.attr(''),
    primitivesJsonString: Projection.attr('')
  });
  modelClass.defineProjection('FdDiagramE', 'fd-diagram', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('FdDiagramL', 'fd-diagram', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    changeUser: Projection.attr('Change user'),
    changeDate: Projection.attr('Change date'),
    createUser: Projection.attr('Create user'),
    createDate: Projection.attr('Create date'),
    subsystem: Projection.belongsTo('fd-subsystem', '', {
      stage: Projection.belongsTo('fd-stage', '', {

      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-diagram', {
    primitivesJsonString: Projection.attr(''),
    primitivesStreamString: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    name: Projection.attr('')
  });
  modelClass.defineProjection('SearchSystem', 'fd-diagram', {
    name: Projection.attr('')
  });
};
