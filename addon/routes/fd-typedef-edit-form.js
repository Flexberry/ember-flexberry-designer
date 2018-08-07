import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({
  modelProjection: 'TypeDefinitionE',
  modelName: 'fd-dev-type-definition',

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
      '«listform»': 'fd-list-form-edit-form',
      '«type»': 'fd-type-edit-form',
      '«userform»': 'fd-user-form-edit-form'
    };
    let target = transitionMap[model.get('stereotype')];

    if (target) {
      this.transitionTo(target, model);
    }
  },
});
