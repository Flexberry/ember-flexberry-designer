import Component from '@ember/component';
import layout from '../templates/components/fd-data-source-customizer-list';
import $ from 'jquery';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import FdClassExternalStoreInstancesInType from '../objects/fd-storeinstancesintype';
import { deserialize, serialize } from '../utils/transforms-utils/fd-storeinstancesintype';
import { isNone, isEmpty } from '@ember/utils';

export default Component.extend({
  layout,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property tagName
  */
  tagName: '',

  /**
    Flag: indicates whether component is readonly.

    @property readonly
    @type Boolean
    @default false
   */
  readonly: false,

  /**
    Flag: indicates whether card is view.

    @property isOpenTable
    @type Boolean
    @default false
   */
  isOpenTable: false,

  /**
    Model with DSE data.

    @property modelDse
    @type Object
  */
  modelDse: undefined,

  /**
    DSE data.

    @property stringDse
    @type String
  */
  stringDse: undefined,

  /**
    Title by DSE data.

    @property stringDse
    @type String
  */
  titleValue: computed('stringDse', function() {
    let stringDse = this.get('stringDse');
    if (isNone(stringDse)) {
      return '';
    }

    let modelArray = deserialize(stringDse);
    let modelDseMap = modelArray.map(x => `${x.data}`);

    return modelDseMap.join(';');
  }),

  /**
    Table headers for DSE.

    @property tableViewDse
    @type Array
  */
  tableViewDse: computed(() => ([
    {
      columnCaption: 'components.fd-data-source-customizer-list.dataService-caption',
      columnProperty: 'dataService',
      attrPlaceholder: 'components.fd-data-source-customizer-list.dataService-placeholder',
    },
    {
      columnCaption: 'components.fd-data-source-customizer-list.dataService-expression-caption',
      columnProperty: 'data',
      attrPlaceholder: 'components.fd-data-source-customizer-list.dataService-expression-placeholder',
    }
  ])),

  /**
    Button locale path for DSE.

    @property dseButton
    @type Object
  */
  dseButton: computed(() => ({
    createBtn: 'components.fd-data-source-customizer-list.create-btn',
    deleteBtn: 'components.fd-data-source-customizer-list.delete-btn',
  })),

  setActualModel() {
    let stringDse = this.get('stringDse');
    let modelDse = deserialize(stringDse);
    this.set('modelDse', modelDse);
  },

  /**
    Removes document-level handlers if the component is destroyed while the
    DSE card is still open (e.g. a table row is removed).

    @method willDestroy
  */
  willDestroy() {
    this._super(...arguments);
    this._clearDseHandlers();
  },

  /**
    Removes document-level handlers registered while the DSE card is open.

    @method _clearDseHandlers
  */
  _clearDseHandlers() {
    if (this._onDocumentMousedown) {
      $(document).off('mousedown.dse', this._onDocumentMousedown);
    }
    if (this._onScrollCapture) {
      document.removeEventListener('scroll', this._onScrollCapture, true);
    }
    this._onDocumentMousedown = null;
    this._onScrollCapture = null;
  },

  /**
    Performs the actual close: persists the model and removes the handlers.

    @method performClose
  */
  performClose() {
    this.setActualModel();
    this.set('isOpenTable', false);
    this._clearDseHandlers();
  },

  /**
    Close DSE table.

    @method closeTable
    @param {jQuery.Event} e
    @param {Boolean} close Force closing regardless of the click position.
  */
  closeTable(e, close) {
    e.stopPropagation();

    const insideCard = $(e.target).closest(`.custom.table.dse`).length > 0;
    const onTrigger = $(e.target).closest(`.button.dse.active`).length > 0;
    if ((!insideCard && !onTrigger) || close) {
      this.performClose();
    }
  },

  /**
    Positions the opened DSE card. The node stays in its Ember-managed place
    (so closing/removing works normally) and uses `position: fixed`. Because
    `.fd-sheet` has a `transform`, the fixed containing block becomes the sheet
    itself — which sits above the horizontally scrolled `.fd-table` and the
    `overflow: auto` `.fd-sheet-body` — so they neither clip the card nor add
    it to their scroll area. Each row keeps its own card (its own instance data).

    @method positionTable
    @param {HTMLElement} trigger Button that opened the card.
  */
  positionTable(trigger) {
    const $trigger = $(trigger);
    const $dse = $trigger.closest('.ui.action.input').parent().find('.ui.card.custom.table.dse').first();

    if ($dse.length === 0) {
      return;
    }

    const $sheet = $trigger.closest('.fd-sheet');
    const rect = $trigger[0].getBoundingClientRect();
    const sheetRect = $sheet.length > 0 ? $sheet[0].getBoundingClientRect() : { top: 0, left: 0 };
    const top = (rect.bottom - sheetRect.top) + 8;
    const left = Math.max(8, (rect.right - sheetRect.left) - 600 - 8);

    $dse.css({
      top: top + 'px',
      left: left + 'px',
      zIndex: 2000,
      visibility: 'visible'
    });
  },

  actions: {

    /**
      Open DSE table.

       @method actions.openTable
       @param {jQuery.Event} e
    */
    openTable(e) {
      e.stopPropagation();
      if (this.get('isOpenTable')) {
        return;
      }

      this.setActualModel();
      this.set('isOpenTable', true);
      scheduleOnce('afterRender', this, this.positionTable, e.currentTarget);

      this._onDocumentMousedown = (event) => this.closeTable(event, false);
      $(document).on('mousedown.dse', this._onDocumentMousedown);

      this._onScrollCapture = (event) => {
        let target = event.target;
        if ($(target).closest(`.custom.table.dse`).length > 0) {
          return;
        }
        if (this.get('isOpenTable')) {
          this.performClose();
        }
      };
      document.addEventListener('scroll', this._onScrollCapture, true);
    },

    /**
      Create DSE.

      @method actions.createUserAccess
    */
    createItem() {
      let model = this.get('modelDse');
      model.pushObject(FdClassExternalStoreInstancesInType.create({
        dataService: 'ICSSoft.STORMNET.Business.PostgresDataService',
        data: '',
      }));
    },

    /**
      Remove DSE.

      @method actions.deleteItem
    */
    deleteItem(selectedValues) {
      let model = this.get('modelDse');
      model.removeObjects(selectedValues);
      selectedValues.clear();
    },

    /**
      Update 'stringDse'.

      @method actions.deleteItem
    */
    applySettings(e) {
      let model = this.get('modelDse');
      let clearModel = model.filter(function(item) {
        return !(isEmpty(item.get('dataService')) && isEmpty(item.get('data')));
      });

      let newStrinDse = serialize(clearModel);
      this.set('stringDse', newStrinDse);
      this.setActualModel();

      this.closeTable(e, true);
    }
  }
});
