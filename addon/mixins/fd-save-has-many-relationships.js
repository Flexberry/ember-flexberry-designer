/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import { all } from 'rsvp';
import { isBlank } from '@ember/utils';

/**
  @class FdSaveHasManyRelationshipsMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  /**
    Save dirty hasMany relationships in the `model`.
    This method invokes by `save` method.

    @method saveHasManyRelationships
    @param {DS.Model} model Record with hasMany relationships.
    @return {Promise} A promise that will be resolved to array of saved records.
  */
  saveHasManyRelationships(model) {
    let promises = [];
    model.eachRelationship((name, desc) => {
      if (desc.kind === 'hasMany') {
        model.get(name).filterBy('hasDirtyAttributes', true).forEach((record) => {
          let promise = this._checkRecordOnChanges(record);
          promises.push(promise);
        });
      }
    });

    return all(promises);
  },

  /**
    Save record from hasMany relationships.

    @method _checkRecordOnChanges
    @param {DS.Model} record Record from hasMany relationships.
  */
  _checkRecordOnChanges(record) {
    if (record.constructor.modelName !== 'fd-dev-attribute' && record.constructor.modelName !== 'fd-dev-method') {
      return record.save();
    }

    if (isBlank(record.get('name'))) {
      if (record.get('isNew')) {
        return record.rollbackAttributes();
      } else {
        return record.destroyRecord();
      }
    }
  }
});
