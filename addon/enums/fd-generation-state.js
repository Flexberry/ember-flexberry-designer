import { createEnum } from 'ember-flexberry-data/utils/enum-functions';

export default createEnum({
  Unknown: 'Unknown',
  Success: 'Success',
  Running: 'Running',
  Error: 'Error',
  Warn: 'Warn',
  Canceled: 'Canceled'
});
