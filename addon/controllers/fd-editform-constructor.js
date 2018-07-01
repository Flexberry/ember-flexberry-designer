import Ember from 'ember';

import FdEditformRow from '../objects/fd-editform-row';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Controller.extend({
  queryParams: ['classId'],

  /**
    @private
    @property _showModalDialog
    @type Boolean
    @default false
  */
  _showModalDialog: false,

  /**
    The current dragged item.

    @private
    @property _draggedItem
    @type FdEditformRow|FdEditformControl
  */
  _draggedItem: undefined,

  /**
    @private
    @property _selectedIsControl
    @readOnly
    @type Boolean
  */
  _selectedIsControl: Ember.computed('selectedItem', function() {
    return this.get('selectedItem') instanceof FdEditformControl;
  }).readOnly(),

  /**
    @private
    @property _selectedIsGroup
    @readOnly
    @type Boolean
  */
  _selectedIsGroup: Ember.computed('selectedItem', function() {
    return this.get('selectedItem') instanceof FdEditformGroup;
  }).readOnly(),

  /**
    @private
    @property _selectedIsTab
    @readOnly
    @type Boolean
  */
  _selectedIsTab: Ember.computed('selectedItem', function() {
    return this.get('selectedItem') instanceof FdEditformTab;
  }).readOnly(),

  /**
    Container of the selected item.

    @private
    @property _selectedItemContainer
    @readOnly
    @type Ember.NativeArray|FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab
  */
  _selectedItemContainer: Ember.computed('selectedItem', function() {
    return this._findItemContainer(this.get('selectedItem'));
  }).readOnly(),

  /**
    The selected item.

    @property selectedItem
    @type {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab}
  */
  selectedItem: undefined,

  actions: {
    /**
      Adds a new control to the form.

      @method actions.addControl
    */
    addControl() {
      this._addControl(FdEditformControl.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-control-caption').toString()} #${this.incrementProperty('_newControlIndex')}`,
      }));
    },

    /**
      Adds a new group to the form.

      @method actions.addGroup
    */
    addGroup() {
      this._addControl(FdEditformGroup.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-group-caption').toString()} #${this.incrementProperty('_newGroupIndex')}`,
        rows: Ember.A(),
      }));
    },

    /**
      Adds a new tab to the form.

      @method actions.addTab
    */
    addTab() {
      this._addControl(FdEditformTab.create({
        caption: `${this.get('i18n').t('forms.fd-editform-constructor.new-tab-caption').toString()} #${this.incrementProperty('_newTabIndex')}`,
        rows: Ember.A(),
      }));
    },

    /**
      Removes the selected item.

      @method actions.removeSelectedItem
      @param {Boolean} approve The user is sure.
    */
    removeSelectedItem(approve) {
      if (approve) {
        this._removeItem(this.get('selectedItem'));
        this.set('selectedItem', undefined);
      } else {
        this.set('_showModalDialog', true);
      }
    },

    /**
      Close edit form constructor and go to application structure constructor.

      @method actions.close
    */
    close() {
      this.transitionToRoute('fd-appstruct-form');
    },

    /**
      Set the selected item.

      @method actions.selectItem
      @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item
    */
    selectItem(item) {
      this.set('selectedItem', this.get('selectedItem') === item ? undefined : item);
    },

    /**
      Set the current dragged item.

      @method actions.setDragItem
      @param {FdEditformRow|FdEditformControl} item New dragged item.
    */
    setDragItem(item) {
      this.set('_draggedItem', item);
    },

    /**
      Get the current dragged item.

      @method actions.getDragItem
      @return {FdEditformRow|FdEditformControl} The current dragged item or `undefined`.
    */
    getDragItem() {
      return this.get('_draggedItem');
    },

    /**
      Move the current dragged item above or below relative to the passed item.

      @method actions.moveDragItem
      @param {FdEditformRow|FdEditformControl} item The item above or below which will be moved the current dragged item.
      @param {String} direction The direction of the item move, allowed values: 'up' or 'down'.
    */
    moveDragItem(item, direction) {
      let draggedItem = this.get('_draggedItem');
      if (this._findItemContainer(item, Ember.A([draggedItem])) === null) {
        let rows = this.get('model.controls');
        let draggedItemContainer = this._findItemContainer(draggedItem, rows);
        draggedItemContainer.removeObject(draggedItem);

        let itemContainer;
        let index = draggedItemContainer.indexOf(item);
        if (index === -1) {
          itemContainer = this._findItemContainer(item, rows);
          index = itemContainer.indexOf(item);
        } else {
          itemContainer = draggedItemContainer;
        }

        if (direction === 'down') {
          index = Math.min(itemContainer.get('length'), index + 1);
        }

        itemContainer.insertAt(index, draggedItem);
      }
    },
  },

  /**
    Depending on the selected item, adds a new control to the form.

    @method _addControl
    @param {FdEditformControl|FdEditformGroup|FdEditformTab} control The control to add.
  */
  _addControl(control) {
    let index;
    let target;

    if (control instanceof FdEditformTab) {
      control = FdEditformTabgroup.create({ tabs: Ember.A([control]) });
    }

    let selectedItem = this.get('selectedItem');
    if (selectedItem instanceof FdEditformRow) {
      target = selectedItem.get('controls');
    } else if (selectedItem instanceof FdEditformControl) {
      target = this.get('_selectedItemContainer.controls');
      index = target.indexOf(selectedItem) + 1;
    } else if (selectedItem instanceof FdEditformGroup || selectedItem instanceof FdEditformTab) {
      target = selectedItem.get('rows');
      control = FdEditformRow.create({ controls: Ember.A([control]) });
    } else if (selectedItem instanceof FdEditformTabgroup) {
      if (control instanceof FdEditformTabgroup) {
        target = selectedItem.get('tabs');
        control = control.get('tabs.firstObject');
      } else {
        target = selectedItem.get('activeTab.rows');
        control = FdEditformRow.create({ controls: Ember.A([control]) });
      }
    } else {
      target = this.get('model.controls');
      control = FdEditformRow.create({ controls: Ember.A([control]) });
    }

    if (typeof index !== 'number') {
      index = target.get('length');
    }

    target.insertAt(index, control);
  },

  /**
    Removes the specified item from the form.

    @method _removeItem
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item The item that need to remove.
  */
  _removeItem(item) {
    let container = this._findItemContainer(item);
    if (container instanceof FdEditformRow) {
      if (container.get('controls.length') === 1) {
        this._removeItem(container);
      } else {
        container.get('controls').removeObject(item);
      }
    } else if (container instanceof FdEditformTabgroup) {
      if (container.get('tabs.length') === 1) {
        this._removeItem(container);
      } else {
        container.get('tabs').removeObject(item);
        container.set('activeTab', container.get('tabs.firstObject'));
      }
    } else if (container instanceof FdEditformGroup || container instanceof FdEditformTab) {
      container.get('rows').removeObject(item);
    } else {
      container.removeObject(item);
    }
  },

  /**
    Looks for a container that contains the item.

    @method _findItemContainer
    @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} item
      The sought item.
    @param {Ember.NativeArray|FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab} [container]
      The container from which to start the search, if not specified, uses `model.controls`.
    @return {Ember.NativeArray|FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab}
      The container that was found or `null`.
  */
  _findItemContainer(item, container = this.get('model.controls')) {
    let foundContainer;
    if (container instanceof FdEditformControl) {
      foundContainer = null;
    } else if (container instanceof FdEditformRow && container.get('controls').indexOf(item) === -1) {
      foundContainer = this._findItemContainer(item, container.get('controls'));
    } else if (container instanceof FdEditformTabgroup && container.get('tabs').indexOf(item) === -1) {
      foundContainer = this._findItemContainer(item, container.get('tabs'));
    } else if (container instanceof FdEditformGroup || container instanceof FdEditformTab && container.get('rows').indexOf(item) === -1) {
      foundContainer = this._findItemContainer(item, container.get('rows'));
    } else if (Ember.isArray(container) && container.indexOf(item) === -1) {
      let index = 0;
      let length = container.get('length');
      while (index < length && !foundContainer) {
        foundContainer = this._findItemContainer(item, container.objectAt(index++));
      }
    } else {
      foundContainer = container;
    }

    return foundContainer;
  },
});
