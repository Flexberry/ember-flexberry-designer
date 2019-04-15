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
    Previous version of the application structure.

    @property sitemap
    @type Object
  */
  sitemap: computed('i18n.locale', 'currentContext.context.{configuration,stage}', function() {
    let i18n = this.get('i18n');
    let context = this.get('currentContext.context');

    let nodes = [];
    if (!this.get('currentContext.singleStageMode')) {
      nodes.push({
        link: 'fd-configuration-list-form',
        caption: i18n.t('forms.application.sitemap.root.fd-configuration-list-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-configuration-list-form.title'),
      });

      if (context.configuration) {
        nodes.push({
          link: 'fd-stage-list-form',
          caption: i18n.t('forms.application.sitemap.root.fd-stage-list-form.caption'),
          title: i18n.t('forms.application.sitemap.root.fd-stage-list-form.title'),
        });
      }
    }

    if (context.stage) {
      nodes.push({
        link: 'fd-appstruct-form',
        caption: i18n.t('forms.application.sitemap.root.fd-appstruct-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-appstruct-form.title'),
      });
      nodes.push({
        link: 'fd-generation-process-form.new',
        caption: i18n.t('forms.application.sitemap.root.fd-generation-process-form.caption'),
        title: i18n.t('forms.application.sitemap.root.fd-generation-process-form.title'),
      });
      nodes.push({
        link: null,
        caption: i18n.t('forms.application.sitemap.root.additional.caption'),
        title: i18n.t('forms.application.sitemap.root.additional.title'),
        icon: 'dropdown',
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
            link: 'fd-aggregation-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-aggregation-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-aggregation-list-form.title'),
          },
          {
            link: 'fd-inheritance-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-inheritance-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-inheritance-list-form.title'),
          },
          {
            link: 'fd-view-list-form',
            caption: i18n.t('forms.application.sitemap.root.fd-view-list-form.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-view-list-form.title'),
          },
          {
            link: 'fd-data-types-map',
            caption: i18n.t('forms.application.sitemap.root.fd-data-types-map.caption'),
            title: i18n.t('forms.application.sitemap.root.fd-data-types-map.title'),
          },
        ],
      });
    }

    return { nodes };
  }),
});
