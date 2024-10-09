import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import startApp from 'dummy/tests/helpers/start-app';
import executeTestWithData from 'dummy/tests/helpers/execute-test-with-data';
import { findClassImputsByName } from 'dummy/tests/helpers/find-diagram-primitive';
import $ from 'jquery';
import { Promise } from 'rsvp';
import Builder from 'ember-flexberry-data/query/builder';
import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Condition from 'ember-flexberry-data/query/condition';

let app;
let store;
module('Acceptance | fd-diagram-sheet | create diagram', {
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

test('create new empty diagram', (assert) => {
  let done = assert.async();
  assert.expect(5);

  // Arrange.
  let diagramName = 'TestDiagram';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-diagrams?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createDiagramBtnOnPage = $('.flexberry-button');
            $createDiagramBtnOnPage.click();

            wait().then(() => {
              let $diagramSheet = $('.fd-sheet.diagram-sheet');

              assert.equal($diagramSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $diagramSheet);
              let $createDiagramCard = $($createButtons[0]);
              let $createDiagramButton = $('.content', $createDiagramCard);

              click($createDiagramButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $diagramSheet);
                let $diagramName = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($diagramName, diagramName);
                andThen(() => {
                  click($saveButton);
                  andThen(() => {
                    let $editButton = $('.fd-edit', $sheetHeader);

                    assert.equal($editButton.length, 1);

                    let $diagramItem = $('.fd-list .fd-list-item');
                    let $diagramItemSpan = $diagramItem.children('span');
                    assert.equal($diagramItemSpan.text(), diagramName);
                    assert.equal($diagramItemSpan.hasClass('active'), true);

                    let limitPredicate = new ComplexPredicate(Condition.And,
                      new SimplePredicate('name', FilterOperator.Eq, diagramName),
                      new SimplePredicate('subsystem', FilterOperator.Eq, stage.get('systems.firstObject.id')));

                    let builder = new Builder(store, 'fd-dev-uml-cad').where(limitPredicate).count();
                    store.query('fd-dev-uml-cad', builder.build()).then((result) => {
                      assert.equal(result.meta.count, 1, 'Diagram \'' + diagramName + '\'not found in store');
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

    executeTestWithData(store, assert, done, null, testCallback);
  });
});

test('create new diagram with class', (assert) => {
  let done = assert.async();
  assert.expect(11);

  // Arrange.
  let diagramName = 'TestDiagram';
  let className = 'TestClassName';
  let attrStr = '+testName1:bool=false\n/-testName2:string';
  let methStr = '/+testName1(a:string):bool\n#testName2<string>(a:int, b:bool):string';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-diagrams?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createDiagramBtnOnPage = $('.flexberry-button');
            $createDiagramBtnOnPage.click();

            wait().then(() => {
              let $diagramSheet = $('.fd-sheet.diagram-sheet');

              assert.equal($diagramSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $diagramSheet);
              let $createDiagramCard = $($createButtons[0]);
              let $createDiagramButton = $('.content', $createDiagramCard);

              click($createDiagramButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $diagramSheet);
                let $diagramName = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($diagramName, diagramName);
                andThen(() => {
                  let $toolbar = $('.fd-uml-diagram-toolbar');
                  let $clsButton = $('button[title=\'Класс\']', $toolbar);
                  $clsButton.click();

                  let $svg = $('svg[joint-selector=\'svg\']');
                  click($svg);
                  andThen(() => {
                    let cls = findClassImputsByName('NewClass')

                    fillIn(cls.name, className);
                    fillIn(cls.attributes, attrStr);
                    fillIn(cls.methods, methStr);
                    click($saveButton);
                    andThen(() => {
                      let $editButton = $('.fd-edit', $sheetHeader);

                      assert.equal($editButton.length, 1);

                      let $diagramItem = $('.fd-list .fd-list-item');
                      let $diagramItemSpan = $diagramItem.children('span');
                      assert.equal($diagramItemSpan.text(), diagramName);
                      assert.equal($diagramItemSpan.hasClass('active'), true);

                      let limitPredicate = new ComplexPredicate(Condition.And,
                        new SimplePredicate('name', FilterOperator.Eq, className),
                        new SimplePredicate('stage', FilterOperator.Eq, stage.get('id')));

                      let builder = new Builder(store, 'fd-dev-class')
                      .selectByProjection('FdPreloadMetadata')
                      .where(limitPredicate);

                      store.query('fd-dev-class', builder.build()).then((result) => {
                        assert.equal(result.length, 1, 'Class \'' + className + '\'not found in store');
                        assert.equal(result.get('firstObject.name'), className);
                        assert.equal(result.get('firstObject.nameStr'), className);
                        assert.equal(result.get('firstObject.attributesStr'), attrStr);
                        assert.equal(result.get('firstObject.methodsStr'), methStr);
                        assert.equal(result.get('firstObject.attributes').length, 2);
                        assert.equal(result.get('firstObject.methods').length, 2);
                      }).finally(() => {
                        resolve();
                      });
                    }).catch((e) => reject(e));
                  }).catch((e) => reject(e));
                }).catch((e) => reject(e));
              }).catch((e) => reject(e));
            }).catch((e) => reject(e));
          }).catch((e) => reject(e));
      });
    };

    executeTestWithData(store, assert, done, null, testCallback);
  });
});

