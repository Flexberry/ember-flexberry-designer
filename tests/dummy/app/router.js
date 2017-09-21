import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('fd-association-list-form');
  this.route('fd-association-edit-form',
  { path: 'fd-association-edit-form/:id' });
  this.route('fd-association-edit-form.new',
  { path: 'fd-association-edit-form/new' });
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
  this.route('fd-inheritance-list-form');
  this.route('fd-inheritance-edit-form',
  { path: 'fd-inheritance-edit-form/:id' });
  this.route('fd-inheritance-edit-form.new',
  { path: 'fd-inheritance-edit-form/new' });
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
  this.route('fd-view-list-form');
  this.route('fd-view-edit-form',
  { path: 'fd-view-edit-form/:id' });
  this.route('fd-view-edit-form.new',
  { path: 'fd-view-edit-form/new' });
  this.route('fd-visual-edit-form',
  { path: 'fd-visual-edit-form' });
  this.route('fd-generation-process-form');
});

export default Router;
