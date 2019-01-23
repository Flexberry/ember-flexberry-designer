import Ember from 'ember';

export default Ember.Controller.extend({

  actions:{
    openRightPanel() {
      Ember.$('.sheetID').addClass('visible');
      Ember.$('.pushable').addClass('fade');
    },

    close(){
      Ember.$('.sheetID').removeClass('visible');
      Ember.$('.pushable').removeClass('fade');
    }
  }
});
