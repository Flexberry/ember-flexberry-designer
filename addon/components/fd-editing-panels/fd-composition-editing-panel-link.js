import Component from '@ember/component';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-composition-editing-panel-link';

export default Component.extend(FdReadonlyModeMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Url video help.

    @property urlHelp
    @type String
  */
  urlHelp: 'https://www.youtube.com/embed/G9zoWWLCwuk'
});
