import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import { isNone } from '@ember/utils';
import { observer } from '@ember/object';
import FdUpdateStoreInstancesValueMixin from '../../mixins/fd-editing-panels/fd-update-store-instances-value';
import layout from '../../templates/components/fd-editing-panels/fd-external-editing-panel';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';

export default Component.extend(FdUpdateStoreInstancesValueMixin, {
  layout,

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service('store'),

  /**
    Classes data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Select stage.

    @property stageValue
    @type Object
  */
  stageValue: undefined,

  /**
    All stages.

    @property stageItems
    @type Array
  */
  stageItems: undefined,

  /**
    Select class.

    @property classValue
    @type Object
  */
  classValue: undefined,

  /**
    All classes.

    @property classItems
    @type Array
  */
  classItems: undefined,

  /**
    Ember.observer, watching string `model.name` and update value property.

    @method _modelObserver
  */
  _modelObserver: observer('model.name', function() {
    let _this = this;
    let model = this.get('model');
    if (isNone(model)) {
      return;
    }

    let promises = [];
    let templateClassId = model.get('description');
    let store = this.get('store');

    let builderStage = new Builder(store)
      .from('fd-dev-stage')
      .selectByProjection('ListFormView');

    promises.push(store.query('fd-dev-stage', builderStage.build()));

    if (!isNone(templateClassId)) {
      let id = templateClassId.substring(1, templateClassId.length - 1);

      let builderClass = new Builder(store)
        .from('fd-dev-class')
        .selectByProjection('ListFormView')
        .byId(id);

      let selectClassPromise = store.queryRecord('fd-dev-class', builderClass.build()).then((selectClass) => {
        let stage = selectClass.get('stage');
        _this.getClassesForStage(store, stage).then((classes) => {
          _this.set('classItems', classes);
          _this.set('classValue', selectClass);
        });

        return stage;
      });

      promises.push(selectClassPromise);
    }

    all(promises).then((allThen) => {
      _this.set('stageItems', allThen[0]);
      if (promises.length === 2) {
        _this.set('stageValue', allThen[1]);
      } else {
        _this.set('stageValue', '');
        _this.set('classValue', '');
      }
    });

  }),

  init() {
    this._super(...arguments);
    this.get('_modelObserver')();
  },

  /**
    Method for get all classes for current stage.

    @method getClassesForStage
    @param {Object} store Service store.
    @param {Object} stage Current stage.
  */
  getClassesForStage(store, stage) {
    let predicate = new SimplePredicate('stage', FilterOperator.Eq, stage.get('id'));

    let builderClasses = new Builder(store)
      .from('fd-dev-class')
      .selectByProjection('ListFormView')
      .where(predicate);

    return store.query('fd-dev-class', builderClasses.build());
  },

  actions: {

    /**
      Changes the stage.

      @method actions.changeStageValue
      @param {Object} value An object with a new value in the `checked` property.
    */
    changeStageValue(value) {
      let _this = this;
      let store = this.get('store');

      this.getClassesForStage(store, value).then((classes) => {
        _this.set('classItems', classes);
        _this.set('classValue', '');
      });
    },

    /**
      Changes the class.

      @method actions.changeClassValue
      @param {Object} value An object with a new value in the `checked` property.
    */
    changeClassValue(value) {
      if (Ember.isBlank(value)) {
        this.set('model.description', null);
      } else {
        this.set('model.description', '{' + value + '}');
      }
    }
  }
});
