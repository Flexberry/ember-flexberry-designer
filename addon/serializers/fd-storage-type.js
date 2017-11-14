import { Serializer as StorageTypeSerializer } from
  '../mixins/regenerated/serializers/fd-storage-type';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(StorageTypeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
