import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function(params) {
    let stageId = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let modelHash = {
      editform: undefined,
      dataobject: undefined,
      typemap: undefined,
      enums: undefined,
      types: undefined
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      // Load «editform».
      let loadClassesPromise = new Ember.RSVP.Promise(function (resolveLoadClasses, rejectLoadClasses) {
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
      }, reject);

      Ember.RSVP.all([loadClassesPromise, loadTypemapPromise, promiseEnumeration, promiseType]).then(() => {
        // TODO: Приготовим коллекцию controls для того, чтобы отобразить их по выбранному представлению.
        // Возьмём представление и пробежимся по нему.

        let attributes = Ember.A();
        let definition = modelHash.editform.get('formViews.firstObject.view.definition');
        for (let i = 0; i < definition.length; i++) {
          if (definition[i].visible === 'True') {
            let attribute = attributes.pushObject({
              propertyName: definition[i].propertyName,
              name: definition[i].caption || definition[i].propertyName,
            });

            if (definition[i].isMaster === 'True') {
              attribute.type = 'guid';
              attribute.notNull = null;
              attribute.defaultValue = null;
            } else {
              let propertyOwner = modelHash.dataobject;
              let propertyOwnerId = propertyOwner.get('id');
              let path = definition[i].propertyName.split('.');
              let attributeName = path.pop();
              let skipAsExternalClass = false;
              for (let i = 0; i < path.length; i++) {
                let relationName = path[i];
                let ownAndParentsId = this._getParentsId(propertyOwnerId); // TODO:
                ownAndParentsId.push(propertyOwnerId);

                // TODO: Filter by all Ids
                let relationships;
                for (let j = 0; j < ownAndParentsId.length; j++) {
                  let rel = this.get('model.associations').filterBy('endClass.id', ownAndParentsId[j]);
                  if (relationships) {
                    relationships.push(rel.toArray());
                  } else {
                    relationships = rel;
                  }
                }

                let relationship = relationships.findBy('startRole', relationName) || relationships.findBy('startClass.name', relationName);

                if (!relationship) {
                  // TODO: Filter by all Ids
                  for (let j = 0; j < ownAndParentsId.length; j++) {
                    let rel = this.get('model.aggregations').filterBy('endClass.id', ownAndParentsId[j]);
                    if (relationships) {
                      relationships.push(rel.toArray());
                    } else {
                      relationships = rel;
                    }
                  }

                  relationship = relationships.findBy('startRole', relationName) || relationships.findBy('startClass.name', relationName);
                }

                // Ember.assert('Не найдена связь ' + relationName + ' в классе ' + propertyOwner.get('name'), relationship);

                if (!relationship) {
                  skipAsExternalClass = true;
                  break;
                }

                propertyOwnerId = relationship.get('startClass.id');
              }

              if (skipAsExternalClass) {
                attributes.popObject();
                continue;
              }

              if (propertyOwner.get('id') !== propertyOwnerId) {
                propertyOwner = this.get('model.dataObjects').findBy('id', propertyOwnerId);
              }

              let classAttribute = propertyOwner.get('attributes').findBy('name', attributeName);

              if (!classAttribute) {
                classAttribute = this._getAttributeFromParent(propertyOwnerId, attributeName);
              }

              if (classAttribute) {
                attribute.classAttribute = classAttribute;
                attribute.type = classAttribute.get('type');
                attribute.notNull = classAttribute.get('notNull');
                attribute.defaultValue = classAttribute.get('defaultValue');
              }
            }
          }
        }

        modelHash.controls = attributes;

        resolve(modelHash);
      });
    });
  },

  activate() {
    let sidebar = Ember.$('.ui.sidebar.main.menu');
    let configPanrlTabsWidth = this.controllerFor(this.routeName).get('configPanrlTabsWidth');
    if (!sidebar.hasClass('visible')) {
      Ember.$('.pusher').css({ width: 'calc(100% - ' + configPanrlTabsWidth + 'px)' });
    } else {
      let workPanel = sidebar.width() + configPanrlTabsWidth;
      Ember.$('.pusher').css({ width: 'calc(100% - ' + workPanel + 'px)'});
    }

    Ember.run.schedule('afterRender', function() {
      let configPanelSidebar = Ember.$('.ui.sidebar.config-panel');
      Ember.$('.menu .item', configPanelSidebar).tab();
    })

  },

  deactivate() {
    let sidebar = Ember.$('.ui.sidebar.main.menu');

    if (!sidebar.hasClass('visible')) {
      Ember.$('.pusher').css({ width: '100%' });
    } else {
      Ember.$('.pusher').css({ width: 'calc(100% - ' + sidebar.width() + 'px)'});
    }  
  }
});
