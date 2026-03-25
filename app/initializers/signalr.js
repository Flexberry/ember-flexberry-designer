import SignalRConnection from 'ember-flexberry-designer/utils/signalr';
import config from '../config/environment';

/**
  Initializes the SignalR connection for the application.

  @function initialize
  @param {Application} application The Ember application instance.
*/
export function initialize(application) {
  const signalr = new SignalRConnection(config.APP.backendUrls.root + '/DiagramSyncHub');
  application.register('realtime:signalr', signalr, { instantiate: false });
}

export default { initialize };
