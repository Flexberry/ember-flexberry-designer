/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Describes the type of data on the type map.

  @class FdDataType
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default Ember.Object.extend({
  /**
    The name of the data type.

    @property name
    @type String
  */
  name: undefined,

  /**
    The name of the file with the assembly.

    @property assemblyDll
    @type String
  */
  assemblyDll: undefined,

  /**
    The value in which the data type is reflected in C#.

    @property cs
    @type String
  */
  cs: undefined,

  /**
    The value in which the data type is reflected in MSSQL Server.

    @property sql
    @type String
  */
  sql: undefined,

  /**
    The value in which the data type is reflected in PostgreSQL.

    @property postgre
    @type String
  */
  postgre: undefined,

  /**
    The value in which the data type is reflected in Oracle.

    @property oracle
    @type String
  */
  oracle: undefined,

  /**
    Indicates that the data type is only used for SQL maps.

    @property sqlOnly
    @type Boolean
    @default false
  */
  sqlOnly: false,
});
