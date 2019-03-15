import Component from '@ember/component';
import $ from 'jquery';
import { run } from '@ember/runloop';
import layout from '../templates/components/fd-sheet';
import fdSheetMixin from '../mixins/fd-sheet-mixin';

export default Component.extend(fdSheetMixin, {
  layout,

  title: '',

  expand: false,

  actions: {
    closeSheet() {
      this.set('commonVisible.visible', '');
      this.set('expand', false);
      let currentSheet = $('.fd-sheet', this.element);
      $('.pushable').removeClass('fade');
      currentSheet.css({ 'transform': '' });

      // Сбрасываем стиль с кнопки сайдбара.
      $('.toggle-sidebar').removeClass('expanded');
      this.deactivateListItem();

      run.later(function() {
        $('.content-mini', currentSheet).css({ width: '' });
      }, 1000);
    },

    expand() {
      let sidebarWidth = $('.ui.sidebar.main.menu').width();

      let currentSheet = $('.fd-sheet', this.element);
      let sheetTranslate =  `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
      currentSheet.css({ 'transform': sheetTranslate });

      let contentWidth = this.expand ? '50%' : `calc(100% - ${sidebarWidth}px)`;

      // Затемняем кнопку сайдбара.
      $('.toggle-sidebar').toggleClass('expanded');

      run.schedule('afterRender', this, () => {
        this.toggleProperty('expand');
      });

      this.send('animatingSheetContent', contentWidth, 600);
    },

    save() {
    }
  }
});
