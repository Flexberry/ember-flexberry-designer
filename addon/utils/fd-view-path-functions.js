/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import FdEditformRow from '../objects/fd-editform-row';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import FdEditformTab from '../objects/fd-editform-tab';

/**
  Creates a view definition from the controls tree.

  @method controlsToDefinition
  @param {Ember.NativeArray} controlsTree The controls tree.
  @return {Ember.NativeArray} An array of view items.
*/
export function controlsToDefinition(controlsTree) {
  let definition = Ember.A();
  let length = controlsTree.get('length');
  for (let i = 0; i < length; i++) {
    extractControlPath(definition, controlsTree.objectAt(i));
  }

  return definition;
}

/**
  Locates control in the controls tree by path.

  @method locateControlByPath
  @param {Ember.NativeArray|FdEditformGroup|FdEditformTab} controlsTree The controls tree.
  @param {FdEditformControl} control The control.
  @param {String} path The path on which the control will be located in the form.
*/
export function locateControlByPath(controlsTree, control, path) {
  if (!path) {
    let rows = getRows(controlsTree);
    rows.pushObject(FdEditformRow.create({ controls: Ember.A([control]) }));
  } else {
    switch (path.charAt(0)) {
      case '|':
        locateInTabs(controlsTree, control, path);
        break;

      case '-':
        locateInGroup(controlsTree, control, path);
        break;

      case '#':
        locateInColumn(controlsTree, control, path);
        break;

      default:
        throw new Error('Invalid path.');
    }
  }
}

/**
  Adds a view item to the definition and updates its path by its location in the controls tree.

  @private
  @method extractControlPath
  @param {Ember.NativeArray} definition An array of view items.
  @param {FdEditformRow|FdEditformControl|FdEditformGroup|FdEditformTabgroup|FdEditformTab} control The control from the controls tree.
  @param {String} [path] The path of the current view item.
  @param {String} [column] Part of the path describing the column of the current view item.
*/
function extractControlPath(definition, control, path, column) {
  if (control instanceof FdEditformRow) {
    let controls = control.get('controls');
    let length = controls.get('length');
    for (let i = 0; i < length; i++) {
      extractControlPath(definition, controls.objectAt(i), path, length > 1 ? `#${i + 1}` : '');
    }
  } else if (control instanceof FdEditformGroup) {
    let pathWithGroup = `${path ? path + '\\' : ''}-${control.get('caption')}`;

    let rows = control.get('rows');
    let length = rows.get('length');
    for (let i = 0; i < length; i++) {
      extractControlPath(definition, rows.objectAt(i), pathWithGroup, column);
    }
  } else if (control instanceof FdEditformTabgroup) {
    let tabs = control.get('tabs');
    let length = tabs.get('length');
    for (let i = 0; i < length; i++) {
      extractControlPath(definition, tabs.objectAt(i), path, column);
    }
  } else if (control instanceof FdEditformTab) {
    let pathWithTab = `${path ? path + '\\' : ''}|${control.get('caption')}`;

    let rows = control.get('rows');
    let length = rows.get('length');
    for (let i = 0; i < length; i++) {
      extractControlPath(definition, rows.objectAt(i), pathWithTab, column);
    }
  } else if (control instanceof FdEditformControl) {
    let mockColumn = `${column ? column : '#1'}`;
    let pathColumn = `${control.width ? mockColumn + '(' + control.width + ')' : column}`;
    control.set('propertyDefinition.path', `${path ? path + '\\' : ''}${pathColumn}`);
    control.set('propertyDefinition.caption', control.get('caption'));
    definition.pushObject(control.get('propertyDefinition'));
  }
}

/**
  Locates control in the tab group.

  @private
  @method locateInTabs
  @param {Ember.NativeArray|FdEditformGroup|FdEditformTab} controlsTree The controls tree.
  @param {FdEditformControl} control The control.
  @param {String} path A string describing the path beginning with the tabs.
*/
function locateInTabs(controlsTree, control, path) {
  let splitterIndex = path.indexOf('\\');
  splitterIndex = splitterIndex === -1 ? path.length : splitterIndex;
  let caption = path.slice(1, splitterIndex);

  let tab;
  let tabGroup;
  let rows = getRows(controlsTree);
  let length = rows.get('length');
  for (let i = 0; i < length; i++) {
    let controls = rows.objectAt(i).get('controls');
    let length = controls.get('length');
    for (let j = 0; j < length; j++) {
      let control = controls.objectAt(j);
      if (control instanceof FdEditformTabgroup) {
        tabGroup = control;
        tab = tabGroup.get('tabs').findBy('caption', caption);
      }
    }
  }

  if (!tabGroup) {
    tabGroup = FdEditformTabgroup.create({ tabs: Ember.A() });
    rows.pushObject(FdEditformRow.create({ controls: Ember.A([tabGroup]) }));
  }

  if (!tab) {
    tab = FdEditformTab.create({ rows: Ember.A(), caption });
    tabGroup.get('tabs').pushObject(tab);
  }

  locateControlByPath(tab, control, path.slice(splitterIndex + 1));
}

/**
  Locates control in group.

  @method locateInGroup
  @param {Ember.NativeArray|FdEditformGroup|FdEditformTab} controlsTree The controls tree.
  @param {FdEditformControl} control The control.
  @param {String} path A string describing the path beginning with the group.
*/
function locateInGroup(controlsTree, control, path) {
  let splitterIndex = path.indexOf('\\');
  splitterIndex = splitterIndex === -1 ? path.length : splitterIndex;
  let caption = path.slice(1, splitterIndex);

  let group;
  let rows = getRows(controlsTree);
  let length = rows.get('length');
  for (let i = 0; i < length; i++) {
    let controls = rows.objectAt(i).get('controls');
    let length = controls.get('length');
    for (let i = 0; i < length; i++) {
      let control = controls.objectAt(i);
      if (control instanceof FdEditformGroup && control.get('caption') === caption) {
        group = control;
      }
    }
  }

  if (!group) {
    group = FdEditformGroup.create({ rows: Ember.A(), caption });
    rows.pushObject(FdEditformRow.create({ controls: Ember.A([group]) }));
  }

  locateControlByPath(group, control, path.slice(splitterIndex + 1));
}

/**
  Locates control in column.

  @private
  @method locateInColumn
  @param {Ember.NativeArray|FdEditformGroup|FdEditformTab} controlsTree The controls tree.
  @param {FdEditformControl} control The control.
  @param {String} path A string describing the column in which the control should be located.
*/
function locateInColumn(controlsTree, control, path) {
  let braceIndex = path.indexOf('(');
  let columnIndex = parseInt(path.slice(1, braceIndex === -1 ? path.length : braceIndex));

  let rows = getRows(controlsTree);
  let row = rows.get('lastObject');
  if (!row || row.get('columnsCount') + 1 !== columnIndex) {
    row = rows.pushObject(FdEditformRow.create({ controls: Ember.A() }));
  }

  row.get('controls').pushObject(control);
}

/**
  Returns an array of rows in the controls tree.

  @private
  @method getRows
  @param {Ember.NativeArray|FdEditformGroup|FdEditformTab} controlsTree The controls tree.
  @return {Ember.NativeArray} An array of rows in the controls tree.
*/
function getRows(controlsTree) {
  if (controlsTree instanceof FdEditformGroup || controlsTree instanceof FdEditformTab) {
    return controlsTree.get('rows');
  } else if (Ember.isArray(controlsTree)) {
    return controlsTree;
  } else {
    throw new Error('Invalid controls tree.');
  }
}
