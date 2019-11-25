import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service('store'),

  /**
    Value 'readonlyMode' project.

    @property readonlyModeProject
    @type Bool
  */
  readonlyModeProject: false,

  /**
    Return value 'readonlyModeProject'.

     @method getReadonlyModeProject
  */
  getReadonlyModeProject() {
    return this.get('readonlyModeProject');
  },

  /**
    Set readonlyMode Project in property.

     @method setReadonlyModeProject
     @param {Bool} value
  */
  setReadonlyModeProject(value) {
    this.set('readonlyModeProject', value);
  }
});
