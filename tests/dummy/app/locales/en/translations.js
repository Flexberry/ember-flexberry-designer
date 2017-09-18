import Ember from 'ember';
import EmberFlexberryDesignerTranslations from 'ember-flexberry-designer/locales/en/translations';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryDesignerTranslations);

Ember.$.extend(true, translations, {

  'application-name': 'Application caption',

  forms: {
    loading: {
      'spinner-caption': 'Loading stuff, please have a cold beer...'
    },
    index: {
      greeting: 'Welcome to ember-flexberry test stand!'
    },

    application: {
      header: {
        menu: {
          'sitemap-button': {
            caption: '',
            title: 'Menu'
          },
          'user-settings-service-checkbox': {
            caption: 'Use service to save user settings'
          },
          'show-menu': {
            caption: 'Show menu'
          },
          'hide-menu': {
            caption: 'Hide menu'
          },
          'language-dropdown': {
            caption: 'Application language',
            placeholder: 'Choose language'
          }
        },
        login: {
          caption: 'Login'
        },
        logout: {
          caption: 'Logout'
        }
      },

      footer: {
        'application-name': 'Application caption',
        'application-version': {
          caption: 'Addon version {{version}}',
          title: 'It is version of ember-flexberry addon, which uses in this dummy application ' +
          '(npm version + commit sha). ' +
          'Click to open commit on GitHub.'
        }
      },

      sitemap: {
        'application-name': {
          caption: 'Application caption',
          title: 'Application title'
        },
        'application-version': {
          caption: 'Addon version {{version}}',
          title: 'It is version of ember-flexberry addon, which uses in this dummy application ' +
          '(npm version + commit sha). ' +
          'Click to open commit on GitHub.'
        },
        index: {
          caption: 'Home',
          title: ''
        },
        root: {
          caption: 'root',
          title: 'root',
          'fd-appstruct-list-form': {
            caption: 'Application structure',
            title: '',

          },
          'fd-stage-list-form': {
            caption: 'fd-stage-list-form',
            title: 'fd-stage-list-form',
          },
          'fd-system-list-form': {
            caption: 'fd-system-list-form',
            title: 'fd-system-list-form',

          },
          'fd-diagram-list-form': {
            caption: 'fd-diagram-list-form',
            title: 'fd-diagram-list-form',

          },
          'fd-class-list-form': {
            caption: 'fd-class-list-form',
            title: 'fd-class-list-form',

          },
          'fd-association-list-form': {
            caption: 'fd-association-list-form',
            title: 'fd-association-list-form',

          },
          'fd-inheritance-list-form': {
            caption: 'fd-inheritance-list-form',
            title: 'fd-inheritance-list-form',

          },
          'fd-view-list-form': {
            caption: 'fd-view-list-form',
            title: 'fd-view-list-form',

          }
        },
      }
    },

    'edit-form': {
      'save-success-message-caption': 'Save operation succeed',
      'save-success-message': 'Object saved',
      'save-error-message-caption': 'Save operation failed',
      'delete-success-message-caption': 'Delete operation succeed',
      'delete-success-message': 'Object deleted',
      'delete-error-message-caption': 'Delete operation failed'
    },
  },

});

export default translations;
