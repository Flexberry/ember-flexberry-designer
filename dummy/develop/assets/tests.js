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
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-association-edit-form', 'Unit | Controller | new platform flexberry web designer association edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.js should pass jscs', function () {
    ok(false, 'unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.js should pass jscs.\nLine must be at most 160 characters at unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.js :\n     1 |import { moduleFor, test } from \'ember-qunit\';\n     2 |\n     3 |moduleFor(\'controller:new-platform-flexberry-web-designer-association-edit-form\', \'Unit | Controller | new platform flexberry web designer association edit form\', {\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  // needs: [\'controller:foo\']');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-association-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-association-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-association-list-form', 'Unit | Controller | new platform flexberry web designer association list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.js should pass jscs', function () {
    ok(false, 'unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.js should pass jscs.\nLine must be at most 160 characters at unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.js :\n     1 |import { moduleFor, test } from \'ember-qunit\';\n     2 |\n     3 |moduleFor(\'controller:new-platform-flexberry-web-designer-association-list-form\', \'Unit | Controller | new platform flexberry web designer association list form\', {\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  // needs: [\'controller:foo\']');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-association-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-class-edit-form', 'Unit | Controller | new platform flexberry web designer class edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-class-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-class-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-class-list-form', 'Unit | Controller | new platform flexberry web designer class list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-class-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-class-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-class-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-class-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-class-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-class-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-diagram-edit-form', 'Unit | Controller | new platform flexberry web designer diagram edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-diagram-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-diagram-list-form', 'Unit | Controller | new platform flexberry web designer diagram list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-diagram-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-inheritance-edit-form', 'Unit | Controller | new platform flexberry web designer inheritance edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.js should pass jscs', function () {
    ok(false, 'unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.js should pass jscs.\nLine must be at most 160 characters at unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.js :\n     1 |import { moduleFor, test } from \'ember-qunit\';\n     2 |\n     3 |moduleFor(\'controller:new-platform-flexberry-web-designer-inheritance-edit-form\', \'Unit | Controller | new platform flexberry web designer inheritance edit form\', {\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  // needs: [\'controller:foo\']');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-inheritance-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-inheritance-list-form', 'Unit | Controller | new platform flexberry web designer inheritance list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.js should pass jscs', function () {
    ok(false, 'unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.js should pass jscs.\nLine must be at most 160 characters at unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.js :\n     1 |import { moduleFor, test } from \'ember-qunit\';\n     2 |\n     3 |moduleFor(\'controller:new-platform-flexberry-web-designer-inheritance-list-form\', \'Unit | Controller | new platform flexberry web designer inheritance list form\', {\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  // needs: [\'controller:foo\']');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-inheritance-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-stage-edit-form', 'Unit | Controller | new platform flexberry web designer stage edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-stage-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-stage-list-form', 'Unit | Controller | new platform flexberry web designer stage list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-stage-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-system-edit-form', 'Unit | Controller | new platform flexberry web designer system edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-system-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-system-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-system-list-form', 'Unit | Controller | new platform flexberry web designer system list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-system-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-system-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-system-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-system-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-system-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-system-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-view-edit-form', 'Unit | Controller | new platform flexberry web designer view edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-view-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-view-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-view-list-form', 'Unit | Controller | new platform flexberry web designer view list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-view-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/controllers');
  test('unit/controllers/new-platform-flexberry-web-designer-view-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/controllers/new-platform-flexberry-web-designer-view-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-view-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/new-platform-flexberry-web-designer-view-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-view-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-a-d', 'Unit | Model | new-platform-flexberry-web-designer-a-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-aggregation', 'Unit | Model | new-platform-flexberry-web-designer-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-association', 'Unit | Model | new-platform-flexberry-web-designer-association', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-base-association', 'Unit | Model | new-platform-flexberry-web-designer-base-association', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-c-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-c-a-d', 'Unit | Model | new-platform-flexberry-web-designer-c-a-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-c-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-c-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-c-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-c-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-c-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-c-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-c-o-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-c-o-d', 'Unit | Model | new-platform-flexberry-web-designer-c-o-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-c-o-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-c-o-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-c-o-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-c-o-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-c-o-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-c-o-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-case-property-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-case-property', 'Unit | Model | new-platform-flexberry-web-designer-case-property', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-case-property-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-case-property-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-case-property-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-case-property-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-case-property-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-case-property-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-class', 'Unit | Model | new-platform-flexberry-web-designer-class', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-class-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-configuration-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-configuration', 'Unit | Model | new-platform-flexberry-web-designer-configuration', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-configuration-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-configuration-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-configuration-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-configuration-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-configuration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-configuration-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-d-p-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-d-p-d', 'Unit | Model | new-platform-flexberry-web-designer-d-p-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-d-p-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-d-p-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-d-p-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-d-p-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-d-p-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-d-p-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-aggregation', 'Unit | Model | new-platform-flexberry-web-designer-dev-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-associated-detail-view', 'Unit | Model | new-platform-flexberry-web-designer-dev-associated-detail-view', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js should pass jscs', function () {
    ok(false, 'unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js should pass jscs.\nLine must be at most 160 characters at unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-dev-associated-detail-view\', \'Unit | Model | new-platform-flexberry-web-designer-dev-associated-detail-view\', {\n---------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-association', 'Unit | Model | new-platform-flexberry-web-designer-dev-association', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-attribute-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-attribute', 'Unit | Model | new-platform-flexberry-web-designer-dev-attribute', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-attribute-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-attribute-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-attribute-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-attribute-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-attribute-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-attribute-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-base-association', 'Unit | Model | new-platform-flexberry-web-designer-dev-base-association', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-class', 'Unit | Model | new-platform-flexberry-web-designer-dev-class', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-class-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-control-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-control-type', 'Unit | Model | new-platform-flexberry-web-designer-dev-control-type', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-control-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-control-type-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-control-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-control-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-control-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-control-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-diagram-link', 'Unit | Model | new-platform-flexberry-web-designer-dev-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-filelink', 'Unit | Model | new-platform-flexberry-web-designer-dev-filelink', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-form-control', 'Unit | Model | new-platform-flexberry-web-designer-dev-form-control', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-form-view', 'Unit | Model | new-platform-flexberry-web-designer-dev-form-view', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-inheritance', 'Unit | Model | new-platform-flexberry-web-designer-dev-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-method-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-method', 'Unit | Model | new-platform-flexberry-web-designer-dev-method', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-method-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-method-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-method-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-method-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-method-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-method-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-module-setting-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-module-setting', 'Unit | Model | new-platform-flexberry-web-designer-dev-module-setting', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-module-setting-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-module-setting-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-module-setting-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-module-setting-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-module-setting-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-module-setting-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-module-setting-type', 'Unit | Model | new-platform-flexberry-web-designer-dev-module-setting-type', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-module-setting-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-parameter-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-parameter', 'Unit | Model | new-platform-flexberry-web-designer-dev-parameter', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-parameter-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-parameter-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-parameter-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-parameter-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-parameter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-parameter-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-process-status-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-process-status', 'Unit | Model | new-platform-flexberry-web-designer-dev-process-status', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-process-status-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-process-status-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-process-status-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-process-status-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-process-status-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-process-status-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-stage', 'Unit | Model | new-platform-flexberry-web-designer-dev-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-stage-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-system', 'Unit | Model | new-platform-flexberry-web-designer-dev-system', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-system-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-task-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-task', 'Unit | Model | new-platform-flexberry-web-designer-dev-task', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-task-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-task-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-task-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-task-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-task-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-task-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-type-definition-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-type-definition', 'Unit | Model | new-platform-flexberry-web-designer-dev-type-definition', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-type-definition-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-type-definition-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-type-definition-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-type-definition-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-type-definition-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-type-definition-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-a-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-s-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'Unit | Model | new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-view', 'Unit | Model | new-platform-flexberry-web-designer-dev-view', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-dev-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-dev-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-dev-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-dev-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-diagram-link', 'Unit | Model | new-platform-flexberry-web-designer-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-diagram-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-diagram', 'Unit | Model | new-platform-flexberry-web-designer-diagram', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-diagram-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-diagram-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-diagram-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-diagram-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-diagram-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-diagram-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-filelink', 'Unit | Model | new-platform-flexberry-web-designer-filelink', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-form-control', 'Unit | Model | new-platform-flexberry-web-designer-form-control', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-form-view', 'Unit | Model | new-platform-flexberry-web-designer-form-view', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-inheritance', 'Unit | Model | new-platform-flexberry-web-designer-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-object-in-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-object-in-system', 'Unit | Model | new-platform-flexberry-web-designer-object-in-system', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-object-in-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-object-in-system-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-object-in-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-object-in-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-object-in-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-object-in-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-plugin-on-rep-object', 'Unit | Model | new-platform-flexberry-web-designer-plugin-on-rep-object', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-project-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-project', 'Unit | Model | new-platform-flexberry-web-designer-project', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-project-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-project-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-project-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-project-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-project-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-project-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-registered-plug-in-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-registered-plug-in', 'Unit | Model | new-platform-flexberry-web-designer-registered-plug-in', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-registered-plug-in-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-registered-plug-in-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-registered-plug-in-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-registered-plug-in-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-registered-plug-in-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-registered-plug-in-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-browser-data-object', 'Unit | Model | new-platform-flexberry-web-designer-repository-browser-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.js should pass jscs', function () {
    ok(false, 'unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.js should pass jscs.\nLine must be at most 160 characters at unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-browser-data-object\', \'Unit | Model | new-platform-flexberry-web-designer-repository-browser-data-object\', {\n-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'Unit | Model | new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js should pass jscs', function () {
    ok(false, 'unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js should pass jscs.\nLine must be at most 160 characters at unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l\', \'Unit | Model | new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l\', {\n---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-data-object', 'Unit | Model | new-platform-flexberry-web-designer-repository-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-repository-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-repository-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-object-with-plugins', 'Unit | Model | new-platform-flexberry-web-designer-repository-object-with-plugins', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js should pass jscs', function () {
    ok(false, 'unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js should pass jscs.\nLine must be at most 160 characters at unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-object-with-plugins\', \'Unit | Model | new-platform-flexberry-web-designer-repository-object-with-plugins\', {\n-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-ref-data-object', 'Unit | Model | new-platform-flexberry-web-designer-repository-ref-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.js should pass jscs', function () {
    ok(false, 'unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.js should pass jscs.\nLine must be at most 160 characters at unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-ref-data-object\', \'Unit | Model | new-platform-flexberry-web-designer-repository-ref-data-object\', {\n---------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-ref-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository', 'Unit | Model | new-platform-flexberry-web-designer-repository', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-repository-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-repository-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-repository-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-repository-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-s-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-s-d', 'Unit | Model | new-platform-flexberry-web-designer-s-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-s-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-s-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-s-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-s-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-s-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-s-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-s-t-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-s-t-d', 'Unit | Model | new-platform-flexberry-web-designer-s-t-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-s-t-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-s-t-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-s-t-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-s-t-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-s-t-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-s-t-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-stage', 'Unit | Model | new-platform-flexberry-web-designer-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-stage-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-subsystem-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-subsystem', 'Unit | Model | new-platform-flexberry-web-designer-subsystem', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-subsystem-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-subsystem-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-subsystem-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-subsystem-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-subsystem-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-subsystem-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-u-c-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-u-c-d', 'Unit | Model | new-platform-flexberry-web-designer-u-c-d', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-u-c-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-u-c-d-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-u-c-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-u-c-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-u-c-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-u-c-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-view', 'Unit | Model | new-platform-flexberry-web-designer-view', {
    // Specify the other units that are required for this test.
    needs: ['model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/models');
  test('unit/models/new-platform-flexberry-web-designer-view-test.js should pass jscs', function () {
    ok(true, 'unit/models/new-platform-flexberry-web-designer-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/models/new-platform-flexberry-web-designer-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/new-platform-flexberry-web-designer-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-platform-flexberry-web-designer-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-association-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-association-edit-form', 'Unit | Route | new platform flexberry web designer association edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-association-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-association-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-association-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-association-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-association-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-association-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-association-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-association-list-form', 'Unit | Route | new platform flexberry web designer association list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-association-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-association-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-association-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-association-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-association-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-association-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-class-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-class-edit-form', 'Unit | Route | new platform flexberry web designer class edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-class-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-class-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-class-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-class-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-class-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-class-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-class-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-class-list-form', 'Unit | Route | new platform flexberry web designer class list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-class-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-class-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-class-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-class-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-class-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-class-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-diagram-edit-form', 'Unit | Route | new platform flexberry web designer diagram edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-diagram-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-diagram-list-form', 'Unit | Route | new platform flexberry web designer diagram list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-diagram-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-inheritance-edit-form', 'Unit | Route | new platform flexberry web designer inheritance edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-inheritance-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-inheritance-list-form', 'Unit | Route | new platform flexberry web designer inheritance list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-inheritance-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-stage-edit-form', 'Unit | Route | new platform flexberry web designer stage edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-stage-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-stage-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-stage-list-form', 'Unit | Route | new platform flexberry web designer stage list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-stage-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-stage-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-stage-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-stage-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-stage-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-stage-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-system-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-system-edit-form', 'Unit | Route | new platform flexberry web designer system edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-system-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-system-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-system-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-system-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-system-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-system-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-system-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-system-list-form', 'Unit | Route | new platform flexberry web designer system list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-system-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-system-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-system-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-system-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-system-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-system-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-view-edit-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-view-edit-form', 'Unit | Route | new platform flexberry web designer view edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-view-edit-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-view-edit-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-view-edit-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-view-edit-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-view-edit-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-view-edit-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-view-list-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-view-list-form', 'Unit | Route | new platform flexberry web designer view list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-view-list-form-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/routes');
  test('unit/routes/new-platform-flexberry-web-designer-view-list-form-test.js should pass jscs', function () {
    ok(true, 'unit/routes/new-platform-flexberry-web-designer-view-list-form-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-view-list-form-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/new-platform-flexberry-web-designer-view-list-form-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-view-list-form-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-a-d', 'Unit | Serializer | new-platform-flexberry-web-designer-a-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-a-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-aggregation', 'Unit | Serializer | new-platform-flexberry-web-designer-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-aggregation', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-association', 'Unit | Serializer | new-platform-flexberry-web-designer-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-association', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-base-association', 'Unit | Serializer | new-platform-flexberry-web-designer-base-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-base-association', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-c-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-c-a-d', 'Unit | Serializer | new-platform-flexberry-web-designer-c-a-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-c-a-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-c-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-c-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-c-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-c-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-c-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-c-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-c-o-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-c-o-d', 'Unit | Serializer | new-platform-flexberry-web-designer-c-o-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-c-o-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-c-o-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-c-o-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-c-o-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-c-o-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-c-o-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-c-o-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-case-property-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-case-property', 'Unit | Serializer | new-platform-flexberry-web-designer-case-property', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-case-property', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-case-property-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-case-property-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-case-property-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-case-property-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-case-property-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-case-property-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-class', 'Unit | Serializer | new-platform-flexberry-web-designer-class', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-class', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-class-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-configuration-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-configuration', 'Unit | Serializer | new-platform-flexberry-web-designer-configuration', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-configuration', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-configuration-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-configuration-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-configuration-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-configuration-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-configuration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-configuration-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-d-p-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-d-p-d', 'Unit | Serializer | new-platform-flexberry-web-designer-d-p-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-d-p-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-d-p-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-d-p-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-d-p-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-d-p-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-d-p-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-d-p-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-aggregation', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-aggregation', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-aggregation-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-associated-detail-view', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-associated-detail-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-associated-detail-view', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js should pass jscs', function () {
    ok(false, 'unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js should pass jscs.\nLine must be at most 160 characters at unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-dev-associated-detail-view\', \'Unit | Serializer | new-platform-flexberry-web-designer-dev-associated-detail-view\', {\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-association', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-association', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-attribute', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-attribute', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-attribute', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-attribute-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-base-association', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-base-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-base-association', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-base-association-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-class-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-class', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-class', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-class', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-class-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-class-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-class-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-class-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-class-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-class-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-control-type', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-control-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-control-type', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-control-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-diagram-link', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-diagram-link', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-filelink', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-filelink', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-filelink', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-form-control', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-form-control', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-form-control', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-form-view', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-form-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-form-view', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-inheritance', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-inheritance', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-method-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-method', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-method', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-method', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-method-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-method-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-method-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-method-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-method-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-method-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-module-setting', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-module-setting', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-module-setting', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-module-setting-type', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-module-setting-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-module-setting-type', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.js should pass jscs', function () {
    ok(false, 'unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.js should pass jscs.\nLine must be at most 160 characters at unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-dev-module-setting-type\', \'Unit | Serializer | new-platform-flexberry-web-designer-dev-module-setting-type\', {\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-module-setting-type-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-parameter', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-parameter', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-parameter', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-parameter-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-process-status', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-process-status', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-process-status', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-process-status-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-stage', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-stage', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-stage-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-system', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-system', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-system', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-system-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-task-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-task', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-task', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-task', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-task-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-task-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-task-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-task-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-task-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-task-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-type-definition', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-type-definition', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-type-definition', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-type-definition-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-a-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-s-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-dev-view', 'Unit | Serializer | new-platform-flexberry-web-designer-dev-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-dev-view', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-dev-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-dev-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-dev-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-dev-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-diagram-link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-diagram-link', 'Unit | Serializer | new-platform-flexberry-web-designer-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-diagram-link', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-diagram-link-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-diagram-link-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-diagram-link-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-diagram-link-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-diagram-link-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-diagram-link-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-diagram-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-diagram', 'Unit | Serializer | new-platform-flexberry-web-designer-diagram', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-diagram', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-diagram-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-diagram-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-diagram-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-diagram-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-diagram-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-diagram-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-filelink-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-filelink', 'Unit | Serializer | new-platform-flexberry-web-designer-filelink', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-filelink', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-filelink-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-filelink-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-filelink-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-filelink-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-filelink-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-filelink-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-form-control-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-form-control', 'Unit | Serializer | new-platform-flexberry-web-designer-form-control', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-form-control', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-form-control-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-form-control-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-form-control-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-form-control-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-form-control-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-form-control-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-form-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-form-view', 'Unit | Serializer | new-platform-flexberry-web-designer-form-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-form-view', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-form-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-form-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-form-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-form-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-form-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-form-view-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-inheritance-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-inheritance', 'Unit | Serializer | new-platform-flexberry-web-designer-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-inheritance', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-inheritance-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-inheritance-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-inheritance-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-inheritance-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-inheritance-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-inheritance-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-object-in-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-object-in-system', 'Unit | Serializer | new-platform-flexberry-web-designer-object-in-system', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-object-in-system', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-object-in-system-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-object-in-system-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-object-in-system-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-object-in-system-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-object-in-system-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-object-in-system-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-plugin-on-rep-object', 'Unit | Serializer | new-platform-flexberry-web-designer-plugin-on-rep-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-plugin-on-rep-object', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-project-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-project', 'Unit | Serializer | new-platform-flexberry-web-designer-project', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-project', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-project-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-project-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-project-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-project-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-project-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-project-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-registered-plug-in', 'Unit | Serializer | new-platform-flexberry-web-designer-registered-plug-in', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-registered-plug-in', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-registered-plug-in-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-browser-data-object', 'Unit | Serializer | new-platform-flexberry-web-designer-repository-browser-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-repository-browser-data-object', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.js should pass jscs', function () {
    ok(false, 'unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.js should pass jscs.\nLine must be at most 160 characters at unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-browser-data-object\', \'Unit | Serializer | new-platform-flexberry-web-designer-repository-browser-data-object\', {\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'Unit | Serializer | new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js should pass jscs', function () {
    ok(false, 'unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js should pass jscs.\nLine must be at most 160 characters at unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l\', \'Unit | Serializer | new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l\', {\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-data-object', 'Unit | Serializer | new-platform-flexberry-web-designer-repository-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-repository-data-object', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-object-with-plugins', 'Unit | Serializer | new-platform-flexberry-web-designer-repository-object-with-plugins', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-repository-object-with-plugins', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js should pass jscs', function () {
    ok(false, 'unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js should pass jscs.\nLine must be at most 160 characters at unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-object-with-plugins\', \'Unit | Serializer | new-platform-flexberry-web-designer-repository-object-with-plugins\', {\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository-ref-data-object', 'Unit | Serializer | new-platform-flexberry-web-designer-repository-ref-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-repository-ref-data-object', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.js should pass jscs', function () {
    ok(false, 'unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.js should pass jscs.\nLine must be at most 160 characters at unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.js :\n     1 |import { moduleForModel, test } from \'ember-qunit\';\n     2 |\n     3 |moduleForModel(\'new-platform-flexberry-web-designer-repository-ref-data-object\', \'Unit | Serializer | new-platform-flexberry-web-designer-repository-ref-data-object\', {\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  needs: [');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-ref-data-object-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-repository', 'Unit | Serializer | new-platform-flexberry-web-designer-repository', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-repository', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-repository-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-repository-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-repository-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-repository-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-s-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-s-d', 'Unit | Serializer | new-platform-flexberry-web-designer-s-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-s-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-s-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-s-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-s-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-s-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-s-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-s-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-s-t-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-s-t-d', 'Unit | Serializer | new-platform-flexberry-web-designer-s-t-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-s-t-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-s-t-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-s-t-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-s-t-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-s-t-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-s-t-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-s-t-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-stage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-stage', 'Unit | Serializer | new-platform-flexberry-web-designer-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-stage', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-stage-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-stage-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-stage-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-stage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-stage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-stage-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-subsystem-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-subsystem', 'Unit | Serializer | new-platform-flexberry-web-designer-subsystem', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-subsystem', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-subsystem-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-subsystem-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-subsystem-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-subsystem-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-subsystem-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-subsystem-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-u-c-d-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-u-c-d', 'Unit | Serializer | new-platform-flexberry-web-designer-u-c-d', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-u-c-d', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-u-c-d-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-u-c-d-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-u-c-d-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-u-c-d-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-u-c-d-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-u-c-d-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-view-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-platform-flexberry-web-designer-view', 'Unit | Serializer | new-platform-flexberry-web-designer-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:new-platform-flexberry-web-designer-view', 'transform:file', 'transform:decimal', 'transform:new-platform-flexberry-web-designer-access-modifier', 'transform:new-platform-flexberry-web-designer-access-type', 'transform:new-platform-flexberry-web-designer-parameter-modifier', 'transform:new-platform-flexberry-web-designer-t-write-mode', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:new-platform-flexberry-web-designer-a-d', 'model:new-platform-flexberry-web-designer-aggregation', 'model:new-platform-flexberry-web-designer-association', 'model:new-platform-flexberry-web-designer-base-association', 'model:new-platform-flexberry-web-designer-c-a-d', 'model:new-platform-flexberry-web-designer-c-o-d', 'model:new-platform-flexberry-web-designer-case-property', 'model:new-platform-flexberry-web-designer-class', 'model:new-platform-flexberry-web-designer-configuration', 'model:new-platform-flexberry-web-designer-d-p-d', 'model:new-platform-flexberry-web-designer-dev-aggregation', 'model:new-platform-flexberry-web-designer-dev-associated-detail-view', 'model:new-platform-flexberry-web-designer-dev-association', 'model:new-platform-flexberry-web-designer-dev-attribute', 'model:new-platform-flexberry-web-designer-dev-base-association', 'model:new-platform-flexberry-web-designer-dev-class', 'model:new-platform-flexberry-web-designer-dev-control-type', 'model:new-platform-flexberry-web-designer-dev-diagram-link', 'model:new-platform-flexberry-web-designer-dev-filelink', 'model:new-platform-flexberry-web-designer-dev-form-control', 'model:new-platform-flexberry-web-designer-dev-form-view', 'model:new-platform-flexberry-web-designer-dev-inheritance', 'model:new-platform-flexberry-web-designer-dev-method', 'model:new-platform-flexberry-web-designer-dev-module-setting-type', 'model:new-platform-flexberry-web-designer-dev-module-setting', 'model:new-platform-flexberry-web-designer-dev-parameter', 'model:new-platform-flexberry-web-designer-dev-process-status', 'model:new-platform-flexberry-web-designer-dev-stage', 'model:new-platform-flexberry-web-designer-dev-system', 'model:new-platform-flexberry-web-designer-dev-task', 'model:new-platform-flexberry-web-designer-dev-type-definition', 'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d', 'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d', 'model:new-platform-flexberry-web-designer-dev-view', 'model:new-platform-flexberry-web-designer-diagram-link', 'model:new-platform-flexberry-web-designer-diagram', 'model:new-platform-flexberry-web-designer-filelink', 'model:new-platform-flexberry-web-designer-form-control', 'model:new-platform-flexberry-web-designer-form-view', 'model:new-platform-flexberry-web-designer-inheritance', 'model:new-platform-flexberry-web-designer-object-in-system', 'model:new-platform-flexberry-web-designer-plugin-on-rep-object', 'model:new-platform-flexberry-web-designer-project', 'model:new-platform-flexberry-web-designer-registered-plug-in', 'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', 'model:new-platform-flexberry-web-designer-repository-browser-data-object', 'model:new-platform-flexberry-web-designer-repository-data-object', 'model:new-platform-flexberry-web-designer-repository-object-with-plugins', 'model:new-platform-flexberry-web-designer-repository-ref-data-object', 'model:new-platform-flexberry-web-designer-repository', 'model:new-platform-flexberry-web-designer-s-d', 'model:new-platform-flexberry-web-designer-s-t-d', 'model:new-platform-flexberry-web-designer-stage', 'model:new-platform-flexberry-web-designer-subsystem', 'model:new-platform-flexberry-web-designer-u-c-d', 'model:new-platform-flexberry-web-designer-view']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-view-test.jscs-test', ['exports'], function (exports) {
  'use strict';

  module('JSCS - unit/serializers');
  test('unit/serializers/new-platform-flexberry-web-designer-view-test.js should pass jscs', function () {
    ok(true, 'unit/serializers/new-platform-flexberry-web-designer-view-test.js should pass jscs.');
  });
});
define('dummy/tests/unit/serializers/new-platform-flexberry-web-designer-view-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers/new-platform-flexberry-web-designer-view-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/new-platform-flexberry-web-designer-view-test.js should pass jshint.');
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
    ok(false, 'unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js should pass jscs.\nLine must be at most 160 characters at unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js :\n     1 |import { moduleFor, test } from \'ember-qunit\';\n     2 |\n     3 |moduleFor(\'transform:new-platform-flexberry-web-designer-business-server-class\', \'Unit | Transform | new platform flexberry web designer business server class\', {\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------------^\n     4 |  // Specify the other units that are required for this test.\n     5 |  // needs: [\'serializer:foo\']');
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
