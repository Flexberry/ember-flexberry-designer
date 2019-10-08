import { module, test } from 'qunit';
import FdAppStructTree from 'ember-flexberry-designer/objects/fd-appstruct-tree';
import { deserialize, serialize } from 'ember-flexberry-designer/utils/transforms-utils/fd-containers-tree';

module('Unit | Utility | containers tree');

// Replace this with your real tests.
test('it exists', function(assert) {

  let noteNoteObjectModel1 = [
    FdAppStructTree.create({
      className: 'ПисьмоWebL',
      description: null,
      text: 'Настройка рассылки писем',
      type: 'property',
      id: 'p2l0i2',
      url: ''
    })
  ];

  let noteNoteObjectModel2 = [
    FdAppStructTree.create({
      className: 'ЖурналИмпортаWebL',
      description: null,
      text: 'Журнал импорта',
      type: 'property',
      id: 'p2l0i3',
      url: ''
    })
  ];

  let noteObjectModel1 = [
    FdAppStructTree.create({
      text: 'Настройки',
      type: 'folder',
      children: [],
      id: 'p1l0i1',
    }),
    FdAppStructTree.create({
      text: 'Рассылка по e-mail',
      type: 'folder',
      children: noteNoteObjectModel1,
      id: 'p1l1i2',
    }),
    FdAppStructTree.create({
      text: 'Импорт данных',
      type: 'folder',
      children: noteNoteObjectModel2,
      id: 'p1l2i3',
    })
  ];

  let noteObjectModel2 = [
    FdAppStructTree.create({
      className: 'УчетРабочегоВремениWebL',
      description: 'test',
      text: 'Учет рабочего времени',
      type: 'property',
      id: 'p1l0i4',
      url: ''
    }),
    FdAppStructTree.create({
      className: 'ПроизводственныйКалендарьWebL',
      description: null,
      text: 'Производственный календарь',
      type: 'property',
      id: 'p1l1i5',
      url: ''
    }),
    FdAppStructTree.create({
      className: null,
      description: null,
      text: 'Test',
      type: 'property',
      id: 'p1l2i6',
      url: 'Test'
    }),
  ];

  let objectModel = [
    FdAppStructTree.create({
      text: 'Администрирование',
      type: 'folder',
      children: noteObjectModel1,
      id: 'p0l0i0',
    }),
    FdAppStructTree.create({
      text: 'Поручения',
      type: 'folder',
      children: noteObjectModel2,
      id: 'p0l1i4',
    })
  ];

  let jstreeData = {
    p2l0i2: { id: 'p2l0i2', children: [], original: { text: 'Настройка рассылки писем', type: 'property', className: 'ПисьмоWebL', description: null, url: '' }},
    p2l0i3: { id: 'p2l0i3', children: [], original: { text: 'Журнал импорта', type: 'property', className: 'ЖурналИмпортаWebL', description: null, url: '' }},
    p1l0i1: { id: 'p1l0i1', children: [], original: { text: 'Настройки', type: 'folder' }},
    p1l1i2: { id: 'p1l1i2', children: ['p2l0i2'], original: { text: 'Рассылка по e-mail', type: 'folder' }},
    p1l2i3: { id: 'p1l2i3', children: ['p2l0i3'], original: { text: 'Импорт данных', type: 'folder'}},
    p1l0i4: { id: 'p1l0i4', children: [], original: { text: 'Учет рабочего времени', type: 'property', className: 'УчетРабочегоВремениWebL', description: 'test', url: '' }},
    p1l1i5: { id: 'p1l1i5', children: [], original: { text: 'Производственный календарь', type: 'property', className: 'ПроизводственныйКалендарьWebL', description: null, url: '' }},
    p1l2i6: { id: 'p1l2i6', children: [], original: { text: 'Test', type: 'property', className: null, description: null, url: 'Test' }},
    p0l0i0: { id: 'p0l0i0', children: ['p1l0i1', 'p1l1i2', 'p1l2i3'], original: { text: 'Администрирование', type: 'folder' }},
    p0l1i4: { id: 'p0l1i4', children: ['p1l0i4', 'p1l1i5', 'p1l2i6'], original: { text: 'Поручения', type: 'folder' }},
  };

  let xml = '' +
  '<Containers>' +
  '<ContainersList>' +
  '<Item ClassName="##########" MenuPath="Администрирование" Caption="" Description="" Url="" />' +
  '<Item ClassName="##########" MenuPath="Администрирование\\Настройки" Caption="" Description="" Url="" />' +
  '<Item ClassName="ПисьмоWebL" MenuPath="Администрирование\\Рассылка по e-mail" Caption="Настройка рассылки писем" Description="" Url="" />' +
  '<Item ClassName="ЖурналИмпортаWebL" MenuPath="Администрирование\\Импорт данных" Caption="Журнал импорта" Description="" Url="" />' +
  '<Item ClassName="УчетРабочегоВремениWebL" MenuPath="Поручения" Caption="Учет рабочего времени" Description="test" Url="" />' +
  '<Item ClassName="ПроизводственныйКалендарьWebL" MenuPath="Поручения" Caption="Производственный календарь" Description="" Url="" />' +
  '<Item ClassName="" MenuPath="Поручения" Caption="Test" Description="" Url="Test" />' +
  '</ContainersList>' +
  '</Containers>';

  let deserializeResult = deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'ConteinersTree deserialize does not work');

  let serializeResult = serialize(deserializeResult, jstreeData);
  assert.equal(serializeResult, xml, 'ConteinersTree serialize does not work');
});
