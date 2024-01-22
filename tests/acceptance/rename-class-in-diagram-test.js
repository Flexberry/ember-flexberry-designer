import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import startApp from 'dummy/tests/helpers/start-app';
import executeTestWithData from 'dummy/tests/helpers/execute-test-with-data';
import $ from 'jquery';
import { Promise } from 'rsvp';
import uuid from 'npm:node-uuid';
import { getJsonForClass } from 'ember-flexberry-designer/utils/get-json-for-diagram';
import { A } from '@ember/array';
import Builder from 'ember-flexberry-data/query/builder';
import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Condition from 'ember-flexberry-data/query/condition';

let app;
let store;
module('Acceptance | fd-diagram-sheet | rename class', {
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

test('rename new empty class on diagram', (assert) => {
  let done = assert.async();
  assert.expect(9);

  // Arrange.
  let systemName = 'TestSystem';
  let className = 'TestClass';
  let diagramName = 'TestDiagram';
  let classNameNew = 'TestClassNew';

  let createTestData = function(stage) {
    let testSystem = store.createRecord('fd-dev-system', {
      name: systemName,
      stage: stage,
      id: uuid.v4()
    });

    let testClass = store.createRecord('fd-dev-class', {
      name: className,
      nameStr: className,
      stage: stage,
      id: uuid.v4(),
      caption: '',
      description: '',
      stereotype: '«implementation»',
      referenceCount: 1
    });

    let testDiagram = store.createRecord('fd-dev-uml-cad', {
      name: diagramName,
      primitivesJsonString: JSON.stringify([getJsonForClass(testClass, { X: 300, Y: 300 })]),
      caseObjectsString: `Class:(${testClass.get('name')})`,
      subsystem: testSystem,
      id: uuid.v4()
    });

    return A([
      testSystem,
      testClass,
      testDiagram
    ]);
  };

  run(() => {
    // Act & Assert.
    let testCallback = function(assert, arrayTestData) {
      return new Promise(function(resolve, reject) {
        let system = arrayTestData.filter(x => x.name == systemName);
        let stage = system[0].stage;

        visit(`fd-diagrams?gotostage=${stage.get('id')}`);
        andThen(() => {
          let $diagramList = $('.fd-list .fd-list-item');
          let $diagramItemSpan = $diagramList.children('span');

          assert.equal($diagramItemSpan.text(), diagramName);

          click($diagramList);
          andThen(() => {
            let $diagramSheet = $('.fd-sheet.diagram-sheet');

            assert.equal($diagramSheet.hasClass('visible'), true);

            let $sheetHeader = $('.fd-sheet-header.fd-sheet-diagram-header');
            let $diagramNameDiv = $sheetHeader.children('div.form-header.fluid.flexberry-textbox');
            let $diagramNameInput = $diagramNameDiv.children('input.ember-text-field');

            assert.equal($diagramNameInput[0].value, diagramName);

            let $umlClassInputs = $('.uml-class-inputs');
            let $umlClassNameInput = $umlClassInputs.children('.class-name-input.header-input');

            assert.equal($umlClassNameInput[0].value, className);
            assert.equal($umlClassNameInput.hasClass('click-disabled'), true);

            let $editButton = $('.fd-edit', $sheetHeader);
            click($editButton);
            andThen(() => {
              assert.equal($umlClassNameInput.hasClass('click-disabled'), false);

              fillIn($umlClassNameInput, classNameNew);
              andThen(() => {
                let $saveButton = $('.fd-save', $sheetHeader);
                click($saveButton);
                andThen(() => {
                  $umlClassInputs = $('.uml-class-inputs');
                  $umlClassNameInput = $umlClassInputs.children('.class-name-input.header-input');

                  assert.equal($umlClassNameInput[0].value, classNameNew);
                  assert.equal($umlClassNameInput.hasClass('click-disabled'), true);

                  let limitPredicate = new ComplexPredicate(Condition.And,
                    new SimplePredicate('name', FilterOperator.Eq, classNameNew),
                    new SimplePredicate('stage', FilterOperator.Eq, stage.get('id')));

                  let builder = new Builder(store, 'fd-dev-class').where(limitPredicate).count();
                  store.query('fd-dev-class', builder.build()).then((result) => {
                    assert.equal(result.meta.count, 1, 'Class \'' + classNameNew + '\'not found in store');
                  }).finally(() => {
                    resolve();
                  });
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

test('rename new empty class on edit form', (assert) => {
  let done = assert.async();
  assert.expect(13);

  // Arrange.
  let systemName = 'TestSystem';
  let className = 'TestClass';
  let diagramName = 'TestDiagram';
  let classNameNew = 'TestClassNew';

  let createTestData = function(stage) {
    let testSystem = store.createRecord('fd-dev-system', {
      name: systemName,
      stage: stage,
      id: uuid.v4()
    });

    let testClass = store.createRecord('fd-dev-class', {
      name: className,
      nameStr: className,
      stage: stage,
      id: uuid.v4(),
      caption: '',
      description: '',
      stereotype: '«implementation»',
      referenceCount: 1
    });

    let testDiagram = store.createRecord('fd-dev-uml-cad', {
      name: diagramName,
      primitivesJsonString: JSON.stringify([getJsonForClass(testClass, { X: 300, Y: 300 })]),
      caseObjectsString: `Class:(${testClass.get('name')})`,
      subsystem: testSystem,
      id: uuid.v4()
    });

    return A([
      testSystem,
      testClass,
      testDiagram
    ]);
  };

  run(() => {
    // Act & Assert.
    let testCallback = function(assert, arrayTestData) {
      return new Promise(function(resolve, reject) {
        let system = arrayTestData.filter(x => x.name == systemName);
        let stage = system[0].stage;

        visit(`fd-diagrams?gotostage=${stage.get('id')}`);
        andThen(() => {
          let $diagramList = $('.fd-list .fd-list-item');
          let $diagramItemSpan = $diagramList.children('span');

          assert.equal($diagramItemSpan.text(), diagramName);

          click($diagramList);
          andThen(() => {
            let $diagramSheet = $('.fd-sheet.diagram-sheet');

            assert.equal($diagramSheet.hasClass('visible'), true);

            let $sheetHeader = $('.fd-sheet-header.fd-sheet-diagram-header');
            let $diagramNameDiv = $sheetHeader.children('div.form-header.fluid.flexberry-textbox');
            let $diagramNameInput = $diagramNameDiv.children('input.ember-text-field');

            assert.equal($diagramNameInput[0].value, diagramName);

            let $umlClassInputs = $('.uml-class-inputs');
            let $umlClassNameInput = $umlClassInputs.children('.class-name-input.header-input');

            assert.equal($umlClassNameInput[0].value, className);
            assert.equal($umlClassNameInput.hasClass('click-disabled'), true);

            let $editButton = $('.fd-edit', $sheetHeader);
            click($editButton);
            andThen(() => {
              assert.equal($umlClassNameInput.hasClass('click-disabled'), false);

              let $svg = $('svg');
              let $umlTestClass = $svg[0].querySelectorAll('.joint-type-flexberry.joint-type-flexberry-uml.joint-type-flexberry-uml-class');

              click($umlTestClass);
              andThen(() => {
                let $openEditFormButton = $umlTestClass[0].querySelectorAll('.open-edit-form-button');
                click($openEditFormButton);
                andThen(() => {
                  let $editDiagramObjectSheet = $('.fd-sheet.edit-diagram-object-sheet');

                  assert.equal($editDiagramObjectSheet.hasClass('visible'), true);

                  let $editDiagramSheetHeader = $($editDiagramObjectSheet[0].querySelectorAll('.fd-sheet-header'));
                  let $classNameDiv = $editDiagramSheetHeader.children('div.form-header.fluid.flexberry-textbox');
                  let $classNameInput = $classNameDiv.children('input.ember-text-field');

                  assert.equal($classNameInput[0].value, className);
                  assert.equal($classNameInput[0].readOnly, true);

                  let $editButtonDiagramSheetHeader = $('.fd-edit', $editDiagramObjectSheet);
                  click($editButtonDiagramSheetHeader);
                  andThen(() => {
                    $classNameInput = $classNameDiv.children('input.ember-text-field');
  
                    assert.equal($classNameInput[0].readOnly, false);

                    fillIn($classNameInput, classNameNew);
                    andThen(() => {
                      let $saveButton = $('.fd-save', $editDiagramObjectSheet);
                      click($saveButton);
                      andThen(() => {
                        $classNameInput = $classNameDiv.children('input.ember-text-field');

                        assert.equal($classNameInput[0].value, classNameNew);
                        assert.equal($classNameInput[0].readOnly, true);

                        let limitPredicate = new ComplexPredicate(Condition.And,
                          new SimplePredicate('name', FilterOperator.Eq, classNameNew),
                          new SimplePredicate('stage', FilterOperator.Eq, stage.get('id')));
      
                        let builder = new Builder(store, 'fd-dev-class').where(limitPredicate).count();
                        store.query('fd-dev-class', builder.build()).then((result) => {
                          assert.equal(result.meta.count, 1, 'Class \'' + classNameNew + '\'not found in store');
                        }).finally(() => {
                          resolve();
                        });
                      }).catch((e) => reject(e));
                    }).catch((e) => reject(e));
                  }).catch((e) => reject(e));
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
