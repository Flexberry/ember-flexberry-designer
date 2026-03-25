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

    this.connected = false;
  }

  /**
    Starts the SignalR connection.

    @method start
    @returns {Promise} A promise that resolves when the connection is established.
  */
  start() {
    if (this.connected == false && this.connection) {
      return this.connection.start().then(() => {
        this.connected = true;
      });
    } else {
      return resolve();
    }
  }
}

export default SignalRConnection;
