import Component from '@ember/component';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import { isBlank } from '@ember/utils';
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
      let settings = this.parseContainers();
      return get(settings, 'coordinateSystem');
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'coordinateSystem', value);
      this.set('model.containersStr', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'minX' of the geolayer.

    @property minX
    @type String
  */
  minX: computed('model.name', {
    get() {
      let settings = this.parseContainers();
      return get(settings, 'minX');
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'minX', value);
      this.set('model.containersStr', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'minY' of the geolayer.

    @property minY
    @type String
  */
  minY: computed('model.name', {
    get() {
      let settings = this.parseContainers();
      return get(settings, 'minY');
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'minY', value);
      this.set('model.containersStr', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'maxX' of the geolayer.

    @property maxX
    @type String
  */
  maxX: computed('model.name', {
    get() {
      let settings = this.parseContainers();
      return get(settings, 'maxX');
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'maxX', value);
      this.set('model.containersStr', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    The 'maxY' of the geolayer.

    @property maxY
    @type String
  */
  maxY: computed('model.name', {
    get() {
      let settings = this.parseContainers();
      return get(settings, 'maxY');
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'maxY', value);
      this.set('model.containersStr', JSON.stringify(settings))
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
      let settings = this.parseContainers();
      let layerClass = get(settings, 'layerClass');
      return this.get('layerClasses').includes(layerClass) ? layerClass : '';
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'layerClass', value);
      this.set('model.containersStr', JSON.stringify(settings))
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
      let settings = this.parseContainers();
      let layerStyle = get(settings, 'layerStyle');
      return this.get('layerStyles').includes(layerStyle) ? layerStyle : '';
    },

    set(key, value) {
      let settings = this.parseContainers();
      set(settings, 'layerStyle', value);
      this.set('model.containersStr', JSON.stringify(settings))
      return value;
    }
  }),

  /**
    Get and parse 'containersStr' value.

    @method parseContainers
  */
  parseContainers() {
    let containersStr = this.get('model.containersStr');

    try {
      let settings = JSON.parse(containersStr);

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
    this.set('layerClasses', implementationsSort.mapBy('name'));

    // Geolayerstyles.
    let geolayerstyles = classesCurrentStage.filterBy('stereotype', '«geolayerstyle»');
    let geolayerstylesSort = A(geolayerstyles).sortBy('name');
    this.set('layerStyles', geolayerstylesSort.mapBy('name'));
  }
});
