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

    if (searchStr === '') {
      return model;
    }

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

    let filterFunction = function(item) {
      let name = item.get('name');
      if (!Ember.isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
        return item;
      }
    };

    let newClasses = model.classes.filter(function(clazz) {
      let classes = filterFunction(clazz.settings);
      if (!Ember.isNone(classes)) {
        return clazz;
      }

      let editForms = clazz.editForms.some(filterFunction);
      let listForms = clazz.listForms.some(filterFunction);
      let parents = clazz.parents.some(filterFunction);
      let bs = !Ember.isNone(clazz.bs) ? filterFunction(clazz.bs) : null;

      if (editForms || listForms || parents || !Ember.isNone(bs)) {
        return clazz;
      }
    });

    newModel.classes = Ember.A(newClasses);

    for (let prop in model) {
      if (prop !== 'classes') {
        let newdata = model[prop].filter(filterFunction);
        newModel[prop] = Ember.A(newdata);
      }
    }

    return newModel;
  })
});
