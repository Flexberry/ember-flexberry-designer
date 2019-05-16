import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import './models/custom-inflector-rules';
import fdPreloadStageMetadata from './utils/fd-preload-stage-metadata';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  ready: function() {
    let currentContext = this.__container__.lookup('service:fd-current-project-context');
    let stagePk = currentContext.get('singleStageMode') ? currentContext.get('context.stage') : undefined;

    if (stagePk) {
      let store = this.__container__.lookup('service:store');
      fdPreloadStageMetadata(store, stagePk);
    }
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
