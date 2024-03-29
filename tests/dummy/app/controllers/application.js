import Controller from '@ember/controller';
import FdShareFunctionMixin from 'ember-flexberry-designer/mixins/fd-share-function';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { later } from '@ember/runloop';
import $ from 'jquery';
import config from '../config/environment';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend(FdShareFunctionMixin, {
  /**
    Array queryParams form

    @property queryParams
    @type Number
    @default 0
  */
  queryParams: ['inframe'],

  transition: fade,

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

  /**
    Current project is selected

    @property currentProjectIsSelected
    @type Bool
  */
  currentProjectIsSelected: computed('currentContext.context.stageModel', function() {
    return isNone(this.get('currentContext.context.stageModel')) ? false : true;
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
        link: 'fd-diagrams',
        caption: i18n.t('forms.application.sitemap.root.fd-diagrams.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-diagrams.title'),
        icon: 'icon-guideline-hierarchical-list'
      },
      {
        link: 'fd-application-model',
        caption: i18n.t('forms.application.sitemap.root.fd-application-model.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-application-model.title'),
        icon: 'icon-guideline-marker-list'
      },
      {
        link: 'fd-navigation',
        caption: i18n.t('forms.application.sitemap.root.fd-navigation.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-navigation.title'),
        icon: 'icon-guideline-book'
      },
      {
        link: 'fd-generation-settings',
        caption: i18n.t('forms.application.sitemap.root.fd-generation.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-generation.title'),
        icon: 'icon-guideline-download-layer'
      },
      {
        link: 'fd-setting',
        caption: i18n.t('forms.application.sitemap.root.fd-setting.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-setting.title'),
        icon: 'icon-guideline-setting'
      },
      {
        link: 'fd-architecture',
        caption: i18n.t('forms.application.sitemap.root.fd-architecture.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-architecture.title'),
        icon: 'icon-guideline-layers'
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
        icon: 'icon-guideline-grid'
      },
      {
        link: 'i-i-s-caseberry-logging-objects-application-log-l',
        caption: i18n.t('forms.application.sitemap.root.i-i-s-caseberry-logging-objects-application-log-l.caption'),
        title: i18n.t('forms.application.sitemap.root.i-i-s-caseberry-logging-objects-application-log-l.title'),
        icon: 'icon-guideline-table'
      },
      {
        link: 'https://flexberry.github.io',
        caption: i18n.t('forms.application.sitemap.root.fd-docs.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-docs.title'),
        icon: 'icon-guideline-book'
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

    this.get('currentContext').on('NeedSyncStageTriggered', this, this._informSyncStage);
  },

  willDestroy() {
    this._super(...arguments);

    this.get('currentContext').off('NeedSyncStageTriggered', this, this._informSyncStage);
  },

  /**
    Service that triggers objectlistview events.

    @property objectlistviewEventsService
    @type Service
  */
  objectlistviewEventsService: service('objectlistview-events'),

  sidebarWidth: '300px',

  sidebarMiniWidth: '60px',

  /**
    Flag indicates on sync.

    @property needSync
    @type Bool
    @default false
  */
  needSync: false,

  /**
    Show sync popup.

    @method _informSyncStage
  */
  _informSyncStage() {
    let needSync = this.get('needSync');
    if (!needSync) {
      this.set('needSync', true);
      let syncPopup = $('.fd-sync-stage');
      syncPopup.popup({
        on: 'manual',
        variation: 'mini',
        position: 'bottom center'
      }).popup('show');

      later(this, (function() {
        let popup = syncPopup.popup('get popup');
        popup.remove();
        syncPopup.popup({
          on: 'hover',
          variation: 'mini',
          position: 'bottom center',
        });
      }), 5000);
    }
  },

  actions: {
    /**
      Select themes.

      @method actions.changeTheme
    */
    changeTheme(value) {
      let sheet = document.querySelector('#theme');
      if (!sheet) {
        return
      }

      let rootURL = this.get('router.location.location.origin') + config.rootURL;
      sheet.setAttribute('href', `${rootURL}/assets/${value}.css`);
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
        } else {

          // That the sheet remained in its place and did not go along with the content.
          let sheetTranslate = `translate3d(calc(50% - ${currentSidebarWidth}), 0, 0)`;
          $(item).css({ 'transform': sheetTranslate });
        }
      });
      if (!sidebarVisible) {
        sidebar.toggleClass('sidebar-mini');
      }

      // Animated increases the width of the page content.
      $('.full.height .flexberry-vertical-form').css({ opacity: 0.2 });
      later(function() {
        $('.full.height .flexberry-vertical-form').css({ opacity: '' });
        $('.full.height').css({ width: contentWidth });
        if (sidebarVisible) {
          sidebar.toggleClass('sidebar-mini');
        }
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
      let sidebar = $('.ui.sidebar.main.menu');

      sidebar.sidebar('setting', 'transition', 'overlay')
      .sidebar('attach events', '.ui.sidebar.main.menu a.item')
      .sidebar('toggle');
    },

    /**
      @method actions.syncStage
    */
    syncStage() {
      this.get('appState').loading();
      FdPreloadStageMetadata.call(this, this.get('store'), this.get('currentContext').getCurrentStage()).then(() => {
        let syncPopup = $('.fd-sync-stage');
        let popup = syncPopup.popup('get popup');
        popup.remove();

        this.set('needSync', false);
        this.send('refreshRoute');
      }).finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      @method actions.exitProject
    */
    exitProject() {
      let sheetNames = ["diagram-sheet", "class-sheet", "navigation-sheet", "view-sheet", "edit-diagram-object-sheet", "generation-sheet"];
      let hasDirtyAttrs = false;
      sheetNames.forEach((name) => {
        let isDirty = this.get('fdSheetService').findUnsavedSheetData(name);
        if (isDirty) {
          hasDirtyAttrs = isDirty;
          this.get('fdSheetService').closeSheet(name);
        }
      });
      if (!hasDirtyAttrs) {
        this.send('_exitProject');
      }
    },

    /**
      @method actions.share
    */
    share(event) {
      let origin = this.get('router.location.location.origin');
      let pathname = this.get('router.location.location.pathname');
      let hash = this.get('router.location.location.hash').slice(0, 1) === '#' ? '#/' : '';
      let stage = `fd-diagrams?gotostage=${this.get('currentContext').getCurrentStage()}`;
      let value =  `${origin}${pathname}${hash}${stage}`;

      this.copyInClipboardValue(value);
      this.showSharePopup(event);
    }
  }
});
