import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  child: DS.belongsTo('fd-class', { inverse: null, async: false, polymorphic: true }),
  parent: DS.belongsTo('fd-class', { inverse: null, async: false, polymorphic: true }),
  stage: DS.belongsTo('fd-stage', { inverse: 'realizations', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      child: { presence: true },
      parent: { presence: true },
      stage: { presence: true }
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
    _parentModelName: 'fd-repository-ref-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Import', 'fd-realization', {
    referenceCount: attr(''),
    name: attr(''),
    child: belongsTo('fd-class', '', {

    }),
    parent: belongsTo('fd-class', '', {

    })
  });

  modelClass.defineProjection('RealizationE', 'fd-realization', {
    referenceCount: attr(''),
    name: attr(''),
    description: attr(''),
    nameStr: attr(''),
    child: belongsTo('fd-class', '', {
      nameStr: attr('')
    }),
    parent: belongsTo('fd-class', '', {
      nameStr: attr('')
    })
  });

  modelClass.defineProjection('References', 'fd-realization', {
    referenceCount: attr('')
  });
};
