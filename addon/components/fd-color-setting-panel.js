import Component from '@ember/component';
import layout from '../templates/components/fd-color-setting-panel';
import FdPopupActions from '../mixins/fd-popup-actions';
import { observer, computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';

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
    return [(c>>16)&255, (c>>8)&255, c&255, 255];
  },

  rgbaToHex: function (rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    let hex = (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    return hex;
  },

  isClass: computed('value.model.attributes.objectModel.primitive.$type', function() {
    if (!this.get('value')) {
      return false;
    }

    const objectModel = this.value.model.get('objectModel');
    const objectType = objectModel.get('primitive.$type');

    return objectType === 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin';
  }),

  stereotypeItems: computed('value.model.attributes.objectModel.stereotype', function() {
    const objectView = this.get('value');
    if (!objectView) {
      return A();
    }

    const defaultItems = A([
      '',
      '«application»',
      '«businessserver»',
      '«editform»',
      '«enumeration»',
      '«eventarg»',
      '«external»',
      '«externalinterface»',
      '«implementation»',
      '«interface»',
      '«listform»',
      '«printfrom»',
      '«role»',
      '«type»',
      '«typedef»',
      '«userform»'
    ]);

    const objectModel = objectView.model.get('objectModel');
    const stereotype = objectModel.get('stereotype');
    defaultItems.addObject(stereotype);

    return defaultItems;
  }),

  _onTextColorChange: observer('value', function() {
    if (this.get('value')) {
      const objectModel = this.get('value').model.get('objectModel');
      const textColor = objectModel.get('primitive.DrawStyle.TextColor');
      const backgroundColor = objectModel.get('primitive.DrawStyle.DrawBrush.Color');

      const textColorHEX = this.rgbaToHex('rgba(' + textColor.R + ', ' + textColor.G + ', ' + textColor.B + ', ' + textColor.A + ')');
      const backgroundColorHEX = this.rgbaToHex('rgba(' + backgroundColor.R + ', ' + backgroundColor.G + ', ' + backgroundColor.B + ', ' + backgroundColor.A + ')');

      const stereotypeValue = objectModel.get('stereotype');

      this.set('textValue', textColorHEX);
      this.set('backgroundValue', backgroundColorHEX);
      this.set('stereotypeValue', stereotypeValue);
    }

    return;
  }),

  actions: {
    /**
      Handler for click on apply button.

      @method actions.applyNewColors
     */
    applySettings(e) {
      const objectView = this.get('value');
      const objectModel = objectView.model.get('objectModel');

      const textPath = 'primitive.DrawStyle.TextColor';
      const brushPath = 'primitive.DrawStyle.DrawBrush.Color';

      const rgbaTextValue = this.hexToRGBA(this.get('textValue'));
      const rgbabackgroundValue = this.hexToRGBA(this.get('backgroundValue'));
      const oldText = objectModel.get(textPath);
      const oldBrush = objectModel.get(brushPath);
      const oldTextValue = this._getRgbaArray(oldText);
      const oldBrushValue = this._getRgbaArray(oldBrush);

      objectModel.set(`${textPath}.R`, rgbaTextValue[0]);
      objectModel.set(`${textPath}.G`, rgbaTextValue[1]);
      objectModel.set(`${textPath}.B`, rgbaTextValue[2]);
      objectModel.set(`${textPath}.A`, rgbaTextValue[3]);

      objectModel.set(`${brushPath}.R`, rgbabackgroundValue[0]);
      objectModel.set(`${brushPath}.G`, rgbabackgroundValue[1]);
      objectModel.set(`${brushPath}.B`, rgbabackgroundValue[2]);
      objectModel.set(`${brushPath}.A`, rgbabackgroundValue[3]);

      objectView.setColors();
      const oldStereotype = objectModel.get('stereotype');
      const newStereotype = this.get('stereotypeValue');
      if (!isNone(newStereotype)) {
        objectModel.set('stereotype', newStereotype);
        objectView.setInputValues();
        objectView.updateRectangles();
      }

      this._createHistoryStep(oldTextValue, rgbaTextValue, oldBrushValue, rgbabackgroundValue, oldStereotype, newStereotype);
      this.closePopup(e, true);
      objectView.paper.$el.focus();
    }
  },

  /**
    Get rgba array from color JSON.

    @method _getRgbaArray
   */
  _getRgbaArray(colorObject) {
    return A([colorObject.R, colorObject.G, colorObject.B, colorObject.A]);
  },

  /**
    Create history step for colors/stereotype changing.

    @method _createHistoryStep
   */
  _createHistoryStep(oldTextValue, newTextValue, oldBrushValue, newBrushValue, oldStereotype, newStereotype) {
    const graph = this.get('value.model.graph');
    if (isNone(graph)) {
      return;
    }

    let changes = A();
    changes.addObject({ field: 'textColor', oldValue: oldTextValue, newValue: newTextValue });
    changes.addObject({ field: 'brushColor', oldValue: oldBrushValue, newValue: newBrushValue });
    if (!isNone(newStereotype)) {
      changes.addObject({ field: 'stereotype', oldValue: oldStereotype, newValue: newStereotype });
    }

    graph.trigger('history:add', this.get('value.model').get('id'), changes);
  }
});
