import Ember from 'ember';

import FdEditformRow from '../objects/fd-editform-row';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Controller.extend({
  queryParams: ['classId'],

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
    @type Ember.NativeArray
  */
  _selectedItemContainer: Ember.computed('selectedItem', function() {
    return this._findItemContainer(this.get('selectedItem'), this.get('model.controls'));
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
      target = this.get('_selectedItemContainer');
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
    Looks for a container that contains the item.

    @param {FdEditformRow|FdEditformControl} item The sought item.
    @param {Ember.Array} container The root container.
    @return {Ember.Array} The container that was found or `null`.
  */
  _findItemContainer(item, container) {
    if (item instanceof FdEditformRow) {
      return this._findRowContainer(item, container);
    } else {
      return this._findControlContainer(item, container);
    }
  },

  /**
    Looks for a container that contains the row.

    @method _findRowContainer
    @param {FdEditformRow} row The sought row.
    @param {Ember.Array} container The root container.
    @return {Ember.Array} The container that was found or `null`.
  */
  _findRowContainer(row, container) {
    let _container = null;
    if (container.indexOf(row) === -1) {
      let length = container.get('length');
      for (let i = 0; i < length; i++) {
        let controls = container.objectAt(i).get('controls');
        let length = controls.get('length');
        for (let i = 0; i < length; i++) {
          let control = controls.objectAt(i);
          if (control instanceof FdEditformGroup) {
            _container = this._findRowContainer(row, control.get('rows'));
          }

          if (control instanceof FdEditformTabgroup) {
            let tabs = control.get('tabs');
            let length = tabs.get('length');
            for (let i = 0; i < length; i++) {
              _container = this._findRowContainer(row, tabs.objectAt(i).get('rows'));
              if (_container) {
                break;
              }
            }
          }

          if (_container) {
            break;
          }
        }

        if (_container) {
          break;
        }
      }
    } else {
      _container = container;
    }

    return _container;
  },

  /**
    Looks for a container that contains the control.

    @method _findControlContainer
    @param {FdEditformControl} control The sought control.
    @param {Ember.Array} container The root container.
    @return {Ember.Array} The container that was found or `null`.
  */
  _findControlContainer(control, container) {
    let _container = null;
    let length = container.get('length');
    for (let i = 0; i < length; i++) {
      let controls = container.objectAt(i).get('controls');
      if (controls && controls.indexOf(control) === -1) {
        let length = controls.get('length');
        for (let i = 0; i < length; i++) {
          let _control = controls.objectAt(i);
          if (_control instanceof FdEditformGroup) {
            _container = this._findControlContainer(control, _control.get('rows'));
          } else if (_control instanceof FdEditformTabgroup) {
            let tabs = _control.get('tabs');
            let length = tabs.get('length');
            for (let i = 0; i < length; i++) {
              _container = this._findControlContainer(control, tabs.objectAt(i).get('rows'));
              if (_container) {
                break;
              }
            }
          }

          if (_container) {
            break;
          }
        }
      } else if (controls) {
        _container = controls;
      }

      if (_container) {
        break;
      }
    }

    return _container;
  },
});
