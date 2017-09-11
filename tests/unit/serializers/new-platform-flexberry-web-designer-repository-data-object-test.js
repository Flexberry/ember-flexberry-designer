import { moduleForModel, test } from 'ember-qunit';

moduleForModel('new-platform-flexberry-web-designer-repository-data-object', 'Unit | Serializer | new-platform-flexberry-web-designer-repository-data-object', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:new-platform-flexberry-web-designer-repository-data-object',
    'transform:file',
    'transform:decimal',

    'transform:new-platform-flexberry-web-designer-access-modifier',
    'transform:new-platform-flexberry-web-designer-access-type',
    'transform:new-platform-flexberry-web-designer-parameter-modifier',
    'transform:new-platform-flexberry-web-designer-t-write-mode',

    'transform:new-platform-flexberry-web-designer-business-server-class',

    'model:new-platform-flexberry-web-designer-a-d',
    'model:new-platform-flexberry-web-designer-aggregation',
    'model:new-platform-flexberry-web-designer-association',
    'model:new-platform-flexberry-web-designer-base-association',
    'model:new-platform-flexberry-web-designer-c-a-d',
    'model:new-platform-flexberry-web-designer-c-o-d',
    'model:new-platform-flexberry-web-designer-case-property',
    'model:new-platform-flexberry-web-designer-class',
    'model:new-platform-flexberry-web-designer-configuration',
    'model:new-platform-flexberry-web-designer-d-p-d',
    'model:new-platform-flexberry-web-designer-dev-aggregation',
    'model:new-platform-flexberry-web-designer-dev-associated-detail-view',
    'model:new-platform-flexberry-web-designer-dev-association',
    'model:new-platform-flexberry-web-designer-dev-attribute',
    'model:new-platform-flexberry-web-designer-dev-base-association',
    'model:new-platform-flexberry-web-designer-dev-class',
    'model:new-platform-flexberry-web-designer-dev-control-type',
    'model:new-platform-flexberry-web-designer-dev-diagram-link',
    'model:new-platform-flexberry-web-designer-dev-filelink',
    'model:new-platform-flexberry-web-designer-dev-form-control',
    'model:new-platform-flexberry-web-designer-dev-form-view',
    'model:new-platform-flexberry-web-designer-dev-inheritance',
    'model:new-platform-flexberry-web-designer-dev-method',
    'model:new-platform-flexberry-web-designer-dev-module-setting-type',
    'model:new-platform-flexberry-web-designer-dev-module-setting',
    'model:new-platform-flexberry-web-designer-dev-parameter',
    'model:new-platform-flexberry-web-designer-dev-process-status',
    'model:new-platform-flexberry-web-designer-dev-stage',
    'model:new-platform-flexberry-web-designer-dev-system',
    'model:new-platform-flexberry-web-designer-dev-task',
    'model:new-platform-flexberry-web-designer-dev-type-definition',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-a-d',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-c-a-d',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-c-o-d',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-d-p-d',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-s-d',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-s-t-d',
    'model:new-platform-flexberry-web-designer-dev-u-m-l-u-c-d',
    'model:new-platform-flexberry-web-designer-dev-view',
    'model:new-platform-flexberry-web-designer-diagram-link',
    'model:new-platform-flexberry-web-designer-diagram',
    'model:new-platform-flexberry-web-designer-filelink',
    'model:new-platform-flexberry-web-designer-form-control',
    'model:new-platform-flexberry-web-designer-form-view',
    'model:new-platform-flexberry-web-designer-inheritance',
    'model:new-platform-flexberry-web-designer-object-in-system',
    'model:new-platform-flexberry-web-designer-plugin-on-rep-object',
    'model:new-platform-flexberry-web-designer-project',
    'model:new-platform-flexberry-web-designer-registered-plug-in',
    'model:new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l',
    'model:new-platform-flexberry-web-designer-repository-browser-data-object',
    'model:new-platform-flexberry-web-designer-repository-data-object',
    'model:new-platform-flexberry-web-designer-repository-object-with-plugins',
    'model:new-platform-flexberry-web-designer-repository-ref-data-object',
    'model:new-platform-flexberry-web-designer-repository',
    'model:new-platform-flexberry-web-designer-s-d',
    'model:new-platform-flexberry-web-designer-s-t-d',
    'model:new-platform-flexberry-web-designer-stage',
    'model:new-platform-flexberry-web-designer-subsystem',
    'model:new-platform-flexberry-web-designer-u-c-d',
    'model:new-platform-flexberry-web-designer-view'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
