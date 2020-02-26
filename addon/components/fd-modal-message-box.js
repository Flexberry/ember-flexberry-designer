import FlexberryDialogComponent from 'ember-flexberry/components/flexberry-dialog';
import layout from '../templates/components/fd-modal-message-box';
import $ from 'jquery';

export default FlexberryDialogComponent.extend({
  layout,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['tiny'],

  /**
    Flag: indicates whether dialog is closable (can be closed on it's dimmer click).
    @property closable
    @type Boolean
    @default true
  */
  closable: true,

  /**
    Flag: indicates whether dialog is visible or not.
    If true, then dialog will be shown, otherwise dialog will be closed.
    @property visible
    @type Boolean
    @default false
  */
  visible: true,

  /**
    Flag: indicates whether to show modal button.

    @property visibleButtons
    @type Object
    @default false
  */
  visibleButtons: false,

  /**
    Component's header caption.

    @property headerCaption
    @type String
  */
  headerCaption: undefined,

  /**
    Message text value.

    @property messageText
    @type String
  */
  messageText: undefined,

  /**
    Component's approve button caption.

    @property approveButtonCaption
    @type String
  */
  approveButtonCaption: undefined,

  /**
    Component's deny button caption.

    @property denyButtonCaption
    @type String
  */
  denyButtonCaption: undefined,

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);
    $(this.element).modal('attach events', '.flexberry-dialog-close-button')
  }
});
