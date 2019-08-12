/**
  @module ember-flexberry-designer
*/

import Route from '@ember/routing/route';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Condition from 'ember-flexberry-data/query/condition';
import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import { isNone } from '@ember/utils';

/**
  The route for the project creation form.

  @class FdAllProjectsNewRoute
  @extends Route
*/
export default Route.extend({
  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property queryParams
  */
  queryParams: {
    nameFromSearch: { as: 'name' },
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    let modelHash = {
      repository: undefined,
      project: undefined,
      configuration: undefined,
    };

    let store = this.get('store');
    let projectionName = 'PathSearchView';

    let predicateRepository = new SimplePredicate('name', FilterOperator.Eq, 'customRepository');
    let builderRepository = new Builder(store)
      .from('fd-repository')
      .selectByProjection(projectionName)
      .where(predicateRepository)
      .top(1);

    return store.queryRecord('fd-repository', builderRepository.build()).then((repository) => {
      if (isNone(repository)) {
        return modelHash;
      } else {
        modelHash.repository = repository;
        let predicateProject = new ComplexPredicate(Condition.And,
          new SimplePredicate('name', FilterOperator.Eq, 'customProject'),
          new SimplePredicate('repository', FilterOperator.Eq, repository.get('id')));

        let builderProject = new Builder(store)
          .from('fd-project')
          .selectByProjection(projectionName)
          .where(predicateProject)
          .top(1);

        return store.queryRecord('fd-project', builderProject.build()).then((project) => {
          if (isNone(project)) {
            return modelHash;
          } else {
            modelHash.project = project;

            let predicateConfiguration = new ComplexPredicate(Condition.And,
              new SimplePredicate('name', FilterOperator.Eq, 'customConfiguration'),
              new SimplePredicate('project', FilterOperator.Eq, project.get('id')));

            let builderConfiguration = new Builder(store)
              .from('fd-configuration')
              .selectByProjection(projectionName)
              .where(predicateConfiguration)
              .top(1);

            return store.queryRecord('fd-configuration', builderConfiguration.build()).then((configuration) => {
              if (!isNone(configuration)) {
                modelHash.configuration = configuration;
              }

              return modelHash;
            });
          }
        });
      }
    });
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method setupController
  */
  setupController(controller) {
    let projectName = controller.get('nameFromSearch');
    if (projectName) {
      controller.set('projectName', projectName);
      controller.set('nameFromSearch', '');
    }

    return this._super(...arguments);
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method resetController
  */
  resetController(controller) {
    controller.set('projectName', undefined);
    controller.set('projectDescription', undefined);

    return this._super(...arguments);
  },
});
