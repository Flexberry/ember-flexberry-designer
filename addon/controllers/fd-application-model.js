import Ember from 'ember';

export default Ember.Controller.extend({

  /**
    Value search input.

    @property searchValue
    @type String
    @default ''
  */
  searchValue: '',

  /**
    Update model for search

    @method filteredModel
  */
  filteredModel: Ember.computed('searchValue', function() {
    let searchStr = this.get('searchValue').trim().toLocaleLowerCase();
    let model = this.get('model');
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

      let newClasses = model.classes.filter(function(clazz) {
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

      let newTypedefs = model.typedefs.filter(filterFunction);
      let newEnums = model.enums.filter(filterFunction);
      let newTypes = model.types.filter(filterFunction);
      let newApplications = model.applications.filter(filterFunction);
      let newBS = model.bs.filter(filterFunction);
      let newExternals = model.externals.filter(filterFunction);
      let newExtInterfaces = model.extinterfaces.filter(filterFunction);
      let newInterfaces = model.interfaces.filter(filterFunction);
      let newUserForms = model.userforms.filter(filterFunction);
      let newUserStereotypes = model.userstereotypes.filter(filterFunction);

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
      newModel = model;
    }

    return newModel;
  })
});
