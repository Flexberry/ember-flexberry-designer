import Ember from 'ember';
import layout from '../templates/components/fd-tabs';
import TabPane from '../components/fd-tabs/pane';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

/**
 Tab component for dynamic tab functionality
 ### Usage
 Just nest any number of yielded [Components.TabPane](Components.TabPane.html) components that hold the tab content.
 The tab navigation is automatically generated from the tab panes' `title` property:
 ```hbs
 {{#fd-tabs as |tab|}}
   {{#tab.pane dataTab='tab1' title="Tab 1"}}
     <p>...</p>
   {{/tab.pane}}
   {{#tab.pane dataTab='tab2' title="Tab 2"}}
     <p>...</p>
   {{/tab.pane}}
 {{/fd-tabs}}
 ```
 @class Tab
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
export default Ember.Component.extend(FdWorkPanelToggler, {

  layout: layout,
  tabsWidth: 0,
  containerWidth: 0,
  hideTabsCount: 0,
  overflowButtonShow: false,
  overflowedTabs: true,
  inactiveTabs: false,
  selectedTab: '',
  reloadTabs: true,
  activeTab: Ember.computed.oneWay('childPanes.firstObject.dataTab'),
  options: {
    tabPadding: 25,
    containerPadding: 0,
    dropdownSize: 70
  },

  /**
   * Array of registered child components
   *
   * @property children
   * @type array
   * @protected
   */
  children: null,

  /**
   * Array of hidden child components
   *
   * @property _hideTabs
   * @type array
   * @protected
   */
  _hideTabs: null,

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
   * Array of hidden child components
   *
   * @property children
   * @type array
   * @private
   */
  _showedTabs: Ember.computed('tabs', {
    get() {
      return Ember.getWithDefault(this, 'tabs', null);
    },

    set(key, value) {
      return value;
    }
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
    if (this.overflowedTabs) {
      this.reinitTabs();
    }
  }),

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

    this.hideTabsCount = countHide;
  },

  _hideTab: function() {
    let hideTabs = this.get('hideTabsCount');

    for (let i = 0; i < hideTabs; i++) {
      let _currentTabs = this.get('_showedTabs');
      let lastTab = Ember.A(_currentTabs).get('lastObject');

      this.get('_hideTabs').pushObject(lastTab);
      _currentTabs.popObject();
      this.set('_showedTabs', _currentTabs);
    }

    this.get('_hideTabs').reverse();
  },

  init() {
    this._super(...arguments);
    this.set('children', Ember.A());
    this.set('_hideTabs', Ember.A());

    if (this.overflowedTabs) {
      Ember.run.schedule('afterRender', this, function() {
        let _this = this;
        Ember.$(window).resize(function() {
          if (!(_this.get('isDestroyed') || _this.get('isDestroyed'))) {
            _this.reinitTabs();
          }
        });
      });
    }
  },

  reinitTabs() {
    Ember.run.schedule('afterRender', this, function() {
      this.set('overflowButtonShow', false);
      this.set('_hideTabs', Ember.A());
      this.set('_showedTabs', this.get('tabs').slice());

      let activeTab = this.get('tabs').get('firstObject') ? this.get('tabs').get('firstObject').dataTab : null;
      this.set('activeTab', activeTab);

      Ember.run.schedule('afterRender', this,	function() {
        this._calculateWidths();

        this.set('overflowButtonShow', this.get('hideTabsCount') > 0);
        if (this.overflowButtonShow) {
          this._hideTab();
        }
      });
    });
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
   * Remove the child component from this parent component
   *
   * @method removeChild
   * @param child
   * @public
   */
  removeChild(child) {
    Ember.run.schedule('actions', this, function() {
      this.get('children').removeObject(child);
    });
  },

  didInsertElement() {
    if (this.overflowedTabs) {
      this.reinitTabs();
    }
  },

  actions: {
    tabClick(tab) {
      let previous = this.get('activeTab');
      let activeTab = tab.dataTab === previous && this.inactiveTabs ? null : tab.dataTab;
      this.set('activeTab', activeTab);

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
