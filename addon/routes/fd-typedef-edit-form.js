import Ember from 'ember';

export default Ember.Route.extend({
  modelProjection: 'TypeDefinitionE',
  modelName: 'fd-dev-type-definition',
  currentProjectContext: Ember.inject.service('fd-current-project-context'),
  className: undefined,
  classId: undefined,

  afterModel: function(model) {
    this._super(model);
  },

  model: function(params) {
    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();
    let allStages = store.peekAll('fd-dev-stage');
    let allClasses = store.peekAll('fd-dev-class');
    this.set('className', allClasses.findBy('id', params.id).get('name'));
    this.set('classId', params.id);

    return allStages.findBy('id', stageId); // typemaps are inside, in XML. Need to find one equal to current type and let change it.
  },

  setupController: function(controller) {
    this._super(...arguments);

    controller.set('className', this.get('className'));
    controller.set('classId', this.get('classId'));
  }
});
