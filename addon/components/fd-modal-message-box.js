import { translationMacro as t } from 'ember-i18n';
import layout from '../templates/components/fd-modal-message-box';
import FlexberryDialogComponent from 'ember-flexberry/components/flexberry-dialog';

export default FlexberryDialogComponent.extend({
  layout,

  /**
    Flag: indicates whether to show modal button.

    @property isError
    @type Object
    @default false
  */
  isError: false,

  /**
    Sheet component name.
    @property sheetName
    @type String
  */
  sheetName: undefined,

  /**
    Message text value.

    @property messageText
    @type String
    @default undefined
  */
  messageText: undefined,

  /**
    Flag: indicates whether dialog is visible or not.
    If true, then dialog will be shown, otherwise dialog will be closed.
    @property visible
    @type Boolean
    @default false
  */
  visible: true,

  /**
    Component's approve button caption.

    @property approveButtonCaption
    @type String
    @default t('components.fd-modal-message-box.confirmation-approve')
  */
  approveButtonCaption: t('components.fd-modal-message-box.confirmation-approve'),

  /**
    Component's deny button caption.

    @property denyButtonCaption
    @type String
    @default t('components.fd-modal-message-box.confirmation-deny')
  */
  denyButtonCaption: t('components.fd-modal-message-box.confirmation-deny'),
});
