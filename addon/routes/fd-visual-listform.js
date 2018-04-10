import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder, SimplePredicate } = Query;

export default Ember.Route.extend({
  currentContext: Ember.inject.service('fd-current-project-context'),

  queryParams: {
    form: { refreshModel: true },
    class: { refreshModel: true },
  },

  beforeModel() {
    let currentContext = this.get('currentContext');
    if (currentContext.get('context.stage')) {
      return Ember.RSVP.resolve();
    }

    let configurationQuery = new Builder(this.store, 'fd-configuration')
      .selectByProjection('ListFormView')
      .byId('694DCACB-4DD7-4F57-9DE8-1EC0E743E3F6')
      .build();
    let stageQuery = new Builder(this.store, 'fd-dev-stage')
      .selectByProjection('ListFormView')
      .byId('EEC8EDF4-04E6-4BF8-BB83-0372B7A9418E')
      .build();

    return this.store.queryRecord('fd-configuration', configurationQuery).then((configuration) => {
      currentContext.setCurrentConfiguration(configuration);
      return this.store.queryRecord('fd-dev-stage', stageQuery).then(stage => currentContext.setCurrentStage(stage));
    });
  },

  model(params) {
    let formPromise;
    let stage = this.get('currentContext').getCurrentStageModel();

    if (params.form) {
      let formQuery = new Builder(this.store, 'fd-dev-class')
        .selectByProjection('FormConstructor')
        .byId(params.form).build();

      formPromise =  this.store.queryRecord('fd-dev-class', formQuery);
    } else {
      let dataObjectPromise;
      if (params.class) {
        let dataObjectQuery = new Builder(this.store, 'fd-dev-class')
          .selectByProjection('DataObjects')
          .byId(params.class).build();

        dataObjectPromise = this.store.queryRecord('fd-dev-class', dataObjectQuery);
      } else {
        dataObjectPromise = Ember.RSVP.resolve(this.store.createRecord('fd-dev-class', { stage }));
      }

      formPromise = dataObjectPromise.then((dataObject) => {
        let view = this.store.createRecord('fd-dev-view', {
          class: dataObject,
          definition: Ember.A(),
        });
        let formView = this.store.createRecord('fd-dev-form-view', { view });
        return Ember.RSVP.resolve(this.store.createRecord('fd-dev-class', {
          stage: stage,
          formViews: [formView],
        }));
      });
    }

    let builder = new Builder(this.store);
    let associationsQuery = builder.from('fd-dev-association')
      .selectByProjection('FormConstructor')
      .where('stage', 'eq', stage.get('id'))
      .build();

    let aggregationsQuery = builder.from('fd-dev-aggregation')
      .selectByProjection('FormConstructor')
      .where('stage', 'eq', stage.get('id'))
      .build();

    let inheritancesQuery = builder.from('fd-dev-inheritance')
      .selectByProjection('InhList')
      .where('stage', 'eq', stage.get('id'))
      .build();

    let dataObjectsPredicate = new SimplePredicate('stereotype', 'eq', '«implementation»')
      .or(new SimplePredicate('stereotype', 'eq', null))
      .or(new SimplePredicate('stereotype', 'eq', ''))
      .and(new SimplePredicate('stage.id', 'eq', stage.get('id')));
    let dataObjectsQuery = builder.from('fd-dev-class')
      .selectByProjection('DataObjects')
      .where(dataObjectsPredicate)
      .build();

    return Ember.RSVP.hash({
      form: formPromise,
      dataObjects: this.store.query('fd-dev-class', dataObjectsQuery),
      associations: this.store.query('fd-dev-association', associationsQuery),
      aggregations: this.store.query('fd-dev-aggregation', aggregationsQuery),
      inheritances: this.store.query('fd-dev-inheritance', inheritancesQuery),
    });
  },
});
