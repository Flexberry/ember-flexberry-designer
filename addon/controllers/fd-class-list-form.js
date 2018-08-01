import ListFormController from 'ember-flexberry/controllers/list-form';

export default ListFormController.extend({
  /**
    Name of related edit form route.

    @property editFormRoute
    @type String
    @default 'fd-class-edit-form'
   */
  editFormRoute: 'fd-class-edit-form',

  actions: {
    onRowClick(record, options) {
      let editFormRoute;
      switch (record.data.stereotype) {
        case '«listform»':
          editFormRoute = 'fd-listform-constructor';
        break;
        case '«editform»':
          editFormRoute = 'fd-editform-constructor';
        break;
        default:
          editFormRoute = this.get('editFormRoute');
        break;
      }

      Ember.assert('Edit form route must be defined for flexberry-objectlistview', editFormRoute);
      if (Ember.isNone(options)) {
        options = {};
        options.editFormRoute = editFormRoute;
      } else {
        options = Ember.merge(options, { editFormRoute: editFormRoute });
      }

      this.transitionToRoute(editFormRoute, record);
    }

  }
});
