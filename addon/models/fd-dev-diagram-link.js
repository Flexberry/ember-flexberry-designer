import { Model as DevDiagramLinkMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-diagram-link';
import DiagramLinkModel from './fd-diagram-link';

let Model = DiagramLinkModel.extend(DevDiagramLinkMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
