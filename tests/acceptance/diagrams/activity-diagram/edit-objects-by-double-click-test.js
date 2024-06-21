import $ from 'jquery';
import { Promise } from 'rsvp';
import uuid from 'npm:node-uuid';
import { module, test } from 'qunit';
import { doubleClick } from '@ember/test-helpers';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { getJsonForElement } from 'ember-flexberry-designer/utils/get-json-for-diagram';
import startApp from 'dummy/tests/helpers/start-app';
import executeTestWithData from 'dummy/tests/helpers/execute-test-with-data';

let app;
let store;

module('Acceptance | fd-diagram-sheet | edit objects by double-click', {
  beforeEach() {
    // Start application.
    app = startApp();

    // Enable acceptance test mode in application controller (to hide unnecessary markup from application.hbs).
    let applicationController = app.__container__.lookup('controller:application');
    applicationController.set('isInAcceptanceTestMode', true);
    store = app.__container__.lookup('service:store');
  },

  afterEach() {
    run(app, 'destroy');
  }
});

function createData(systemName, diagramName, elementType, elementAttributes) {
  return function(stage) {
    const testSystem = store.createRecord('fd-dev-system', {
      name: systemName,
      stage: stage,
      id: uuid.v4()
    });

    const testDiagram = store.createRecord('fd-dev-uml-ad', {
      name: diagramName,
      primitivesJsonString: JSON.stringify([
        getJsonForElement(
          elementType,
          { x: 300, y: 300 },
          { width: 40, height: 40 },
          elementAttributes
        )
      ]),
      subsystem: testSystem,
      id: uuid.v4()
    });

    return A([testSystem, testDiagram]);
  };
}

test('editing an active state object by double-click and resetting editing mode', (assert) => {
  const done = assert.async();
  assert.expect(7);

  // Arrange.
  const systemName = 'TestSystem';
  const diagramName = 'TestDiagram';
  const activeStateName = 'TestActiveState';
  const objectType = 'STORMCASE.UML.ad.State, UMLAD';
  const objectAttributes = { Name: activeStateName, Text: '' };
  const createTestData = createData(systemName, diagramName, objectType, objectAttributes);

  // Act & Assert.
  run(() => {
    const testCallback = function(assert, arrayTestData) {
      return new Promise(function(resolve, reject) {
        const system = arrayTestData.find(x => x.name == systemName);
        const stage = system.stage;

        visit(`fd-diagrams?gotostage=${stage.get('id')}`);
        andThen(() => {
          const $diagramList = $('.fd-list .fd-list-item');

          click($diagramList);
          andThen(() => {
            const $sheetHeader = $('.fd-sheet-header.fd-sheet-diagram-header');
            const $editButton = $('.fd-edit', $sheetHeader);

            click($editButton);
            andThen(() => {
              const $activeStateObject = $('g[data-type="flexberry.uml.ActiveState"]');
              const $umlObjectDivElements = $('div.uml-class-inputs');
              const $umlObjectInputElements = $umlObjectDivElements.find('input,textarea');

              assert.equal($activeStateObject.length, 1);
              $umlObjectInputElements.each(function() {
                assert.ok($(this).hasClass('click-disabled'));
              });

              doubleClick($activeStateObject[0]).then(() => {
                $umlObjectInputElements.each(function() {
                  assert.notOk($(this).hasClass('click-disabled'));
                });

                click($activeStateObject);
                andThen(() => {
                  $umlObjectInputElements.each((index, element) => {
                    assert.ok($(element).hasClass('click-disabled'));
                  });

                  resolve();
                }).catch((e) => reject(e));
              }).catch((e) => reject(e));
            }).catch((e) => reject(e));
          }).catch((e) => reject(e));
        }).catch((e) => reject(e));
      });
    };

    executeTestWithData(store, assert, done, createTestData, testCallback);
  });
});
