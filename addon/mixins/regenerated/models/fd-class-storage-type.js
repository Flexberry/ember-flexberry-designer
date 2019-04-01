import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Mixin.create({
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
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditView', 'fd-class-storage-type', {
    connectionName: attr(''),
    connectionString: attr(''),
    storageType: belongsTo('fd-storage-type', '', {

    }, { displayMemberPath: 'shortName' })
  });
  modelClass.defineProjection('FdEditClassForm', 'fd-class-storage-type', {
    connectionName: attr('Имя соединения'),
    connectionString: attr('Строка соединения'),
    class: belongsTo('fd-dev-class', '', {

    }, { hidden: true }),
    storageType: belongsTo('fd-storage-type', 'Тип хранилища', {

    }, { displayMemberPath: 'shortName' })
  });
};
