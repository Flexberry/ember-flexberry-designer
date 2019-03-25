import ClassModel from './fd-class';
import { Model as DevClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-class';
import DS from 'ember-data';

let Model = ClassModel.extend(DevClassMixin, {
  storeInstancesInType: DS.attr('fd-storeinstancesintype'),

  namePropertyeCompute: function() {
    //this.set('name', generateName(this.get('caption')));
  },

  // _initCaptionProperty: Ember.on('init', Ember.observer('caption', function() {
  //     Ember.run.once(this, '_namePropertyeCompute');
  //   }))
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
