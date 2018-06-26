/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

/**
  Simple way of inject {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}} and limit list objects by stage.

  @class FdLimitByStageMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  /**
    Return `SimplePredicate` for limit list objects by stage.

    @method objectListViewLimitPredicate
    @return {Query.SimplePredicate}
  */
  objectListViewLimitPredicate() {
    let stage = this.get('currentContext').getCurrentStage();
    return new Query.SimplePredicate('stage', '==', stage);
  },
});
