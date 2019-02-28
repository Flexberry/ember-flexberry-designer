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
      types: undefined
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
          let forms = clazz.forms.filter(filterFunction);
          if (forms.length !== 0) {
            return clazz;
          }
        }
      });

      let newTypedefs = originalModel.typedefs.filter(filterFunction);
      let newEnums = originalModel.enums.filter(filterFunction);
      let newTypes = originalModel.types.filter(filterFunction);

      newModel.classes = Ember.A(newClasses);
      newModel.typedefs = Ember.A(newTypedefs);
      newModel.enums = Ember.A(newEnums);
      newModel.types = Ember.A(newTypes);
    } else {
      newModel = originalModel;
    }

    this.set('model', newModel);
  })
});
