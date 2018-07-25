import Ember from 'ember';
import ListFormRoute from 'ember-flexberry/routes/list-form';
import FdLimitByStageMixin from '../mixins/fd-limit-by-stage';
import { Query } from 'ember-flexberry-data';

export default ListFormRoute.extend(FdLimitByStageMixin, {
  /**
    Name of model projection to be used as record's properties limitation.

    @property modelProjection
    @type String
    @default 'ListFormView'
  */
  modelProjection: 'ListFormView',

  /**
    Name of model to be used as list's records types.

    @property modelName
    @type String
    @default 'fd-dev-class'
  */
  modelName: 'fd-dev-class',

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
  developerUserSettings: { FdClassListForm: {} },

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  objectListViewLimitPredicate() {
    // Demo data  TODO: Demo mode.
    let demoStage = 'FB6972D1-F04A-4617-B454-D2D0DB4CEC05';
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let simplePredicates = Ember.A();
    if (stagePk.toLocaleLowerCase()  === demoStage.toLocaleLowerCase()) {
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '5b6bd5cd-66f2-4c38-85d1-9b0633df17b9'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '83daf0b0-a6df-4298-8980-1325b5c4ad09'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, 'a58fcb63-69dd-4003-a7d1-17795568b3ce'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '91b136b8-ba32-43e7-aaf7-ac01c809d67c'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '1594c7c7-ea8f-46ea-a137-277258548945'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '3404edce-a908-46d3-871f-485a436a949f'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '29a058f5-fd78-42f2-b371-5de6c8bbd38e'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '1233c3a2-0306-4777-966a-68a423c0ec6f'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, 'b3841653-3274-4f18-b132-899150fc28b6'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '2bc9872d-2f67-4984-aa80-c41b41037854'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, 'de436800-c2fc-4412-b052-d5935d0bee24'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, 'd048eebb-695b-4b3d-b195-e43660c17fcc'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, 'd5870419-1279-4462-a1ff-e465e038eeb8'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '5b35731d-0645-46f0-a4ec-ee54efbfb527'));
      simplePredicates.pushObject(new Query.SimplePredicate('id', Query.FilterOperator.Eq, '7dc18ea4-ea84-4311-80a3-c691844dc25c'));
      return new Query.ComplexPredicate(Query.Condition.Or, ...simplePredicates);
    }

    return;
  },
});
