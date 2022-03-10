import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  /**
    Non-stored property.

    @property chosenPalette
  */
  chosenPalette: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'chosenPaletteCompute' method in model class (outside of this mixin) if you want to compute value of 'chosenPalette' property.

    @method _chosenPaletteCompute
    @private
    @example
      ```javascript
      _chosenPaletteChanged: on('init', observer('chosenPalette', function() {
        once(this, '_chosenPaletteCompute');
      }))
      ```
  */
  _chosenPaletteCompute: function() {
    let result = (this.chosenPaletteCompute && typeof this.chosenPaletteCompute === 'function') ? this.chosenPaletteCompute() : null;
    this.set('chosenPalette', result);
  },
  configuration: DS.belongsTo('fd-configuration', { inverse: 'stages', async: false }),
  systems: DS.hasMany('fd-subsystem', { inverse: 'stage', async: false }),
  inheritances: DS.hasMany('fd-inheritance', { inverse: 'stage', async: false }),
  realizations: DS.hasMany('fd-realization', { inverse: 'stage', async: false }),
  associations: DS.hasMany('fd-base-association', { inverse: 'stage', async: false }),
  classes: DS.hasMany('fd-class', { inverse: 'stage', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      configuration: { presence: true }
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
    _parentModelName: 'fd-repository-browser-data-object-with-a-c-l'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Convert', 'fd-stage', {
    systems: hasMany('fd-subsystem', '', {
      createUser: attr('CreateUser'),
      createDate: attr('CreateDate'),
      changeUser: attr('ChangeUser'),
      changeDate: attr('ChangeDate'),
      name: attr('Name'),
      description: attr('Description'),
      nameStr: attr('NameStr'),
      diagramLinks: hasMany('fd-diagram-link', '', {
        name: attr('Название'),
        description: attr('Описание')
      }),
      diagrams: hasMany('fd-diagram', '', {
        primitivesStreamString: attr(''),
        caseObjectsString: attr(''),
        name: attr(''),
        createDate: attr(''),
        createUser: attr(''),
        changeDate: attr(''),
        changeUser: attr('')
      }),
      filelinks: hasMany('fd-filelink', '', {
        name: attr('Название'),
        description: attr('Описание')
      })
    })
  });
  modelClass.defineProjection('DependensiesSearchView', 'fd-stage', {
    classes: hasMany('fd-class', '', {
      name: attr(''),
      stereotype: attr(''),
      nameStr: attr('')
    })
  });
  modelClass.defineProjection('Import', 'fd-stage', {
    associations: hasMany('fd-base-association', '', {
      startRole: attr(''),
      endRole: attr(''),
      referenceCount: attr(''),
      startClass: belongsTo('fd-class', '', {

      }),
      endClass: belongsTo('fd-class', '', {

      })
    }),
    classes: hasMany('fd-class', '', {
      referenceCount: attr(''),
      nameStr: attr('')
    }),
    inheritances: hasMany('fd-inheritance', '', {
      referenceCount: attr(''),
      name: attr(''),
      parent: belongsTo('fd-class', '', {

      }),
      child: belongsTo('fd-class', '', {

      })
    }),
    realizations: hasMany('fd-realization', 'Realizations', {
      referenceCount: attr(''),
      name: attr(''),
      child: belongsTo('fd-class', '', {

      }),
      parent: belongsTo('fd-class', '', {

      })
    })
  });

  modelClass.defineProjection('InheritanceCyclesCheckView', 'fd-stage', {
    inheritances: hasMany('fd-inheritance', '', {
      referenceCount: attr(''),
      name: attr(''),
      parent: belongsTo('fd-class', '', {

      }),
      child: belongsTo('fd-class', '', {

      })
    })
  });
  modelClass.defineProjection('NameOnly', 'fd-stage', {
    name: attr('')
  });
  modelClass.defineProjection('PathSearchView', 'fd-stage', {
    name: attr(''),
    configuration: belongsTo('fd-configuration', '', {
      name: attr(''),
      project: belongsTo('fd-project', '', {
        name: attr(''),
        repository: belongsTo('fd-repository', '', {
          name: attr('')
        })
      })
    })
  });
  modelClass.defineProjection('References', 'fd-stage', {
    associations: hasMany('fd-base-association', '', {
      referenceCount: attr('')
    }),
    classes: hasMany('fd-class', '', {
      referenceCount: attr('')
    }),
    inheritances: hasMany('fd-inheritance', '', {
      referenceCount: attr('')
    }),
    realizations: hasMany('fd-realization', 'Realizations', {
      referenceCount: attr('')
    })
  });
};
