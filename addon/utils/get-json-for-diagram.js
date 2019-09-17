import uuid from 'npm:node-uuid';

/**
  Get json for base primitive.
*/
let getJsonForBasePrimitive = function(typeName, repositoryObject) {
  let uuid1 = '{' + uuid.v4() + '}';
  typeName = typeName || '';

  if (repositoryObject) {
    if (repositoryObject[0] !== '{' || repositoryObject[repositoryObject.length - 1] !== '}') {
      repositoryObject = `{${repositoryObject}}`;
      uuid1 = repositoryObject;
    }
  } else {
    repositoryObject = null;
  }

  let basePrimitiveObject = {
    $id: uuid1,
    $type: typeName,
    CaseName: null,
    Changed: true,
    DrawStyle: {
      $type: 'STORMCASE.Primitives.DrawStyle, Repository',
      DrawBrush: {
        $type: 'System.Drawing.SolidBrush, System.Drawing',
        Color: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 255,
          G: 255,
          B: 255,
          A: 255,
          IsKnownColor: false,
          IsEmpty: false,
          IsNamedColor: false,
          IsSystemColor: false,
          Name: 'ffffffff'
        }
      },
      TextColor: {
        $type: 'System.Drawing.Color, System.Drawing',
        R: 0,
        G: 0,
        B: 0,
        A: 255,
        IsKnownColor: true,
        IsEmpty: false,
        IsNamedColor: true,
        IsSystemColor: true,
        Name: 'WindowText'
      }
    },
    Highlighted: false,
    Key: 0,
    LinkedDiagramKeys: [],
    RepositoryObject: repositoryObject,
    SelectInnerControls: false,
    StopEvents: false,
    Valid: true,
    WithLinkedDiagrams: false,
    ZOrder: 1.0,
  };

  return basePrimitiveObject;
};

/**
  Get json for element without name.
*/
let getJsonForBaseElement = function(typeName, location, size, defaultSize, repositoryObject) {
  location = _normalizeLocation(location);
  size = _normalizeSize(size, 100, 40);
  defaultSize = _normalizeSize(defaultSize, 100, 40);
  typeName = typeName || '';

  let baseElementObject = getJsonForBasePrimitive(typeName, repositoryObject);

  Object.assign(baseElementObject, { NeedToDragOthersControls: false });
  Object.assign(baseElementObject, _getJsonForPointBlock('Location', location.x, location.y));
  Object.assign(baseElementObject, _getJsonForPointBlock('OldLocation', location.x, location.y));
  Object.assign(baseElementObject, _getJsonForSizeBlock('Size', size.width, size.height));
  Object.assign(baseElementObject, _getJsonForSizeBlock('OldSize', size.width, size.height));
  Object.assign(baseElementObject, _getJsonForSizeBlock('DefaultSize', defaultSize.width, defaultSize.height));

  return baseElementObject;
};

/**
  Get json for element with additional properties.
*/
let getJsonForElement = function(typeName, location, size, textProperties, properties, defaultSize, repositoryObject) {
  location = _normalizeLocation(location);
  size = _normalizeSize(size, 100, 40);
  properties = properties || {};
  textProperties = textProperties || {};
  let elementObject = getJsonForBaseElement(typeName, location, size, defaultSize, repositoryObject);

  for (let prop in textProperties) {
    Object.assign(elementObject, _getJsonForPropBlock(prop, textProperties[prop], location, size));
  }

  Object.assign(elementObject, properties);

  return elementObject;
};

