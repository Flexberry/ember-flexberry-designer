import { module, skip } from 'qunit';
import { run } from '@ember/runloop';
import startApp from 'dummy/tests/helpers/start-app';
import executeTestWithData from 'dummy/tests/helpers/execute-test-with-data';
import $ from 'jquery';
import { Promise } from 'rsvp';
import Builder from 'ember-flexberry-data/query/builder';
import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Condition from 'ember-flexberry-data/query/condition';

let app;
let store;
module('Acceptance | fd-class-sheet | create class', {
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

skip('create new empty class', (assert) => {
  let done = assert.async();
  assert.expect(5);

  // Arrange.
  let className = 'TestClass';
  run(() => {
    // Act & Assert.
    let testCallback = function(assert, stage) {
      return new Promise(function(resolve, reject) {
          visit(`fd-application-model?gotostage=${stage.get('id')}`);
          andThen(() => {
            let $createClassBtnOnPage = $('.flexberry-button');
            $createClassBtnOnPage.click();

            wait().then(() => {
              let $classSheet = $('.fd-sheet.class-sheet');

              assert.equal($classSheet.hasClass('visible'), true);

              let $createButtons = $('.fd-create-cards .card', $classSheet);
              let $createClsCard = $($createButtons[0]);
              let $createClsButton = $('.content', $createClsCard);

              click($createClsButton);
              andThen(() => {
                let $sheetHeader = $('.fd-sheet-header', $classSheet);
                let $className = $('.form-header.fluid.flexberry-textbox .ember-text-field', $sheetHeader);
                let $saveButton = $('.fd-save', $sheetHeader);

                fillIn($className, className);
                andThen(() => {
                  click($saveButton);
                  andThen(() => {
                    let $editButton = $('.fd-edit', $sheetHeader);

                    assert.equal($editButton.length, 1);

                    let $classItem = $('.fd-list .fd-list-item');
                    let $classItemSpan = $classItem.children('span');
                    assert.equal($classItemSpan.text(), className);
                    assert.equal($classItemSpan.hasClass('active'), true);

                    let limitPredicate = new ComplexPredicate(Condition.And,
                      new SimplePredicate('name', FilterOperator.Eq, className),
                      new SimplePredicate('stage', FilterOperator.Eq, stage.get('id')));

                    let builder = new Builder(store, 'fd-dev-class').where(limitPredicate).count();
                    store.query('fd-dev-class', builder.build()).then((result) => {
                      assert.equal(result.meta.count, 1, 'Class \'' + className + '\'not found in store');
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
