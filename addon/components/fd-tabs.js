import Ember from 'ember';
import layout from '../templates/components/fd-tabs';
import TabPane from '../components/ui-tab-segment';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default Ember.Component.extend(FdWorkPanelToggler, {

  layout: layout,

  /**
   * Array of registered child components
   *
   * @property children
   * @type array
   * @protected
   */
  children: null,

  init() {
    this._super(...arguments);
    this.set('children', Ember.A());
  },

  /**
   * Register a component as a child of this parent
   *
   * @method registerChild
   * @param child
   * @public
   */
  registerChild(child) {
    Ember.run.schedule('actions', this, function() {
      this.get('children').addObject(child);
    });
  },

  /**
   * All child components
   *
   * @property childPanes
   * @type array
   * @readonly
   * @private
   */
  childPanes: Ember.computed.filter('children', function(view) {
    return view instanceof TabPane;
  }),

  /**
   * Array of objects that define the tab structure
   *
   * @property tabs
   * @type array
   * @readonly
   * @private
   */
  tabs: Ember.computed('childPanes.@each.{tab,title}', function() {
    let items = Ember.A();
    this.get('childPanes').forEach((pane) => {
      let item = pane.getProperties('tab', 'title');
      items.push(item);
    });

    return items;
  })
});
