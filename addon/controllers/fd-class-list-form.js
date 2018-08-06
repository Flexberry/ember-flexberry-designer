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
      let editFormRoute;
      switch (record.data.stereotype) {
        case '«listform»':
          editFormRoute = 'fd-listform-constructor';
          this.transitionToRoute(editFormRoute, {
            queryParams: {
              form: record.id,
              class: undefined,
            },
          });
          break;
        case '«editform»':
          editFormRoute = 'fd-editform-constructor';
          this.transitionToRoute(editFormRoute, record.id);
          break;
        default:
          editFormRoute = this.get('editFormRoute');
          this.transitionToRoute(editFormRoute, record.id);
          break;
      }
    }

  }
});
