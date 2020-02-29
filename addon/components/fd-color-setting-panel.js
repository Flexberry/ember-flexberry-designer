import Component from '@ember/component';
import layout from '../templates/components/fd-color-setting-panel';
import FdPopupActions from '../mixins/fd-popup-actions';
import $ from 'jquery';
import { observer } from '@ember/object';

export default Component.extend(
  FdPopupActions, {
  layout,

  popupNamespace: 'diagrams-popup',

  hexToRGBA: function(hex) {
    let c = hex.substring(1).split('');
    if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return [(c>>16)&255, (c>>8)&255, c&255, 1];
  },

  rgbaToHex: function (rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    let hex = (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    return hex;
  },

  _onTextColorChange: observer('value', function() {
    if (this.value != undefined) {
      let textColor = this.value.model.attributes.objectModel.primitive.DrawStyle.TextColor;
      let backgroundColor = this.value.model.attributes.objectModel.primitive.DrawStyle.DrawBrush.Color;

      let textColorHEX = this.rgbaToHex('rgba(' + textColor.R + ', ' + textColor.G + ', ' + textColor.B + ', ' + textColor.A + ')');
      let backgroundColorHEX = this.rgbaToHex('rgba(' + backgroundColor.R + ', ' + backgroundColor.G + ', ' + backgroundColor.B + ', ' + backgroundColor.A + ')');

      this.textValue = textColorHEX;
      this.backgroundValue = backgroundColorHEX;

      this.set('textValue', textColorHEX);
      this.set('backgroundValue', backgroundColorHEX);
    }

    return;   
  }),

  actions: {
    /**
      Handler for click on apply button.

      @method actions.applyNewColors
     */
    applySettings(e) {
      const objectModel = this.value.model.get('objectModel');

      if (this.stereotypeValue != undefined) {
        objectModel.set('stereotype', this.stereotypeValue);
      }

      let textColor = objectModel.primitive.DrawStyle.TextColor;
      let brushColor = objectModel.primitive.DrawStyle.DrawBrush.Color;

      let rgbaTextValue = this.hexToRGBA(this.textValue);
      let rgbabackgroundValue = this.hexToRGBA(this.backgroundValue);

      textColor.R = rgbaTextValue[0];
      textColor.G = rgbaTextValue[1];
      textColor.B = rgbaTextValue[2];
      textColor.A = rgbaTextValue[3];

      brushColor.R = rgbabackgroundValue[0];
      brushColor.G = rgbabackgroundValue[1];
      brushColor.B = rgbabackgroundValue[2];
      brushColor.A = rgbabackgroundValue[3];

      this.value.model.set('objectModel', objectModel);
      this.value.setColors();
      e = $.Event('click');
      this.closePopup(e);
    },
  }
});
