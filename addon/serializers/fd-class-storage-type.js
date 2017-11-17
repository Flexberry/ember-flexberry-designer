import { Serializer as ClassStorageTypeSerializer } from
  '../mixins/regenerated/serializers/fd-class-storage-type';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(ClassStorageTypeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
