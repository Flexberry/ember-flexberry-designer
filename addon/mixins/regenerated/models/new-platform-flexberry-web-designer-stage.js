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
  configuration: DS.belongsTo('new-platform-flexberry-web-designer-configuration', { inverse: 'stages', async: false }),
  systems: DS.hasMany('new-platform-flexberry-web-designer-subsystem', { inverse: 'stage', async: false }),
  inheritances: DS.hasMany('new-platform-flexberry-web-designer-inheritance', { inverse: 'stage', async: false }),
  associations: DS.hasMany('new-platform-flexberry-web-designer-base-association', { inverse: 'stage', async: false }),
  classes: DS.hasMany('new-platform-flexberry-web-designer-class', { inverse: 'stage', async: false }),
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Convert', 'new-platform-flexberry-web-designer-stage', {
    systems: Projection.hasMany('new-platform-flexberry-web-designer-subsystem', '', {
      createUser: Projection.attr('CreateUser'),
      createDate: Projection.attr('CreateDate'),
      changeUser: Projection.attr('ChangeUser'),
      changeDate: Projection.attr('ChangeDate'),
      name: Projection.attr('Name'),
      description: Projection.attr('Description'),
      nameStr: Projection.attr('NameStr'),
      diagramLinks: Projection.hasMany('new-platform-flexberry-web-designer-diagram-link', '', {
        name: Projection.attr('Название'),
        description: Projection.attr('Описание')
      }),
      diagrams: Projection.hasMany('new-platform-flexberry-web-designer-diagram', '', {
        primitivesStreamString: Projection.attr(''),
        caseObjectsString: Projection.attr(''),
        name: Projection.attr(''),
        createDate: Projection.attr(''),
        createUser: Projection.attr(''),
        changeDate: Projection.attr(''),
        changeUser: Projection.attr('')
      }),
      filelinks: Projection.hasMany('new-platform-flexberry-web-designer-filelink', '', {
        name: Projection.attr('Название'),
        description: Projection.attr('Описание')
      })
    })
  });
  modelClass.defineProjection('DependensiesSearchView', 'new-platform-flexberry-web-designer-stage', {
    classes: Projection.hasMany('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr(''),
      stereotype: Projection.attr(''),
      nameStr: Projection.attr('')
    })
  });
  modelClass.defineProjection('Import', 'new-platform-flexberry-web-designer-stage', {
    associations: Projection.hasMany('new-platform-flexberry-web-designer-base-association', '', {
      startRole: Projection.attr(''),
      endRole: Projection.attr(''),
      referenceCount: Projection.attr(''),
      startClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

      }),
      endClass: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

      })
    }),
    classes: Projection.hasMany('new-platform-flexberry-web-designer-class', '', {
      referenceCount: Projection.attr(''),
      nameStr: Projection.attr('')
    }),
    inheritances: Projection.hasMany('new-platform-flexberry-web-designer-inheritance', '', {
      referenceCount: Projection.attr(''),
      name: Projection.attr(''),
      parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

      }),
      child: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

      })
    })
  });
  modelClass.defineProjection('InheritanceCyclesCheckView', 'new-platform-flexberry-web-designer-stage', {
    inheritances: Projection.hasMany('new-platform-flexberry-web-designer-inheritance', '', {
      referenceCount: Projection.attr(''),
      name: Projection.attr(''),
      parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

      }),
      child: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

      })
    })
  });
  modelClass.defineProjection('NameOnly', 'new-platform-flexberry-web-designer-stage', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('PathSearchView', 'new-platform-flexberry-web-designer-stage', {
    name: Projection.attr(''),
    configuration: Projection.belongsTo('new-platform-flexberry-web-designer-configuration', '', {
      name: Projection.attr(''),
      project: Projection.belongsTo('new-platform-flexberry-web-designer-project', '', {
        name: Projection.attr(''),
        repository: Projection.belongsTo('new-platform-flexberry-web-designer-repository', '', {
          name: Projection.attr('')
        })
      })
    })
  });
  modelClass.defineProjection('References', 'new-platform-flexberry-web-designer-stage', {
    associations: Projection.hasMany('new-platform-flexberry-web-designer-base-association', '', {
      referenceCount: Projection.attr('')
    }),
    classes: Projection.hasMany('new-platform-flexberry-web-designer-class', '', {
      referenceCount: Projection.attr('')
    }),
    inheritances: Projection.hasMany('new-platform-flexberry-web-designer-inheritance', '', {
      referenceCount: Projection.attr('')
    })
  });
};
