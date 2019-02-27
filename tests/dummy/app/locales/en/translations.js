import Ember from 'ember';
import EmberFlexberryDesignerTranslations from 'ember-flexberry-designer/locales/en/translations';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryDesignerTranslations);

Ember.$.extend(true, translations, {

  'application-name': '',

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
        },
        'copyright': 'Copyright © New platform Ltd. 2018',
        'copyright-version': {
          title: 'Copyright © New platform Ltd. 2018'
        },
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
        'fd-visual-edit-form': {
          caption: 'Visual edit form',
          title: ''
        },
        root: {
          caption: 'root',
          title: 'root',

          'fd-appstruct-form': {
            caption: 'Application structure',
            title: '',
          },

          'fd-listform-constructor': {
            caption: 'List form constructor',
            title: '',
          },

          'fd-configuration-list-form': {
            caption: 'fd-configuration-list-form',
            title: 'fd-configuration-list-form',

          },
          'fd-stage-list-form': {
            caption: 'fd-stage-list-form',
            title: 'fd-stage-list-form',
          },
          'additional': {
            caption: 'Additional',
            title: '',
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
          'fd-aggregation-list-form': {
            caption: 'fd-aggregation-list-form',
            title: 'fd-aggregation-list-form',

          },
          'fd-inheritance-list-form': {
            caption: 'fd-inheritance-list-form',
            title: 'fd-inheritance-list-form',

          },
          'fd-view-list-form': {
            caption: 'fd-view-list-form',
            title: 'fd-view-list-form',

          },
          'fd-generation-process-form': {
            caption: 'Generation',
            title: '',
          },
          'fd-generation-list-form': {
            caption: 'Generations list form',
            title: '',
          },
          'fd-uml-primitives': {
            caption: 'UML',
            title: '',
          },
          'class-diagram-primitives-demo': {
            caption: 'Class Diagram',
            title: '',
          },
          'activity-diagram-primitives-demo': {
            caption: 'Activity Diagram',
            title: '',
          },
          'deployment-diagram-primitives-demo': {
            caption: 'Deployment Diagram',
            title: '',
          },
          'statechart-diagram-primitives-demo': {
            caption: 'Statechart Diagram',
            title: '',
          },
          'usecase-diagram-primitives-demo': {
            caption: 'Usecase Diagram',
            title: '',
          },
          'sequence-diagram-primitives-demo': {
            caption: 'Sequence Diagram',
            title: '',
          },
          'collaboration-diagram-primitives-demo': {
            caption: 'Collaboration Diagram',
            title: '',
          },
          'fd-data-types-map': {
            caption: 'Data types map',
            title: '',
          },
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
