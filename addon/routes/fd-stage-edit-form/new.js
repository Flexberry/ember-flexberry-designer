import Ember from 'ember';
import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';
import FdLoadingForTransitionMixin from '../../mixins/fd-loading-for-transition';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default EditFormNewRoute.extend(FdLoadingForTransitionMixin, {
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-stage',
  templateName: 'fd-stage-edit-form',
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  afterModel: function (model) {
    let _this = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      let modelName = 'fd-configuration';
      let configurationId = this.get('currentContext').getCurrentConfiguration();
      let builder = new Builder(_this.store, modelName)
        .select('id,name')
        .where('id', FilterOperator.Eq, configurationId);

      _this.store.query(modelName, builder.build()).then((configurations)=> {
        model.set('configuration', configurations.toArray()[0]);
        resolve();
      }).catch(error => { reject(error); });
    });
  }
});
