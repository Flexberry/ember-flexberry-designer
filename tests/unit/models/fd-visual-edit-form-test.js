import { moduleForModel, test } from 'ember-qunit';

moduleForModel('fd-visual-edit-form', 'Unit | Model | fd visual edit form', {
  // Specify the other units that are required for this test.
  needs: [
    'model:fd-visual-edit-control',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
