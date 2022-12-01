/**
  @module ember-flexberry-designer
*/

import Component from '@ember/component';
import layout from '../templates/components/fd-generation-settings';
import { computed, observer } from '@ember/object';
import { set, get } from '@ember/object';

/**
 * This component renders a list of generation settings.
 *
 * @class FdGenerationSettingsComponent
 * @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
 */
export default Component.extend({
  layout,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['fd-generation-settings'],

  /**
   * Handles changes in i18n.locale.
   *
   * @method localeObserver
   */
  localeObserver: observer('i18n.locale', function() {
    this.set('newGenerationItems', {})
    this.setGenerationItems(this.get('genSettingsFile'));
  }),

  /**
   * Generation settings headers.
   *
   * @property {object} generationItemsTitles
   */
  generationItemsTitles: computed('i18n.locale', function() {
    let i18n = this.get('i18n');
    return {
      'EmberJs': 'Ember JS',
      'EmberApp': i18n.t('components.fd-generation-settings.EmberApp').string,
      'EmberAddon': i18n.t('components.fd-generation-settings.EmberAddon').string,
      'Build': i18n.t('components.fd-generation-settings.Build').string,
      'GitClone': 'Git clone',
      'GitPush': 'Git push',
      'GhPagesPush': i18n.t('components.fd-generation-settings.GhPagesPush').string,
      'EmberMetadata': i18n.t('components.fd-generation-settings.EmberMetadata').string,
      'ApacheCordova': 'Apache Cordova',
      'CordovaProject': i18n.t('components.fd-generation-settings.CordovaProject').string,
      'BuildApp': i18n.t('components.fd-generation-settings.BuildApp').string,
      'Dockerfile': i18n.t('components.fd-generation-settings.Dockerfile').string,
      'DockerfileAutobuild': i18n.t('components.fd-generation-settings.DockerfileAutobuild').string,
      'DockerBuildShellScript': i18n.t('components.fd-generation-settings.DockerBuildShellScript').string,
      'DockerSwarm': i18n.t('components.fd-generation-settings.DockerSwarm').string,
      'Mssql': 'Microsoft SQL Server',
      'PostgreSql': 'Postgre SQL',
      'DiffSql': i18n.t('components.fd-generation-settings.DiffSql').string,
      'FullSql': i18n.t('components.fd-generation-settings.FullSql').string,
      'LiquibaseSql': i18n.t('components.fd-generation-settings.LiquibaseSql').string,
      'Security': i18n.t('components.fd-generation-settings.Security').string,
      'AdminUser': i18n.t('components.fd-generation-settings.AdminUser').string,
      'Docs': i18n.t('components.fd-generation-settings.Docs').string,
      'Csv': i18n.t('components.fd-generation-settings.Csv').string,
      'Wmf': i18n.t('components.fd-generation-settings.Wmf').string,
    }
  }),

  /**
   * Generation settings for display on the page.
   *
   * @property {object} newGenerationItems
   */
  newGenerationItems: null,

  /**
   * Get setting header.
   *
   * @method getSettingTitle
   * @param {string} settingKey
   */
  getSettingTitle(settingKey) {
    let title = this.get(`generationItemsTitles.${settingKey}`);
    return title ? title : settingKey;
  },

  /**
   * Get setting items.
   *
   * @method getSettingItems
   * @param {object} genItemsCard
   * @param {string} genItem
   */
  getSettingItems(genItemsCard, genItem) {
    let i18n = this.get('i18n');
    let items={};
    let title = this.getSettingTitle(genItem);
    for (let item in genItemsCard) {
      set(items, this.getSettingTitle(item), genItemsCard[item])
    }
    set(items, 'className', genItem);
    switch (genItem) {
      case 'EmberJs': {
        set(items, 'caption', i18n.t('components.fd-generation-settings.generationSettings').string);
        break;
      }
      case 'Mssql': {
        set(items, 'caption', i18n.t('components.fd-generation-settings.storage').string);
        break;
      }
      case 'Docs': {
        set(items, 'caption', i18n.t('components.fd-generation-settings.Docs').string);
        break;
      }
    }
    set(this.get('newGenerationItems'), title, items)
  },

  /**
   * Set generation items.
   *
   * @method setGenerationItems
   * @param {object} generationItems
   */
  setGenerationItems(generationItems) {
    for (let generationItem in generationItems) {
      let genItems = generationItems[generationItem];
      if (typeof genItems === 'object') {
        if (generationItem === 'Frontend' || generationItem === 'Storage') {
          for (let genItem in genItems) {
            this.getSettingItems(genItems[genItem], genItem);
          }
        } else {
          this.getSettingItems(genItems, generationItem);
        }
      }
    }
  },

  /**
   * See [EmberJS API](https://emberjs.com/).
   *
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments);
    this.set('newGenerationItems', {})
    this.setGenerationItems(this.get('genSettingsFile'));
  },

  actions: {

    /**
      Chenge genSettingsFile json.

      @method selectGenSetting
      @param {String} label label chenge setting.
      @param {Object} items items chenge setting.
      @param {Object} value new prop value.
    */
    selectGenSetting(label, items, value) {
      let generationItemsTitles = this.get('generationItemsTitles');
      let generationItems = this.get('genSettingsFile');
      let getKeyInObj = function(object, value, byKey) {
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            let prop  = byKey ? key : object[key];
            if (prop === value) {
              return key;
            } else if (typeof object[key] === 'object') {
              let res = getKeyInObj(object[key], value, byKey);
              if (res) {
                return prop + '.' + res;
              }
            }
          }
        }
      };

      let keyGroup = getKeyInObj(generationItems, get(items, 'className'), true);
      let propName = getKeyInObj(generationItemsTitles, label, false) || label;
      let settings = get(generationItems, keyGroup);

      if (propName === "ConnectionString") {
        set(settings, propName, value.target.value);
      } else {
        set(settings, propName, value.checked);
      }
    }
  }
});
