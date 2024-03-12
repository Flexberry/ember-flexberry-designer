import RepositoryAccessModifier  from '../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

/**
  List audit attributes.
*/
const auditFields = [
  { name: 'CreateTime', description: 'Время создания объекта', type: 'AuditNullableDateTime', caption: 'Создание' },
  { name: 'Creator', description: 'Создатель объекта', type: 'string', caption: 'Создатель' },
  { name: 'EditTime', description: 'Время последнего редактирования объекта', type: 'AuditNullableDateTime', caption: 'Редактирование' },
  { name: 'Editor', description: 'Последний редактор объекта', type: 'string', caption: 'Редактор' }
];

/**
  Add audit attributes in class.
*/
let addAuditAttributes = function(cls, store) {
  auditFields.forEach((auditField) => {
    let attributes = cls.get('attributes');
    let fields = attributes.filterBy('name', auditField.name);
    fields.forEach((field) => {
      if (field.get('isNew')) {
        field.unloadRecord();
      } else {
        field.deleteRecord();
      }
    });

    store.createRecord('fd-dev-attribute', {
      class: cls,
      stored: true,
      accessModifier: RepositoryAccessModifier.Public,
      name: auditField.name,
      caption: auditField.caption,
      type: auditField.type,
      description: auditField.description
    });
  });
};

/**
  Delete audit attributes in class.
*/
let removeAuditAttributes = function(cls) {
  auditFields.forEach((auditField) => {
    let attributes = cls.get('attributes');
    let fields = attributes.filterBy('name', auditField.name);
    fields.forEach((field) => {
      if (field.get('isNew')) {
        field.unloadRecord();
      } else {
        field.deleteRecord();
      }
    });
  });
};

/**
  Update audit attributes in class.
*/
const updateAuditAttributes = function(cls, store) {
  let changedAttributes = Object.keys(cls.changedAttributes());
  let addAuditFieldsIsChanged = changedAttributes.indexOf('addAuditFields') !== -1;
  if (addAuditFieldsIsChanged) {
    if (cls.get('addAuditFields')) {
      addAuditAttributes(cls, store);
    } else {
      removeAuditAttributes(cls);
    }
  }
};

export {
  updateAuditAttributes
};
