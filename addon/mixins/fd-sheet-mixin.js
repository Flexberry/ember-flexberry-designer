import Ember from 'ember';

export default Ember.Mixin.create({

  commonVisible: {
    'visible': ''
  },

  actions: {
    openSheet() {
      let visible =  this.get('commonVisible').visible === '' ? 'visible' : '';
      this.set('commonVisible.visible', visible);
      Ember.$('.pushable').addClass('fade');
    }
  }
});
