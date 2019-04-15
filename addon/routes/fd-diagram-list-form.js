import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import { SimplePredicate, ComplexPredicate, IsOfPredicate } from 'ember-flexberry-data/query/predicate';
import Condition from 'ember-flexberry-data/query/condition';
import ListFormRoute from 'ember-flexberry/routes/list-form';

export default ListFormRoute.extend({
  /**
    Name of model projection to be used as record's properties limitation.

    @property modelProjection
    @type String
    @default 'FdDiagramL'
  */
  modelProjection: 'FdDiagramL',

  /**
    Name of model to be used as list's records types.

    @property modelName
    @type String
    @default 'fd-diagram'
  */
  modelName: 'fd-diagram',

  /**
    Defined user settings developer.
    For default userSetting use empty name ('').
    Property `<componentName>` may contain any of properties: `colsOrder`, `sorting`, `colsWidth` or being empty.

    ```javascript
    {
      <componentName>: {
        <settingName>: {
          colsOrder: [ { propName :<colName>, hide: true|false }, ... ],
          sorting: [{ propName: <colName>, direction: "asc"|"desc" }, ... ],
          colsWidths: [ <colName>:<colWidth>, ... ],
        },
        ...
      },
      ...
    }
    ```

    @property developerUserSettings
    @type Object
    @default {}
  */
 developerUserSettings: undefined,

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: service('fd-current-project-context'),

  /**
    Return `SimplePredicate` for limit list objects by stage.

    @method objectListViewLimitPredicate
    @return {Query.ComplexPredicate}
  */
  objectListViewLimitPredicate() {
    let stage = this.get('currentContext').getCurrentStage();
    let spStage = new SimplePredicate('subsystem.stage', 'eq', stage);

    let iopDiagrams = A();
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-ad'));
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-cad'));
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-cod'));
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-dpd'));
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-sd'));
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-std'));
    iopDiagrams.pushObject(new IsOfPredicate('fd-dev-uml-ucd'));
    let cpDiagrams = new ComplexPredicate(Condition.Or, ...iopDiagrams);

    return new ComplexPredicate(Condition.And, spStage, cpDiagrams);
  },

  init() {
    this._super(...arguments);

    this.set('developerUserSettings', {
      FdDiagramListForm: {}
    });
  }
});
