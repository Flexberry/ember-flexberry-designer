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
    onRowClick(record) {
      let editFormRoute = this.get('editFormRoute');
      this.transitionToRoute(editFormRoute, record.id);
    }
  }
});
