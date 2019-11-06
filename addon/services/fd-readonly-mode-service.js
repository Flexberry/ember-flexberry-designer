import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';

export default Service.extend({

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service('store'),

  /**
    Value 'readonlyMode' from backend.

    @property readonlyModeOnBackend
    @type Bool
  */
  readonlyModeOnBackend: false,

  /**
    Return value 'readonlyModeOnBackend'.

     @method getReadonlyModeFromBackend
  */
  getReadonlyModeFromBackend() {
    return this.get('readonlyModeOnBackend');
  },

  /**
    Get value readonlyMode from backend and set this in property.

     @method setReadonlyModeFromBackend
  */
  setReadonlyModeFromBackend() {
    return this.get('store').adapterFor('application').callFunction('GetReadonlyModeSetting')
    .then((result) => {
      this.set('readonlyModeOnBackend', result.value);

      return resolve();
    });
  }
});
