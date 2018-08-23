import Ember from 'ember';
import { module, test } from 'qunit';

import {
  controlsToDefinition,
  locateControlByPath,
} from 'ember-flexberry-designer/utils/fd-view-path-functions';

import FdViewAttributesProperty from 'ember-flexberry-designer/objects/fd-view-attributes-property';
import FdEditformRow from 'ember-flexberry-designer/objects/fd-editform-row';
import FdEditformControl from 'ember-flexberry-designer/objects/fd-editform-control';
import FdEditformGroup from 'ember-flexberry-designer/objects/fd-editform-group';
import FdEditformTabgroup from 'ember-flexberry-designer/objects/fd-editform-tabgroup';
import FdEditformTab from 'ember-flexberry-designer/objects/fd-editform-tab';

module('Unit | Utility | fd-view-path-functions');

test('it works', function(assert) {
  const definition = Ember.A([
    FdViewAttributesProperty.create({ caption: 'Control' }),
    FdViewAttributesProperty.create({ caption: 'Control #1', path: '#1' }),
    FdViewAttributesProperty.create({ caption: 'Control #2', path: '#2' }),
    FdViewAttributesProperty.create({ caption: 'Control', path: '-Group' }),
    FdViewAttributesProperty.create({ caption: 'Control', path: '|Tab #1' }),
    FdViewAttributesProperty.create({ caption: 'Control', path: '|Tab #2' }),
    FdViewAttributesProperty.create({ caption: 'Control', path: '|Tab #2\\-Group' }),
  ]);

  const controlsTree = Ember.A([
    FdEditformRow.create({
      controls: Ember.A([FdEditformControl.create({ caption: 'Control', propertyDefinition: definition.objectAt(0) })]),
    }),
    FdEditformRow.create({
      controls: Ember.A([
        FdEditformControl.create({ caption: 'Control #1', propertyDefinition: definition.objectAt(1) }),
        FdEditformControl.create({ caption: 'Control #2', propertyDefinition: definition.objectAt(2) }),
      ]),
    }),
    FdEditformRow.create({
      controls: Ember.A([
        FdEditformGroup.create({
          caption: 'Group',
          rows: Ember.A([
            FdEditformRow.create({
              controls: Ember.A([FdEditformControl.create({ caption: 'Control', propertyDefinition: definition.objectAt(3) })]),
            }),
          ]),
        }),
      ]),
    }),
    FdEditformRow.create({
      controls: Ember.A([
        FdEditformTabgroup.create({
          tabs: Ember.A([
            FdEditformTab.create({
              caption: 'Tab #1',
              rows: Ember.A([
                FdEditformRow.create({
                  controls: Ember.A([FdEditformControl.create({ caption: 'Control', propertyDefinition: definition.objectAt(4) })]),
                }),
              ]),
            }),
            FdEditformTab.create({
              caption: 'Tab #2',
              rows: Ember.A([
                FdEditformRow.create({
                  controls: Ember.A([FdEditformControl.create({ caption: 'Control', propertyDefinition: definition.objectAt(5) })]),
                }),
                FdEditformRow.create({
                  controls: Ember.A([
                    FdEditformGroup.create({
                      caption: 'Group',
                      rows: Ember.A([
                        FdEditformRow.create({
                          controls: Ember.A([FdEditformControl.create({ caption: 'Control', propertyDefinition: definition.objectAt(6) })]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        }),
      ]),
    }),
  ]);

  let testTree = Ember.A();
  let length = definition.get('length');
  for (let i = 0; i < length; i++) {
    let propertyDefinition = definition.objectAt(i);
    let caption = propertyDefinition.get('caption');
    let path = propertyDefinition.get('path');

    locateControlByPath(testTree, FdEditformControl.create({ caption, propertyDefinition }), path);
  }

  assert.deepEqual(testTree, controlsTree, `The 'locateControlByPath' function is OK.`);
  assert.deepEqual(controlsToDefinition(controlsTree), definition, `The 'controlsToDefinition' function is OK.`);
});
