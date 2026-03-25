import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { getOwner } from '@ember/application';
import { isNone } from '@ember/utils';

export default Service.extend(Evented, {
  /**
    SignalR connection.

    @property signalR
    @type Object
  */
  signalR: null,

  init() {
    this._super(...arguments);

    const app = getOwner(this);
    this.set('signalR', app.lookup('realtime:signalr'));
  },

  /**
    Connect to SignalR and subscribe to events.

    @method connect
    @param {String} projectId Project ID to join.
  */
  connect(projectId) {
    if (isNone(projectId)) {
      return;
    }

    const signalR = this.get('signalR');

    signalR.start()
      .then(() => {
        signalR.connection.invoke('JoinProjectAsync', projectId);
      })
      .then(() => {
        signalR.connection.on('diagramUpdated', (payload) => {
          this.trigger('diagramUpdated', payload);
        });
      });
  },

  /**
    Disconnect from SignalR.

    @method disconnect
    @param {String} projectId Project ID to leave.
  */
  disconnect(projectId) {
    if (isNone(projectId)) {
      return;
    }

    const signalR = this.get('signalR');

    if (signalR.connected === true) {
      signalR.connection.invoke('LeaveProjectAsync', projectId);
    }
  }
});
