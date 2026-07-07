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

    // In test environment signalR may be null or undefined
    if (signalR && signalR.connection) {
      signalR.connection.on('Diagram', (payload) => this.trigger('Diagram', payload));
      signalR.connection.on('Aggregation', (payload) => this.trigger(`fd-dev-aggregation:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('Association', (payload) => this.trigger(`fd-dev-association:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('Class', (payload) => this.trigger(`fd-dev-class:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('Stage', (payload) => this.trigger(`fd-dev-stage:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLAD', (payload) => this.trigger(`fd-dev-uml-ad:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLCAD', (payload) => this.trigger(`fd-dev-uml-cad:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLCOD', (payload) => this.trigger(`fd-dev-uml-cod:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLDPD', (payload) => this.trigger(`fd-dev-uml-dpd:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLSD', (payload) => this.trigger(`fd-dev-uml-sd:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLSTD', (payload) => this.trigger(`fd-dev-uml-std:${payload.messageType}:${payload.objectId}`, payload));
      signalR.connection.on('UMLUCD', (payload) => this.trigger(`fd-dev-uml-ucd:${payload.messageType}:${payload.objectId}`, payload));

      signalR.connection.onreconnected(() => {
        // Check if service is destroyed before getting property
        if (!this.isDestroyed && !isNone(this.get('currentProjectId'))) {
          return signalR.connection.invoke('JoinProjectAsync', this.get('currentProjectId'));
        }
      });
    }
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

    if (!signalR) {
      return;
    }

    return signalR.start()
      .then(() => {
        return signalR.connection.invoke('JoinProjectAsync', projectId);
      })
      .then(() => {
        // Check if service is destroyed before setting property
        if (!this.isDestroyed) {
          this.set('currentProjectId', projectId);
        }
      });
  },

  /**
    Disconnect from SignalR.

    @method disconnect
  */
  disconnect() {
    const service = this.get('signalR');
    const currentProjectId = this.get('currentProjectId');

    if (isNone(currentProjectId) || !service) {
      return;
    }

    // eslint-disable-next-line no-undef
    if (service.getState() !== signalR.HubConnectionState.Disconnected) {
      return service.connection.invoke('LeaveProjectAsync', currentProjectId)
        .finally(() => {
          // Check if service is destroyed before setting property
          if (!this.isDestroyed) {
            this.set('currentProjectId', null);
          }
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

    if (signalR && signalR.connection) {
      signalR.connection.offReconnected();

      signalR.connection.off('Diagram');
      signalR.connection.off('Aggregation');
      signalR.connection.off('Association');
      signalR.connection.off('Class');
      signalR.connection.off('Stage');
      signalR.connection.off('UMLAD');
      signalR.connection.off('UMLCAD');
      signalR.connection.off('UMLCOD');
      signalR.connection.off('UMLDPD');
      signalR.connection.off('UMLSD');
      signalR.connection.off('UMLSTD');
      signalR.connection.off('UMLUCD');

      signalR.stop();
    }
  }
});
