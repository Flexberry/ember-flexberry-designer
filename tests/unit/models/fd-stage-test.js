import { moduleForModel, test } from 'ember-qunit';

moduleForModel('fd-stage', 'Unit | Model | fd-stage', {
  // Specify the other units that are required for this test.
  needs: [
    'model:fd-ad',
    'model:fd-aggregation',
    'model:fd-association',
    'model:fd-base-association',
    'model:fd-cad',
    'model:fd-case-property',
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
    'model:fd-form-control',
    'model:fd-form-view',
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
    'model:fd-subsystem',
    'model:fd-ucd',
    'model:fd-view'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();

  // let store = this.store();
  assert.ok(!!model);
});
