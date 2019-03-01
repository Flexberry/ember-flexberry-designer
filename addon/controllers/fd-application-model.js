import Ember from 'ember';

export default Ember.Controller.extend({

  /**
    Original value model.

    @property originalModel
    @type Object
    @default undefined
  */
  originalModel: undefined,

  /**
    Value search input.

    @property value
    @type String
    @default ''
  */
  value: '',

  /**
    Update model for search

    @method _valueObserver
  */
  _valueObserver: Ember.observer('value', function() {
    let searchStr = this.get('value').trim().toLocaleLowerCase();
    let originalModel = this.get('originalModel');
    let newModel = {
      classes: undefined,
      typedefs: undefined,
      enums: undefined,
      types: undefined,
      applications: undefined,
      bs: undefined,
      externals: undefined,
      extinterfaces: undefined,
      interfaces: undefined,
      userforms: undefined,
      userstereotypes: undefined
    };

    if (searchStr !== '') {
      let filterFunction = function(item) {
        let name = item.get('name');
        if (!Ember.isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
          return item;
        }
      };

      let newClasses = originalModel.classes.filter(function(clazz) {
        let name = clazz.settings.get('name');
        if (!Ember.isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
          return clazz;
        } else {
          let editForms = clazz.editForms.filter(filterFunction);
          let listForms = clazz.listForms.filter(filterFunction);
          let parents = clazz.parents.filter(filterFunction);
          let bs = !Ember.isNone(clazz.bs) ? filterFunction(clazz.bs) : null;

          if (editForms.length !== 0 || listForms.length !== 0 || parents.length !== 0 || !Ember.isNone(bs)) {
            return clazz;
          }
        }
      });

      let newTypedefs = originalModel.typedefs.filter(filterFunction);
      let newEnums = originalModel.enums.filter(filterFunction);
      let newTypes = originalModel.types.filter(filterFunction);
      let newApplications = originalModel.applications.filter(filterFunction);
      let newBS = originalModel.bs.filter(filterFunction);
      let newExternals = originalModel.externals.filter(filterFunction);
      let newExtInterfaces = originalModel.extinterfaces.filter(filterFunction);
      let newInterfaces = originalModel.interfaces.filter(filterFunction);
      let newUserForms = originalModel.userforms.filter(filterFunction);
      let newUserStereotypes = originalModel.userstereotypes.filter(filterFunction);

      newModel.classes = Ember.A(newClasses);
      newModel.typedefs = Ember.A(newTypedefs);
      newModel.enums = Ember.A(newEnums);
      newModel.types = Ember.A(newTypes);
      newModel.applications = Ember.A(newApplications);
      newModel.bs = Ember.A(newBS);
      newModel.externals = Ember.A(newExternals);
      newModel.extinterfaces = Ember.A(newExtInterfaces);
      newModel.interfaces = Ember.A(newInterfaces);
      newModel.userforms = Ember.A(newUserForms);
      newModel.userstereotypes = Ember.A(newUserStereotypes);
    } else {
      newModel = originalModel;
    }

    this.set('model', newModel);
  })
});
