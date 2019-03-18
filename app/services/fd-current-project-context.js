import { get } from '@ember/object';

import FdCurrentProjectContext from 'ember-flexberry-designer/services/fd-current-project-context';
import config from '../config/environment';

let singleModeStageId = get(config, 'APP.fdCurrentProjectContext.singleModeStageId');
FdCurrentProjectContext.reopen({
  context: undefined,

  singleStageMode: singleModeStageId !== undefined,

  init() {
    this._super(...arguments);

    this.set('context', {
      stage: singleModeStageId
    });
  }
});

export default FdCurrentProjectContext;
