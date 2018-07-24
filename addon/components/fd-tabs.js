import Ember from 'ember';
import layout from '../templates/components/fd-tabs';
import TabPane from '../components/ui-tab-segment';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default Ember.Component.extend(FdWorkPanelToggler, {

  layout: layout,
  tabsWidth: 0,
  containerWidth: 0,
  hideTabsCount: 0,
  _hideTabs: [],
  overflowButtonShow: false,
  overflowListShow: false,
  moreValue: 'Другие',
  selected: '',

  options: {
    tabPadding: 25,
    containerPadding: 0,
    dropdownSize: 95
  },

  updateOverflowTabs: function() {
    this._calculateWidths();

    if (this.get('hideTabsCount') > 0) {
      this._hideTab();
    }
  },

  _calculateWidths: function() {
    let width = 0;
    let countHide = this.get('tabs').length;
    let _this = this;
    _this.containerWidth = Ember.$(this.element).parent().width() - _this.options.containerPadding - _this.options.dropdownSize;

    Ember.$(_this.element).find('a.item').each(function() {
      if ((width + Ember.$(this).outerWidth(true)) < _this.containerWidth) {
        width += Ember.$(this).outerWidth(true);
        countHide--;
      }
    });

    _this.hideTabsCount = countHide;
  },

  _hideTab: function() {
    let hideTabs = this.get('hideTabsCount');
    if (hideTabs > 0) {
      this.toggleProperty('overflowButtonShow');
    }

    for (let i = 0; i < hideTabs; i++) {
      let _currentTabs = this.get('tabs');
      let lastTab = _currentTabs.get('lastObject');

      this.get('_hideTabs').push(lastTab);
      _currentTabs.pop();
      this.set('tabs', _currentTabs);
    }

    this.get('_hideTabs').reverse();
  },

  didInsertElement() {
    this.updateOverflowTabs();
  },

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
  }),

  activeTab:'',

  tabsObserver: Ember.observer('tabs', function() {
    let _this = this;
    Ember.run.schedule('afterRender',	function() {
      _this.$('.item').tab();
      _this.$('.item[data-tab="' + _this.activeTab + '"]').addClass('active');

      _this.updateOverflowTabs();
    });
  }),

  actions: {
    tabClick(tab) {
      this.sendAction('tabClick', tab);
    },

    changeLastTab(selectedValue) {
      let _this = this;

      let _currentTabs = _this.get('tabs');
      let _currentHideTabs =  _this.get('_hideTabs');
      let lastTab = _currentTabs.get('lastObject');

      if (_currentHideTabs.indexOf(selectedValue) > -1) {
        _currentHideTabs.replace(_currentHideTabs.indexOf(selectedValue), 1, lastTab);
        _currentTabs.popObject();
        _currentTabs.pushObject(selectedValue);

        _this.set('tabs', _currentTabs);
        _this.set('_hideTabs', _currentHideTabs);
        _this.active = selectedValue;
      }
    }
  }
});
