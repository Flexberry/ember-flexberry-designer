import Ember from 'ember';

import FdEditformRow from '../objects/fd-editform-row';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function() {
    //let stageId = this.get('currentProjectContext').getCurrentStage();
    let modelHash = {
      editform: this.get('store').createRecord('fd-dev-class', { caption: 'New edit form', description: 'Test.' }),
      dataobject: undefined,
      typemap: undefined,
      enums: undefined,
      types: this.get('store').peekAll('fd-dev-type-definition')
    };

    return new Ember.RSVP.Promise(function (resolve) {
      // Load «editform».
      /*let loadClassesPromise = new Ember.RSVP.Promise(function (resolveLoadClasses, rejectLoadClasses) {
        let predicateEditformId = new Query.SimplePredicate('id', FilterOperator.Eq, params.id);

        let builderEditform = new  Builder(_this.store, 'fd-dev-class').
        select('id,name,caption,description,formViews,formViews.view,formViews.view.class,formViews.view.class.id,formViews.view.definition').
        where(predicateEditformId);

        _this.store.query('fd-dev-class', builderEditform.build()).then((result) => {
          let editform = result.objectAt(0);
          modelHash.editform = editform;
          return editform;
        }, rejectLoadClasses).then((editform) => {
          // Load dataobject «implementation».
          let dataobjectId = editform.get('formViews').objectAt(0).get('view.class.id'); // TODO: Check array.
          let predicateDataobjectId = new Query.SimplePredicate('id', FilterOperator.Eq, dataobjectId);

          let builderDataobject = new  Builder(_this.store, 'fd-dev-class').
          select('id,name,caption,description').
          where(predicateDataobjectId);

          _this.store.query('fd-dev-class', builderDataobject.build()).then((resultDataobject) => {
            modelHash.dataobject = resultDataobject.objectAt(0);
            resolveLoadClasses(modelHash);
          }, rejectLoadClasses);
        }, reject);
      });

      // Stage with type map.
      let predicateId = new Query.SimplePredicate('id', FilterOperator.Eq, stageId);

      let builderStage = new  Builder(_this.store, 'fd-dev-stage').
      select('id,typeMapCSStr').
      where(predicateId);

      let loadTypemapPromise = _this.store.query('fd-dev-stage', builderStage.build()).then((result) => {
        let stage = result.objectAt(0);
        modelHash.typemap = stage.get('typeMapCSStr');
        return modelHash;
      }, reject);

      let predicateStageId = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stageId);

      // Enums
      let predicateEnumerationStereorype = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«enumeration»');
      let predicateEnumeration = new Query.ComplexPredicate(Query.Condition.And, predicateStageId, predicateEnumerationStereorype);

      let builderEnumeration = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(predicateEnumeration);

      let promiseEnumeration = _this.store.query('fd-dev-class', builderEnumeration.build()).then((result) => {
        modelHash.enums = result;
        return modelHash;
      }, reject);

      // Type
      let predicateTypeStereorype = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«type»');
      let predicateType = new Query.ComplexPredicate(Query.Condition.And, predicateStageId, predicateTypeStereorype);

      let builderType = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(predicateType);

      let promiseType = _this.store.query('fd-dev-class', builderType.build()).then((result) => {
        modelHash.types = result;
        return modelHash;
      }, reject);*/

      Ember.RSVP.all([/*loadClassesPromise, loadTypemapPromise, promiseEnumeration, promiseType*/]).then(() => {
        // TODO: Приготовим коллекцию controls для того, чтобы отобразить их по выбранному представлению.
        // Возьмём представление и пробежимся по нему.

        modelHash.controls = Ember.A([
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformControl.create({
                type: 'date',
                caption: 'Attribute #1',
              }),
            ]),
          }),
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #2',
              }),
              FdEditformControl.create({
                type: 'bool',
                caption: 'Attribute #3',
              }),
            ]),
          }),
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #4',
              }),
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #5',
              }),
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #6',
              }),
            ]),
          }),
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #7',
              }),
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #8',
              }),
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #9',
              }),
              FdEditformControl.create({
                type: '',
                caption: 'Attribute #10',
              }),
            ]),
          }),
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformTabgroup.create({
                tabs: Ember.A([
                  FdEditformTab.create({
                    caption: 'Tab #1',
                    rows: Ember.A([
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformControl.create({
                            type: '',
                            caption: 'Attribute #11',
                          }),
                        ]),
                      }),
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformControl.create({
                            type: '',
                            caption: 'Attribute #12',
                          }),
                        ]),
                      }),
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformControl.create({
                            type: '',
                            caption: 'Attribute #13',
                          }),
                        ]),
                      }),
                    ]),
                  }),
                  FdEditformTab.create({
                    caption: 'Tab #2',
                    rows: Ember.A([
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformControl.create({
                            type: '',
                            caption: 'Attribute #14',
                          }),
                        ]),
                      }),
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformControl.create({
                            type: '',
                            caption: 'Attribute #15',
                          }),
                        ]),
                      }),
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformControl.create({
                            type: '',
                            caption: 'Attribute #16',
                          }),
                        ]),
                      }),
                    ]),
                  }),
                  FdEditformTab.create({
                    caption: 'Tab #3',
                    rows: Ember.A([
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformGroup.create({
                            caption: 'Group #1',
                            rows: Ember.A([
                              FdEditformRow.create({
                                controls: Ember.A([
                                  FdEditformControl.create({
                                    type: '',
                                    caption: 'Attribute #17',
                                  }),
                                ]),
                              })
                            ]),
                          }),
                        ]),
                      }),
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformGroup.create({
                            caption: 'Group #2',
                            rows: Ember.A([
                              FdEditformRow.create({
                                controls: Ember.A([
                                  FdEditformControl.create({
                                    type: '',
                                    caption: 'Attribute #18',
                                  }),
                                ]),
                              })
                            ]),
                          }),
                        ]),
                      }),
                      FdEditformRow.create({
                        controls: Ember.A([
                          FdEditformGroup.create({
                            caption: 'Group #3',
                            rows: Ember.A([
                              FdEditformRow.create({
                                controls: Ember.A([
                                  FdEditformControl.create({
                                    type: '',
                                    caption: 'Attribute #19',
                                  }),
                                ]),
                              })
                            ]),
                          }),
                        ]),
                      }),
                    ]),
                  }),
                ]),
              }),
            ]),
          }),
          FdEditformRow.create({
            controls: Ember.A([
              FdEditformGroup.create({
                caption: 'Group #1',
                width: undefined,
                rows: Ember.A([
                  FdEditformRow.create({
                    controls: Ember.A([
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #20',
                      }),
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #21',
                      }),
                    ]),
                  }),
                  FdEditformRow.create({
                    controls: Ember.A([
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #22',
                      }),
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #23',
                      }),
                    ]),
                  }),
                ]),
              }),
              FdEditformGroup.create({
                caption: 'Group #2',
                width: undefined,
                rows: Ember.A([
                  FdEditformRow.create({
                    controls: Ember.A([
                      FdEditformTabgroup.create({
                        tabs: Ember.A([
                          FdEditformTab.create({
                            caption: 'Tab #1',
                            rows: Ember.A([
                              FdEditformRow.create({
                                controls: Ember.A([
                                  FdEditformControl.create({
                                    type: '',
                                    caption: 'Attribute #24',
                                  }),
                                  FdEditformControl.create({
                                    type: '',
                                    caption: 'Attribute #25',
                                  }),
                                ]),
                              }),
                            ]),
                          }),
                        ]),
                      }),
                    ]),
                  }),
                ]),
              }),
              FdEditformGroup.create({
                caption: 'Group #3',
                width: undefined,
                rows: Ember.A([
                  FdEditformRow.create({
                    controls: Ember.A([
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #26',
                      }),
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #27',
                      }),
                    ]),
                  }),
                  FdEditformRow.create({
                    controls: Ember.A([
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #28',
                      }),
                      FdEditformControl.create({
                        type: '',
                        caption: 'Attribute #29',
                      }),
                    ]),
                  }),
                ]),
              }),
            ]),
          }),
        ]);

        resolve(modelHash);
      });
    });
  },
});
