import { isNone } from '@ember/utils';

export function initialize(application) {
  let i18n = application.lookup('service:i18n');
  if (isNone(i18n)) {
    return;
  }

  window.i18n = i18n;
}

export default {
  name: 'i18n-for-object',
  after: ['ember-i18n', 'i18n'],
  initialize
};
