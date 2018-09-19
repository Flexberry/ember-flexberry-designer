import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({
  modelProjection: 'FdEditClassForm',
  modelName: 'fd-dev-class',

  afterModel: function(model) {
    this._super(model);

    if (!model.get('caption')) {
      model.set('caption', model.get('name'));
    }

    let transitionMap = {
      '«application»': 'fd-application-edit-form',
      '«businessserver»': 'fd-business-server-edit-form',
      '«editform»': 'fd-editform-constructor',
      '«enumeration»': 'fd-enum-edit-form',
      '«external»': 'fd-external-edit-form',
      '«interface»': 'fd-interface-edit-form',
      '«listform»': 'fd-listform-constructor',
      '«type»': 'fd-type-edit-form',
      '«userform»': 'fd-user-form-edit-form',
      '«typedef»': 'fd-typedef-edit-form'
    };
    let target = transitionMap[model.get('stereotype')];

    if (target) {
      if (target === 'fd-listform-constructor') {
        this.transitionTo(target, {
          queryParams: {
            form: model.get('id'),
            class: undefined
          }
        });
        return;
      }

      this.transitionTo(target, model.get('id'));

    }
  }
});