test('create new diagram with association', (assert) => {
  let done = assert.async();
  assert.expect(11);

  // Arrange.
  let diagramName = 'TestDiagram';
  let startClassName = 'StartClassName';
  let endClassName = 'EndClassName';
  let linkName = 'TestLinkName';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-diagrams?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createDiagramBtnOnPage = $('.flexberry-button');
            $createDiagramBtnOnPage.click();

            wait().then(() => {
              let $diagramSheet = $('.fd-sheet.diagram-sheet');

              assert.equal($diagramSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $diagramSheet);
              let $createDiagramCard = $($createButtons[0]);
              let $createDiagramButton = $('.content', $createDiagramCard);

              click($createDiagramButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $diagramSheet);
                let $diagramName = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($diagramName, diagramName);
                andThen(() => {
                  let $toolbar = $('.fd-uml-diagram-toolbar');
                  let $clsButton = $('button[title=\'Класс\']', $toolbar);
                  $clsButton.click();

                  let $svg = $('svg[joint-selector=\'svg\']');
                  click($svg);
                  andThen(() => {
                    $clsButton.click();
                    click($svg);
                    andThen(() => {
                      let $associationButton = $('button[title=\'Ассоциация\']', $toolbar);
                      $associationButton.click();

                      let $svg = $('svg[joint-selector=\'svg\']');
                      let $svgCells = $('g[joint-selector=\'cells\']', $svg);
                      let $svgCellsChildren = $svgCells.children();

                      let $svgStartClass = $($svgCellsChildren[0]);
                      let $svgEndClass = $($svgCellsChildren[1]);

                      click($svgStartClass);
                      click($svgEndClass);
                      andThen(() => {
                        let $linkInputs = $('.uml-link-inputs');
                        let $startRole = $('.start-role-input', $linkInputs);
                        let $endRole = $('.end-role-input', $linkInputs);
                        let $linkName = $('.description-input', $linkInputs);

                        fillIn($startRole, startClassName);
                        fillIn($endRole, endClassName);
                        fillIn($linkName, linkName);
                        click($saveButton);
                        andThen(() => {
                          let $editButton = $('.fd-edit', $sheetHeader);

                          assert.equal($editButton.length, 1);

                          let $diagramItem = $('.fd-list .fd-list-item');
                          let $diagramItemSpan = $diagramItem.children('span');
                          assert.equal($diagramItemSpan.text(), diagramName);
                          assert.equal($diagramItemSpan.hasClass('active'), true);

                          let limitPredicate = new SimplePredicate('stage', FilterOperator.Eq, stage.get('id'));

                          let builder = new Builder(store, 'fd-dev-association')
                            .selectByProjection('FdPreloadMetadata')
                            .where(limitPredicate);

                          store.query('fd-dev-association', builder.build()).then((result) => {
                            assert.equal(result.length, 1);
                            assert.equal(result.get('firstObject.name'), linkName);
                            assert.equal(result.get('firstObject.nameStr'), linkName);
                            assert.equal(result.get('firstObject.startRole'), startClassName);
                            assert.equal(result.get('firstObject.startRoleStr'), `+${startClassName}`);
                            assert.equal(result.get('firstObject.endRole'), endClassName);
                            assert.equal(result.get('firstObject.endRoleStr'), `+${endClassName}`);
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

    executeTestWithData(store, assert, done, null, testCallback);
  });
});

test('create new diagram with aggregation', (assert) => {
  let done = assert.async();
  assert.expect(11);

  // Arrange.
  let diagramName = 'TestDiagram';
  let startClassName = 'StartClassName';
  let endClassName = 'EndClassName';
  let linkName = 'TestLinkName';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-diagrams?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createDiagramBtnOnPage = $('.flexberry-button');
            $createDiagramBtnOnPage.click();

            wait().then(() => {
              let $diagramSheet = $('.fd-sheet.diagram-sheet');

              assert.equal($diagramSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $diagramSheet);
              let $createDiagramCard = $($createButtons[0]);
              let $createDiagramButton = $('.content', $createDiagramCard);

              click($createDiagramButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $diagramSheet);
                let $diagramName = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($diagramName, diagramName);
                andThen(() => {
                  let $toolbar = $('.fd-uml-diagram-toolbar');
                  let $clsButton = $('button[title=\'Класс\']', $toolbar);
                  $clsButton.click();

                  let $svg = $('svg[joint-selector=\'svg\']');
                  click($svg);
                  andThen(() => {
                    $clsButton.click();
                    click($svg);
                    andThen(() => {
                      let $aggregationButton = $('button[title=\'Композиция\']', $toolbar);
                      $aggregationButton.click();

                      let $svg = $('svg[joint-selector=\'svg\']');
                      let $svgCells = $('g[joint-selector=\'cells\']', $svg);
                      let $svgCellsChildren = $svgCells.children();

                      let $svgStartClass = $($svgCellsChildren[0]);
                      let $svgEndClass = $($svgCellsChildren[1]);

                      click($svgStartClass);
                      click($svgEndClass);
                      andThen(() => {
                        let $linkInputs = $('.uml-link-inputs');
                        let $startRole = $('.start-role-input', $linkInputs);
                        let $endRole = $('.end-role-input', $linkInputs);
                        let $linkName = $('.description-input', $linkInputs);

                        fillIn($startRole, startClassName);
                        fillIn($endRole, endClassName);
                        fillIn($linkName, linkName);
                        click($saveButton);
                        andThen(() => {
                          let $editButton = $('.fd-edit', $sheetHeader);

                          assert.equal($editButton.length, 1);

                          let $diagramItem = $('.fd-list .fd-list-item');
                          let $diagramItemSpan = $diagramItem.children('span');
                          assert.equal($diagramItemSpan.text(), diagramName);
                          assert.equal($diagramItemSpan.hasClass('active'), true);

                          let limitPredicate = new SimplePredicate('stage', FilterOperator.Eq, stage.get('id'));

                          let builder = new Builder(store, 'fd-dev-aggregation')
                            .selectByProjection('FdPreloadMetadata')
                            .where(limitPredicate);

                          store.query('fd-dev-aggregation', builder.build()).then((result) => {
                            assert.equal(result.length, 1);
                            assert.equal(result.get('firstObject.name'), linkName);
                            assert.equal(result.get('firstObject.nameStr'), linkName);
                            assert.equal(result.get('firstObject.startRole'), startClassName);
                            assert.equal(result.get('firstObject.startRoleStr'), `+${startClassName}`);
                            assert.equal(result.get('firstObject.endRole'), endClassName);
                            assert.equal(result.get('firstObject.endRoleStr'), `+${endClassName}`);
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

    executeTestWithData(store, assert, done, null, testCallback);
  });
});

test('create new diagram with inheritance', (assert) => {
  let done = assert.async();
  assert.expect(7);

  // Arrange.
  let diagramName = 'TestDiagram';
  let linkName = 'TestLinkName';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-diagrams?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createDiagramBtnOnPage = $('.flexberry-button');
            $createDiagramBtnOnPage.click();

            wait().then(() => {
              let $diagramSheet = $('.fd-sheet.diagram-sheet');

              assert.equal($diagramSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $diagramSheet);
              let $createDiagramCard = $($createButtons[0]);
              let $createDiagramButton = $('.content', $createDiagramCard);

              click($createDiagramButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $diagramSheet);
                let $diagramName = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($diagramName, diagramName);
                andThen(() => {
                  let $toolbar = $('.fd-uml-diagram-toolbar');
                  let $clsButton = $('button[title=\'Класс\']', $toolbar);
                  $clsButton.click();

                  let $svg = $('svg[joint-selector=\'svg\']');
                  click($svg);
                  andThen(() => {
                    $clsButton.click();
                    click($svg);
                    andThen(() => {
                      let $inheritanceButton = $('button[title=\'Наследование/обобщение\']', $toolbar);
                      $inheritanceButton.click();

                      let $svg = $('svg[joint-selector=\'svg\']');
                      let $svgCells = $('g[joint-selector=\'cells\']', $svg);
                      let $svgCellsChildren = $svgCells.children();

                      let $svgStartClass = $($svgCellsChildren[0]);
                      let $svgEndClass = $($svgCellsChildren[1]);

                      click($svgStartClass);
                      click($svgEndClass);
                      andThen(() => {
                        let $linkInputs = $('.uml-link-inputs');
                        let $linkName = $('.description-input', $linkInputs);

                        fillIn($linkName, linkName);
                        click($saveButton);
                        andThen(() => {
                          let $editButton = $('.fd-edit', $sheetHeader);

                          assert.equal($editButton.length, 1);

                          let $diagramItem = $('.fd-list .fd-list-item');
                          let $diagramItemSpan = $diagramItem.children('span');
                          assert.equal($diagramItemSpan.text(), diagramName);
                          assert.equal($diagramItemSpan.hasClass('active'), true);

                          let limitPredicate = new SimplePredicate('stage', FilterOperator.Eq, stage.get('id'));

                          let builder = new Builder(store, 'fd-dev-inheritance')
                            .selectByProjection('FdPreloadMetadata')
                            .where(limitPredicate);

                          store.query('fd-dev-inheritance', builder.build()).then((result) => {
                            assert.equal(result.length, 1);
                            assert.equal(result.get('firstObject.name'), linkName);
                            assert.equal(result.get('firstObject.nameStr'), linkName);
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

    executeTestWithData(store, assert, done, null, testCallback);
  });
});

test('create new diagram with realization', (assert) => {
  let done = assert.async();
  assert.expect(7);

  // Arrange.
  let diagramName = 'TestDiagram';
  let linkName = 'TestLinkName';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-diagrams?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createDiagramBtnOnPage = $('.flexberry-button');
            $createDiagramBtnOnPage.click();

            wait().then(() => {
              let $diagramSheet = $('.fd-sheet.diagram-sheet');

              assert.equal($diagramSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $diagramSheet);
              let $createDiagramCard = $($createButtons[0]);
              let $createDiagramButton = $('.content', $createDiagramCard);

              click($createDiagramButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $diagramSheet);
                let $diagramName = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($diagramName, diagramName);
                andThen(() => {
                  let $toolbar = $('.fd-uml-diagram-toolbar');
                  let $clsButton = $('button[title=\'Класс\']', $toolbar);
                  $clsButton.click();

                  let $svg = $('svg[joint-selector=\'svg\']');
                  click($svg);
                  andThen(() => {
                    $clsButton.click();
                    click($svg);
                    andThen(() => {
                      let $realizationButton = $('button[title=\'Реализация\']', $toolbar);
                      $realizationButton.click();

                      let $svg = $('svg[joint-selector=\'svg\']');
                      let $svgCells = $('g[joint-selector=\'cells\']', $svg);
                      let $svgCellsChildren = $svgCells.children();

                      let $svgStartClass = $($svgCellsChildren[0]);
                      let $svgEndClass = $($svgCellsChildren[1]);

                      click($svgStartClass);
                      click($svgEndClass);
                      andThen(() => {
                        let $linkInputs = $('.uml-link-inputs');
                        let $linkName = $('.description-input', $linkInputs);

                        fillIn($linkName, linkName);
                        click($saveButton);
                        andThen(() => {
                          let $editButton = $('.fd-edit', $sheetHeader);

                          assert.equal($editButton.length, 1);

                          let $diagramItem = $('.fd-list .fd-list-item');
                          let $diagramItemSpan = $diagramItem.children('span');
                          assert.equal($diagramItemSpan.text(), diagramName);
                          assert.equal($diagramItemSpan.hasClass('active'), true);

                          let limitPredicate = new SimplePredicate('stage', FilterOperator.Eq, stage.get('id'));

                          let builder = new Builder(store, 'fd-dev-realization')
                            .selectByProjection('FdPreloadMetadata')
                            .where(limitPredicate);

                          store.query('fd-dev-realization', builder.build()).then((result) => {
                            assert.equal(result.length, 1);
                            assert.equal(result.get('firstObject.name'), linkName);
                            assert.equal(result.get('firstObject.nameStr'), linkName);
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

    executeTestWithData(store, assert, done, null, testCallback);
  });
});
