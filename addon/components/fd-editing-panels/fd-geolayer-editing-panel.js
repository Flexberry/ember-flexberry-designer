import Component from '@ember/component';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import { isBlank, isNone } from '@ember/utils';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import layout from '../../templates/components/fd-editing-panels/fd-geolayer-editing-panel';

export default Component.extend(FdReadonlyModeMixin, {
  layout,

  /**
    @property store
    @type Service
  */
  store: service(),

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Classes data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Array classes.

    @property layerClasses
    @type Array
  */
  layerClasses: undefined,

  /**
    Array layer styles.

    @property layerStyles
    @type Array
  */
  layerStyles: undefined,

  /**
    The 'coordinateSystem' of the geolayer.

    @property coordinateSystem
    @type String
  */
  coordinateSystem: computed('model.name', {
    get() {
      let settings = this.parseDescription();
      return get(settings, 'coordinateSystem');
    },

    set(key, value) {
      let settings = this.parseDescription();
      set(settings, 'coordinateSystem', value);
      this.set('model.description', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'coverageLT' of the geolayer.

    @property coverageLT
    @type String
  */
  coverageLT: computed('model.name', {
    get() {
      let settings = this.parseDescription();
      return get(settings, 'coverageLT');
    },

    set(key, value) {
      let settings = this.parseDescription();
      set(settings, 'coverageLT', value);
      this.set('model.description', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'coverageRD' of the geolayer.

    @property coverageRD
    @type String
  */
  coverageRD: computed('model.name', {
    get() {
      let settings = this.parseDescription();
      return get(settings, 'coverageRD');
    },

    set(key, value) {
      let settings = this.parseDescription();
      set(settings, 'coverageRD', value);
      this.set('model.description', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'layerClass' of the geolayer.

    @property layerClass
    @type String
  */
  layerClass: computed('model.name', {
    get() {
      let settings = this.parseDescription();
      let layerClasses = this.get('layerClasses.objects').findBy('id', get(settings, 'layerClass'));
      return isNone(layerClasses) ? '' : layerClasses.get('name');
    },

    set(key, value) {
      let settings = this.parseDescription();
      let layerClasses = this.get('layerClasses.objects').findBy('name', value);
      set(settings, 'layerClass', layerClasses.get('id'));
      this.set('model.description', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'layerStyle' of the geolayer.

    @property layerStyle
    @type String
  */
  layerStyle: computed('model.name', {
    get() {
      let settings = this.parseDescription();
      let layerStyles = this.get('layerStyles.objects').findBy('id', get(settings, 'layerStyle'));
      return isNone(layerStyles) ? '' : layerStyles.get('name');
    },

    set(key, value) {
      let settings = this.parseDescription();
      let layerStyles = this.get('layerStyles.objects').findBy('name', value);
      set(settings, 'layerStyle', layerStyles.get('id'));
      this.set('model.description', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    Get and parse 'description' value.

    @method parseDescription
  */
  parseDescription() {
    let description = this.get('model.description');

    try {
      let settings = JSON.parse(description);

      return isBlank(settings) ? {} : settings;
    } catch(e) {
      return {};
    }
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  init() {
    this._super(...arguments);

    let store = this.get('store');
    let stagePk = this.get('currentProjectContext').getCurrentStage();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);

    // null or «implementation»
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«implementation»' || isBlank(item.get('stereotype'));
    });

    let implementationsSort = A(implementations).sortBy('name');
    this.set('layerClasses', {
      names: implementationsSort.mapBy('name'),
      objects: implementationsSort,
    });

    // Geolayerstyles.
    let geolayerstyles = classesCurrentStage.filterBy('stereotype', '«geolayerstyle»');
    let geolayerstylesSort = A(geolayerstyles).sortBy('name');
    this.set('layerStyles', {
      names: geolayerstylesSort.mapBy('name'),
      objects: geolayerstylesSort,
    });
  }
});
