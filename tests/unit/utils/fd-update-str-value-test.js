import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import { updateObjectByStr, updateStrByObjects, updateLinkByStr, updateStrByLink } from 'ember-flexberry-designer/utils/fd-update-str-value';
import RepositoryAccessModifier  from 'ember-flexberry-designer/enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

let App;
module('Unit | Utility | fd update str value', {
  beforeEach() {
    App = startApp();
  },

  afterEach() {
    run(App, 'destroy');
  },
});

test('updateStrByObjects name', function(assert) {
  run(() => {
    const testName = 'testName';
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      stereotype: '«implementation»'
    });

    cls.set('name', testName);

    assert.equal(cls.get('nameStr'), '');

    updateStrByObjects(cls);

    assert.equal(cls.get('nameStr'), testName);
  });
});

test('updateStrByObjects implementation attributes', function(assert) {
  run(() => {
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      name: 'test',
      stereotype: '«implementation»'
    });

    store.createRecord('fd-dev-attribute', {
      accessModifier: RepositoryAccessModifier.Public,
      name: 'testName1',
      type: 'bool',
      stored: true,
      defaultValue: 'false',
      class: cls
    });

    store.createRecord('fd-dev-attribute', {
      accessModifier: RepositoryAccessModifier.Private,
      name: 'testName2',
      type: 'string',
      stored: false,
      defaultValue: '',
      class: cls
    });

    assert.equal(cls.get('attributesStr'), '');

    updateStrByObjects(cls);

    assert.equal(cls.get('attributesStr'), '+testName1:bool=false\n/-testName2:string');
  });
});

test('updateStrByObjects implementation methods', function(assert) {
  run(() => {
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      name: 'test',
      stereotype: '«implementation»'
    });

    store.createRecord('fd-dev-method', {
      accessModifier: RepositoryAccessModifier.Public,
      parametersStr: 'a:string',
      typeParametersStr: '',
      isEvent: true,
      name: 'testName1',
      type: 'bool',
      class: cls
    });

    store.createRecord('fd-dev-method', {
      accessModifier: RepositoryAccessModifier.Protected,
      parametersStr: 'a:int, b:bool',
      typeParametersStr: 'string',
      isEvent: false,
      name: 'testName2',
      type: 'string',
      class: cls
    });

    assert.equal(cls.get('methodsStr'), '');

    updateStrByObjects(cls);

    assert.equal(cls.get('methodsStr'), '/+testName1(a:string):bool\n#testName2<string>(a:int, b:bool):string');
  });
});

test('updateStrByObjects enumeration', function(assert) {
  run(() => {
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      name: 'test',
      stereotype: '«enumeration»'
    });

    store.createRecord('fd-dev-attribute', {
      accessModifier: RepositoryAccessModifier.Public,
      name: 'testName1',
      type: 'bool',
      stored: true,
      defaultValue: 'false',
      class: cls
    });

    store.createRecord('fd-dev-attribute', {
      accessModifier: RepositoryAccessModifier.Private,
      name: 'testName2',
      type: 'string',
      stored: false,
      defaultValue: '',
      class: cls
    });

    assert.equal(cls.get('attributesStr'), '');

    updateStrByObjects(cls);

    assert.equal(cls.get('attributesStr'), 'testName1=false\ntestName2');
  });
});

test('updateObjectByStr implementation attributes', function(assert) {
  run(() => {
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      stereotype: '«implementation»'
    });

    cls.set('attributesStr', '+testName1:bool=false\n/-testName2:string');

    assert.equal(cls.get('attributes').length, 0);

    updateObjectByStr(cls, store);

    assert.equal(cls.get('attributes').length, 2);
    assert.equal(cls.get('attributes.firstObject.name'), 'testName1');
    assert.equal(cls.get('attributes.firstObject.type'), 'bool');
    assert.equal(cls.get('attributes.firstObject.stored'), true);
    assert.equal(cls.get('attributes.firstObject.defaultValue'), 'false');
    assert.equal(cls.get('attributes.firstObject.accessModifier'), RepositoryAccessModifier.Public);

    assert.equal(cls.get('attributes.lastObject.name'), 'testName2');
    assert.equal(cls.get('attributes.lastObject.type'), 'string');
    assert.equal(cls.get('attributes.lastObject.stored'), false);
    assert.equal(cls.get('attributes.lastObject.defaultValue'), null);
    assert.equal(cls.get('attributes.lastObject.accessModifier'), RepositoryAccessModifier.Private);
  });
});

