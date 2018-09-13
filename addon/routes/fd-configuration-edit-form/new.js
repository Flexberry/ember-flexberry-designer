import Ember from 'ember';
import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';
import FdLoadingForTransitionMixin from '../../mixins/fd-loading-for-transition';
import { Query } from 'ember-flexberry-data';
const { Builder } = Query;

export default EditFormNewRoute.extend(FdLoadingForTransitionMixin, {
  modelProjection: 'EditFormView',
  modelName: 'fd-configuration',
  templateName: 'fd-configuration-edit-form',
  afterModel: function (model) {
    let _this = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      let modelName = 'fd-project';
      let builder = new Builder(_this.store, modelName)
        .select('id,name')
        .top(1);

      _this.store.query(modelName, builder.build()).then((projects)=> {
        model.set('project', projects.toArray()[0]);
        resolve();
      }).catch(error => { reject(error); });
    });
  }
});
