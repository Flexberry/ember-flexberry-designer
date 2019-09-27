import Component from '@ember/component';
import layout from '../templates/components/fd-modal-message-box';

export default Component.extend({
  layout,

  /**
    Title text value.

    @property titleText
    @type String
  */
  titleText: undefined,

  /**
    Message text value.

    @property messageText
    @type String
  */
  messageText: undefined,

  /**
    Model component name.

    @property componentName
    @type String
  */
  componentName: undefined,

  /**
    Flag: indicates whether to show modal.

    @property show
    @type Object
    @default false
  */
  show: false,

  /**
    Flag: indicates whether to show modal button.

    @property isError
    @type Object
    @default false
  */
  isError: false,

  actions: {

    /**
      Approve button action.

      @method actions.approve
    */
    approve() {
      this.get('onApprove')();
      this.set('show', false);
    }
  }
});
