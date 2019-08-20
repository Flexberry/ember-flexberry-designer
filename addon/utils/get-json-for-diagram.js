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
let getJsonForClass = function(devClass, type, index, oldData) {
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
  let folded = true;
  if (!type) {
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
    folded = false;
  }

  // Location class
  let valueX = 400;
  let valueY = 210;
  switch (type) {
    case 'parent':
      valueX = 400;
      valueY = 10;
      break;
    case 'child':
      valueX = 400;
      valueY = 510 + index * 100;
      break;
    case 'master':
      valueX = 100;
      valueY = index < 2 ? 210 - 100 * index : 110 + index * 100;
      break;
    case 'detail':
      valueX = 700;
      valueY = index < 2 ? 210 - 100 * index : 110 + index * 100;
      break;
  }

  // Old data.
  if (oldData) {
    valueX = oldData.location.X || valueX;
    valueY = oldData.location.Y || valueY;
    folded = oldData.folded || folded;
  }

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
    Folded: folded,
  });

  return classObject;
};

/**
  Get json for association.
*/
let getJsonForAssociation = function(startClassObject, endClassObject, association, countLinks, oldData) {
  let uuid1 = '{' + uuid.v4() + '}';

  // Association properties.
  let endRole = association.get('endRole');
  let startRole = association.get('startRole');
  let associationName = association.get('name');
  let associationStartMult = association.get('startMultiplicity');
  let associationEndMult = association.get('endMultiplicity');
  let pk = association.get('id');

  // StartPoint and EndPoint.
  let shift = (Math.pow(-1, countLinks) * Math.ceil(countLinks / 2) * 10) / 2;
  let startPointX = startClassObject.Location.X + startClassObject.Size.Width / 2;
  let startPointY = startClassObject.Location.Y + startClassObject.Size.Height / 2 + shift;
  let EndPointX = endClassObject.Location.X + endClassObject.Size.Width / 2;
  let EndPointY = endClassObject.Location.Y + endClassObject.Size.Height / 2 + shift;

  // Old data.
  if (oldData) {
    uuid1 = oldData.uuid;
    startPointX = oldData.startPoint.X;
    startPointY = oldData.startPoint.Y;
    EndPointX = oldData.endPoint.X;
    EndPointY = oldData.endPoint.Y;
  }

  // Association JSON.
  let associationObject = {
    $id: uuid1,
    $type: 'STORMCASE.UML.cad.Association, UMLCAD',
    InitialMultiplicity: 1,
    StartMultTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: associationStartMult,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    EndMultTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: associationEndMult,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartRoleTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: startRole,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    EndRoleTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: endRole,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartPrimitive: {
      $ref: startClassObject.$id
    },
    EndPrimitive: {
      $ref: endClassObject.$id
    },
    NamePos: 0,
    Name: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: true,
      Text: associationName,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartLE: {
      $type: 'STORMCASE.Primitives.LEInformation, Repository',
      SegmNo: -1,
      Percent: 0.0,
      DrawStyle: {},
      Parent: {
        $ref: uuid1
      },
      IsStart: true,
      Primitive: {
        $ref: startClassObject.$id
      },
      BorderPoint: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Point: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: startPointX,
        Y: startPointY
      }
    },
    EndLE: {
      $type: 'STORMCASE.Primitives.LEInformation, Repository',
      SegmNo: -1,
      Percent: 0.0,
      DrawStyle: {},
      Parent: {
        $ref: uuid1
      },
      IsStart: false,
      Primitive: {
        $ref: endClassObject.$id
      },
      BorderPoint: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Point: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: EndPointX,
        Y: EndPointY
      }
    },
    StartBorderPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: true,
      X: 0,
      Y: 0
    },
    EndBorderPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: true,
      X: 0,
      Y: 0
    },
    StartPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: startPointX,
      Y: startPointY
    },
    EndPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: EndPointX,
      Y: EndPointY
    },
    Points: [
      {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: startPointX,
        Y: startPointY
      },
      {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: EndPointX,
        Y: EndPointY
      }
    ],
    Valid: true,
    PointsIndexesToMove: null,
    LinkedDiagramKeys: [],
    SelectInnerControls: false,
    WithLinkedDiagrams: false,
    Changed: true,
    Key: 0,
    ZOrder: 1.0,
    RepositoryObject: '{' + pk + '}',
    Highlighted: false,
    CaseName: null,
    DrawStyle: {
      $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
  };

  if (startClassObject.Location.Y > 500 && startClassObject.Location.X === 400) {
    associationObject.Points.splice(1, 0, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 380,
      Y: startPointY
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 380,
      Y: 500
    });
  }

  if (startClassObject.Location.Y === 10 && startClassObject.Location.X === 400) {
    associationObject.Points.splice(1, 0, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 520,
      Y: startPointY
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 520,
      Y: 150
    });
  }

  if (startClassObject.$id === endClassObject.$id) {
    associationObject.Points.splice(1, 0, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: Math.round(startClassObject.Location.X + startClassObject.Size.Width / 3),
      Y: 209
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: Math.round(startClassObject.Location.X + startClassObject.Size.Width / 3),
      Y: 150
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: Math.round(startClassObject.Location.X + 2 * startClassObject.Size.Width / 3),
      Y: 150
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: Math.round(startClassObject.Location.X + 2 * startClassObject.Size.Width / 3),
      Y: 209
    });
  }

  return associationObject;
};

