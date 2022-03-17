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
    _parentModelName: 'fd-realization'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DevRealizationE', 'fd-dev-realization', {
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

  modelClass.defineProjection('DevRealizationL', 'fd-dev-realization', {
    referenceCount: attr(''),
    name: attr(''),
    description: attr(''),
    nameStr: attr(''),
    child: belongsTo('fd-class', '', {
      nameStr: attr('')
    }, { hidden: true }),
    parent: belongsTo('fd-class', '', {
      nameStr: attr('')
    }, { hidden: true })
  });

  modelClass.defineProjection('Edit', 'fd-dev-realization', {
    name: attr('')
  });

  modelClass.defineProjection('EditFormView', 'fd-dev-realization', {
    name: attr(''),
    description: attr('')
  });

  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-realization', {
    child: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true }),
    parent: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true })
  });

  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-realization', {
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

  modelClass.defineProjection('Generator', 'fd-dev-realization', {
    referenceCount: attr('ReferenceCount', { hidden: true }),
    name: attr('Name', { hidden: true }),
    description: attr('Description', { hidden: true }),
    nameStr: attr('NameStr', { hidden: true }),
    child: belongsTo('fd-class', 'Child', {

    }, { hidden: true }),
    parent: belongsTo('fd-class', 'Parent', {

    }, { hidden: true })
  });

  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-realization', {
    child: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true }),
    parent: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true })
  });

  modelClass.defineProjection('ListFormView', 'fd-dev-realization', {
    child: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true }),
    parent: belongsTo('fd-class', '', {
      name: attr('')
    }, { hidden: true })
  });

  modelClass.defineProjection('RlzList', 'fd-dev-realization', {
    referenceCount: attr(''),
    parent: belongsTo('fd-class', '', {
      nameStr: attr('')
    }, { hidden: true }),
    child: belongsTo('fd-class', '', {
      nameStr: attr('')
    }, { hidden: true }),
    stage: belongsTo('fd-stage', '', {
      name: attr('')
    })
  });
};
