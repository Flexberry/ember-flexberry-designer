import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-object-in-system'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Diagram', 'fd-diagram', {
    primitivesStreamString: attr(''),
    caseObjectsString: attr(''),
    name: attr(''),
    createDate: attr(''),
    createUser: attr(''),
    changeDate: attr(''),
    changeUser: attr('')
  });
  modelClass.defineProjection('DiagramWithStage', 'fd-diagram', {
    primitivesStreamString: attr(''),
    caseObjectsString: attr(''),
    name: attr(''),
    createDate: attr(''),
    createUser: attr(''),
    changeDate: attr(''),
    changeUser: attr(''),
    subsystem: belongsTo('fd-subsystem', '', {
      stage: belongsTo('fd-stage', '', {

      })
    }, { hidden: true })
  });
  modelClass.defineProjection('DiagramWithSystem', 'fd-diagram', {
    primitivesStreamString: attr(''),
    caseObjectsString: attr(''),
    name: attr(''),
    createDate: attr(''),
    createUser: attr(''),
    changeDate: attr(''),
    changeUser: attr(''),
    subsystem: belongsTo('fd-subsystem', '', {

    })
  });
  modelClass.defineProjection('ExportToWmf', 'fd-diagram', {
    name: attr(''),
    description: attr('')
  });
  modelClass.defineProjection('FdDiagram', 'fd-diagram', {
    name: attr(''),
    caseObjectsString: attr(''),
    primitivesStreamString: attr(''),
    primitivesJsonString: attr('')
  });
  modelClass.defineProjection('FdDiagramE', 'fd-diagram', {
    name: attr('Name'),
    description: attr('Description')
  });
  modelClass.defineProjection('FdDiagramL', 'fd-diagram', {
    name: attr('Name'),
    description: attr('Description'),
    changeUser: attr('Change user'),
    changeDate: attr('Change date'),
    createUser: attr('Create user'),
    createDate: attr('Create date'),
    subsystem: belongsTo('fd-subsystem', '', {
      stage: belongsTo('fd-stage', '', {

      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-diagram', {
    primitivesJsonString: attr(''),
    primitivesStreamString: attr(''),
    caseObjectsString: attr(''),
    name: attr('')
  });
  modelClass.defineProjection('SearchSystem', 'fd-diagram', {
    name: attr('')
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-diagram', {
    name: attr(''),
    primitivesJsonString: attr(''),
    primitivesStreamString: attr(''),
    caseObjectsString: attr(''),
  });
};
