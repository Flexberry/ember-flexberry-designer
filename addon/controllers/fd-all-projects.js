/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import FdReadonlyFromBackendMixin from '../mixins/fd-readonly-from-backend';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';

/**
  The controller for the form with the projects.

  @class FdAllProjectsController
  @extends Controller
*/
export default Controller.extend(FdReadonlyFromBackendMixin, {
  /**
    Link to nested controller `index`.
    More info on the [EmberJS API](https://emberjs.com/api/).

    @property indexController
    @type Ember.InjectedProperty
    @default 'fd-all-projects.index'
  */
  indexController: controller('fd-all-projects.index'),

  /**
    Indicates whether to show a header with a title, a search field and a project creation button.

    @property showHeader
    @type Boolean
    @readOnly
  */
  showHeader: computed.readOnly('indexController.active'),

  /**
    Alias for {{#crosslink "FdAllProjectsIndexController/search:property"}}{{/crosslink}}.

    @property search
    @type String
  */
  search: computed.alias('indexController.search'),
});
