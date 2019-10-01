import Service from '@ember/service';
import Evented from '@ember/object/evented';
import $ from 'jquery';
import { later, schedule } from '@ember/runloop';
import { isBlank, isNone } from '@ember/utils';

export default Service.extend(Evented, {
  /**
    Origin json diagram data.

    @private
    @property _originJsonDiagramData
    @type String
    @default undefined
  */
  _originJsonDiagramData: undefined,

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
    this.set('abortedTransitionFromSheet', undefined);

    if (unsavedData) {
      this.trigger('confirmCloseTrigger', sheetName, currentItem);
    } else {
      this.trigger('openSheetTriggered', sheetName, currentItem);
      this.set(`sheetSettings.visibility.${sheetName}`, true);
      this.set(`sheetSettings.currentItem.${sheetName}`, currentItem);

      const primitivesJsonData = this.getJsonFromDiagramModel(this.getSheetModel(sheetName));
      this.set('_originJsonDiagramData', primitivesJsonData);

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
    let currentSheet = $(`.fd-sheet.${sheetName}`);

    const unsavedData = this.findUnsavedSheetData(sheetName);

    if (unsavedData) {
      this.trigger('confirmCloseTrigger', sheetName, this.get(`sheetSettings.currentItem.${sheetName}`));
    } else {
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
    }
  },

  /**
    Transition from opened sheet.

     @method closeSheet
     @param {Object} transition Transition
     @param {String} sheetName Sheet's component name
     @param {String} viewName View's component name
  */
  transitionFromSheet(transition, sheetName) {
    const isUnsavedData = this.findUnsavedSheetData(sheetName);

    if (isUnsavedData) {
      transition.abort();
      this.set('abortedTransitionFromSheet', transition);
      this.trigger('confirmCloseTrigger', sheetName, this.get(`sheetSettings.currentItem.${sheetName}`));
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
      let diagramHasChanges = this.findDiagramChanges(currentItemModel);
      let sheetHasChanges = currentItemModel.hasDirtyAttributes;

      isDirty = (diagramHasChanges || sheetHasChanges);
    }

    return isDirty;
  },

  /**
    Check if sheet has unsaved data.

     @method findDiagramChanges
     @param {diagramModel} sheetName item diagram model
  */
  findDiagramChanges(diagramModel) {
    let hasChanges = false;
    const currentDiagramPrimitivesJson = this.getJsonFromDiagramModel(diagramModel);
    if (!isNone(currentDiagramPrimitivesJson)) {
      const originDiagramPrimitivesJson = this.get('_originJsonDiagramData');
      hasChanges = (!isNone(originDiagramPrimitivesJson)) ? (currentDiagramPrimitivesJson !== originDiagramPrimitivesJson) : false;
    }

    return hasChanges;
  },

  /**
    Get sheet model.

    @method getSheetModel
    @param {Object} diagramModel model
  */
  getJsonFromDiagramModel(diagramModel) {
    let jsonString = undefined;
    if (!isNone(diagramModel)) {
      const primitives = diagramModel.get('primitives');
      if (!isNone(primitives)) {
        jsonString = JSON.stringify(primitives);
      }
    }

    return jsonString;
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

    let currentItemModel = this.get(`sheetSettings.currentItem.${sheetName}.model.data`);

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
    let model = this.getSheetModel(sheetName);
    model.rollbackAttributes();
  }
});
