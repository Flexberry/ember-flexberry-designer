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
        return signalR.connection.invoke('JoinProjectAsync', projectId);
      })
      .then(() => {
        if (typeof this._diagramUpdatedHandler !== 'function') {
          this._diagramUpdatedHandler = (payload) => this.trigger('diagramUpdated', payload);
          signalR.connection.on('diagramUpdated', this._diagramUpdatedHandler);
        }
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
