import StoreMixin from 'ember-flexberry-data/mixins/store';
import BaseStore from 'ember-flexberry-data/stores/base-store';
import { inject as service } from '@ember/service';

export default BaseStore.extend(StoreMixin, {
  /**
   Service that return offline schemas.

   @property objectlistviewEventsService
   @type {Class}
   @default OfflineGlobalsService
  */
  offlineGlobals: service('offline-globals'),

  init() {
    this._super(...arguments);
    this.set('offlineModels', {
      'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-entity': true,
      'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-field': true,
      'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-object-type': true
    });
  }
});
