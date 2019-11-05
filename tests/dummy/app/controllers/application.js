import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { later } from '@ember/runloop';
import $ from 'jquery';
import config from '../config/environment';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({
  /**
    Array queryParams form

    @property queryParams
    @type Number
    @default 0
  */
  queryParams: ['inframe'],

  /**
    Sets whether to show decor elements on the page
    inframe: 0 - the usual view of the page
    inframe: 1 - page without footer, header, sidebar. Used for printing

    @property inframe
    @type Number
    @default 0
  */
  inframe: 0,

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  transition: fade,
  /**
    Flag indicates sidebar visible

    @private
    @property _sidebarVisible
    @type Boolean
    @default true
  */
  _sidebarVisible: true,

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the application.
    @property appState
    @type AppStateService
  */
  appState: service(),

  router: service(),

  /**
    Current project name from stageModel

    @property currentProjectName
    @type String
  */
  currentProjectName: computed('currentContext.context.stageModel.name', function() {
    return this.get('currentContext.context.stageModel.name');
  }),

  sitemap: computed('i18n.locale', 'currentContext.context.{configuration,stage}', function() {
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

  sitemapBottom: computed('i18n.locale', 'currentContext.context.{configuration,stage}', function() {
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
        link: 'i-i-s-caseberry-logging-objects-application-log-l',
        caption: i18n.t('forms.application.sitemap.root.i-i-s-caseberry-logging-objects-application-log-l.caption'),
        title: i18n.t('forms.application.sitemap.root.i-i-s-caseberry-logging-objects-application-log-l.title'),
        icon: 'bug'
      },
      {
        link: 'https://flexberry.github.io',
        caption: i18n.t('forms.application.sitemap.root.fd-docs.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-docs.title'),
        icon: 'icon-fd-book'
      },
      {
        link: 'https://gitter.im/Flexberry',
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
  locales: undefined,

  /**
    Themes supported by application.

    @property themes
    @type String[]
    @default ['light', 'dark', 'blue']
  */
   themes: undefined,

  /**
    Handles changes in userSettingsService.isUserSettingsServiceEnabled.

    @method _userSettingsServiceChanged
    @private
  */
  _userSettingsServiceChanged: observer('userSettingsService.isUserSettingsServiceEnabled', function() {
    this.get('target.router').refresh();
  }),

  /**
    Initializes controller.
  */
  init() {
    this._super(...arguments);

    this.set('themes', ['light', 'dark', 'blue']);

    this.set('locales', ['ru', 'en']);

    let i18n = this.get('i18n');
    if (isNone(i18n)) {
      return;
    }

    // If i18n.locale is long value like 'ru-RU', 'en-GB', ... this code will return short variant 'ru', 'en', etc.
    let shortCurrentLocale = this.get('i18n.locale').split('-')[0];
    let availableLocales = A(this.get('locales'));

    // Force current locale to be one of available,
    // if browser's current language is not supported by dummy application,
    // or if browser's current locale is long value like 'ru-RU', 'en-GB', etc.
    if (!availableLocales.includes(shortCurrentLocale)) {
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
  objectlistviewEventsService: service('objectlistview-events'),

  sidebarWidth: '300px',

  sidebarMiniWidth: '60px',

  actions: {
    changeTheme() {
      let sheet = document.querySelector('#theme');
      if (!sheet) {
        return
      }

      let theme = $('.flexberry-dropdown.theme div.text').text();
      let rootURL = this.get('router.location.location.origin') + config.rootURL;
      sheet.setAttribute('href', `${rootURL}/assets/${theme}.css`);
    },

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
      let sidebar = $('.ui.sidebar.main.menu');
      sidebar.sidebar('toggle');
      sidebar.toggleClass('sidebar-mini');
      $('.full.height').toggleClass('content-opened');

      let sidebarVisible = sidebar.hasClass('visible');
      this.set('_sidebarVisible', !sidebarVisible);
      let currentSidebarWidth = sidebarVisible ? this.sidebarMiniWidth : this.sidebarWidth;
      let contentWidth = `calc(100% - ${currentSidebarWidth})`;
      if (!sidebarVisible) {
        $('.toggle-sidebar').css({ transition: 'opacity 500ms step-start' });
      } else {
        $('.toggle-sidebar').css({ transition: '' });
      }

      let visibleSheets = $('.fd-sheet.visible').toArray();
      visibleSheets.forEach((item) => {
        if ($(item).hasClass('expand')) {
          this.get('fdSheetService').animatingSheetContent($(item).attr('class').replace(/ /g, '.'), contentWidth, 250, true);
          let sheetTranslate = `translate3d(${currentSidebarWidth}, 0, 0)`;
          $(item).css({ 'transform': sheetTranslate });
        } else {

          // That the sheet remained in its place and did not go along with the content.
          let sheetTranslate = `translate3d(50%, 0, 0)`;
          $(item).css({ 'transform': sheetTranslate });
        }
      });

      // Animated increases the width of the page content.
      $('.full.height .flexberry-vertical-form').css({ opacity: 0.2 });
      later(function() {
        $('.full.height .flexberry-vertical-form').css({ opacity: '' });
      }, 250);

      later(this, function() {

        // For reinit overflowed tabs.
        $(window).trigger('resize');
      }, 500);
    },

    /**
      Toggles application sitemap's side bar in mobile view.
      @method actions.toggleSidebarMobile
    */
    toggleSidebarMobile() {
      $('.ui.sidebar.main.menu').sidebar('toggle');
      let sidebarVisible = $('.inverted.vertical.main.menu').hasClass('visible');
      this.set('_sidebarVisible', !sidebarVisible);
      if (sidebarVisible) {
        $('.sidebar.icon.text-menu-show').removeClass('hidden');
        $('.sidebar.icon.text-menu-hide').addClass('hidden');
        $('.bgw-opacity').addClass('hidden');
      } else {
        $('.sidebar.icon.text-menu-show').addClass('hidden');
        $('.sidebar.icon.text-menu-hide').removeClass('hidden');
        $('.bgw-opacity').removeClass('hidden');
      }
    }
  }
});
