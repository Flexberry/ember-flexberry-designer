import { createEnum } from 'ember-flexberry-data/utils/enum-functions';

export default createEnum({
  OnAnyEvent: 'OnAnyEvent',
  OnInsertToStorage: 'OnInsertToStorage',
  OnUpdateInStorage: 'OnUpdateInStorage',
  OnDeleteFromStorage: 'OnDeleteFromStorage',
  OnAllEvents: 'OnAllEvents'
});
