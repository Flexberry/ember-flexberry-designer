import DesignerStore from 'ember-flexberry-designer/services/store';
import config from '../config/environment';

export default DesignerStore.extend({
  init() {
    this.set('offlineSchema', {
      [config.APP.offline.dbName]: { 2: this.get('offlineGlobals').getOfflineSchema() },
    });
    this._super(...arguments);
  }
});
