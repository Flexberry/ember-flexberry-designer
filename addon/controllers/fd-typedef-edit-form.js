import Ember from 'ember';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';

export default Ember.Controller.extend({
  CSStrLabel: 'C#',
  SQLStrLabel: 'SQL',
  oracleStrLabel: 'Oracle',
  postgreStrLabel: 'Postgre',

  actions: {
    /**
      Overridden action for button 'Save'.
      @method actions.save
    */
    save() {
      this._setDefaultBusinessServerEvents();
      this._super();
    },

    /**
      Overridden action for 'Close' button.

      @method actions.close
    */
    close() {
      history.back();
    },
  },

  /**
    Sets 'businessServerEvents' model property value to default if business server is not present.
    @method _setDefaultBusinessServerEvents
  */
  _setDefaultBusinessServerEvents() {
    if (!this.model.get('businessServerClass') &&
        this.model.get('businessServerEvents') !== BusinessDataObjectEvents.OnAllEvents) {
      this.model.set('businessServerEvents', BusinessDataObjectEvents.OnAllEvents);
    }
  }
});