/**
  Get json for base link.
*/
let getJsonForBaseLink = function(typeName, startPrimitive, startPoint, endPrimitive, endPoint, vertices, repositoryObject, startSegment, endSegment) {
  startPoint = _normalizeLocation(startPoint);
  endPoint = _normalizeLocation(endPoint);
  startPrimitive = startPrimitive || '';
  endPrimitive = endPrimitive || '';
  vertices = _normalizeVertices(vertices);
  if (!startSegment) {
    startSegment = {'segmNo': -1, 'percent': 0};
  }
  if (!endSegment) {
    endSegment = {'segmNo': -1, 'percent': 0};
  }

  let baseLinkObject = getJsonForBasePrimitive(typeName, repositoryObject);
  let id = baseLinkObject.$id;

  Object.assign(baseLinkObject, { Points: vertices, PointsIndexesToMove: null });
  Object.assign(baseLinkObject, _getJsonForPointBlock('StartBorderPoint'));
  Object.assign(baseLinkObject, _getJsonForPointBlock('EndBorderPoint'));
  Object.assign(baseLinkObject, _getJsonForPointBlock('StartPoint', startPoint.x, startPoint.y));
  Object.assign(baseLinkObject, _getJsonForPointBlock('EndPoint', endPoint.x, endPoint.y));
  Object.assign(baseLinkObject, { StartPrimitive: { $ref: startPrimitive } });
  Object.assign(baseLinkObject, { EndPrimitive: { $ref: endPrimitive } });
  Object.assign(baseLinkObject, _getJsonForLEBlock('StartLE', id, startPrimitive, startPoint.x, startPoint.y, true, startSegment));
  Object.assign(baseLinkObject, _getJsonForLEBlock('EndLE', id, endPrimitive, endPoint.x, endPoint.y, false, endSegment));

  return baseLinkObject;
};

/**
  Get json for link with additional properties.
*/
let getJsonForLink = function(typeName, startPrimitive, startPoint, endPrimitive, endPoint, vertices, textProperties, properties, repositoryObject, startSegment, endSegment) {
  properties = properties || {};
  textProperties = textProperties || {};
  let linkObject = getJsonForBaseLink(typeName, startPrimitive, startPoint, endPrimitive, endPoint, vertices, repositoryObject, startSegment, endSegment);

  for (let prop in textProperties) {
    Object.assign(linkObject, _getJsonForPropBlock(prop, textProperties[prop]));
  }

  Object.assign(linkObject, properties);

  return linkObject;
};

