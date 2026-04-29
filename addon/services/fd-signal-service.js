import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { getOwner } from '@ember/application';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
import { camelize } from '@ember/string';

export default Service.extend(Evented, {
  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service('store'),

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

    signalR.connection.on('Diagram', (payload) => this.handlingEventSignalR('Diagram', payload));
    signalR.connection.on('Aggregation', (payload) => this.handlingEventSignalR('fd-dev-aggregation', payload));
    signalR.connection.on('Association', (payload) => this.handlingEventSignalR('fd-dev-association', payload));
    signalR.connection.on('Class', (payload) => this.handlingEventSignalR('fd-dev-class', payload));
    signalR.connection.on('Stage', (payload) => this.handlingEventSignalR('fd-dev-stage', payload));
    signalR.connection.on('UMLAD', (payload) => this.handlingEventSignalR('fd-dev-uml-ad', payload));
    signalR.connection.on('UMLCAD', (payload) => this.handlingEventSignalR('fd-dev-uml-cad', payload));
    signalR.connection.on('UMLCOD', (payload) => this.handlingEventSignalR('fd-dev-uml-cod', payload));
    signalR.connection.on('UMLDPD', (payload) => this.handlingEventSignalR('fd-dev-uml-dpd', payload));
    signalR.connection.on('UMLSD', (payload) => this.handlingEventSignalR('fd-dev-uml-sd', payload));
    signalR.connection.on('UMLSTD', (payload) => this.handlingEventSignalR('fd-dev-uml-std', payload));
    signalR.connection.on('UMLUCD', (payload) => this.handlingEventSignalR('fd-dev-uml-ucd', payload));

    signalR.connection.onreconnected(() => {
      const currentProjectId = this.get('currentProjectId');
      if (!isNone(currentProjectId)) {
        return signalR.connection.invoke('JoinProjectAsync', currentProjectId);
      }
    });
  },

  handlingEventSignalR(modelName, payload) {
    if (payload.messageType !== 'Lock') {
      let store = this.get('store');

      const model = this.store.modelFor(modelName);
      const rels = model.relationshipsByName;


      switch (payload.operationType) {
        case 'Created':
        case 'Altered': {
          const attributes = {};
          const relationships = {};

          for (const change of payload.delta) {
            const propName = camelize(change.propertyName);
            const newValue = change.newValue;

            // Проверяем, является ли поле связью
            const relMeta = rels.get(propName);

            if (relMeta) {
              if (relMeta.kind === 'belongsTo') {
                relationships[propName] = {
                  data: newValue ? { id: newValue, type: relMeta.type } : null
                };
              }
              /*else if (relMeta.kind === 'hasMany') {
                const ids = Array.isArray(newValue) ? newValue : (newValue ? [newValue] : []);

                relationships[propName] = {
                  data: ids.map(v => ({
                    id: String(typeof v === 'object' ? v.id : v),
                    type: relMeta.type
                  }))
                };
              }*/
            } else {
              attributes[propName] = newValue;
            }
          }

          const pushPayload = { data: { id: payload.objectId, type: modelName, attributes } };
          if (Object.keys(relationships).length > 0) {
            pushPayload.data.relationships = relationships;
          }

          let record = store.push(pushPayload);
          Object.keys(relationships).forEach(key => delete record._canonicalBelongsTo[key]);

          break;
        }
        case 'Deleted': {
          const record = store.peekRecord(modelName, payload.objectId);
          if (record) {
            store.unloadRecord(record);
          }

          break;
        }
      }
    }

    this.trigger(`${modelName}:${payload.messageType}`, payload)
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
});
