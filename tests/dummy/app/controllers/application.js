import Ember from 'ember';

export default Ember.Controller.extend({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  clazz: undefined,

  sitemap: Ember.computed('i18n.locale', 'currentContext.context.configuration', 'currentContext.context.stage', 'clazz', function() {
    let i18n = this.get('i18n');
    let context = this.get('currentContext.context');
    let singleStageMode = this.get('currentContext.singleStageMode');

    let sitemap = {
      nodes: [
      ]
    };

    if (!singleStageMode) {
      sitemap.nodes.push({
        link: 'index',
        caption: i18n.t('forms.application.sitemap.index.caption'),
        title: i18n.t('forms.application.sitemap.index.title'),
      });
      sitemap.nodes.push({
        link: 'fd-configuration-list-form',
        caption: i18n.t('forms.application.sitemap.root.fd-configuration-list-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-configuration-list-form.title'),
      });
    }

    if (context.configuration && !singleStageMode) {
      sitemap.nodes.push({
        link: 'fd-stage-list-form',
        caption: i18n.t('forms.application.sitemap.root.fd-stage-list-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-stage-list-form.title'),
      });
    }

    if (context.stage) {
      sitemap.nodes.push({
        link: 'fd-appstruct-form',
        caption: i18n.t('forms.application.sitemap.root.fd-appstruct-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-appstruct-form.title'),
      });
      sitemap.nodes.push({
        link: 'fd-generation-process-form.new',
        caption: i18n.t('forms.application.sitemap.root.fd-generation-process-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-generation-process-form.title'),
      });
      sitemap.nodes.push({
        link: null,
        caption: i18n.t('forms.application.sitemap.root.additional.caption'),
        title: i18n.t('forms.application.sitemap.root.additional.title'),
        children: [
          {
            link: 'fd-generation-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-generation-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-generation-list-form.title'),
          },
          {
            link: 'fd-system-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-system-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-system-list-form.title'),
          },
          {
            link: 'fd-diagram-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-diagram-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-diagram-list-form.title'),
          },
          {
            link: 'fd-class-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-class-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-class-list-form.title'),
          },
          {
            link: 'fd-association-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-association-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-association-list-form.title'),
          },
          {
            link: 'fd-inheritance-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-inheritance-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-inheritance-list-form.title'),
          }
        ]
      });
    }
    let clazz = this.get('clazz');

    if (!Ember.isNone(clazz)) {
      sitemap.nodes.push({
        link: 'fd-view-list-form',
        caption: i18n.t('forms.application.sitemap.root.fd-view-list-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-view-list-form.title'),
      });

      this.send('setClassInController','fd-view-list-form', clazz);
    }

    return sitemap;
  }),

  /**
    Locales supported by application.

    @property locales
    @type String[]
    @default ['ru', 'en']
  */
  locales: ['ru', 'en'],

  /**
    Handles changes in userSettingsService.isUserSettingsServiceEnabled.

    @method _userSettingsServiceChanged
    @private
  */
  _userSettingsServiceChanged: Ember.observer('userSettingsService.isUserSettingsServiceEnabled', function() {
    this.get('target.router').refresh();
  }),

  /**
    Initializes controller.
  */
  init() {
    this._super(...arguments);

    let i18n = this.get('i18n');
    if (Ember.isNone(i18n)) {
      return;
    }

    // If i18n.locale is long value like 'ru-RU', 'en-GB', ... this code will return short variant 'ru', 'en', etc.
    let shortCurrentLocale = this.get('i18n.locale').split('-')[0];
    let availableLocales = Ember.A(this.get('locales'));

    // Force current locale to be one of available,
    // if browser's current language is not supported by dummy application,
    // or if browser's current locale is long value like 'ru-RU', 'en-GB', etc.
    if (!availableLocales.contains(shortCurrentLocale)) {
      i18n.set('locale', 'en');
    } else {
      i18n.set('locale', shortCurrentLocale);
    }
  },

  /**
    Service that triggers objectlistview events.

    @property objectlistviewEventsService
    @type Service
  */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  actions: {
    toggleSidebar() {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let objectlistviewEventsService = this.get('objectlistviewEventsService');
      sidebar.sidebar({
        closable: false,
        dimPage: false,
        onHide: function() {
          Ember.$('.sidebar.icon.text-menu-show').removeClass('hidden');
          Ember.$('.sidebar.icon.text-menu-hide').addClass('hidden');
        },
        onHidden: function() {
          objectlistviewEventsService.updateWidthTrigger();
        },
        onShow: function() {
          objectlistviewEventsService.updateWidthTrigger();
        }
      }).sidebar('toggle');

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.sidebar.icon.text-menu-show').removeClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').addClass('hidden');
      } else {
        Ember.$('.sidebar.icon.text-menu-show').addClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').removeClass('hidden');
      }

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.full.height').css({ transition: 'width 0.45s ease-in-out 0s', width: '100%' });
      } else {
        Ember.$('.full.height').css({ transition: 'width 0.3s ease-in-out 0s', width: 'calc(100% - ' + sidebar.width() + 'px)' });
      }
    },

    toggleSidebarMobile() {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let objectlistviewEventsService = this.get('objectlistviewEventsService');
      sidebar.sidebar({
        onHide: function() {
          Ember.$('.sidebar.icon.text-menu-show').removeClass('hidden');
          Ember.$('.sidebar.icon.text-menu-hide').addClass('hidden');
        },
        onHidden: function() {
          objectlistviewEventsService.updateWidthTrigger();
        },
        onShow: function() {
          objectlistviewEventsService.updateWidthTrigger();
        }
      }).sidebar('toggle');

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.sidebar.icon.text-menu-show').removeClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').addClass('hidden');
        Ember.$('.bgw-opacity').addClass('hidden');
      } else {
        Ember.$('.sidebar.icon.text-menu-show').addClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').removeClass('hidden');
        Ember.$('.bgw-opacity').removeClass('hidden');
      }
    }
  }
});
