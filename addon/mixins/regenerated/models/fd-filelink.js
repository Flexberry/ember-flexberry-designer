import Ember from 'ember';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  /**
    Non-stored property.

    @property fileName
  */
  fileName: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'fileNameCompute' method in model class (outside of this mixin) if you want to compute value of 'fileName' property.

    @method _fileNameCompute
    @private
    @example
      ```javascript
      _fileNameChanged: Ember.on('init', Ember.observer('fileName', function() {
        Ember.run.once(this, '_fileNameCompute');
      }))
      ```
  */
  _fileNameCompute: function() {
    let result = (this.fileNameCompute && typeof this.fileNameCompute === 'function') ? this.fileNameCompute() : null;
    this.set('fileName', result);
  },
  subsystem: DS.belongsTo('fd-subsystem', { inverse: 'filelinks', async: false, polymorphic: true }),
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
  modelClass.defineProjection('FileLink', 'fd-filelink', {
    name: attr('Название'),
    description: attr('Описание')
  });
};
