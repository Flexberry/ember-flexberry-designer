import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

import FdEditformRow from 'ember-flexberry-designer/objects/fd-editform-row';
import FdEditformControl from 'ember-flexberry-designer/objects/fd-editform-control';
import FdEditformGroup from 'ember-flexberry-designer/objects/fd-editform-group';
import FdEditformTabgroup from 'ember-flexberry-designer/objects/fd-editform-tabgroup';
import FdEditformTab from 'ember-flexberry-designer/objects/fd-editform-tab';

moduleFor('controller:fd-editform-constructor', 'Unit | Controller | fd editform constructor', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test(`'_findItemContainer' function`, function(assert) {
  let controller = this.subject();
  controller.controlsTree = Ember.A([
    FdEditformRow.create({
      controls: Ember.A([FdEditformControl.create({ caption: 'Control' })]),
    }),
    FdEditformRow.create({
      controls: Ember.A([
        FdEditformControl.create({ caption: 'Control #1' }),
        FdEditformControl.create({ caption: 'Control #2' }),
      ]),
    }),
    FdEditformRow.create({
      controls: Ember.A([
        FdEditformGroup.create({
          caption: 'Group',
          rows: Ember.A([
            FdEditformRow.create({
              controls: Ember.A([FdEditformControl.create({ caption: 'Control' })]),
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
                  controls: Ember.A([FdEditformControl.create({ caption: 'Control' })]),
                }),
              ]),
            }),
            FdEditformTab.create({
              caption: 'Tab #2',
              rows: Ember.A([
                FdEditformRow.create({
                  controls: Ember.A([FdEditformControl.create({ caption: 'Control' })]),
                }),
                FdEditformRow.create({
                  controls: Ember.A([
                    FdEditformGroup.create({
                      caption: 'Group',
                      rows: Ember.A([
                        FdEditformRow.create({
                          controls: Ember.A([FdEditformControl.create({ caption: 'Control' })]),
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

  [
    {
      message: 'First control.',
      item: controller.get('controlsTree.firstObject.controls.firstObject'),
      container: controller.get('controlsTree.firstObject'),
      startContainer: undefined,
    },
    {
      message: 'One of controls from row.',
      item: controller.get('controlsTree').objectAt(1).get('controls.lastObject'),
      container: controller.get('controlsTree').objectAt(1),
      startContainer: undefined,
    },
    {
      message: 'First group.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject'),
      container: controller.get('controlsTree').objectAt(2),
      startContainer: undefined,
    },
    {
      message: 'Row in group.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject'),
      container: controller.get('controlsTree').objectAt(2).get('controls.firstObject'),
      startContainer: undefined,
    },
    {
      message: 'Row in group with start container.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject'),
      container: controller.get('controlsTree').objectAt(2).get('controls.firstObject'),
      startContainer: controller.get('controlsTree').objectAt(2),
    },
    {
      message: 'Control in group.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject.controls.firstObject'),
      container: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject'),
      startContainer: undefined,
    },
    {
      message: 'First tabs group.',
      item: controller.get('controlsTree.lastObject.controls.firstObject'),
      container: controller.get('controlsTree.lastObject'),
      startContainer: undefined,
    },
    {
      message: 'Tab in tabs group.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject'),
      startContainer: undefined,
    },
    {
      message: 'Row in tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject'),
      startContainer: undefined,
    },
    {
      message: 'Control in tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject.controls.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject'),
      startContainer: undefined,
    },
    {
      message: 'Control in other tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject.controls.firstObject'),
      container: null,
      startContainer: controller.get('controlsTree.lastObject.controls.firstObject.tabs.lastObject'),
    },
    {
      message: 'Group in tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.lastObject.rows.lastObject.controls.firstObject.rows.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject.tabs.lastObject.rows.lastObject.controls.firstObject'),
      startContainer: undefined,
    },
  ].forEach((set) => {
    assert.ok(controller._findItemContainer(set.item, set.startContainer) === set.container, set.message);
  });
});
