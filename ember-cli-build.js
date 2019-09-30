'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    lessOptions: {
      paths: [
        'bower_components/semantic-ui'
      ]
    },
    outputPaths: {
      app: {
        css: {
          'app': '/assets/light.css',
          'dark': '/assets/dark.css',
          'blue': '/assets/blue.css'
        }
      }
    },

    SemanticUI: {
      css: false
    },

    fingerprint: {
      exclude: ['light', 'dark', 'blue'],
    }

    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('vendor/font-icon.css');
  app.import('vendor/fd-icons.css');
  app.import('vendor/joint.core.css');

  app.import('vendor/fonts/icons.eot', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/icons.otf', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/icons.svg', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/icons.ttf', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/icons.woff', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/icons.woff2', { destDir: 'assets/fonts' });

  app.import('vendor/fonts/fd-icons.eot', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/fd-icons.ttf', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/fd-icons.woff', { destDir: 'assets/fonts' });
  app.import('vendor/fonts/fd-icons.woff2', { destDir: 'assets/fonts' });

  return app.toTree();
};
