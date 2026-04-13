import { resolve } from 'rsvp';

/**
  SignalR connection class for managing SignalR hub connections.

  @class SignalRConnection
  @extends Object
*/
class SignalRConnection {
  /**
    Creates a new SignalR connection.

    @constructor
    @param {String} url The URL of the SignalR hub.
  */
  constructor(url) {
    // eslint-disable-next-line no-undef
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, { withCredentials: true })
      // eslint-disable-next-line no-undef
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  /**
    Starts the SignalR connection.

    @method start
    @returns {Promise} A promise that resolves when the connection is established.
  */
  start() {
    // eslint-disable-next-line no-undef
    if (this.connection && this.getState() === signalR.HubConnectionState.Disconnected) {
      return this.connection.start();
    }

    return resolve();
  }

  /**
    Stops the SignalR connection.

    @method stop
    @returns {Promise} A promise that resolves when the connection is stopped.
  */
  stop() {
    // eslint-disable-next-line no-undef
    if (this.connection && this.getState() !== signalR.HubConnectionState.Disconnected) {
      return this.connection.stop();
    }

    return resolve();
  }

  /**
    Gets the current connection state.

    @method getState
    @returns {Number} The connection state.
  */
  getState() {
    if (!this.connection) {
      // eslint-disable-next-line no-undef
      return signalR.HubConnectionState.Disconnected;
    }

    return this.connection.state;
  }
}

export default SignalRConnection;