/**
  Get json for aggregation.
*/
let getJsonForAggregation = function(startClassObject, endClassObject, aggregation, countLinks, oldData) {
  let uuid1 = '{' + uuid.v4() + '}';

  // Aggregation properties.
  let endRole = aggregation.get('endRole');
  let startRole = aggregation.get('startRole');
  let aggregationName = aggregation.get('name');
  let aggregationStartMult = aggregation.get('startMultiplicity');
  let aggregationEndMult = aggregation.get('endMultiplicity');
  let pk = aggregation.get('id');

  // StartPoint and EndPoint.
  let shift = (Math.pow(-1, countLinks) * Math.ceil(countLinks / 2) * 10) / 2;
  let startPointX = startClassObject.Location.X + startClassObject.Size.Width / 2;
  let startPointY = startClassObject.Location.Y + startClassObject.Size.Height / 2 + shift;
  let EndPointX = endClassObject.Location.X + endClassObject.Size.Width / 2;
  let EndPointY = endClassObject.Location.Y + endClassObject.Size.Height / 2 + shift;

  // Old data.
  if (oldData) {
    uuid1 = oldData.uuid;
    startPointX = oldData.startPoint.X;
    startPointY = oldData.startPoint.Y;
    EndPointX = oldData.endPoint.X;
    EndPointY = oldData.endPoint.Y;
  }

  // Aggregation JSON.
  let aggregationObject = {
    $id: uuid1,
    $type: 'STORMCASE.UML.cad.Composition, UMLCAD',
    InitialMultiplicity: 1,
    StartMultTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: aggregationStartMult,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    EndMultTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: aggregationEndMult,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartRoleTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: startRole,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    EndRoleTxt: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: false,
      Text: endRole,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartPrimitive: {
      $ref: startClassObject.$id
    },
    EndPrimitive: {
      $ref: endClassObject.$id
    },
    NamePos: 0,
    Name: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: true,
      Text: aggregationName,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartLE: {
      $type: 'STORMCASE.Primitives.LEInformation, Repository',
      SegmNo: -1,
      Percent: 0.0,
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
      Parent: {
        $ref: uuid1
      },
      IsStart: true,
      Primitive: {
        $ref: startClassObject.$id
      },
      BorderPoint: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Point: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: startPointX,
        Y: startPointY
      }
    },
    EndLE: {
      $type: 'STORMCASE.Primitives.LEInformation, Repository',
      SegmNo: -1,
      Percent: 0.0,
      DrawStyle: {},
      Parent: {
        $ref: uuid1
      },
      IsStart: false,
      Primitive: {
        $ref: endClassObject.$id
      },
      BorderPoint: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Point: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: EndPointX,
        Y: EndPointY
      }
    },
    StartBorderPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: true,
      X: 0,
      Y: 0
    },
    EndBorderPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: true,
      X: 0,
      Y: 0
    },
    StartPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: startPointX,
      Y: startPointY
    },
    EndPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: EndPointX,
      Y: EndPointY
    },
    Points: [
      {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: startPointX,
        Y: startPointY
      },
      {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: EndPointX,
        Y: EndPointY
      }
    ],
    Valid: true,
    PointsIndexesToMove: null,
    LinkedDiagramKeys: [],
    SelectInnerControls: false,
    WithLinkedDiagrams: false,
    Changed: true,
    Key: 0,
    ZOrder: 1.0,
    RepositoryObject: '{' + pk + '}',
    Highlighted: false,
    CaseName: null,
    DrawStyle: {
      $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
  };

  if (endClassObject.Location.Y > 510 && endClassObject.Location.X === 400) {
    aggregationObject.Points.splice(1, 0, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 380,
      Y: 500
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 380,
      Y: EndPointY
    });
  }

  if (endClassObject.Location.Y === 10 && endClassObject.Location.X === 400) {
    aggregationObject.Points.splice(1, 0, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 380,
      Y: 150
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 380,
      Y: EndPointY
    });
  }

  return aggregationObject;
};

