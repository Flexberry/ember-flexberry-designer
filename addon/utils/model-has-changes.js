import { isNone } from '@ember/utils';

/*
  Check if model has changes
*/
export default function modelHasChanges(model) {
  if (isNone(model)) {
    return false;
  }

  return model.hasDirtyAttributes || model.hasChangedBelongsTo() || Object.keys(model.changedHasMany()).length !== 0;
}
