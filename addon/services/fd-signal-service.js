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
    @type String|null
    @default null
  */
  currentProjectId: null,

  init() {
    this._super(...arguments);

    const app = getOwner(this);
    this.set('signalR', app.lookup('realtime:signalr'));
    this.set('currentProjectId', null);
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
    if (isNone(signalR)) {
      return;
    }

    signalR.start()
      .then(() => {
        const reconnectHandler = () => {
          const currentProjectId = this.get('currentProjectId');
          if (!isNone(currentProjectId)) {
            return signalR.connection.invoke('JoinProjectAsync', currentProjectId);
          }
        }

        signalR.connection.onreconnected(reconnectHandler);

        const diagramUpdatedHandler = (payload) => {
          this.trigger('diagramUpdated', payload);
        }

        signalR.connection.on('diagramUpdated', diagramUpdatedHandler);

        return signalR.connection.invoke('JoinProjectAsync', projectId);
      })
      .then(() => {
        this.set('currentProjectId', projectId);
      })
      .catch(() => {
        signalR.connection.offReconnected();
        signalR.connection.off('diagramUpdated');
      });
  },

  /**
    Disconnect from SignalR and clean up resources.

    @method disconnect
  */
  disconnect() {
    const signalR = this.get('signalR');
    if (isNone(signalR) || isNone(signalR.connection)) {
      return;
    }

    signalR.connection.offReconnected();
    signalR.connection.off('diagramUpdated');

    const currentProjectId = this.get('currentProjectId');

    if (!isNone(currentProjectId) && signalR.connection.state === 1) {
      signalR.connection.invoke('LeaveProjectAsync', currentProjectId);
      this.set('currentProjectId', null);
    }
  },

  /**
    Clean up resources when service is destroyed.

    @method willDestroy
  */
  willDestroy() {
    this._super(...arguments);

    const signalR = this.get('signalR');
    if (!isNone(signalR) && !isNone(signalR.connection)) {
      signalR.connection.offReconnected();
      signalR.connection.off('diagramUpdated');
    }

    this.set('currentProjectId', null);
  }
});