/**
  Get json for inheritance.
*/
let getJsonForInheritance = function(parentObject, childObject, inheritance, countLinks, oldData) {
  let uuid1 = '{' + uuid.v4() + '}';

  // Inheritance properties.
  let inheritanceName = inheritance.get('name');
  let pk = inheritance.get('id');

  // StartPoint and EndPoint.
  let shift = (Math.pow(-1, countLinks) * Math.ceil(countLinks / 2) * 10) / 2;
  let startPointX = parentObject.Location.X + parentObject.Size.Width / 2;
  let startPointY = parentObject.Location.Y + parentObject.Size.Height / 2 + shift;
  let EndPointX = childObject.Location.X + childObject.Size.Width / 2;
  let EndPointY = childObject.Location.Y + childObject.Size.Height / 2 + shift;

  // Old data.
  if (oldData) {
    uuid1 = oldData.uuid;
    startPointX = oldData.startPoint.X;
    startPointY = oldData.startPoint.Y;
    EndPointX = oldData.endPoint.X;
    EndPointY = oldData.endPoint.Y;
  }

  // Inheritance JSON.
  let inheritanceObject = {
    $id: uuid1,
    $type: 'STORMCASE.UML.cad.Inheritance, UMLCAD',
    StartPrimitive: {
      $ref: parentObject.$id
    },
    EndPrimitive: {
      $ref: childObject.$id
    },
    NamePos: 0,
    Name: {
      $type: 'STORMCASE.Primitives.TextBlock, Repository',
      Visible: true,
      IsFolded: false,
      CanShrink: true,
      Text: inheritanceName,
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
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      OldSize: {
        $type: 'System.Drawing.Size, System.Drawing',
        IsEmpty: true,
        Width: 0,
        Height: 0
      },
      BorderWidth: 1,
      DrawEmpty: false,
      IsEditMode: false,
      IsBracket: false,
      BracketStart: '[',
      BracketEnd: ']',
      DrawStyle: {
        $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
    StartLE: {
      $type: 'STORMCASE.Primitives.LEInformation, Repository',
      SegmNo: -1,
      Percent: 0.0,
      DrawStyle: {},
      Parent: {
        $ref: uuid1
      },
      IsStart: true,
      Primitive: {
        $ref: parentObject.$id
      },
      BorderPoint: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Point: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: startPointX,
        Y: startPointY
      }
    },
    EndLE: {
      $type: 'STORMCASE.Primitives.LEInformation, Repository',
      SegmNo: -1,
      Percent: 0.0,
      DrawStyle: {},
      Parent: {
        $ref: uuid1
      },
      IsStart: false,
      Primitive: {
        $ref: childObject.$id
      },
      BorderPoint: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: true,
        X: 0,
        Y: 0
      },
      Point: {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: EndPointX,
        Y: EndPointY
      }
    },
    StartBorderPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: true,
      X: 0,
      Y: 0
    },
    EndBorderPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: true,
      X: 0,
      Y: 0
    },
    StartPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: startPointX,
      Y: startPointY
    },
    EndPoint: {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: EndPointX,
      Y: EndPointY
    },
    Points: [
      {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: startPointX,
        Y: startPointY
      },
      {
        $type: 'System.Drawing.Point, System.Drawing',
        IsEmpty: false,
        X: EndPointX,
        Y: EndPointY
      }
    ],
    Valid: true,
    PointsIndexesToMove: null,
    LinkedDiagramKeys: [],
    SelectInnerControls: false,
    WithLinkedDiagrams: false,
    Changed: true,
    Key: 0,
    ZOrder: 1.0,
    RepositoryObject: '{' + pk + '}',
    Highlighted: false,
    CaseName: null,
    DrawStyle: {
      $type: 'STORMCASE.Primitives.DrawStyle, Repository',
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
  };

  if (childObject.Location.Y > 510 && childObject.Location.X === 400) {
    inheritanceObject.Points.splice(1, 0, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 520,
      Y: 500
    }, {
      $type: 'System.Drawing.Point, System.Drawing',
      IsEmpty: false,
      X: 520,
      Y: EndPointY
    });
  }

  return inheritanceObject;
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
  getJsonForClass,
  getJsonForAssociation,
  getJsonForAggregation,
  getJsonForInheritance
};
