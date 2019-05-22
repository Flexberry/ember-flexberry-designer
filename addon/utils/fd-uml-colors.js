import $ from 'jquery';

let setInputRectColors = function(jointElement, rects) {
  let primitive = jointElement.attributes.objectModel.primitive;
  let textColor = primitive.DrawStyle.TextColor;
  let color = "#" + ((1 << 24) + ( textColor.R << 16) + (textColor.G << 8) + textColor.B).toString(16).slice(1);
  let brushColor = primitive.DrawStyle.DrawBrush.Color;
  let bgColor = "#" + ((1 << 24) + ( brushColor.R << 16) + (brushColor.G << 8) + brushColor.B).toString(16).slice(1);
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


let setLinkColors = function(primitive, link) {
  if (!primitive) {
    return;
  }
  let textColor = primitive.DrawStyle.TextColor;
  let color = "#" + ((1 << 24) + ( textColor.R << 16) + (textColor.G << 8) + textColor.B).toString(16).slice(1);
  let brushColor = primitive.DrawStyle.DrawBrush.Color;
  let bgColor = "#" + ((1 << 24) + ( brushColor.R << 16) + (brushColor.G << 8) + brushColor.B).toString(16).slice(1);
  if (!('.connection' in link.attributes.attrs)) {
    link.attributes.attrs['.connection'] = {};
  }
  link.attributes.attrs['.connection'].stroke=color;
  if (!('.marker-source' in link.attributes.attrs)) {
    link.attributes.attrs['.marker-source'] = {};
  }
  link.attributes.attrs['.marker-source'].stroke=color;
  if (!('.marker-target' in link.attributes.attrs)) {
    link.attributes.attrs['.marker-target'] = {};
  }
  link.attributes.attrs['.marker-target'].stroke=color;
  switch (link.attributes.type) {
    case 'flexberry.uml.Composition':
    case 'flexberry.uml.QualifiedComposition':
    case 'flexberry.uml.ObjectAssociation':
      link.attributes.attrs['.marker-source'].fill=color;
      link.attributes.attrs['.marker-target'].fill=color;
    break;
    default:
      link.attributes.attrs['.marker-source'].fill=bgColor;
      link.attributes.attrs['.marker-target'].fill=bgColor;
      break;
  }

};

export {
  setInputRectColors,
  setLinkColors
};
