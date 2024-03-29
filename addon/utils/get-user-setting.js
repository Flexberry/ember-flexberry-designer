/**
  @module ember-flexberry
*/

import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';

/**
  Looks for already created user settings record.
  @method getExistingRecord
  @return {<a href="http://emberjs.com/api/classes/RSVP.Promise.html">Promise</a>} A promise that returns founded record
  or `undefined` if there is no such setting.
*/
let getExistingRecord = function(store, userName) {
  let predicate = new SimplePredicate('userName', 'eq', userName);
  const modelName = 'new-platform-flexberry-flexberry-user-setting';
  const builder = new Builder(store)
    .from(modelName)
    .selectByProjection('FlexberryUserSettingE')
    .orderBy('settLastAccessTime desc')
    .where(predicate);
  return store.query(modelName, builder.build()).then((result) => {
    if (result) {
      let foundRecords = result.toArray();
      if (foundRecords && foundRecords.length > 0) {
        for (let i = 1; i < foundRecords.length; i++) {
          foundRecords[i].destroyRecord();
        }

        return foundRecords[0];
      }
    }

    return undefined;
  });
};

export {
  getExistingRecord
};
