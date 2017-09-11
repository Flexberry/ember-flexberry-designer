import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  detailLoadOnLoadAgregator: DS.attr('boolean'),
  detailName: DS.attr('string'),
  detailViewName: DS.attr('string'),
  view: DS.belongsTo('new-platform-flexberry-web-designer-view', { inverse: null, async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      view: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'new-platform-flexberry-web-designer-dev-associated-detail-view', {
    detailLoadOnLoadAgregator: Projection.attr(''),
    detailName: Projection.attr(''),
    detailViewName: Projection.attr('')
  });
  modelClass.defineProjection('Generator', 'new-platform-flexberry-web-designer-dev-associated-detail-view', {
    detailLoadOnLoadAgregator: Projection.attr(''),
    detailName: Projection.attr(''),
    detailViewName: Projection.attr(''),
    view: Projection.belongsTo('new-platform-flexberry-web-designer-view', '', {

    })
  });
};
