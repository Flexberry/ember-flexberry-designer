'use strict';

define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application-offline.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application-offline.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/activity-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/activity-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/class-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/class-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/collaboration-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/collaboration-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/deployment-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/deployment-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/fd-sequence-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/fd-sequence-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/statechart-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/statechart-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/usecase-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/usecase-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('locales/en/translations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/en/translations.js should pass ESLint\n\n');
  });

  QUnit.test('locales/ru/translations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/ru/translations.js should pass ESLint\n\n');
  });

  QUnit.test('models/custom-inflector-rules.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/custom-inflector-rules.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/activity-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/activity-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/class-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/class-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('routes/collaboration-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/collaboration-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('routes/deployment-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/deployment-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('routes/fd-sequence-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/fd-sequence-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('routes/statechart-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/statechart-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('routes/usecase-diagram-primitives-demo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/usecase-diagram-primitives-demo.js should pass ESLint\n\n');
  });

  QUnit.test('services/store.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/store.js should pass ESLint\n\n');
  });

  QUnit.test('services/user-settings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/user-settings.js should pass ESLint\n\n');
  });

  QUnit.test('services/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/user.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('dummy/tests/helpers/ember-i18n/test-helpers', ['ember-i18n/test-support/-private/t', 'ember-i18n/test-support/-private/assert-translation'], function (_t2, _assertTranslation2) {
  'use strict';

  // example usage: find(`.header:contains(${t('welcome_message')})`)
  Ember.Test.registerHelper('t', function (app, key, interpolations) {
    return (0, _t2.default)(app.__container__, key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  Ember.Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = (0, _t2.default)(app.__container__, key, interpolations);

    (0, _assertTranslation2.default)(element, key, text);
  });
});
define('dummy/tests/helpers/ember-prop-types', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createComponent = createComponent;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var VERSION = Ember.VERSION;


  /**
   * Determine if we are on a version of Ember that includes Glimmer 2
   * @returns {Boolean} whether or not we are on Glimmer 2
   */
  function isGlimmer2() {
    var _VERSION$split = VERSION.split('.'),
        _VERSION$split2 = _slicedToArray(_VERSION$split, 2),
        major = _VERSION$split2[0],
        minor = _VERSION$split2[1];

    return parseInt(major) > 1 && parseInt(minor) > 9;
  }

  /**
   * Programitcally instantiate instance of component class
   * @param {Ember.Component} component - component class to instantiate
   * @returns {Ember.Component} instance of component class
   */
  function createComponent(component) {
    if (isGlimmer2()) {
      return component.create({ renderer: {} });
    }

    return component.create();
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'dummy/app', 'dummy/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/integration/components/fd-button-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-button', 'Integration | Component | fd button', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "kxV0lm5V",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-button\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-editform-control-test', ['ember-qunit', 'ember-flexberry/components/flexberry-textbox', 'ember-flexberry-designer/objects/fd-editform-row', 'ember-flexberry-designer/objects/fd-editform-control', 'ember-flexberry-designer/objects/fd-editform-group', 'ember-flexberry-designer/objects/fd-editform-tabgroup', 'ember-flexberry-designer/objects/fd-editform-tab'], function (_emberQunit, _flexberryTextbox, _fdEditformRow, _fdEditformControl, _fdEditformGroup, _fdEditformTabgroup, _fdEditformTab) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-editform-control', 'Integration | Component | fd-editform-control', {
    integration: true,

    beforeEach: function beforeEach() {
      if (_flexberryTextbox.default.proto().i18n) {
        (true && !(false) && Ember.assert('Please, delete \'beforeEach\' and \'afterEach\' hooks.'));
      } else {
        _flexberryTextbox.default.reopen({ i18n: Ember.inject.service() });
      }
    },
    afterEach: function afterEach() {
      _flexberryTextbox.default.reopen({ i18n: null });
    }
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    var _this = this;

    this.set('selectItemAction', function (control) {
      return _this.set('selectedControl', control);
    });
    this.render(Ember.HTMLBars.template({
      "id": "NUq2Ss/v",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-editform-control\",null,[[\"control\",\"selectedItem\",\"selectItemAction\"],[[22,[\"control\"]],[22,[\"selectedControl\"]],[22,[\"selectItemAction\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.set('control', _fdEditformControl.default.create({ caption: 'Attribute #1' }));
    assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With simple control.');

    assert.notOk(this.get('selectedControl'), 'No selected control.');
    assert.notOk(this.$('.fd-editform-control').hasClass('selected'), 'No \'selected\' CSS-class.');

    this.$('input').click();
    assert.ok(this.get('selectedControl') === this.get('control'), 'Click on simple control.');
    assert.ok(this.$('.fd-editform-control').hasClass('selected'), 'Simple control highlighted.');

    this.set('control', _fdEditformGroup.default.create({
      caption: 'Group #1',
      rows: Ember.A([_fdEditformRow.default.create({
        controls: Ember.A([_fdEditformControl.default.create({ caption: 'Attribute #1' })])
      })])
    }));
    assert.ok(/\s*Group #1\s*Attribute #1\s*/.test(this.$().text()), 'With group.');

    this.$('input').click();
    assert.ok(this.get('selectedControl') === this.get('control.rows.firstObject.controls.firstObject'), 'Click on nested control.');
    assert.ok(this.$('.fd-editform-control .fd-editform-control').hasClass('selected'), 'Nested control highlighted.');

    this.$('.fd-editform-control:first').click();
    assert.ok(this.get('selectedControl') === this.get('control'), 'Click on group control.');
    assert.ok(this.$('.fd-editform-control').hasClass('selected'), 'Group control highlighted.');

    this.set('control', _fdEditformTabgroup.default.create({
      tabs: Ember.A([_fdEditformTab.default.create({
        caption: 'Tab #1',
        rows: Ember.A([_fdEditformRow.default.create({
          controls: Ember.A([_fdEditformControl.default.create({ caption: 'Attribute #1' })])
        })])
      })])
    }));
    // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(/\s*Tab #1\s*Attribute #1\s*/.test(this.$().text()), 'With tabs.');

    this.$('input').click();
    assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject.rows.firstObject.controls.firstObject'), 'Click on nested control.');
    assert.ok(this.$('.fd-editform-control .fd-editform-control').hasClass('selected'), 'Nested control highlighted.');

    this.$('.active.item').click();
    // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(this.get('selectedControl') === this.get('control.tabs.firstObject'), 'Click on tab control.');
    // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(this.$('.fd-editform-control .active.item').hasClass('selected'), 'Tab label highlighted.');
    // --- assertion fault due fd-tab-dropdown component is temporarily disabled in fd-tabs component --- assert.ok(this.$('.fd-editform-control .active.tab').hasClass('selected'), 'Tab highlighted.');

    this.$('.fd-editform-control:first').click();
    assert.ok(this.get('selectedControl') === this.get('control'), 'Click on group tabs control.');
    assert.ok(this.$('.fd-editform-control:first').hasClass('selected'), 'Group tabs highlighted.');
  });
});
define('dummy/tests/integration/components/fd-editform-row-test', ['ember-qunit', 'ember-flexberry/components/flexberry-textbox', 'ember-flexberry-designer/objects/fd-editform-row', 'ember-flexberry-designer/objects/fd-editform-control'], function (_emberQunit, _flexberryTextbox, _fdEditformRow, _fdEditformControl) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-editform-row', 'Integration | Component | fd-editform-row', {
    integration: true,

    beforeEach: function beforeEach() {
      if (_flexberryTextbox.default.proto().i18n) {
        (true && !(false) && Ember.assert('Please, delete \'beforeEach\' and \'afterEach\' hooks.'));
      } else {
        _flexberryTextbox.default.reopen({ i18n: Ember.inject.service() });
      }
    },
    afterEach: function afterEach() {
      _flexberryTextbox.default.reopen({ i18n: null });
    }
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    var _this = this;

    this.set('selectItemAction', function (row) {
      return _this.set('selectedRow', row);
    });
    this.render(Ember.HTMLBars.template({
      "id": "j6QkBdcF",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-editform-row\",null,[[\"row\",\"selectedItem\",\"selectItemAction\"],[[22,[\"row\"]],[22,[\"selectedRow\"]],[22,[\"selectItemAction\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.set('row', _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformControl.default.create({ caption: 'Attribute #1' })])
    }));
    assert.ok(/\s*Attribute #1\s*/.test(this.$().text()), 'With one control.');
    assert.notOk(this.$('.fd-editform-row').hasClass('fields'));
    assert.notOk(this.$('.fd-editform-row').hasClass('equal'));
    assert.notOk(this.$('.fd-editform-row').hasClass('width'));

    this.set('row', _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformControl.default.create({ caption: 'Attribute #1' }), _fdEditformControl.default.create({ caption: 'Attribute #2' })])
    }));
    assert.ok(/\s*Attribute #1\s*Attribute #2\s*/.test(this.$().text()), 'With many controls.');
    assert.ok(this.$('.fd-editform-row').hasClass('fields'));
    assert.ok(this.$('.fd-editform-row').hasClass('equal'));
    assert.ok(this.$('.fd-editform-row').hasClass('width'));

    assert.notOk(this.get('selectedRow'), 'No selected row.');
    assert.notOk(this.$('.fd-editform-row').hasClass('selected'), 'No \'selected\' CSS-class.');

    this.$('input:first').click();
    assert.ok(this.get('selectedRow') === this.get('row.controls.firstObject'), 'Click on control in row.');
    assert.ok(this.$('.fd-editform-row .fd-editform-control').hasClass('selected'), 'Control highlighted.');

    this.$('.fd-editform-row').click();
    assert.ok(this.get('selectedRow') === this.get('row'), 'Click on row.');
    assert.ok(this.$('.fd-editform-row').hasClass('selected'), 'Row highlighted.');
  });
});
define('dummy/tests/integration/components/fd-file-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-file', 'Integration | Component | fd-file', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xLg90V3o",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-file\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-groupedit-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-groupedit', 'Integration | Component | fd-groupedit', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and enough', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "abfsfJWh",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-groupedit\"],false]],\"hasEval\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-lookup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-lookup', 'Integration | Component | fd-lookup', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    var _this = this;

    assert.expect(3);

    this.set('showLookupAction', function (caption, wiev) {
      assert.ok(_this.get('caption') === caption);
      assert.ok(_this.get('wiev') === wiev);
    });

    this.render(Ember.HTMLBars.template({
      "id": "la3c6RXt",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-lookup\",null,[[\"caption\",\"view\",\"showLookupAction\"],[[22,[\"caption\"]],[22,[\"wiev\"]],[22,[\"showLookupAction\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.ok(this.$('.button.ui-change').hasClass('disabled'), 'Can not open without the view.');

    this.set('caption', {});
    this.set('wiev', {});

    this.$('.button.ui-change').click();
  });
});
define('dummy/tests/integration/components/fd-object-list-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-object-list-view', 'Integration | Component | fd-object-list-view', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "0hA8ZVPJ",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-object-list-view\",null,[[\"headers\",\"rows\",\"showCheckBoxInRow\"],[[22,[\"headers\"]],[22,[\"rows\"]],[22,[\"showCheckBoxInRow\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    this.set('headers', Ember.A(['Column #1', 'Column #2']));
    this.set('rows', Ember.A([Ember.A(['Cell #1', 'Cell #2']), Ember.A(['Cell #3', 'Cell #4'])]));

    assert.equal(this.$('thead tr').length, 1, 'The table has a header.');
    assert.equal(this.$('tbody tr').length, this.get('rows.length'), 'The table has all rows.');
    assert.ok(/\s*Column #1\s*Column #2\s*/.test(this.$('th').text()), 'The headers are correct.');
    assert.notOk(this.$('th').is('.collapsing'), 'The column with checkboxes - no.');

    this.set('showCheckBoxInRow', true);

    assert.ok(this.$('th').is('.collapsing'), 'The column with checkboxes - yes.');
  });
});
define('dummy/tests/integration/components/fd-objectlistview-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-objectlistview', 'Integration | Component | fd-objectlistview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders and works', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "1Fd0EVhU",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-objectlistview\",null,[[\"view\",\"types\"],[[22,[\"wiev\"]],[22,[\"types\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    this.set('types', [{ type: 'string' }, { type: 'bool' }]);
    this.set('wiev', {
      definition: Ember.A([Ember.Object.create({ caption: 'Column #1' }), Ember.Object.create({ name: 'Column #2' })])
    });

    assert.equal(this.$('tbody tr').length, 5, '5 rows per page by default.');
    assert.ok(/\s*Column #1\s*Column #2\s*/.test(this.$('th').text()), 'The headers are correct.');

    this.$('.flexberry-dropdown .item[data-value=1]').click();
    assert.equal(this.$('tbody tr').length, 10, 'Switch to 10 rows on per page.');

    this.$('.next-page-button').click();
    assert.equal(this.$('tbody tr').length, 5, 'Go to next page.');
    assert.ok(this.$('.next-page-button').hasClass('disabled'), 'This is the last page.');
  });
});
define('dummy/tests/integration/components/fd-round-button-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-round-button', 'Integration | Component | fd round button', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "a9TW6o4k",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-round-button\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    // this.render(hbs`
    //   {{#fd-round-button}}
    //     template block text
    //   {{/fd-round-button}}
    // `);

    // assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('dummy/tests/integration/components/fd-search-input-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-search-input', 'Integration | Component | fd search input', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "2qxcanYx",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-search-input\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Btfei3z7",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n    \"],[1,[26,\"fd-search-input\",null,[[\"value\"],[\"template block text\"]]],false],[0,\"\\n  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().find('input').val().trim(), 'template block text');
  });
});
define('dummy/tests/integration/components/fd-tab-dropdown-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  // import hbs from 'htmlbars-inline-precompile';

  (0, _emberQunit.moduleForComponent)('fd-tab-dropdown', 'Integration | Component | fd tab dropdown', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    // this.render(hbs`{{fd-tab-dropdown}}`);

    // assert.equal(this.$().text().trim(), '');

    // Template block usage:
    // this.render(hbs`
    //   {{#fd-tab-dropdown}}
    //     template block text
    //   {{/fd-tab-dropdown}}
    // `);

    // assert.equal(this.$().text().trim(), 'template block text');
    assert.equal('', '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-editor-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-editor', 'Integration | Component | fd uml diagram editor', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "XteFdOWm",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-uml-diagram-editor\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram', 'Integration | Component | fd-uml-diagram', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "RBoxM6Fg",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fd-uml-diagram\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-ad-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-ad-toolbar', 'Integration | Component | fd uml diagram toolbars/fd ad toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "hNFFHsq0",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-ad-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-cad-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-cad-toolbar', 'Integration | Component | fd uml diagram toolbars/fd cad toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "q3rdc/7N",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-cad-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-cod-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-cod-toolbar', 'Integration | Component | fd uml diagram toolbars/fd cod toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "4TyFxoUJ",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-cod-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-dpd-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-dpd-toolbar', 'Integration | Component | fd uml diagram toolbars/fd dpd toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "sayBSKeN",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-dpd-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-sd-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-sd-toolbar', 'Integration | Component | fd uml diagram toolbars/fd sd toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "vxXoQGCx",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-sd-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-std-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-std-toolbar', 'Integration | Component | fd uml diagram toolbars/fd std toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "nqbzOWf8",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-std-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-uml-diagram-toolbars/fd-ucd-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-uml-diagram-toolbars/fd-ucd-toolbar', 'Integration | Component | fd uml diagram toolbars/fd ucd toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('actions.toolbarButtonClicked', function () {});

    this.render(Ember.HTMLBars.template({
      "id": "pNeTFWvS",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-uml-diagram-toolbars/fd-ucd-toolbar\",null,[[\"toolbarButtonClicked\"],[[26,\"action\",[[21,0,[]],\"toolbarButtonClicked\"],null]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('dummy/tests/integration/components/fd-visual-listform-form', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fd-visual-listform-form', 'Integration | Component | fd visual edit list form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', { listform: { listAttributes: [] }, editControl: { type: 'string' } });

    this.render(Ember.HTMLBars.template({
      "id": "u86ByZps",
      "block": "{\"symbols\":[],\"statements\":[[1,[26,\"fd-visual-listform-form\",null,[[\"model\"],[[22,[\"model\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal('', '');

    /*assert.equal(this.$().text().trim(), '');*/

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "1DpmgoZx",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"fd-visual-listform-form\",null,[[\"model\"],[[22,[\"model\"]]]],{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    /*assert.equal(this.$().text().trim(), 'template block text');*/
    assert.equal('', '');
  });
});
define('dummy/tests/test-helper', ['dummy/app', 'dummy/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-button-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-button-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-editform-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-editform-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-editform-row-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-editform-row-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-groupedit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-groupedit-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-lookup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-lookup-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-object-list-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-object-list-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-objectlistview-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-objectlistview-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-round-button-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-round-button-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-search-input-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-search-input-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-tab-dropdown-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-tab-dropdown-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-ad-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-ad-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-cad-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-cad-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-cod-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-cod-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-dpd-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-dpd-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-sd-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-sd-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-std-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-std-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-uml-diagram-toolbars/fd-ucd-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-uml-diagram-toolbars/fd-ucd-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fd-visual-listform-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fd-visual-listform-form.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-all-projects/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-all-projects/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-all-projects/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-all-projects/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-application-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-application-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-appstruct-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-appstruct-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-association-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-association-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-association-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-association-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-business-server-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-business-server-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-class-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-class-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-class-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-class-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-configuration-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-configuration-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-configuration-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-configuration-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-data-types-map-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-data-types-map-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-diagram-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-diagram-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-diagram-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-diagram-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-edit-form-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-edit-form-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-editform-constructor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-editform-constructor-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-enum-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-enum-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-external-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-external-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-generation-process-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-generation-process-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-generation/first-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-generation/first-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-generation/list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-generation/list-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-generation/list/log-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-generation/list/log-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-inheritance-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-inheritance-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-inheritance-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-inheritance-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-interface-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-interface-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-list-form-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-list-form-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-listform-constructor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-listform-constructor.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-stage-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-stage-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-stage-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-stage-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-system-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-system-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-system-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-system-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-type-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-type-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-user-form-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-user-form-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-view-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-view-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-view-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-view-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/fd-visual-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/fd-visual-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/new-platform-flexberry-web-designer-generation-e-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-generation-e-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/new-platform-flexberry-web-designer-generation-l-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-generation-l-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/new-platform-flexberry-web-designer-storage-type-e-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-storage-type-e-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/new-platform-flexberry-web-designer-storage-type-l-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-platform-flexberry-web-designer-storage-type-l-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/fd-draggable-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/fd-draggable-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/fd-limit-by-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/fd-limit-by-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-ad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-ad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-aggregation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-aggregation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-application-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-application-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-auth-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-auth-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-base-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-base-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-cad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-cad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-case-property-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-case-property-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-class-storage-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-class-storage-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-class-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-class-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-cod-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-cod-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-configuration-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-configuration-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-aggregation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-aggregation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-associated-detail-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-associated-detail-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-attribute-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-attribute-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-base-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-base-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-class-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-class-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-control-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-control-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-diagram-link-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-diagram-link-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-filelink-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-filelink-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-form-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-form-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-form-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-form-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-inheritance-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-inheritance-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-method-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-method-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-module-setting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-module-setting-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-module-setting-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-module-setting-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-parameter-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-parameter-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-process-status-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-process-status-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-stage-history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-stage-history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-system-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-system-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-task-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-task-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-type-definition-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-type-definition-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-ad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-ad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-cad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-cad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-cod-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-cod-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-dpd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-dpd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-sd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-sd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-std-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-std-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-uml-ucd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-uml-ucd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dev-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dev-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-diagram-link-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-diagram-link-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-diagram-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-diagram-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-dpd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-dpd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-filelink-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-filelink-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-following-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-following-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-form-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-form-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-form-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-form-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-generation-step-log-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-generation-step-log-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-generation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-generation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-inheritance-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-inheritance-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-object-in-system-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-object-in-system-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-plugin-on-rep-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-plugin-on-rep-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-project-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-project-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-registered-plug-in-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-registered-plug-in-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-repository-browser-data-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-browser-data-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-repository-browser-data-object-with-a-c-l-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-browser-data-object-with-a-c-l-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-repository-data-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-data-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-repository-object-with-plugins-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-object-with-plugins-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-repository-ref-data-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-ref-data-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-repository-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-repository-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-sd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-sd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-std-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-std-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-storage-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-storage-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-subsystem-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-subsystem-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-ucd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-ucd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-user-auth-profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-user-auth-profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-user-in-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-user-in-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-visual-edit-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-visual-edit-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/fd-visual-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/fd-visual-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-all-projects/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-all-projects/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-all-projects/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-all-projects/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-application-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-application-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-application-model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-application-model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-architecture-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-architecture-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-association-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-association-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-association-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-association-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-business-server-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-business-server-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-class-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-class-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-class-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-class-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-configuration-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-configuration-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-configuration-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-configuration-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-data-types-map-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-data-types-map-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-diagram-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-diagram-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-diagram-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-diagram-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-diagrams-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-diagrams-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-edit-form-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-edit-form-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-editform-constructor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-editform-constructor-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-enum-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-enum-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-external-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-external-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-generation-process-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-generation-process-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-generation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-generation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-generation/first-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-generation/first-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-generation/list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-generation/list-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-generation/list/log-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-generation/list/log-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-inheritance-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-inheritance-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-inheritance-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-inheritance-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-interface-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-interface-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-list-form-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-list-form-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-listform-constructor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-listform-constructor.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-navigation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-navigation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-setting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-setting-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-stage-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-stage-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-stage-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-stage-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-system-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-system-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-system-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-system-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-type-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-type-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-user-form-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-user-form-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-view-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-view-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-view-list-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-view-list-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-visual-edit-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-visual-edit-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/fd-visual-edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fd-visual-edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-platform-flexberry-web-designer-generation-e-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-generation-e-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-platform-flexberry-web-designer-generation-l-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-generation-l-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-platform-flexberry-web-designer-storage-type-e-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-storage-type-e-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-platform-flexberry-web-designer-storage-type-l-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-platform-flexberry-web-designer-storage-type-l-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-ad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-ad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-aggregation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-aggregation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-application-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-application-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-auth-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-auth-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-base-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-base-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-cad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-cad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-case-property-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-case-property-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-class-storage-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-class-storage-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-class-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-class-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-cod-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-cod-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-configuration-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-configuration-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-aggregation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-aggregation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-associated-detail-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-associated-detail-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-attribute-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-attribute-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-base-association-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-base-association-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-class-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-class-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-control-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-control-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-diagram-link-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-diagram-link-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-filelink-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-filelink-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-form-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-form-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-form-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-form-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-inheritance-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-inheritance-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-method-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-method-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-module-setting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-module-setting-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-module-setting-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-module-setting-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-parameter-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-parameter-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-process-status-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-process-status-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-stage-history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-stage-history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-system-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-system-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-task-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-task-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-type-definition-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-type-definition-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-ad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-ad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-cad-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-cad-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-cod-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-cod-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-dpd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-dpd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-sd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-sd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-std-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-std-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-uml-ucd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-uml-ucd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dev-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dev-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-diagram-link-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-diagram-link-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-diagram-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-diagram-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-dpd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-dpd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-filelink-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-filelink-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-following-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-following-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-form-control-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-form-control-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-form-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-form-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-generation-step-log-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-generation-step-log-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-generation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-generation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-inheritance-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-inheritance-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-object-in-system-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-object-in-system-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-plugin-on-rep-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-plugin-on-rep-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-project-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-project-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-registered-plug-in-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-registered-plug-in-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-repository-browser-data-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-browser-data-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-browser-data-object-with-a-c-l-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-repository-data-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-data-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-repository-object-with-plugins-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-object-with-plugins-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-repository-ref-data-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-ref-data-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-repository-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-repository-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-sd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-sd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-std-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-std-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-storage-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-storage-type-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-subsystem-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-subsystem-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-ucd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-ucd-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-user-auth-profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-user-auth-profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-user-in-stage-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-user-in-stage-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/fd-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/fd-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/fd-current-project-context-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/fd-current-project-context-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/fd-generation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/fd-generation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/fd-sheet-service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/fd-sheet-service-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/new-platform-flexberry-web-designer-business-server-class-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-activity-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-activity-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-class-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-class-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-collaboration-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-collaboration-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-common-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-common-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-containers-tree-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-containers-tree-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-definition-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-definition-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-deployment-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-deployment-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-preload-stage-metadata-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-preload-stage-metadata-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-sequence-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-sequence-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-statechart-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-statechart-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-storeinstancesintype-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-storeinstancesintype-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-type-map-functions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-type-map-functions-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-update-class-diagram-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-update-class-diagram-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-usecase-diagram-primitives-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-usecase-diagram-primitives-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/fd-view-path-functions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/fd-view-path-functions-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/get-json-for-diagram-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/get-json-for-diagram-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/model-has-changes-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/model-has-changes-test.js should pass ESLint\n\n');
  });
});
define('dummy/tests/unit/controllers/fd-all-projects/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-all-projects/index', 'Unit | Controller | fd all projects/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:appState', 'service:fd-current-project-context']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-all-projects/new-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-all-projects/new', 'Unit | Controller | fd all projects/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:appState', 'service:fd-current-project-context']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-application-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-application-edit-form', 'Unit | Controller | fd application edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-appstruct-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-appstruct-form', 'Unit | Controller | new platform flexberry web designer appstruct form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:fd-current-project-context', 'service:appState', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-association-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-association-edit-form', 'Unit | Controller | fd association edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-association-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-association-list-form', 'Unit | Controller | fd association list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-business-server-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-business-server-edit-form', 'Unit | Controller | fd business server edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-class-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-class-edit-form', 'Unit | Controller | fd class edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-class-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-class-list-form', 'Unit | Controller | fd class list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-configuration-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-configuration-edit-form', 'Unit | Controller | fd configuration edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-configuration-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-configuration-list-form', 'Unit | Controller | fd configuration list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-data-types-map-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-data-types-map', 'Unit | Controller | fd data types map', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:appState']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-diagram-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-diagram-edit-form', 'Unit | Controller | fd diagram edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-diagram-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-diagram-list-form', 'Unit | Controller | fd diagram list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-edit-form-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-edit-form-edit-form', 'Unit | Controller | fd edit form edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-editform-constructor-test', ['ember-qunit', 'ember-flexberry-designer/objects/fd-editform-row', 'ember-flexberry-designer/objects/fd-editform-control', 'ember-flexberry-designer/objects/fd-editform-group', 'ember-flexberry-designer/objects/fd-editform-tabgroup', 'ember-flexberry-designer/objects/fd-editform-tab'], function (_emberQunit, _fdEditformRow, _fdEditformControl, _fdEditformGroup, _fdEditformTabgroup, _fdEditformTab) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-editform-constructor', 'Unit | Controller | fd-editform-constructor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:appState']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  (0, _emberQunit.test)('\'_findItemContainer\' function', function (assert) {
    var controller = this.subject();
    controller.set('controlsTree', Ember.A([_fdEditformRow.default.create({
      controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control' })])
    }), _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control #1' }), _fdEditformControl.default.create({ caption: 'Control #2' })])
    }), _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformGroup.default.create({
        caption: 'Group',
        rows: Ember.A([_fdEditformRow.default.create({
          controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control' })])
        })])
      })])
    }), _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformTabgroup.default.create({
        tabs: Ember.A([_fdEditformTab.default.create({
          caption: 'Tab #1',
          rows: Ember.A([_fdEditformRow.default.create({
            controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control' })])
          })])
        }), _fdEditformTab.default.create({
          caption: 'Tab #2',
          rows: Ember.A([_fdEditformRow.default.create({
            controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control' })])
          }), _fdEditformRow.default.create({
            controls: Ember.A([_fdEditformGroup.default.create({
              caption: 'Group',
              rows: Ember.A([_fdEditformRow.default.create({
                controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control' })])
              })])
            })])
          })])
        })])
      })])
    })]));

    [{
      message: 'First control.',
      item: controller.get('controlsTree.firstObject.controls.firstObject'),
      container: controller.get('controlsTree.firstObject'),
      startContainer: undefined
    }, {
      message: 'One of controls from row.',
      item: controller.get('controlsTree').objectAt(1).get('controls.lastObject'),
      container: controller.get('controlsTree').objectAt(1),
      startContainer: undefined
    }, {
      message: 'First group.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject'),
      container: controller.get('controlsTree').objectAt(2),
      startContainer: undefined
    }, {
      message: 'Row in group.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject'),
      container: controller.get('controlsTree').objectAt(2).get('controls.firstObject'),
      startContainer: undefined
    }, {
      message: 'Row in group with start container.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject'),
      container: controller.get('controlsTree').objectAt(2).get('controls.firstObject'),
      startContainer: controller.get('controlsTree').objectAt(2)
    }, {
      message: 'Control in group.',
      item: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject.controls.firstObject'),
      container: controller.get('controlsTree').objectAt(2).get('controls.firstObject.rows.firstObject'),
      startContainer: undefined
    }, {
      message: 'First tabs group.',
      item: controller.get('controlsTree.lastObject.controls.firstObject'),
      container: controller.get('controlsTree.lastObject'),
      startContainer: undefined
    }, {
      message: 'Tab in tabs group.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject'),
      startContainer: undefined
    }, {
      message: 'Row in tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject'),
      startContainer: undefined
    }, {
      message: 'Control in tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject.controls.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject'),
      startContainer: undefined
    }, {
      message: 'Control in other tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.firstObject.rows.firstObject.controls.firstObject'),
      container: null,
      startContainer: controller.get('controlsTree.lastObject.controls.firstObject.tabs.lastObject')
    }, {
      message: 'Group in tab.',
      item: controller.get('controlsTree.lastObject.controls.firstObject.tabs.lastObject.rows.lastObject.controls.firstObject.rows.firstObject'),
      container: controller.get('controlsTree.lastObject.controls.firstObject.tabs.lastObject.rows.lastObject.controls.firstObject'),
      startContainer: undefined
    }].forEach(function (set) {
      assert.ok(controller._findItemContainer(set.item, set.startContainer) === set.container, set.message);
    });
  });

  (0, _emberQunit.test)('properties to move controls', function (assert) {
    var controller = this.subject();
    var control1 = _fdEditformControl.default.create({ caption: 'Control #1' });
    var control2 = _fdEditformControl.default.create({ caption: 'Control #2' });
    var control3 = _fdEditformControl.default.create({ caption: 'Control #3' });
    var row1 = _fdEditformRow.default.create({ controls: Ember.A([control1]) });
    var row2 = _fdEditformRow.default.create({ controls: Ember.A([control2, control3]) });
    controller.set('controlsTree', Ember.A([row1, row2]));

    controller.set('selectedItem', control1);
    assert.ok(controller.get('_itemToMove') === row1, 'The row with one control.');
    assert.ok(controller.get('_itemToMoveStorage') === controller.get('controlsTree'));
    assert.ok(controller.get('_itemToMoveIsRow'));
    assert.ok(controller.get('_itemToMoveIsFirst'));
    assert.notOk(controller.get('_itemToMoveIsLast'));

    controller.set('selectedItem', control2);
    assert.ok(controller.get('_itemToMove') === control2, 'Control #2.');
    assert.ok(controller.get('_itemToMoveStorage') === row2.get('controls'));
    assert.notOk(controller.get('_itemToMoveIsRow'));
    assert.ok(controller.get('_itemToMoveIsFirst'));
    assert.notOk(controller.get('_itemToMoveIsLast'));

    controller.set('selectedItem', control3);
    assert.ok(controller.get('_itemToMove') === control3, 'Control #3.');
    assert.ok(controller.get('_itemToMoveStorage') === row2.get('controls'));
    assert.notOk(controller.get('_itemToMoveIsRow'));
    assert.notOk(controller.get('_itemToMoveIsFirst'));
    assert.ok(controller.get('_itemToMoveIsLast'));
  });
});
define('dummy/tests/unit/controllers/fd-enum-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-enum-edit-form', 'Unit | Controller | fd enum edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-external-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-external-edit-form', 'Unit | Controller | fd external edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-generation-process-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-generation-process-form', 'Unit | Controller | fd generation process form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:appState', 'service:fd-current-project-context', 'service:fd-generation']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-generation/first-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-generation/first', 'Unit | Controller | fd-generation/first', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-generation/list-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-generation/list', 'Unit | Controller | fd-generation/list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-generation/list/log-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-generation/list/log', 'Unit | Controller | fd-generation/list/log', {
    // Specify the other units that are required for this test.
    needs: ['controller:fd-generation.list']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-inheritance-edit-form', 'Unit | Controller | fd inheritance edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-inheritance-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-inheritance-list-form', 'Unit | Controller | fd inheritance list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-interface-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-interface-edit-form', 'Unit | Controller | fd interface edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-list-form-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-list-form-edit-form', 'Unit | Controller | fd list form edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-listform-constructor', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-listform-constructor', 'Unit | Controller | fd-listform-constructor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-stage-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-stage-edit-form', 'Unit | Controller | fd stage edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-stage-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-stage-list-form', 'Unit | Controller | fd stage list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-system-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-system-edit-form', 'Unit | Controller | fd system edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-system-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-system-list-form', 'Unit | Controller | fd system list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-type-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-type-edit-form', 'Unit | Controller | fd type edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-user-form-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-user-form-edit-form', 'Unit | Controller | fd user form edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-view-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-view-edit-form', 'Unit | Controller | fd view edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:appState', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-view-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:fd-view-list-form', 'Unit | Controller | fd view list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/fd-visual-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-generation-e-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-generation-e', 'Unit | Controller | new platform flexberry web designer generation e', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-generation-l-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-generation-l', 'Unit | Controller | new platform flexberry web designer generation l', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-storage-type-e-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-storage-type-e', 'Unit | Controller | new platform flexberry web designer storage type e', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'controller:colsconfig-dialog', 'service:objectlistviewEvents', 'controller:lookup-dialog', 'controller:flexberry-file-view-dialog', 'service:user-settings', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/controllers/new-platform-flexberry-web-designer-storage-type-l-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:new-platform-flexberry-web-designer-storage-type-l', 'Unit | Controller | new platform flexberry web designer storage type l', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['controller:advlimit-dialog', 'service:user-settings', 'service:objectlistview-events', 'controller:colsconfig-dialog', 'service:adv-limit']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('dummy/tests/unit/mixins/fd-draggable-control-test', ['ember-flexberry-designer/mixins/fd-draggable-control', 'qunit'], function (_fdDraggableControl, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | fd draggable control');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var FdDraggableControlObject = Ember.Object.extend(_fdDraggableControl.default);
    var subject = FdDraggableControlObject.create();
    assert.ok(subject);
  });
});
define('dummy/tests/unit/mixins/fd-limit-by-stage-test', ['qunit', 'ember-flexberry-data/query/predicate', 'ember-flexberry-designer/mixins/fd-limit-by-stage'], function (_qunit, _predicate, _fdLimitByStage) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | fd limit by stage');

  (0, _qunit.test)('it really works', function (assert) {
    var subject = Ember.Object.extend(_fdLimitByStage.default).create();

    // Imitation the service.
    subject.set('currentContext', Ember.Object.create({
      getCurrentStage: function getCurrentStage() {
        return 'stage';
      }
    }));

    assert.ok(subject.objectListViewLimitPredicate() instanceof _predicate.SimplePredicate);
  });
});
define('dummy/tests/unit/models/fd-ad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-ad', 'Unit | Model | fd-ad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-aggregation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-aggregation', 'Unit | Model | fd-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-application-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-application-user', 'Unit | Model | fd-application-user', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-association', 'Unit | Model | fd-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-auth-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-auth-type', 'Unit | Model | fd-auth-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-base-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-base-association', 'Unit | Model | fd-base-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-cad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-cad', 'Unit | Model | fd-cad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-case-property-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-case-property', 'Unit | Model | fd-case-property', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-class-storage-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-class-storage-type', 'Unit | Model | fd-class-storage-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-class-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-class', 'Unit | Model | fd-class', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-cod-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-cod', 'Unit | Model | fd-cod', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-configuration-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-configuration', 'Unit | Model | fd-configuration', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-aggregation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-aggregation', 'Unit | Model | fd-dev-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-associated-detail-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-associated-detail-view', 'Unit | Model | fd-dev-associated-detail-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-association', 'Unit | Model | fd-dev-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-attribute-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-attribute', 'Unit | Model | fd-dev-attribute', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-base-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-base-association', 'Unit | Model | fd-dev-base-association', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-class-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-class', 'Unit | Model | fd-dev-class', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-control-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-control-type', 'Unit | Model | fd-dev-control-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-diagram-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-diagram-link', 'Unit | Model | fd-dev-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-filelink-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-filelink', 'Unit | Model | fd-dev-filelink', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-form-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-form-control', 'Unit | Model | fd-dev-form-control', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-form-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-form-view', 'Unit | Model | fd-dev-form-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-inheritance-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-inheritance', 'Unit | Model | fd-dev-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-method-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-method', 'Unit | Model | fd-dev-method', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting', 'Unit | Model | fd-dev-module-setting', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-module-setting-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting-type', 'Unit | Model | fd-dev-module-setting-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-parameter-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-parameter', 'Unit | Model | fd-dev-parameter', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-process-status-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-process-status', 'Unit | Model | fd-dev-process-status', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-stage-history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-stage-history', 'Unit | Model | fd-dev-stage-history', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-stage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-stage', 'Unit | Model | fd-dev-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-system-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-system', 'Unit | Model | fd-dev-system', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-task-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-task', 'Unit | Model | fd-dev-task', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-type-definition-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-type-definition', 'Unit | Model | fd-dev-type-definition', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ad', 'Unit | Model | fd-dev-uml-ad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cad', 'Unit | Model | fd-dev-uml-cad', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-cod-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cod', 'Unit | Model | fd-dev-uml-cod', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-dpd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-dpd', 'Unit | Model | fd-dev-uml-dpd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-sd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-sd', 'Unit | Model | fd-dev-uml-sd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-std-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-std', 'Unit | Model | fd-dev-uml-std', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-uml-ucd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ucd', 'Unit | Model | fd-dev-uml-ucd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dev-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-view', 'Unit | Model | fd-dev-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-diagram-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-diagram-link', 'Unit | Model | fd-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-diagram-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-diagram', 'Unit | Model | fd-diagram', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-dpd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dpd', 'Unit | Model | fd-dpd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-filelink-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-filelink', 'Unit | Model | fd-filelink', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-following-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-following', 'Unit | Model | fd-following', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-form-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-form-control', 'Unit | Model | fd-form-control', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-form-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-form-view', 'Unit | Model | fd-form-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-generation-step-log-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-generation-step-log', 'Unit | Model | fd-generation-step-log', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-generation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-generation', 'Unit | Model | fd-generation', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-inheritance-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-inheritance', 'Unit | Model | fd-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-object-in-system-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-object-in-system', 'Unit | Model | fd-object-in-system', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-plugin-on-rep-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-plugin-on-rep-object', 'Unit | Model | fd-plugin-on-rep-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-project-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-project', 'Unit | Model | fd-project', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-registered-plug-in-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-registered-plug-in', 'Unit | Model | fd-registered-plug-in', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object', 'Unit | Model | fd-repository-browser-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-browser-data-object-with-a-c-l-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object-with-a-c-l', 'Unit | Model | fd-repository-browser-data-object-with-a-c-l', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-data-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-data-object', 'Unit | Model | fd-repository-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-object-with-plugins-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-object-with-plugins', 'Unit | Model | fd-repository-object-with-plugins', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-ref-data-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-ref-data-object', 'Unit | Model | fd-repository-ref-data-object', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-repository-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository', 'Unit | Model | fd-repository', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-sd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-sd', 'Unit | Model | fd-sd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-stage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-stage', 'Unit | Model | fd-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-std-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-std', 'Unit | Model | fd-std', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-storage-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-storage-type', 'Unit | Model | fd-storage-type', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-subsystem-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-subsystem', 'Unit | Model | fd-subsystem', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-ucd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-ucd', 'Unit | Model | fd-ucd', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-user-auth-profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-user-auth-profile', 'Unit | Model | fd-user-auth-profile', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-user-in-stage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-user-in-stage', 'Unit | Model | fd-user-in-stage', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-view', 'Unit | Model | fd-view', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    // let store = this.store();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-visual-edit-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-visual-edit-control', 'Unit | Model | fd visual edit control');

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/models/fd-visual-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-visual-edit-form', 'Unit | Model | fd visual edit form', {
    // Specify the other units that are required for this test.
    needs: ['model:fd-visual-edit-control']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    assert.ok(!!model);
  });
});
define('dummy/tests/unit/routes/fd-all-projects/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-all-projects/index', 'Unit | Route | fd all projects/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-all-projects/new-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-all-projects/new', 'Unit | Route | fd all projects/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-application-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-application-edit-form', 'Unit | Route | fd application edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-application-model-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-application-model', 'Unit | Route | fd application model', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:fd-current-project-context', 'service:fdSheetService']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-architecture-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-architecture', 'Unit | Route | fd architecture', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-association-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-association-edit-form', 'Unit | Route | fd association edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-association-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-association-list-form', 'Unit | Route | fd association list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-business-server-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-business-server-edit-form', 'Unit | Route | fd business server edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-class-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-class-edit-form', 'Unit | Route | fd class edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-class-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-class-list-form', 'Unit | Route | fd class list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-configuration-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-configuration-edit-form', 'Unit | Route | fd configuration edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-configuration-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-configuration-list-form', 'Unit | Route | fd configuration list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-data-types-map-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-data-types-map', 'Unit | Route | fd data types map', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:fd-current-project-context', 'service:appState']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-diagram-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-diagram-edit-form', 'Unit | Route | fd diagram edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-diagram-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-diagram-list-form', 'Unit | Route | fd diagram list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-diagrams-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-diagrams', 'Unit | Route | fd diagrams', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:fd-current-project-context', 'service:fdSheetService']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-edit-form-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-edit-form-edit-form', 'Unit | Route | fd edit form edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-editform-constructor-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-editform-constructor', 'Unit | Route | fd editform constructor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:fd-current-project-context']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-enum-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-enum-edit-form', 'Unit | Route | fd enum edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-external-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-external-edit-form', 'Unit | Route | fd external edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-generation-process-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-generation-process-form', 'Unit | Route | fd generation process form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-generation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-generation', 'Unit | Route | fd-generation', {
    // Specify the other units that are required for this test.
    needs: ['service:fd-current-project-context']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-generation/first-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-generation/first', 'Unit | Route | fd-generation/first', {
    // Specify the other units that are required for this test.
    needs: ['service:fd-current-project-context']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-generation/list-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-generation/list', 'Unit | Route | fd-generation/list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-generation/list/log-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-generation/list/log', 'Unit | Route | fd-generation/list/log', {
    // Specify the other units that are required for this test.
    needs: ['service:fd-sheet-service']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-inheritance-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-inheritance-edit-form', 'Unit | Route | fd inheritance edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-inheritance-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-inheritance-list-form', 'Unit | Route | fd inheritance list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-interface-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-interface-edit-form', 'Unit | Route | fd interface edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-list-form-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-list-form-edit-form', 'Unit | Route | fd list form edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-listform-constructor', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-listform-constructor', 'Unit | Route | fd-listform-constructor', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-navigation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-navigation', 'Unit | Route | fd navigation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:fd-current-project-context', 'service:fdSheetService']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-setting-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-setting', 'Unit | Route | fd setting', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-stage-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-stage-edit-form', 'Unit | Route | fd stage edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-stage-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-stage-list-form', 'Unit | Route | fd stage list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:appState', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-system-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-system-edit-form', 'Unit | Route | fd system edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-system-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-system-list-form', 'Unit | Route | fd system list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:fd-current-project-context', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-type-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-type-edit-form', 'Unit | Route | fd type edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-user-form-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-user-form-edit-form', 'Unit | Route | fd user form edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-view-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-view-edit-form', 'Unit | Route | fd view edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-view-list-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-view-list-form', 'Unit | Route | fd view list form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-visual-edit-control', 'Unit | Route | fd visual edit control', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/fd-visual-edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:fd-visual-edit-form', 'Unit | Route | fd visual edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-generation-e-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-generation-e', 'Unit | Route | new platform flexberry web designer generation e', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-generation-l-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-generation-l', 'Unit | Route | new platform flexberry web designer generation l', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-storage-type-e-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-storage-type-e', 'Unit | Route | new platform flexberry web designer storage type e', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistview-events', 'service:appState', 'service:detail-interaction', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/routes/new-platform-flexberry-web-designer-storage-type-l-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-platform-flexberry-web-designer-storage-type-l', 'Unit | Route | new platform flexberry web designer storage type l', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:cols-config-menu', 'service:objectlistviewEvents', 'service:formLoadTimeTracker', 'service:colsConfigMenu', 'service:appState', 'service:adv-limit']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('dummy/tests/unit/serializers/fd-ad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-ad', 'Unit | Serializer | fd-ad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-ad', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-aggregation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-aggregation', 'Unit | Serializer | fd-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-aggregation', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-application-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-application-user', 'Unit | Serializer | fd-application-user', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-application-user', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-association', 'Unit | Serializer | fd-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-association', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-auth-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-auth-type', 'Unit | Serializer | fd-auth-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-auth-type', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-base-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-base-association', 'Unit | Serializer | fd-base-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-base-association', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-cad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-cad', 'Unit | Serializer | fd-cad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-cad', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-case-property-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-case-property', 'Unit | Serializer | fd-case-property', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-case-property', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-class-storage-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-class-storage-type', 'Unit | Serializer | fd-class-storage-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-class-storage-type', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-class-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-class', 'Unit | Serializer | fd-class', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-class', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-cod-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-cod', 'Unit | Serializer | fd-cod', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-cod', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-configuration-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-configuration', 'Unit | Serializer | fd-configuration', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-configuration', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-aggregation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-aggregation', 'Unit | Serializer | fd-dev-aggregation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-aggregation', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-associated-detail-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-associated-detail-view', 'Unit | Serializer | fd-dev-associated-detail-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-associated-detail-view', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-association', 'Unit | Serializer | fd-dev-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-association', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-attribute-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-attribute', 'Unit | Serializer | fd-dev-attribute', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-attribute', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-base-association-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-base-association', 'Unit | Serializer | fd-dev-base-association', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-base-association', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-class-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-class', 'Unit | Serializer | fd-dev-class', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-class', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:fd-propertylookupstr', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-control-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-control-type', 'Unit | Serializer | fd-dev-control-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-control-type', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-diagram-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-diagram-link', 'Unit | Serializer | fd-dev-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-diagram-link', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-filelink-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-filelink', 'Unit | Serializer | fd-dev-filelink', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-filelink', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-form-control', 'Unit | Serializer | fd-dev-form-control', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-form-control', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-form-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-form-view', 'Unit | Serializer | fd-dev-form-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-form-view', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-inheritance-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-inheritance', 'Unit | Serializer | fd-dev-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-inheritance', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-method-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-method', 'Unit | Serializer | fd-dev-method', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-method', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting', 'Unit | Serializer | fd-dev-module-setting', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-module-setting', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-module-setting-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-module-setting-type', 'Unit | Serializer | fd-dev-module-setting-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-module-setting-type', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-parameter-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-parameter', 'Unit | Serializer | fd-dev-parameter', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-parameter', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-process-status-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-process-status', 'Unit | Serializer | fd-dev-process-status', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-process-status', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-stage-history', 'Unit | Serializer | fd-dev-stage-history', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-stage-history', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-stage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-stage', 'Unit | Serializer | fd-dev-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-stage', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-system-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-system', 'Unit | Serializer | fd-dev-system', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-system', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-task-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-task', 'Unit | Serializer | fd-dev-task', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-task', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-type-definition-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-type-definition', 'Unit | Serializer | fd-dev-type-definition', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-type-definition', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ad', 'Unit | Serializer | fd-dev-uml-ad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-ad', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cad-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cad', 'Unit | Serializer | fd-dev-uml-cad', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-cad', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-cod-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-cod', 'Unit | Serializer | fd-dev-uml-cod', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-cod', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-dpd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-dpd', 'Unit | Serializer | fd-dev-uml-dpd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-dpd', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-sd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-sd', 'Unit | Serializer | fd-dev-uml-sd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-sd', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-std-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-std', 'Unit | Serializer | fd-dev-uml-std', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-std', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-uml-ucd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-uml-ucd', 'Unit | Serializer | fd-dev-uml-ucd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-uml-ucd', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dev-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dev-view', 'Unit | Serializer | fd-dev-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dev-view', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-diagram-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-diagram-link', 'Unit | Serializer | fd-diagram-link', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-diagram-link', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-diagram-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-diagram', 'Unit | Serializer | fd-diagram', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-diagram', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-dpd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-dpd', 'Unit | Serializer | fd-dpd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-dpd', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-filelink-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-filelink', 'Unit | Serializer | fd-filelink', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-filelink', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-following-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-following', 'Unit | Serializer | fd-following', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-following', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-form-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-form-control', 'Unit | Serializer | fd-form-control', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-form-control', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-form-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-form-view', 'Unit | Serializer | fd-form-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-form-view', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-generation-step-log-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-generation-step-log', 'Unit | Serializer | fd-generation-step-log', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-generation-step-log', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-generation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-generation', 'Unit | Serializer | fd-generation', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-generation', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-inheritance-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-inheritance', 'Unit | Serializer | fd-inheritance', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-inheritance', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-object-in-system-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-object-in-system', 'Unit | Serializer | fd-object-in-system', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-object-in-system', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-plugin-on-rep-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-plugin-on-rep-object', 'Unit | Serializer | fd-plugin-on-rep-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-plugin-on-rep-object', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-project-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-project', 'Unit | Serializer | fd-project', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-project', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-registered-plug-in-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-registered-plug-in', 'Unit | Serializer | fd-registered-plug-in', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-registered-plug-in', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object', 'Unit | Serializer | fd-repository-browser-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-browser-data-object', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-browser-data-object-with-a-c-l-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-browser-data-object-with-a-c-l', 'Unit | Serializer | fd-repository-browser-data-object-with-a-c-l', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-browser-data-object-with-a-c-l', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-data-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-data-object', 'Unit | Serializer | fd-repository-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-data-object', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-object-with-plugins-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-object-with-plugins', 'Unit | Serializer | fd-repository-object-with-plugins', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-object-with-plugins', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-ref-data-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository-ref-data-object', 'Unit | Serializer | fd-repository-ref-data-object', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository-ref-data-object', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-repository-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-repository', 'Unit | Serializer | fd-repository', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-repository', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-sd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-sd', 'Unit | Serializer | fd-sd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-sd', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-stage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-stage', 'Unit | Serializer | fd-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-stage', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-std-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-std', 'Unit | Serializer | fd-std', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-std', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-storage-type-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-storage-type', 'Unit | Serializer | fd-storage-type', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-storage-type', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-subsystem-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-subsystem', 'Unit | Serializer | fd-subsystem', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-subsystem', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-ucd-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-ucd', 'Unit | Serializer | fd-ucd', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-ucd', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-user-auth-profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-user-auth-profile', 'Unit | Serializer | fd-user-auth-profile', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-user-auth-profile', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-user-in-stage-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-user-in-stage', 'Unit | Serializer | fd-user-in-stage', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-user-in-stage', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/serializers/fd-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('fd-view', 'Unit | Serializer | fd-view', {
    // Specify the other units that are required for this test.
    needs: ['serializer:fd-view', 'transform:file', 'transform:decimal', 'transform:guid', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode', 'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events', 'transform:new-platform-flexberry-web-designer-access-mode', 'transform:new-platform-flexberry-web-designer-generation-state', 'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier', 'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier', 'transform:new-platform-flexberry-web-designer-business-server-class', 'model:fd-ad', 'model:fd-aggregation', 'model:fd-application-user', 'model:fd-association', 'model:fd-auth-type', 'model:fd-base-association', 'model:fd-cad', 'model:fd-case-property', 'model:fd-class-storage-type', 'model:fd-class', 'model:fd-cod', 'model:fd-configuration', 'model:fd-dev-aggregation', 'model:fd-dev-associated-detail-view', 'model:fd-dev-association', 'model:fd-dev-attribute', 'model:fd-dev-base-association', 'model:fd-dev-class', 'model:fd-dev-control-type', 'model:fd-dev-diagram-link', 'model:fd-dev-filelink', 'model:fd-dev-form-control', 'model:fd-dev-form-view', 'model:fd-dev-inheritance', 'model:fd-dev-method', 'model:fd-dev-module-setting-type', 'model:fd-dev-module-setting', 'model:fd-dev-parameter', 'model:fd-dev-process-status', 'model:fd-dev-stage-history', 'model:fd-dev-stage', 'model:fd-dev-system', 'model:fd-dev-task', 'model:fd-dev-type-definition', 'model:fd-dev-uml-ad', 'model:fd-dev-uml-cad', 'model:fd-dev-uml-cod', 'model:fd-dev-uml-dpd', 'model:fd-dev-uml-sd', 'model:fd-dev-uml-std', 'model:fd-dev-uml-ucd', 'model:fd-dev-view', 'model:fd-diagram-link', 'model:fd-diagram', 'model:fd-dpd', 'model:fd-filelink', 'model:fd-following', 'model:fd-form-control', 'model:fd-form-view', 'model:fd-generation-step-log', 'model:fd-generation', 'model:fd-inheritance', 'model:fd-object-in-system', 'model:fd-plugin-on-rep-object', 'model:fd-project', 'model:fd-registered-plug-in', 'model:fd-repository-browser-data-object-with-a-c-l', 'model:fd-repository-browser-data-object', 'model:fd-repository-data-object', 'model:fd-repository-object-with-plugins', 'model:fd-repository-ref-data-object', 'model:fd-repository', 'model:fd-sd', 'model:fd-stage', 'model:fd-std', 'model:fd-storage-type', 'model:fd-subsystem', 'model:fd-ucd', 'model:fd-user-auth-profile', 'model:fd-user-in-stage', 'model:fd-view', 'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', 'service:syncer']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('dummy/tests/unit/services/fd-current-project-context-test', ['ember-data', 'ember-qunit', 'ember-flexberry-designer/models/fd-dev-system'], function (_emberData, _emberQunit, _fdDevSystem) {
  'use strict';

  // Stub store service.
  var storeStub = _emberData.default.Store.extend({
    query: function query() {
      return Ember.RSVP.resolve(null);
    }
  });

  // Stub fd-dev-system model.
  var fdDevSystemModelStub = _fdDevSystem.default.extend({
    save: function save() {
      var _this = this;
      _this.set('id', 'subsystem');
      return Ember.RSVP.resolve(_this);
    }
  });

  (0, _emberQunit.moduleFor)('service:fd-current-project-context', 'Unit | Service | fd current project context', {
    needs: ['model:fd-dev-system', 'model:fd-stage', 'model:fd-diagram', 'model:fd-diagram-link', 'model:fd-filelink', 'service:syncer'],

    beforeEach: function beforeEach() {
      Ember.getOwner(this).unregister('service:store');
      Ember.getOwner(this).unregister('model:fd-dev-system');
      this.register('service:store', storeStub);
      this.register('model:fd-dev-system', fdDevSystemModelStub);
    }
  });

  (0, _emberQunit.test)('it exists and works', function (assert) {
    var done = assert.async();
    assert.expect(10);

    var service = this.subject();
    assert.ok(service);

    var configuration = Ember.Object.create({ id: 'configuration' });
    var stage = Ember.Object.create({ id: 'stage' });

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
define('dummy/tests/unit/services/fd-generation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
define('dummy/tests/unit/services/fd-sheet-service-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:fd-sheet-service', 'Unit | Service | fd sheet service', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('dummy/tests/unit/transforms/new-platform-flexberry-web-designer-business-server-class-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

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
define('dummy/tests/unit/utils/fd-activity-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd activity diagram primitives');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-class-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd class diagram primitives');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-collaboration-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd collaboration diagram primitives');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-common-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd common primitives');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-containers-tree-test', ['qunit', 'ember-flexberry-designer/objects/fd-appstruct-tree', 'ember-flexberry-designer/utils/transforms-utils/fd-containers-tree'], function (_qunit, _fdAppstructTree, _fdContainersTree) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | containers tree');

  // Replace this with your real tests.
  (0, _qunit.test)('it exists', function (assert) {

    var noteNoteObjectModel1 = [_fdAppstructTree.default.create({
      className: 'ПисьмоWebL',
      description: null,
      text: 'Настройка рассылки писем',
      type: 'property',
      id: 'p2l0i2',
      url: ''
    })];

    var noteNoteObjectModel2 = [_fdAppstructTree.default.create({
      className: 'ЖурналИмпортаWebL',
      description: null,
      text: 'Журнал импорта',
      type: 'property',
      id: 'p2l0i3',
      url: ''
    })];

    var noteObjectModel1 = [_fdAppstructTree.default.create({
      text: 'Настройки',
      type: 'folder',
      children: [],
      id: 'p1l0i1'
    }), _fdAppstructTree.default.create({
      text: 'Рассылка по e-mail',
      type: 'folder',
      children: noteNoteObjectModel1,
      id: 'p1l1i2'
    }), _fdAppstructTree.default.create({
      text: 'Импорт данных',
      type: 'folder',
      children: noteNoteObjectModel2,
      id: 'p1l2i3'
    })];

    var noteObjectModel2 = [_fdAppstructTree.default.create({
      className: 'УчетРабочегоВремениWebL',
      description: 'test',
      text: 'Учет рабочего времени',
      type: 'property',
      id: 'p1l0i4',
      url: ''
    }), _fdAppstructTree.default.create({
      className: 'ПроизводственныйКалендарьWebL',
      description: null,
      text: 'Производственный календарь',
      type: 'property',
      id: 'p1l1i5',
      url: ''
    }), _fdAppstructTree.default.create({
      className: null,
      description: null,
      text: 'Test',
      type: 'property',
      id: 'p1l2i6',
      url: 'Test'
    })];

    var objectModel = [_fdAppstructTree.default.create({
      text: 'Администрирование',
      type: 'folder',
      children: noteObjectModel1,
      id: 'p0l0i0'
    }), _fdAppstructTree.default.create({
      text: 'Поручения',
      type: 'folder',
      children: noteObjectModel2,
      id: 'p0l1i4'
    })];

    var jstreeData = {
      p2l0i2: { id: 'p2l0i2', children: [], original: { text: 'Настройка рассылки писем', type: 'property', className: 'ПисьмоWebL', description: null, url: '' } },
      p2l0i3: { id: 'p2l0i3', children: [], original: { text: 'Журнал импорта', type: 'property', className: 'ЖурналИмпортаWebL', description: null, url: '' } },
      p1l0i1: { id: 'p1l0i1', children: [], original: { text: 'Настройки', type: 'folder' } },
      p1l1i2: { id: 'p1l1i2', children: ['p2l0i2'], original: { text: 'Рассылка по e-mail', type: 'folder' } },
      p1l2i3: { id: 'p1l2i3', children: ['p2l0i3'], original: { text: 'Импорт данных', type: 'folder' } },
      p1l0i4: { id: 'p1l0i4', children: [], original: { text: 'Учет рабочего времени', type: 'property', className: 'УчетРабочегоВремениWebL', description: 'test', url: '' } },
      p1l1i5: { id: 'p1l1i5', children: [], original: { text: 'Производственный календарь', type: 'property', className: 'ПроизводственныйКалендарьWebL', description: null, url: '' } },
      p1l2i6: { id: 'p1l2i6', children: [], original: { text: 'Test', type: 'property', className: null, description: null, url: 'Test' } },
      p0l0i0: { id: 'p0l0i0', children: ['p1l0i1', 'p1l1i2', 'p1l2i3'], original: { text: 'Администрирование', type: 'folder' } },
      p0l1i4: { id: 'p0l1i4', children: ['p1l0i4', 'p1l1i5', 'p1l2i6'], original: { text: 'Поручения', type: 'folder' } }
    };

    var xml = '' + '<Containers>' + '<ContainersList>' + '<Item ClassName="##########" MenuPath="Администрирование" Caption="" Description="" Url="" />' + '<Item ClassName="##########" MenuPath="Администрирование\\Настройки" Caption="" Description="" Url="" />' + '<Item ClassName="ПисьмоWebL" MenuPath="Администрирование\\Рассылка по e-mail" Caption="Настройка рассылки писем" Description="" Url="" />' + '<Item ClassName="ЖурналИмпортаWebL" MenuPath="Администрирование\\Импорт данных" Caption="Журнал импорта" Description="" Url="" />' + '<Item ClassName="УчетРабочегоВремениWebL" MenuPath="Поручения" Caption="Учет рабочего времени" Description="test" Url="" />' + '<Item ClassName="ПроизводственныйКалендарьWebL" MenuPath="Поручения" Caption="Производственный календарь" Description="" Url="" />' + '<Item ClassName="" MenuPath="Поручения" Caption="Test" Description="" Url="Test" />' + '</ContainersList>' + '</Containers>';

    var deserializeResult = (0, _fdContainersTree.deserialize)(xml);
    assert.deepEqual(deserializeResult, objectModel, 'ConteinersTree deserialize does not work');

    var serializeResult = (0, _fdContainersTree.serialize)(deserializeResult, jstreeData);
    assert.equal(serializeResult, xml, 'ConteinersTree serialize does not work');
  });
});
define('dummy/tests/unit/utils/fd-definition-test', ['qunit', 'ember-flexberry-designer/objects/fd-view-attributes-property', 'ember-flexberry-designer/objects/fd-view-attributes-master', 'ember-flexberry-designer/objects/fd-view-attributes-detail', 'ember-flexberry-designer/utils/transforms-utils/fd-definition'], function (_qunit, _fdViewAttributesProperty, _fdViewAttributesMaster, _fdViewAttributesDetail, _fdDefinition) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd definition');

  (0, _qunit.test)('it exists', function (assert) {

    var objectModel = Ember.A([_fdViewAttributesProperty.default.create({
      name: 'TestProperty',
      caption: 'Test Property',
      path: 'pathTestProperty',
      visible: false
    }), _fdViewAttributesMaster.default.create({
      name: 'TestMaster',
      caption: 'Test Master',
      path: 'pathTestMaster',
      visible: true,
      lookupType: 'standard',
      masterPropertyName: 'TestMasterName',
      masterCustomizationString: ''
    }), _fdViewAttributesDetail.default.create({
      name: 'TestDetail',
      detailViewName: 'TestDetailD',
      loadOnLoadAgregator: false,
      path: '',
      caption: 'Test Detail',
      visible: true
    })]);

    var xml = '' + '<View>' + '<ViewPropertiesList>' + '<Item PropertyName="TestProperty" Caption="Test Property" Path="pathTestProperty" Visible="False"' + ' IsMaster="False" LookupType="default" MasterPropertyName="" MasterCustomizationString="" />' + '<Item PropertyName="TestMaster" Caption="Test Master" Path="pathTestMaster" Visible="True"' + ' IsMaster="True" LookupType="standard" MasterPropertyName="TestMasterName" MasterCustomizationString="" />' + '</ViewPropertiesList>' + '<ViewDetailsList>' + '<Item DetailName="TestDetail" DetailViewName="TestDetailD" LoadOnLoadAgregator="False" DetailPath="" DetailCaption="Test Detail" DetailVisible="True" />' + '</ViewDetailsList>' + '</View>';

    var deserializeResult = (0, _fdDefinition.deserialize)(xml);
    assert.deepEqual(deserializeResult, objectModel, 'Definition deserialize does not work');

    var serializeResult = (0, _fdDefinition.serialize)(deserializeResult);
    assert.equal(serializeResult, xml, 'Definition serialize does not work');
  });
});
define('dummy/tests/unit/utils/fd-deployment-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd deployment diagram primitives');

  // Replace this with your real tests.
  // import fdDeploymentDiagramPrimitives from 'dummy/utils/fd-deployment-diagram-primitives';
  (0, _qunit.test)('it works', function (assert) {
    // let result = fdDeploymentDiagramPrimitives();
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-preload-stage-metadata-test', ['qunit', 'dummy/tests/helpers/start-app'], function (_qunit, _startApp) {
  'use strict';

  //import fdPreloadStageMetadata from 'dummy/utils/fd-preload-stage-metadata';
  var App = void 0;

  (0, _qunit.module)('Unit | Utility | fd preload stage metadata', {
    beforeEach: function beforeEach() {
      App = (0, _startApp.default)();
    },
    afterEach: function afterEach() {
      Ember.run(App, 'destroy');
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    // For test need beckend.
    /*
    let store = App.__container__.lookup('service:store');
     let result = fdPreloadStageMetadata(store, '00000000-0000-0000-0000-000000000000');
    assert.ok(result);*/
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-sequence-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd sequence diagram primitives');

  // Replace this with your real tests.
  /*import fdSequenceDiagramPrimitives from 'dummy/utils/fd-sequence-diagram-primitives';*/
  (0, _qunit.test)('it works', function (assert) {
    /*let result = fdSequenceDiagramPrimitives();*/
    var result = true;
    assert.ok(result);
  });
});
define('dummy/tests/unit/utils/fd-statechart-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd statechart diagram primitives');

  // Replace this with your real tests.
  // import fdStatechartDiagramPrimitives from 'dummy/utils/fd-statechart-diagram-primitives';
  (0, _qunit.test)('it works', function (assert) {
    // let result = fdStatechartDiagramPrimitives();
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-storeinstancesintype-test', ['qunit', 'ember-flexberry-designer/objects/fd-storeinstancesintype', 'ember-flexberry-designer/utils/transforms-utils/fd-storeinstancesintype'], function (_qunit, _fdStoreinstancesintype, _fdStoreinstancesintype2) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd storeinstancesintype');

  (0, _qunit.test)('it exists', function (assert) {

    var objectModel = Ember.A([_fdStoreinstancesintype.default.create({
      dataService: 'dataService1',
      data: 'data1'
    }), _fdStoreinstancesintype.default.create({
      dataService: 'dataService2',
      data: 'data2'
    }), _fdStoreinstancesintype.default.create({
      dataService: 'dataService3',
      data: 'data3'
    })]);

    var xml = '' + '<DataSourceCustomizerList>' + '<Item DataService="dataService1" data="data1" />' + '<Item DataService="dataService2" data="data2" />' + '<Item DataService="dataService3" data="data3" />' + '</DataSourceCustomizerList>';

    assert.deepEqual((0, _fdStoreinstancesintype2.deserialize)(xml), objectModel, 'The \'deserialize\' function is OK.');
    assert.equal((0, _fdStoreinstancesintype2.serialize)(objectModel), xml, 'The \'serialize\' function is OK.');
  });
});
define('dummy/tests/unit/utils/fd-type-map-functions-test', ['qunit', 'ember-flexberry-designer/utils/transforms-utils/fd-type-map-functions'], function (_qunit, _fdTypeMapFunctions) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd-type-map-functions');

  (0, _qunit.test)('it works', function (assert) {
    var deserialized = [{ name: 'bool', value: 'System.Boolean', assemblyDll: '' }];
    var serialized = '<TypeMap><bool value="System.Boolean" assemblydll="" /></TypeMap>';

    assert.deepEqual((0, _fdTypeMapFunctions.deserialize)(serialized), deserialized, 'The \'deserialize\' function is OK.');
    assert.equal((0, _fdTypeMapFunctions.serialize)(deserialized), serialized, 'The \'serialize\' function is OK.');
  });
});
define('dummy/tests/unit/utils/fd-update-class-diagram-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd update class diagram');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-usecase-diagram-primitives-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd usecase diagram primitives');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/fd-view-path-functions-test', ['qunit', 'ember-flexberry-designer/utils/fd-view-path-functions', 'ember-flexberry-designer/objects/fd-view-attributes-property', 'ember-flexberry-designer/objects/fd-editform-row', 'ember-flexberry-designer/objects/fd-editform-control', 'ember-flexberry-designer/objects/fd-editform-group', 'ember-flexberry-designer/objects/fd-editform-tabgroup', 'ember-flexberry-designer/objects/fd-editform-tab'], function (_qunit, _fdViewPathFunctions, _fdViewAttributesProperty, _fdEditformRow, _fdEditformControl, _fdEditformGroup, _fdEditformTabgroup, _fdEditformTab) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | fd-view-path-functions');

  (0, _qunit.test)('it works', function (assert) {
    var definition = Ember.A([_fdViewAttributesProperty.default.create({ caption: 'Control' }), _fdViewAttributesProperty.default.create({ caption: 'Control #1', path: '#1' }), _fdViewAttributesProperty.default.create({ caption: 'Control #2', path: '#2' }), _fdViewAttributesProperty.default.create({ caption: 'Control', path: '-Group' }), _fdViewAttributesProperty.default.create({ caption: 'Control', path: '|Tab #1' }), _fdViewAttributesProperty.default.create({ caption: 'Control', path: '|Tab #2' }), _fdViewAttributesProperty.default.create({ caption: 'Control', path: '|Tab #2\\-Group' })]);

    var controlsTree = Ember.A([_fdEditformRow.default.create({
      controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control', propertyDefinition: definition.objectAt(0) })])
    }), _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control #1', propertyDefinition: definition.objectAt(1) }), _fdEditformControl.default.create({ caption: 'Control #2', propertyDefinition: definition.objectAt(2) })])
    }), _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformGroup.default.create({
        caption: 'Group',
        rows: Ember.A([_fdEditformRow.default.create({
          controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control', propertyDefinition: definition.objectAt(3) })])
        })])
      })])
    }), _fdEditformRow.default.create({
      controls: Ember.A([_fdEditformTabgroup.default.create({
        tabs: Ember.A([_fdEditformTab.default.create({
          caption: 'Tab #1',
          rows: Ember.A([_fdEditformRow.default.create({
            controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control', propertyDefinition: definition.objectAt(4) })])
          })])
        }), _fdEditformTab.default.create({
          caption: 'Tab #2',
          rows: Ember.A([_fdEditformRow.default.create({
            controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control', propertyDefinition: definition.objectAt(5) })])
          }), _fdEditformRow.default.create({
            controls: Ember.A([_fdEditformGroup.default.create({
              caption: 'Group',
              rows: Ember.A([_fdEditformRow.default.create({
                controls: Ember.A([_fdEditformControl.default.create({ caption: 'Control', propertyDefinition: definition.objectAt(6) })])
              })])
            })])
          })])
        })])
      })])
    })]);

    var testTree = Ember.A();
    var length = definition.get('length');
    for (var i = 0; i < length; i++) {
      var propertyDefinition = definition.objectAt(i);
      var caption = propertyDefinition.get('caption');
      var path = propertyDefinition.get('path');

      (0, _fdViewPathFunctions.locateControlByPath)(testTree, _fdEditformControl.default.create({ caption: caption, propertyDefinition: propertyDefinition }), path);
    }

    assert.deepEqual(testTree, controlsTree, 'The \'locateControlByPath\' function is OK.');
    assert.deepEqual((0, _fdViewPathFunctions.controlsToDefinition)(controlsTree), definition, 'The \'controlsToDefinition\' function is OK.');
  });
});
define('dummy/tests/unit/utils/get-json-for-diagram-test', ['qunit'], function (_qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | get json for diagram');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    assert.ok(true);
  });
});
define('dummy/tests/unit/utils/model-has-changes-test', ['dummy/utils/model-has-changes', 'qunit'], function (_modelHasChanges, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | model-has-changes', function () {

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      var result = (0, _modelHasChanges.default)() === false;
      assert.ok(result);
    });
  });
});
define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
