/* jshint node: true */

module.exports = function (environment) {
  var backendUrl = 'https://ember-flexberry-designer-dummy.azurewebsites.net';

  if (environment === 'development-loc') {
    // Use `ember s -e development-loc` command for local backend usage.
    backendUrl = 'http://rtc-web:2018';
  }

  var ENV = {
    repositoryName: 'ember-flexberry-designer/dummy',
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      LOG_STACKTRACE_ON_DEPRECATION: false,

      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Application name. Used in `user-settings` service.
      name: 'flexberry-designer',

      backendUrl: backendUrl,

      // It's a custom property, used to prevent duplicate backend urls in sources.
      backendUrls: {
        root: backendUrl,
        api: backendUrl + '/odata'
      },

      // Log service settings.
      log: {
        // Flag: indicates whether log service is enabled or not.
        enabled: true,

        // Flag: indicates whether to store error messages or not.
        storeErrorMessages: true,
        storeWarnMessages: false,
        storeLogMessages: true,
        storeInfoMessages: false,
        storeDebugMessages: false,
        storeDeprecationMessages: false,
        storePromiseErrors: true,
        showPromiseErrors: true,
      },

      // Options for Perforator service that can be used to calculate performance of components rendering.
      perf: {
        enabled: false,
      },

      // Lock settings.
      lock: {
        enabled: true,
        openReadOnly: true,
        unlockObject: true,
      },

      // Flag: indicates whether to use user settings service or not.
      useUserSettingsService: true,

      // Custom property with offline mode settings.
      offline: {
        dbName: 'ember-app',

        // Flag that indicates whether offline mode in application is enabled or not.
        offlineEnabled: true,

        // Flag that indicates whether to switch to offline mode when got online connection errors or not.
        modeSwitchOnErrorsEnabled: false,

        // Flag that indicates whether to sync down all work with records when online or not.
        // This let user to continue work without online connection.
        syncDownWhenOnlineEnabled: false,
      },

      // Custom property with components settings.
      components: {
        // Settings for `flexberry-file` component.
        flexberryFile: {
          // URL of file upload controller.
          uploadUrl: backendUrl + '/api/File',

          // Max file size in bytes for uploading files.
          maxUploadFileSize: null,

          // Flag: indicates whether to upload file on controllers modelPreSave event.
          uploadOnModelPreSave: true,

          // Flag: indicates whether to show upload button or not.
          showUploadButton: true,

          // Flag: indicates whether to show modal dialog on upload errors or not.
          showModalDialogOnUploadError: true,

          // Flag: indicates whether to show modal dialog on download errors or not.
          showModalDialogOnDownloadError: true,
        }
      },

      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  // Read more about CSP:
  // http://www.ember-cli.com/#content-security-policy
  // https://github.com/rwjblue/ember-cli-content-security-policy
  // http://content-security-policy.com
  ENV.contentSecurityPolicy = {
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
    'font-src': "'self' data: https://fonts.gstatic.com",
    'connect-src': "'self' " + ENV.APP.backendUrls.root
  };

  // Read more about ember-i18n: https://github.com/jamesarosen/ember-i18n.
  ENV.i18n = {
    // Should be defined to avoid ember-i18n deprecations.
    // Locale will be changed then to navigator current locale (in instance initializer).
    defaultLocale: 'ru'
  };

  // Read more about ember-moment: https://github.com/stefanpenner/ember-moment.
  // Locale will be changed then to same as ember-i18n locale (and will be changed every time when i18n locale changes).
  ENV.moment = {
    outputFormat: 'L'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  // Change paths to application assets if build has been started with the following parameters:
  // ember build --gh-pages --gh-pages-branch=<branch-to-publish-on-gh-pages>.
  if (process.argv.indexOf('--gh-pages') >= 0) {
    var branch;

    // Retrieve branch name from process arguments.
    process.argv.forEach(function (value) {
      if (value.indexOf('--gh-pages-branch=') >= 0) {
        branch = value.split('=')[1];
        return;
      }
    });

    // Change base URL to force paths to application assets be relative.
    ENV.baseURL = '/' + ENV.repositoryName + '/' + branch + '/';
    ENV.locationType = 'none';
  }

  return ENV;
};
