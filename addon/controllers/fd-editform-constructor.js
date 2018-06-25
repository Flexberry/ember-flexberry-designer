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
  _selectedIsControl: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformControl;
  }).readOnly(),

  /**
    @private
    @property _selectedIsGroup
    @readOnly
    @type Boolean
  */
  _selectedIsGroup: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformGroup;
  }).readOnly(),

  /**
    @private
    @property _selectedIsTab
    @readOnly
    @type Boolean
  */
  _selectedIsTab: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformTab;
  }).readOnly(),

  /**
    The selected control.

    @property selectedControl
    @type FdEditformControl|FdEditformGroup|FdEditformTab
  */
  selectedControl: undefined,

  actions: {
    /**
      Adds the control to a new row.

      @method actions.addControl
      @param {String} type Type of control to add.
    */
    addControl(type) {
      let row = FdEditformRow.create({ controls: Ember.A() });
      let control = FdEditformControl.create({ caption: 'New attribute' });
      switch (type) {
        case 'control':
          row.get('controls').pushObject(control);
          break;

        case 'group':
          let group = FdEditformGroup.create({
            caption: 'New group',
            rows: Ember.A([
              FdEditformRow.create({ controls: Ember.A([control]) }),
            ]),
          });

          row.get('controls').pushObject(group);
          break;

        case 'tabs':
          let tabs = FdEditformTabgroup.create({
            tabs: Ember.A([
              FdEditformTab.create({
                caption: 'New tab',
                rows: Ember.A([
                  FdEditformRow.create({ controls: Ember.A([control]) }),
                ]),
              }),
            ]),
          });

          row.get('controls').pushObject(tabs);
          break;

        default:
          throw new Error(`The '${type}' type is not supported.`);
      }

      this.get('model.controls').pushObject(row);
    },

    /**
      Close edit form constructor and go to application structure constructor.

      @method actions.close
    */
    close() {
      this.transitionToRoute('fd-appstruct-form');
    },

    /**
      Set the selected control.

      @method actions.selectControl
      @param {FdEditformControl|FdEditformGroup|FdEditformTab} control
    */
    selectControl(control) {
      this.set('selectedControl', control);
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

    /**
      Overridden action for button 'Save'.
      @method actions.save
    */
    save() {
      this._saveMetadata(this.model);
      this._super();
    },

    /**
      Overridden action for button 'Save and close'.
      @method actions.saveAndClose
      @param {Boolean} skipTransition If `true`, then transition during close form process will be skipped after save.
    */
    saveAndClose(skipTransition) {
      this._saveMetadata(this.model);
      this._super(skipTransition);
    }
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

  /**
    Save editform metadata: dataobject attributes, view, editform class.

    @method _saveMetadata
    @param {Object} model Complex model for processing and save.
  */
  _saveMetadata(model) {
    // Сохранить атрибуты в объекте данных (id класса объекта данных)
    // Сохранить представление (id представления)
    let controls = model.controls;

    // Обходим дерево и записываем свойства в коллекцию с указанием пути.
    let viewDefinition = Ember.A();

    for (let i = 0; i < controls.get('length'); i++) {
      let innerControl = controls.objectAt(i);
      this._extractPathPart(innerControl, '', viewDefinition);

    }

    // Сохранить класс формы редактирования
  },

  /**
    Extract path part from object model.

    @method _extractPathPart
    @param {FdEditformControl|FdEditformRow|FdEditformGroup|FdEditformTabgroup|FdEditformTab} control Some item in object model.
    @param {String} path Path for current item.
    @param {Ember.Array} viewDefinition View definition with result paths for controls.
  */
  _extractPathPart: function(control, path, viewDefinition) {
    if (control instanceof FdEditformControl) {
      // TODO: Добавить правильное заполнение объекта в предсталение.
      viewDefinition.pushObject({ path: path, name: control.name });
      return path;
    } else if (control instanceof FdEditformRow) {
      for (let i = 0; i < control.get('controls.length'); i++) {
        let controlInRow = control.get('controls').objectAt(i);
        let pathWithColumn = path;
        if (control.get('controls.length') > 1) {
          pathWithColumn = path + '\\#' + (i + 1);
        }

        this._extractPathPart(controlInRow, pathWithColumn, viewDefinition);
      }
    } else if (control instanceof FdEditformGroup) {
      let pathWithGroup = '-' + control.caption;
      if (path) {
        pathWithGroup = path + '\\' + pathWithGroup;
      }

      for (let i = 0; i < control.get('rows.length'); i++) {
        let rowInGroup = control.get('rows').objectAt(i);
        this._extractPathPart(rowInGroup, pathWithGroup, viewDefinition);
      }
    } else if (control instanceof FdEditformTabgroup) {
      for (let i = 0; i < control.get('tabs.length'); i++) {
        let rowInGroup = control.get('tabs').objectAt(i);
        this._extractPathPart(rowInGroup, path, viewDefinition);
      }
    } else if (control instanceof FdEditformTab) {
      let pathWithTab = '|' + control.caption;
      if (path) {
        pathWithTab = path + '\\' + pathWithTab;
      }

      for (let i = 0; i < control.get('rows.length'); i++) {
        let rowInGroup = control.get('rows').objectAt(i);
        this._extractPathPart(rowInGroup, pathWithTab, viewDefinition);
      }
    }
  }
});
