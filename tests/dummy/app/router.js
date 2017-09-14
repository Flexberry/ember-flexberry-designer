import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('new-platform-flexberry-web-designer-association-list-form');
  this.route('new-platform-flexberry-web-designer-association-edit-form',
  { path: 'new-platform-flexberry-web-designer-association-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-association-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-association-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-class-list-form');
  this.route('new-platform-flexberry-web-designer-class-edit-form',
  { path: 'new-platform-flexberry-web-designer-class-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-class-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-class-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-diagram-list-form');
  this.route('new-platform-flexberry-web-designer-diagram-edit-form',
  { path: 'new-platform-flexberry-web-designer-diagram-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-diagram-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-diagram-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-inheritance-list-form');
  this.route('new-platform-flexberry-web-designer-inheritance-edit-form',
  { path: 'new-platform-flexberry-web-designer-inheritance-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-inheritance-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-inheritance-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-stage-list-form');
  this.route('new-platform-flexberry-web-designer-stage-edit-form',
  { path: 'new-platform-flexberry-web-designer-stage-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-stage-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-stage-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-system-list-form');
  this.route('new-platform-flexberry-web-designer-system-edit-form',
  { path: 'new-platform-flexberry-web-designer-system-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-system-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-system-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-view-list-form');
  this.route('new-platform-flexberry-web-designer-view-edit-form',
  { path: 'new-platform-flexberry-web-designer-view-edit-form/:id' });
  this.route('new-platform-flexberry-web-designer-view-edit-form.new',
  { path: 'new-platform-flexberry-web-designer-view-edit-form/new' });
  this.route('new-platform-flexberry-web-designer-visual-edit-form',
  { path: 'new-platform-flexberry-web-designer-visual-edit-form' });
});

export default Router;
