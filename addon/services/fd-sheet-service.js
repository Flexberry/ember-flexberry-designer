import Service from '@ember/service';
import Evented from '@ember/object/evented';
import hasChanges from '../utils/model-has-changes';
import $ from 'jquery';
import { later, schedule } from '@ember/runloop';
import { isBlank, isNone } from '@ember/utils';
import { get } from '@ember/object';

export default Service.extend(Evented, {
  sheetSettings: undefined,

  /**
    Current transition from sheet.

    @property currentTransitionFromSheet
    @type Object
    @default undefined
  */
  abortedTransitionFromSheet: undefined,

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
    const unsavedData = this.findUnsavedSheetData(sheetName);

    if (unsavedData) {
      this.trigger('confirmCloseTrigger', sheetName, currentItem);
    } else {
      this.trigger('openSheetTriggered', sheetName, currentItem);
      this.set(`sheetSettings.visibility.${sheetName}`, true);

      let currentModel = !isNone(currentItem) && isBlank(get(currentItem, 'constructor.modelName')) ? currentItem.data : currentItem;
      this.set(`sheetSettings.currentItem.${sheetName}`, currentModel);

      $('.pushable').addClass('fade');
      $('.fd-sheet.visible.expand .content-mini').addClass('fade');

      let sidebarWidth = $('.ui.sidebar.main.menu').width();

      let sheetTranslate = `translate3d(calc(50% - ${sidebarWidth}px), 0, 0)`;
      $(`.fd-sheet.${sheetName}`).css({ 'transform': sheetTranslate });

      // Сбрасываем стиль с кнопки сайдбара.
      $('.toggle-sidebar').removeClass('expanded');
    }
  },

  /**
    Closes specified sheet.

     @method closeSheet
     @param {String} sheetName Sheet's component name
  */
  closeSheet(sheetName) {
    const unsavedData = this.findUnsavedSheetData(sheetName);

    if (unsavedData) {
      this.trigger('confirmCloseTrigger', sheetName, undefined);
    } else {
      this.trigger('closeSheetTriggered', sheetName);
      this.set(`sheetSettings.visibility.${sheetName}`, false);
      this.set(`sheetSettings.expanded.${sheetName}`, false);
      let currentSheet = $(`.fd-sheet.${sheetName}`);

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
    }

    const abortedTransitionFromSheet = this.get('abortedTransitionFromSheet');

    if (!isNone(abortedTransitionFromSheet)) {
        abortedTransitionFromSheet.retry();
    }
  },

  /**
    Transition from opened sheet.

     @method transitionFromSheet
     @param {Object} transition Transition
     @param {String} sheetName Sheet's component name
  */
  transitionFromSheet(transition, sheetName) {
    const isUnsavedData = this.findUnsavedSheetData(sheetName);

    if (isUnsavedData) {
      transition.abort();
      this.set('abortedTransitionFromSheet', transition);
      this.trigger('confirmCloseTrigger', sheetName, undefined);
    } else {
      this.closeSheet(sheetName);
    }
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
    Check if sheet has unsaved data.

     @method findUnsavedSheetData
     @param {String} sheetName Sheet's component name
  */
  findUnsavedSheetData(sheetName) {
    const currentItemModel = this.getSheetModel(sheetName);
    let isDirty = false;

    if (!isNone(currentItemModel)) {
      isDirty = hasChanges(currentItemModel) && !currentItemModel.get('isDeleted');
    }

    return isDirty;
  },

  /**
    Get sheet model.

    @method getSheetModel
    @param {String} sheetName Sheet's component name
  */
  getSheetModel(sheetName) {
    if (isBlank(sheetName)) {
      return null;
    }

    const currentItemModel = this.get(`sheetSettings.currentItem.${sheetName}`);

    return currentItemModel;
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

  /**
    Rollback currentItem.

     @method rollbackCurrentItem
     @param {String} sheetName Sheet's component name
  */
  rollbackCurrentItem(sheetName) {
    const model = this.getSheetModel(sheetName);
    model.rollbackAll();
  },

  /**
    Save currentItem.

     @method saveCurrentItem
     @param {String} sheetName Sheet's component name
     @param {Boolean} closeAfter Close after save.
  */
  saveCurrentItem(sheetName, closeAfter) {
    this.trigger('saveCurrentItemTrigger', sheetName, closeAfter);
  }
});
