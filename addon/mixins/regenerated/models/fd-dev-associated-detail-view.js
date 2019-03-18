import Mixin from '@ember/object/mixin';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
import $ from 'jquery';

export let Model = Mixin.create({
  detailLoadOnLoadAgregator: DS.attr('boolean'),
  detailName: DS.attr('string'),
  detailViewName: DS.attr('string'),
  view: DS.belongsTo('fd-view', { inverse: null, async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      view: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this._super(...arguments);

    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'fd-dev-associated-detail-view', {
    detailLoadOnLoadAgregator: attr(''),
    detailName: attr(''),
    detailViewName: attr('')
  });
  modelClass.defineProjection('Generator', 'fd-dev-associated-detail-view', {
    detailLoadOnLoadAgregator: attr(''),
    detailName: attr(''),
    detailViewName: attr(''),
    view: belongsTo('fd-view', '', {

    })
  });
};
