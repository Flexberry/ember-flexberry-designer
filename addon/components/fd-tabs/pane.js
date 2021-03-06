import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { observer } from '@ember/object';
import layout from 'ember-flexberry-designer/templates/components/ui-tab-menu';
import ComponentParent from 'ember-flexberry-designer/components/fd-tabs';
/**
 The tab pane of a tab component.
 @class TabPane
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @public
 */
export default Component.extend({
  layout: layout,
  classNameBindings: ['_uiClass', 'theme', '_theme', '_componentClass', 'active', 'selected'],
  _uiClass: 'ui',
  _componentClass: '',
  _theme: 'tab',
  theme: 'bottom attached',
  attributeBindings: ['dataTab:data-tab'],

  /**
   * The title for this tab pane. This is used by the `fd-tabs` component to automatically generate
   * the tab navigation.
   *
   * @property title
   * @type string
   * @default null
   * @public
   */
  title: null,

  /**
   * Used to apply "active" class
   *
   * @property active
   * @type boolean
   * @default false
   * @private
   */
  active: false,

  /**
   * Used to apply "selected" class
   *
   * @property active
   * @type boolean
   * @default false
   * @private
   */
  selected: false,

  /**
   * @property activeTab
   * @private
   */
  activeTab: null,

  /**
   * @property selectedTab
   * @private
   */
  selectedTab: null,

  /**
   * The parent component
   *
   * @property _parent
   * @private
   */
  _parent: computed(function() {
    return this.nearestOfType(ComponentParent);
  }),

  /**
   * flag to check if component has already been registered
   * @property _didRegister
   * @type boolean
   * @private
   */
  _didRegister: false,

  /**
   * Register ourself as a child at the parent component
   * We use the `willRender` event here to also support the fastboot environment, where there is no `didInsertElement`
   *
   * @method _registerWithParent
   * @private
   */
  _registerWithParent() {
    if (!this._didRegister) {
      let parent = this.get('_parent');
      if (parent) {
        parent.registerChild(this);
        this._didRegister = true;
      }
    }
  },

  /**
   * Unregister from the parent component
   *
   * @method _unregisterFromParent
   * @private
   */
  _unregisterFromParent() {
    let parent = this.get('_parent');
    if (this._didRegister && parent) {
      parent.removeChild(this);
      this._didRegister = false;
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._registerWithParent();
  },

  willRender() {
    this._super(...arguments);
    this._registerWithParent();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._unregisterFromParent();
  },

  /**
   * True if this pane is active (visible)
   *
   * @property isActive
   * @type boolean
   * @readonly
   * @private
   */
  isActive: computed('activeTab', 'dataTab', function() {
    return this.get('activeTab') === this.get('dataTab');
  }).readOnly(),

  _showHide: observer('isActive', function() {
    this.set('active', this.get('isActive'));
  }),

  _toggleSelect: observer('isSelected', function() {
    this.set('selected', this.get('isSelected'));
  }),

  /**
   * True if this pane is active (visible)
   *
   * @property isActive
   * @type boolean
   * @readonly
   * @private
   */
  isSelected: computed('selectedTab', 'dataTab', function() {
    return this.get('selectedTab') === this.get('dataTab');
  }).readOnly(),

  init() {
    this._super(...arguments);
    run.schedule('afterRender', this, function() {
      // isActive comes from parent component, so only available after render...
      this.set('active', this.get('isActive'));
      this.set('selected', this.get('isSelected'));
    });
  },
});
