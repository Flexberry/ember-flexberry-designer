define('dummy/tests/adapters/application-offline.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - adapters');
  test('adapters/application-offline.js should pass jscs', function () {
    ok(true, 'adapters/application-offline.js should pass jscs.');
  });
});
define('dummy/tests/adapters/application-offline.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application-offline.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application-offline.js should pass jshint.');
  });
});
define('dummy/tests/adapters/application.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - adapters');
  test('adapters/application.js should pass jscs', function () {
    ok(true, 'adapters/application.js should pass jscs.');
  });
});
define('dummy/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('dummy/tests/app.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - .');
  test('app.js should pass jscs', function () {
    ok(true, 'app.js should pass jscs.');
  });
});
define('dummy/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('dummy/tests/controllers/application.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - controllers');
  test('controllers/application.js should pass jscs', function () {
    ok(true, 'controllers/application.js should pass jscs.');
  });
});
define('dummy/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('dummy/tests/controllers/sitemap-node.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - controllers');
  test('controllers/sitemap-node.js should pass jscs', function () {
    ok(true, 'controllers/sitemap-node.js should pass jscs.');
  });
});
define('dummy/tests/controllers/sitemap-node.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/sitemap-node.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/sitemap-node.js should pass jshint.');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('dummy/tests/helpers/destroy-app.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - helpers');
  test('helpers/destroy-app.js should pass jscs', function () {
    ok(true, 'helpers/destroy-app.js should pass jscs.');
  });
});
define('dummy/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('dummy/tests/helpers/ember-i18n/test-helpers', ['exports', 'ember'], function (exports, _ember) {

  // example usage: find(`.header:contains(${t('welcome_message')})`)
  _ember['default'].Test.registerHelper('t', function (app, key, interpolations) {
    var i18n = app.__container__.lookup('service:i18n');
    return i18n.t(key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  _ember['default'].Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = app.testHelpers.t(key, interpolations);

    assertTranslation(element, key, text);
  });

  var assertTranslation = (function () {
    if (typeof QUnit !== 'undefined' && typeof ok === 'function') {
      return function (element, key, text) {
        ok(find(element + ':contains(' + text + ')').length, 'Found translation key ' + key + ' in ' + element);
      };
    } else if (typeof expect === 'function') {
      return function (element, key, text) {
        var found = !!find(element + ':contains(' + text + ')').length;
        expect(found).to.equal(true);
      };
    } else {
      return function () {
        throw new Error("ember-i18n could not find a compatible test framework");
      };
    }
  })();
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _dummyTestsHelpersStartApp, _dummyTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _dummyTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _dummyTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('dummy/tests/helpers/module-for-acceptance.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - helpers');
  test('helpers/module-for-acceptance.js should pass jscs', function () {
    ok(true, 'helpers/module-for-acceptance.js should pass jscs.');
  });
});
define('dummy/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _dummyResolver, _dummyConfigEnvironment) {

  var resolver = _dummyResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('dummy/tests/helpers/resolver.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - helpers');
  test('helpers/resolver.js should pass jscs', function () {
    ok(true, 'helpers/resolver.js should pass jscs.');
  });
});
define('dummy/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _dummyApp, _dummyConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _dummyConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _dummyApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/helpers/start-app.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - helpers');
  test('helpers/start-app.js should pass jscs', function () {
    ok(true, 'helpers/start-app.js should pass jscs.');
  });
});
define('dummy/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('dummy/tests/helpers/validate-properties', ['exports', 'ember', 'ember-qunit'], function (exports, _ember, _emberQunit) {
  exports.testValidPropertyValues = testValidPropertyValues;
  exports.testInvalidPropertyValues = testInvalidPropertyValues;

  var run = _ember['default'].run;

  function validateValues(object, propertyName, values, isTestForValid) {
    var promise = null;
    var validatedValues = [];

    values.forEach(function (value) {
      function handleValidation(errors) {
        var hasErrors = object.get('errors.' + propertyName + '.firstObject');
        if (hasErrors && !isTestForValid || !hasErrors && isTestForValid) {
          validatedValues.push(value);
        }
      }

      run(object, 'set', propertyName, value);

      var objectPromise = null;
      run(function () {
        objectPromise = object.validate().then(handleValidation, handleValidation);
      });

      // Since we are setting the values in a different run loop as we are validating them,
      // we need to chain the promises so that they run sequentially. The wrong value will
      // be validated if the promises execute concurrently
      promise = promise ? promise.then(objectPromise) : objectPromise;
    });

    return promise.then(function () {
      return validatedValues;
    });
  }

  function testPropertyValues(propertyName, values, isTestForValid, context) {
    var validOrInvalid = isTestForValid ? 'Valid' : 'Invalid';
    var testName = validOrInvalid + ' ' + propertyName;

    (0, _emberQunit.test)(testName, function (assert) {
      var object = this.subject();

      if (context && typeof context === 'function') {
        context(object);
      }

      // Use QUnit.dump.parse so null and undefined can be printed as literal 'null' and
      // 'undefined' strings in the assert message.
      var valuesString = QUnit.dump.parse(values).replace(/\n(\s+)?/g, '').replace(/,/g, ', ');
      var assertMessage = 'Expected ' + propertyName + ' to have ' + validOrInvalid.toLowerCase() + ' values: ' + valuesString;

      return validateValues(object, propertyName, values, isTestForValid).then(function (validatedValues) {
        assert.deepEqual(validatedValues, values, assertMessage);
      });
    });
  }

  function testValidPropertyValues(propertyName, values, context) {
    testPropertyValues(propertyName, values, true, context);
  }

  function testInvalidPropertyValues(propertyName, values, context) {
    testPropertyValues(propertyName, values, false, context);
  }
});
define('dummy/tests/integration/components/fd-editform-control-test', ['exports', 'ember', 'ember-qunit', 'ember-flexberry-designer/objects/fd-editform-row', 'ember-flexberry-designer/objects/fd-editform-control', 'ember-flexberry-designer/objects/fd-editform-group', 'ember-flexberry-designer/objects/fd-editform-tabgroup', 'ember-flexberry-designer/objects/fd-editform-tab'], function (exports, _ember, _emberQunit, _emberFlexberryDesignerObjectsFdEditformRow, _emberFlexberryDesignerObjectsFdEditformControl, _emberFlexberryDesignerObjectsFdEditformGroup, _emberFlexberryDesignerObjectsFdEditformTabgroup, _emberFlexberryDesignerObjectsFdEditformTab) {

  (0, _emberQunit.moduleForComponent)('fd-editform-control', 'Integration | Component | fd-editform-control', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    var _this = this;

    this.set('selectControlAction', function (control) {
      return _this.set('selectedControl', control);
    });
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 79
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'fd-editform-control', [], ['control', ['subexpr', '@mut', [['get', 'control', ['loc', [null, [1, 30], [1, 37]]]]], [], []], 'selectControlAction', ['subexpr', '@mut', [['get', 'selectControlAction', ['loc', [null, [1, 58], [1, 77]]]]], [], []]], ['loc', [null, [1, 0], [1, 79]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.set('control', _emberFlexberryDesignerObjectsFdEditformControl['default'].create({ type: 'bool', caption: 'Attribute #1' }));
    assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With simple control.');

    assert.notOk(this.get('selectedControl'), 'No selected control.');
    this.$('input').click();
    assert.ok(this.get('selectedControl') === this.get('control'), 'Click on simple control.');

    this.set('control', _emberFlexberryDesignerObjectsFdEditformGroup['default'].create({
      caption: 'Group #1',
      rows: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformRow['default'].create({
        controls: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformControl['default'].create({ type: 'bool', caption: 'Attribute #1' })])
      })])
    }));
    assert.ok(/\s*Group #1\s*Attribute #1\s*/.test(this.$().text()), 'With group.');

    this.$('input').click();
    assert.ok(this.get('selectedControl') === this.get('control.rows.firstObject.controls.firstObject'), 'Click on nested control.');
    this.$('.ember-view.field:first').click();
    assert.ok(this.get('selectedControl') === this.get('control'), 'Click on group control.');

    this.set('control', _emberFlexberryDesignerObjectsFdEditformTabgroup['default'].create({
      tabs: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformTab['default'].create({
        caption: 'Tab #1',
        rows: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformRow['default'].create({
          controls: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformControl['default'].create({ type: 'bool', caption: 'Attribute #1' })])
        })])
      })])
    }));
    assert.ok(/\s*Tab #1\s*Attribute #1\s*/.test(this.$().text()), 'With tabs.');

    this.$('input').click();
    assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject.rows.firstObject.controls.firstObject'), 'Click on nested control.');
    this.$('.active.item').click();
    assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject'), 'Click on tab control.');
  });
});
define('dummy/tests/integration/components/fd-editform-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - integration/components');
  test('integration/components/fd-editform-control-test.js should pass jscs', function () {
    ok(true, 'integration/components/fd-editform-control-test.js should pass jscs.');
  });
});
define('dummy/tests/integration/components/fd-editform-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/fd-editform-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-editform-control-test.js should pass jshint.');
  });
});
define('dummy/tests/integration/components/fd-editform-row-test', ['exports', 'ember', 'ember-qunit', 'ember-flexberry-designer/objects/fd-editform-row', 'ember-flexberry-designer/objects/fd-editform-control'], function (exports, _ember, _emberQunit, _emberFlexberryDesignerObjectsFdEditformRow, _emberFlexberryDesignerObjectsFdEditformControl) {

  (0, _emberQunit.moduleForComponent)('fd-editform-row', 'Integration | Component | fd-editform-row', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'fd-editform-row', [], ['row', ['subexpr', '@mut', [['get', 'row', ['loc', [null, [1, 22], [1, 25]]]]], [], []]], ['loc', [null, [1, 0], [1, 27]]]]],
        locals: [],
        templates: []
      };
    })()));

    this.set('row', _emberFlexberryDesignerObjectsFdEditformRow['default'].create({
      controls: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformControl['default'].create({
        type: 'bool',
        caption: 'Attribute #1'
      })])
    }));
    assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With one control.');
    assert.notOk(this.$('.ember-view:first').hasClass('fields'));
    assert.notOk(this.$('.ember-view:first').hasClass('equal'));
    assert.notOk(this.$('.ember-view:first').hasClass('width'));

    this.set('row', _emberFlexberryDesignerObjectsFdEditformRow['default'].create({
      controls: _ember['default'].A([_emberFlexberryDesignerObjectsFdEditformControl['default'].create({
        type: 'bool',
        caption: 'Attribute #1'
      }), _emberFlexberryDesignerObjectsFdEditformControl['default'].create({
        type: 'bool',
        caption: 'Attribute #2'
      })])
    }));
    assert.ok(/\s*Attribute #1\s*Attribute #2\s*/.test(this.$().text()), 'With many controls.');
    assert.ok(this.$('.ember-view:first').hasClass('fields'));
    assert.ok(this.$('.ember-view:first').hasClass('equal'));
    assert.ok(this.$('.ember-view:first').hasClass('width'));
  });
});
define('dummy/tests/integration/components/fd-editform-row-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - integration/components');
  test('integration/components/fd-editform-row-test.js should pass jscs', function () {
    ok(true, 'integration/components/fd-editform-row-test.js should pass jscs.');
  });
});
define('dummy/tests/integration/components/fd-editform-row-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/fd-editform-row-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-editform-row-test.js should pass jshint.');
  });
});
define('dummy/tests/integration/components/fd-visual-diagram-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('fd-visual-diagram', 'Integration | Component | fd visual diagram', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'fd-visual-diagram', ['loc', [null, [1, 0], [1, 21]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.6',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'fd-visual-diagram', [], [], 0, null, ['loc', [null, [2, 4], [4, 26]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('dummy/tests/integration/components/fd-visual-diagram-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - integration/components');
  test('integration/components/fd-visual-diagram-test.js should pass jscs', function () {
    ok(true, 'integration/components/fd-visual-diagram-test.js should pass jscs.');
  });
});
define('dummy/tests/integration/components/fd-visual-diagram-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/fd-visual-diagram-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-visual-diagram-test.js should pass jshint.');
  });
});
define('dummy/tests/integration/components/fd-visual-listform-form', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('fd-visual-listform-form', 'Integration | Component | fd visual edit list form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', { listform: { listAttributes: [] }, editControl: { type: 'string' } });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 39
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'fd-visual-listform-form', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [1, 32], [1, 37]]]]], [], []]], ['loc', [null, [1, 0], [1, 39]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal('', '');

    /*assert.equal(this.$().text().trim(), '');*/

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.6',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 2
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.6',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'fd-visual-listform-form', [], ['model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [2, 35], [2, 40]]]]], [], []]], 0, null, ['loc', [null, [2, 2], [4, 32]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    /*assert.equal(this.$().text().trim(), 'template block text');*/
    assert.equal('', '');
  });
});
define('dummy/tests/integration/components/fd-visual-listform-form.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - integration/components');
  test('integration/components/fd-visual-listform-form.js should pass jscs', function () {
    ok(true, 'integration/components/fd-visual-listform-form.js should pass jscs.');
  });
});
define('dummy/tests/integration/components/fd-visual-listform-form.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/fd-visual-listform-form.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-visual-listform-form.js should pass jshint.');
  });
});
define('dummy/tests/locales/en/translations.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - locales/en');
  test('locales/en/translations.js should pass jscs', function () {
    ok(true, 'locales/en/translations.js should pass jscs.');
  });
});
define('dummy/tests/locales/en/translations.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - locales/en/translations.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/en/translations.js should pass jshint.');
  });
});
define('dummy/tests/locales/ru/translations.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - locales/ru');
  test('locales/ru/translations.js should pass jscs', function () {
    ok(true, 'locales/ru/translations.js should pass jscs.');
  });
});
define('dummy/tests/locales/ru/translations.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - locales/ru/translations.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/ru/translations.js should pass jshint.');
  });
});
define('dummy/tests/models/custom-inflector-rules.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - models');
  test('models/custom-inflector-rules.js should pass jscs', function () {
    ok(true, 'models/custom-inflector-rules.js should pass jscs.');
  });
});
define('dummy/tests/models/custom-inflector-rules.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/custom-inflector-rules.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/custom-inflector-rules.js should pass jshint.');
  });
});
define('dummy/tests/resolver.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - .');
  test('resolver.js should pass jscs', function () {
    ok(true, 'resolver.js should pass jscs.');
  });
});
define('dummy/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('dummy/tests/router.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - .');
  test('router.js should pass jscs', function () {
    ok(true, 'router.js should pass jscs.');
  });
});
define('dummy/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('dummy/tests/routes/application.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - routes');
  test('routes/application.js should pass jscs', function () {
    ok(true, 'routes/application.js should pass jscs.');
  });
});
define('dummy/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('dummy/tests/services/store.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - services');
  test('services/store.js should pass jscs', function () {
    ok(true, 'services/store.js should pass jscs.');
  });
});
define('dummy/tests/services/store.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/store.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/store.js should pass jshint.');
  });
});
define('dummy/tests/services/user-settings.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - services');
  test('services/user-settings.js should pass jscs', function () {
    ok(true, 'services/user-settings.js should pass jscs.');
  });
});
define('dummy/tests/services/user-settings.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/user-settings.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/user-settings.js should pass jshint.');
  });
});
define('dummy/tests/test-helper', ['exports', 'dummy/tests/helpers/resolver', 'ember-qunit'], function (exports, _dummyTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_dummyTestsHelpersResolver['default']);
});
define('dummy/tests/test-helper.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - .');
  test('test-helper.js should pass jscs', function () {
    ok(true, 'test-helper.js should pass jscs.');
  });
});
define('dummy/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-appstruct-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-appstruct-form', 'Unit | Controller | new platform flexberry web designer appstruct form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-appstruct-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-appstruct-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-appstruct-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-appstruct-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-appstruct-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-appstruct-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-association-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-association-edit-form', 'Unit | Controller | fd association edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-association-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-association-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-association-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-association-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-association-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-association-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-association-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-association-list-form', 'Unit | Controller | fd association list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-association-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-association-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-association-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-association-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-association-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-association-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-class-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-class-edit-form', 'Unit | Controller | fd class edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-class-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-class-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-class-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-class-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-class-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-class-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-class-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-class-list-form', 'Unit | Controller | fd class list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-class-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-class-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-class-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-class-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-class-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-class-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-configuration-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-configuration-edit-form', 'Unit | Controller | fd configuration edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-configuration-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-configuration-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-configuration-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-configuration-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-configuration-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-configuration-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-configuration-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-configuration-list-form', 'Unit | Controller | fd configuration list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-configuration-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-configuration-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-configuration-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-configuration-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-configuration-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-configuration-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-diagram-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-diagram-edit-form', 'Unit | Controller | fd diagram edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-diagram-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-diagram-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-diagram-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-diagram-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-diagram-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-diagram-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-diagram-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-diagram-list-form', 'Unit | Controller | fd diagram list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-diagram-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-diagram-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-diagram-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-diagram-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-diagram-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-diagram-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-editform-constructor-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-editform-constructor', 'Unit | Controller | fd editform constructor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-editform-constructor-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-editform-constructor-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-editform-constructor-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-editform-constructor-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-editform-constructor-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-editform-constructor-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-generation-process-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-generation-process-form', 'Unit | Controller | fd generation process form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-generation-process-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-generation-process-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-generation-process-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-generation-process-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-generation-process-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-generation-process-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-inheritance-edit-form', 'Unit | Controller | fd inheritance edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-inheritance-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-inheritance-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-inheritance-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-inheritance-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-inheritance-list-form', 'Unit | Controller | fd inheritance list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-inheritance-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-inheritance-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-inheritance-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-inheritance-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-stage-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-stage-edit-form', 'Unit | Controller | fd stage edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-stage-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-stage-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-stage-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-stage-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-stage-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-stage-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-stage-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-stage-list-form', 'Unit | Controller | fd stage list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-stage-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-stage-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-stage-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-stage-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-stage-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-stage-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-system-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-system-edit-form', 'Unit | Controller | fd system edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-system-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-system-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-system-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-system-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-system-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-system-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-system-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-system-list-form', 'Unit | Controller | fd system list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-system-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-system-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-system-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-system-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-system-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-system-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-view-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-view-edit-form', 'Unit | Controller | fd view edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-view-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-view-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-view-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-view-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-view-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-view-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-view-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-view-list-form', 'Unit | Controller | fd view list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-view-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-view-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-view-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-view-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-view-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-view-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-visual-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-visual-edit-form', 'Unit | Controller | fd visual edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-visual-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-visual-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-visual-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-visual-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-visual-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-visual-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/fd-visual-listform', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:fd-visual-listform', 'Unit | Controller | fd visual edit list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-visual-listform.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/fd-visual-listform.js should pass jscs', function () {
    ok(true, 'unit/controllers/fd-visual-listform.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/fd-visual-listform.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/fd-visual-listform.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-visual-listform.js should pass jshint.');
  });
});
define('dummy/tests/unit/mixins/fd-draggable-control-test', ['exports', 'ember', 'ember-flexberry-designer/mixins/fd-draggable-control', 'qunit'], function (exports, _ember, _emberFlexberryDesignerMixinsFdDraggableControl, _qunit) {

  (0, _qunit.module)('Unit | Mixin | fd draggable control');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var FdDraggableControlObject = _ember['default'].Object.extend(_emberFlexberryDesignerMixinsFdDraggableControl['default']);
    var subject = FdDraggableControlObject.create();
    assert.ok(subject);
  });
});
define('dummy/tests/unit/mixins/fd-draggable-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/mixins');
  test('unit/mixins/fd-draggable-control-test.js should pass jscs', function () {
    ok(true, 'unit/mixins/fd-draggable-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/mixins/fd-draggable-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/mixins/fd-draggable-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/fd-draggable-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/mixins/fd-limit-by-stage-test', ['exports', 'ember', 'qunit', 'ember-flexberry-data', 'ember-flexberry-designer/mixins/fd-limit-by-stage'], function (exports, _ember, _qunit, _emberFlexberryData, _emberFlexberryDesignerMixinsFdLimitByStage) {

  (0, _qunit.module)('Unit | Mixin | fd limit by stage');

  (0, _qunit.test)('it really works', function (assert) {
    var subject = _ember['default'].Object.extend(_emberFlexberryDesignerMixinsFdLimitByStage['default']).create();

    // Imitation the service.
    subject.set('currentContext', _ember['default'].Object.create({ getCurrentStage: function getCurrentStage() {
        return 'stage';
      } }));

    assert.ok(subject.objectListViewLimitPredicate() instanceof _emberFlexberryData.Query.SimplePredicate);
  });
});
define('dummy/tests/unit/mixins/fd-limit-by-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/mixins');
  test('unit/mixins/fd-limit-by-stage-test.js should pass jscs', function () {
    ok(true, 'unit/mixins/fd-limit-by-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/mixins/fd-limit-by-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/mixins/fd-limit-by-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/fd-limit-by-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-ad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-ad', 'Unit | Model | fd-ad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-ad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-ad-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-ad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-ad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-ad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-ad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-aggregation', 'Unit | Model | fd-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-association', 'Unit | Model | fd-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-base-association', 'Unit | Model | fd-base-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-cad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-cad', 'Unit | Model | fd-cad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-cad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-cad-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-cad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-cad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-cad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-cad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-case-property-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-case-property', 'Unit | Model | fd-case-property', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-case-property-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-case-property-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-case-property-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-case-property-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-case-property-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-case-property-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-class', 'Unit | Model | fd-class', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-class-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-cod-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-cod', 'Unit | Model | fd-cod', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-cod-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-cod-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-cod-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-cod-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-cod-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-cod-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-configuration-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-configuration', 'Unit | Model | fd-configuration', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-configuration-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-configuration-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-configuration-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-configuration-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-configuration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-configuration-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-aggregation', 'Unit | Model | fd-dev-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-associated-detail-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-associated-detail-view', 'Unit | Model | fd-dev-associated-detail-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-associated-detail-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-associated-detail-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-associated-detail-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-associated-detail-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-associated-detail-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-associated-detail-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-association', 'Unit | Model | fd-dev-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-attribute-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-attribute', 'Unit | Model | fd-dev-attribute', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-attribute-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-attribute-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-attribute-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-attribute-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-attribute-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-attribute-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-base-association', 'Unit | Model | fd-dev-base-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-class', 'Unit | Model | fd-dev-class', {
    // Specify the other units that are required for this test.
    needs: [
    /* merged manually start */
    'service:i18n',
    /* merged manually end */

    'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-class-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-control-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-control-type', 'Unit | Model | fd-dev-control-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-control-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-control-type-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-control-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-control-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-control-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-control-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-diagram-link', 'Unit | Model | fd-dev-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-filelink', 'Unit | Model | fd-dev-filelink', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-form-control', 'Unit | Model | fd-dev-form-control', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-form-view', 'Unit | Model | fd-dev-form-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-inheritance', 'Unit | Model | fd-dev-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-method-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-method', 'Unit | Model | fd-dev-method', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-method-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-method-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-method-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-method-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-method-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-method-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting', 'Unit | Model | fd-dev-module-setting', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-module-setting-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-module-setting-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-module-setting-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-module-setting-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting-type', 'Unit | Model | fd-dev-module-setting-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-module-setting-type-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-module-setting-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-module-setting-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-module-setting-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-parameter-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-parameter', 'Unit | Model | fd-dev-parameter', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-parameter-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-parameter-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-parameter-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-parameter-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-parameter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-parameter-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-process-status-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-process-status', 'Unit | Model | fd-dev-process-status', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-process-status-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-process-status-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-process-status-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-process-status-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-process-status-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-process-status-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-stage-history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-stage-history', 'Unit | Model | fd-dev-stage-history', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-stage-history-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-stage-history-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-stage-history-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-stage-history-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-stage-history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-stage-history-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-stage', 'Unit | Model | fd-dev-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-stage-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-system', 'Unit | Model | fd-dev-system', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-system-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-task-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-task', 'Unit | Model | fd-dev-task', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-task-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-task-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-task-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-task-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-task-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-task-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-type-definition-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-type-definition', 'Unit | Model | fd-dev-type-definition', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-type-definition-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-type-definition-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-type-definition-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-type-definition-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-type-definition-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-type-definition-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ad', 'Unit | Model | fd-dev-uml-ad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-ad-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-ad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-ad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-ad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cad', 'Unit | Model | fd-dev-uml-cad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-cad-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-cad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-cad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-cad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cod-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cod', 'Unit | Model | fd-dev-uml-cod', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cod-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-cod-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-cod-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cod-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-cod-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-cod-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-dpd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-dpd', 'Unit | Model | fd-dev-uml-dpd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-dpd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-dpd-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-dpd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-dpd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-dpd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-dpd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-sd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-sd', 'Unit | Model | fd-dev-uml-sd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-sd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-sd-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-sd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-sd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-sd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-sd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-std-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-std', 'Unit | Model | fd-dev-uml-std', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-std-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-std-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-std-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-std-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-std-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-std-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ucd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ucd', 'Unit | Model | fd-dev-uml-ucd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ucd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-uml-ucd-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-uml-ucd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ucd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-uml-ucd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-ucd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dev-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-view', 'Unit | Model | fd-dev-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dev-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dev-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dev-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dev-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-diagram-link', 'Unit | Model | fd-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-diagram-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-diagram', 'Unit | Model | fd-diagram', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-diagram-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-diagram-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-diagram-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-diagram-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-diagram-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-diagram-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-dpd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dpd', 'Unit | Model | fd-dpd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dpd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-dpd-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-dpd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-dpd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-dpd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dpd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-filelink', 'Unit | Model | fd-filelink', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-form-control', 'Unit | Model | fd-form-control', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-form-view', 'Unit | Model | fd-form-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-generation-step-log-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-generation-step-log', 'Unit | Model | fd-generation-step-log', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-generation-step-log-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-generation-step-log-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-generation-step-log-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-generation-step-log-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-generation-step-log-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-generation-step-log-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-generation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-generation', 'Unit | Model | fd-generation', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-generation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-generation-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-generation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-generation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-generation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-generation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-inheritance', 'Unit | Model | fd-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-object-in-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-object-in-system', 'Unit | Model | fd-object-in-system', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-object-in-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-object-in-system-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-object-in-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-object-in-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-object-in-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-object-in-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-plugin-on-rep-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-plugin-on-rep-object', 'Unit | Model | fd-plugin-on-rep-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-plugin-on-rep-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-plugin-on-rep-object-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-plugin-on-rep-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-plugin-on-rep-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-plugin-on-rep-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-plugin-on-rep-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-project-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-project', 'Unit | Model | fd-project', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-project-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-project-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-project-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-project-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-project-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-project-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-registered-plug-in-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-registered-plug-in', 'Unit | Model | fd-registered-plug-in', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-registered-plug-in-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-registered-plug-in-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-registered-plug-in-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-registered-plug-in-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-registered-plug-in-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-registered-plug-in-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object', 'Unit | Model | fd-repository-browser-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-repository-browser-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-repository-browser-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-repository-browser-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-browser-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-with-a-c-l-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object-with-a-c-l', 'Unit | Model | fd-repository-browser-data-object-with-a-c-l', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-with-a-c-l-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-repository-browser-data-object-with-a-c-l-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-repository-browser-data-object-with-a-c-l-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-with-a-c-l-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-repository-browser-data-object-with-a-c-l-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-browser-data-object-with-a-c-l-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-repository-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-data-object', 'Unit | Model | fd-repository-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-repository-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-repository-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-repository-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-repository-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-repository-object-with-plugins-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-object-with-plugins', 'Unit | Model | fd-repository-object-with-plugins', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-object-with-plugins-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-repository-object-with-plugins-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-repository-object-with-plugins-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-repository-object-with-plugins-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-repository-object-with-plugins-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-object-with-plugins-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-repository-ref-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-ref-data-object', 'Unit | Model | fd-repository-ref-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-ref-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-repository-ref-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-repository-ref-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-repository-ref-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-repository-ref-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-ref-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-repository-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository', 'Unit | Model | fd-repository', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-repository-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-repository-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-repository-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-repository-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-sd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-sd', 'Unit | Model | fd-sd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-sd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-sd-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-sd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-sd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-sd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-sd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-stage', 'Unit | Model | fd-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-stage-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-std-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-std', 'Unit | Model | fd-std', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-std-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-std-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-std-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-std-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-std-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-std-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-subsystem-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-subsystem', 'Unit | Model | fd-subsystem', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-subsystem-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-subsystem-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-subsystem-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-subsystem-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-subsystem-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-subsystem-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-ucd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-ucd', 'Unit | Model | fd-ucd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-ucd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-ucd-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-ucd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-ucd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-ucd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-ucd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-view', 'Unit | Model | fd-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-visual-edit-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-visual-edit-control', 'Unit | Model | fd visual edit control');

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-visual-edit-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-visual-edit-control-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-visual-edit-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-visual-edit-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-visual-edit-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-visual-edit-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/fd-visual-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-visual-edit-form', 'Unit | Model | fd visual edit form', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-visual-edit-control']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-visual-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/fd-visual-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/models/fd-visual-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/fd-visual-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/fd-visual-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-visual-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-association-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-association-edit-form', 'Unit | Route | fd association edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-association-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-association-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-association-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-association-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-association-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-association-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-association-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-association-list-form', 'Unit | Route | fd association list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-association-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-association-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-association-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-association-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-association-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-association-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-class-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-class-edit-form', 'Unit | Route | fd class edit form', {
    // Specify the other units that are required for this test.
    needs: ['service:fd-current-project-context']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-class-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-class-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-class-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-class-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-class-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-class-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-class-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-class-list-form', 'Unit | Route | fd class list form', {
    // Specify the other units that are required for this test.
    needs: ['service:fd-current-project-context']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-class-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-class-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-class-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-class-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-class-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-class-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-configuration-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-configuration-edit-form', 'Unit | Route | fd configuration edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-configuration-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-configuration-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-configuration-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-configuration-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-configuration-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-configuration-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-configuration-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-configuration-list-form', 'Unit | Route | fd configuration list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-configuration-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-configuration-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-configuration-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-configuration-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-configuration-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-configuration-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-diagram-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-diagram-edit-form', 'Unit | Route | fd diagram edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-diagram-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-diagram-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-diagram-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-diagram-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-diagram-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-diagram-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-diagram-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-diagram-list-form', 'Unit | Route | fd diagram list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-diagram-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-diagram-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-diagram-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-diagram-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-diagram-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-diagram-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-editform-constructor-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-editform-constructor', 'Unit | Route | fd editform constructor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-editform-constructor-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-editform-constructor-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-editform-constructor-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-editform-constructor-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-editform-constructor-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-editform-constructor-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-generation-process-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-generation-process-form', 'Unit | Route | fd generation process form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-generation-process-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-generation-process-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-generation-process-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-generation-process-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-generation-process-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-generation-process-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-inheritance-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-inheritance-edit-form', 'Unit | Route | fd inheritance edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-inheritance-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-inheritance-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-inheritance-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-inheritance-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-inheritance-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-inheritance-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-inheritance-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-inheritance-list-form', 'Unit | Route | fd inheritance list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-inheritance-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-inheritance-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-inheritance-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-inheritance-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-inheritance-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-inheritance-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-stage-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-stage-edit-form', 'Unit | Route | fd stage edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-stage-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-stage-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-stage-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-stage-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-stage-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-stage-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-stage-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-stage-list-form', 'Unit | Route | fd stage list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-stage-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-stage-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-stage-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-stage-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-stage-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-stage-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-system-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-system-edit-form', 'Unit | Route | fd system edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-system-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-system-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-system-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-system-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-system-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-system-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-system-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-system-list-form', 'Unit | Route | fd system list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-system-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-system-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-system-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-system-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-system-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-system-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-view-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-view-edit-form', 'Unit | Route | fd view edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-view-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-view-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-view-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-view-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-view-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-view-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-view-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-view-list-form', 'Unit | Route | fd view list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-view-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-view-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-view-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-view-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-view-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-view-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-visual-edit-control', 'Unit | Route | fd visual edit control', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-visual-edit-control-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-visual-edit-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-visual-edit-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-visual-edit-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-visual-edit-form', 'Unit | Route | fd visual edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-visual-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-visual-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-visual-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-visual-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/fd-visual-listform', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fd-visual-listform', 'Unit | Route | fd visual edit list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-visual-listform.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/fd-visual-listform.js should pass jscs', function () {
    ok(true, 'unit/routes/fd-visual-listform.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/fd-visual-listform.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/fd-visual-listform.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-visual-listform.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-ad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-ad', 'Unit | Serializer | fd-ad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-ad', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-ad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-ad-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-ad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-ad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-ad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-ad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-aggregation', 'Unit | Serializer | fd-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-aggregation', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-association', 'Unit | Serializer | fd-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-association', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-base-association', 'Unit | Serializer | fd-base-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-base-association', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-cad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-cad', 'Unit | Serializer | fd-cad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-cad', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-cad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-cad-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-cad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-cad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-cad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-cad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-case-property-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-case-property', 'Unit | Serializer | fd-case-property', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-case-property', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-case-property-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-case-property-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-case-property-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-case-property-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-case-property-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-case-property-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-class', 'Unit | Serializer | fd-class', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-class', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-class-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-cod-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-cod', 'Unit | Serializer | fd-cod', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-cod', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-cod-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-cod-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-cod-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-cod-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-cod-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-cod-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-configuration-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-configuration', 'Unit | Serializer | fd-configuration', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-configuration', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-configuration-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-configuration-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-configuration-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-configuration-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-configuration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-configuration-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-aggregation', 'Unit | Serializer | fd-dev-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-aggregation', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-associated-detail-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-associated-detail-view', 'Unit | Serializer | fd-dev-associated-detail-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-associated-detail-view', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-associated-detail-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-associated-detail-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-associated-detail-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-associated-detail-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-associated-detail-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-associated-detail-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-association', 'Unit | Serializer | fd-dev-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-association', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-attribute-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-attribute', 'Unit | Serializer | fd-dev-attribute', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-attribute', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-attribute-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-attribute-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-attribute-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-attribute-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-attribute-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-attribute-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-base-association', 'Unit | Serializer | fd-dev-base-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-base-association', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-class', 'Unit | Serializer | fd-dev-class', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-class', 'transform:file', 'transform:decimal', 'transform:guid',

    /* merged manually start */
    'transform:containers-tree',
    /* merged manually end */
    'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class',
    /* merged manually start */
    'service:i18n',
    /* merged manually end */

    'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-class-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-control-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-control-type', 'Unit | Serializer | fd-dev-control-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-control-type', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-control-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-control-type-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-control-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-control-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-control-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-control-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-diagram-link', 'Unit | Serializer | fd-dev-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-diagram-link', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-filelink', 'Unit | Serializer | fd-dev-filelink', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-filelink', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-form-control', 'Unit | Serializer | fd-dev-form-control', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-form-control', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-form-view', 'Unit | Serializer | fd-dev-form-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-form-view', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-inheritance', 'Unit | Serializer | fd-dev-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-inheritance', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-method-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-method', 'Unit | Serializer | fd-dev-method', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-method', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-method-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-method-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-method-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-method-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-method-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-method-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting', 'Unit | Serializer | fd-dev-module-setting', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-module-setting', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-module-setting-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-module-setting-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-module-setting-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-module-setting-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting-type', 'Unit | Serializer | fd-dev-module-setting-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-module-setting-type', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-module-setting-type-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-module-setting-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-module-setting-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-module-setting-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-parameter-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-parameter', 'Unit | Serializer | fd-dev-parameter', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-parameter', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-parameter-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-parameter-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-parameter-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-parameter-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-parameter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-parameter-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-process-status-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-process-status', 'Unit | Serializer | fd-dev-process-status', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-process-status', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-process-status-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-process-status-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-process-status-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-process-status-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-process-status-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-process-status-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-stage-history', 'Unit | Serializer | fd-dev-stage-history', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-stage-history', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-history-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-stage-history-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-stage-history-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-history-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-stage-history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-stage-history-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-stage', 'Unit | Serializer | fd-dev-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-stage', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:typemap', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-stage-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-system', 'Unit | Serializer | fd-dev-system', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-system', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-system-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-task-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-task', 'Unit | Serializer | fd-dev-task', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-task', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-task-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-task-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-task-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-task-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-task-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-task-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-type-definition-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-type-definition', 'Unit | Serializer | fd-dev-type-definition', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-type-definition', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-type-definition-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-type-definition-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-type-definition-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-type-definition-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-type-definition-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-type-definition-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ad', 'Unit | Serializer | fd-dev-uml-ad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-ad', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-ad-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-ad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-ad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-ad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cad-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cad', 'Unit | Serializer | fd-dev-uml-cad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-cad', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cad-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-cad-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-cad-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cad-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-cad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-cad-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cod-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cod', 'Unit | Serializer | fd-dev-uml-cod', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-cod', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cod-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-cod-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-cod-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cod-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-cod-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-cod-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-dpd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-dpd', 'Unit | Serializer | fd-dev-uml-dpd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-dpd', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-dpd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-dpd-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-dpd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-dpd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-dpd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-dpd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-sd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-sd', 'Unit | Serializer | fd-dev-uml-sd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-sd', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-sd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-sd-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-sd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-sd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-sd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-sd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-std-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-std', 'Unit | Serializer | fd-dev-uml-std', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-std', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-std-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-std-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-std-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-std-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-std-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-std-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ucd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ucd', 'Unit | Serializer | fd-dev-uml-ucd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-ucd', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ucd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-uml-ucd-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-uml-ucd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ucd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-uml-ucd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-ucd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dev-view', 'Unit | Serializer | fd-dev-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-view', 'transform:file', 'transform:decimal', 'transform:guid',

    /* merged manually start */
    'transform:fd-definition',
    /* merged manually end */
    'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dev-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dev-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dev-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dev-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-diagram-link', 'Unit | Serializer | fd-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-diagram-link', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-diagram-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-diagram', 'Unit | Serializer | fd-diagram', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-diagram', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-diagram-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-diagram-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-diagram-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-diagram-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-diagram-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-diagram-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-dpd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-dpd', 'Unit | Serializer | fd-dpd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dpd', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dpd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-dpd-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-dpd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-dpd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-dpd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dpd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-filelink', 'Unit | Serializer | fd-filelink', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-filelink', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-form-control', 'Unit | Serializer | fd-form-control', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-form-control', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-form-view', 'Unit | Serializer | fd-form-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-form-view', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-generation-step-log-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-generation-step-log', 'Unit | Serializer | fd-generation-step-log', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-generation-step-log', 'transform:file', 'transform:decimal', 'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-generation-step-log-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-generation-step-log-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-generation-step-log-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-generation-step-log-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-generation-step-log-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-generation-step-log-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-generation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-generation', 'Unit | Serializer | fd-generation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-generation', 'transform:file', 'transform:decimal', 'transform:fd-generation-state', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-generation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-generation-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-generation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-generation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-generation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-generation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-inheritance', 'Unit | Serializer | fd-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-inheritance', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-object-in-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-object-in-system', 'Unit | Serializer | fd-object-in-system', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-object-in-system', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-object-in-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-object-in-system-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-object-in-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-object-in-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-object-in-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-object-in-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-plugin-on-rep-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-plugin-on-rep-object', 'Unit | Serializer | fd-plugin-on-rep-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-plugin-on-rep-object', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-plugin-on-rep-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-plugin-on-rep-object-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-plugin-on-rep-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-plugin-on-rep-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-plugin-on-rep-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-plugin-on-rep-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-project-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-project', 'Unit | Serializer | fd-project', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-project', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-project-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-project-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-project-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-project-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-project-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-project-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-registered-plug-in-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-registered-plug-in', 'Unit | Serializer | fd-registered-plug-in', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-registered-plug-in', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-registered-plug-in-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-registered-plug-in-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-registered-plug-in-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-registered-plug-in-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-registered-plug-in-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-registered-plug-in-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object', 'Unit | Serializer | fd-repository-browser-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-browser-data-object', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-repository-browser-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-repository-browser-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-repository-browser-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-browser-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-with-a-c-l-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object-with-a-c-l', 'Unit | Serializer | fd-repository-browser-data-object-with-a-c-l', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-browser-data-object-with-a-c-l', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-data-object', 'Unit | Serializer | fd-repository-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-data-object', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-repository-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-repository-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-repository-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-object-with-plugins-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-object-with-plugins', 'Unit | Serializer | fd-repository-object-with-plugins', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-object-with-plugins', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-object-with-plugins-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-repository-object-with-plugins-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-repository-object-with-plugins-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-object-with-plugins-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-repository-object-with-plugins-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-object-with-plugins-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-ref-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository-ref-data-object', 'Unit | Serializer | fd-repository-ref-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-ref-data-object', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-ref-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-repository-ref-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-repository-ref-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-ref-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-repository-ref-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-ref-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-repository', 'Unit | Serializer | fd-repository', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-repository-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-repository-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-repository-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-repository-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-sd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-sd', 'Unit | Serializer | fd-sd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-sd', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-sd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-sd-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-sd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-sd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-sd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-sd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-stage', 'Unit | Serializer | fd-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-stage', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-stage-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-std-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-std', 'Unit | Serializer | fd-std', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-std', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-std-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-std-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-std-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-std-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-std-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-std-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-subsystem-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-subsystem', 'Unit | Serializer | fd-subsystem', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-subsystem', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-subsystem-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-subsystem-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-subsystem-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-subsystem-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-subsystem-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-subsystem-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-ucd-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-ucd', 'Unit | Serializer | fd-ucd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-ucd', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-ucd-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-ucd-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-ucd-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-ucd-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-ucd-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-ucd-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/fd-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('fd-view', 'Unit | Serializer | fd-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-view', 'transform:file', 'transform:decimal', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-association', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/fd-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/fd-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/fd-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/fd-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/services/fd-current-project-context-test', ['exports', 'ember', 'ember-qunit', 'ember-flexberry-designer/models/fd-dev-system'], function (exports, _ember, _emberQunit, _emberFlexberryDesignerModelsFdDevSystem) {

  // Stub store service.
  var storeStub = DS.Store.extend({
    query: function query() {
      return _ember['default'].RSVP.resolve(null);
    }
  });

  // Stub fd-dev-system model.
  var fdDevSystemModelStub = _emberFlexberryDesignerModelsFdDevSystem['default'].extend({
    save: function save() {
      var _this = this;
      _this.set('id', 'subsystem');
      return _ember['default'].RSVP.resolve(_this);
    }
  });

  (0, _emberQunit.moduleFor)('service:fd-current-project-context', 'Unit | Service | fd current project context', {
    needs: ['model:fd-dev-system', 'model:fd-stage', 'model:fd-diagram', 'model:fd-diagram-link', 'model:fd-filelink'],

    beforeEach: function beforeEach() {
      _ember['default'].getOwner(this).unregister('service:store');
      _ember['default'].getOwner(this).unregister('model:fd-dev-system');
      this.register('service:store', storeStub);
      this.register('model:fd-dev-system', fdDevSystemModelStub);
    }
  });

  (0, _emberQunit.test)('it exists and works', function (assert) {
    var done = assert.async();
    assert.expect(10);

    var service = this.subject();
    assert.ok(service);

    var configuration = _ember['default'].Object.create({ id: 'configuration' });
    var stage = _ember['default'].Object.create({ id: 'stage' });

    assert.throws(service.getCurrentConfiguration);
    service.setCurrentConfiguration(configuration);
    assert.equal(service.getCurrentConfiguration(), 'configuration');

    assert.throws(service.getCurrentStage);
    assert.throws(function () {
      service.setCurrentStage(stage);
    });
    stage.set('configuration', configuration);
    service.setCurrentStage(stage);
    assert.notOk(service.isAutogeneratedSystemSet());
    assert.equal(service.getCurrentStage(), 'stage');

    service.getAutogeneratedSystemPromise().then(function (system) {
      assert.ok(service.isAutogeneratedSystemSet());
      assert.equal(service.getAutogeneratedSystemModel(), system);

      // Remove new model from the store.
      system.rollbackAttributes();
      service.setCurrentConfiguration(configuration);
      assert.throws(service.getCurrentStage);

      done();
    });
  });
});
define('dummy/tests/unit/services/fd-current-project-context-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/services');
  test('unit/services/fd-current-project-context-test.js should pass jscs', function () {
    ok(true, 'unit/services/fd-current-project-context-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/services/fd-current-project-context-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/fd-current-project-context-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/fd-current-project-context-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/services/fd-generation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:fd-generation', 'Unit | Service | fd generation', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('dummy/tests/unit/services/fd-generation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/services');
  test('unit/services/fd-generation-test.js should pass jscs', function () {
    ok(true, 'unit/services/fd-generation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/services/fd-generation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/fd-generation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/fd-generation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/transforms/containers-tree-test', ['exports', 'ember', 'ember-qunit', 'ember-flexberry-designer/objects/fd-appstruct-tree'], function (exports, _ember, _emberQunit, _emberFlexberryDesignerObjectsFdAppstructTree) {

  (0, _emberQunit.moduleFor)('transform:containers-tree', 'Unit | Transform | containers tree');

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {

    var noteNoteObjectModel1 = _ember['default'].A([_emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      className: 'ПисьмоWebL',
      description: null,
      caption: 'Настройка рассылки писем',
      text: 'Настройка рассылки писем',
      type: 'property',
      id: 'p2l0i2',
      url: ''
    })]);

    var noteNoteObjectModel2 = _ember['default'].A([_emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      className: 'ЖурналИмпортаWebL',
      description: null,
      caption: 'Журнал импорта',
      text: 'Журнал импорта',
      type: 'property',
      id: 'p2l0i3',
      url: ''
    })]);

    var noteObjectModel1 = _ember['default'].A([_emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      text: 'Настройки',
      type: 'folder',
      children: _ember['default'].A(),
      copyChildren: _ember['default'].A(),
      id: 'p1l0i1'
    }), _emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      text: 'Рассылка по e-mail',
      type: 'folder',
      children: noteNoteObjectModel1,
      copyChildren: noteNoteObjectModel1,
      id: 'p1l1i2'
    }), _emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      text: 'Импорт данных',
      type: 'folder',
      children: noteNoteObjectModel2,
      copyChildren: noteNoteObjectModel2,
      id: 'p1l2i3'
    })]);

    var noteObjectModel2 = _ember['default'].A([_emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      className: 'УчетРабочегоВремениWebL',
      description: 'test',
      caption: 'Учет рабочего времени',
      text: 'Учет рабочего времени',
      type: 'property',
      id: 'p1l0i4',
      url: ''
    }), _emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      className: 'ПроизводственныйКалендарьWebL',
      description: null,
      caption: 'Производственный календарь',
      text: 'Производственный календарь',
      type: 'property',
      id: 'p1l1i5',
      url: ''
    }), _emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      className: null,
      description: null,
      caption: 'Test',
      text: 'Test',
      type: 'property',
      id: 'p1l2i6',
      url: 'Test'
    })]);

    var objectModel = _ember['default'].A([_emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      text: 'Администрирование',
      type: 'folder',
      children: noteObjectModel1,
      copyChildren: noteObjectModel1,
      id: 'p0l0i0'
    }), _emberFlexberryDesignerObjectsFdAppstructTree['default'].create({
      text: 'Поручения',
      type: 'folder',
      children: noteObjectModel2,
      copyChildren: noteObjectModel2,
      id: 'p0l1i4'
    })]);

    var xml = '' + '<Containers>' + '<ContainersList>' + '<Item ClassName="##########" MenuPath="Администрирование" Caption="" Description="" Url="" />' + '<Item ClassName="##########" MenuPath="Администрирование\\Настройки" Caption="" Description="" Url="" />' + '<Item ClassName="ПисьмоWebL" MenuPath="Администрирование\\Рассылка по e-mail" Caption="Настройка рассылки писем" Description="" Url="" />' + '<Item ClassName="ЖурналИмпортаWebL" MenuPath="Администрирование\\Импорт данных" Caption="Журнал импорта" Description="" Url="" />' + '<Item ClassName="УчетРабочегоВремениWebL" MenuPath="Поручения" Caption="Учет рабочего времени" Description="test" Url="" />' + '<Item ClassName="ПроизводственныйКалендарьWebL" MenuPath="Поручения" Caption="Производственный календарь" Description="" Url="" />' + '<Item ClassName="" MenuPath="Поручения" Caption="Test" Description="" Url="Test" />' + '</ContainersList>' + '</Containers>';

    var transform = this.subject();
    assert.ok(transform);

    var deserializeResult = transform.deserialize(xml);
    assert.deepEqual(deserializeResult, objectModel, 'ConteinersTree deserialize does not work');

    var serializeResult = transform.serialize(deserializeResult);
    assert.equal(serializeResult, xml, 'ConteinersTree serialize does not work');
  });
});
define('dummy/tests/unit/transforms/containers-tree-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/transforms');
  test('unit/transforms/containers-tree-test.js should pass jscs', function () {
    ok(true, 'unit/transforms/containers-tree-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/transforms/containers-tree-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/transforms/containers-tree-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/containers-tree-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/transforms/fd-definition-test', ['exports', 'ember', 'ember-qunit', 'ember-flexberry-designer/objects/fd-view-attributes-property', 'ember-flexberry-designer/objects/fd-view-attributes-master', 'ember-flexberry-designer/objects/fd-view-attributes-detail'], function (exports, _ember, _emberQunit, _emberFlexberryDesignerObjectsFdViewAttributesProperty, _emberFlexberryDesignerObjectsFdViewAttributesMaster, _emberFlexberryDesignerObjectsFdViewAttributesDetail) {

  (0, _emberQunit.moduleFor)('transform:fd-definition', 'Unit | Transform | fd definition');

  (0, _emberQunit.test)('it exists', function (assert) {

    var objectModel = _ember['default'].A([_emberFlexberryDesignerObjectsFdViewAttributesProperty['default'].create({
      name: 'TestProperty',
      caption: 'Test Property',
      path: 'pathTestProperty',
      visible: false
    }), _emberFlexberryDesignerObjectsFdViewAttributesMaster['default'].create({
      name: 'TestMaster',
      caption: 'Test Master',
      path: 'pathTestMaster',
      visible: true,
      lookupType: 'standard',
      masterPropertyName: 'TestMasterName',
      masterCustomizationString: ''
    }), _emberFlexberryDesignerObjectsFdViewAttributesDetail['default'].create({
      name: 'TestDetail',
      detailViewName: 'TestDetailD',
      loadOnLoadAgregator: false,
      path: '',
      caption: 'Test Detail',
      visible: true
    })]);

    var xml = '' + '<View>' + '<ViewPropertiesList>' + '<Item PropertyName="TestProperty" Caption="Test Property" Path="pathTestProperty" Visible="False"' + ' IsMaster="False" LookupType="default" MasterPropertyName="" MasterCustomizationString="" />' + '<Item PropertyName="TestMaster" Caption="Test Master" Path="pathTestMaster" Visible="True"' + ' IsMaster="True" LookupType="standard" MasterPropertyName="TestMasterName" MasterCustomizationString="" />' + '</ViewPropertiesList>' + '<ViewDetailsList>' + '<Item DetailName="TestDetail" DetailViewName="TestDetailD" LoadOnLoadAgregator="False" DetailPath="" DetailCaption="Test Detail" DetailVisible="True" />' + '</ViewDetailsList>' + '</View>';

    var transform = this.subject();
    assert.ok(transform);

    var deserializeResult = transform.deserialize(xml);
    assert.deepEqual(deserializeResult, objectModel, 'Definition deserialize does not work');

    var serializeResult = transform.serialize(deserializeResult);
    assert.equal(serializeResult, xml, 'Definition serialize does not work');
  });
});
define('dummy/tests/unit/transforms/fd-definition-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/transforms');
  test('unit/transforms/fd-definition-test.js should pass jscs', function () {
    ok(true, 'unit/transforms/fd-definition-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/transforms/fd-definition-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/transforms/fd-definition-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/fd-definition-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/transforms/new-platform-flexberry-web-designer-business-server-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('transform:new-platform-flexberry-web-designer-business-server-class', 'Unit | Transform | new platform flexberry web designer business server class', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });
});
define('dummy/tests/unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/transforms');
  test('unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js should pass jscs', function () {
    ok(true, 'unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/utils/fd-preload-stage-metadata-test', ['exports', 'dummy/utils/fd-preload-stage-metadata', 'qunit'], function (exports, _dummyUtilsFdPreloadStageMetadata, _qunit) {

  (0, _qunit.module)('Unit | Utility | fd preload stage metadata');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _dummyUtilsFdPreloadStageMetadata['default'])();
    assert.ok(result);
  });
});
define('dummy/tests/unit/utils/fd-preload-stage-metadata-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/utils');
  test('unit/utils/fd-preload-stage-metadata-test.js should pass jscs', function () {
    ok(true, 'unit/utils/fd-preload-stage-metadata-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/utils/fd-preload-stage-metadata-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/utils/fd-preload-stage-metadata-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-preload-stage-metadata-test.js should pass jshint.');
  });
});
define('dummy/tests/views/application.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - views');
  test('views/application.js should pass jscs', function () {
    ok(true, 'views/application.js should pass jscs.');
  });
});
define('dummy/tests/views/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - views/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'views/application.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
