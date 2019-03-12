import Ember from 'ember';
import { schedule } from '@ember/runloop';
import layout from '../templates/components/fd-sheet';
import fdSheetMixin from '../mixins/fd-sheet-mixin';

export default Ember.Component.extend(fdSheetMixin, {
  layout,

  title: '',

  expand: false,

  actions: {
    closeSheet() {
      this.set('commonVisible.visible', '');
      this.set('expand', false);
      let currentSheet = Ember.$('.fd-sheet', this.element);
      Ember.$('.pushable').removeClass('fade');
      currentSheet.css({ 'transform': '' });

      // Сбрасываем стиль с кнопки сайдбара.
      Ember.$('.toggle-sidebar').removeClass('expanded');
      this.deactivateListItem();

      Ember.run.later(function() {
        Ember.$('.content-mini', currentSheet).css({ width: '' });
      }, 1000);
    },

    expand() {
      let sidebarWidth = Ember.$('.ui.sidebar.main.menu').width();

      let currentSheet = Ember.$('.fd-sheet', this.element);
      let sheetTranslate =  `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
      currentSheet.css({ 'transform': sheetTranslate });

      let contentWidth = this.expand ? '50%' : `calc(100% - ${sidebarWidth}px)`;

      // Затемняем кнопку сайдбара.
      Ember.$('.toggle-sidebar').toggleClass('expanded');

      schedule('afterRender', this, () => {
        this.toggleProperty('expand');
      });

      this.send('animatingSheetContent', contentWidth, 600);
    },

    save() {
    }
  }
});
