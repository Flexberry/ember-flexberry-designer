import { computed } from '@ember/object';
import $ from 'jquery';
import { isNone } from '@ember/utils';
import ListFormController from 'ember-flexberry/controllers/list-form';

export default ListFormController.extend({
  /**
    Name of related edit form route.

    @property editFormRoute
    @type String
    @default 'fd-diagram-edit-form'
   */
  editFormRoute: 'fd-diagram-edit-form',

  /**
    Items for meny.

    @property colsDiagramsItems
    @readOnly
  */
  colsDiagramsItems: computed('i18n.locale', function() {
    let i18n = this.get('i18n');
    let menus = [
      {
        icon: 'ad-diagram',
        title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.ad'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.ad',
      },
      {
        icon: 'cad-diagram',
        title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.cad'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.cad',
        items: []
      },
      {
        icon: 'cod-diagram',
        title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.cod'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.cod',
      },
      {
        icon: 'dpd-diagram',
        title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.dpd'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.dpd',
      },
      {
        icon: 'sd-diagram',
        title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.sd'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.sd',
      },
      {
        icon: 'std-diagram',
        title: i18n.t('fforms.fd-diagram-list-form.create-diagrams-menu.std'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.std',
      },
      {
        icon: 'ucd-diagram',
        title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.ucd'),
        localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.ucd',
      }
    ];
    let rootItem = {
      icon: 'dropdown icon',
      iconAlignment: 'right',
      title: i18n.t('forms.fd-diagram-list-form.create-diagrams-menu.create-button'),
      localeKey: 'forms.fd-diagram-list-form.create-diagrams-menu.create-button',
      items: []
    };
    rootItem.items.push(...menus);

    return [rootItem];
  }),

  actions: {
    /**
      Handler click on flexberry-menu.

      @method actions.onDiagramsItemClick
      @public
      @param {jQuery.Event} e jQuery.Event by click on menu item
    */
    onDiagramsItemClick(e) {
      let iTags = $(e.currentTarget).find('i');
      let className = iTags.length > 0 ? iTags.get(0).className : '';

      let modelName;
      switch (className) {
        case 'ad-diagram':
          modelName = 'fd-dev-uml-ad';
          break;
        case 'cad-diagram':
          modelName = 'fd-dev-uml-cad';
          break;
        case 'cod-diagram':
          modelName = 'fd-dev-uml-cod';
          break;
        case 'dpd-diagram':
          modelName = 'fd-dev-uml-dpd';
          break;
        case 'sd-diagram':
          modelName = 'fd-dev-uml-sd';
          break;
        case 'std-diagram':
          modelName = 'fd-dev-uml-std';
          break;
        case 'ucd-diagram':
          modelName = 'fd-dev-uml-ucd';
          break;
      }

      if (!isNone(modelName)) {
        let editFormRoute = this.get('editFormRoute');
        this.get('objectlistviewEventsService').setLoadingState('loading');
        this.transitionToRoute(editFormRoute + '.new', { queryParams: { modelName: modelName } });
      }
    }
  }
});
