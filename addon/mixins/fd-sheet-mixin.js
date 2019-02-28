import Ember from 'ember';

export default Ember.Mixin.create({

  /**
    Array active list items.

    @property activeItemsArray
    @type Array
  */
  activeItemsArray: Ember.A(),

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
      if (!Ember.isNone(currentItem)) {
        let activeItemsArray = this.get('activeItemsArray');
        activeItemsArray.pushObject(currentItem);
      }

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
