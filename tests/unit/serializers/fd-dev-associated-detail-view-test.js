import { moduleForModel, test } from 'ember-qunit';

moduleForModel('fd-dev-associated-detail-view', 'Unit | Serializer | fd-dev-associated-detail-view', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:fd-dev-associated-detail-view',
    'transform:file',
    'transform:decimal',
    'transform:guid',

    'transform:i-c-s-soft-s-t-o-r-m-n-e-t-access-type',
    'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode',
    'transform:i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events',
    'transform:new-platform-flexberry-web-designer-access-mode',
    'transform:new-platform-flexberry-web-designer-generation-state',
    'transform:s-t-o-r-m-c-a-s-e-repository-access-modifier',
    'transform:s-t-o-r-m-c-a-s-e-s-t-o-r-m-n-e-t-repository-parameter-modifier',

    'transform:new-platform-flexberry-web-designer-business-server-class',

    'model:fd-ad',
    'model:fd-aggregation',
    'model:fd-application-user',
    'model:fd-association',
    'model:fd-auth-type',
    'model:fd-base-association',
    'model:fd-cad',
    'model:fd-case-property',
    'model:fd-class-storage-type',
    'model:fd-class',
    'model:fd-cod',
    'model:fd-configuration',
    'model:fd-dev-aggregation',
    'model:fd-dev-associated-detail-view',
    'model:fd-dev-association',
    'model:fd-dev-attribute',
    'model:fd-dev-base-association',
    'model:fd-dev-class',
    'model:fd-dev-control-type',
    'model:fd-dev-diagram-link',
    'model:fd-dev-filelink',
    'model:fd-dev-form-control',
    'model:fd-dev-form-view',
    'model:fd-dev-inheritance',
    'model:fd-dev-method',
    'model:fd-dev-module-setting-type',
    'model:fd-dev-module-setting',
    'model:fd-dev-parameter',
    'model:fd-dev-process-status',
    'model:fd-dev-stage-history',
    'model:fd-dev-stage',
    'model:fd-dev-system',
    'model:fd-dev-task',
    'model:fd-dev-type-definition',
    'model:fd-dev-uml-ad',
    'model:fd-dev-uml-cad',
    'model:fd-dev-uml-cod',
    'model:fd-dev-uml-dpd',
    'model:fd-dev-uml-sd',
    'model:fd-dev-uml-std',
    'model:fd-dev-uml-ucd',
    'model:fd-dev-view',
    'model:fd-diagram-link',
    'model:fd-diagram',
    'model:fd-dpd',
    'model:fd-filelink',
    'model:fd-following',
    'model:fd-form-control',
    'model:fd-form-view',
    'model:fd-generation-step-log',
    'model:fd-generation',
    'model:fd-inheritance',
    'model:fd-object-in-system',
    'model:fd-plugin-on-rep-object',
    'model:fd-project',
    'model:fd-registered-plug-in',
    'model:fd-repository-browser-data-object-with-a-c-l',
    'model:fd-repository-browser-data-object',
    'model:fd-repository-data-object',
    'model:fd-repository-object-with-plugins',
    'model:fd-repository-ref-data-object',
    'model:fd-repository',
    'model:fd-sd',
    'model:fd-stage',
    'model:fd-std',
    'model:fd-storage-type',
    'model:fd-subsystem',
    'model:fd-ucd',
    'model:fd-user-auth-profile',
    'model:fd-user-in-stage',
    'model:fd-view',
    'model:i-c-s-soft-s-t-o-r-m-n-e-t-security-agent'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
