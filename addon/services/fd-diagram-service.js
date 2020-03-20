import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { isNone } from '@ember/utils';

export default Service.extend(Evented, {

  /**
    Trigger update view object.

     @method updateJointObjectOnDiagram
     @param {String} id Id jointjs object.
  */
  updateJointObjectOnDiagram(id) {
    if (isNone(id)) {
      return;
    }

    this.trigger('updateJointObjectViewTriggered', id);
  },

  /**
    Trigger keypress logic.

     @method triggerKeypressLogic
     @param {String} eventName name event.
  */
  triggerKeypressLogic(eventName) {
    if (isNone(eventName)) {
      return;
    }

    this.trigger('keypressLogicTriggered', eventName);
  }
});
