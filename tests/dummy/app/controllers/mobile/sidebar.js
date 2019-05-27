import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

    /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: service('fd-current-project-context'),

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
})