test('updateObjectByStr implementation methods', function(assert) {
  run(() => {
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      stereotype: '«implementation»'
    });

    cls.set('methodsStr', '/+testName1(a:string):bool\n#testName2<string>(a:int):string');

    assert.equal(cls.get('methods').length, 0);

    updateObjectByStr(cls, store);

    assert.equal(cls.get('methods').length, 2);
    assert.equal(cls.get('methods.firstObject.name'), 'testName1');
    assert.equal(cls.get('methods.firstObject.type'), 'bool');
    assert.equal(cls.get('methods.firstObject.isEvent'), true);
    assert.equal(cls.get('methods.firstObject.parametersStr'), 'a:string');
    assert.equal(cls.get('methods.firstObject.typeParametersStr'), '');
    assert.equal(cls.get('methods.firstObject.accessModifier'), RepositoryAccessModifier.Public);

    assert.equal(cls.get('methods.lastObject.name'), 'testName2');
    assert.equal(cls.get('methods.lastObject.type'), 'string');
    assert.equal(cls.get('methods.lastObject.isEvent'), false);
    assert.equal(cls.get('methods.lastObject.parametersStr'), 'a:int');
    assert.equal(cls.get('methods.lastObject.typeParametersStr'), 'string');
    assert.equal(cls.get('methods.lastObject.accessModifier'), RepositoryAccessModifier.Protected);
  });
});

test('updateObjectByStr enumeration', function(assert) {
  run(() => {
    let store = App.__container__.lookup('service:store');
    let cls = store.createRecord('fd-dev-class', {
      stereotype: '«enumeration»'
    });

    cls.set('attributesStr', 'testName1=false\ntestName2');

    assert.equal(cls.get('attributes').length, 0);

    updateObjectByStr(cls, store);

    assert.equal(cls.get('attributes').length, 2);
    assert.equal(cls.get('attributes.firstObject.name'), 'testName1');
    assert.equal(cls.get('attributes.firstObject.defaultValue'), 'false');

    assert.equal(cls.get('attributes.lastObject.name'), 'testName2');
  });
});

test('updateLinkByStr association', function(assert) {
  run(() => {
    const testStartRoleName = 'TestStartRoleName';
    const testEndRoleName = 'TestEndRoleName';
    let store = App.__container__.lookup('service:store');
    let association = store.createRecord('fd-dev-association');
    association.set('startRoleStr', `${testStartRoleName}`);
    association.set('endRoleStr', `+${testEndRoleName}`);

    assert.equal(association.get('startRole'), '');
    assert.equal(association.get('endRole'), '');

    updateLinkByStr(association);

    assert.equal(association.get('startRole'), testStartRoleName);
    assert.equal(association.get('endRole'), testEndRoleName);
  });
});

test('updateLinkByStr aggregation', function(assert) {
  run(() => {
    const testStartRoleName = 'TestStartRoleName';
    const testEndRoleName = 'TestEndRoleName';
    let store = App.__container__.lookup('service:store');
    let association = store.createRecord('fd-dev-aggregation');
    association.set('startRoleStr', `-${testStartRoleName}`);
    association.set('endRoleStr', `${testEndRoleName}`);

    assert.equal(association.get('startRole'), '');
    assert.equal(association.get('endRole'), '');

    updateLinkByStr(association);

    assert.equal(association.get('startRole'), testStartRoleName);
    assert.equal(association.get('endRole'), testEndRoleName);
  });
});

test('updateStrByLink association', function(assert) {
  run(() => {
    const testStartRoleName = 'TestStartRoleName';
    const testEndRoleName = 'TestEndRoleName';
    let store = App.__container__.lookup('service:store');
    let association = store.createRecord('fd-dev-association');
    association.set('startRoleAccessModifier', RepositoryAccessModifier.Private);
    association.set('startRole', `#${testStartRoleName}`);
    association.set('endRole', `${testEndRoleName}`);

    assert.equal(association.get('startRoleStr'), undefined);
    assert.equal(association.get('endRoleStr'), undefined);

    updateStrByLink(association);

    assert.equal(association.get('startRoleStr'), `-${testStartRoleName}`);
    assert.equal(association.get('endRoleStr'), `+${testEndRoleName}`);
  });
});

test('updateStrByLink aggregation', function(assert) {
  run(() => {
    const testStartRoleName = 'TestStartRoleName';
    const testEndRoleName = 'TestEndRoleName';
    let store = App.__container__.lookup('service:store');
    let association = store.createRecord('fd-dev-aggregation');
    association.set('startRole', `#${testStartRoleName}`);
    association.set('endRole', `${testEndRoleName}`);
    association.set('endRoleAccessModifier', RepositoryAccessModifier.Protected);

    assert.equal(association.get('startRoleStr'), undefined);
    assert.equal(association.get('endRoleStr'), undefined);

    updateStrByLink(association);

    assert.equal(association.get('startRoleStr'), `+${testStartRoleName}`);
    assert.equal(association.get('endRoleStr'), `#${testEndRoleName}`);
  });
});
