import Ember from 'ember';

export default Ember.Mixin.create({

  commonVisible: {
    'visible': ''
  },

  actions: {
    openSheet() {
      this.set('commonVisible.visible', 'visible');
      Ember.$('.pushable').addClass('fade');

      let sidebarWidth = Ember.$('.ui.sidebar.main.menu').width();

      let sheetTranslate = `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
      Ember.$('.fd-sheet').css({ 'transform': sheetTranslate });
    },

    animatingSheetContent(contentWidth, speed) {
      Ember.$('.fd-sheet .content-mini').css({ opacity: 0.2 });

      Ember.run.later(function() {
        Ember.$('.fd-sheet .content-mini').css({ opacity: '', width: contentWidth });
      }, speed);
    }
  }
});
