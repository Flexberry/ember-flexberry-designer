import UserService from 'ember-flexberry-data/services/user';

export default UserService.extend({
  /**

    Returns current user name.
    Method must be overridden if application uses some authentication.

    @method getCurrentUserName
    @return {String} Current user name. Returns 'userName' as default value if method is not overridden.
  */
  getCurrentUserName() {
    return 'admin';
  }
});
