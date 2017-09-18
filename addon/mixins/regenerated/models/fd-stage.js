import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
      _chosenPaletteChanged: Ember.on('init', Ember.observer('chosenPalette', function() {
        Ember.run.once(this, '_chosenPaletteCompute');
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
  associations: DS.hasMany('fd-base-association', { inverse: 'stage', async: false }),
  classes: DS.hasMany('fd-class', { inverse: 'stage', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      configuration: { presence: true }
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
    _parentModelName: 'fd-repository-browser-data-object-with-a-c-l'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Convert', 'fd-stage', {
    systems: Projection.hasMany('fd-subsystem', '', {
      createUser: Projection.attr('CreateUser'),
      createDate: Projection.attr('CreateDate'),
      changeUser: Projection.attr('ChangeUser'),
      changeDate: Projection.attr('ChangeDate'),
      name: Projection.attr('Name'),
      description: Projection.attr('Description'),
      nameStr: Projection.attr('NameStr'),
      diagramLinks: Projection.hasMany('fd-diagram-link', '', {
        name: Projection.attr('Название'),
        description: Projection.attr('Описание')
      }),
      diagrams: Projection.hasMany('fd-diagram', '', {
        primitivesStreamString: Projection.attr(''),
        caseObjectsString: Projection.attr(''),
        name: Projection.attr(''),
        createDate: Projection.attr(''),
        createUser: Projection.attr(''),
        changeDate: Projection.attr(''),
        changeUser: Projection.attr('')
      }),
      filelinks: Projection.hasMany('fd-filelink', '', {
        name: Projection.attr('Название'),
        description: Projection.attr('Описание')
      })
    })
  });
  modelClass.defineProjection('DependensiesSearchView', 'fd-stage', {
    classes: Projection.hasMany('fd-class', '', {
      name: Projection.attr(''),
      stereotype: Projection.attr(''),
      nameStr: Projection.attr('')
    })
  });
  modelClass.defineProjection('Import', 'fd-stage', {
    associations: Projection.hasMany('fd-base-association', '', {
      startRole: Projection.attr(''),
      endRole: Projection.attr(''),
      referenceCount: Projection.attr(''),
      startClass: Projection.belongsTo('fd-class', '', {

      }),
      endClass: Projection.belongsTo('fd-class', '', {

      })
    }),
    classes: Projection.hasMany('fd-class', '', {
      referenceCount: Projection.attr(''),
      nameStr: Projection.attr('')
    }),
    inheritances: Projection.hasMany('fd-inheritance', '', {
      referenceCount: Projection.attr(''),
      name: Projection.attr(''),
      parent: Projection.belongsTo('fd-class', '', {

      }),
      child: Projection.belongsTo('fd-class', '', {

      })
    })
  });
  modelClass.defineProjection('InheritanceCyclesCheckView', 'fd-stage', {
    inheritances: Projection.hasMany('fd-inheritance', '', {
      referenceCount: Projection.attr(''),
      name: Projection.attr(''),
      parent: Projection.belongsTo('fd-class', '', {

      }),
      child: Projection.belongsTo('fd-class', '', {

      })
    })
  });
  modelClass.defineProjection('NameOnly', 'fd-stage', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('PathSearchView', 'fd-stage', {
    name: Projection.attr(''),
    configuration: Projection.belongsTo('fd-configuration', '', {
      name: Projection.attr(''),
      project: Projection.belongsTo('fd-project', '', {
        name: Projection.attr(''),
        repository: Projection.belongsTo('fd-repository', '', {
          name: Projection.attr('')
        })
      })
    })
  });
  modelClass.defineProjection('References', 'fd-stage', {
    associations: Projection.hasMany('fd-base-association', '', {
      referenceCount: Projection.attr('')
    }),
    classes: Projection.hasMany('fd-class', '', {
      referenceCount: Projection.attr('')
    }),
    inheritances: Projection.hasMany('fd-inheritance', '', {
      referenceCount: Projection.attr('')
    })
  });
};
