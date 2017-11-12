import ClassModel from './fd-class';
import { Model as DevClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-class';

let Model = ClassModel.extend(DevClassMixin, {
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
