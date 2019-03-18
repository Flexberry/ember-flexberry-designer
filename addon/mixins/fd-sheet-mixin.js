import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { A } from '@ember/array';

export default Mixin.create({

  /**
    Array active list items.

    @property activeItemsArray
    @type undefined
  */
  activeItemsArray: undefined,

  commonVisible: {
    'visible': ''
  },

  /**
    Deactivate items from activeItemsArray and cleans array.

    @method deactivateListItem
  */
  deactivateListItem() {
    let activeItemsArray = this.get('activeItemsArray');
    if (activeItemsArray.lenght !== 0) {
      activeItemsArray.forEach((activeItem) => {
        activeItem.set('fdListItemActive', undefined);
      });

      activeItemsArray.clear();
    }
  },

  actions: {
    openSheet(currentItem) {
      if (!isNone(currentItem)) {
        let activeItemsArray = this.get('activeItemsArray');
        activeItemsArray.pushObject(currentItem);
      }

      this.set('commonVisible.visible', 'visible');
      $('.pushable').addClass('fade');

      let sidebarWidth = $('.ui.sidebar.main.menu').width();

      let sheetTranslate = `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
      $('.fd-sheet').css({ 'transform': sheetTranslate });
    },

    animatingSheetContent(contentWidth, speed) {
      $('.fd-sheet .content-mini').css({ opacity: 0.2 });

      run.later(function() {
        $('.fd-sheet .content-mini').css({ opacity: '', width: contentWidth });
      }, speed);
    }
  },

  init() {
    this._super(...arguments);
    this.set('activeItemsArray', A());
  }
});
