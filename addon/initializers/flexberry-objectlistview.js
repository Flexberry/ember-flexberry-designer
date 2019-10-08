import FlexberryObjectlistviewComponent from 'ember-flexberry/components/flexberry-objectlistview';

/**
  Инициализирует некоторые настройки компонента flexberry-objectlistview для всех его экземпляров в приложении.

  @for ApplicationInitializer
  @method FlexberryObjectlistview.initialize
  @param {<a href="http://emberjs.com/api/classes/Ember.Application.html">Ember.Application</a>} application Ember-приложение.
*/
export function initialize() {
  FlexberryObjectlistviewComponent.reopen({
    /**
      Флаг: показывает должен ли происходить автоматический перарсчет ширины колонок, в случае каких-либо изменений связанных с шириной.
      Так же принудительно растягивает flexberry-objectlistview на всю ширину родительского элемента.

      @property columnsWidthAutoresize
      @type Boolean
      @default true
    */
    columnsWidthAutoresize: true,
  });
}

export default {
  name: 'flexberry-objectlistview',
  initialize
};
