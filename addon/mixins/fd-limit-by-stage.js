/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';

/**
  Simple way of inject {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}} and limit list objects by stage.

  @class FdLimitByStageMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: service('fd-current-project-context'),

  /**
    Return `SimplePredicate` for limit list objects by stage.

    @method objectListViewLimitPredicate
    @return {Query.SimplePredicate}
  */
  objectListViewLimitPredicate() {
    let stage = this.get('currentContext').getCurrentStage();
    return new SimplePredicate('stage', '==', stage);
  },
});
