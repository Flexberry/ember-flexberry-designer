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
      .withUrl(url)
      // eslint-disable-next-line no-undef
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  /**
    Starts the SignalR connection.

    @method start
    @returns {Promise} A promise that resolves when the connection is established.
  */
  start() {
    if (this.connection && this.getState() === 2) {
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
    if (this.connection && this.getState() !== 2) {
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
      return 2;
    }

    return this.connection.connection.connectionState;
  }
}

export default SignalRConnection;
