import Ember from 'ember';
import layout from '../templates/components/fd-tabs';
import TabPane from '../components/ui-tab-segment';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default Ember.Component.extend(FdWorkPanelToggler, {

  layout: layout,
  tabsWidth: 0,
  containerWidth: 0,
  hideTabsCount: 0,
  overflowButtonShow: false,
  overflowListShow: false,
  moreValue: 'Другие',
  selectedTab: '',

  activeTab: Ember.computed.oneWay('childPanes.firstObject.dataTab'),

  options: {
    tabPadding: 25,
    containerPadding: 0,
    dropdownSize: 95
  },

  updateOverflowTabs: function() {
    if (this.overflowButtonShow) {
      return;
    }

    this._calculateWidths();

    this.set('overflowButtonShow', this.get('hideTabsCount') > 0);
    if (this.overflowButtonShow) {
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

    _this.hideTabsCount += countHide;
  },

  _hideTab: function() {
    let hideTabs = this.get('hideTabsCount');

    for (let i = 0; i < hideTabs; i++) {
      let _currentTabs = this.get('_showedTabs');
      let lastTab = _currentTabs.get('lastObject');

      this.get('_hideTabs').pushObject(lastTab);
      _currentTabs.popObject();
      this.set('_showedTabs', _currentTabs);
    }

    this.get('_hideTabs').reverse();
  },

  /**
   * Array of registered child components
   *
   * @property children
   * @type array
   * @protected
   */
  children: null,

  _hideTabs: null,

  init() {
    this._super(...arguments);
    this.set('children', Ember.A());
    this.set('_hideTabs', Ember.A());
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

  _showedTabs: Ember.computed('tabs', function() {
    let items = Ember.A();
    this.get('tabs').forEach((tab) => {
      let item = tab;
      items.push(item);
    });

    return items;
  }),

  /**
   * Array of objects that define the tab structure
   *
   * @property tabs
   * @type array
   * @readonly
   * @private
   */
  tabs: Ember.computed('childPanes.@each.{tab,title,dataTab}', function() {
    let items = Ember.A();
    this.get('childPanes').forEach((pane) => {
      let item = pane.getProperties('tab', 'title', 'dataTab');
      items.push(item);
    });

    return items;
  }),

  tabsObserver: Ember.observer('tabs.[]', function() {
    let _this = this;
    Ember.run.schedule('afterRender',	function() {
      _this.$('.item').tab();
      _this.updateOverflowTabs();
    });
  }),

  didInsertElement() {
    this.updateOverflowTabs();
    // if (this.get('activeTab') === '') {
    //   this.set('activeTab', this.get('_showedTabs').get('firstObject').dataTab);
    // }
  },

  didRender() {
    this.$('.item').tab();
  },

  actions: {
    tabClick(tab) {
      this.set('activeTab', tab.dataTab);
      this.sendAction('tabClick', tab);
    },

    changeLastTab(selectedValue) {
      let _this = this;

      let _currentTabs = _this.get('_showedTabs');
      let _currentHideTabs =  _this.get('_hideTabs');
      let lastTab = _currentTabs.get('lastObject');

      let replaceTabIndex = -1;
      _currentHideTabs.forEach(function(element, index) {
        if (element.title === selectedValue) {
          replaceTabIndex = index;
        }
      });

      if (replaceTabIndex > -1) {
        let activeTabIndex = _currentHideTabs[replaceTabIndex].dataTab;
        _currentTabs.popObject();
        _currentTabs.pushObject(_currentHideTabs[replaceTabIndex]);
        _currentHideTabs.replace(replaceTabIndex, 1, lastTab);

        _this.set('_showedTabs', _currentTabs);
        _this.set('_hideTabs', _currentHideTabs);
        _this.set('activeTab', activeTabIndex);
      }
    }
  }
});
