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

  /**
    Currently joined project ID.

    @property currentProjectId
    @default null
  */
  currentProjectId: null,

  init() {
    this._super(...arguments);

    const signalR = getOwner(this).lookup('realtime:signalr');

    this.set('signalR', signalR);
    this.set('currentProjectId', null);

    signalR.connection.on('diagramUpdated', (payload) => this.trigger('diagramUpdated', payload));
    signalR.connection.onreconnected(() => {
      const currentProjectId = this.get('currentProjectId');
      if (!isNone(currentProjectId)) {
        return signalR.connection.invoke('JoinProjectAsync', currentProjectId);
      }
    });
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

    return signalR.start()
      .then(() => {
        return signalR.connection.invoke('JoinProjectAsync', projectId);
      })
      .then(() => {
        this.set('currentProjectId', projectId);
      });
  },

  /**
    Disconnect from SignalR.

    @method disconnect
  */
  disconnect() {
    const service = this.get('signalR');
    const currentProjectId = this.get('currentProjectId');

    if (isNone(currentProjectId)) {
      return;
    }

    // eslint-disable-next-line no-undef
    if (service.getState() !== signalR.HubConnectionState.Disconnected) {
      return service.connection.invoke('LeaveProjectAsync', currentProjectId)
        .finally(() => {
          this.set('currentProjectId', null);
        });
    }
  },

  /**
    Clean up resources when service is destroyed.

    @method willDestroy
  */
  willDestroy() {
    this._super(...arguments);

    const signalR = this.get('signalR');

    signalR.connection.offReconnected();
    signalR.connection.off('diagramUpdated');

    signalR.stop();
  }
});
