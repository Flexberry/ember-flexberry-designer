import { Model as DevDiagramLinkMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-diagram-link';
import DiagramLinkModel from './new-platform-flexberry-web-designer-diagram-link';

let Model = DiagramLinkModel.extend(DevDiagramLinkMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
