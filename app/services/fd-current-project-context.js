import Ember from 'ember';
import FdCurrentProjectContext from 'ember-flexberry-designer/services/fd-current-project-context';
import config from '../config/environment';

let singleModeStageId = Ember.get(config, 'APP.fdCurrentProjectContext.singleModeStageId');
FdCurrentProjectContext.reopen({
  singleModeStageId: singleModeStageId
});

export default FdCurrentProjectContext;
