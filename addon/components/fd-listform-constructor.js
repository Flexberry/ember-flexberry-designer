import Component from '@ember/component';
import layout from '../templates/components/fd-listform-constructor';

import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import $ from 'jquery';

import FdListformColumn from '../objects/fd-listform-column';

import { copyViewDefinition } from '../utils/fd-copy-view-definition';
import { updateClassOnDiagram } from '../utils/fd-update-class-diagram';

export default Component.extend({
  layout,

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Flag: indicates whether show tree.

    @private
    @property _showNotUsedAttributesTree
    @type Boolean
    @default false
  */
  _showNotUsedAttributesTree: false,

  /**
    Empty rows array, for 10 rows render.

    @property rows
    @type Array
   */
  rows: A(Array.apply(null, { length: 10 })),

  /**
    @private
    @property _selectedIsFirst
    @readOnly
    @type Boolean
  */
  _selectedIsFirst: computed('selectedColumn', 'columns.[]', function() {
    return this.get('selectedColumn') === this.get('columns.firstObject');
  }).readOnly(),

  /**
    @private
    @property _selectedIsLast
    @readOnly
    @type Boolean
  */
  _selectedIsLast: computed('selectedColumn', 'columns.[]', function() {
    return this.get('selectedColumn') === this.get('columns.lastObject');
  }).readOnly(),

  formClass: computed.alias('model.listform'),

  view: computed.alias('model.view'),

  dataObject: computed.alias('model.dataobject'),

  /**
    The selected column.

    @property selectedColumn
    @type FdListformColumn
  */
  selectedColumn: undefined,

  /**
    Columns of the table in the list form.

    @property columns
    @type FdListformColumn[]
    @readOnly
  */
  columns: computed('view.definitionArray', function() {
    let columns = A();
    let definition = this.get('view.definitionArray');
    let length = definition.get('length');
    for (let i = 0; i < length; i++) {
      columns.pushObject(FdListformColumn.create({
        propertyDefinition: definition.objectAt(i),
      }));
    }

    return columns;
  }).readOnly(),

  actions: {
    /**
      Set the selected column.

      @method actions.selectColumn
      @param {FdListformColumn} column
      @param {Boolean} notTogglePanel
    */
    selectColumn(column, notTogglePanel) {
      let selectedColumn = this.get('selectedColumn');
      let configPanelSidebar = $('.ui.sidebar.config-panel');
      let sidebarOpened = configPanelSidebar.hasClass('visible');

      if (!notTogglePanel && selectedColumn !== column && (column || sidebarOpened)) {
        //this.send('toggleConfigPanel', { dataTab: 'control-properties' }, column);
      }

      this.set('selectedColumn', column);

      let newSelectedColumn = selectedColumn === column ? undefined : column;
      if (!isNone(newSelectedColumn) && newSelectedColumn.get('propertyDefinition.name') === '') {
        this.set('_showNotUsedAttributesTree', true);
      } else {
        this.set('_showNotUsedAttributesTree', false);
      }
    },

    /**
      Saves the form's metadata.

      @method actions.save
      @param {Boolean} close If `true`, the `close` action will be run after saving.
    */
    save(close) {
      this.get('appState').loading();
      let view = A(this.get('view'));
      let viewDefinition = A();
      let columns = this.get('columns');
      for (let i = 0; i < columns.get('length'); i++) {
        let column = columns[i];
        viewDefinition.pushObject(column.get('propertyDefinition'));
      }

      view.set('definition', viewDefinition);

      let formName = this.get('formClass.name');
      if (this.get('formClass.isNew')) {
        this.set('formClass.caption', formName);
        this.set('formClass.stereotype', '«listform»');
        this.set('view.name', `${formName}ViewL`);
        this.set('formClass.formViews.firstObject.name', 'listview');
      }

      if (this.get('dataObject.isNew')) {
        this.set('dataObject.name', `${formName}Object`);
        this.set('dataObject.caption', `${formName}Object`);
      }

      let dataobject = this.get('dataObject');
      if (isNone(dataobject.get('caption'))) {
        dataobject.set('caption', dataobject.get('name'));
      }

      let formClass = this.get('formClass');
      if (isNone(formClass.get('caption'))) {
        formClass.set('caption', formClass.get('name'));
      }

      let attributes = dataobject.get('attributes');
      let changedAttributes = attributes.filterBy('hasDirtyAttributes');

      let association = this.get('store').peekAll('fd-dev-association');
      let changedAssociations = association.filterBy('hasDirtyAttributes');

      let aggregation = this.get('store').peekAll('fd-dev-aggregation');
      let changedAggregation = aggregation.filterBy('hasDirtyAttributes');

      dataobject.save().then(() => {
        formClass.save().then(() => {
          updateClassOnDiagram.call(this, this.get('store'), formClass).then(() => {
            this.get('view').save().then(() => {
              this.get('formClass.formViews.firstObject').save().then(() => {
                this.set('class', undefined);
                this.set('form', this.get('formClass.id'));
                this.get('appState').reset();
                if (close) {
                  this.send('close');
                }
              }, (error) => {
                this.get('appState').reset();
                this.set('error', error);
              });
            }, (error) => {
              this.get('appState').reset();
              this.set('error', error);
            });
          }, (error) => {
            this.get('appState').reset();
            this.set('error', error);
          });
          this.set('model.originalDefinition', copyViewDefinition(this.get('view.definition')));
          changedAttributes.map(a => a.save());
          changedAssociations.map(a => a.save());
          changedAggregation.map(a => a.save());
        }, (error) => {
          this.get('appState').reset();
          this.set('error', error);
        });
      }, (error) => {
        this.get('appState').reset();
        this.set('error', error);
      });
    },

    /**
      Don't set attribute in control.

      @method actions.deleteEmptyControl
    */
    deleteEmptyControl() {
      let columns = this.get('columns');
      let selectedColumn = this.get('selectedColumn');
      columns.removeObject(selectedColumn);
      this.set('selectedColumn', undefined);
      this.set('_showNotUsedAttributesTree', false);
    }
  },

  /**
    Scrolls the form to the selected control with jQuery.

    @private
    @method _scrollToSelected
  */
  _scrollToSelected() {
    let form = $('.form.list-form-constructor .panel-wrapper');
    let selectColumn = $('.fd-selected:first');
    let firstSelectedOffsetLeft = selectColumn.length > 0 ? selectColumn.offset().left : 0;
    let scrollLeft = firstSelectedOffsetLeft + form.scrollLeft() - (form.offset().left + 10);

    form.animate({ scrollLeft });
  }
});
