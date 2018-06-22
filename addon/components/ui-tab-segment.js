import Ember from 'ember';
import layout from '../templates/components/ui-tab-segment';
import ComponentParent from './fd-tabs';

/**
ui-tab-segment component 

@module components
@namespace components
@class UiTabSegment
@constructor
*/
export default Ember.Component.extend({
  classNameBindings: ['_uiClass', 'theme', '_theme', '_componentClass'],
  _uiClass: 'ui',
  _componentClass: '',
  layout: layout,
  _theme: 'tab',
  theme: 'bottom attached',
  attributeBindings: ['tab:data-tab'],

  /**
  tab name
  @property {String} tab
  */
  tab: '',

  title: null,

  /**
   * The parent component
   *
   * @property _parent
   * @private
   */
  _parent: Ember.computed(function() {
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

  didReceiveAttrs() {
    this._super(...arguments);
    this._registerWithParent();
  },

  willRender() {
    this._super(...arguments);
    this._registerWithParent();
  },

  didInsertElement(){
    if(this.active) {
      this.$().addClass('active');
    }
  }
});