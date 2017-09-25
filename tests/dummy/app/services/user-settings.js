import UserSettingsService from 'ember-flexberry/services/user-settings';

export default UserSettingsService.extend({
  getCurrentUser() {
    return 'admin';
  },
});
