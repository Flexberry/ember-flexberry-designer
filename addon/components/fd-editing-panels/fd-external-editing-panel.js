import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import { isNone, isBlank } from '@ember/utils';
import { observer } from '@ember/object';
import { A } from '@ember/array';
import FdUpdateStoreInstancesValueMixin from '../../mixins/fd-editing-panels/fd-update-store-instances-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-external-editing-panel';
import Condition from 'ember-flexberry-data/query/condition';
import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';

export default Component.extend(FdUpdateStoreInstancesValueMixin, FdReadonlyModeMixin, {
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
    Stage names.

    @property stageNames
    @type Array
  */
  stageNames: undefined,

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
    Deactivate dropdowns actions.

    @property deactivateActions
    @type bool
  */
  deactivateActions: false,

  /**
    Stage projection name.

    @property stageProjection
    @type string
  */
  stageProjection: 'ListFormView',

  /**
    Ember.observer, watching string `model.name` and update value property.

    @method _modelObserver
  */
  _modelObserver: observer('model.name', function() {
    this.set('deactivateActions', true);
    this._loadData();
  }),

  /**
    Load data for dropdown.

    @method _loadData
  */
  _loadData() {
    let _this = this;
    let model = this.get('model');
    if (isNone(model)) {
      return;
    }

    let promises = [];
    let templateClassId = model.get('description');
    let store = this.get('store');
    let stageProjection = this.get('stageProjection');

    let builderStage = new Builder(store)
      .from('fd-dev-stage')
      .selectByProjection(stageProjection);

    promises.push(store.query('fd-dev-stage', builderStage.build()));

    if (!isBlank(templateClassId)) {
      let id = templateClassId.substring(1, templateClassId.length - 1);

      let builderClass = new Builder(store)
        .from('fd-dev-class')
        .selectByProjection('ListFormView')
        .byId(id);

      let selectClassPromise = store.queryRecord('fd-dev-class', builderClass.build()).then((selectClass) => {
        let stage = selectClass.get('stage');
        _this.getClassesForStage(store, stage).then((classes) => {
          let classArray = A(classes);
          let classNames = classArray.mapBy('name');
          classNames.unshift('');
          _this.set('classItems', {
            names: classNames,
            objects: classArray,
          });

          _this.set('classValue', selectClass.get('name'));
        });

        return stage;
      });

      promises.push(selectClassPromise);
    }

    all(promises).then((allThen) => {
      let stageArray = A(allThen[0]);
      let stageItems = stageArray.map(x => {
        let stageName = this.getStageName(x);
        return {
          name: stageName,
          stage: x
        };
      });

      let stageNames = stageItems.mapBy('name');
      stageNames.unshift('');

      _this.set('stageItems', stageItems);
      _this.set('stageNames', stageNames);

      if (promises.length === 2) {
        _this.set('stageValue', this.getStageName(allThen[1]));
      } else {
        _this.set('stageValue', '');
        _this.set('classValue', '');
      }

      _this.set('deactivateActions', false);
    });
  },

  init() {
    this._super(...arguments);
    this._loadData();
  },

  /**
    Create stage name.

    @method getStageName
    @param {Array} stage stage.
  */
  getStageName(stage) {
    return stage.get('name');
  },

  /**
    Method for get all classes for current stage.

    @method getClassesForStage
    @param {Object} store Service store.
    @param {Object} stage Current stage.
  */
  getClassesForStage(store, stage) {
    let predicate = new ComplexPredicate(Condition.And,
      new SimplePredicate('stage', FilterOperator.Eq, stage.get('id')),
      new ComplexPredicate(Condition.Or,
        new SimplePredicate('stereotype', FilterOperator.Eq, ''),
        new SimplePredicate('stereotype', FilterOperator.Eq, '«implementation»'),
        new SimplePredicate('stereotype', FilterOperator.Eq, '«enumeration»'),
        new SimplePredicate('stereotype', FilterOperator.Eq, '«typedef»')
      ));

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
      if (isBlank(value)) {
        this.set('stageValue', '');
        this.set('classValue', '');
        this.set('model.description', null);
      } else {
        let _this = this;
        let store = this.get('store');
        let stageObject = this.get('stageItems').findBy('name', value);
        this.getClassesForStage(store, stageObject.stage).then((classes) => {
          let classArray = A(classes);
          let classNames = classArray.mapBy('name');
          classNames.unshift('');
          _this.set('classItems', {
            names: classNames,
            objects: classArray,
          });

          _this.set('classValue', '');
        });
      }
    },

    /**
      Changes the class.

      @method actions.changeClassValue
      @param {Object} value An object with a new value in the `checked` property.
    */
    changeClassValue(value) {
      if (isBlank(value)) {
        this.set('model.description', null);
      } else {
        let classObject = this.get('classItems').objects.findBy('name', value);
        this.set('model.description', '{' + classObject.get('id') + '}');
      }
    }
  }
});
