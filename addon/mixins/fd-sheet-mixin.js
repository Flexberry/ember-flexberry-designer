import Ember from 'ember';

export default Ember.Mixin.create({

  commonVisible: {
    'visible': ''
  },

  actions: {
    openSheet() {
      this.set('commonVisible.visible', 'visible');
      Ember.$('.pushable').addClass('fade');
    }
  }
});
