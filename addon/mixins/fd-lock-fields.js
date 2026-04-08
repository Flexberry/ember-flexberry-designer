import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

/**
  Mixin for managing lock-related fields (accuried, updatedAt, updatedBy).

  @class FdLockFieldsMixin
  @extends Mixin
*/
export default Mixin.create({
  /**
    Service for SignalR communication.

    @property fdSignalService
    @type {Class}
    @default service()
  */
  fdSignalService: service(),

  /**
    Indicates if the object is locked.

    @property accuried
    @type bool
    @default false
  */
  acquired: false,

  /**
    Date when the object was last acquired.

    @property updatedAt
    @type Date
    @default null
  */
  acquiredAt: null,

  /**
    User who last acquired the object.

    @property updatedBy
    @type String
    @default null
  */
  acquiredBy: null,

  /**
    Initializes the mixin and sets up SignalR event listeners.

    @method init
  */
  init() {
    this._super(...arguments);

    this.get('fdSignalService').on(`${this.get('constructor.modelName')}:Lock:${this.get('id')}`, this, this._onLockEvent);
  },

  /**
    Handles Lock events from SignalR.

    @method _onLockEvent
    @param {Object} payload The payload from the Lock event.
  */
  _onLockEvent(payload) {
    if (isNone(payload)) {
      return;
    }

    this.setProperties({
      acquired: payload.operationType === 'Created',
      acquiredBy: payload.updatedBy,
      acquiredAt: payload.updatedAt
    });
  },

  /**
    Cleans up SignalR event listeners.

    @method willDestroy
  */
  willDestroy() {
    this._super(...arguments);

    this.get('fdSignalService').off(`${this.get('constructor.modelName')}:Lock:${this.get('id')}`, this, this._onLockEvent);
  }
});
