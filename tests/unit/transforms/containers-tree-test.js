import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import FdViewAttributesTree from 'ember-flexberry-designer/objects/fd-view-attributes-tree';

moduleFor('transform:containers-tree', 'Unit | Transform | containers tree');

// Replace this with your real tests.
test('it exists', function(assert) {

  let noteNoteObjectModel1 = Ember.A([
    FdViewAttributesTree.create({
      className: 'ПисьмоWebL',
      description: null,
      caption: 'Настройка рассылки писем',
      text: 'Настройка рассылки писем',
      type: 'property',
      id: 'p2l0i2',
    })
  ]);

  let noteNoteObjectModel2 = Ember.A([
    FdViewAttributesTree.create({
      className: 'ЖурналИмпортаWebL',
      description: null,
      caption: 'Журнал импорта',
      text: 'Журнал импорта',
      type: 'property',
      id: 'p2l0i3',
    })
  ]);

  let noteObjectModel1 = Ember.A([
    FdViewAttributesTree.create({
      text: 'Настройки',
      type: 'master',
      children: Ember.A(),
      copyChildren: Ember.A(),
      id: 'p1l0i1',
    }),
    FdViewAttributesTree.create({
      text: 'Рассылка по e-mail',
      type: 'master',
      children: noteNoteObjectModel1,
      copyChildren: noteNoteObjectModel1,
      id: 'p1l1i2',
    }),
    FdViewAttributesTree.create({
      text: 'Импорт данных',
      type: 'master',
      children: noteNoteObjectModel2,
      copyChildren: noteNoteObjectModel2,
      id: 'p1l2i3',
    })
  ]);

  let noteObjectModel2 = Ember.A([
    FdViewAttributesTree.create({
      className: 'УчетРабочегоВремениWebL',
      description: 'test',
      caption: 'Учет рабочего времени',
      text: 'Учет рабочего времени',
      type: 'property',
      id: 'p1l0i4',
    }),
    FdViewAttributesTree.create({
      className: 'ПроизводственныйКалендарьWebL',
      description: null,
      caption: 'Производственный календарь',
      text: 'Производственный календарь',
      type: 'property',
      id: 'p1l1i5',
    }),
  ]);

  let objectModel = Ember.A([
    FdViewAttributesTree.create({
      text: 'Администрирование',
      type: 'master',
      children: noteObjectModel1,
      copyChildren: noteObjectModel1,
      id: 'p0l0i0',
    }),
    FdViewAttributesTree.create({
      text: 'Поручения',
      type: 'master',
      children: noteObjectModel2,
      copyChildren: noteObjectModel2,
      id: 'p0l1i4',
    })
  ]);

  let xml = '' +
  '<Containers>' +
  '<ContainersList>' +
  '<Item ClassName="##########" MenuPath="Администрирование" Caption="" Description="" />' +
  '<Item ClassName="##########" MenuPath="Администрирование\\Настройки" Caption="" Description="" />' +
  '<Item ClassName="ПисьмоWebL" MenuPath="Администрирование\\Рассылка по e-mail" Caption="Настройка рассылки писем" Description="" />' +
  '<Item ClassName="ЖурналИмпортаWebL" MenuPath="Администрирование\\Импорт данных" Caption="Журнал импорта" Description="" />' +
  '<Item ClassName="УчетРабочегоВремениWebL" MenuPath="Поручения" Caption="Учет рабочего времени" Description="test" />' +
  '<Item ClassName="ПроизводственныйКалендарьWebL" MenuPath="Поручения" Caption="Производственный календарь" Description="" />' +
  '</ContainersList>' +
  '</Containers>';

  let transform = this.subject();
  assert.ok(transform);

  let deserializeResult = transform.deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'ConteinersTree deserialize does not work');

  let serializeResult = transform.serialize(deserializeResult);
  assert.equal(serializeResult, xml, 'ConteinersTree serialize does not work');
});
