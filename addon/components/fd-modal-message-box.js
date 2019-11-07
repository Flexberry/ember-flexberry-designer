import { translationMacro as t } from 'ember-i18n';
import layout from '../templates/components/fd-modal-message-box';
import $ from 'jquery';
import FlexberryDialogComponent from 'ember-flexberry/components/flexberry-dialog';

import { computed } from '@ember/object';

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
    Сomponent icon class to display in the header.

    @property headerIcon
    @type String
    @default undefined
  */
  headerIcon: undefined,

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

  /**
    Component's close button caption.

    @property closeButtonCaption
    @type String
  */
  closeButtonCaption: computed('isError', 'i18n.locale', function() {
    let i18n = this.get('i18n');
    return this.get('isError') ? i18n.t('components.fd-modal-message-box.confirmation-close') : i18n.t('components.fd-modal-message-box.confirmation-cancel');
  }),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);
    $(this.element).modal('attach events', '.flexberry-dialog-close-button')
  }
});
