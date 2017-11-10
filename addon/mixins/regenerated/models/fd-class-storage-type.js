import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  connectionName: DS.attr('string'),
  connectionString: DS.attr('string'),
  storageType: DS.belongsTo('fd-storage-type', { inverse: null, async: false }),
  class: DS.belongsTo('fd-dev-class', { inverse: 'classStorageTypes', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      storageType: { presence: true },
      class: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditView', 'fd-class-storage-type', {
    connectionName: Projection.attr(''),
    connectionString: Projection.attr(''),
    storageType: Projection.belongsTo('fd-storage-type', '', {

    })
  });
  modelClass.defineProjection('FdEditClassForm', 'fd-class-storage-type', {
    connectionName: Projection.attr('Имя соединения'),
    connectionString: Projection.attr('Строка соединения'),
    class: Projection.belongsTo('fd-dev-class', '', {

    }, { hidden: true }),
    storageType: Projection.belongsTo('fd-storage-type', 'Тип хранилища', {

    }, { displayMemberPath: 'shortName' })
  });
};
