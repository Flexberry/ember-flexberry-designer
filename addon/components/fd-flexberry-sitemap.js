import FlexberrySitemapComponent from 'ember-flexberry/components/flexberry-sitemap';
import { computed } from '@ember/object';

import layout from '../templates/components/fd-flexberry-sitemap';

export default FlexberrySitemapComponent.extend({
  layout,

  isExternalLink: computed('sitemap.link', function() {
    return this.get('sitemap.link').includes('http');
  })
});