/**
  Get json for class.
*/
let getJsonForClass = function(devClass, location) {
  // Class properties.
  let typeName = "STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin"
  let className = devClass.get('name') || '';
  let stereotype = devClass.get('stereotype') || '';
  let pk = devClass.get('id');

  let attributesStr = devClass.get('attributesStr') || '';
  let attributesStrArray = attributesStr.split('\n');

  let methodsStr = devClass.get('methodsStr') || '';
  let methodsStrArray = methodsStr.split('\n');

  // Size class
  let attributesHeight = 15.0;
  let attributesWidth = 100.0;
  let attributesRight = 400.0;
  let attributesBottom = 126.0;
  let classHeight = 40;

  attributesHeight = 14 * attributesStrArray.length < 15 ? 15.0 : 14.0 * attributesStrArray.length;
  let methodsHeight = 14 * methodsStrArray.length < 25 ? 25.0 : 14.0 * methodsStrArray.length;
  let maxAttributeStrLength = className.length;
  for (let i = 0; i < attributesStrArray.length; i++) {
    if (attributesStrArray[i].length > maxAttributeStrLength) {
      maxAttributeStrLength = attributesStrArray[i].length;
    }
  }

  for (let i = 0; i < methodsStrArray.length; i++) {
    if (methodsStrArray[i].length > maxAttributeStrLength) {
      maxAttributeStrLength = methodsStrArray[i].length;
    }
  }

  attributesWidth = maxAttributeStrLength < 14  ? 100.0 : 100.0 + (maxAttributeStrLength - 14) * 10;
  attributesRight = maxAttributeStrLength < 14 ? 400.0 : 400.0 + (maxAttributeStrLength - 14) * 10;
  attributesBottom = attributesStrArray.length < 2 ? 126.0 : 125.0 + (attributesStrArray.length - 1) * 14;
  classHeight = (25 + attributesHeight + methodsHeight) % 2 === 0 ? 25 + attributesHeight + methodsHeight : 26 + attributesHeight + methodsHeight;

  let valueX = location.X;
  let valueY = location.Y;

  let classObject = getJsonForElement(
    typeName,
    { x: valueX, y: valueY },
    { width: attributesWidth, height: classHeight },
    { Name: className },
    {},
    { width: 100, height: 30 },
    pk
  );

  // Class JSON.
  Object.assign(classObject, {
    InitialFolded: false,
    AttributesTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: attributesStr,
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: valueX,
        Y: valueY,
        Width: attributesWidth,
        Height: attributesHeight,
        Left: valueX,
        Top: valueY,
        Right: attributesRight,
        Bottom: attributesBottom,
        IsEmpty: false
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: valueX,
        Y: valueY
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: Math.floor(attributesWidth),
        Height: Math.floor(attributesHeight)
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        DrawBrush: {
          $type: 'System.Drawing.SolidBrush, System.Drawing',
          Color: {
            $type: 'System.Drawing.Color, System.Drawing',
            R: 255,
            G: 255,
            B: 255,
            A: 255,
            IsKnownColor: false,
            IsEmpty: false,
            IsNamedColor: false,
            IsSystemColor: false,
            Name: 'ffffffff'
          }
        },
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    MethodsTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: methodsStr,
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: valueX,
        Y: valueY,
        Width: attributesWidth,
        Height: 15.0,
        Left: valueX,
        Top: valueY,
        Right: attributesRight,
        Bottom: 126.0,
        IsEmpty: false
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: valueX,
        Y: valueY
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: Math.floor(attributesWidth),
        Height: 15
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        DrawBrush: {
          $type: 'System.Drawing.SolidBrush, System.Drawing',
          Color: {
            $type: 'System.Drawing.Color, System.Drawing',
            R: 255,
            G: 255,
            B: 255,
            A: 255,
            IsKnownColor: false,
            IsEmpty: false,
            IsNamedColor: false,
            IsSystemColor: false,
            Name: 'ffffffff'
          }
        },
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    StereotypeTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: stereotype,
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: valueX,
        Y: valueY,
        Width: 0.0,
        Height: 100.0,
        Left: valueX,
        Top: valueY,
        Right: valueX,
        Bottom: valueY,
        IsEmpty: true
      },
      Location: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Size: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      OldLocation: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: valueX,
        Y: valueY
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: false,
        Width: 0,
        Height: 100
      },
      BorderWidth: 0,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: true,
      BracketStart: '«',
      BracketEnd: '»',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        DrawBrush: {
          $type: 'System.Drawing.SolidBrush, System.Drawing',
          Color: {
            $type: 'System.Drawing.Color, System.Drawing',
            R: 255,
            G: 255,
            B: 255,
            A: 255,
            IsKnownColor: false,
            IsEmpty: false,
            IsNamedColor: false,
            IsSystemColor: false,
            Name: 'ffffffff'
          }
        },
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsKnownColor: true,
          IsEmpty: false,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      StopEvents: false
    },
    Folded: false,
  });

  return classObject;
};

/*
  Normalize location.
*/
let _normalizeLocation = function(location) {
  if (!location) {
    location = {};
  }

  return { x: location.x || 0, y: location.y || 0 };
};

/*
  Normalize size.
*/
let _normalizeSize = function(size, defaultWidth, defaultHeight) {
  if (!size) {
    size = {};
  }

  return { width: size.width || defaultWidth || 0, height: size.height || defaultHeight || 0 };
};

/*
  Normalize vertices.
*/
let _normalizeVertices = function(vertices) {
  // Todo
  return vertices;
}

