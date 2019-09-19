import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
import { observer, set } from '@ember/object';
import { isNone, isBlank } from '@ember/utils';
import { A } from '@ember/array';

/**
  Mixin with the support `Choice view` for controls in the edit form constructor.

  @class FdUpdateFormviewValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    View arrays.

    @property viewItems
    @type Object
    @default undefined
  */
  viewItems: undefined,

  /**
    View name.

    @property viewValue
    @type string
    @default undefined
  */
  viewValue: undefined,

  /**
    Ember.observer, watching string `model.name` and update 'viewValue' property.

    @method _modelObserver
  */
  _modelObserver: on('didInsertElement', observer('model.name', function() {
    let dataobject = this.get('dataobject');
    if (isNone(dataobject)) {
      dataobject = this.get('model.formViews.firstObject.view.class');
    }

    let views = dataobject.get('views');
    let viewsEmberA = A(views);
    let viewsMapNames = viewsEmberA.mapBy('name');
    let viewsNames = A(viewsMapNames).filter((a) => !isBlank(a));
    this.set('viewItems', {
      names: viewsNames,
      objects: viewsEmberA,
    });

    let viewName = this.get('model.formViews.firstObject.view.name') || '';
    this.set('viewValue', viewName);
  })),

  actions: {

    /**
      Update 'FormView'.

      @method actions.changeViewValue
      @param {Object} value An object with a new value in the `value` property.
    */
    changeViewValue(value) {
      let model = this.get('model');
      if (isBlank(value)) {
        set(model, 'formViews.firstObject.view', null);
      } else {
        let viewObject = this.get('viewItems').objects.findBy('name', value);
        set(model, 'formViews.firstObject.view', viewObject);
      }
    }
  }
});
