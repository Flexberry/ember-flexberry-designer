import FlexberryModalMessageBox from './fd-modal-message-box';
import layout from '../templates/components/fd-modal-input-message-box';

export default FlexberryModalMessageBox.extend({
  layout,

  /**
    Text input value.

    @property inputValue
    @type String
    @default ''
  */
  inputValue: ''
});