/*
  Get JSON for property.
*/
let _getJsonForPropBlock = function(propName, value, location, size) {
  location = _normalizeLocation(location);
  size = _normalizeSize(size);
  let result = {};
  result[propName] =
    {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      BorderWidth: 0,
      BracketEnd: ']',
      BracketStart: '[',
      CanShrink: true,
      DrawEmpty: false,
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
        DrawBrush: {
          $type: 'System.Drawing.SolidBrush, System.Drawing',
          Color: {
            $type: 'System.Drawing.Color, System.Drawing',
            R: 255,
            G: 255,
            B: 255,
            A: 255,
            IsKnownColor: false,
            IsEmpty: false,
            IsNamedColor: false,
            IsSystemColor: false,
            Name: 'ffffffff'
          }
        },
        TextColor: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 0,
          G: 0,
          B: 0,
          A: 255,
          IsEmpty: false,
          IsKnownColor: true,
          IsNamedColor: true,
          IsSystemColor: true,
          Name: 'WindowText'
        }
      },
      IsBracket: false,
      IsEditMode: false,
      IsFolded: false,
      OldRect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: location.x,
        Y: location.y,
        Width: size.width,
        Height: 15.0,
        Left: location.x,
        Top: location.y,
        Right: location.x,
        Bottom: 125.0,
        IsEmpty: false
      },
      Rect: {
        $type: 'System.Drawing.RectangleF, System.Drawing',
        X: 0.0,
        Y: 0.0,
        Width: 0.0,
        Height: 0.0,
        Left: 0.0,
        Top: 0.0,
        Right: 0.0,
        Bottom: 0.0,
        IsEmpty: true
      },
      StopEvents: false,
      Text: value,
      Visible: true
    };

  Object.assign(result[propName], _getJsonForPointBlock('Location'));
  Object.assign(result[propName], _getJsonForPointBlock('OldLocation', location.x, location.y));
  Object.assign(result[propName], _getJsonForSizeBlock('Size'));
  Object.assign(result[propName], _getJsonForSizeBlock('OldSize', 100, 15));

  return result;
};

/*
  Get JSON for LE block.
*/
let _getJsonForLEBlock = function(propName, id, primitiveId, x, y, isStart, segment) {
  x = x || 0;
  y = y || 0;
  let result = {};
  let refType = segment.segmNo >= 0 ? 'Link' : 'Elemenr';
  result[propName] = {
    $type: 'STORMCASE.Primitives.LEInformation, Repository',
    DrawStyle: {
      $type: 'STORMCASE.Primitives.DrawStyle, Repository',
      DrawBrush: {
        $type: 'System.Drawing.SolidBrush, System.Drawing',
        Color: {
          $type: 'System.Drawing.Color, System.Drawing',
          R: 255,
          G: 255,
          B: 255,
          A: 255,
          IsKnownColor: false,
          IsEmpty: false,
          IsNamedColor: false,
          IsSystemColor: false,
          Name: 'ffffffff'
        }
      },
      TextColor: {
        $type: 'System.Drawing.Color, System.Drawing',
        R: 0,
        G: 0,
        B: 0,
        A: 255,
        IsKnownColor: true,
        IsEmpty: false,
        IsNamedColor: true,
        IsSystemColor: true,
        Name: 'WindowText'
      }
    },
    IsStart: isStart,
    Parent: { $ref: id },
    Percent: segment.percent,
    SegmNo: segment.segmNo,
    refType: refType,
    Primitive: { $ref: primitiveId }
  };

  Object.assign(result[propName], _getJsonForPointBlock('BorderPoint'));
  Object.assign(result[propName], _getJsonForPointBlock('Point', x, y));

  return result;
};

/*
  Get JSON for point block.
*/
let _getJsonForPointBlock = function(propName, x, y) {
  x = x || 0;
  y = y || 0;
  let result = {};
  result[propName] = {
    $type: 'System.Drawing.Point, System.Drawing',
    IsEmpty: x === 0 && y === 0,
    X: x,
    Y: y
  };

  return result;
};

/*
  Get JSON for size block.
*/
let _getJsonForSizeBlock = function(propName, width, height) {
  width = width || 0;
  height = height || 0;
  let result = {};
  result[propName] = {
    $type: 'System.Drawing.Size, System.Drawing',
    IsEmpty: width === 0 && height === 0,
    Width: width,
    Height: height
  };

  return result;
};

export {
  getJsonForElement,
  getJsonForLink,
  getJsonForClass
};
