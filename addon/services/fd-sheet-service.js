import Service from '@ember/service';
import Evented from '@ember/object/evented';
import $ from 'jquery';
import { later, schedule } from '@ember/runloop';

export default Service.extend(Evented, {
  sheetSettings: undefined,

  init() {
    this._super(...arguments);

    this.set('sheetSettings', { visibility: { }, expanded: { }, currentItem: { } });
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
    this.set(`sheetSettings.currentItem.${sheetName}`, currentItem);
    $('.pushable').addClass('fade');
    $('.fd-sheet.visible.expand .content-mini').addClass('fade');

    let sidebarWidth = $('.ui.sidebar.main.menu').width();

    let sheetTranslate = `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
    $(`.fd-sheet.${sheetName}`).css({ 'transform': sheetTranslate });

    // Сбрасываем стиль с кнопки сайдбара.
    $('.toggle-sidebar').removeClass('expanded');
  },

  /**
    Closes specified sheet.

     @method closeSheet
     @param {String} sheetName Sheet's component name
  */
  closeSheet(sheetName) {
    let currentSheet = $(`.fd-sheet.${sheetName}`);
    this.trigger('sheetUnsavedDataTrigger', sheetName);
    this.trigger('closeSheetTriggered', sheetName);
    this.set(`sheetSettings.visibility.${sheetName}`, false);
    this.set(`sheetSettings.expanded.${sheetName}`, false);

    if ($('.fd-sheet.visible').length < 2) {
      $('.pushable').removeClass('fade');

      // Сбрасываем стиль с кнопки сайдбара.
      $('.toggle-sidebar').removeClass('expanded');
    } else {
      if ($('.fd-sheet.visible').hasClass('expand')) {

        // Затемняем кнопку сайдбара.
        $('.toggle-sidebar').addClass('expanded');
        $('.toggle-sidebar').addClass('no-delay');
      }
    }

    $('.fd-sheet.visible.expand .content-mini').removeClass('fade');
    currentSheet.css({ 'transform': '' });

    later(function() {
      $('.content-mini', currentSheet).css({ width: '' });
      $('.toggle-sidebar').removeClass('no-delay');
    }, 1000);
  },

  /**
    Close sheet when call save and close.

     @method closeSheetAfterSave
     @param {String} sheetName Sheet's component name
  */
  closeSheetAfterSave(sheetName) {
    this.trigger('closeSheetAfterSaveTrigger', sheetName); 
  },

  /**
    Transition from opened sheet.

     @method transitionFromSheet
     @param {Object} transition Transition, getted from route
     @param {String} sheetName Sheet's component name
  */
  transitionFromSheet(transition, sheetName, viewName) {
    this.trigger('transitionFromSheetTrigger', transition, sheetName, viewName); 
  },

  /**
    Expands specified sheet.

     @method expand
     @param {String} sheetName Sheet's component name
  */
  expand(sheetName) {
    let sidebarWidth = $('.ui.sidebar.main.menu').width();

    let currentSheet = $(`.fd-sheet.${sheetName}`);
    let sheetTranslate =  `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
    currentSheet.css({ 'transform': sheetTranslate });

    let contentWidth = this.get(`sheetSettings.expanded.${sheetName}`) ? '50%' : `calc(100% - ${sidebarWidth}px)`;

    // Затемняем кнопку сайдбара.
    $('.toggle-sidebar').toggleClass('expanded');

    schedule('afterRender', this, () => {
      this.toggleProperty(`sheetSettings.expanded.${sheetName}`);
    });

    this.animatingSheetContent(sheetName, contentWidth, 600);
  },

  /**
    Sets toolbar diagram position.

     @method toolbarDiagramPosition
  */
  toolbarDiagramPosition() {
    let diagramToolbar = $('.fd-uml-diagram-toolbar');
    if (diagramToolbar.length > 0) {
      let jointPaper = $('.joint-paper');
      jointPaper.css('margin-bottom', diagramToolbar.height());
      let diagramToolbarBottom = jointPaper.width() <= $('.fd-uml-diagram-editor').width() ? 0 : this.getScrollbarWidth();
      diagramToolbar.css('bottom', diagramToolbarBottom);
      jointPaper.css('margin-bottom', diagramToolbar.height());
    }
  },

  /**
    Gets scrollbar width.

     @method getScrollbarWidth
  */
  getScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';

    // needed for WinJS apps
    outer.style.msOverflowStyle = 'scrollbar';

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;

    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  },

  /**
    Expands specified sheet.

     @method expand
     @param {String} sheetName Sheet's component name
  */
  animatingSheetContent(sheetName, contentWidth, speed, containsName) {
    $(`.fd-sheet.${sheetName} .content-mini`).css({ opacity: 0.2 });

    let _this = this;
    later(function() {
      $(`.fd-sheet.${sheetName} .content-mini`).css({ opacity: '', width: contentWidth });
      _this.toolbarDiagramPosition();
      _this.trigger('diagramResizeTriggered', sheetName, containsName);
    }, speed);
  },
});
