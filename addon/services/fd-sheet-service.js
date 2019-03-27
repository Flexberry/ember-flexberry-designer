import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  sheetSettings: undefined,

  init() {
    this._super(...arguments);

    this.set('sheetSettings', { visibility: { }, expanded: { } });
  },

  /**
    Returns specified sheet's visibility.

     @method isVisible
     @param {String} sheetName Sheet's component name
  */
  isVisible(sheetName) {
    return this.get(`sheetSettings.visibility.${sheetName}`);
  },

  /**
    Opens specified sheet.

     @method openSheet
     @param {String} sheetName Sheet's component name
     @param {Object} currentItem Current list item
  */
  openSheet(sheetName, currentItem) {
    this.trigger('openSheetTriggered', sheetName, currentItem);
    this.set(`sheetSettings.visibility.${sheetName}`, true);
    Ember.$('.pushable').addClass('fade');

    let sidebarWidth = Ember.$('.ui.sidebar.main.menu').width();

    let sheetTranslate = `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
    Ember.$(`.fd-sheet.${sheetName}`).css({ 'transform': sheetTranslate });
  },

  /**
    Closes specified sheet.

     @method closeSheet
     @param {String} sheetName Sheet's component name
  */
  closeSheet(sheetName) {
    this.trigger('closeSheetTriggered', sheetName);
    this.set(`sheetSettings.visibility.${sheetName}`, false);
    this.set(`sheetSettings.expanded.${sheetName}`, false);
    let currentSheet = Ember.$(`.fd-sheet.${sheetName}`);

    if (Ember.$('.fd-sheet.visible').length < 2) {
      Ember.$('.pushable').removeClass('fade');
    }

    currentSheet.css({ 'transform': '' });

    // Сбрасываем стиль с кнопки сайдбара.
    Ember.$('.toggle-sidebar').removeClass('expanded');

    Ember.run.later(function() {
      Ember.$('.content-mini', currentSheet).css({ width: '' });
    }, 1000);
  },

  /**
    Expands specified sheet.

     @method expand
     @param {String} sheetName Sheet's component name
  */
  expand(sheetName) {
    let sidebarWidth = Ember.$('.ui.sidebar.main.menu').width();

    let currentSheet = Ember.$(`.fd-sheet.${sheetName}`);
    let sheetTranslate =  `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
    currentSheet.css({ 'transform': sheetTranslate });

    let contentWidth = this.get(`sheetSettings.expanded.${sheetName}`) ? '50%' : `calc(100% - ${sidebarWidth}px)`;

    // Затемняем кнопку сайдбара.
    Ember.$('.toggle-sidebar').toggleClass('expanded');

    Ember.run.schedule('afterRender', this, () => {
      this.toggleProperty(`sheetSettings.expanded.${sheetName}`);
    });

    this.animatingSheetContent(sheetName, contentWidth, 600);
  },

  /**
    Expands specified sheet.

     @method expand
     @param {String} sheetName Sheet's component name
  */
  animatingSheetContent(sheetName, contentWidth, speed) {
    Ember.$(`.fd-sheet.${sheetName} .content-mini`).css({ opacity: 0.2 });

    Ember.run.later(function() {
      Ember.$(`.fd-sheet.${sheetName} .content-mini`).css({ opacity: '', width: contentWidth });
    }, speed);
  }
});
