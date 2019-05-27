import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    sitemap: { refreshModel: false },
  },

  activate() {
    $('.toggle-sidebar-mobile').css('display', 'none');
  },

  deactivate() {
    $('.toggle-sidebar-mobile').css('display', '');
  }
});
