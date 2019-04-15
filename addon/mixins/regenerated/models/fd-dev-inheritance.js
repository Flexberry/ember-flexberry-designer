import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
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
    _parentModelName: 'fd-inheritance'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'fd-dev-inheritance', {
    name: attr('')
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-inheritance', {
    name: attr('Name'),
    description: attr('Description')
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-inheritance', {
    parent: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true }),
    child: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-inheritance', {
    referenceCount: attr(''),
    name: attr(''),
    description: attr(''),
    nameStr: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr('')
    }),
    child: belongsTo('fd-class', '', {
      name: attr('')
    }),
    parent: belongsTo('fd-class', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-inheritance', {
    referenceCount: attr('ReferenceCount', { hidden: true }),
    name: attr('Name', { hidden: true }),
    description: attr('Description', { hidden: true }),
    nameStr: attr('NameStr', { hidden: true }),
    child: belongsTo('fd-class', 'Child', {

    }, { hidden: true }),
    parent: belongsTo('fd-class', 'Parent', {

    }, { hidden: true })
  });
  modelClass.defineProjection('InhList', 'fd-dev-inheritance', {
    referenceCount: attr('Количество упоминаний'),
    parent: belongsTo('fd-class', 'Предок', {
      nameStr: attr('Предок')
    }, { hidden: true }),
    child: belongsTo('fd-class', 'Наследник', {
      nameStr: attr('Наследник')
    }, { hidden: true }),
    stage: belongsTo('fd-stage', '', {
      name: attr('', { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-inheritance', {
    parent: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true }),
    child: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-inheritance', {
    parent: belongsTo('fd-class', '', {
      name: attr('Parent')
    }, { hidden: true }),
    child: belongsTo('fd-class', '', {
      name: attr('Child')
    }, { hidden: true })
  });
};
