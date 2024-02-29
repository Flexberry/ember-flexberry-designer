import Component from '@ember/component';
import layout from '../templates/components/fd-data-source-customizer-list';
import $ from 'jquery';
import { computed } from '@ember/object';
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
    Close DSE table.

    @method closeTable
    @param {jQuery.Event} e
  */
  closeTable(e, close) {
    e.stopPropagation();

    if ((($(e.target).closest(`.custom.table.dse`).length === 0) && ($(e.target).closest(`.button.dse.active`).length === 0)) || close) {
      this.setActualModel();
      this.set('isOpenTable', false);
      $(document).off(`mousedown.dse`);
    }
  },

  actions: {

    /**
      Open DSE table.

       @method actions.openTable
       @param {jQuery.Event} e
    */
    openTable(e) {
      e.stopPropagation();
      let isOpenTable = this.get('isOpenTable');
      if (!isOpenTable) {
        this.setActualModel();
        this.set('isOpenTable', true);

        $(document).on(`mousedown.dse`, this.closeTable.bind(this));
      }
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
