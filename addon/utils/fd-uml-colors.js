import $ from 'jquery';

let setInputRectColors = function(jointElement, rects) {
  let textColor = jointElement.attributes.objectModel.primitive.DrawStyle.TextColor;
  let r = textColor.R;
  let g = textColor.G;
  let b = textColor.B;
  let color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  let bgColor = '#eeffee';
  //     color = '#990000';
  rects.forEach(function(rect) {
    let className = 'flexberry-uml-' + rect.type + '-rect';
    let cssName = '.' + className;
    if (cssName in rect.element.attributes.attrs) {
      let attr = jointElement.attributes.attrs[cssName];
      attr['fill-opacity'] = 0.7;
      attr['fill'] = bgColor;
      attr['stroke'] = color;
      if (jointElement.markup.includes(className) && rect.element.inputElements) {
        let $buffer = rect.element.inputElements.find('.input-buffer');
        let inputs = rect.element.inputElements.find('.' + rect.type + '-input');
        inputs.each(function() {
          let $input = $(this);
          $input.css('color', color);
          $buffer.css('color', color);
        });
      }

    }
  }, jointElement);


};


export {
  setInputRectColors
};
