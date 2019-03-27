
import Ember from 'ember';
import layout from '../templates/components/fd-config-panel';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';

export default Ember.Component.extend(FdWorkPanelToggler, {
  layout,

  title: '',
 
});
