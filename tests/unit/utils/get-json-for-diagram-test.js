import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import { getJsonForClass, getJsonForLink } from 'ember-flexberry-designer/utils/get-json-for-diagram';
import { A } from '@ember/array';
import { run } from '@ember/runloop';

let App;
let store;

module('Unit | Utility | fd update class diagram', {
  beforeEach() {
    App = startApp();
    store = App.__container__.lookup('service:store');
  },

  afterEach() {
    run(App, 'destroy');
  },
});

test('getJsonForClass test', function(assert) {
  run(() => {
    const testClassName = 'testClass';
    const testClass = store.createRecord('fd-dev-class', { id: testClassName, name: testClassName });

    const locationX = 300;
    const locationY = 400;
    const testPrimitiveJson = getJsonForClass(testClass, { X: locationX, Y: locationY } );
    assert.equal(testPrimitiveJson.$id, `{${testClassName}}`, 'Class name is equal');
    assert.equal(testPrimitiveJson.$type, `STORMCASE.STORMNET.Repository.CADClass, STORM.NETCaseToolPlugin`, 'Class type is equal');
    assert.equal(testPrimitiveJson.Location.$type, 'System.Drawing.Point, System.Drawing', 'Class location type is equal');
    assert.equal(testPrimitiveJson.Location.X, locationX, 'Class location X-coordinate is equal');
    assert.equal(testPrimitiveJson.Location.Y, locationY, 'Class location Y-coordinate is equal');
  });
});

test('getJsonForLink test', function(assert) {
  run(() => {
    const startClassName = 'startClass';
    const endClassName = 'endClass';
    const startClass = store.createRecord('fd-dev-class', { id: startClassName, name: startClassName });
    const endClass = store.createRecord('fd-dev-class', { id: endClassName, name: endClassName});
  
    const startPrimitiveJson = getJsonForClass(startClass, { X: 300, Y: 300 } );
    const endPrimitiveJson = getJsonForClass(endClass, { X: 300, Y: 300 } );

    const linkName = 'linkNameTest';
    const startMultTxt = 'startMultTxtTest';
    const endMultTxt = 'endMultTxtTest';
    const startRoleTxt = 'startRoleTxtTest';
    const endRoleTxt = 'endRoleTxtTest';
    const linkPrimitiveJson = getJsonForLink(
      'STORMCASE.UML.cad.Association, UMLCAD',
      startPrimitiveJson.$id,
      null,
      endPrimitiveJson.$id,
      null,
      A(),
      { Name: linkName, StartMultTxt: startMultTxt, EndMultTxt: endMultTxt, StartRoleTxt: startRoleTxt, EndRoleTxt: endRoleTxt },
      { NamePos: 0.0, InitialMultiplicity: 1.0 }
    );

    assert.equal(linkPrimitiveJson.$type, 'STORMCASE.UML.cad.Association, UMLCAD', 'Link type is equal');
    assert.equal(linkPrimitiveJson.EndPrimitive.$ref , `{${endClassName}}`, 'Link EndPrimitive is equal');
    assert.equal(linkPrimitiveJson.StartPrimitive.$ref , `{${startClassName}}`, 'Link StartPrimitive is equal');
    assert.equal(linkPrimitiveJson.EndMultTxt.Text , endMultTxt, 'Link EndMultTxt is equal');
    assert.equal(linkPrimitiveJson.StartMultTxt.Text , startMultTxt, 'Link StartMultTxt is equal');
    assert.equal(linkPrimitiveJson.EndRoleTxt.Text , endRoleTxt, 'Link EndRoleTxt is equal');
    assert.equal(linkPrimitiveJson.StartRoleTxt.Text , startRoleTxt, 'Link StartRoleTxt is equal');
    assert.equal(linkPrimitiveJson.Name.Text, linkName, 'Link Name is equal');
    assert.equal(linkPrimitiveJson.Name.$type, 'STORMCASE.Primitives.TextBlock, Repository', 'Link Name type is equal');
  });
});