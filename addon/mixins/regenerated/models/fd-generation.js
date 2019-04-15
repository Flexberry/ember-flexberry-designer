import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';
import GenerationStateEnum from '../../../enums/new-platform-flexberry-web-designer-generation-state';

export let Model = Mixin.create({
  startTime: DS.attr('date', { defaultValue() { return new Date(); } }),
  endTime: DS.attr('date', { defaultValue() { return new Date(); } }),
  state: DS.attr('new-platform-flexberry-web-designer-generation-state', { defaultValue: GenerationStateEnum.Running }),
  generationReason: DS.attr('string'),
  userName: DS.attr('string'),
  isRunning: DS.attr('boolean', { defaultValue: true }),
  percentComplete: DS.attr('number'),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'generations', async: false }),
  stepLogs: DS.hasMany('fd-generation-step-log', { inverse: 'generation', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      stage: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditFormView', 'fd-generation', {
    startTime: attr('StartTime', { hidden: true }),
    endTime: attr('EndTime', { hidden: true }),
    state: attr('State', { hidden: true }),
    generationReason: attr('GenerationReason', { hidden: true }),
    userName: attr('UserName', { hidden: true }),
    isRunning: attr('IsRunning', { hidden: true }),
    percentComplete: attr('PercentComplete', { hidden: true }),
    stepLogs: hasMany('fd-generation-step-log', '', {
      time: attr(''),
      thisIsError: attr(''),
      isWarn: attr(''),
      text: attr('')
    })
  });
  modelClass.defineProjection('ListFormView', 'fd-generation', {
    userName: attr('Пользователь'),
    state: attr('Состояние'),
    startTime: attr('Время старта'),
    percentComplete: attr('% выполнения'),
    endTime: attr('Время окончания'),
    stage: belongsTo('fd-dev-stage', 'Имя стадии', {
      name: attr('Имя стадии')
    }),
    generationReason: attr('Действие')
  });
};
