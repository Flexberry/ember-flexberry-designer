import Ember from 'ember';
import 'ember-flexberry-designer/utils/fd-sequence-diagram-primitives';

import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('fd-appstruct-form');

  this.route('fd-application-edit-form',
  { path: 'fd-application-edit-form/:id' });
  this.route('fd-application-edit-form.new',
  { path: 'fd-application-edit-form/new' });
  this.route('fd-association-list-form');
  this.route('fd-association-edit-form',
  { path: 'fd-association-edit-form/:id' });
  this.route('fd-association-edit-form.new',
  { path: 'fd-association-edit-form/new' });
  this.route('fd-business-server-edit-form',
  { path: 'fd-business-server-edit-form/:id' });
  this.route('fd-business-server-edit-form.new',
  { path: 'fd-business-server-edit-form/new' });
  this.route('fd-class-list-form');
  this.route('fd-class-edit-form',
  { path: 'fd-class-edit-form/:id' });
  this.route('fd-class-edit-form.new',
  { path: 'fd-class-edit-form/new' });
  this.route('fd-configuration-list-form');
  this.route('fd-configuration-edit-form',
  { path: 'fd-configuration-edit-form/:id' });
  this.route('fd-configuration-edit-form.new',
  { path: 'fd-configuration-edit-form/new' });
  this.route('fd-diagram-list-form');
  this.route('fd-diagram-edit-form',
  { path: 'fd-diagram-edit-form/:id' });
  this.route('fd-diagram-edit-form.new',
  { path: 'fd-diagram-edit-form/new' });
  this.route('fd-edit-form-edit-form',
  { path: 'fd-edit-form-edit-form/:id' });
  this.route('fd-edit-form-edit-form.new',
  { path: 'fd-edit-form-edit-form/new' });
  this.route('fd-enum-edit-form',
  { path: 'fd-enum-edit-form/:id' });
  this.route('fd-enum-edit-form.new',
  { path: 'fd-enum-edit-form/new' });
  this.route('fd-external-edit-form',
  { path: 'fd-external-edit-form/:id' });
  this.route('fd-external-edit-form.new',
  { path: 'fd-external-edit-form/new' });
  this.route('fd-inheritance-list-form');
  this.route('fd-inheritance-edit-form',
  { path: 'fd-inheritance-edit-form/:id' });
  this.route('fd-inheritance-edit-form.new',
  { path: 'fd-inheritance-edit-form/new' });
  this.route('fd-interface-edit-form',
  { path: 'fd-interface-edit-form/:id' });
  this.route('fd-interface-edit-form.new',
  { path: 'fd-interface-edit-form/new' });
  this.route('fd-list-form-edit-form',
  { path: 'fd-list-form-edit-form/:id' });
  this.route('fd-list-form-edit-form.new',
  { path: 'fd-list-form-edit-form/new' });
  this.route('fd-stage-list-form');
  this.route('fd-stage-edit-form',
  { path: 'fd-stage-edit-form/:id' });
  this.route('fd-stage-edit-form.new',
  { path: 'fd-stage-edit-form/new' });
  this.route('fd-system-list-form');
  this.route('fd-system-edit-form',
  { path: 'fd-system-edit-form/:id' });
  this.route('fd-system-edit-form.new',
  { path: 'fd-system-edit-form/new' });
  this.route('fd-type-edit-form',
  { path: 'fd-type-edit-form/:id' });
  this.route('fd-type-edit-form.new',
  { path: 'fd-type-edit-form/new' });
  this.route('fd-user-form-edit-form',
  { path: 'fd-user-form-edit-form/:id' });
  this.route('fd-user-form-edit-form.new',
  { path: 'fd-user-form-edit-form/new' });
  this.route('fd-view-list-form');
  this.route('fd-view-edit-form',
  { path: 'fd-view-edit-form/:id' });
  this.route('fd-view-edit-form.new',
  { path: 'fd-view-edit-form/new' });

  this.route('fd-visual-edit-form');
  this.route('fd-editform-constructor', { path: 'fd-editform-constructor/:id' }, function() {
    this.route('form-config-panel');
  });
  this.route('fd-editform-constructor.new',
  { path: 'fd-editform-constructor/new' });

  this.route('fd-listform-constructor');

  this.route('fd-generation-process-form.new',
  { path: 'fd-generation-process-form/new' });
  this.route('fd-generation-process-form',
  { path: 'fd-generation-process-form/:id' });
  this.route('fd-generation-list-form');
  this.route('fd-sequence-diagram-primitives-demo');
  this.route('class-diagram-primitives-demo');
  this.route('activity-diagram-primitives-demo');
  this.route('usecase-diagram-primitives-demo');
  this.route('statechart-diagram-primitives-demo');
});

export default Router;
