import Ember from 'ember';
import fdSheetMixin from 'ember-flexberry-designer/mixins/fd-sheet-mixin';

export default Ember.Controller.extend(fdSheetMixin, {
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  /**
    Service for managing the state of the application.
    @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  currentProjectName: Ember.computed('currentContext.context.stageModel.name', function() {
    let context = this.get('currentContext');
    let stageModel = this.get('currentContext.context.stageModel');
    let projectName = '';

    if (stageModel) {
      projectName = stageModel.get('name');
    }

    return projectName;
  }),

  sitemap: Ember.computed('i18n.locale', 'currentContext.context.configuration', 'currentContext.context.stage', function() {
    let i18n = this.get('i18n');
    let singleStageMode = this.get('currentContext.singleStageMode');

    let sitemap = {
      nodes: [
      ]
    };

    if (!singleStageMode) {
      sitemap.nodes.push({
        link: 'fd-application-model',
        caption: i18n.t('forms.application.sitemap.root.fd-application-model.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-application-model.title'),
        icon: 'icon-fd-menu'
      },
      {
        link: 'fd-diagrams',
        caption: i18n.t('forms.application.sitemap.root.fd-diagrams.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-diagrams.title'),
        icon: 'icon-fd-diagram'
      },
      {
        link: 'fd-navigation',
        caption: i18n.t('forms.application.sitemap.root.fd-navigation.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-navigation.title'),
        icon: 'icon-fd-sitemap'
      },
      {
        link: 'fd-generation',
        caption: i18n.t('forms.application.sitemap.root.fd-generation.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-generation.title'),
        icon: 'icon-fd-shipping-box'
      },
      {
        link: 'fd-setting',
        caption: i18n.t('forms.application.sitemap.root.fd-setting.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-setting.title'),
        icon: 'icon-fd-gear'
      },
      {
        link: 'fd-architecture',
        caption: i18n.t('forms.application.sitemap.root.fd-architecture.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-architecture.title'),
        icon: 'icon-fd-diagram'
      });
    }

    return sitemap;
  }),

  sitemapBottom: Ember.computed('i18n.locale', 'currentContext.context.configuration', 'currentContext.context.stage', function() {
    let i18n = this.get('i18n');
    let singleStageMode = this.get('currentContext.singleStageMode');

    let sitemap = {
      nodes: [
      ]
    };

    if (!singleStageMode) {
      sitemap.nodes.push({
        link: 'fd-all-projects',
        caption: i18n.t('forms.application.sitemap.root.fd-all-projects.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-all-projects.title'),
        icon: 'icon-fd-view'
      },
      {
        link: '',
        caption: i18n.t('forms.application.sitemap.root.fd-requests.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-requests.title'),
        icon: 'icon-fd-email'
      },
      {
        link: '',
        caption: i18n.t('forms.application.sitemap.root.fd-docs.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-docs.title'),
        icon: 'icon-fd-book'
      },
      {
        link: '',
        caption: i18n.t('forms.application.sitemap.root.fd-chat.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-chat.title'),
        icon: 'icon-fd-speech-bubble'
      });
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

  sidebarWidth: '300px',

  sidebarMiniWidth: '60px',

  actions: {

    /**
      Call `updateWidthTrigger` for `objectlistviewEventsService`.
      @method actions.updateWidth
    */
    updateWidth() {
      this.get('objectlistviewEventsService').updateWidthTrigger();
    },

    /**
      Toggles application sitemap's side bar.
      @method actions.toggleSidebar
    */
    toggleSidebar() {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      sidebar.sidebar('toggle');
      let sidebarVisible = sidebar.hasClass('visible');
      let currentSidebarWidth = sidebarVisible ? this.sidebarMiniWidth : this.sidebarWidth;
      let contentWidth = `calc(100% - ${currentSidebarWidth})`;
      if (!sidebarVisible) {
        Ember.$('.toggle-sidebar').css({ transition: 'opacity 500ms step-start' });
      } else {
        Ember.$('.toggle-sidebar').css({ transition: '' });
      }

      // Sheet content is animated only if it is expanded.
      if (Ember.$('.fd-sheet.visible').hasClass('expand')) {
        this.send('animatingSheetContent', contentWidth, 250);
      } else {

        // That the sheet remained in its place and did not go along with the content.
        let sheetTranslate = `translate3d(calc(50% - ${currentSidebarWidth}), 0, 0)`;
        Ember.$('.fd-sheet.visible').css({ 'transform': sheetTranslate });
      }

      // Animated increases the width of the page content.
      Ember.$('.full.height .flexberry-vertical-form').css({ opacity: 0.2 });
      Ember.run.later(function() {
        Ember.$('.full.height .flexberry-vertical-form').css({ opacity: '' });
        Ember.$('.full.height').css({ width: contentWidth });
      }, 250);

      Ember.run.later(this, function() {
        sidebar.toggleClass('sidebar-mini');

        // For reinit overflowed tabs.
        Ember.$(window).trigger('resize');
      }, 500);
    },

    /**
      Toggles application sitemap's side bar in mobile view.
      @method actions.toggleSidebarMobile
    */
    toggleSidebarMobile() {
      Ember.$('.ui.sidebar.main.menu').sidebar('toggle');

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
