import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';
const { Builder } = Query;

export default Ember.Route.extend(FdLoadingForTransitionMixin, {

  formId: null,

  classId: null,

  beforeModel: function(params) {
    this.formId = params.queryParams.formId;
    this.classId = params.queryParams.classId;
  },

  model() {
    let store = this.get('store');

    let promise = new Ember.RSVP.Promise((resolve, reject) => {
      let fdControlModel = store.createRecord('fd-visual-edit-control',
      {
        isSelected: true,
        name: 'Some control',
        notNullable: true,
      });

      let editFormModel = store.createRecord('fd-visual-edit-form', {});
      editFormModel.get('controls').pushObject(fdControlModel);

      let modelBuilder = new Builder(this.store, 'fd-dev-class').
      selectByProjection('EditFormView').
      byId(this.formId);
      this.store.query('fd-dev-class', modelBuilder.build()).then((data)=> {
        editFormModel.set('id', this.formId);
        editFormModel.set('name', data.objectAt(0).get('name'));
        editFormModel.set('description', data.objectAt(0).get('description'));
        resolve(editFormModel);
      }).catch(reject);
    });

    return promise;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
  },
});
