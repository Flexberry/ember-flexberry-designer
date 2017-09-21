import { OfflineSerializer as UCDSerializer } from
  '../mixins/regenerated/serializers/fd-ucd-offline';
import DiagramSerializer from './fd-diagram-offline';

export default DiagramSerializer.extend(UCDSerializer, {
});
