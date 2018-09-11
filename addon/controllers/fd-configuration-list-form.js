import ListFormController from 'ember-flexberry/controllers/list-form';

export default ListFormController.extend({
  /**
    Name of related edit form route.

    @property editFormRoute
    @type String
    @default 'fd-configuration-edit-form'
   */
  editFormRoute: 'fd-configuration-edit-form',

  /**
    Cout of list loading.

    @property loadCount
    @type Int
  */
  loadCount: 0,
});
